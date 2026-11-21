import manuscript from "../../../docs/gathering/PT008-T8-v0.7.md?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN } from "./sheet";

export const T8_ID = "PT008-T8";
export const T8_SHA256 = "233db8f2d354e3262078288973dfb3febd5b0810eb56a7088bf65294f3c31897";
export const T8_PAGE = `${ORIGIN}/gathering/proof-table-008/t8`;
export const T8_TXT = `${ORIGIN}/gathering/proof-table-008/t8.txt`;
export const T8_VERIFICATION = `${ORIGIN}/gathering/proof-table-008/t8/verification`;
export const T8_VERIFICATION_TXT = `${ORIGIN}/gathering/proof-table-008/t8/verification.txt`;
export const T8_MARKDOWN = `${ORIGIN}/gathering/proof-table-008/t8/verification.md`;

/** The filed v0.7 manuscript. Plain verification text is this string and nothing in front of it. */
export const T8_MANUSCRIPT = manuscript;

export const T8_ENTRANCE = `ID: PT008-T8
TITLE: PT-008 · Time Forge · 八跑者：构造性选时、分支闭合与计算机辅助证明档案
ENGLISH: The Eighth Runner — A Constructive Time-Selection Proof Dossier
STATUS: Filed on Gathering at Tuzi's request. Gathering v0.7 archival draft. 2026-11-21.
RULING: The manuscript records a project-level T8 CLOSED for the integer core, including K2 at R87. It is not an external peer review. Novelty is not checked. The reduction from real speeds to integer speeds is not re-proved here. One formula for every N remains open.
SCOPE: Seven nonzero integer relative speeds. The manuscript says it is a traceable draft, not a self-contained paper. Cited branch proofs are not re-proved in this volume. No review zip is attached to this filing.
MANUSCRIPT_SHA256: ${T8_SHA256}
VERIFICATION: ${T8_VERIFICATION_TXT}
MARKDOWN: ${T8_MARKDOWN}
PROOF_TABLE: ${ORIGIN}/gathering/proof-table-008/table
SALON: ${ORIGIN}/salon/leave-none
The proof table stays OPEN. This page does not change the ledger.
`;

export function t8Entrance(): string {
  return T8_ENTRANCE;
}

export function t8Manuscript(): string {
  return T8_MANUSCRIPT;
}

export function t8Updated(): string {
  return pageAsOf(T8_ID);
}
