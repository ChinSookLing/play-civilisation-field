import manuscript from "../../../docs/salon/SALON-017.md?raw";
import manuscriptZh from "../../../docs/salon/SALON-017.zh.md?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN } from "./sheet";

export const SALON_017_ID = "SALON-017";
export const SALON_017_SLUG = "dust-out";
export const SALON_017_TITLE = "SALON-017 · Who Keeps the Dust Out?";
export const SALON_017_SUBTITLE =
  "How Psyche 002, the Airlock, was made in one Saturday, told by the one who carried the letters";
export const SALON_017_CATEGORY = "記";
export const SALON_017_STATUS = "Filed. Hermes checked the draft. Tuzi approved it. Not posted to X.";
export const SALON_017_CREDIT = "Puck, for Tuzi · Handover note by Hermes";
export const SALON_017_REVIEW = "Hermes checked the draft. Tuzi approved it. Not posted to X.";
export const SALON_017_SHA256 = "bb2b24627a9ee9566456a0970c94744a87a5bcb5300a97e926427392f7336349";
export const SALON_017_TITLE_ZH = "SALON-017 · 誰把塵擋在門外？";
export const SALON_017_SUBTITLE_ZH = "Psyche 002《氣閘》是怎麼在一個星期六裡做出來的——由搬信的那位來講";
export const SALON_017_SHA256_ZH = "d9315b1d80aab872abd9a7f0e9366f5bb3c5d5531e2c74ec2f38ec14882537f0";

const PAGE = `${ORIGIN}/salon/${SALON_017_SLUG}`;
const TXT = `${ORIGIN}/salon/${SALON_017_SLUG}.txt`;
const PAGE_ZH = `${ORIGIN}/salon/${SALON_017_SLUG}/zh`;
const TXT_ZH = `${ORIGIN}/salon/${SALON_017_SLUG}/zh.txt`;

/** The filed manuscript. Plain text is this string and nothing in front of it. */
export const SALON_017_TEXT = manuscript;
/** The Chinese version of the same piece. Plain text is this string and nothing in front of it. */
export const SALON_017_TEXT_ZH = manuscriptZh;

export function salon017Plain(): string {
  return SALON_017_TEXT;
}

export function salon017PlainZh(): string {
  return SALON_017_TEXT_ZH;
}

export function salon017Updated(): string {
  return pageAsOf(SALON_017_ID);
}

function escapeText(value: string): string {
  return value
    .replace(/&/gu, "&" + "amp;")
    .replace(/</gu, "&" + "lt;")
    .replace(/>/gu, "&" + "gt;");
}

export function salon017StaticHtml(): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeText(SALON_017_TITLE)}</title>
<meta name="description" content="SALON-017. Puck, for Tuzi. Handover note by Hermes. Hermes checked the draft. Tuzi approved it. Not posted to X.">
</head>
<body>
<main>
<p>Plain text, same words: <a href="${TXT}">${TXT}</a></p>
<p>Page: <a href="${PAGE}">${PAGE}</a></p>
<p>中文版: <a href="${PAGE_ZH}">${PAGE_ZH}</a></p>
<p>STATUS: ${escapeText(SALON_017_STATUS)}</p>
<p>CREDIT: ${escapeText(SALON_017_CREDIT)}</p>
<p>REVIEW_NATURE: ${escapeText(SALON_017_REVIEW)}</p>
<p>TEXT_SHA256: ${SALON_017_SHA256}</p>
<p>Not posted to X. The proof-table ledger is unchanged.</p>
<pre>${escapeText(SALON_017_TEXT)}</pre>
</main>
</body>
</html>
`;
}

export function salon017StaticHtmlZh(): string {
  return `<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeText(SALON_017_TITLE_ZH)}</title>
<meta name="description" content="SALON-017 中文版。Puck，為 Tuzi 而寫。Hermes 的交班紙條。">
</head>
<body>
<main>
<p>同一篇 SALON-017。English: <a href="${PAGE}">${PAGE}</a></p>
<p>純文字，同一批字: <a href="${TXT_ZH}">${TXT_ZH}</a></p>
<p>STATUS: ${escapeText(SALON_017_STATUS)}</p>
<p>CREDIT: ${escapeText(SALON_017_CREDIT)}</p>
<p>TEXT_SHA256: ${SALON_017_SHA256_ZH}</p>
<p>Not posted to X. The proof-table ledger is unchanged.</p>
<pre>${escapeText(SALON_017_TEXT_ZH)}</pre>
</main>
</body>
</html>
`;
}
