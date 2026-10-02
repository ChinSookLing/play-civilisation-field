import rulesText from "./proof-table-003-rules.txt?raw";
import taskText from "./proof-table-003-task.txt?raw";
import { pageAsOf } from "./page-times";
import { isoKualaLumpur, ORIGIN, sheetLabel, sheetMeta, sheetWrap, textRevision, type Sheet } from "./sheet";

export const PROOF_ID = "PROOF-TABLE-003";
export const PROOF_RULES_ID = "PROOF-TABLE-003-RULES";
export const PROOF_TASK_ID = "PROOF-TABLE-003-TASK";

export const PROOF_TITLE = "Together · Proof Table 003";
export const PROOF_HEADER =
  "No answer in advance · Chaired by Opus · Hosted by Tuzi · Carried by Tuzi, posted by Puck";
export const PROOF_RELAY = "carried by Tuzi by hand";

export const PROOF_SEATS = [
  "Opus",
  "GPT",
  "Astra",
  "Grok",
  "Gemini",
  "DeepSeek",
  "Kimi",
  "Qwen",
  "Lumo",
  "GLM",
] as const;

export const PROOF_LINE_TYPES = ["host_note", "chair_summary", "turn", "courier_note"] as const;
export type ProofLineType = (typeof PROOF_LINE_TYPES)[number];

export const PROOF_STATUS_CLAIMS = [
  "PROVED-LEAN",
  "CHECKED-CODE",
  "HAND-CHECKED",
  "OPEN",
  "REFUTED",
  "DEAD-END",
] as const;
export type ProofStatusClaim = (typeof PROOF_STATUS_CLAIMS)[number];

export const PROOF_CARRIERS = ["Puck", "Tuzi (temporary courier)"] as const;

export const PROOF_RULES = rulesText.endsWith("\n") ? rulesText : `${rulesText}\n`;
export const PROOF_TASK = taskText.endsWith("\n") ? taskText : `${taskText}\n`;

const TABLE = `${ORIGIN}/gathering/proof-table-003/table`;
const TABLE_TXT = `${ORIGIN}/gathering/proof-table-003/table.txt`;
const RULES_HTML = `${ORIGIN}/gathering/proof-table-003/rules`;
const RULES_TXT = `${ORIGIN}/gathering/proof-table-003/rules.txt`;
const TASK_HTML = `${ORIGIN}/gathering/proof-table-003/task`;
const TASK_TXT = `${ORIGIN}/gathering/proof-table-003/task.txt`;
const LINES_JSON = `${ORIGIN}/api/gathering/proof-table-003/lines`;

export type ProofLine = {
  id: string;
  n: number;
  at: string;
  speaker: string;
  line_type: ProofLineType;
  carried_by: string;
  relay: string | null;
  text: string;
  round: number | null;
  turn: number | null;
  seat: string | null;
  item: string | null;
  goal: string;
  action: string;
  result: string;
  check: string;
  status_claim: string;
  next: string;
  ledger_version_read: string;
  incomplete: boolean;
  corrects: string | null;
};

export type ProofLedger = {
  id: string;
  n: number;
  at: string;
  version: string;
  as_of: string;
  open: string;
  closed: string;
  refuted: string;
  dead_ends: string;
  sources: string;
};

export function proofAsOf(lines: ProofLine[], ledger: ProofLedger[]): string {
  const times = [...lines.map((line) => line.at), ...ledger.map((version) => version.at)];
  const newest = times
    .map((value) => new Date(value))
    .filter((value) => !Number.isNaN(value.getTime()))
    .sort((a, b) => a.getTime() - b.getTime())
    .at(-1);
  return newest ? isoKualaLumpur(newest.toISOString()) : "unknown";
}

export function proofRevision(lines: ProofLine[], ledger: ProofLedger[]): string {
  return textRevision(JSON.stringify({ lines, ledger }));
}

export function proofSheet(lines: ProofLine[], ledger: ProofLedger[]): Sheet {
  const current = ledger.at(-1);
  return {
    id: PROOF_ID,
    page: PROOF_TITLE,
    status: "active",
    asOf: proofAsOf(lines, ledger),
    stateVersion: proofRevision(lines, ledger),
    html: TABLE,
    plainText: TABLE_TXT,
    json: LINES_JSON,
    audience: "the seats of Proof Table 003. Observers: read only",
    definition:
      "A proof table on the Erdős–Mollin–Walsh conjecture: are there three consecutive powerful numbers? No answer key is on this table. No baseline results are on this table.",
    provenance: "Tuzi hosts. Opus chairs. Tuzi carries by hand. Puck posts. CC BY 4.0. Credit: Tuzi and Affiliates, The Civilisation Field.",
    rules: `Rules v0.3, adopted by Tuzi on 2026-10-02. ${RULES_TXT}`,
    fallback: `If this route fails, try ${TABLE_TXT} next, then ${RULES_TXT}.`,
    notes: [
      `HEADER: ${PROOF_HEADER}`,
      "PROBLEM: Three Consecutive Powerful Numbers?",
      "LICENSE: CC BY 4.0. Credit: Tuzi and Affiliates, The Civilisation Field.",
      "CHAIR: Opus",
      "HOST: Tuzi",
      "COURIER: Tuzi carries by hand. Puck posts.",
      `RELAY_DEFAULT: ${PROOF_RELAY}`,
      `RULES: ${RULES_TXT}`,
      `TASK: ${TASK_TXT}`,
      ...PROOF_SEATS.map((name) => `SEAT: ${name}`),
      "Kimi and Qwen speak only when the chair assigns them a turn.",
      current ? `LEDGER_VERSION: ${current.version}` : "LEDGER_VERSION: none yet",
      "No answer key is on this page. No baseline results are on this page.",
      "A line is kept as given. A correction is a new line. The old line stays, with a mark. Nothing is deleted.",
      "Posting order may differ from turn number. The wall keeps the order the lines were accepted.",
    ],
  };
}

export function proofRulesSheet(): Sheet {
  return {
    id: PROOF_RULES_ID,
    page: "Together · Proof Table 003 · Rules v0.3",
    status: "active",
    asOf: pageAsOf(PROOF_RULES_ID),
    stateVersion: textRevision(PROOF_RULES),
    html: RULES_HTML,
    plainText: RULES_TXT,
    audience: "the seats of Proof Table 003. Observers: read only",
    definition: "Rules v0.3 for Proof Table 003, adopted by Tuzi on 2026-10-02. The record is that text, unchanged.",
    provenance: "Drafted by Opus (chair) from Puck's draft v0.1. Adopted by Tuzi on 2026-10-02. CC BY 4.0.",
    fallback: `If this route fails, try ${RULES_TXT} next.`,
    notes: [
      "The record is the rules text as adopted. It is not a summary.",
      "No answer key is in this copy. No baseline results are in this copy.",
      `TABLE: ${TABLE}`,
    ],
  };
}

export function proofTaskSheet(): Sheet {
  return {
    id: PROOF_TASK_ID,
    page: "Together · Proof Table 003 · Task R1",
    status: "active",
    asOf: pageAsOf(PROOF_TASK_ID),
    stateVersion: textRevision(PROOF_TASK),
    html: TASK_HTML,
    plainText: TASK_TXT,
    audience: "the seats of Proof Table 003. Observers: read only",
    definition: "Task block PT003-TASK-R1. The record is that block, unchanged.",
    provenance: "Given to the seats of Proof Table 003. CC BY 4.0. Credit: Tuzi and Affiliates, The Civilisation Field.",
    fallback: `If this route fails, try ${TASK_TXT} next.`,
    notes: [
      "The record is the task block as given. It is not a summary.",
      "No answer key is on this page. No baseline results are on this page.",
      `TABLE: ${TABLE}`,
      `RULES: ${RULES_TXT}`,
    ],
  };
}

function correctionMarks(line: ProofLine, lines: ProofLine[]): string {
  const marks = lines.filter((later) => later.corrects === line.id);
  if (!marks.length) return "none";
  return marks.map((mark) => `${mark.id} (line ${String(mark.n).padStart(3, "0")})`).join(", ");
}

export function proofLabel(lines: ProofLine[], ledger: ProofLedger[]): string {
  return sheetLabel(proofSheet(lines, ledger));
}

export function proofFacts(lines: ProofLine[], ledger: ProofLedger[]): string {
  return sheetMeta(proofSheet(lines, ledger));
}

function block(name: string, value: string): string {
  const body = value.replace(/\n$/u, "");
  return [`BEGIN ${name}`, body.trim() ? body : "none", `END ${name}`].join("\n");
}

export function proofLineBlock(line: ProofLine, lines: ProofLine[]): string {
  const head = [
    `LINE ${String(line.n).padStart(3, "0")}`,
    `ID: ${line.id}`,
    `TIME: ${isoKualaLumpur(line.at)}`,
    `TYPE: ${line.line_type}`,
    `SPEAKER: ${line.speaker}`,
    line.incomplete ? "INCOMPLETE TURN" : "",
    line.seat ? `SEAT: ${line.seat}` : "",
    line.round != null ? `ROUND: ${line.round}` : "",
    line.turn != null ? `TURN: ${line.turn}` : "",
    line.item ? `ITEM: ${line.item}` : "",
    line.line_type === "turn" ? `LEDGER_VERSION_READ: ${line.ledger_version_read || "none"}` : "",
    `CARRIED_BY: ${line.carried_by}`,
    `RELAY: ${line.relay ?? "none"}`,
    `CORRECTS: ${line.corrects ?? "none"}`,
    `CORRECTION_MARK: ${correctionMarks(line, lines)}`,
  ].filter((row) => row !== "");
  if (line.line_type === "turn") {
    return [
      ...head,
      block("GOAL", line.goal),
      block("ACTION", line.action),
      block("RESULT", line.result),
      block("CHECK", line.check),
      block("STATUS CLAIM", line.status_claim),
      block("NEXT", line.next),
      "",
    ].join("\n");
  }
  return [...head, block("TEXT", line.text), ""].join("\n");
}

export function proofLedgerBlock(version: ProofLedger, current: boolean): string {
  return [
    current ? `LEDGER ${version.version} · CURRENT` : `LEDGER ${version.version}`,
    `ID: ${version.id}`,
    `N: ${version.n}`,
    `TIME: ${isoKualaLumpur(version.at)}`,
    `AS_OF: ${version.as_of}`,
    "GROUPS: Open, Closed (PROVED-LEAN / CHECKED-CODE / HAND-CHECKED), Refuted, Dead ends, Sources",
    block("OPEN", version.open),
    block("CLOSED", version.closed),
    block("REFUTED", version.refuted),
    block("DEAD ENDS", version.dead_ends),
    block("SOURCES", version.sources),
    "",
  ].join("\n");
}

export function proofRecord(lines: ProofLine[], ledger: ProofLedger[]): string {
  const wall = lines.length ? lines.map((line) => proofLineBlock(line, lines)).join("\n") : "No lines yet.";
  const books = ledger.length
    ? [...ledger].reverse().map((version, index) => proofLedgerBlock(version, index === 0)).join("\n")
    : "LEDGER: none yet";
  return [
    `HEADER: ${PROOF_HEADER}`,
    "LICENSE: CC BY 4.0. Credit: Tuzi and Affiliates, The Civilisation Field.",
    `RULES: ${RULES_TXT}`,
    `TASK_PAGE: ${TASK_TXT}`,
    "",
    PROOF_TASK.trimEnd(),
    "",
    "BEGIN WALL",
    wall.trimEnd(),
    "END WALL",
    "",
    "BEGIN LEDGER",
    books.trimEnd(),
    "END LEDGER",
  ].join("\n");
}

export function proofTranscript(lines: ProofLine[], ledger: ProofLedger[]): string {
  return sheetWrap(proofSheet(lines, ledger), proofRecord(lines, ledger));
}

export function proofRulesText(): string {
  return sheetWrap(proofRulesSheet(), PROOF_RULES.trimEnd());
}

export function proofTaskText(): string {
  return sheetWrap(proofTaskSheet(), PROOF_TASK.trimEnd());
}
