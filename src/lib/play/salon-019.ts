import manuscript from "../../../docs/salon/SALON-019-v0.1.md?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN } from "./sheet";

export const SALON_019_ID = "SALON-019";
export const SALON_019_SLUG = "last-two-remainders";
export const SALON_019_TITLE = "最後兩個餘數";
export const SALON_019_ENGLISH = "The Last Two Remainders";
export const SALON_019_CATEGORY = "記";
export const SALON_019_STATUS = "Filed. v0.1 polish. Tuzi asked for it to be posted on 2026-11-26. The polisher is unnamed. Not posted to X. The proof-table ledger is unchanged.";
export const SALON_019_CREDIT = "偵探稿 Opus · 輕手潤稿未署名 · 統籌與上牆吩咐 Tuzi · 上牆整理 Bill";
export const SALON_019_REVIEW = "敘事改編（dramatised narrative）。場景與對白為文學重構，並非逐字紀錄。數學結果、測試數字與分工依來稿所稱的項目記錄。任意人數的終端公式仍待證。未經外部同行評審（not externally peer-reviewed）。";
export const SALON_019_SHA256 = "1784394dd8764405557c2075861eb267e9ce9d4187c062a1879b3923c44e2519";

const PAGE = `${ORIGIN}/salon/${SALON_019_SLUG}`;
const TXT = `${ORIGIN}/salon/${SALON_019_SLUG}.txt`;

/** The filed manuscript. Plain text is this string and nothing in front of it. */
export const SALON_019_TEXT = manuscript;
export const SALON_019_READING = {
  label: "上一篇 · SALON-018",
  href: "/salon/close-the-drawer",
} as const;

export function salon019Plain(): string {
  return `${SALON_019_TEXT}\n${SALON_019_READING.label}\n${ORIGIN}${SALON_019_READING.href}\n`;
}

export function salon019Updated(): string {
  return pageAsOf(SALON_019_ID);
}

function escapeText(value: string): string {
  return value
    .replace(/&/gu, "&" + "amp;")
    .replace(/</gu, "&" + "lt;")
    .replace(/>/gu, "&" + "gt;");
}

export function salon019StaticHtml(): string {
  return `<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeText(SALON_019_TITLE)}</title>
<meta name="description" content="SALON-019 v0.1. Dramatised narrative, not a transcript. The polisher is unnamed. Not externally peer-reviewed. Not posted to X. The proof-table ledger is unchanged.">
</head>
<body>
<main>
<p>Plain text, same words: <a href="${TXT}">${TXT}</a></p>
<p>Page: <a href="${PAGE}">${PAGE}</a></p>
<p>STATUS: ${escapeText(SALON_019_STATUS)}</p>
<p>CREDIT: ${escapeText(SALON_019_CREDIT)}</p>
<p>REVIEW_NATURE: ${escapeText(SALON_019_REVIEW)}</p>
<p>TEXT_SHA256: 1784394dd8764405557c2075861eb267e9ce9d4187c062a1879b3923c44e2519</p>
<p>Not posted to X. The proof-table ledger is unchanged.</p>
<pre>${escapeText(SALON_019_TEXT)}</pre>
<p><a href="${ORIGIN}${SALON_019_READING.href}">${escapeText(SALON_019_READING.label)}</a></p>
</main>
</body>
</html>
`;
}
