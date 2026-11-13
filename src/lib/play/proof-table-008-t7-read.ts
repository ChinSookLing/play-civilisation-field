export type ReadBlock =
  | { kind: "heading"; level: 1 | 2 | 3; text: string; id?: string }
  | { kind: "paragraph"; lines: string[] }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "table"; header: string[]; rows: string[][] }
  | { kind: "math"; tex: string }
  | { kind: "code"; text: string };

const SECTION_IDS: Array<[string, string]> = [
  ["摘要", "abstract"],
  ["1. ", "contract"],
  ["2. ", "entrance"],
  ["3. ", "join"],
  ["4. ", "mixed"],
  ["5. ", "replay"],
  ["6. ", "index"],
  ["7. ", "review"],
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
  return /^#{1,3}\s+\S/.test(line.trim());
}

function headingLevel(line: string): 1 | 2 | 3 {
  const marks = /^#+/.exec(line.trim())?.[0].length ?? 1;
  if (marks >= 3) return 3;
  if (marks === 2) return 2;
  return 1;
}

function isBullet(line: string): boolean {
  return line.trim().startsWith("- ");
}

function isStep(line: string): boolean {
  return /^\d+\.\s/.test(line.trim());
}

/** Turn the filed markdown into blocks. The source file is not rewritten. */
export function parseT7(markdown: string): ReadBlock[] {
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

    if (trimmed.startsWith("```")) {
      index += 1;
      const body: string[] = [];
      while (index < lines.length && !(lines[index] ?? "").trim().startsWith("```")) {
        body.push(lines[index] ?? "");
        index += 1;
      }
      index += 1;
      blocks.push({ kind: "code", text: body.join("\n") });
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

    if (isHeading(trimmed)) {
      const text = trimmed.replace(/^#{1,3}\s+/, "");
      blocks.push({ kind: "heading", level: headingLevel(trimmed), text, id: headingId(text) });
      index += 1;
      continue;
    }

    if (isBullet(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && isBullet(lines[index] ?? "")) {
        items.push((lines[index] ?? "").trim().replace(/^- /, ""));
        index += 1;
      }
      blocks.push({ kind: "list", ordered: false, items });
      continue;
    }

    if (isStep(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && isStep(lines[index] ?? "")) {
        items.push((lines[index] ?? "").trim().replace(/^\d+\.\s+/, ""));
        index += 1;
      }
      blocks.push({ kind: "list", ordered: true, items });
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length) {
      const next = lines[index] ?? "";
      const nextTrimmed = next.trim();
      if (
        nextTrimmed === "" ||
        nextTrimmed.startsWith("```") ||
        nextTrimmed === "$$" ||
        isHeading(nextTrimmed) ||
        isBullet(nextTrimmed) ||
        isStep(nextTrimmed) ||
        (nextTrimmed.startsWith("|") && isTableSeparator(lines[index + 1] ?? ""))
      ) {
        break;
      }
      paragraph.push(next);
      index += 1;
    }
    blocks.push({ kind: "paragraph", lines: paragraph });
  }

  return blocks;
}

export function uncoveredT7Lines(markdown: string, blocks: ReadBlock[]): string[] {
  const used = new Set<string>();
  for (const block of blocks) {
    if (block.kind === "heading") used.add(block.text);
    if (block.kind === "paragraph") for (const line of block.lines) used.add(line.trim());
    if (block.kind === "list") for (const item of block.items) used.add(item);
    if (block.kind === "math") for (const line of block.tex.split("\n")) used.add(line.trim());
    if (block.kind === "code") for (const line of block.text.split("\n")) used.add(line.trim());
    if (block.kind === "table") {
      used.add(block.header.join(" | "));
      for (const row of block.rows) used.add(row.join(" | "));
    }
  }
  const missing: string[] = [];
  let fence = false;
  let math = false;
  for (const line of markdown.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("```")) {
      fence = !fence;
      continue;
    }
    if (trimmed === "$$") {
      math = !math;
      continue;
    }
    if (trimmed === "" || trimmed.startsWith("|")) continue;
    if (fence || math) {
      if (!used.has(trimmed)) missing.push(trimmed);
      continue;
    }
    let text = trimmed;
    if (/^#{1,3}\s+/.test(text)) text = text.replace(/^#{1,3}\s+/, "");
    else if (/^- /.test(text)) text = text.replace(/^- /, "");
    else if (/^\d+\.\s+/.test(text)) text = text.replace(/^\d+\.\s+/, "");
    if (!used.has(trimmed) && !used.has(text)) missing.push(trimmed);
  }
  return missing;
}
