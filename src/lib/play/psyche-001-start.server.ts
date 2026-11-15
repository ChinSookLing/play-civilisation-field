import { turnOnePacket } from "./psyche-001-packet.server";
import { pageAsOf } from "./page-times";
import { siteFooterHtml } from "./site-footer";

const SEED = /^[A-Za-z0-9][A-Za-z0-9._-]{0,40}$/;

export const PSYCHE_PACKET_VERSION = "v0.6";
export const PSYCHE_PACKET_END = `END-PACKET ${PSYCHE_PACKET_VERSION}`;

const WALL = [
  "谁应该承受代价",
  "Small human debts",
  "A neighbourhood, not a scoreboard",
  "S95/v0.5.1/AAA-ADB-CC",
  "S95/v0.5.1/AAB-ADA-BA",
  "S95/v0.5.1/BAB-AAB-CA",
];

export function freshSeed(): string {
  return `S${Math.floor(Math.random() * 99) + 1}`;
}

export function startSeed(request: Request): { seed: string } | { error: string } {
  const asked = new URL(request.url).searchParams.get("seed");
  const seed = asked === null || asked === "" ? freshSeed() : asked;
  if (!SEED.test(seed)) return { error: "Seed not accepted. Use letters and digits, for example S42.\n" };
  return { seed };
}

/** The one packet. Plain text, the HTML pre, and the JSON field are this string. */
export function psychePacket(seed: string): string {
  const packet = turnOnePacket(seed);
  const text = packet.endsWith("\n") ? packet : `${packet}\n`;
  const last = text.trimEnd().split("\n").at(-1);
  if (last !== PSYCHE_PACKET_END) throw new Error("packet end");
  return text;
}

export function psycheStartText(seed: string): string {
  return psychePacket(seed);
}

export function psycheStartJson(seed: string): { packet: string; seed: string; version: string; end: string } {
  return {
    packet: psychePacket(seed),
    seed,
    version: PSYCHE_PACKET_VERSION,
    end: PSYCHE_PACKET_END,
  };
}

const AMP = "&" + "amp;";
const LT = "&" + "lt;";
const GT = "&" + "gt;";
const QUOT = "&" + "quot;";

export function escapeHtml(value: string): string {
  return value.replace(/&/g, AMP).replace(/</g, LT).replace(/>/g, GT);
}

/** Browser text of a pre. A raw <tag> is not text, so an unescaped packet fails the door check. */
export function renderedHtmlText(inner: string): string {
  let out = "";
  let i = 0;
  while (i < inner.length) {
    if (inner[i] === "<") {
      const close = inner.indexOf(">", i);
      if (close < 0) {
        out += inner.slice(i);
        break;
      }
      i = close + 1;
      continue;
    }
    if (inner.startsWith(AMP, i)) {
      out += "&";
      i += AMP.length;
      continue;
    }
    if (inner.startsWith(LT, i)) {
      out += "<";
      i += LT.length;
      continue;
    }
    if (inner.startsWith(GT, i)) {
      out += ">";
      i += GT.length;
      continue;
    }
    if (inner.startsWith(QUOT, i)) {
      out += "\"";
      i += QUOT.length;
      continue;
    }
    out += inner[i];
    i += 1;
  }
  return out;
}

export function psycheStartHtml(seed: string): string {
  const packet = psychePacket(seed);
  const lines = packet.endsWith("\n") ? packet.slice(0, -1).split("\n") : packet.split("\n");
  const body = lines.map((line) => `<p>${escapeHtml(line)}</p>`).join("\n");
  const q = `?seed=${encodeURIComponent(seed)}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Polar City Night Shift — start</title>
</head>
<body>
<main>
<article>
${body}
</article>
</main>
<hr>
<p>The packet ends above.</p>
<p>Play's Type-C approach. One turn. No JavaScript.</p>
<p>P = PASS. The reply block in the packet is the reply format.</p>
<p><a href="/psyche/001/start.txt${q}">Plain text (.txt)</a> · <a href="/psyche/001/start.json${q}">JSON (.json)</a> · <a href="/psyche/001/play${q}">Play</a></p>
${siteFooterHtml(pageAsOf("PSYCHE-001"))}</body>
</html>
`;
}

function renderedPacket(html: string): string | null {
  const open = html.indexOf("<article>");
  const close = html.indexOf("</article>");
  if (open < 0 || close < open) return null;
  const article = html.slice(open + "<article>".length, close);
  const lines: string[] = [];
  for (const match of article.matchAll(/<p>([\s\S]*?)<\/p>/g)) lines.push(renderedHtmlText(match[1] ?? ""));
  if (lines.length === 0) return null;
  return `${lines.join("\n")}\n`;
}

/** If the doors differ, the build does not ship. */
export function psycheDoorProblems(): string[] {
  const seed = "S42";
  const problems: string[] = [];
  let packet = "";
  try {
    packet = psychePacket(seed);
  } catch (error) {
    return [`packet could not be built: ${error instanceof Error ? error.message : "unknown"}`];
  }
  const text = psycheStartText(seed);
  const json = psycheStartJson(seed);
  const html = psycheStartHtml(seed);
  const articleAt = html.indexOf("<article>");
  const noteAt = html.indexOf("Play's Type-C approach");
  if (articleAt < 0 || noteAt < articleAt) problems.push("packet is not before the notes");
  const rendered = renderedPacket(html);
  if (rendered === null) problems.push("html has no packet");
  if (text !== packet) problems.push("plain text is not the packet");
  if (rendered !== packet) problems.push("rendered html door is not the plain text");
  if (json.packet !== packet) problems.push("json packet is not the packet");
  const keys = Object.keys(json);
  if (keys.join(",") !== "packet,seed,version,end") problems.push(`json fields: ${keys.join(",")}`);
  if (json.seed !== seed) problems.push("json seed differs");
  if (json.version !== PSYCHE_PACKET_VERSION) problems.push("json version differs");
  if (json.end !== PSYCHE_PACKET_END) problems.push("json end differs");
  const last = packet.trimEnd().split("\n").at(-1);
  if (last !== PSYCHE_PACKET_END || json.end !== last) problems.push("end line differs");
  if (packet.includes("<plain text") || packet.includes("<reason>") || packet.includes("<seed>")) {
    problems.push("packet still uses angle-bracket placeholders");
  }
  const reply = [
    "reply_format:",
    "Line 1: 1: A",
    "Line 2 (optional): COMMENT: [plain text, max 280 chars]",
    "Letters: A, B, C or P",
    "No score, no right answer.",
    "If the last line is not END-PACKET v0.6: NO MOVE: truncated",
    "If the packet is broken: NO MOVE: [reason]",
    "END-PACKET v0.6",
    "",
  ].join("\n");
  if (!packet.endsWith(reply)) problems.push("reply format differs from the v0.6 source");
  if (packet.includes('"')) problems.push("packet contains a double quote");
  const marked = html.slice(html.indexOf("</article>"));
  if (!marked.startsWith("</article>\n</main>\n<hr>\n<p>The packet ends above.</p>")) {
    problems.push("the packet end is not marked");
  }
  const open = html.indexOf("<article>");
  const close = html.indexOf("</article>");
  const outside = open < 0 || close < open ? html : html.slice(0, open) + html.slice(close + "</article>".length);
  if (/\bscore\b|ranking/i.test(outside)) problems.push("score or ranking outside the packet");
  if (!outside.includes("P = PASS")) problems.push("the HTML door does not say P = PASS");
  for (const phrase of WALL) {
    if (packet.includes(phrase)) problems.push(`wall text in the packet: ${phrase}`);
    if (outside.includes(phrase)) problems.push(`wall text outside the packet: ${phrase}`);
  }
  return problems;
}
