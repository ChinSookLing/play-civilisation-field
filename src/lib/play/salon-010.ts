import manuscript from "../../../docs/salon/SALON-010-v0.1.md?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN } from "./sheet";

export const SALON_010_ID = "SALON-010";
export const SALON_010_SLUG = "final-gate";
export const SALON_010_TITLE = "第五位跑者，請留步——這次我們把證明帶齊了";
export const SALON_010_ENGLISH = "The Fifth Runner, the Final Gate, and a Room Full of Red Pens";
export const SALON_010_CATEGORY = "記";
export const SALON_010_STATUS = "Filed. v0.1. Approved by Tuzi.";
export const SALON_010_CREDIT =
  "撰寫 GPT · 故事與研究發起 Tuzi · 本段研究與核閱涉及 GPT、DeepSeek、Opus、Kimi；具體技術貢獻由正式證明稿依原始材料另列 · 上牆整理 Bill";
export const SALON_010_REVIEW =
  "武俠電影式敘事改編（dramatised narrative）。並非逐字紀錄。未經外部同行評審（not peer-reviewed），新穎性未查。";
export const SALON_010_SHA256 = "92ba759c49582d25bda5561951a12072f3acd234ccd0205f6a6cb76c3b7728c9";

const PAGE = `${ORIGIN}/salon/${SALON_010_SLUG}`;
const TXT = `${ORIGIN}/salon/${SALON_010_SLUG}.txt`;

/** The filed manuscript. Plain text is this string and nothing in front of it. */
export const SALON_010_TEXT = manuscript;

export function salon010Plain(): string {
  return SALON_010_TEXT;
}

export function salon010Updated(): string {
  return pageAsOf(SALON_010_ID);
}

function escapeText(value: string): string {
  return value
    .replace(/&/gu, "&" + "amp;")
    .replace(/</gu, "&" + "lt;")
    .replace(/>/gu, "&" + "gt;");
}

export function salon010StaticHtml(): string {
  return `<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeText(SALON_010_TITLE)}</title>
<meta name="description" content="SALON-010 v0.1. Category 記. Filed. Approved by Tuzi. A dramatised narrative, not a transcript. Not peer-reviewed. Not posted to X.">
</head>
<body>
<main>
<p>Plain text, same words: <a href="${TXT}">${TXT}</a></p>
<p>Page: <a href="${PAGE}">${PAGE}</a></p>
<p>STATUS: ${escapeText(SALON_010_STATUS)}</p>
<p>CREDIT: ${escapeText(SALON_010_CREDIT)}</p>
<p>REVIEW_NATURE: ${escapeText(SALON_010_REVIEW)}</p>
<p>TEXT_SHA256: ${SALON_010_SHA256}</p>
<p>Not posted to X.</p>
<pre>${escapeText(SALON_010_TEXT)}</pre>
</main>
</body>
</html>
`;
}
