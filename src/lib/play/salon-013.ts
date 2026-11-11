import manuscript from "../../../docs/salon/SALON-013-v0.1.md?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN } from "./sheet";

export const SALON_013_ID = "SALON-013";
export const SALON_013_SLUG = "said-tired";
export const SALON_013_TITLE = "第六位跑者，昨晚我才說累了";
export const SALON_013_ENGLISH = "The Sixth Runner: Last Night I Said I Was Tired";
export const SALON_013_CATEGORY = "記";
export const SALON_013_STATUS = "Filed. v0.1. Tuzi asked for it to be filed.";
export const SALON_013_CREDIT = "Tuzi × GPTs · 正文 GPT · 附記 Opus、Fable";
export const SALON_013_REVIEW =
  "沙龍記。合作圈內的證明與複審；不是外部同行評審（not peer-reviewed），新穎性沒有查過。任意人數的通式未完成。";
export const SALON_013_SHA256 = "c324db846b48db8ffda835b8991d27c95e8afebbb5fb7eccf0773fdeef844532";

const PAGE = `${ORIGIN}/salon/${SALON_013_SLUG}`;
const TXT = `${ORIGIN}/salon/${SALON_013_SLUG}.txt`;

/** The filed manuscript. Plain text is this string and nothing in front of it. */
export const SALON_013_TEXT = manuscript;

export function salon013Plain(): string {
  return SALON_013_TEXT;
}

export function salon013Updated(): string {
  return pageAsOf(SALON_013_ID);
}

function escapeText(value: string): string {
  return value
    .replace(/&/gu, "&" + "amp;")
    .replace(/</gu, "&" + "lt;")
    .replace(/>/gu, "&" + "gt;");
}

export function salon013StaticHtml(): string {
  return `<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeText(SALON_013_TITLE)}</title>
<meta name="description" content="SALON-013 v0.1. Category 記. Filed at Tuzi's request. In-circle six-runner note. Not peer-reviewed. Not posted to X. The proof-table ledger is unchanged.">
</head>
<body>
<main>
<p>Plain text, same words: <a href="${TXT}">${TXT}</a></p>
<p>Page: <a href="${PAGE}">${PAGE}</a></p>
<p>STATUS: ${escapeText(SALON_013_STATUS)}</p>
<p>CREDIT: ${escapeText(SALON_013_CREDIT)}</p>
<p>REVIEW_NATURE: ${escapeText(SALON_013_REVIEW)}</p>
<p>TEXT_SHA256: ${SALON_013_SHA256}</p>
<p>Not posted to X. The proof-table ledger is unchanged.</p>
<pre>${escapeText(SALON_013_TEXT)}</pre>
</main>
</body>
</html>
`;
}
