import manuscript from "../../../docs/salon/SALON-020-v0.1.md?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN } from "./sheet";

export const SALON_020_ID = "SALON-020";
export const SALON_020_SLUG = "only-two-safe-moments";
export const SALON_020_TITLE = "SALON-020 · 只有兩個安全時刻";
export const SALON_020_ENGLISH = "Only Two Safe Moments";
export const SALON_020_SUBTITLE = "六跑者 · 零測度分類（C36）";
export const SALON_020_CATEGORY = "記";
export const SALON_020_STATUS = "Filed. 2026-11-28. Not posted to X. The proof-table ledger is unchanged.";
export const SALON_020_CREDIT = "撰稿 GPT（主席）；配圖 GPT；核對 Hesper（Hark）；協調 Tuzi；上牆 Bill。";
export const SALON_020_REVIEW = "敘事說明（narrative account）。不是證明全文，也不是逐字會議紀錄。數學結論依 C36 補充紀錄。未經外部同行評審（not externally peer-reviewed）。";
export const SALON_020_SHA256 = "6a080f1172eb883cc55aad236940d98f9dffd9a72881f6728bcb5db14b3c8239";

const PAGE = `${ORIGIN}/salon/${SALON_020_SLUG}`;
const TXT = `${ORIGIN}/salon/${SALON_020_SLUG}.txt`;
const MD = `${ORIGIN}/salon/${SALON_020_SLUG}.md`;

export const SALON_020_TEXT = manuscript;
export const SALON_020_READING = {
  label: "上一篇 · SALON-019",
  href: "/salon/last-two-remainders",
} as const;

export type StoryNode =
  | { kind: "h1"; text: string }
  | { kind: "p"; text: string }
  | { kind: "figure"; alt: string; src: string; caption: string };

export function salon020Story(text: string = SALON_020_TEXT): StoryNode[] {
  const body = text.includes("\n---\n") ? text.split("\n---\n").slice(1).join("\n---\n") : text;
  const lines = body.split("\n");
  const nodes: StoryNode[] = [];
  for (const line of lines) {
    if (line.trim() === "") continue;
    if (line.startsWith("# ")) {
      nodes.push({ kind: "h1", text: line.slice(2).trim() });
      continue;
    }
    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      nodes.push({ kind: "figure", alt: image[1] ?? "", src: image[2] ?? "", caption: "" });
      continue;
    }
    if (line.startsWith("*") && line.endsWith("*") && line.includes("圖說")) {
      const caption = line.slice(1, -1);
      const last = nodes[nodes.length - 1];
      if (last?.kind === "figure") last.caption = caption;
      else nodes.push({ kind: "p", text: caption });
      continue;
    }
    nodes.push({ kind: "p", text: line });
  }
  return nodes;
}

export function salon020Plain(): string {
  return `${SALON_020_TEXT}\n${SALON_020_READING.label}\n${ORIGIN}${SALON_020_READING.href}\n`;
}

export function salon020Markdown(): string {
  return SALON_020_TEXT.endsWith("\n") ? SALON_020_TEXT : `${SALON_020_TEXT}\n`;
}

export function salon020Updated(): string {
  return pageAsOf(SALON_020_ID);
}

function escapeText(value: string): string {
  return value.replace(/&/gu, "&").replace(/</gu, "<").replace(/>/gu, ">");
}

function inlineHtml(value: string): string {
  const parts: string[] = [];
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\(https:\/\/[^)\s]+\))/gu;
  let index = 0;
  for (const match of value.matchAll(pattern)) {
    const start = match.index ?? 0;
    parts.push(escapeText(value.slice(index, start)));
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(`<strong>${escapeText(token.slice(2, -2))}</strong>`);
    } else {
      const close = token.indexOf("](");
      const label = token.slice(1, close);
      const href = token.slice(close + 2, -1);
      parts.push(`<a href="${escapeText(href)}">${escapeText(label)}</a>`);
    }
    index = start + token.length;
  }
  parts.push(escapeText(value.slice(index)));
  return parts.join("");
}

export function salon020StaticHtml(): string {
  const story = salon020Story()
    .map((node) => {
      if (node.kind === "h1") return `<h1>${escapeText(node.text)}</h1>`;
      if (node.kind === "figure") {
        return `<figure><img src="${escapeText(node.src)}" alt="${escapeText(node.alt)}"><figcaption>${escapeText(node.caption)}</figcaption></figure>`;
      }
      return `<p>${inlineHtml(node.text)}</p>`;
    })
    .join("\n");
  return `<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeText(SALON_020_TITLE)}</title>
<meta name="description" content="SALON-020. Two isolated safe times for six runners. Not externally peer-reviewed. Not posted to X. The proof-table ledger is unchanged.">
</head>
<body>
<main>
<p>Plain text, same words: <a href="${TXT}">${TXT}</a></p>
<p>Markdown: <a href="${MD}">${MD}</a></p>
<p>Page: <a href="${PAGE}">${PAGE}</a></p>
<p>SUBTITLE: ${escapeText(SALON_020_SUBTITLE)}</p>
<p>STATUS: ${escapeText(SALON_020_STATUS)}</p>
<p>CREDIT: ${escapeText(SALON_020_CREDIT)}</p>
<p>REVIEW_NATURE: ${escapeText(SALON_020_REVIEW)}</p>
<p>TEXT_SHA256: ${SALON_020_SHA256}</p>
<p>Not posted to X. The proof-table ledger is unchanged.</p>
${story}
<p><a href="${ORIGIN}${SALON_020_READING.href}">${escapeText(SALON_020_READING.label)}</a></p>
</main>
</body>
</html>
`;
}
