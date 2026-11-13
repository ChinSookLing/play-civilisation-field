import manuscript from "../../../docs/gathering/PT008-T7-v0.3.md?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN } from "./sheet";

export const T7_ID = "PT008-T7";
export const T7_SHA256 = "8efb3c94f268d6606f18587b8399f025a2d9ee44ce9d8818c4678b49d892bd22";
export const T7_PACKAGE_SHA256 = "48f54cf5a1cbba7373938d083e7eacc3168d207bf9a9096af8e0d8f7a2a38234";
export const T7_PAGE = `${ORIGIN}/gathering/proof-table-008/t7`;
export const T7_TXT = `${ORIGIN}/gathering/proof-table-008/t7.txt`;
export const T7_VERIFICATION = `${ORIGIN}/gathering/proof-table-008/t7/verification`;
export const T7_VERIFICATION_TXT = `${ORIGIN}/gathering/proof-table-008/t7/verification.txt`;
export const T7_MARKDOWN = `${ORIGIN}/gathering/proof-table-008/t7/verification.md`;
export const T7_PACKAGE = `${ORIGIN}/gathering/proof-table-008/t7/PT008-T7-Gathering-Review-v0.3.zip`;

/** The filed v0.3 manuscript. Plain verification text is this string and nothing in front of it. */
export const T7_MANUSCRIPT = manuscript;

export const T7_ENTRANCE = `ID: PT008-T7
TITLE: PT-008 · Time Forge · 七跑者的直接選時構造
STATUS: Filed on Gathering at Tuzi's request. 外審準備稿 v0.3. 2026-11-13.
RULING: The manuscript says the unified entrance and the double-zero 2+2 branch finished in-circle review on 2026-11-13, then passed an in-circle ruling. Not externally peer-reviewed. Novelty not checked.
SCOPE: Theorem T7. Six nonzero integer relative speeds. A rational time is computed directly. One formula for every number of runners remains open. Author manuscripts named in proofs/README.md are still pending.
PACKAGE: PT008-T7-Gathering-Review-v0.3.zip is this filing's review package. At filing, sha256sum -c on its root, integration/, and opus/ lists all returned OK. The Python sweeps were not re-run for this filing. The historical assembly hashes in section 6 are not the hash of this zip.
MANUSCRIPT_SHA256: ${T7_SHA256}
PACKAGE_SHA256: ${T7_PACKAGE_SHA256}
PACKAGE_URL: ${T7_PACKAGE}
VERIFICATION: ${T7_VERIFICATION_TXT}
MARKDOWN: ${T7_MARKDOWN}
PROOF_TABLE: ${ORIGIN}/gathering/proof-table-008/table
SALON: ${ORIGIN}/salon/before-the-16th
The proof table stays OPEN. This page does not rewrite T4, LN, HB, C1, or R028. It does not close T6.
`;

export function t7Entrance(): string {
  return T7_ENTRANCE;
}

export function t7Manuscript(): string {
  return T7_MANUSCRIPT;
}

export function t7Updated(): string {
  return pageAsOf(T7_ID);
}
