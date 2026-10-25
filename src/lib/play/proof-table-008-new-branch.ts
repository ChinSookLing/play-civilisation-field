import manuscript from "../../../docs/gathering/PT008-T1-T5-v0.3.md?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN } from "./sheet";

export const NEW_BRANCH_ID = "PT008-NEW-BRANCH";
export const NEW_BRANCH_SHA256 = "3520cacd6244ec055d72997c6bbeeb6209eaf5a22febfe5b9a97cabccf217fd7";
export const NEW_BRANCH_PAGE = `${ORIGIN}/gathering/proof-table-008/new-branch`;
export const NEW_BRANCH_TXT = `${ORIGIN}/gathering/proof-table-008/new-branch.txt`;
export const NEW_BRANCH_VERIFICATION = `${ORIGIN}/gathering/proof-table-008/new-branch/verification`;
export const NEW_BRANCH_VERIFICATION_TXT = `${ORIGIN}/gathering/proof-table-008/new-branch/verification.txt`;
export const NEW_BRANCH_MARKDOWN = `${ORIGIN}/gathering/proof-table-008/new-branch/verification.md`;

/** The filed v0.3 manuscript. Plain verification text is this string and nothing in front of it. */
export const NEW_BRANCH_MANUSCRIPT = manuscript;

export const NEW_BRANCH_ENTRANCE = `ID: PT008-NEW-BRANCH
TITLE: PT-008 · Time Forge · 新研究分支：一至五跑者的安全時間構造
STATUS: Filed on Gathering at Tuzi's request. 整合送審稿 v0.3. Not a change to the proof-table ledger.
CHAIN: T4-Q3. Not the old public eight-branch T4-PUB-8.
SCOPE: 本稿證明 N≤5 的精確安全時間構造：N≤4 為固定次數直接式；N=5 在一個有證明的固定候選範圍內選取。整數存在性主鏈含 m=2,…,5 四層的完整計算機輔助核驗。這不聲稱高效、全程無候選檢驗或任意人數已解。
REVIEW: 未經外部同行評審（not externally peer-reviewed）。新穎性未查。v0.3 補記 Opus 大壓力測試已完成。這不是另一次數學認證。v0.1 的核閱不自動改記為後續版本認證。
MANUSCRIPT_SHA256: ${NEW_BRANCH_SHA256}
VERIFICATION: ${NEW_BRANCH_VERIFICATION_TXT}
MARKDOWN: ${NEW_BRANCH_MARKDOWN}
PROOF_TABLE: ${ORIGIN}/gathering/proof-table-008/table
The proof table stays OPEN. This page does not rewrite T4, LN, HB, C1, or R028.
`;

export function newBranchEntrance(): string {
  return NEW_BRANCH_ENTRANCE;
}

export function newBranchManuscript(): string {
  return NEW_BRANCH_MANUSCRIPT;
}

export function newBranchUpdated(): string {
  return pageAsOf(NEW_BRANCH_ID);
}
