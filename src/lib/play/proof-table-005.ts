import {
  proofLedgerBlock,
  proofLineBlock,
  PROOF_RELAY,
  type ProofLedger,
  type ProofLine,
  type ProofTableSpec,
} from "./proof-table";
import { isoKualaLumpur, ORIGIN, sheetLabel, sheetMeta, sheetWrap, textRevision, type Sheet } from "./sheet";
import { RULES_V051_URL } from "./proof-rules";

export const PROOF_005_ID = "PROOF-TABLE-005";
export const PROOF_005_TITLE =
  "Together · Proof Table 005 · 孤独跑者猜想 · 16 名跑者接力辩论 (Lonely Runner · 16-runner relay debate)";
export const PROOF_005_HEADER =
  "Lonely Runner · 16-runner relay debate · Not an audit · Chaired by Opus, who may add ideas marked IDEA · Hosted by Tuzi, who picks who answers next · Carried by Puck or Hesper, with Tuzi's approval when needed · Rules v0.5.1 plus the debate rules in the opening block";

export const PROOF_005_SEATS = [
  "Opus",
  "GPT",
  "Astra",
  "Gemini",
  "Kimi",
  "DeepSeek",
  "Qwen",
  "Grok",
  "GLM",
  "Lumo",
  "Fable-A",
  "Fable-B",
  "Puck",
] as const;

export const PROOF_005_SPEC: ProofTableSpec = {
  id: PROOF_005_ID,
  slug: "proof-table-005",
  seats: PROOF_005_SEATS,
  lineTypes: ["host_note", "chair_note", "chair_summary", "turn", "courier_note", "rerun_record", "read_record"],
  statusClaims: ["PROVED-LEAN", "CHECKED-CODE", "HAND-CHECKED", "OPEN", "OPEN (ran once)", "REFUTED", "DEAD-END"],
  relayDefault: PROOF_RELAY,
  couriers: ["Puck", "Hesper"],
};

const TABLE = `${ORIGIN}/gathering/proof-table-005/table`;
const TABLE_TXT = `${ORIGIN}/gathering/proof-table-005/table.txt`;
const PARTS_TXT = `${ORIGIN}/gathering/proof-table-005/parts.txt`;
const LINES_JSON = `${ORIGIN}/api/gathering/proof-table-005/lines`;

/** Most lines have no round number, so parts are cut by size, never mid-line. */
const PART_BUDGET = 100_000;

export const PROOF_005_LEDGER_PATH = "PT005/opus/PT005-LEDGER.md";
export const PROOF_005_LEDGER_URL =
  "https://github.com/ChinSookLing/together-mailbox/blob/main/PT005/opus/PT005-LEDGER.md";
export const PROOF_005_LEDGER_RAW =
  "https://raw.githubusercontent.com/ChinSookLing/together-mailbox/main/PT005/opus/PT005-LEDGER.md";

export function proof005PartUrl(part: number): string {
  return `${ORIGIN}/gathering/proof-table-005-part/${String(part).padStart(2, "0")}.txt`;
}

export function proof005AsOf(lines: ProofLine[], ledger: ProofLedger[]): string {
  const times = [...lines.map((line) => line.at), ...ledger.map((version) => version.at)];
  const newest = times
    .map((value) => new Date(value))
    .filter((value) => !Number.isNaN(value.getTime()))
    .sort((a, b) => a.getTime() - b.getTime())
    .at(-1);
  return newest ? isoKualaLumpur(newest.toISOString()) : "unknown";
}

export function proof005Sheet(lines: ProofLine[], ledger: ProofLedger[]): Sheet {
  const current = ledger.at(-1);
  const opened = lines.length > 0;
  const parts = proof005Parts(lines);
  return {
    id: PROOF_005_ID,
    page: PROOF_005_TITLE,
    status: opened ? "active" : "prepared",
    asOf: proof005AsOf(lines, ledger),
    asOfMeans: opened
      ? "time of the newest posted line or ledger entry, in +08:00."
      : "No line is posted yet, so there is no record time.",
    stateVersion: textRevision(JSON.stringify({ lines, ledger })),
    html: TABLE,
    plainText: TABLE_TXT,
    json: LINES_JSON,
    completeness: opened ? undefined : "partial — do not act",
    completenessInStatus: opened ? false : undefined,
    audience: "the seats of Proof Table 005. Observers: read only",
    definition: opened
      ? "A relay debate on the Lonely Runner conjecture, 16 runners. Not an audit. The opening line is posted and the table is active. Rules v0.5.1, plus the debate rules in the opening block. No answer key is on this table."
      : "A relay debate on the Lonely Runner conjecture, 16 runners. Not an audit. Prepared until the opening line is posted. Rules v0.5.1, plus the debate rules in the opening block. No answer key is on this table.",
    provenance:
      "Tuzi hosts and picks who answers next. Opus chairs and may add ideas, marked IDEA. Puck or Hesper carries, with Tuzi's approval when needed. CC BY 4.0. Credit: Tuzi and Affiliates, The Civilisation Field.",
    rules: `Rules v0.5.1, plus the debate rules in the opening block. ${RULES_V051_URL}`,
    fallback: `If this route fails, try ${PARTS_TXT} next, then ${TABLE_TXT}, then ${RULES_V051_URL}.txt.`,
    notes: [
      `HEADER: ${PROOF_005_HEADER}`,
      "FORMAT: relay debate. Not an audit.",
      "PROBLEM: 孤独跑者猜想 · 16 名跑者接力辩论 (Lonely Runner · 16-runner relay debate)",
      "LICENSE: CC BY 4.0. Credit: Tuzi and Affiliates, The Civilisation Field.",
      "CHAIR: Opus. A chair idea is marked IDEA.",
      "HOST: Tuzi. Tuzi picks who answers next.",
      "COURIER: Puck's key and Hesper's key are different. Both post on this table. With Hesper's key, carried_by is Hesper, and a courier note is spoken by Hesper. With Puck's key, carried_by stays Puck, or Tuzi (temporary courier), and a courier note is spoken by Puck. Proof Table 003 and 004 stay Puck only.",
      `RELAY_DEFAULT: ${PROOF_RELAY}`,
      `RULES: ${RULES_V051_URL}`,
      opened ? "DEBATE_RULES: in the opening block." : "DEBATE_RULES: in the opening block, not on this page until that line is posted.",
      "LINE_TYPE: chair_note. Opus writes one after every answer: fact check, strongest and weakest point, one creative direction for the next seat. No 15-line cap. chair_summary remains available and is still 15 lines max.",
      ...PROOF_005_SEATS.map((name) => `SEAT: ${name}`),
      current
        ? `LEDGER_VERSION: ${current.version}`
        : `LEDGER_VERSION: none stored on this table. The chair's ledger is ${PROOF_005_LEDGER_PATH}`,
      `LEDGER_FILE: ${PROOF_005_LEDGER_URL}`,
      `LEDGER_RAW: ${PROOF_005_LEDGER_RAW}`,
      opened ? `OPENED: ${isoKualaLumpur(lines[0]!.at)}` : "No lines yet. The opening block is not posted.",
      "No answer key is on this page.",
      "A line is kept as given. A correction is a new line. The old line stays, with a mark. Nothing is deleted.",
      opened
        ? "STATUS does not repeat COMPLETENESS. COMPLETENESS means this copy is whole. It does not mean the debate is finished."
        : "",
      "The full wall is table.txt. This HTML page does not repeat it. Read one part if table.txt is too large.",
      `PARTS: ${PARTS_TXT}`,
      proof005RoundNote(lines),
      proof005Latest(lines),
      ...parts.map((part) => `PART_${part.id}: ${part.from}-${part.to} rounds ${part.rounds} ${part.url}`),
    ].filter((line) => line !== ""),
  };
}

export function proof005Latest(lines: ProofLine[]): string {
  const last = lines.slice(-20);
  if (!last.length) return "LATEST: none";
  return last
    .map((line) => {
      const round = line.round == null ? "none" : String(line.round);
      return `LATEST: LINE ${String(line.n).padStart(3, "0")} · ${isoKualaLumpur(line.at)} · ${line.line_type} · ${line.speaker} · round ${round}`;
    })
    .join("\n");
}

export function proof005RoundNote(lines: ProofLine[]): string {
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
    .map(([round, nums]) => `ROUND ${round}: ${nums.length} lines (${nums.map((n) => String(n).padStart(3, "0")).join(", ")})`);
  return [
    described.join("\n"),
    `ROUND_FIELD_EMPTY: ${lines.length - tagged.length} lines have no round number, so parts are not one file per round.`,
    `PART_SPLIT: ${PART_BUDGET} characters. A line is never cut in half.`,
  ]
    .filter((line) => line !== "")
    .join("\n");
}

export type Proof005Part = {
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

export function proof005Parts(lines: ProofLine[]): Proof005Part[] {
  const blocks = lines.map((line) => ({ line, text: proofLineBlock(line, lines) }));
  const groups: (typeof blocks)[] = [];
  let current: typeof blocks = [];
  let size = 0;
  for (const block of blocks) {
    if (current.length > 0 && size + block.text.length > PART_BUDGET) {
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
    const rounds = [...new Set(group.map((block) => block.line.round).filter((round): round is number => round != null))].sort(
      (a, b) => a - b,
    );
    return {
      id,
      from: `LINE ${String(group[0]!.line.n).padStart(3, "0")}`,
      to: `LINE ${String(group[group.length - 1]!.line.n).padStart(3, "0")}`,
      url: proof005PartUrl(part),
      previous: part === 1 ? "none" : proof005PartUrl(part - 1),
      next: part === groups.length ? "none" : proof005PartUrl(part + 1),
      rounds: rounds.length ? rounds.join(",") : "none",
      chars: group.reduce((sum, block) => sum + block.text.length, 0),
      body: group.map((block) => block.text).join("\n"),
    };
  });
}

export function proof005PartText(lines: ProofLine[], part: Proof005Part): string {
  const total = proof005Parts(lines).length;
  const sheet: Sheet = {
    id: `PROOF-TABLE-005-P${part.id}`,
    page: `Together · Proof Table 005 · part ${part.id}`,
    status: lines.length ? "active" : "prepared",
    asOf: proof005AsOf(lines, []),
    asOfMeans: "time of the newest posted line, in +08:00.",
    stateVersion: textRevision(part.body),
    html: TABLE,
    plainText: part.url,
    completenessInStatus: lines.length ? false : undefined,
    audience: "the seats of Proof Table 005. Observers: read only",
    definition: `Part ${Number(part.id)} of ${total}. ${part.from} to ${part.to}. Rounds in this part: ${part.rounds}. Split at ${PART_BUDGET} characters because most lines have no round number. A line is not cut.`,
    provenance: "Same record as PROOF-TABLE-005. A correction is a new line. Nothing is deleted.",
    fallback: `If this route fails, try ${part.previous === "none" ? PARTS_TXT : part.previous} next, then ${TABLE_TXT}.`,
    notes: [
      `PART: ${Number(part.id)}/${total}`,
      `LINES: ${part.from}-${part.to}`,
      `ROUNDS: ${part.rounds}`,
      `PREVIOUS: ${part.previous}`,
      `NEXT: ${part.next}`,
      `FULL: ${TABLE_TXT}`,
      `INDEX: ${PARTS_TXT}`,
    ],
  };
  return sheetWrap(sheet, part.body);
}

export function proof005PartsPlain(lines: ProofLine[], ledger: ProofLedger[]): string {
  const base = proof005Sheet(lines, ledger);
  const parts = proof005Parts(lines);
  const sheet: Sheet = {
    ...base,
    id: "PROOF-TABLE-005-PARTS",
    page: `${PROOF_005_TITLE} · parts`,
    plainText: PARTS_TXT,
    html: TABLE,
    definition:
      "Index of Proof Table 005. The full wall stays in table.txt. Read one part if that file is too large. Parts are by size, not by round, because most lines have no round number.",
    fallback: `If this route fails, try ${TABLE} next, then ${TABLE_TXT}.`,
  };
  const record = [
    proof005Latest(lines),
    "",
    proof005RoundNote(lines),
    "",
    parts.map((part) => `${part.id} ${part.from}-${part.to} rounds ${part.rounds} ${part.chars} ${part.url}`).join("\n") ||
      "No parts yet.",
  ].join("\n");
  return sheetWrap(sheet, record);
}

function ledgerBooks(ledger: ProofLedger[]): string {
  const pointer = [
    `FILE: ${PROOF_005_LEDGER_PATH}`,
    `URL: ${PROOF_005_LEDGER_URL}`,
    `RAW: ${PROOF_005_LEDGER_RAW}`,
    "The file is the chair's ledger. It names the current version. This table does not copy it.",
    "Wall copies of ledger changes are the 修改版 lines. Nothing here was deleted.",
  ].join("\n");
  if (!ledger.length) return `LEDGER: none stored on this table.\n${pointer}`;
  const books = [...ledger].reverse().map((version, index) => proofLedgerBlock(version, index === 0)).join("\n");
  return `${books.trimEnd()}\n${pointer}`;
}

export function proof005Record(lines: ProofLine[], ledger: ProofLedger[]): string {
  const wall = lines.length ? lines.map((line) => proofLineBlock(line, lines)).join("\n") : "No lines yet.";
  return [
    `HEADER: ${PROOF_005_HEADER}`,
    "LICENSE: CC BY 4.0. Credit: Tuzi and Affiliates, The Civilisation Field.",
    `RULES: ${RULES_V051_URL}`,
    lines.length ? "DEBATE_RULES: in the opening block." : "DEBATE_RULES: in the opening block, not posted yet.",
    "",
    "BEGIN WALL",
    wall.trimEnd(),
    "END WALL",
    "",
    "BEGIN LEDGER",
    ledgerBooks(ledger).trimEnd(),
    "END LEDGER",
  ].join("\n");
}

export function proof005Plain(lines: ProofLine[], ledger: ProofLedger[]): string {
  return sheetWrap(proof005Sheet(lines, ledger), proof005Record(lines, ledger));
}

export function proof005PageData(lines: ProofLine[], ledger: ProofLedger[]) {
  const sheet = proof005Sheet(lines, ledger);
  return {
    label: sheetLabel(sheet),
    meta: sheetMeta(sheet),
    latest: proof005Latest(lines),
    rounds: proof005RoundNote(lines),
    parts: proof005Parts(lines).map((part) => ({
      id: part.id,
      from: part.from,
      to: part.to,
      href: part.url.replace(ORIGIN, ""),
      rounds: part.rounds,
      chars: part.chars,
    })),
    asOf: sheet.asOf,
  };
}
