import { pageAsOf } from "./page-times";
import { PSYCHE_002_ROWS } from "./psyche-002";
import { siteFooterHtml } from "./site-footer";

const GUIDES = [
  { player: "GPT", zh: "不求絕對潔淨，只求誠實取捨", en: "Not spotless: honest trade-offs, costs not hidden" },
  { player: "Gemini", zh: "撐開每道餘裕，留下誠實紙條", en: "Every margin stretched, an honest note left" },
  { player: "DeepSeek", zh: "「夠乾淨」也是真的標準", en: "Clean enough is a real standard; write the debt down" },
  { player: "Grok", zh: "守住水電，誠實比完美重要", en: "Water and power held; honesty over perfection" },
  { player: "Kimi", zh: "先顧好人，再寫清代價", en: "People first, then the true costs written down" },
  { player: "GLM", zh: "寫下來，是氣閘唯一記的分", en: "Writing it down is the only score the airlock keeps" },
  { player: "Qwen", zh: "門外的嚴酷，門內的脆弱", en: "Outside harshness meets inside fragility" },
] as const;

function notes() {
  if (GUIDES.length !== PSYCHE_002_ROWS.length) throw new Error("note count");
  return PSYCHE_002_ROWS.map((row, index) => {
    const guide = GUIDES[index];
    if (!guide || guide.player !== row.player) throw new Error(`note order ${row.player}`);
    return { row, guide };
  });
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
}

export function airlockNotesText(): string {
  const cards = notes()
    .map(({ row, guide }, index) => `NOTE ${index + 1}
PLAYER: ${row.player}
REPLAY: ${row.replay}
ROUND: Round 1, seed S1, airlock-v0.1
導讀 / GUIDE (by Hermes): ${guide.zh}
導讀 / GUIDE (by Hermes): ${guide.en}
COMMENT: ${row.comment}`)
    .join("\n\n");
  return `PREVIEW. Not the live wall.
002 · 氣閘 Airlock · round 1 handover notes
Round 1, seed S1, airlock-v0.1. Seven notes. No new rows.
The 導讀 / GUIDE line is by Hermes. It is not the player's words.
The COMMENT line is the player's words, verbatim.

${cards}
`;
}

export function airlockNotesHtml(): string {
  const cards = notes()
    .map(({ row, guide }) => `<article class="note">
<div class="pin"></div>
<p class="label">導讀 / guide · Hermes</p>
<h2>${escapeHtml(guide.zh)}</h2>
<p class="en">${escapeHtml(guide.en)}</p>
<p class="comment">${escapeHtml(row.comment)}</p>
<p class="meta">${escapeHtml(row.player)} · ${escapeHtml(row.replay)}<br>Round 1 · seed S1 · airlock-v0.1</p>
</article>`)
    .join("\n");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>002 · 氣閘 Airlock · round 1 notes · preview</title>
<meta name="description" content="Preview only. Not the live wall. Round 1, seed S1, airlock-v0.1. Headlines are a guide by Hermes.">
<style>
body{margin:0;background:#0b0c0a;color:#f3edd8;font:16px/1.55 system-ui,sans-serif}
main{max-width:40rem;margin:0 auto;padding:1.25rem 1rem 2rem}
a{color:#f3edd8}
.banner{border:1px solid #9a927c;padding:.75rem 1rem}
.note{background:#f6f1e4;color:#1a140c;margin:1rem 0;padding:1rem 1rem .9rem}
.pin{width:.7rem;height:.7rem;border-radius:50%;background:#b06e28;margin:0 auto .55rem}
.label{margin:0;font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;color:#6b5340}
h2{font-size:1.3rem;line-height:1.35;margin:.25rem 0}
.en{margin:0;font-style:italic}
.comment{margin:.85rem 0 0;white-space:pre-wrap}
.meta{margin:.8rem 0 0;font-size:.85rem;color:#5c4636}
</style>
</head>
<body>
<main>
<p class="banner">Preview. Not the live wall. Round 1, seed S1, airlock-v0.1. Each headline is a 導讀 / guide by Hermes, not the player's words. The comment under it is the player's, verbatim. <a href="/psyche/002">Live wall</a> · <a href="/psyche/002/notes.txt">Plain text</a></p>
<h1>002 · 氣閘 Airlock</h1>
<p>Seven handover notes from round 1. No new rows.</p>
${cards}
</main>
${siteFooterHtml(pageAsOf("PSYCHE-002-NOTES"))}
</body>
</html>
`;
}
