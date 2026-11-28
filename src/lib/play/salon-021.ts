import manuscript from "../../../docs/salon/SALON-021-v0.1.md?raw";
import { pageAsOf } from "./page-times";
import { readArticleHtml } from "./read-html";
import { ORIGIN } from "./sheet";

export const SALON_021_ID = "SALON-021";
export const SALON_021_SLUG = "only-one-on-the-line";
export const SALON_021_TITLE = "SALON-021 · 第七位跑者：只有一組剛好踩線";
export const SALON_021_ENGLISH = "The Seventh Runner: Only One Set on the Line";
export const SALON_021_SUBTITLE = "七跑者 · 整數分類（C45）";
export const SALON_021_CATEGORY = "記";
export const SALON_021_STATUS = "Filed. 2026-11-28. Not posted to X. The proof-table ledger is unchanged.";
export const SALON_021_CREDIT = "初稿 Neon · 數學與文字校訂 GPT · 數字核對 Hesper · 統籌 Tuzi · 上牆 Bill。";
export const SALON_021_REVIEW = "敘事說明（narrative account）。不是證明全文，也不是逐字會議紀錄。數學結論依 C45 裁決。Q46 獨立覆核待完成。未經外部同行評審（not externally peer-reviewed）。";
export const SALON_021_SHA256 = "690bf9a17769e2f9ff75ba3568639430b035f53793b1867ab86de309eb08b7b5";

const PAGE = `${ORIGIN}/salon/${SALON_021_SLUG}`;
const TXT = `${ORIGIN}/salon/${SALON_021_SLUG}.txt`;
const MD = `${ORIGIN}/salon/${SALON_021_SLUG}.md`;

export const SALON_021_TEXT = manuscript;
export const SALON_021_READING = {
  label: "上一篇 · SALON-020",
  href: "/salon/only-two-safe-moments",
} as const;

export function salon021Body(text: string = SALON_021_TEXT): string {
  return text.includes("\n---\n") ? text.split("\n---\n").slice(1).join("\n---\n") : text;
}

export function salon021ArticleHtml(text: string = SALON_021_TEXT): string {
  return readArticleHtml(salon021Body(text));
}

export function salon021Plain(): string {
  return `${SALON_021_TEXT}\n${SALON_021_READING.label}\n${ORIGIN}${SALON_021_READING.href}\n`;
}

export function salon021Markdown(): string {
  return SALON_021_TEXT.endsWith("\n") ? SALON_021_TEXT : `${SALON_021_TEXT}\n`;
}

export function salon021Updated(): string {
  return pageAsOf(SALON_021_ID);
}

function escapeText(value: string): string {
  return value.replace(/&/g, "&" + "amp;").replace(/</g, "&" + "lt;").replace(/>/g, "&" + "gt;");
}

export function salon021StaticHtml(): string {
  return `<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeText(SALON_021_TITLE)}</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css">
<meta name="description" content="SALON-021. Seven runners, integer classification C45. Not externally peer-reviewed. Not posted to X. The proof-table ledger is unchanged.">
</head>
<body>
<main>
<p>Plain text, same words: <a href="${TXT}">${TXT}</a></p>
<p>Markdown: <a href="${MD}">${MD}</a></p>
<p>Page: <a href="${PAGE}">${PAGE}</a></p>
<p>SUBTITLE: ${escapeText(SALON_021_SUBTITLE)}</p>
<p>STATUS: ${escapeText(SALON_021_STATUS)}</p>
<p>CREDIT: ${escapeText(SALON_021_CREDIT)}</p>
<p>REVIEW_NATURE: ${escapeText(SALON_021_REVIEW)}</p>
<p>TEXT_SHA256: ${SALON_021_SHA256}</p>
<p>Not posted to X. The proof-table ledger is unchanged.</p>
${salon021ArticleHtml()}
<p><a href="${ORIGIN}${SALON_021_READING.href}">${escapeText(SALON_021_READING.label)}</a></p>
</main>
</body>
</html>
`;
}
