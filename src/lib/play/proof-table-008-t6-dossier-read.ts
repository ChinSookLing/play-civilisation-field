export type ReadBlock =
  | { kind: "heading"; level: 2 | 3; text: string; id?: string }
  | { kind: "paragraph"; lines: string[] }
  | { kind: "list"; items: string[] }
  | { kind: "table"; header: string[]; rows: string[][] }
  | { kind: "math"; tex: string }
  | { kind: "code"; lang: string; text: string }
  | { kind: "image"; alt: string; src: string };

const SECTION_IDS: Array<[string, string]> = [
  ["摘要", "abstract"],
  ["0 ", "concordance"],
  ["1 ", "defs"],
  ["2 ", "tree"],
  ["3 ", "finite"],
  ["4 ", "plane"],
  ["5 ", "high"],
  ["6 ", "middle"],
  ["7 ", "low"],
  ["8 ", "example"],
  ["9 ", "replay"],
  ["10 ", "credit"],
  ["附錄 A", "appendix"],
];

function headingId(text: string): string | undefined {
  const hit = [...SECTION_IDS].sort((a, b) => b[0].length - a[0].length).find(([prefix]) => text.startsWith(prefix));
  return hit?.[1];
}

function splitRow(line: string): string[] {
  const inner = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  const cells: string[] = [];
  let current = "";
  let math = false;
  for (const ch of inner) {
    if (ch === "$") {
      math = !math;
      current += ch;
      continue;
    }
    if (ch === "|" && !math) {
      cells.push(current.trim());
      current = "";
      continue;
    }
    current += ch;
  }
  cells.push(current.trim());
  return cells;
}

function isTableSeparator(line: string): boolean {
  const cells = splitRow(line);
  return cells.length > 1 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function bodyLines(source: string): string[] {
  const lines = source.replace(/^\uFEFF/, "").split(/\r?\n/);
  if (lines[0]?.trim() !== "---") return lines;
  const end = lines.findIndex((line, index) => index > 0 && line.trim() === "---");
  return end === -1 ? lines : lines.slice(end + 1);
}

export function parseT6Dossier(source: string): ReadBlock[] {
  const lines = bodyLines(source);
  const blocks: ReadBlock[] = [];
  let index = 0;
  const pushParagraph = (chunk: string[]) => {
    const kept = chunk.filter((line) => line.trim() !== "");
    if (kept.length) blocks.push({ kind: "paragraph", lines: kept });
  };
  while (index < lines.length) {
    const line = lines[index] ?? "";
    const trimmed = line.trim();
    if (trimmed === "" || trimmed.startsWith("<!--")) {
      index += 1;
      continue;
    }
    if (trimmed.startsWith("![")) {
      const mark = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (mark) {
        blocks.push({ kind: "image", alt: mark[1] ?? "", src: mark[2] ?? "" });
        index += 1;
        continue;
      }
    }
    if (trimmed.startsWith("```")) {
      const lang = trimmed.slice(3).trim();
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !(lines[index] ?? "").trim().startsWith("```")) {
        code.push(lines[index] ?? "");
        index += 1;
      }
      index += 1;
      blocks.push({ kind: "code", lang, text: code.join("\n") });
      continue;
    }
    if (trimmed === "$$") {
      const tex: string[] = [];
      index += 1;
      while (index < lines.length && (lines[index] ?? "").trim() !== "$$") {
        tex.push(lines[index] ?? "");
        index += 1;
      }
      index += 1;
      blocks.push({ kind: "math", tex: tex.join("\n").trim() });
      continue;
    }
    if (trimmed.startsWith("## ")) {
      const text = trimmed.slice(3).trim();
      blocks.push({ kind: "heading", level: 2, text, id: headingId(text) });
      index += 1;
      continue;
    }
    if (trimmed.startsWith("### ")) {
      blocks.push({ kind: "heading", level: 3, text: trimmed.slice(4).trim() });
      index += 1;
      continue;
    }
    if (trimmed.startsWith("|")) {
      const rows: string[][] = [];
      while (index < lines.length && (lines[index] ?? "").trim().startsWith("|")) {
        const row = lines[index] ?? "";
        if (!isTableSeparator(row)) rows.push(splitRow(row));
        index += 1;
      }
      const [header, ...body] = rows;
      if (header) blocks.push({ kind: "table", header, rows: body });
      continue;
    }
    if (trimmed.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length && (lines[index] ?? "").trim().startsWith("- ")) {
        items.push((lines[index] ?? "").trim().slice(2));
        index += 1;
      }
      blocks.push({ kind: "list", items });
      continue;
    }
    const chunk: string[] = [];
    while (index < lines.length) {
      const next = (lines[index] ?? "").trim();
      if (
        next === "" ||
        next.startsWith("<!--") ||
        next.startsWith("```") ||
        next.startsWith("![") ||
        next === "$$" ||
        next.startsWith("## ") ||
        next.startsWith("### ") ||
        next.startsWith("|") ||
        next.startsWith("- ")
      ) {
        break;
      }
      chunk.push(lines[index] ?? "");
      index += 1;
    }
    pushParagraph(chunk);
  }
  return blocks;
}
