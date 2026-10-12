import {
  isoKualaLumpur,
  ORIGIN,
  sheetWrap,
  textRevision,
  type Sheet,
  type SheetStatus,
} from "./sheet.ts";

/** Future proof tables cut parts here. A line is never split. */
export const WALL_PART_BUDGET = 100_000;

/** No ledger row on this table. Not "none yet". */
export const LEDGER_NONE_ON_TABLE = "none on this table";

export type WallIndexLine = {
  n: number;
  at: string;
  line_type: string;
  speaker: string;
  round: number | null;
};

export type WallBlock = {
  line: WallIndexLine;
  text: string;
};

export type WallPart = {
  id: string;
  from: string;
  to: string;
  url: string;
  previous: string;
  next: string;
  rounds: string;
  chars: number;
  body: string;
};

export type OpenTableBits = {
  status: SheetStatus;
  completeness: "partial — do not act" | undefined;
  completenessInStatus: false | undefined;
};

/** Once a table is open, STATUS does not repeat COMPLETENESS. */
export function openTableSheetBits(opened: boolean): OpenTableBits {
  if (opened) return { status: "active", completeness: undefined, completenessInStatus: false };
  return {
    status: "prepared",
    completeness: "partial — do not act",
    completenessInStatus: undefined,
  };
}

export function chooseWhenOpen(opened: boolean, openText: string, preparedText: string): string {
  return opened ? openText : preparedText;
}

export function ledgerVersionNote(version: string | undefined): string {
  return version ? `LEDGER_VERSION: ${version}` : `LEDGER_VERSION: ${LEDGER_NONE_ON_TABLE}`;
}

export function ledgerBody(books: string | undefined): string {
  return books && books.trim() ? books.trimEnd() : `LEDGER: ${LEDGER_NONE_ON_TABLE}`;
}

export function wallPartUrl(slug: string, part: number): string {
  return `${ORIGIN}/gathering/${slug}-part/${String(part).padStart(2, "0")}.txt`;
}

export function wallParts(
  slug: string,
  blocks: WallBlock[],
  budget = WALL_PART_BUDGET,
): WallPart[] {
  const groups: WallBlock[][] = [];
  let current: WallBlock[] = [];
  let size = 0;
  for (const block of blocks) {
    if (current.length > 0 && size + block.text.length > budget) {
      groups.push(current);
      current = [];
      size = 0;
    }
    current.push(block);
    size += block.text.length;
  }
  if (current.length > 0) groups.push(current);
  return groups.map((group, index) => {
    const part = index + 1;
    const id = String(part).padStart(2, "0");
    const rounds = [
      ...new Set(
        group.map((block) => block.line.round).filter((round): round is number => round != null),
      ),
    ].sort((a, b) => a - b);
    return {
      id,
      from: `LINE ${String(group[0]!.line.n).padStart(3, "0")}`,
      to: `LINE ${String(group[group.length - 1]!.line.n).padStart(3, "0")}`,
      url: wallPartUrl(slug, part),
      previous: part === 1 ? "none" : wallPartUrl(slug, part - 1),
      next: part === groups.length ? "none" : wallPartUrl(slug, part + 1),
      rounds: rounds.length ? rounds.join(",") : "none",
      chars: group.reduce((sum, block) => sum + block.text.length, 0),
      body: group.map((block) => block.text).join("\n"),
    };
  });
}

export function wallLatest(lines: WallIndexLine[]): string {
  const last = lines.slice(-20);
  if (!last.length) return "LATEST: none";
  return last
    .map((line) => {
      const round = line.round == null ? "none" : String(line.round);
      return `LATEST: LINE ${String(line.n).padStart(3, "0")} · ${isoKualaLumpur(line.at)} · ${line.line_type} · ${line.speaker} · round ${round}`;
    })
    .join("\n");
}

export function wallRoundNote(lines: WallIndexLine[], budget = WALL_PART_BUDGET): string {
  const tagged = lines.filter((line) => line.round != null);
  const by = new Map<number, number[]>();
  for (const line of tagged) {
    const round = line.round;
    if (round == null) continue;
    const list = by.get(round) ?? [];
    list.push(line.n);
    by.set(round, list);
  }
  const described = [...by.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(
      ([round, nums]) =>
        `ROUND ${round}: ${nums.length} lines (${nums.map((n) => String(n).padStart(3, "0")).join(", ")})`,
    );
  return [
    described.join("\n"),
    `ROUND_FIELD_EMPTY: ${lines.length - tagged.length} lines have no round number, so parts are not one file per round.`,
    `PART_SPLIT: ${budget} characters. A line is never cut in half.`,
  ]
    .filter((line) => line !== "")
    .join("\n");
}

/** Catalog only. Line bodies stay out of the HTML loader. */
export function wallCatalog(parts: WallPart[]) {
  return parts.map((part) => ({
    id: part.id,
    from: part.from,
    to: part.to,
    href: part.url.replace(ORIGIN, ""),
    rounds: part.rounds,
    chars: part.chars,
  }));
}

export function wallPartText(input: {
  tableId: string;
  title: string;
  part: WallPart;
  total: number;
  asOf: string;
  opened: boolean;
  audience: string;
  provenance: string;
  tableUrl: string;
  tableTxt: string;
  partsTxt: string;
}): string {
  const { part, total } = input;
  const bits = openTableSheetBits(input.opened);
  const sheet: Sheet = {
    id: `${input.tableId}-P${part.id}`,
    page: `${input.title} · part ${part.id}`,
    status: bits.status,
    asOf: input.asOf,
    asOfMeans: input.opened
      ? "time of the newest posted line, in +08:00."
      : "No line is posted yet, so there is no record time.",
    stateVersion: textRevision(part.body),
    html: input.tableUrl,
    plainText: part.url,
    completeness: bits.completeness,
    completenessInStatus: bits.completenessInStatus,
    audience: input.audience,
    definition: `Part ${Number(part.id)} of ${total}. ${part.from} to ${part.to}. Rounds in this part: ${part.rounds}. Split at ${WALL_PART_BUDGET} characters because most lines have no round number. A line is not cut.`,
    provenance: input.provenance,
    fallback: `If this route fails, try ${part.previous === "none" ? input.partsTxt : part.previous} next, then ${input.tableTxt}.`,
    notes: [
      `PART: ${Number(part.id)}/${total}`,
      `LINES: ${part.from}-${part.to}`,
      `ROUNDS: ${part.rounds}`,
      `PREVIOUS: ${part.previous}`,
      `NEXT: ${part.next}`,
      `FULL: ${input.tableTxt}`,
      `INDEX: ${input.partsTxt}`,
    ],
  };
  return sheetWrap(sheet, part.body);
}

export function wallPartsPlain(input: {
  base: Sheet;
  id: string;
  page: string;
  partsTxt: string;
  tableUrl: string;
  definition: string;
  lines: WallIndexLine[];
  parts: WallPart[];
}): string {
  const sheet: Sheet = {
    ...input.base,
    id: input.id,
    page: input.page,
    plainText: input.partsTxt,
    html: input.tableUrl,
    definition: input.definition,
    fallback: `If this route fails, try ${input.tableUrl} next, then ${input.base.plainText}.`,
  };
  const record = [
    wallLatest(input.lines),
    "",
    wallRoundNote(input.lines),
    "",
    input.parts
      .map(
        (part) =>
          `${part.id} ${part.from}-${part.to} rounds ${part.rounds} ${part.chars} ${part.url}`,
      )
      .join("\n") || "No parts yet.",
  ].join("\n");
  return sheetWrap(sheet, record);
}
