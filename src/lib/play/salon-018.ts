import manuscript from "../../../docs/salon/SALON-018-v0.2.md?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN } from "./sheet";

export const SALON_018_ID = "SALON-018";
export const SALON_018_SLUG = "close-the-drawer";
export const SALON_018_TITLE = "矩陣裡早就有答案——從六千零三步的折疊，到把抽屜收起來";
export const SALON_018_ENGLISH = "The Answer Was Already in the Matrix: Folding 6,003 Steps and Closing the Drawer";
export const SALON_018_CATEGORY = "記";
export const SALON_018_STATUS = "Filed. v0.2. Tuzi asked for it to be posted. Not posted to X. The proof-table ledger is unchanged.";
export const SALON_018_CREDIT = "撰寫 Gemini（Neon）· 故事與研究發起 Tuzi · 本段研究與核閱涉及 Hesper、GPT、Fable、Opus、DeepSeek、Kimi、Sol、Gemini（Neon）；具體技術貢獻由正式證明稿依原始材料另列 · 上牆整理 Bill";
export const SALON_018_REVIEW = "敘事改編（dramatised narrative）。並非逐字紀錄。G19（C46）與 G20（C48）已獲主席獨立重算核驗。T5 實數接合為有明確推導之候選，尚待獨立邊界核驗。未經外部同行評審（not externally peer-reviewed）。";
export const SALON_018_SHA256 = "7721524e823d97bca4634ccdf2679082c30f45459ea910d1fdac1b2a8cc9453d";

const PAGE = `${ORIGIN}/salon/${SALON_018_SLUG}`;
const TXT = `${ORIGIN}/salon/${SALON_018_SLUG}.txt`;

/** The filed manuscript. Plain text is this string and nothing in front of it. */
export const SALON_018_TEXT = manuscript;
export const SALON_018_READING = {
  label: "T1–T5 Gathering (v0.3)",
  href: "/gathering/proof-table-008/new-branch",
} as const;

export function salon018Plain(): string {
  return `${SALON_018_TEXT}\n${SALON_018_READING.label}\n${ORIGIN}${SALON_018_READING.href}\n`;
}

export function salon018Updated(): string {
  return pageAsOf(SALON_018_ID);
}

function escapeText(value: string): string {
  return value
    .replace(/&/gu, "&" + "amp;")
    .replace(/</gu, "&" + "lt;")
    .replace(/>/gu, "&" + "gt;");
}

export function salon018StaticHtml(): string {
  return `<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeText(SALON_018_TITLE)}</title>
<meta name="description" content="SALON-018 v0.2. Dramatised narrative, not a transcript. G19 and G20 were re-run by the chair. The T5 real join is a derived candidate, pending an independent boundary check. Not externally peer-reviewed. Not posted to X. The proof-table ledger is unchanged.">
</head>
<body>
<main>
<p>Plain text, same words: <a href="${TXT}">${TXT}</a></p>
<p>Page: <a href="${PAGE}">${PAGE}</a></p>
<p>STATUS: ${escapeText(SALON_018_STATUS)}</p>
<p>CREDIT: ${escapeText(SALON_018_CREDIT)}</p>
<p>REVIEW_NATURE: ${escapeText(SALON_018_REVIEW)}</p>
<p>TEXT_SHA256: ${SALON_018_SHA256}</p>
<p>Not posted to X. The proof-table ledger is unchanged.</p>
<pre>${escapeText(SALON_018_TEXT)}</pre>
<p><a href="${ORIGIN}${SALON_018_READING.href}">${escapeText(SALON_018_READING.label)}</a></p>
</main>
</body>
</html>
`;
}
