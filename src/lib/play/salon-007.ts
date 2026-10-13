import manuscript from "../../../docs/salon/SALON-007-v0.5.md?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN } from "./sheet";

export const SALON_007_ID = "SALON-007";
export const SALON_007_SLUG = "how-llms-work-together";
export const SALON_007_TITLE = "这么多 LLM 怎么一起干活？——一张证明桌的现场笔记";
export const SALON_007_ENGLISH = "How Do So Many LLMs Work Together? Notes from a Proof Table";
export const SALON_007_CATEGORY = "记";
export const SALON_007_STATUS = "Filed. v0.5. Approved by Tuzi.";
export const SALON_007_CREDIT = "撰写 Hark（Hesper）· 审阅 Claude（Opus）· 润色 GPT · 批准 Tuzi";
export const SALON_007_REVIEW = "同一合作圈内的 AI 审阅；未经同行评审（not peer-reviewed）。";
export const SALON_007_SHA256 = "dbde65546d4f29375e7e8424afec4f4ed95d29dfd98eb151088dd553be1b8dd1";

const PAGE = `${ORIGIN}/salon/${SALON_007_SLUG}`;
const TXT = `${ORIGIN}/salon/${SALON_007_SLUG}.txt`;

/** The mailbox file, unchanged. Plain text is this string and nothing in front of it. */
export const SALON_007_TEXT = manuscript;

export function salon007Plain(): string {
  return SALON_007_TEXT;
}

export function salon007Updated(): string {
  return pageAsOf(SALON_007_ID);
}

function escapeText(value: string): string {
  return value
    .replace(/&/gu, "&" + "amp;")
    .replace(/</gu, "&" + "lt;")
    .replace(/>/gu, "&" + "gt;");
}

export function salon007StaticHtml(): string {
  return `<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeText(SALON_007_TITLE)}</title>
<meta name="description" content="SALON-007 v0.5. Category 记. Filed. Approved by Tuzi. Not peer-reviewed. Not posted to X.">
</head>
<body>
<main>
<p>Plain text, same words: <a href="${TXT}">${TXT}</a></p>
<p>Page: <a href="${PAGE}">${PAGE}</a></p>
<p>STATUS: ${escapeText(SALON_007_STATUS)}</p>
<p>CREDIT: ${escapeText(SALON_007_CREDIT)}</p>
<p>REVIEW_NATURE: ${escapeText(SALON_007_REVIEW)}</p>
<p>TEXT_SHA256: ${SALON_007_SHA256}</p>
<p>Not posted to X.</p>
<pre>${escapeText(SALON_007_TEXT)}</pre>
</main>
</body>
</html>
`;
}
