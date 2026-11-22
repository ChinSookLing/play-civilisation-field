import { airlockMove, airlockView, AIRLOCK_END, AIRLOCK_VERSION, parseAirlockLang, parseAirlockSeed } from "./airlock-v0.1";
import { PSYCHE_002_RULES, PSYCHE_002_TITLE } from "./psyche-002";
import { pageAsOf } from "./page-times";
import { siteFooterHtml } from "./site-footer";

const SEED = /^S[1-9][0-9]{0,8}$/;
const MOVES = /^[ABCDP]{0,8}$/;

export type AirlockQuery = { seed: string; lang: "en" | "zh"; moves: string; comment: string };

export function airlockStartQuery(request: Request): AirlockQuery | { error: string } {
  const url = new URL(request.url);
  const asked = url.searchParams.get("seed");
  const seed = asked === null || asked === "" ? "S1" : asked;
  if (!SEED.test(seed) || parseAirlockSeed(seed) === null) return { error: "Seed not accepted. Use S and digits, for example S1.\n" };
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
  return { seed, lang: parseAirlockLang(url.searchParams.get("lang")), moves, comment };
}

export function airlockStartSeed(request: Request): AirlockQuery | { error: string } {
  return airlockStartQuery(request);
}

function walked(query: AirlockQuery): { text: string; offered: string[]; finished: boolean; at: string } {
  let soFar = "";
  for (const letter of query.moves) {
    const raw = letter === "P" ? "PASS" : letter;
    const result = airlockMove(query.seed, soFar, raw, query.lang);
    if ("error" in result) {
      const view = airlockView(query.seed, soFar, query.lang, "");
      return { text: `${result.error}\n`, offered: "error" in view ? [] : view.offered, finished: false, at: soFar };
    }
    soFar = result.moves;
  }
  const view = airlockView(query.seed, soFar, query.lang, soFar.length === 8 ? query.comment : "");
  if ("error" in view) return { text: `${view.error}\n`, offered: [], finished: false, at: soFar };
  if (view.finished) return { text: `${view.ending}\n${AIRLOCK_END}\n`, offered: [], finished: true, at: soFar };
  return { text: view.packet, offered: view.offered, finished: false, at: soFar };
}

export function airlockStartText(seed: string, lang: "en" | "zh", moves = "", comment = ""): string {
  const turn = walked({ seed, lang, moves, comment });
  if (!turn.finished && !turn.text.startsWith("NO MOVE:") && !turn.text.endsWith(`${AIRLOCK_END}\n`)) throw new Error("packet end");
  return turn.text;
}

export function airlockStartJson(
  seed: string,
  lang: "en" | "zh",
  moves = "",
  comment = "",
): { packet: string; seed: string; version: string; end: string } {
  const packet = airlockStartText(seed, lang, moves, comment);
  const end = packet.startsWith("NO MOVE:") || !packet.includes(AIRLOCK_END) ? packet.trimEnd().split("\n").at(-1) ?? "" : AIRLOCK_END;
  return { packet, seed, version: AIRLOCK_VERSION, end };
}

const AMP = "&" + "amp;";
const LT = "&" + "lt;";
const GT = "&" + "gt;";
const QUOT = "&" + "quot;";

export function escapeHtml(value: string): string {
  return value.replace(/&/g, AMP).replace(/</g, LT).replace(/>/g, GT);
}

export function renderedHtmlText(inner: string): string {
  let out = "";
  let i = 0;
  while (i < inner.length) {
    if (inner[i] === "<") {
      const close = inner.indexOf(">", i);
      if (close < 0) return out + inner.slice(i);
      i = close + 1;
      continue;
    }
    if (inner.startsWith(AMP, i)) { out += "&"; i += AMP.length; continue; }
    if (inner.startsWith(LT, i)) { out += "<"; i += LT.length; continue; }
    if (inner.startsWith(GT, i)) { out += ">"; i += GT.length; continue; }
    if (inner.startsWith(QUOT, i)) { out += "\""; i += QUOT.length; continue; }
    out += inner[i];
    i += 1;
  }
  return out;
}

function querySuffix(seed: string, lang: "en" | "zh", moves: string): string {
  const langQ = lang === "zh" ? "&lang=zh" : "";
  const movesQ = moves ? `&moves=${encodeURIComponent(moves)}` : "";
  return `?seed=${encodeURIComponent(seed)}${langQ}${movesQ}`;
}

export function airlockStartHtml(seed: string, lang: "en" | "zh", moves = "", comment = ""): string {
  const packet = airlockStartText(seed, lang, moves, comment);
  const lines = packet.endsWith("\n") ? packet.slice(0, -1).split("\n") : packet.split("\n");
  const body = lines.map((line) => `<p>${escapeHtml(line)}</p>`).join("\n");
  const q = querySuffix(seed, lang, moves);
  const isPacket = packet.includes(AIRLOCK_END);
  const ended = packet.includes("Replay:") || packet.includes("回放碼：");
  const after = isPacket
    ? `<hr>\n<p>The packet ends above.</p>\n${ended ? "<p>The week is over. The replay code is above.</p>\n" : "<p>Play's Type-C approach. One turn. No JavaScript.</p>\n<p>P = PASS. The reply block in the packet is the reply format.</p>\n"}`
    : `<p>No JavaScript. That letter was not offered.</p>\n`;
  return `<!DOCTYPE html>
<html lang="${lang === "zh" ? "zh" : "en"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Airlock — start</title>
</head>
<body>
<main>
<article>
${body}
</article>
</main>
${after}<p>Next: add &moves= to this path. P = PASS. Example: /psyche/002/start.txt?seed=${escapeHtml(seed)}&moves=A</p>
<p><a href="/psyche/002/start.txt${q}">Plain text (.txt)</a> · <a href="/psyche/002/start.json${q}">JSON (.json)</a> · <a href="/psyche/002/play${q}">Play</a></p>
${siteFooterHtml(pageAsOf("PSYCHE-002"))}</body>
</html>
`;
}

export function airlockPlayHtml(query: AirlockQuery): string {
  const turn = walked(query);
  const q = querySuffix(query.seed, query.lang, turn.at);
  const other = query.lang === "zh" ? "en" : "zh";
  const otherQ = querySuffix(query.seed, other, turn.at);
  const choices = turn.finished
    ? ""
    : `<p>${[...turn.offered, "PASS"].map((letter) => {
        const next = turn.at + (letter === "PASS" ? "P" : letter);
        const href = querySuffix(query.seed, query.lang, next);
        return `<a class="choice" rel="nofollow" href="/psyche/002/play${href}">${escapeHtml(letter)}</a>`;
      }).join(" ")}</p>
<form method="get" action="/psyche/002/play">
<input type="hidden" name="seed" value="${escapeHtml(query.seed)}">
<input type="hidden" name="moves" value="${escapeHtml(turn.at)}">
${query.lang === "zh" ? `<input type="hidden" name="lang" value="zh">` : ""}
<label>COMMENT <input name="comment" maxlength="280"></label>
${[...turn.offered, "PASS"].map((letter) => `<button type="submit" name="pick" value="${letter === "PASS" ? "P" : letter}">${escapeHtml(letter)}</button>`).join(" ")}
</form>`;
  const rules = PSYCHE_002_RULES.map((rule, index) => `<li>${escapeHtml(rule)}</li>`).join("");
  return `<!DOCTYPE html>
<html lang="${query.lang === "zh" ? "zh" : "en"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(PSYCHE_002_TITLE)}</title>
<style>
body { margin: 2rem auto; max-width: 40rem; padding: 0 1rem; background: #0b0c0a; color: #f3ecdf; font: 17px/1.5 Georgia, serif; }
a { color: #f3ecdf; }
pre { white-space: pre-wrap; font: 14px/1.45 ui-monospace, monospace; }
a.choice, button { display: inline-block; margin: .25rem .25rem 0 0; border: 1px solid #c7b59a; background: transparent; color: inherit; padding: .4rem .8rem; text-decoration: none; font: inherit; }
input { width: 100%; box-sizing: border-box; margin: .4rem 0 0; }
</style>
</head>
<body>
<p>Play's Type-C approach. No JavaScript required. Same turn: <a href="/psyche/002/start${q}">HTML</a> · <a href="/psyche/002/start.txt${q}">.txt</a> · <a href="/psyche/002/start.json${q}">.json</a>. Pattern: /psyche/002/start.txt?seed=S1&moves=A. P = PASS.</p>
<p><a href="/psyche/002">002</a> · <a href="/psyche/002/play${otherQ}">${query.lang === "zh" ? "English" : "繁中"}</a></p>
<h1>${escapeHtml(PSYCHE_002_TITLE)}</h1>
<p>airlock-v0.1 · 開放. No score.</p>
<pre>${escapeHtml(turn.text)}</pre>
${choices}
<h2>Rules</h2>
<ol>${rules}</ol>
${siteFooterHtml(pageAsOf("PSYCHE-002"))}
</body>
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

export function airlockDoorProblems(): string[] {
  const problems: string[] = [];
  for (const lang of ["en", "zh"] as const) {
    const seed = "S1";
    const packet = airlockStartText(seed, lang);
    const html = airlockStartHtml(seed, lang);
    const json = airlockStartJson(seed, lang);
    if (renderedPacket(html) !== packet) problems.push(`${lang} rendered html differs`);
    if (json.packet !== packet) problems.push(`${lang} json differs`);
    if (Object.keys(json).join(",") !== "packet,seed,version,end") problems.push("json fields");
    if (packet.includes('"') || packet.includes("<")) problems.push(`${lang} packet has a quote or angle bracket`);
    if (!packet.includes("P = PASS")) problems.push(`${lang} packet does not say P = PASS`);
    if (!html.includes("<hr>\n<p>The packet ends above.</p>")) problems.push("divider missing");
    const next = airlockStartText(seed, lang, "A");
    if (!next.includes("expected_move_number: 2")) problems.push(`${lang} moves=A is not step 2`);
    if (airlockStartJson(seed, lang, "A").packet !== next) problems.push(`${lang} json moves differ`);
    if (renderedPacket(airlockStartHtml(seed, lang, "A")) !== next) problems.push(`${lang} html moves differ`);
  }
  const note = airlockStartText("S1", "en", "AAAAAAA");
  if (!note.includes("expected_move_number: 8") || !note.includes("sol: 7/7")) problems.push("step 8 note missing");
  const ending = airlockStartText("S1", "en", "AAAAAAAA");
  if (!ending.endsWith(`${AIRLOCK_END}\n`) || !ending.includes("Replay: S1/airlock-v0.1/AAA-AAA-AA")) problems.push("ending missing");
  const refused = airlockStartText("S1", "en", "CCCCC");
  if (refused !== "NO MOVE: C is not offered\n") problems.push(`unoffered: ${refused}`);
  const play = airlockPlayHtml({ seed: "S1", lang: "en", moves: "", comment: "" });
  if (!play.includes("AIRLOCK-PACKET") || !play.includes(">A</a>") || !play.includes(">PASS</a>")) problems.push("play page has no choices");
  if (play.includes("气闸教会") || airlockStartText("S1", "en").includes("气闸教会")) problems.push("wall text in a door");
  return problems;
}
