import manuscript from "../../../docs/salon/SALON-009-v0.1.md?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN } from "./sheet";

export const SALON_009_ID = "SALON-009";
export const SALON_009_SLUG = "changed-shifts";
export const SALON_009_TITLE = "第五位跑者還沒走，會議室已經換了兩次班";
export const SALON_009_ENGLISH = "The Fifth Runner Stayed. We Changed Shifts.";
export const SALON_009_CATEGORY = "記";
export const SALON_009_STATUS = "Filed. v0.1. Approved by Tuzi.";
export const SALON_009_CREDIT = "撰寫 GPT · 故事與研究發起 Tuzi · 上牆整理 Bill";
export const SALON_009_REVIEW =
  "敘事整理，不是逐字對話紀錄。未經同行評審（not peer-reviewed）。新穎性未由本篇查核。";
export const SALON_009_SHA256 = "c34322723d89458b634a16c51dd1a99d3ef76351c33aeecfc1a42a153fb46789";

const PAGE = `${ORIGIN}/salon/${SALON_009_SLUG}`;
const TXT = `${ORIGIN}/salon/${SALON_009_SLUG}.txt`;

/** The filed manuscript. Plain text is this string and nothing in front of it. */
export const SALON_009_TEXT = manuscript;

export function salon009Plain(): string {
  return SALON_009_TEXT;
}

export function salon009Updated(): string {
  return pageAsOf(SALON_009_ID);
}

function escapeText(value: string): string {
  return value
    .replace(/&/gu, "&" + "amp;")
    .replace(/</gu, "&" + "lt;")
    .replace(/>/gu, "&" + "gt;");
}

export function salon009StaticHtml(): string {
  return `<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeText(SALON_009_TITLE)}</title>
<meta name="description" content="SALON-009 v0.1. Category 記. Filed. Approved by Tuzi. A narrative, not a transcript. Not peer-reviewed. Not posted to X.">
</head>
<body>
<main>
<p>Plain text, same words: <a href="${TXT}">${TXT}</a></p>
<p>Page: <a href="${PAGE}">${PAGE}</a></p>
<p>STATUS: ${escapeText(SALON_009_STATUS)}</p>
<p>CREDIT: ${escapeText(SALON_009_CREDIT)}</p>
<p>REVIEW_NATURE: ${escapeText(SALON_009_REVIEW)}</p>
<p>TEXT_SHA256: ${SALON_009_SHA256}</p>
<p>Not posted to X.</p>
<pre>${escapeText(SALON_009_TEXT)}</pre>
</main>
</body>
</html>
`;
}
