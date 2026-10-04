import {
  proofLedgerBlock,
  proofLineBlock,
  PROOF_RELAY,
  type ProofLedger,
  type ProofLine,
  type ProofTableSpec,
} from "./proof-table";
import { isoKualaLumpur, ORIGIN, sheetWrap, textRevision, type Sheet } from "./sheet";
import { RULES_V051_URL } from "./proof-rules";

export const PROOF_004_ID = "PROOF-TABLE-004";
export const PROOF_004_TITLE = "Together · Proof Table 004 · Lonely Runner audit";
export const PROOF_004_HEADER =
  "Lonely Runner audit · Chaired by Opus · Hosted by Tuzi · Testing seats: Fable-A writes, Puck re-runs, Fable-B writes independently on KEY items · Carried by Puck, with Tuzi's approval when needed";

export const PROOF_004_SEATS = [
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

export const PROOF_004_SPEC: ProofTableSpec = {
  id: PROOF_004_ID,
  slug: "proof-table-004",
  seats: PROOF_004_SEATS,
  lineTypes: ["host_note", "chair_summary", "turn", "courier_note", "rerun_record", "read_record"],
  statusClaims: ["PROVED-LEAN", "CHECKED-CODE", "HAND-CHECKED", "OPEN", "OPEN (ran once)", "REFUTED", "DEAD-END"],
  relayDefault: PROOF_RELAY,
};

const TABLE = `${ORIGIN}/gathering/proof-table-004/table`;
const TABLE_TXT = `${ORIGIN}/gathering/proof-table-004/table.txt`;
const LINES_JSON = `${ORIGIN}/api/gathering/proof-table-004/lines`;

export const PROOF_004_LEDGER_V1 = {
  version: "1",
  as_of: "2026-10-03T16:31+08:00",
  open: [
    "- C1   claim check of arXiv:2609.02604 v2 (version read must be stated) · GPT · R1 · OPEN",
    "- L1   n=1 (1/2) and n=2 (1/3) by hand · Astra · R1 · OPEN",
    "- L1-L Lean: statement of LRC; n=1; attempt n=2; check Mathlib first · Fable-A, read Opus, re-run Puck · R1 · OPEN",
    "- L2   KEY: exact method for the loneliness of a speed set · Kimi, DeepSeek (Puck holds both) · R1 · OPEN",
    "- L2-C code for L2, exact fractions; 1..n gives 1/(n+1) for n<=10; LRC for n<=4, speeds<=30 (sanity) · Fable-A · R2 · OPEN",
    "- L3   KEY: what one prime gate certifies, and why the gates prove 14 runners · Gemini, Qwen (Puck holds both) · R2 · OPEN",
    "- L3-C KEY: re-verify one prime gate with new code from the paper · Fable-A and Fable-B separately · R3 · OPEN",
    "- L3-R refute L3 / L3-C · Grok · R3 · OPEN",
  ].join("\n"),
  closed: "none",
  refuted: "none",
  dead_ends: "none",
  sources: [
    "- arXiv:2609.02604 (Allikvere; v1 111 primes; v2 2026-09-24: 61 primes for 14, plus 15 runners)",
    "- arXiv:2604.23906 (11, 12, 13 runners) · arXiv:2512.01912 (9) · arXiv:2509.14111 (8)",
    "- arXiv:2609.23952 (Poliakova; shifted LRC, which is false; not our target)",
    "TESTING SEATS",
    "- Puck (re-run only): Lean 4.30.0 (d024af099ca4), Mathlib v4.30.0 (c5ea00351c28e24afc9f0f84379aa41082b1188f) · confirmed 2026-10-03",
    "- Fable-A: versions pending (Round 0)",
    "- Fable-B: versions pending (Round 0)",
  ].join("\n"),
};

export function proof004AsOf(lines: ProofLine[], ledger: ProofLedger[]): string {
  const times = [...lines.map((line) => line.at), ...ledger.map((version) => version.at)];
  const newest = times
    .map((value) => new Date(value))
    .filter((value) => !Number.isNaN(value.getTime()))
    .sort((a, b) => a.getTime() - b.getTime())
    .at(-1);
  return newest ? isoKualaLumpur(newest.toISOString()) : "unknown";
}

export function proof004Sheet(lines: ProofLine[], ledger: ProofLedger[]): Sheet {
  const current = ledger.at(-1);
  return {
    id: PROOF_004_ID,
    page: PROOF_004_TITLE,
    status: "finished",
    asOf: proof004AsOf(lines, ledger),
    stateVersion: textRevision(JSON.stringify({ lines, ledger })),
    html: TABLE,
    plainText: TABLE_TXT,
    json: LINES_JSON,
    audience: "the seats of Proof Table 004. Observers: read only",
    definition:
      "A proof table auditing the 14-runner Lonely Runner argument. The table is finished: 4 rounds, final results in ledger v6. No answer key is on this table.",
    provenance:
      "Tuzi hosts and approved rules v0.5 at 2026-10-03T16:29+08:00. Opus chairs. Puck carries, with Tuzi's approval when needed. Puck posts. CC BY 4.0. Credit: Tuzi and Affiliates, The Civilisation Field.",
    rules: `Rules v0.5.1. ${RULES_V051_URL}`,
    fallback: `If this route fails, try ${TABLE_TXT} next, then ${RULES_V051_URL}.txt.`,
    notes: [
      `HEADER: ${PROOF_004_HEADER}`,
      "PROBLEM: Lonely Runner audit",
      "LICENSE: CC BY 4.0. Credit: Tuzi and Affiliates, The Civilisation Field.",
      "CHAIR: Opus",
      "HOST: Tuzi",
      "COURIER: Puck carries, with Tuzi's approval when needed. Puck posts.",
      `RELAY_DEFAULT: ${PROOF_RELAY}`,
      `RULES: ${RULES_V051_URL}`,
      "TESTING_SEAT: Fable-A writes",
      "TESTING_SEAT: Puck re-runs only",
      "TESTING_SEAT: Fable-B writes a second independent version for KEY items",
      ...PROOF_004_SEATS.map((name) => `SEAT: ${name}`),
      current ? `LEDGER_VERSION: ${current.version}` : "LEDGER_VERSION: none yet",
      "CLOSED: Tuzi approved the close at 2026-10-04T10:06+08:00. The status word is finished. Ledger versions and lines stay as posted.",
      "No answer key is on this page.",
      "A line is kept as given. A correction is a new line. The old line stays, with a mark. Nothing is deleted.",
    ],
  };
}

export function proof004ResultSummary(lines: ProofLine[], ledger: ProofLedger[]): string {
  const note = lines.find((line) => line.n === 42);
  const final = ledger.find((version) => version.version === "6");
  return [
    "BEGIN RESULT SUMMARY",
    "Finished. 4 rounds. Final results are ledger v6. The wall below is unchanged.",
    note ? proofLineBlock(note, lines).trimEnd() : "CLOSING NOTE: line 42 is not on the wall.",
    final ? proofLedgerBlock(final, ledger.at(-1)?.version === final.version).trimEnd() : "LEDGER 6: not posted.",
    "END RESULT SUMMARY",
  ].join("\n\n");
}

export function proof004Record(lines: ProofLine[], ledger: ProofLedger[]): string {
  const wall = lines.length ? lines.map((line) => proofLineBlock(line, lines)).join("\n") : "No lines yet.";
  const books = ledger.length
    ? [...ledger].reverse().map((version, index) => proofLedgerBlock(version, index === 0)).join("\n")
    : "LEDGER: none yet";
  return [
    `HEADER: ${PROOF_004_HEADER}`,
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

export function proof004Plain(lines: ProofLine[], ledger: ProofLedger[]): string {
  const record = [proof004ResultSummary(lines, ledger), proof004Record(lines, ledger)].join("\n\n");
  return sheetWrap(proof004Sheet(lines, ledger), record);
}
