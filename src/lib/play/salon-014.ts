import manuscript from "../../../docs/salon/SALON-014-v0.1.md?raw";
import addendum from "../../../docs/salon/SALON-014-note-2026-11-21.md?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN } from "./sheet";

export const SALON_014_ID = "SALON-014";
export const SALON_014_SLUG = "before-the-16th";
export const SALON_014_TITLE = "第七位跑者，請在 16 日以前過線";
export const SALON_014_ENGLISH = "The Seventh Runner: Please Cross the Finish Line Before the 16th";
export const SALON_014_CATEGORY = "記";
export const SALON_014_STATUS = "Filed. v0.1. Tuzi asked for it to be filed.";
export const SALON_014_CREDIT =
  "Tuzi × GPTs · 正文 GPT · 構造與複核貢獻 Fable、Opus · 附記 Opus、Fable";
export const SALON_014_REVIEW =
  "沙龍記。合作圈內的證明與獨立複審已完成。外部同行評審（peer review）與新穎性查核尚未進行。任意人數的通式未完成。";
export const SALON_014_SHA256 = "9940e2c1f585cd86b4dd845d0c7fc03b3e2412bd830a22ce9b89fd617b7d4dd1";
export const SALON_014_ADDENDUM_SHA256 = "7d59f89036721abafafda3822583f8c23490dd1532feac84559f96156ae67f97";

const PAGE = `${ORIGIN}/salon/${SALON_014_SLUG}`;
const TXT = `${ORIGIN}/salon/${SALON_014_SLUG}.txt`;

/** The filed manuscript. Its bytes are unchanged. */
export const SALON_014_TEXT = manuscript;
/** Dated note appended after the manuscript. It does not replace it. */
export const SALON_014_ADDENDUM = addendum;

export function salon014Plain(): string {
  return `${SALON_014_TEXT}\n${SALON_014_ADDENDUM}`;
}

export function salon014Updated(): string {
  return pageAsOf(SALON_014_ID);
}

function escapeText(value: string): string {
  return value
    .replace(/&/gu, "&" + "amp;")
    .replace(/</gu, "&" + "lt;")
    .replace(/>/gu, "&" + "gt;");
}

export function salon014StaticHtml(): string {
  return `<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeText(SALON_014_TITLE)}</title>
<meta name="description" content="SALON-014 v0.1. Category 記. Filed at Tuzi's request. The manuscript says the seven-runner direct construction passed an in-circle ruling on 2026-11-13. Not externally peer-reviewed. Not posted to X. The proof-table ledger is unchanged.">
</head>
<body>
<main>
<p>Plain text, same words: <a href="${TXT}">${TXT}</a></p>
<p>Page: <a href="${PAGE}">${PAGE}</a></p>
<p>STATUS: ${escapeText(SALON_014_STATUS)}</p>
<p>CREDIT: ${escapeText(SALON_014_CREDIT)}</p>
<p>REVIEW_NATURE: ${escapeText(SALON_014_REVIEW)}</p>
<p>TEXT_SHA256: ${SALON_014_SHA256}</p>
<p>ADDENDUM: 2026-11-21. The manuscript is unchanged. TEXT_SHA256 is that manuscript. ADDENDUM_SHA256: ${SALON_014_ADDENDUM_SHA256}</p>
<p>Not posted to X. The proof-table ledger is unchanged.</p>
<pre>${escapeText(SALON_014_TEXT)}</pre>
<pre>${escapeText(SALON_014_ADDENDUM)}</pre>
</main>
</body>
</html>
`;
}
