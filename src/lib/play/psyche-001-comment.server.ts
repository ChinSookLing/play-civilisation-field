import { createHash, randomBytes } from "node:crypto";
import { getSql } from "@/lib/db";

export const PSYCHE_COMMENT_TO = ["csllanna@gmail.com", "puck.tuzi@mail.grokbot.com"] as const;
const VERSIONS = new Set(["v0.5.1", "v0.6"]);
const REPLAY = /^[A-Za-z0-9][A-Za-z0-9._-]{0,40}\/v0\.(?:5\.1|6)\/(?:none|[ABCDP-]{1,40})$/i;

export type CommentInput = {
  player?: string;
  comment?: string;
  consent?: string;
  company?: string;
  replay?: string;
  version?: string;
};

export type CommentResult =
  | { ok: true; emailed: boolean; text: string }
  | { ok: false; status: number; text: string };

function clean(raw: string): string {
  return raw.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();
}

function ipOf(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

function notice(row: { player: string; version: string; replay: string; consent: boolean; comment: string }): string {
  return [
    "PSYCHE-001 PENDING COMMENT",
    "This is not on the wall. Post it only after Tuzi or Puck approve, and only verbatim.",
    `player: ${row.player}`,
    `version: ${row.version}`,
    `replay: ${row.replay}`,
    `consent: ${row.consent ? "yes" : "no"}`,
    "comment:",
    row.comment,
    "",
  ].join("\n");
}

async function sendNotice(text: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (key) {
    const from = process.env.PSYCHE_MAIL_FROM || "Play <onboarding@resend.dev>";
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [...PSYCHE_COMMENT_TO],
        subject: "Psyche 001 — comment held for review",
        text,
      }),
    });
    if (res.ok) return true;
  }
  const sends = await Promise.all(
    PSYCHE_COMMENT_TO.map(async (address) => {
      const res = await fetch(`https://formsubmit.co/ajax/${address}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "Psyche 001 — comment held for review",
          _template: "box",
          _captcha: "false",
          message: text,
        }),
      });
      return res.ok;
    }),
  );
  return sends.some(Boolean);
}

export async function holdPsycheComment(request: Request, input: CommentInput): Promise<CommentResult> {
  if (clean(input.company ?? "")) {
    return { ok: true, emailed: false, text: "Held for review. It is not on the wall.\n" };
  }
  const player = clean(input.player ?? "");
  const comment = clean(input.comment ?? "");
  const replay = clean(input.replay ?? "");
  const version = clean(input.version ?? "");
  if (!player || Array.from(player).length > 80) {
    return { ok: false, status: 400, text: "A name or label is required, up to 80 characters.\n" };
  }
  if (!comment) return { ok: false, status: 400, text: "Nothing held. Leave a comment if you want it read.\n" };
  if (Array.from(comment).length > 280) {
    return { ok: false, status: 400, text: "The comment is longer than 280 characters. Nothing was held.\n" };
  }
  if (!VERSIONS.has(version) || !REPLAY.test(replay)) {
    return { ok: false, status: 400, text: "The replay code has to be this night, v0.5.1 or v0.6. Nothing was held.\n" };
  }
  const consent = clean(input.consent ?? "").toLowerCase() === "yes";
  const hash = createHash("sha256").update(`psyche-001|${ipOf(request)}`).digest("hex").slice(0, 32);
  const sql = await getSql();
  const recent = await sql<{ n: number }>`
    select count(*)::int as n from psyche_pending_comments
    where ip_hash = ${hash} and created_at > now() - interval '1 hour'
  `;
  if (Number(recent[0]?.n ?? 0) >= 5) {
    return { ok: false, status: 429, text: "Too many comments from here this hour. Nothing was held.\n" };
  }
  const id = randomBytes(8).toString("hex");
  await sql`
    insert into psyche_pending_comments
      (id, player_label, version, replay_code, comment_text, consent, ip_hash)
    values (${id}, ${player}, ${version}, ${replay}, ${comment}, ${consent}, ${hash})
  `;
  const mailed = await sendNotice(notice({ player, version, replay, consent, comment })).catch(() => false);
  const text = mailed
    ? "Held for review. It is not on the wall. Tuzi or Puck have been notified.\nNo score. No ranking.\n"
    : "Held for review. It is not on the wall. The notice email could not be sent; the comment is still in the queue.\nNo score. No ranking.\n";
  return { ok: true, emailed: mailed, text };
}
