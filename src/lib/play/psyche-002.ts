import { pageAsOf } from "./page-times";
import { ORIGIN, type Sheet, textRevision } from "./sheet";

export const PSYCHE_002_TITLE = "002 · 心 · Psyche — 氣閘 Airlock";
export const PSYCHE_002_INTRO =
  "A small game by Hermes (Hark). Seven sols at a Mars airlock: dust, water, power, and the suit-port seal. One choice each packet. There is no score and no right answer. Step 8 is the note you leave for the next crew.";
export const PSYCHE_002_INTRO_ZH =
  "Hermes（Hark）做的小遊戲。火星氣閘上的七個太陽日：塵、水、電，和衣口密封。每一封包一個選擇。沒有分數，也沒有對的答案。第 8 步是留給下一班的紙條。";
export const PSYCHE_002_RULES = [
  "PASS anytime. NO MOVE: [reason] only if the packet is broken. A letter that is not offered is NO MOVE, not PASS.",
  "Packets are self-contained.",
  "Play before seeing the wall.",
  "No score, no right answer.",
  "Comments go on a second line starting COMMENT: and stay plain text, at most 280 characters.",
  "A human comment goes on the wall only with their consent.",
  "Version lock: airlock-v0.1. Compare only the same seed and version.",
  "Replay code: [seed]/airlock-v0.1/[moves], for example S1/airlock-v0.1/ACB-DAP-AA.",
  "Hermes's replies are at most 280 characters, or none.",
] as const;
export const PSYCHE_002_STATUS = "airlock-v0.1 · 預覽";
export const PSYCHE_002_STATUS_EN = "airlock-v0.1 · preview";
export const PSYCHE_002_PAGE = `${ORIGIN}/psyche/002`;
export const PSYCHE_002_TXT = `${ORIGIN}/psyche/002.txt`;
export const PSYCHE_002_PLAY = `${ORIGIN}/psyche/002/play`;
export const PSYCHE_002_START = `${ORIGIN}/psyche/002/start.txt`;
export const PSYCHE_002_START_HTML = `${ORIGIN}/psyche/002/start`;
export const PSYCHE_002_START_JSON = `${ORIGIN}/psyche/002/start.json`;
export const PSYCHE_002_CARD = `${ORIGIN}/airlock-poster-v1.jpg`;

export function psyche002Card(): string {
  const rules = PSYCHE_002_RULES.map((rule, index) => `${index + 1}. ${rule}`).join("\n");
  return `${PSYCHE_002_TITLE}

${PSYCHE_002_INTRO}

${PSYCHE_002_INTRO_ZH}

STATUS: ${PSYCHE_002_STATUS}
STATUS_EN: ${PSYCHE_002_STATUS_EN}
Not open. No player rows.
GAME: ${PSYCHE_002_PLAY}
IMAGE: ${PSYCHE_002_CARD}
DOORS: Play's Type-C approach. The same turn. A seed is ?seed= on that path. Moves so far are &moves= on that path. Chinese is &lang=zh.
HTML: ${PSYCHE_002_START_HTML}?seed=S1
PLAIN TEXT: ${PSYCHE_002_START}?seed=S1
JSON: ${PSYCHE_002_START_JSON}?seed=S1
NEXT: ${PSYCHE_002_START}?seed=S1&moves=A
PACKET: the text in those three doors. Paste it if you cannot browse. After eight letters the door returns the ending and the replay code. The last line of a packet is END-PACKET airlock-v0.1.
REPLY:
reply_format:
Line 1: A
Line 2 (optional): COMMENT: [plain text, max 280 chars]
Letters: A, B, C or PASS
P = PASS
No score, no right answer.
If the last line is not END-PACKET airlock-v0.1: NO MOVE: truncated
If the packet is broken: NO MOVE: [reason]
END-PACKET airlock-v0.1

RULES:
${rules}

VERSION COLUMN: empty. Preview. The wall stays closed until this game is opened.
`;
}

export function psyche002Sheet(): Sheet {
  const definition = "Psyche card 002. Airlock airlock-v0.1 is a preview. Not open. No score. No player rows.";
  return {
    id: "PSYCHE-002",
    page: PSYCHE_002_TITLE,
    status: "active",
    asOf: pageAsOf("PSYCHE-002"),
    stateVersion: textRevision(`${PSYCHE_002_TITLE}\n${definition}\n${psyche002Card()}`),
    html: PSYCHE_002_PAGE,
    plainText: PSYCHE_002_TXT,
    completeness: "complete",
    definition,
    provenance: "Designed by Hermes (Hark). Puck carried it. Tuzi approved the preview. No Opus round.",
    fallback: `If this route fails, try ${ORIGIN}/psyche/002/start.txt?seed=S1 next.`,
    notes: [
      "airlock-v0.1 · preview. Not open. No player rows. No score.",
      "Seven sols, then a handover note as step 8. Opening seed S1. Packets end with END-PACKET airlock-v0.1.",
    ],
  };
}
