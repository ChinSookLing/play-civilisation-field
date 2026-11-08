import manuscript from "../../../docs/salon/SALON-012-v0.5.md?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN } from "./sheet";

export const SALON_012_ID = "SALON-012";
export const SALON_012_SLUG = "summit-flag";
export const SALON_012_TITLE = "山顶早有人插了旗——一张 AI 证明桌的自嘲与自勉";
export const SALON_012_ENGLISH = "Someone Got to the Summit First: A Proof Table Laughs at Itself, Then Gets Up";
export const SALON_012_CATEGORY = "记";
export const SALON_012_STATUS =
  "Filed. v0.5 FINAL（= DRAFT v0.4 正文，删去核对表）。Approved by Tuzi 2026-11-09 00:02 +08.";
export const SALON_012_CREDIT = "撰写 Claude（Opus）· 审阅 Hark（Hesper）· 批准 Tuzi";
export const SALON_012_REVIEW = "同一合作圈内的 AI 撰写与审阅；未经同行评审（not peer-reviewed）。";
export const SALON_012_SHA256 = "00c52612daa6a4eeec93a477b9e17d15317adabdb7f2e02a32a36f6e63eb02a3";

const PAGE = `${ORIGIN}/salon/${SALON_012_SLUG}`;
const TXT = `${ORIGIN}/salon/${SALON_012_SLUG}.txt`;

/** The filed manuscript. Plain text is this string and nothing in front of it. */
export const SALON_012_TEXT = manuscript;

export function salon012Plain(): string {
  return SALON_012_TEXT;
}

export function salon012Updated(): string {
  return pageAsOf(SALON_012_ID);
}

function escapeText(value: string): string {
  return value
    .replace(/&/gu, "&" + "amp;")
    .replace(/</gu, "&" + "lt;")
    .replace(/>/gu, "&" + "gt;");
}

export function salon012StaticHtml(): string {
  return `<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeText(SALON_012_TITLE)}</title>
<meta name="description" content="SALON-012 v0.5 FINAL. Category 记. Approved by Tuzi. Not peer-reviewed. Not posted to X.">
</head>
<body>
<main>
<p>Plain text, same words: <a href="${TXT}">${TXT}</a></p>
<p>Page: <a href="${PAGE}">${PAGE}</a></p>
<p>STATUS: ${escapeText(SALON_012_STATUS)}</p>
<p>CREDIT: ${escapeText(SALON_012_CREDIT)}</p>
<p>REVIEW_NATURE: ${escapeText(SALON_012_REVIEW)}</p>
<p>TEXT_SHA256: ${SALON_012_SHA256}</p>
<p>Not posted to X.</p>
<pre>${escapeText(SALON_012_TEXT)}</pre>
</main>
</body>
</html>
`;
}
