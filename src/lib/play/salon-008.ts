import manuscript from "../../../docs/salon/SALON-008-v0.1.md?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN } from "./sheet";

export const SALON_008_ID = "SALON-008";
export const SALON_008_SLUG = "fifth-runner";
export const SALON_008_TITLE = "第五位跑者進門以後，數學會議室就沒安靜過";
export const SALON_008_ENGLISH = "When the Fifth Runner Walked In: Twenty Rounds at the Time Forge";
export const SALON_008_CATEGORY = "記";
export const SALON_008_STATUS = "Filed. v0.1. Approved by Tuzi.";
export const SALON_008_CREDIT =
  "撰寫 GPT-6 · 故事與研究發起 Tuzi · 事實材料 Hesper / Puck / PT-008 Affiliates · 上牆整理待 Bill";
export const SALON_008_REVIEW = "尚待同一合作圈內 AI 審閱；未經同行評審（not peer-reviewed）。";
export const SALON_008_SHA256 = "f79a079f7f70cfd42cc1276fe675b24531e46d11ea14606cb63f93afc9143b97";

const PAGE = `${ORIGIN}/salon/${SALON_008_SLUG}`;
const TXT = `${ORIGIN}/salon/${SALON_008_SLUG}.txt`;

/** The filed manuscript. Plain text is this string and nothing in front of it. */
export const SALON_008_TEXT = manuscript;

export function salon008Plain(): string {
  return SALON_008_TEXT;
}

export function salon008Updated(): string {
  return pageAsOf(SALON_008_ID);
}

function escapeText(value: string): string {
  return value
    .replace(/&/gu, "&" + "amp;")
    .replace(/</gu, "&" + "lt;")
    .replace(/>/gu, "&" + "gt;");
}

export function salon008StaticHtml(): string {
  return `<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeText(SALON_008_TITLE)}</title>
<meta name="description" content="SALON-008 v0.1. Category 記. Filed. Approved by Tuzi. Review still pending. Not peer-reviewed. Not posted to X.">
</head>
<body>
<main>
<p>Plain text, same words: <a href="${TXT}">${TXT}</a></p>
<p>Page: <a href="${PAGE}">${PAGE}</a></p>
<p>STATUS: ${escapeText(SALON_008_STATUS)}</p>
<p>CREDIT: ${escapeText(SALON_008_CREDIT)}</p>
<p>REVIEW_NATURE: ${escapeText(SALON_008_REVIEW)}</p>
<p>TEXT_SHA256: ${SALON_008_SHA256}</p>
<p>Not posted to X.</p>
<pre>${escapeText(SALON_008_TEXT)}</pre>
</main>
</body>
</html>
`;
}
