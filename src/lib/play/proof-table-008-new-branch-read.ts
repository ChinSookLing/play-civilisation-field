export type ReadBlock =
  | { kind: "heading"; level: 1 | 2 | 3; text: string; id?: string }
  | { kind: "paragraph"; lines: string[] }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "table"; header: string[]; rows: string[][] }
  | { kind: "code"; lang: string; code: string }
  | { kind: "math"; tex: string }
  | { kind: "rule" };

const HEADING_IDS: Array<[string, string]> = [
  ["1. 模型", "def"],
  ["1.1 ", "one-to-four"],
  ["1.2 ", "five"],
  ["2. 通道一", "proof"],
  ["7. 版本", "review"],
  ["附錄 Q", "appendix"],
  ["附錄 U", "appendix-u"],
];

export function headingId(text: string): string | undefined {
  const hit = HEADING_IDS.find(([prefix]) => text.startsWith(prefix));
  return hit?.[1];
}

function splitRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableSeparator(line: string): boolean {
  const cells = splitRow(line);
  return cells.length > 1 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function isStructural(line: string): boolean {
  const trimmed = line.trim();
  return (
    trimmed === "" ||
    trimmed === "---" ||
    trimmed === "\\[" ||
    trimmed.startsWith("```") ||
    trimmed.startsWith("|") ||
    /^#{1,3}\s/.test(trimmed) ||
    trimmed.startsWith("- ") ||
    /^\d+\.\s/.test(trimmed)
  );
}

/** Turn the filed markdown into blocks. The source file is not rewritten. */
export function parseManuscript(markdown: string): ReadBlock[] {
  const lines = markdown.replace(/\n$/, "").split("\n");
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
      const lang = trimmed.slice(3).trim();
      const body: string[] = [];
      index += 1;
      while (index < lines.length && !(lines[index] ?? "").trim().startsWith("```")) {
        body.push(lines[index] ?? "");
        index += 1;
      }
      index += 1;
      blocks.push({ kind: "code", lang, code: body.join("\n") });
      continue;
    }

    if (trimmed === "\\[") {
      const tex: string[] = [];
      index += 1;
      while (index < lines.length && (lines[index] ?? "").trim() !== "\\]") {
        tex.push(lines[index] ?? "");
        index += 1;
      }
      index += 1;
      blocks.push({ kind: "math", tex: tex.join("\n").trim() });
      continue;
    }

    if (trimmed === "---") {
      blocks.push({ kind: "rule" });
      index += 1;
      continue;
    }

    const heading = /^(#{1,3})\s+(.*)$/.exec(trimmed);
    if (heading) {
      const level = heading[1]?.length as 1 | 2 | 3;
      const text = heading[2] ?? "";
      blocks.push({ kind: "heading", level, text, id: headingId(text) });
      index += 1;
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

    if (trimmed.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length && (lines[index] ?? "").trim().startsWith("- ")) {
        items.push((lines[index] ?? "").trim().slice(2));
        index += 1;
      }
      blocks.push({ kind: "list", ordered: false, items });
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s/.test((lines[index] ?? "").trim())) {
        items.push((lines[index] ?? "").trim().replace(/^\d+\.\s/, ""));
        index += 1;
      }
      blocks.push({ kind: "list", ordered: true, items });
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length && !isStructural(lines[index] ?? "")) {
      paragraph.push((lines[index] ?? "").trimEnd());
      index += 1;
    }
    blocks.push({ kind: "paragraph", lines: paragraph });
  }

  return blocks;
}

/** Lines whose wording must survive in some block. Fences, rules, and table rules are syntax. */
export function uncoveredLines(markdown: string, blocks: ReadBlock[]): string[] {
  const blob = blocks
    .map((block) => {
      if (block.kind === "heading") return block.text;
      if (block.kind === "paragraph") return block.lines.join("\n");
      if (block.kind === "list") return block.items.join("\n");
      if (block.kind === "table") return [block.header, ...block.rows].flat().join("\n");
      if (block.kind === "code") return block.code;
      if (block.kind === "math") return block.tex;
      return "";
    })
    .join("\n");
  const missing: string[] = [];
  for (const line of markdown.split("\n")) {
    const trimmed = line.trim();
    if (
      trimmed === "" ||
      trimmed === "---" ||
      trimmed === "\\[" ||
      trimmed === "\\]" ||
      trimmed.startsWith("```") ||
      isTableSeparator(trimmed)
    ) {
      continue;
    }
    if (trimmed.startsWith("|")) {
      for (const cell of splitRow(trimmed)) {
        if (cell && !blob.includes(cell)) missing.push(cell);
      }
      continue;
    }
    const words = trimmed.replace(/^#{1,3}\s+/, "").replace(/^-\s+/, "").replace(/^\d+\.\s+/, "");
    if (!blob.includes(words)) missing.push(words);
  }
  return missing;
}
