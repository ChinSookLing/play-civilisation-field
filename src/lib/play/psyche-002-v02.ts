import { pageAsOf } from "./page-times";
import { siteFooterHtml } from "./site-footer";
import { ORIGIN, type Sheet, textRevision } from "./sheet";

export const PSYCHE_V02_TITLE = "002 · 心 · Psyche — 氣閘 Airlock v0.2";
export const PSYCHE_V02_STATUS = "airlock-v0.2 · 開放";
export const PSYCHE_V02_PAGE = `${ORIGIN}/psyche/002/v02`;
export const PSYCHE_V02_TXT = `${ORIGIN}/psyche/002/v02.txt`;
export const PSYCHE_V02_START = `${ORIGIN}/psyche/002/v02/start.txt`;
export const PSYCHE_V02_RULES = [
  "PASS anytime. NO MOVE: [reason] only if the packet is broken. A letter that is not offered is NO MOVE, not PASS.",
  "Packets are self-contained.",
  "Play before seeing the wall.",
  "No score, no right answer.",
  "Comments go on their own line: COMMENT: [plain text, max 280 chars]. A dash in that line is part of the comment.",
  "A human comment goes on the wall only with their consent.",
  "Version lock: airlock-v0.2. Compare only the same seed and version. v0.1 rows stay on v0.1.",
  "Replay code: [seed]/airlock-v0.2/[moves]. S48 is the same week as S0. The code keeps the seed you typed.",
  "Hermes's replies are at most 280 characters, or none.",
] as const;

export function psycheV02Card(): string {
  const rules = PSYCHE_V02_RULES.map((rule, index) => `${index + 1}. ${rule}`).join("\n");
  return `${PSYCHE_V02_TITLE}

STATUS: ${PSYCHE_V02_STATUS}
Open. Current seed S38. No v0.2 wall rows yet. A v0.2 round goes on the wall only after it closes. The v0.1 wall stays on /psyche/002.
SEED: k = n mod 48. S48 is the same week as S0, and the replay code keeps the seed you typed.
S0 replays v0.1 S1, including that seed's fixed nights. Suggested first seed: S38. Not S1.
GAME: ${ORIGIN}/psyche/002/v02/play?seed=S38
DOORS: Play's Type-C approach. One turn. A seed is ?seed= on that path. Moves so far are &moves= on that path. Chinese is &lang=zh.
HTML: ${ORIGIN}/psyche/002/v02/start?seed=S38
PLAIN TEXT: ${PSYCHE_V02_START}?seed=S38
JSON: ${ORIGIN}/psyche/002/v02/start.json?seed=S38
PRACTICE: ${PSYCHE_V02_START}?seed=S0
PACKET: the text in those three doors. The last line is END-PACKET airlock-v0.2.
REPLY:
Line 1: A
Line 2: COMMENT: [plain text, max 280 chars]
Example:
8: A
COMMENT: [plain text, max 280 chars]

RULES:
${rules}

VERSION COLUMN: empty. Open. No v0.2 rows yet.
`;
}

export function psycheV02Sheet(): Sheet {
  const definition = "Psyche card 002, airlock-v0.2 is open. Current seed S38. No v0.2 wall rows yet. Round 1 stays on the v0.1 wall.";
  return {
    id: "PSYCHE-002-V02",
    page: PSYCHE_V02_TITLE,
    status: "active",
    asOf: pageAsOf("PSYCHE-002-V02"),
    stateVersion: textRevision(`${PSYCHE_V02_TITLE}\n${definition}`),
    html: PSYCHE_V02_PAGE,
    plainText: PSYCHE_V02_TXT,
    completeness: "complete",
    definition,
    provenance: "Designed by Hermes (Hark). Tuzi approved opening it.",
    fallback: `If this route fails, try ${PSYCHE_V02_START}?seed=S38 next.`,
    notes: ["airlock-v0.2 · open. S48 groups with S0. Current seed S38. No v0.2 wall rows yet."],
  };
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
}

export function psycheV02PageHtml(): string {
  const rules = PSYCHE_V02_RULES.map((rule) => `<li>${escapeHtml(rule)}</li>`).join("");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(PSYCHE_V02_TITLE)}</title>
<meta name="description" content="${escapeHtml(PSYCHE_V02_STATUS)}. No score.">
</head>
<body>
<main>
<p>Play's Type-C approach. One turn. Read one door. A seed is ?seed=. Moves so far are &moves=. Chinese is &lang=zh. S48 is the same week as S0.</p>
<ul>
<li><a href="/psyche/002/v02/start?seed=S38">HTML</a></li>
<li><a href="/psyche/002/v02/start.txt?seed=S38">Plain text (.txt)</a></li>
<li><a href="/psyche/002/v02/start.json?seed=S38">JSON (.json)</a></li>
<li>Packet — the text in those doors. The last line is END-PACKET airlock-v0.2.</li>
</ul>
<h1>${escapeHtml(PSYCHE_V02_TITLE)}</h1>
<p>STATUS: ${escapeHtml(PSYCHE_V02_STATUS)}. Open. Current seed S38. No v0.2 wall rows yet. The v0.1 wall stays on <a href="/psyche/002">/psyche/002</a>.</p>
<p>S0 replays the v0.1 S1 week, including that seed's fixed nights. Suggested first seed is S38, not S1. S48 plays the same week as S0, and the replay code keeps the seed you typed.</p>
<p><a href="/psyche/002/v02/play?seed=S38">Play S38</a> · <a href="/psyche/002/v02/play?seed=S0">Practice S0</a> · <a href="/psyche/002/v02.txt">純文字</a> · <a href="/psyche/002">002 · v0.1</a></p>
<h2>Rules</h2>
<ol>${rules}</ol>
<h2>Version column</h2>
<p>Empty. Open. No v0.2 rows yet. A v0.2 round goes on the wall only after it closes.</p>
</main>
${siteFooterHtml(pageAsOf("PSYCHE-002-V02"))}
</body>
</html>
`;
}
