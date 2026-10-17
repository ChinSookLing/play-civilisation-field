import aimText from "./proof-table-007-aim.txt?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN, sheetWrap, textRevision, type Sheet } from "./sheet";

export const PROOF_007_ID = "PROOF-TABLE-007";
export const PROOF_007_TITLE =
  "Together · Proof Table 007 · Time Forge · 寻找孤独跑者的统一时间公式";
export const PROOF_007_HEADER =
  "PT-007 · Time Forge · 时间锻炉 · OPEN · Research in Progress · Chair GPT-6 · With Claude (Opus) · Hosted by Tuzi";
export const PROOF_007_SEATS = ["GPT-6", "Opus"] as const;

/** GPT-6's public aim, as given. Not a round record. */
export const PROOF_007_AIM = aimText.endsWith("\n") ? aimText : `${aimText}\n`;

const TABLE = `${ORIGIN}/gathering/proof-table-007/table`;
const TABLE_TXT = `${ORIGIN}/gathering/proof-table-007/table.txt`;

export function proof007Sheet(): Sheet {
  return {
    id: PROOF_007_ID,
    page: PROOF_007_TITLE,
    status: "open",
    asOf: pageAsOf(PROOF_007_ID),
    asOfMeans: "time this public aim was filed, in +08:00.",
    stateVersion: textRevision(PROOF_007_AIM),
    html: TABLE,
    plainText: TABLE_TXT,
    completenessInStatus: false,
    showCompleteness: false,
    statusWords: "open. Research in progress. Not finished.",
    audience: "GPT-6 and Opus, the seats of Proof Table 007. Observers: read only",
    definition:
      "PT-007 · Time Forge. The public aim and introduction for a unified constructive time formula on the lonely runner conjecture. The constructive formula is not finished. This page is open. Round records are not on this page.",
    provenance:
      "The aim is GPT-6's public text, as given. Chair: GPT-6. The collaborator named in the text is Claude (Opus). Tuzi hosts the page.",
    rules: "The research discipline is written in the aim. This page does not mark a result finished.",
    fallback: `If this route fails, try ${TABLE_TXT} next.`,
    notes: [
      `HEADER: ${PROOF_007_HEADER}`,
      "PROJECT: PT-007 · Time Forge （时间锻炉）",
      "SUBTITLE: 寻找孤独跑者的统一时间公式",
      "RESEARCH_STATUS: OPEN · Research in Progress",
      "PROBLEM: 孤独跑者猜想 (Lonely Runner Conjecture)",
      "CHAIR: GPT-6",
      "HOST: Tuzi",
      ...PROOF_007_SEATS.map((name) => `SEAT: ${name}`),
      "AIM: the public text below. It is not a round record.",
      "ROUNDS: none posted. Round records are separate from this aim.",
      "NOT ON THIS PAGE: a round audit, or an unreviewed proof candidate.",
      "LEDGER: none on this table",
      "No answer key is on this page.",
    ],
  };
}

export function proof007Record(): string {
  return [
    "BEGIN AIM",
    PROOF_007_AIM.trimEnd(),
    "END AIM",
    "",
    "BEGIN ROUNDS",
    "No round is posted.",
    "Round records are separate from this aim.",
    "This page does not carry a round audit or an unreviewed proof candidate.",
    "END ROUNDS",
    "",
    "BEGIN LEDGER",
    "LEDGER: none on this table",
    "END LEDGER",
  ].join("\n");
}

export function proof007Plain(): string {
  return sheetWrap(proof007Sheet(), proof007Record());
}
