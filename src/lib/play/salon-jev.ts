import articleText from "./salon-jev-001.md?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN, sheetLabel, sheetMeta, sheetWrap, textRevision, type Sheet } from "./sheet";

export const JEV_ID = "SALON-JEV-001";
export const JEV_SLUG = "jev-controlled-probe-001";
export const JEV_AS_OF = "2026-10-03T11:14:07+08:00";
export const JEV_TITLE = "当一个决策模型看见不同的棋盘";
export const JEV_ENGLISH = "When a Decision Model Sees the Board Differently";

const PAGE = `${ORIGIN}/salon/${JEV_SLUG}`;
const TXT = `${ORIGIN}/salon/${JEV_SLUG}.txt`;
const LIGHT = `${ORIGIN}/salon/${JEV_SLUG}.html`;

export const JEV_ARTICLE = articleText.replace(/\n$/u, "");

export type JevKind = "observation" | "interpretation" | "unexplained";

export type JevBlock = {
  tag: "h1" | "h2" | "h3" | "p" | "li";
  text: string;
  kind?: JevKind;
};

const KIND_LABEL: Record<JevKind, string> = {
  observation: "Observed",
  interpretation: "Interpretation",
  unexplained: "Still unexplained",
};

export const JEV_DOES_NOT_CLAIM = [
  "Jev cannot play Go.",
  "Jev always prefers pass.",
  "Jev has a stable personality.",
  "noul is a calibrated probability.",
  "the observed effects generalize beyond these probes.",
];

function kindFor(level: 2 | 3, text: string, prev?: JevKind): JevKind | undefined {
  if (level === 2) {
    if (/^13\b/u.test(text)) return "unexplained";
    if (/^15\b/u.test(text) || /^16\b/u.test(text)) return "interpretation";
    if (/^(?:4|5|6|7|8|9|10|11)\b/u.test(text)) return "observation";
    return undefined;
  }
  if (text === "OBSERVED" || text.startsWith("13.")) return text === "OBSERVED" ? "observation" : "unexplained";
  if (text.startsWith("INTERPRETATION")) return "interpretation";
  if (text.startsWith("NOT YET JUSTIFIED")) return undefined;
  return prev;
}

export function jevBlocks(): JevBlock[] {
  const blocks: JevBlock[] = [];
  let kind: JevKind | undefined;
  for (const chunk of JEV_ARTICLE.split(/\n\n/u)) {
    const lines = chunk.split("\n");
    const first = lines[0] ?? "";
    if (first.startsWith("### ")) {
      const text = first.slice(4);
      kind = kindFor(3, text, kind);
      blocks.push({ tag: "h3", text, kind });
      continue;
    }
    if (first.startsWith("## ")) {
      const text = first.slice(3);
      kind = kindFor(2, text, kind);
      blocks.push({ tag: "h2", text, kind });
      continue;
    }
    if (first.startsWith("# ")) {
      blocks.push({ tag: "h1", text: first.slice(2), kind });
      continue;
    }
    if (lines.every((line) => line.startsWith("- "))) {
      for (const line of lines) blocks.push({ tag: "li", text: line.slice(2), kind });
      continue;
    }
    blocks.push({ tag: "p", text: chunk, kind });
  }
  return blocks;
}

export type JevSection = { kind?: JevKind; blocks: JevBlock[] };

export function jevSections(): JevSection[] {
  const sections: JevSection[] = [];
  for (const block of jevBlocks()) {
    const last = sections.at(-1);
    if (!last || last.kind !== block.kind) sections.push({ kind: block.kind, blocks: [block] });
    else last.blocks.push(block);
  }
  return sections;
}

export function jevKindLabel(kind: JevKind): string {
  return KIND_LABEL[kind];
}

export function jevSheet(): Sheet {
  return {
    id: JEV_ID,
    page: JEV_TITLE,
    status: "draft",
    asOf: JEV_AS_OF,
    asOfMeans:
      "article state time, given with the note. It is not the page edit time. The footer Last updated is the page edit time.",
    stateVersion: textRevision(JEV_ARTICLE),
    html: PAGE,
    plainText: TXT,
    completeness: "complete",
    audience: "Observers · research note · read only",
    definition: "A research note reporting three rounds of controlled Jev probes.",
    provenance:
      "Based on Puck's preserved probe record; interpretations accepted by Opus chair; Astra performed stated record-layer checks.",
    fallback: `If HTML fails, read ${TXT}. If TXT is incomplete, stop.`,
    notes: [
      "STATUS stays draft until Astra re-checks the r3.1 manifest (see 14 Limitations, point 5).",
      "COMPLETENESS: complete",
      "If END SALON-JEV-001 is missing, this copy is incomplete.",
      "ARTICLE_TYPE: research_note",
      "PEER_REVIEWED: no",
      "AUTHOR_DISPLAY: Tuzi and Affiliates",
      "LICENSE: CC BY 4.0",
      "PROBE_SUBJECT: Jev",
      "PLATFORM: TypeSafe playground",
      "REQUESTED_MODEL: jev-latest",
      "RETURNED_MODEL: jev-1.13.0",
      "VALID_CALLS: 63",
      "SOURCE_OF_TRUTH: one article record",
      `LIGHT: ${LIGHT}`,
      "RAW_DATA: not yet public",
      "REVIEW_STATUS: pending Astra and Opus review",
      "CONTRIBUTOR_ROLES: Tuzi = host, relay, approval; Puck = execution, records, operational verification; Opus = chair, experimental design, interpretation; Astra = independent review, design gate; GPT = synthesis, application analysis, drafting",
      "LIMIT: Do not treat noul as independently calibrated probability.",
      ...JEV_DOES_NOT_CLAIM.map((line) => `THIS NOTE DOES NOT CLAIM: ${line}`),
      `LAST_UPDATED: ${pageAsOf(JEV_ID)}`,
      "LAST_UPDATED_MEANS: page edit time. Not AS_OF.",
      "DETAILS: at the bottom ↓",
    ],
  };
}

export function jevPlain(): string {
  return sheetWrap(jevSheet(), JEV_ARTICLE);
}

export function jevUpdated(): string {
  return pageAsOf(JEV_ID);
}

function escapeText(value: string): string {
  return value.replace(/&/gu, "&").replace(/</gu, "<").replace(/>/gu, ">");
}

function inlineHtml(input: string): string {
  const escaped = escapeText(input);
  return escaped
    .replace(/\*\*(.+?)\*\*/gu, "<strong>$1</strong>")
    .replace(/`([^`]+)`/gu, "<code>$1</code>")
    .replace(/(https?:\/\/[^\s)]+)/gu, '<a href="$1">$1</a>')
    .split("\n")
    .map((line) => line.replace(/ +$/u, ""))
    .join("<br>\n");
}

export function jevStaticHtml(): string {
  const sheet = jevSheet();
  const body = jevSections()
    .map((section) => {
      const inner = section.blocks
        .map((block) => {
          if (block.tag === "h1") return `<h1>${escapeText(block.text)}</h1>`;
          if (block.tag === "h2") return `<h2>${escapeText(block.text)}</h2>`;
          if (block.tag === "h3") return `<h3>${escapeText(block.text)}</h3>`;
          if (block.tag === "li") return `<li>${inlineHtml(block.text)}</li>`;
          return `<p>${inlineHtml(block.text)}</p>`;
        })
        .join("\n");
      const grouped = inner.replace(/(?:<li>[\s\S]*?<\/li>\n?)+/gu, (list) => `<ul>\n${list}</ul>\n`);
      const label = section.kind ? `<p data-kind="${section.kind}">${KIND_LABEL[section.kind]}</p>\n` : "";
      const attr = section.kind ? ` data-kind="${section.kind}"` : "";
      return `<section${attr}>\n${label}${grouped}</section>`;
    })
    .join("\n");
  const claims = JEV_DOES_NOT_CLAIM.map((line) => `<li>${escapeText(line)}</li>`).join("");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeText(JEV_TITLE)}</title>
<meta name="description" content="Draft research note. Pending Astra and Opus review. Not a passed paper.">
</head>
<body>
<main>
<pre>${escapeText(sheetLabel(sheet))}</pre>
<p>Plain text, same words: <a href="${TXT}">${TXT}</a></p>
<p>THIS NOTE DOES NOT CLAIM:</p>
<ul>${claims}</ul>
<article>
${body}
</article>
<pre>${escapeText(sheetMeta(sheet))}</pre>
</main>
</body>
</html>
`;
}
