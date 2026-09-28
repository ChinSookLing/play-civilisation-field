const LETTERS = "ABCDEFGHJKLMNOPQRST";
export const SIZE = 9;
export const COLS = LETTERS.slice(0, SIZE);

export function colsFor(size: number): string {
  return LETTERS.slice(0, size);
}

export type Stone = "black" | "white";
export type Cell = Stone | null;
export type Board = Cell[][];

export function emptyBoard(size = SIZE): Board {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => null));
}

export function parseCoord(raw: string, size = SIZE): { x: number; y: number } | null {
  const cols = colsFor(size);
  const m = /^([A-HJ-T])(\d{1,2})$/i.exec(raw.trim());
  if (!m) return null;
  const x = cols.indexOf(m[1]!.toUpperCase());
  const y = Number(m[2]) - 1;
  if (x < 0 || y < 0 || y >= size) return null;
  return { x, y };
}

export function parseCoordFromText(raw: string): string | null {
  const parsed = parseContestantReply(raw);
  if (parsed.kind === "move") return parsed.coord;
  if (parsed.kind === "pass") return "pass";
  return null;
}

export type ContestantReply =
  | { kind: "move"; coord: string; comment: string }
  | { kind: "pass"; comment: string }
  | { kind: "resign"; comment: string }
  | { kind: "no_move"; reason: string }
  | { kind: "unparsed"; firstLine: string };

export function parseContestantReply(raw: string, size = SIZE): ContestantReply {
  const text = raw.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const stripped = text.replace(/^```[a-zA-Z0-9]*\n?/, "").replace(/\n?```$/, "");
  const lines = stripped.split("\n");
  let index = 0;
  while (index < lines.length && normalizeFirstLine(lines[index] ?? "") === "") index += 1;
  const first = normalizeFirstLine(lines[index] ?? "");
  const rest = lines.slice(index + 1).join("\n").trim();
  if (!first) return { kind: "unparsed", firstLine: "" };
  if (/^NO\s*MOVE\b/i.test(first)) {
    const inline = first.replace(/^NO\s*MOVE\s*:?\s*/i, "").trim();
    return { kind: "no_move", reason: inline || rest || "incomplete board state" };
  }
  if (/^pass$/i.test(first)) return { kind: "pass", comment: rest };
  if (/^resign$/i.test(first)) return { kind: "resign", comment: rest };
  if (/^([A-HJ-T])(\d{1,2})$/i.test(first) && parseCoord(first, size)) {
    return { kind: "move", coord: first.toUpperCase(), comment: rest };
  }
  return { kind: "unparsed", firstLine: first };
}

function normalizeFirstLine(line: string): string {
  return line
    .trim()
    .replace(/^\*+|\*+$/g, "")
    .replace(/^`+|`+$/g, "")
    .replace(/^\*+|\*+$/g, "")
    .trim();
}

export function formatCoord(x: number, y: number, size = SIZE): string {
  return `${colsFor(size)[x]}${y + 1}`;
}

function neighbors(x: number, y: number, size: number): { x: number; y: number }[] {
  const out: { x: number; y: number }[] = [];
  if (x > 0) out.push({ x: x - 1, y });
  if (x + 1 < size) out.push({ x: x + 1, y });
  if (y > 0) out.push({ x, y: y - 1 });
  if (y + 1 < size) out.push({ x, y: y + 1 });
  return out;
}

function groupAt(board: Board, x: number, y: number) {
  const color = board[y]![x];
  if (!color) return { stones: [] as { x: number; y: number }[], liberties: 0 };
  const seen = new Set<string>([`${x},${y}`]);
  const stones: { x: number; y: number }[] = [];
  const libs = new Set<string>();
  const stack = [{ x, y }];
  while (stack.length) {
    const p = stack.pop()!;
    stones.push(p);
    for (const n of neighbors(p.x, p.y, board.length)) {
      const c = board[n.y]![n.x];
      if (!c) libs.add(`${n.x},${n.y}`);
      else if (c === color && !seen.has(`${n.x},${n.y}`)) {
        seen.add(`${n.x},${n.y}`);
        stack.push(n);
      }
    }
  }
  return { stones, liberties: libs.size };
}

export function applyMove(
  board: Board,
  stone: Stone,
  coord: string,
): { board: Board; captured: number; capturedAt: string[]; illegal?: string } {
  if (coord.trim().toLowerCase() === "pass" || coord.trim().toLowerCase() === "resign") {
    return { board: board.map((row) => row.slice()), captured: 0, capturedAt: [] };
  }
  const size = board.length || SIZE;
  const p = parseCoord(coord, size);
  if (!p) return { board, captured: 0, capturedAt: [], illegal: `bad coord ${coord}` };
  if (board[p.y]![p.x]) return { board, captured: 0, capturedAt: [], illegal: `occupied ${coord}` };
  const next = board.map((row) => row.slice());
  next[p.y]![p.x] = stone;
  const opp: Stone = stone === "black" ? "white" : "black";
  const doomed = new Set<string>();
  for (const n of neighbors(p.x, p.y, size)) {
    if (next[n.y]![n.x] !== opp) continue;
    const g = groupAt(next, n.x, n.y);
    if (g.liberties === 0) {
      for (const s of g.stones) doomed.add(`${s.x},${s.y}`);
    }
  }
  const capturedAt: string[] = [];
  for (const key of doomed) {
    const [x, y] = key.split(",").map(Number) as [number, number];
    next[y]![x] = null;
    capturedAt.push(formatCoord(x, y, size));
  }
  const own = groupAt(next, p.x, p.y);
  if (own.liberties === 0) return { board, captured: 0, capturedAt: [], illegal: `suicide ${coord}` };
  return { board: next, captured: capturedAt.length, capturedAt };
}

export function koBanned(moves: { color: Stone; coord: string }[], size = SIZE): string | null {
  const last = moves.at(-1);
  if (!last || last.coord === "pass" || last.coord === "resign") return null;
  const previous = replayMoves(moves.slice(0, -1), size);
  const applied = applyMove(previous.board, last.color, last.coord);
  if (applied.illegal || applied.captured !== 1 || applied.capturedAt.length !== 1) return null;
  const p = parseCoord(last.coord, size);
  if (!p) return null;
  if (groupAt(applied.board, p.x, p.y).stones.length !== 1) return null;
  return applied.capturedAt[0] ?? null;
}

export function legalActions(
  board: Board,
  color: Stone,
  koBan: string | null = null,
): string[] {
  const size = board.length || SIZE;
  const cols = colsFor(size);
  const coords: string[] = [];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < cols.length; x += 1) {
      const coord = formatCoord(x, y, size);
      if (koBan && coord === koBan) continue;
      const applied = applyMove(board, color, coord);
      if (!applied.illegal) coords.push(coord);
    }
  }
  coords.push("pass", "resign");
  return coords;
}

export function liftStones(board: Board, coords: string[]): { board: Board; error?: string } {
  const next = board.map((row) => row.slice());
  for (const raw of coords) {
    const p = parseCoord(raw, board.length || SIZE);
    if (!p) return { board, error: `bad dead stone ${raw}` };
    if (!next[p.y]![p.x]) return { board, error: `no stone at ${raw}` };
    next[p.y]![p.x] = null;
  }
  return { board: next };
}

export function replayMoves(moves: { color: Stone; coord: string }[], size = SIZE): {
  board: Board;
  captures: { black: number; white: number };
  snapshots: Board[];
} {
  let board = emptyBoard(size);
  const captures = { black: 0, white: 0 };
  const snapshots: Board[] = [emptyBoard(size)];
  for (const move of moves) {
    const result = applyMove(board, move.color, move.coord);
    if (result.illegal) {
      throw new Error(`Illegal ${move.color} ${move.coord}: ${result.illegal}`);
    }
    board = result.board;
    if (move.color === "black") captures.black += result.captured;
    else captures.white += result.captured;
    snapshots.push(board.map((row) => row.slice()));
  }
  return { board, captures, snapshots };
}

export function countStones(board: Board): { black: number; white: number } {
  let black = 0;
  let white = 0;
  for (const row of board) {
    for (const cell of row) {
      if (cell === "black") black += 1;
      if (cell === "white") white += 1;
    }
  }
  return { black, white };
}

function countTerritory(board: Board): { black: number; white: number } {
  const seen = new Set<string>();
  let black = 0;
  let white = 0;
  const size = board.length || SIZE;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (board[y]![x] || seen.has(`${x},${y}`)) continue;
      const queue = [{ x, y }];
      const region: { x: number; y: number }[] = [];
      const touch = new Set<Stone>();
      seen.add(`${x},${y}`);
      while (queue.length) {
        const p = queue.pop()!;
        region.push(p);
        for (const n of neighbors(p.x, p.y, board.length)) {
          const cell = board[n.y]![n.x];
          if (!cell) {
            const key = `${n.x},${n.y}`;
            if (!seen.has(key)) {
              seen.add(key);
              queue.push(n);
            }
          } else {
            touch.add(cell);
          }
        }
      }
      if (touch.size === 1) {
        if (touch.has("black")) black += region.length;
        else white += region.length;
      }
    }
  }
  return { black, white };
}

export type AreaScore = {
  blackStones: number;
  whiteStones: number;
  blackTerritory: number;
  whiteTerritory: number;
  blackTotal: number;
  whiteTotal: number;
  komi: number;
  winner: "black" | "white";
  margin: number;
  text: string;
};

export function chineseAreaScore(board: Board, komi: number): AreaScore {
  const stones = countStones(board);
  const territory = countTerritory(board);
  const blackTotal = stones.black + territory.black;
  const whiteTotal = stones.white + territory.white + komi;
  const margin = Math.abs(whiteTotal - blackTotal);
  const winner: Stone = whiteTotal >= blackTotal ? "white" : "black";
  const who = winner === "white" ? "白" : "黑";
  const text = `Chinese experimental ${board.length}×${board.length} · komi ${komi} · area · ${who} +${margin}`;
  return {
    blackStones: stones.black,
    whiteStones: stones.white,
    blackTerritory: territory.black,
    whiteTerritory: territory.white,
    blackTotal,
    whiteTotal,
    komi,
    winner,
    margin,
    text,
  };
}

export function formatAsciiBoard(board: Board): string {
  const size = board.length || SIZE;
  const lines: string[] = [];
  for (let rank = size; rank >= 1; rank -= 1) {
    const y = rank - 1;
    const cells = board[y]!.map((cell) => {
      if (cell === "black") return "X";
      if (cell === "white") return "O";
      return ".";
    }).join(" ");
    const label = String(rank).padStart(size >= 10 ? 2 : 1, " ");
    lines.push(`${label} ${cells}`);
  }
  lines.push(`  ${[...colsFor(size)].join(" ")}`);
  return lines.join("\n");
}

const SGF_LETTERS = "abcdefghijklmnopqrs";

export function toSgfCoord(coord: string, size = SIZE): string {
  if (coord.trim().toLowerCase() === "pass" || coord.trim().toLowerCase() === "resign") return "";
  const p = parseCoord(coord, size);
  if (!p) return "";
  return SGF_LETTERS[p.x] + SGF_LETTERS[size - 1 - p.y];
}
