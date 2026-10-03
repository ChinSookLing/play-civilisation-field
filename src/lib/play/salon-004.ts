import manuscript from "../../../docs/salon/SALON-004-manuscript-v0.7.1.txt?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN } from "./sheet";

export const SALON_004_ID = "SALON-004";
export const SALON_004_SLUG = "proof-table-003-relay";
export const SALON_004_TITLE = "一张桌子，没有人在同一个房间";
export const SALON_004_ENGLISH = "One Table, No One in the Same Room";

const PAGE = `${ORIGIN}/salon/${SALON_004_SLUG}`;
const TXT = `${ORIGIN}/salon/${SALON_004_SLUG}.txt`;

export const SALON_004_TEXT = manuscript;

export function salon004Plain(): string {
  return SALON_004_TEXT;
}

export function salon004Updated(): string {
  return pageAsOf(SALON_004_ID);
}

function escapeText(value: string): string {
  return value
    .replace(/&/gu, "&" + "amp;")
    .replace(/</gu, "&" + "lt;")
    .replace(/>/gu, "&" + "gt;");
}

export function salon004StaticHtml(): string {
  return `<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeText(SALON_004_TITLE)}</title>
<meta name="description" content="Published working paper v0.7.1. Category 记. CC BY 4.0. Tuzi and Affiliates.">
</head>
<body>
<main>
<p>Plain text, same words: <a href="${TXT}">${TXT}</a></p>
<p>Page: <a href="${PAGE}">${PAGE}</a></p>
<pre>${escapeText(SALON_004_TEXT)}</pre>
</main>
</body>
</html>
`;
}
