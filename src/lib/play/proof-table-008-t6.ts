import manuscript from "../../../docs/gathering/PT008-T6-v0.2.md?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN } from "./sheet";

export const T6_ID = "PT008-T6";
export const T6_SHA256 = "08d8898e8ee4add10816003ca5f218d087d08a3584cbd852f027caa690b594fd";
export const T6_PAGE = `${ORIGIN}/gathering/proof-table-008/t6`;
export const T6_TXT = `${ORIGIN}/gathering/proof-table-008/t6.txt`;
export const T6_VERIFICATION = `${ORIGIN}/gathering/proof-table-008/t6/verification`;
export const T6_VERIFICATION_TXT = `${ORIGIN}/gathering/proof-table-008/t6/verification.txt`;
export const T6_MARKDOWN = `${ORIGIN}/gathering/proof-table-008/t6/verification.md`;

/** The filed v0.2 manuscript. Plain verification text is this string and nothing in front of it. */
export const T6_MANUSCRIPT = manuscript;

export const T6_ENTRANCE = `ID: PT008-T6
TITLE: PT-008 · Time Forge · 六跑者的安全時間構造
STATUS: Filed on Gathering at Tuzi's request. 整合修訂稿 v0.2. 2026-11-12.
RULING: The manuscript says the six-runner integer construction passed an in-circle ruling on 2026-11-11. Not externally peer-reviewed. Novelty not checked.
SCOPE: Theorem T6. Five positive integer relative speeds. A rational time is computed directly. One formula for every number of runners remains open.
PACKAGE: The replay directory, source ZIPs, and SHA256SUMS named in sections 7 and 8 were not included in this filing. This page is the manuscript only.
MANUSCRIPT_SHA256: ${T6_SHA256}
VERIFICATION: ${T6_VERIFICATION_TXT}
MARKDOWN: ${T6_MARKDOWN}
PROOF_TABLE: ${ORIGIN}/gathering/proof-table-008/table
SALON: ${ORIGIN}/salon/said-tired
The proof table stays OPEN. This page does not rewrite T4, LN, HB, C1, or R028.
`;

export function t6Entrance(): string {
  return T6_ENTRANCE;
}

export function t6Manuscript(): string {
  return T6_MANUSCRIPT;
}

export function t6Updated(): string {
  return pageAsOf(T6_ID);
}
