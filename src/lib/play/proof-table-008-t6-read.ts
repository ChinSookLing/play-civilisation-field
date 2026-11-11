export type ReadBlock =
  | { kind: "heading"; level: 2 | 3; text: string; id?: string }
  | { kind: "paragraph"; lines: string[] }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "table"; header: string[]; rows: string[][] }
  | { kind: "math"; tex: string };

const SECTION_IDS: Array<[string, string]> = [
  ["1. ", "model"],
  ["2. ", "reduce"],
  ["3. ", "tools"],
  ["4. ", "one-zero"],
  ["5. ", "mixed"],
  ["6. ", "double-zero"],
  ["7. ", "replay"],
  ["8. ", "sources"],
];

function headingId(text: string): string | undefined {
  if (/^\d+\.\d+/.test(text)) return undefined;
  const hit = SECTION_IDS.find(([prefix]) => text.startsWith(prefix));
  return hit?.[1];
}

export function splitRow(line: string): string[] {
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

function isHeading(line: string): boolean {
  const trimmed = line.trim();
  return /^(?:\d+\.\d+|\d+\.)\s+\S/.test(trimmed) && trimmed.length <= 40;
}

function isStep(line: string): boolean {
  const trimmed = line.trim();
  return /^\d+\.\s/.test(trimmed) && !isHeading(trimmed);
}

/** Turn the filed markdown into blocks. The source file is not rewritten. */
export function parseT6(markdown: string): ReadBlock[] {
  const lines = markdown.split("\n");
  const blocks: ReadBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index] ?? "";
    const trimmed = line.trim();

    if (trimmed === "") {
      index += 1;
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

    if (trimmed.startsWith("|") && isTableSeparator(lines[index + 1] ?? "")) {
      const header = splitRow(trimmed);
      index += 2;
      const rows: string[][] = [];
      while (index < lines.length && (lines[index] ?? "").trim().startsWith("|")) {
        rows.push(splitRow(lines[index] ?? ""));
        index += 1;
      }
      blocks.push({ kind: "table", header, rows });
      continue;
    }

    if (trimmed.startsWith("•")) {
      const items: string[] = [];
      while (index < lines.length && (lines[index] ?? "").trim().startsWith("•")) {
        items.push((lines[index] ?? "").trim().replace(/^•\s?/, ""));
        index += 1;
      }
      blocks.push({ kind: "list", ordered: false, items });
      continue;
    }

    if (isHeading(trimmed)) {
      const level = /^\d+\.\d+/.test(trimmed) ? 3 : 2;
      blocks.push({ kind: "heading", level, text: trimmed, id: headingId(trimmed) });
      index += 1;
      continue;
    }

    if (isStep(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && isStep(lines[index] ?? "")) {
        items.push((lines[index] ?? "").trim());
        index += 1;
      }
      blocks.push({ kind: "list", ordered: true, items });
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length && !isBreak(lines[index] ?? "")) {
      paragraph.push((lines[index] ?? "").trimEnd());
      index += 1;
    }
    blocks.push({ kind: "paragraph", lines: paragraph });
  }

  return blocks;
}

function isBreak(line: string): boolean {
  const trimmed = line.trim();
  return (
    trimmed === "" ||
    trimmed === "$$" ||
    trimmed.startsWith("|") ||
    trimmed.startsWith("•") ||
    isHeading(trimmed) ||
    isStep(trimmed)
  );
}

/** Lines whose wording must survive in some block. Display-math fences and table rules are syntax. */
export function uncoveredT6Lines(markdown: string, blocks: ReadBlock[]): string[] {
  const blob = blocks
    .map((block) => {
      if (block.kind === "heading") return block.text;
      if (block.kind === "paragraph") return block.lines.join("\n");
      if (block.kind === "list") return block.items.join("\n");
      if (block.kind === "table") return [block.header, ...block.rows].flat().join("\n");
      return block.tex;
    })
    .join("\n");
  const missing: string[] = [];
  for (const line of markdown.split("\n")) {
    const trimmed = line.trim();
    if (trimmed === "" || trimmed === "$$" || isTableSeparator(trimmed)) continue;
    if (trimmed.startsWith("|")) {
      for (const cell of splitRow(trimmed)) {
        if (cell && !blob.includes(cell)) missing.push(cell);
      }
      continue;
    }
    const words = trimmed.replace(/^•\s?/, "");
    if (!blob.includes(words)) missing.push(words);
  }
  return missing;
}
