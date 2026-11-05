import manuscript from "../../../docs/salon/SALON-011-v0.3.md?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN } from "./sheet";

export const SALON_011_ID = "SALON-011";
export const SALON_011_SLUG = "red-ink";
export const SALON_011_TITLE = "第六位跑者，請留步——這次紅筆畫成了地圖";
export const SALON_011_ENGLISH = "The Sixth Runner and the Map in Red Ink";
export const SALON_011_CATEGORY = "記";
export const SALON_011_STATUS =
  "Filed. v0.3. Tuzi asked for it to be filed. Revised after Puck and Opus. Direct construction for six runners remains UNFINISHED.";
export const SALON_011_CREDIT =
  "撰寫 GPT · 故事與研究發起 Tuzi · 本篇所述研究與核閱涉及 GPT、Opus、Puck · 具體技術貢獻依各輪原始材料另列。";
export const SALON_011_REVIEW =
  "武俠電影式敘事改編（dramatised narrative）。場景、動作及人物對白為依研究材料創作。技術狀態按項目內證明與核閱紀錄區分，外部同行評審與新穎性查核待辦。";
export const SALON_011_SHA256 = "5af408f632a2f947d1e9eb193f2590fa3ed0b9aa27fc2ce627a822c24cdad79f";

const PAGE = `${ORIGIN}/salon/${SALON_011_SLUG}`;
const TXT = `${ORIGIN}/salon/${SALON_011_SLUG}.txt`;

/** The filed manuscript. Plain text is this string and nothing in front of it. */
export const SALON_011_TEXT = manuscript;

export function salon011Plain(): string {
  return SALON_011_TEXT;
}

export function salon011Updated(): string {
  return pageAsOf(SALON_011_ID);
}

function escapeText(value: string): string {
  return value
    .replace(/&/gu, "&" + "amp;")
    .replace(/</gu, "&" + "lt;")
    .replace(/>/gu, "&" + "gt;");
}

export function salon011StaticHtml(): string {
  return `<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeText(SALON_011_TITLE)}</title>
<meta name="description" content="SALON-011 v0.3. Category 記. Filed at Tuzi's request. A dramatised narrative, not a transcript. Six-runner direct construction remains UNFINISHED. Not peer-reviewed. Not posted to X.">
</head>
<body>
<main>
<p>Plain text, same words: <a href="${TXT}">${TXT}</a></p>
<p>Page: <a href="${PAGE}">${PAGE}</a></p>
<p>STATUS: ${escapeText(SALON_011_STATUS)}</p>
<p>CREDIT: ${escapeText(SALON_011_CREDIT)}</p>
<p>REVIEW_NATURE: ${escapeText(SALON_011_REVIEW)}</p>
<p>TEXT_SHA256: ${SALON_011_SHA256}</p>
<p>Not posted to X.</p>
<pre>${escapeText(SALON_011_TEXT)}</pre>
</main>
</body>
</html>
`;
}
