import manuscript from "../../../docs/gathering/PT008-T6-Gathering-v0.1.md?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN } from "./sheet";

export const T6_DOSSIER_ID = "PT008-T6-DOSSIER";
export const T6_DOSSIER_SHA256 = "1f42babc2a8299623855ad5d48162f97fc9a6bd5ab7e039915fb6a1bd8829e0a";
export const T6_DOSSIER_PAGE = `${ORIGIN}/gathering/proof-table-008/t6-dossier`;
export const T6_DOSSIER_TXT = `${ORIGIN}/gathering/proof-table-008/t6-dossier.txt`;
export const T6_DOSSIER_VERIFICATION = `${ORIGIN}/gathering/proof-table-008/t6-dossier/verification`;
export const T6_DOSSIER_VERIFICATION_TXT = `${ORIGIN}/gathering/proof-table-008/t6-dossier/verification.txt`;
export const T6_DOSSIER_MARKDOWN = `${ORIGIN}/gathering/proof-table-008/t6-dossier/verification.md`;

/** The filed Gathering v0.1 manuscript. Plain verification text is this string and nothing in front of it. */
export const T6_DOSSIER_MANUSCRIPT = manuscript;

export const T6_DOSSIER_ENTRANCE = `ID: PT008-T6-DOSSIER
TITLE: 六跑者構造性選時證明檔案
ENGLISH: The Sixth Runner — A Constructive Time-Selection Proof Dossier
STATUS: Filed on Gathering at Tuzi's request. Gathering v0.1. 2026-11-26.
RULING: The manuscript says the T6 integer core is closed inside the project. Not externally peer-reviewed. The terminal formula for every number of runners remains open.
SCOPE: Five nonzero integer relative speeds. Selector v0.1, sealed under A49-C02. The appendix gives a public mirror of every original.
MANUSCRIPT_SHA256: ${T6_DOSSIER_SHA256}
VERIFICATION: ${T6_DOSSIER_VERIFICATION_TXT}
MARKDOWN: ${T6_DOSSIER_MARKDOWN}
PROOF_TABLE: ${ORIGIN}/gathering/proof-table-008/table
SALON: ${ORIGIN}/salon/last-two-remainders
EARLIER_T6: ${ORIGIN}/gathering/proof-table-008/t6
The proof table stays OPEN. This page does not change the ledger.
`;

export function t6DossierEntrance(): string {
  return T6_DOSSIER_ENTRANCE;
}

export function t6DossierManuscript(): string {
  return T6_DOSSIER_MANUSCRIPT;
}

export function t6DossierUpdated(): string {
  return pageAsOf(T6_DOSSIER_ID);
}
