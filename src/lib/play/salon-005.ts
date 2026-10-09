import manuscript from "../../../docs/salon/SALON-005-v0.2.md?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN } from "./sheet";

export const SALON_005_ID = "SALON-005";
export const SALON_005_SLUG = "fifteen-speeds";
export const SALON_005_TITLE = "十五个速度的天花板 —— 一张桌子猜公式的一个星期";
export const SALON_005_CATEGORY = "记";
export const SALON_005_STATUS = "READY FOR SALON（v0.2，已按 Hesper 审阅意见修改）";
export const SALON_005_VERSION = "0.2 · 2026-10-09";
export const SALON_005_CREDIT =
  "Tuzi and Affiliates —— 主持：Tuzi；执笔：Claude(Opus)；座位：GPT、GPT(Astra)、Kimi、DeepSeek、Qwen、Gemini、GLM、Grok、Lumo；信差：Hark(Hesper)、Grok Bot(Puck)；办公室电脑的执行菜单：Grok Build(Bill)";
export const SALON_005_LICENSE = "CC BY 4.0";
export const SALON_005_REVIEW =
  "OK in chat 2026-10-09 14:44 +08（署名由 Tuzi 定稿；正文保持好读，不另加来源标注）";
export const SALON_005_CAPTION =
  "（附图：x = 47/223 时的 16 个点。最近的两点是点 0 和点 14，所以速度 14 在这一刻「太近」。）";
export const SALON_005_FIGURE = `${ORIGIN}/figures/SALON-005-fig1-sixteen-points.svg`;

const PAGE = `${ORIGIN}/salon/${SALON_005_SLUG}`;
const TXT = `${ORIGIN}/salon/${SALON_005_SLUG}.txt`;

export const SALON_005_TEXT = manuscript;

export function salon005Plain(): string {
  return SALON_005_TEXT;
}

export function salon005Parts(): { before: string; after: string } {
  const parts = SALON_005_TEXT.split(SALON_005_CAPTION);
  if (parts.length !== 2) throw new Error("SALON-005 caption line is missing");
  return { before: parts[0], after: parts[1] };
}

export function salon005Updated(): string {
  return pageAsOf(SALON_005_ID);
}

function escapeText(value: string): string {
  return value
    .replace(/&/gu, "&" + "amp;")
    .replace(/</gu, "&" + "lt;")
    .replace(/>/gu, "&" + "gt;");
}

export function salon005StaticHtml(): string {
  const { before, after } = salon005Parts();
  return `<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeText(SALON_005_TITLE)}</title>
<meta name="description" content="SALON-005 v0.2. Category 记. CC BY 4.0. Tuzi and Affiliates.">
</head>
<body>
<main>
<p>Plain text, same words: <a href="${TXT}">${TXT}</a></p>
<p>Page: <a href="${PAGE}">${PAGE}</a></p>
<pre>${escapeText(before)}</pre>
<figure>
<img src="${SALON_005_FIGURE}" alt="${escapeText(SALON_005_CAPTION)}">
<figcaption>${escapeText(SALON_005_CAPTION)}</figcaption>
</figure>
<pre>${escapeText(after)}</pre>
</main>
</body>
</html>
`;
}
