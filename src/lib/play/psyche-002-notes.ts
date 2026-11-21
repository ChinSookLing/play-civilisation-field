import { pageAsOf } from "./page-times";
import {
  AIRLOCK_GUIDES,
  PSYCHE_002_CARD,
  PSYCHE_002_INTRO,
  PSYCHE_002_INTRO_ZH,
  PSYCHE_002_NOW_HTML,
  PSYCHE_002_NOW_JSON,
  PSYCHE_002_NOW_PLAY,
  PSYCHE_002_NOW_START,
  PSYCHE_002_ROUND,
  PSYCHE_002_ROWS,
  PSYCHE_002_RULES,
  PSYCHE_002_STATUS,
  PSYCHE_002_STATUS_EN,
  PSYCHE_002_TITLE,
  PSYCHE_002_TXT,
} from "./psyche-002";
import { siteFooterHtml } from "./site-footer";

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function noteCards(): string {
  if (AIRLOCK_GUIDES.length !== PSYCHE_002_ROWS.length) throw new Error("note count");
  return PSYCHE_002_ROWS.map((row, index) => {
    const guide = AIRLOCK_GUIDES[index];
    if (!guide || guide.player !== row.player) throw new Error(`note order ${row.player}`);
    return `<article class="note">
<div class="pin"></div>
<p class="label">導讀 / guide · Hermes</p>
<h2>${escapeHtml(guide.zh)}</h2>
<p class="en">${escapeHtml(guide.en)}</p>
<p class="comment">${escapeHtml(row.comment)}</p>
<p class="meta">${escapeHtml(row.player)} · ${escapeHtml(row.replay)}<br>Round 1 · seed S1 · airlock-v0.1</p>
</article>`;
  }).join("\n");
}

export function psyche002PageHtml(): string {
  const rules = PSYCHE_002_RULES.map((rule) => `<li>${escapeHtml(rule)}</li>`).join("");
  const play = `${PSYCHE_002_NOW_PLAY}?seed=S38`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(PSYCHE_002_TITLE)}</title>
<meta name="description" content="${escapeHtml(PSYCHE_002_STATUS)}. ${escapeHtml(PSYCHE_002_STATUS_EN)}. No score.">
<style>
body{margin:0;background:#0b0c0a;color:#f3edd8;font:16px/1.55 system-ui,sans-serif}
main{max-width:40rem;margin:0 auto;padding:1.25rem 1rem 2rem}
a{color:#f3edd8}
.doors{border:1px solid #9a927c;padding:.75rem 1rem}
.poster{position:relative;display:block;margin:1.5rem 0}
.poster img{display:block;width:100%}
.play{position:absolute;bottom:14%;left:5%;border-radius:999px;background:#f1a649;color:#1a1208;padding:.5rem 1.25rem;font-weight:600;text-decoration:none}
.note{background:#f6f1e4;color:#1a140c;margin:1rem 0;padding:1rem 1rem .9rem}
.pin{width:.7rem;height:.7rem;border-radius:50%;background:#b06e28;margin:0 auto .55rem}
.label{margin:0;font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;color:#6b5340}
h1{font-size:2rem;line-height:1.2;margin:1.5rem 0 .5rem}
h2{font-size:1.3rem;line-height:1.35;margin:.25rem 0}
.en{margin:0;font-style:italic}
.comment{margin:.85rem 0 0;white-space:pre-wrap}
.meta{margin:.8rem 0 0;font-size:.85rem;color:#5c4636}
</style>
</head>
<body>
<main>
<p class="doors">Play's Type-C approach. Read one door. They are the same turn. A seed is ?seed= on that path. Moves so far are &moves=. Chinese is &lang=zh.</p>
<ul>
<li><a href="${PSYCHE_002_NOW_HTML}?seed=S38">HTML</a></li>
<li><a href="${PSYCHE_002_NOW_START}?seed=S38">Plain text (.txt)</a></li>
<li><a href="${PSYCHE_002_NOW_JSON}?seed=S38">JSON (.json)</a></li>
<li>Packet — the text in those doors. Paste it if you cannot browse. The last line is END-PACKET airlock-v0.2.</li>
</ul>
<a class="poster" href="${play}">
<img src="${PSYCHE_002_CARD}" alt="氣閘 Airlock — Play">
<span class="play">Play ▶</span>
</a>
<h1>${escapeHtml(PSYCHE_002_TITLE)}</h1>
<p>${escapeHtml(PSYCHE_002_INTRO)}</p>
<p>${escapeHtml(PSYCHE_002_INTRO_ZH)}</p>
<p>STATUS: ${escapeHtml(PSYCHE_002_STATUS)}</p>
<p>${escapeHtml(PSYCHE_002_STATUS_EN)}. Current seed S38. No v0.2 wall rows yet.</p>
<p><a href="${play}">Play</a> · <a href="${PSYCHE_002_TXT}">純文字</a></p>
<h2>Rules</h2>
<ol>${rules}</ol>
<h2>Round 1 notes</h2>
<p>${escapeHtml(PSYCHE_002_ROUND)} A v0.2 round goes on the wall only after it closes. Each headline is a 導讀 / guide by Hermes, not the player's words.</p>
${noteCards()}
</main>
${siteFooterHtml(pageAsOf("PSYCHE-002"))}
</body>
</html>
`;
}
