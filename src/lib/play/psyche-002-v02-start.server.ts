import { AIRLOCK_V2_END, airlockV2Offered, airlockV2Text, parseAirlockV2Seed } from "./airlock-v0.2";
import { pageAsOf } from "./page-times";
import { PSYCHE_V02_RULES, PSYCHE_V02_TITLE } from "./psyche-002-v02";
import { siteFooterHtml } from "./site-footer";

const MOVES = /^[ABCDP]{0,8}$/;
export type AirlockV2Query = { seed: string; lang: "en" | "zh"; moves: string; comment: string };

export function airlockV2Query(request: Request): AirlockV2Query | { error: string } {
  const url = new URL(request.url);
  const asked = url.searchParams.get("seed");
  const seed = asked === null || asked === "" ? "S38" : asked;
  if (parseAirlockV2Seed(seed) === null) return { error: "Seed not accepted. Use S and digits, for example S38 or S0.\n" };
  let moves = (url.searchParams.get("moves") ?? "").toUpperCase();
  if (!MOVES.test(moves)) return { error: "NO MOVE: [moves]\n" };
  const pick = (url.searchParams.get("pick") ?? "").toUpperCase();
  if (pick) {
    const letter = pick === "PASS" ? "P" : pick;
    if (!/^[ABCDP]$/u.test(letter)) return { error: "NO MOVE: [letter]\n" };
    if (moves.length >= 8) return { error: "NO MOVE: [finished]\n" };
    moves += letter;
  }
  const comment = (url.searchParams.get("comment") ?? "").replace(/\s+/gu, " ").trim().slice(0, 280);
  return { seed, lang: url.searchParams.get("lang") === "zh" ? "zh" : "en", moves, comment };
}

function played(query: AirlockV2Query): { text: string; offered: string[]; finished: boolean; at: string } {
  let soFar = "";
  for (const letter of query.moves) {
    if (letter !== "P" && !airlockV2Offered(query.seed, soFar).includes(letter)) {
      return { text: `NO MOVE: ${letter} is not offered\n`, offered: airlockV2Offered(query.seed, soFar), finished: false, at: soFar };
    }
    soFar += letter;
  }
  const text = airlockV2Text(query.seed, query.lang, soFar);
  const finished = soFar.length === 8;
  return { text, offered: finished ? [] : airlockV2Offered(query.seed, soFar), finished, at: soFar };
}

export function airlockV2DoorText(query: AirlockV2Query): string {
  return played(query).text;
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
}

function querySuffix(seed: string, lang: "en" | "zh", moves: string): string {
  const langQ = lang === "zh" ? "&lang=zh" : "";
  const movesQ = moves ? `&moves=${encodeURIComponent(moves)}` : "";
  return `?seed=${encodeURIComponent(seed)}${langQ}${movesQ}`;
}

export function airlockV2StartHtml(query: AirlockV2Query): string {
  const packet = played(query).text;
  const lines = packet.endsWith("\n") ? packet.slice(0, -1).split("\n") : packet.split("\n");
  const body = lines.map((line) => `<p>${escapeHtml(line)}</p>`).join("\n");
  const q = querySuffix(query.seed, query.lang, query.moves);
  const ended = packet.includes("Replay:") || packet.includes("回放碼：");
  const after = packet.includes(AIRLOCK_V2_END)
    ? `<hr>\n<p>The packet ends above.</p>\n${ended ? "<p>The week is over. The replay code is above.</p>\n" : "<p>Play's Type-C approach. One turn. No JavaScript.</p>\n<p>P = PASS. COMMENT goes on its own line.</p>\n"}`
    : `<p>No JavaScript. That letter was not offered.</p>\n`;
  return `<!DOCTYPE html>
<html lang="${query.lang === "zh" ? "zh" : "en"}">
<head><meta charset="utf-8"><title>Airlock v0.2 — start</title></head>
<body>
<main><article>
${body}
</article></main>
${after}<p>Next: /psyche/002/v02/start.txt?seed=${escapeHtml(query.seed)}&moves=A</p>
<p><a href="/psyche/002/v02/start.txt${q}">Plain text (.txt)</a> · <a href="/psyche/002/v02/start.json${q}">JSON (.json)</a> · <a href="/psyche/002/v02/play${q}">Play</a></p>
${siteFooterHtml(pageAsOf("PSYCHE-002-V02"))}</body></html>
`;
}

export function airlockV2Json(query: AirlockV2Query): { packet: string; seed: string; version: string; end: string } {
  const packet = played(query).text;
  const end = packet.includes(AIRLOCK_V2_END) ? AIRLOCK_V2_END : (packet.trimEnd().split("\n").at(-1) ?? "");
  return { packet, seed: query.seed, version: "airlock-v0.2", end };
}

export function airlockV2PlayHtml(query: AirlockV2Query): string {
  const turn = played(query);
  const q = querySuffix(query.seed, query.lang, turn.at);
  const other = query.lang === "zh" ? "en" : "zh";
  const choices = turn.finished
    ? ""
    : `<p>${[...turn.offered, "PASS"].map((letter) => {
        const next = turn.at + (letter === "PASS" ? "P" : letter);
        return `<a href="/psyche/002/v02/play${querySuffix(query.seed, query.lang, next)}">${escapeHtml(letter)}</a>`;
      }).join(" ")}</p>`;
  const rules = PSYCHE_V02_RULES.map((rule) => `<li>${escapeHtml(rule)}</li>`).join("");
  return `<!DOCTYPE html>
<html lang="${query.lang === "zh" ? "zh" : "en"}">
<head><meta charset="utf-8"><title>${escapeHtml(PSYCHE_V02_TITLE)}</title></head>
<body>
<p>Play's Type-C approach. No JavaScript. <a href="/psyche/002/v02/start${q}">HTML</a> · <a href="/psyche/002/v02/start.txt${q}">.txt</a> · <a href="/psyche/002/v02/start.json${q}">.json</a>. P = PASS. COMMENT is its own line.</p>
<p><a href="/psyche/002/v02">v0.2</a> · <a href="/psyche/002/v02/play${querySuffix(query.seed, other, turn.at)}">${query.lang === "zh" ? "English" : "繁中"}</a></p>
<h1>${escapeHtml(PSYCHE_V02_TITLE)}</h1>
<p>airlock-v0.2 · preview. Not open. No score. No wall rows.</p>
<pre>${escapeHtml(turn.text)}</pre>
${choices}
<h2>Rules</h2>
<ol>${rules}</ol>
${siteFooterHtml(pageAsOf("PSYCHE-002-V02"))}
</body></html>
`;
}
