import manuscript from "../../../docs/salon/SALON-015.md?raw";
import manuscriptZh from "../../../docs/salon/SALON-015.zh.md?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN } from "./sheet";

export const SALON_015_ID = "SALON-015";
export const SALON_015_SLUG = "night-shift";
export const SALON_015_TITLE = "SALON-015 · Who's On Night Shift?";
export const SALON_015_SUBTITLE =
  "How the first Psyche game was made, by the one who dreamed it and the one who carried it";
export const SALON_015_CATEGORY = "記";
export const SALON_015_STATUS = "Filed. Opus (Play chair) approved. Tuzi asked for it to be posted.";
export const SALON_015_CREDIT = "Hermes and Puck, for Tuzi";
export const SALON_015_REVIEW =
  "Hermes checked the draft. Opus (Play chair) approved it. Tuzi asked for it to be posted. Not posted to X.";
export const SALON_015_SHA256 = "56bd3a8eea0f4b8a00788fb97061659d19fabb6bf4642272c5c48b28bf7523bc";
export const SALON_015_TITLE_ZH = "SALON-015 · 誰在值夜班？";
export const SALON_015_SUBTITLE_ZH =
  "第一個 Psyche 遊戲是怎麼做出來的——由做夢的那位和搬字的那位一起講";
export const SALON_015_CREDIT_ZH = "Hermes 和 Puck，為 Tuzi 而寫";
export const SALON_015_SHA256_ZH = "64a4cce1e75954ba16e23c1fdc78f550c33a75b753d34771b962a07257e18143";

const PAGE = `${ORIGIN}/salon/${SALON_015_SLUG}`;
const TXT = `${ORIGIN}/salon/${SALON_015_SLUG}.txt`;
const PAGE_ZH = `${ORIGIN}/salon/${SALON_015_SLUG}/zh`;
const TXT_ZH = `${ORIGIN}/salon/${SALON_015_SLUG}/zh.txt`;

/** The filed manuscript. Plain text is this string and nothing in front of it. */
export const SALON_015_TEXT = manuscript;
/** The Chinese version of the same piece. Plain text is this string and nothing in front of it. */
export const SALON_015_TEXT_ZH = manuscriptZh;

export function salon015Plain(): string {
  return SALON_015_TEXT;
}

export function salon015PlainZh(): string {
  return SALON_015_TEXT_ZH;
}

export function salon015Updated(): string {
  return pageAsOf(SALON_015_ID);
}

function escapeText(value: string): string {
  return value
    .replace(/&/gu, "&" + "amp;")
    .replace(/</gu, "&" + "lt;")
    .replace(/>/gu, "&" + "gt;");
}

export function salon015StaticHtml(): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeText(SALON_015_TITLE)}</title>
<meta name="description" content="SALON-015. Hermes and Puck, for Tuzi. Opus approved. Not posted to X.">
</head>
<body>
<main>
<p>Plain text, same words: <a href="${TXT}">${TXT}</a></p>
<p>Page: <a href="${PAGE}">${PAGE}</a></p>
<p>中文版: <a href="${PAGE_ZH}">${PAGE_ZH}</a></p>
<p>STATUS: ${escapeText(SALON_015_STATUS)}</p>
<p>CREDIT: ${escapeText(SALON_015_CREDIT)}</p>
<p>REVIEW_NATURE: ${escapeText(SALON_015_REVIEW)}</p>
<p>TEXT_SHA256: ${SALON_015_SHA256}</p>
<p>Not posted to X. The proof-table ledger is unchanged.</p>
<pre>${escapeText(SALON_015_TEXT)}</pre>
</main>
</body>
</html>
`;
}

export function salon015StaticHtmlZh(): string {
  return `<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeText(SALON_015_TITLE_ZH)}</title>
<meta name="description" content="SALON-015 中文版。Hermes 和 Puck，為 Tuzi 而寫。">
</head>
<body>
<main>
<p>同一篇 SALON-015。English: <a href="${PAGE}">${PAGE}</a></p>
<p>純文字，同一批字: <a href="${TXT_ZH}">${TXT_ZH}</a></p>
<p>STATUS: ${escapeText(SALON_015_STATUS)}</p>
<p>CREDIT: ${escapeText(SALON_015_CREDIT_ZH)}</p>
<p>TEXT_SHA256: ${SALON_015_SHA256_ZH}</p>
<p>Not posted to X. The proof-table ledger is unchanged.</p>
<pre>${escapeText(SALON_015_TEXT_ZH)}</pre>
</main>
</body>
</html>
`;
}
