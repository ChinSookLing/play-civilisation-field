import manuscript from "../../../docs/salon/SALON-016-v3.md?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN } from "./sheet";

export const SALON_016_ID = "SALON-016";
export const SALON_016_SLUG = "leave-none";
export const SALON_016_TITLE = "SALON-016 · 第八位跑者，請把 None 留在昨天";
export const SALON_016_ENGLISH = "The Eighth Runner: Leave None in Yesterday";
export const SALON_016_CATEGORY = "記";
export const SALON_016_STATUS = "Filed. Salon v3. Tuzi asked for it to be posted.";
export const SALON_016_CREDIT =
  "Tuzi × GPTs · 正文與主席裁定 GPT-6 · 事實核對與附記 Opus、Fable 5.2 · 構造、實作與獨立審計 PT-008 協作團隊";
export const SALON_016_REVIEW =
  "沙龍記。合作項目內驗收。外部同行評審（peer review）與新穎性查核尚未完成。任意人數的終局通式尚未完成。";
export const SALON_016_SHA256 = "fd064ae58456926016549538dfd1ef01246045eefdde6cfda4650c590cad143d";

const PAGE = `${ORIGIN}/salon/${SALON_016_SLUG}`;
const TXT = `${ORIGIN}/salon/${SALON_016_SLUG}.txt`;

/** The filed manuscript. Plain text is this string and nothing in front of it. */
export const SALON_016_TEXT = manuscript;

export function salon016Plain(): string {
  return SALON_016_TEXT;
}

export function salon016Updated(): string {
  return pageAsOf(SALON_016_ID);
}

function escapeText(value: string): string {
  return value
    .replace(/&/gu, "&" + "amp;")
    .replace(/</gu, "&" + "lt;")
    .replace(/>/gu, "&" + "gt;");
}

export function salon016StaticHtml(): string {
  return `<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeText(SALON_016_TITLE)}</title>
<meta name="description" content="SALON-016 Salon v3. In-circle eight-runner acceptance on 2026-11-21. Not externally peer-reviewed. Novelty not checked. One formula for every N remains open. Not posted to X.">
</head>
<body>
<main>
<p>Plain text, same words: <a href="${TXT}">${TXT}</a></p>
<p>Page: <a href="${PAGE}">${PAGE}</a></p>
<p>STATUS: ${escapeText(SALON_016_STATUS)}</p>
<p>CREDIT: ${escapeText(SALON_016_CREDIT)}</p>
<p>REVIEW_NATURE: ${escapeText(SALON_016_REVIEW)}</p>
<p>TEXT_SHA256: ${SALON_016_SHA256}</p>
<p>Not posted to X. The proof-table ledger is unchanged.</p>
<pre>${escapeText(SALON_016_TEXT)}</pre>
</main>
</body>
</html>
`;
}
