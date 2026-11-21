import { pageAsOf } from "./page-times";
import { ORIGIN, type Sheet, textRevision } from "./sheet";

export const PSYCHE_V02_TITLE = "002 · 心 · Psyche — 氣閘 Airlock v0.2";
export const PSYCHE_V02_STATUS = "airlock-v0.2 · 預覽";
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
Not open. No player rows. The v0.1 wall is unchanged.
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

VERSION COLUMN: empty. Preview. No new wall rows.
`;
}

export function psycheV02Sheet(): Sheet {
  const definition = "Psyche card 002, airlock-v0.2 preview. Not open. No player rows. v0.1 wall stays as it is.";
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
    provenance: "Designed by Hermes (Hark). Tuzi approved the build. Not opened.",
    fallback: `If this route fails, try ${PSYCHE_V02_START}?seed=S38 next.`,
    notes: ["airlock-v0.2 preview. S48 groups with S0. Suggested seed S38. No wall rows."],
  };
}
