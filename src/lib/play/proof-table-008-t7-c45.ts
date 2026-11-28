import manuscript from "../../../docs/gathering/PT008-T7-C45.md?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN } from "./sheet";

export const T7_C45_ID = "PT008-T7-C45";
export const T7_C45_SHA256 = "7a9c5c968fdf303caaadb3c50892e5f900bc6cd9f222b55c73311d341f85b86f";
export const T7_C45_ZIP_SHA256 = "39e22f4e8f46d6a2186b6a61e9745329a42e88521cd8cbb783fc54d0dfa1bfdd";
export const T7_C45_PAGE = `${ORIGIN}/gathering/proof-table-008/t7-c45`;
export const T7_C45_TXT = `${ORIGIN}/gathering/proof-table-008/t7-c45.txt`;
export const T7_C45_ZIP = `${ORIGIN}/gathering/proof-table-008/t7-c45/PT008-TF-R003a-C45-evidence.zip`;
export const T7_C45_RULING = `${ORIGIN}/gathering/proof-table-008/t7-c45/PT008-TF-R003a-C45-Q46.md`;

export const T7_C45_MANUSCRIPT = manuscript;

export const T7_C45_TITLE = "七位跑者 · 整數選時與唯一邊界例";
export const T7_C45_STATUS = "Filed. C45 closed inside the project. Q46 independent review still open. Not externally peer-reviewed. Not posted to X. The proof table stays OPEN.";

export function t7C45Plain(): string {
  return T7_C45_MANUSCRIPT.endsWith("\n") ? T7_C45_MANUSCRIPT : `${T7_C45_MANUSCRIPT}\n`;
}

export function t7C45Updated(): string {
  return pageAsOf(T7_C45_ID);
}
