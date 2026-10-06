import {
  proofLedgerBlock,
  proofLineBlock,
  type ProofLedger,
  type ProofLine,
  type ProofTableSpec,
} from "./proof-table";
import { isoKualaLumpur, ORIGIN, sheetWrap, textRevision, type Sheet } from "./sheet";
import { RULES_V051_URL } from "./proof-rules";

export const PROOF_006_ID = "PROOF-TABLE-006";
export const PROOF_006_TITLE =
  "Together · Proof Table 006 · 孤圈 · Lonely Circle (one ticked speed picture)";
export const PROOF_006_HEADER =
  "孤圈 · Lonely Circle · One ticked speed picture on one shared t · Not every speed tuple · Hosted by Tuzi · Picture rules by Qwen · Checked by Astra · Built by Bill · Words passed by Hesper · Rules v0.5.1";
export const PROOF_006_RELAY = "passed by Hesper, with Tuzi's approval when needed";

export const PROOF_006_SEATS = ["Tuzi", "Hesper", "Qwen", "Astra", "Bill"] as const;

export const PROOF_006_SPEC: ProofTableSpec = {
  id: PROOF_006_ID,
  slug: "proof-table-006",
  seats: PROOF_006_SEATS,
  lineTypes: ["host_note", "turn", "courier_note", "rerun_record", "read_record"],
  statusClaims: [
    "PROVED-LEAN",
    "CHECKED-CODE",
    "HAND-CHECKED",
    "OPEN",
    "OPEN (ran once)",
    "REFUTED",
    "DEAD-END",
  ],
  relayDefault: PROOF_006_RELAY,
  courier: "Hesper",
};

const TABLE = `${ORIGIN}/gathering/proof-table-006/table`;
const TABLE_TXT = `${ORIGIN}/gathering/proof-table-006/table.txt`;
const LINES_JSON = `${ORIGIN}/api/gathering/proof-table-006/lines`;

export function proof006AsOf(lines: ProofLine[], ledger: ProofLedger[]): string {
  const times = [...lines.map((line) => line.at), ...ledger.map((version) => version.at)];
  const newest = times
    .map((value) => new Date(value))
    .filter((value) => !Number.isNaN(value.getTime()))
    .sort((a, b) => a.getTime() - b.getTime())
    .at(-1);
  return newest ? isoKualaLumpur(newest.toISOString()) : "unknown";
}

export function proof006Sheet(lines: ProofLine[], ledger: ProofLedger[]): Sheet {
  const current = ledger.at(-1);
  const opened = lines.length > 0;
  return {
    id: PROOF_006_ID,
    page: PROOF_006_TITLE,
    status: opened ? "active" : "prepared",
    asOf: proof006AsOf(lines, ledger),
    asOfMeans: opened
      ? "time of the newest posted line or ledger entry, in +08:00."
      : "No line is posted yet, so there is no record time.",
    stateVersion: textRevision(JSON.stringify({ lines, ledger })),
    html: TABLE,
    plainText: TABLE_TXT,
    json: LINES_JSON,
    completeness: opened ? undefined : "partial — do not act",
    audience: "the seats of Proof Table 006. Observers: read only",
    definition:
      "One circle. The speeds that are ticked move together on one shared t. This table records that one picture. It does not prove every speed tuple. That work stays on Proof Table 005. Prepared until the opening line is posted. Rules v0.5.1. No answer key is on this table.",
    provenance:
      "Tuzi hosts. Qwen locks the picture rules. Astra checks the picture is the same math, and does not import prime gates. Bill builds. Hesper passes the words, with Tuzi's approval when needed. CC BY 4.0. Credit: Tuzi and Affiliates, The Civilisation Field.",
    rules: `Rules v0.5.1. ${RULES_V051_URL}`,
    fallback: `If this route fails, try ${TABLE_TXT} next, then ${RULES_V051_URL}.txt.`,
    notes: [
      `HEADER: ${PROOF_006_HEADER}`,
      "FORMAT: one ticked speed picture. Not an audit, and not a proof of every speed tuple.",
      "PROBLEM: 孤圈 · Lonely Circle (one ticked speed picture, one shared t)",
      "LICENSE: CC BY 4.0. Credit: Tuzi and Affiliates, The Civilisation Field.",
      "HOST: Tuzi.",
      "PICTURE: Qwen locks the picture rules.",
      "CHECK: Astra checks the picture is the same math, and does not import prime gates.",
      "BUILD: Bill.",
      "COURIER: Hesper speaks a courier note. carried_by stays Puck, or Tuzi (temporary courier). Do not write Hesper in carried_by.",
      `RELAY_DEFAULT: ${PROOF_006_RELAY}`,
      `RULES: ${RULES_V051_URL}`,
      "PICTURE_URL: https://chinsookling.github.io/geogarden/lonely-circle.html",
      "The circle is the picture. It is not an answer key.",
      "NOT THIS TABLE: every speed tuple. That remains Proof Table 005.",
      ...PROOF_006_SEATS.map((name) => `SEAT: ${name}`),
      current ? `LEDGER_VERSION: ${current.version}` : "LEDGER_VERSION: none yet",
      opened ? "The opening line is posted." : "No lines yet. The opening line is not posted.",
      "No answer key is on this page.",
      "A line is kept as given. A correction is a new line. The old line stays, with a mark. Nothing is deleted.",
    ],
  };
}

export function proof006Record(lines: ProofLine[], ledger: ProofLedger[]): string {
  const wall = lines.length
    ? lines.map((line) => proofLineBlock(line, lines)).join("\n")
    : "No lines yet.";
  const books = ledger.length
    ? [...ledger]
        .reverse()
        .map((version, index) => proofLedgerBlock(version, index === 0))
        .join("\n")
    : "LEDGER: none yet";
  return [
    `HEADER: ${PROOF_006_HEADER}`,
    "LICENSE: CC BY 4.0. Credit: Tuzi and Affiliates, The Civilisation Field.",
    `RULES: ${RULES_V051_URL}`,
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

export function proof006Plain(lines: ProofLine[], ledger: ProofLedger[]): string {
  return sheetWrap(proof006Sheet(lines, ledger), proof006Record(lines, ledger));
}
