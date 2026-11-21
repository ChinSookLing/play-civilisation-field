export type ReadBlock =
  | { kind: "heading"; level: 1 | 2 | 3; text: string; id?: string }
  | { kind: "paragraph"; lines: string[] }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "table"; header: string[]; rows: string[][] }
  | { kind: "math"; tex: string };

const SECTION_IDS: Array<[string, string]> = [
  ["摘要", "abstract"],
  ["0.1 ", "concordance"],
  ["1. ", "defs"],
  ["2. ", "half"],
  ["3. ", "tree"],
  ["4. ", "easy"],
  ["5. ", "k2"],
  ["6. ", "k3"],
  ["7. ", "k4"],
  ["8. ", "k5"],
  ["9. ", "k6"],
  ["10. ", "machine"],
  ["11. ", "trace"],
  ["12. ", "still"],
  ["附录 A", "a"],
  ["附录 B", "b"],
  ["附录 C", "c"],
  ["附录 D", "d"],
  ["附录 E", "e"],
  ["附录 F", "f"],
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

function isRule(line: string): boolean {
  return /^[─—\-]{3,}$/u.test(line.trim());
}

function isSectionTitle(line: string): boolean {
  const text = line.trim();
  if (text.startsWith("摘要") || text.startsWith("附录")) return text.length < 120;
  if (/^\d+\.\d+\s/u.test(text)) return text.length < 80 && !text.includes("。");
  if (/^\d+\.\s/u.test(text)) return text.length < 60 && !text.includes("。");
  return false;
}

function isBullet(line: string): boolean {
  const text = line.trim();
  return text.startsWith("• ") || text.startsWith("- ");
}

function bulletText(line: string): string {
  const text = line.trim();
  return text.startsWith("• ") ? text.slice(2) : text.replace(/^- /, "");
}

function takeMath(lines: string[], index: number): { tex: string; next: number } {
  const first = (lines[index] ?? "").trim();
  if (first === "$$") {
    const tex: string[] = [];
    let next = index + 1;
    while (next < lines.length && (lines[next] ?? "").trim() !== "$$") {
      tex.push(lines[next] ?? "");
      next += 1;
    }
    return { tex: tex.join("\n").trim(), next: next + 1 };
  }
  if (first.endsWith("$$") && first.length > 4) {
    return { tex: first.slice(2, -2).trim(), next: index + 1 };
  }
  const tex = [first.slice(2)];
  let next = index + 1;
  while (next < lines.length) {
    const line = lines[next] ?? "";
    if (line.trim().endsWith("$$")) {
      tex.push(line.trim().slice(0, -2));
      next += 1;
      break;
    }
    tex.push(line);
    next += 1;
  }
  return { tex: tex.join("\n").trim(), next };
}

/** Turn the filed text into blocks. The source file is not rewritten. */
export function parseT8(markdown: string): ReadBlock[] {
  const lines = markdown.split("\n");
  const blocks: ReadBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const trimmed = (lines[index] ?? "").trim();
    if (trimmed === "" || isRule(trimmed)) {
      index += 1;
      continue;
    }
    if (trimmed.startsWith("$$")) {
      const taken = takeMath(lines, index);
      blocks.push({ kind: "math", tex: taken.tex });
      index = taken.next;
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
    if (isSectionTitle(trimmed)) {
      const level = trimmed.startsWith("附录") || /^\d+\s/u.test(trimmed) ? 2 : /^\d+\.\d+/u.test(trimmed) ? 3 : 2;
      blocks.push({ kind: "heading", level, text: trimmed, id: headingId(trimmed) });
      index += 1;
      continue;
    }
    if (isBullet(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && isBullet(lines[index] ?? "")) {
        items.push(bulletText(lines[index] ?? ""));
        index += 1;
      }
      blocks.push({ kind: "list", ordered: false, items });
      continue;
    }
    const paragraph: string[] = [];
    while (index < lines.length) {
      const next = (lines[index] ?? "").trim();
      if (
        next === "" ||
        isRule(next) ||
        next.startsWith("$$") ||
        isSectionTitle(next) ||
        isBullet(next) ||
        (next.startsWith("|") && isTableSeparator(lines[index + 1] ?? ""))
      ) {
        break;
      }
      paragraph.push(next.startsWith("> ") ? next.slice(2) : next);
      index += 1;
    }
    if (paragraph.length > 0) blocks.push({ kind: "paragraph", lines: paragraph });
  }
  return blocks;
}
