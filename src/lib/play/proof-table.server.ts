import { getSql } from "@/lib/db";
import { authorizeCourier } from "./courier-key";
import {
  PROOF_003_SPEC,
  PROOF_CARRIERS,
  type ProofLedger,
  type ProofLine,
  type ProofLineType,
  type ProofTableSpec,
} from "./proof-table";
import { isoKualaLumpur } from "./sheet";

const RESULT_MAX = 400_000;
const FIELD_MAX = 100_000;
const NOTE_MAX = 20_000;
const CHAIR_LINES = 15;

type Fail = { ok: false; status: number; error: string };
type LineOk = { ok: true; line: ProofLine };
type LedgerOk = { ok: true; ledger: ProofLedger };

export type ProofLineInput = {
  line_type?: string;
  speaker?: string;
  carried_by?: string;
  relay?: string | null | boolean;
  text?: string;
  round?: number | string | null;
  turn?: number | string | null;
  seat?: string;
  item?: string;
  goal?: string;
  action?: string;
  result?: string;
  check?: string;
  status_claim?: string;
  next?: string;
  ledger_version_read?: string;
  incomplete?: boolean;
  corrects?: string | null;
};

export type ProofLedgerInput = {
  version?: string;
  as_of?: string;
  open?: string;
  closed?: string;
  refuted?: string;
  dead_ends?: string;
  sources?: string;
};

function iso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

function keep(value: unknown): string {
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value !== "string") return "";
  return value.replace(/\u0000/g, "").replace(/\r\n/g, "\n");
}

function versionText(value: unknown): string {
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value === "string") return value.trim();
  return "";
}

function filled(value: string): boolean {
  return value.trim().length > 0;
}

function integer(value: unknown): number | null {
  if (typeof value === "number" && Number.isInteger(value)) return value;
  if (typeof value === "string" && /^-?\d+$/.test(value.trim())) return Number(value.trim());
  return null;
}

function lineCount(text: string): number {
  const body = text.replace(/\n$/u, "");
  if (!body) return 0;
  return body.split("\n").length;
}

function tooLong(name: string, value: string, max: number): Fail | null {
  if (value.length > max) return { ok: false, status: 422, error: `${name} is too long` };
  return null;
}

function rowToLine(row: Record<string, unknown>): ProofLine {
  return {
    id: String(row.id),
    n: Number(row.n),
    at: iso(row.at),
    speaker: String(row.speaker),
    line_type: String(row.line_type) as ProofLineType,
    carried_by: String(row.carried_by),
    relay: row.relay == null ? null : String(row.relay),
    text: String(row.text ?? ""),
    round: row.round == null ? null : Number(row.round),
    turn: row.turn_n == null ? null : Number(row.turn_n),
    seat: row.seat == null ? null : String(row.seat),
    item: row.item == null ? null : String(row.item),
    goal: String(row.goal ?? ""),
    action: String(row.action ?? ""),
    result: String(row.result ?? ""),
    check: String(row.check_text ?? ""),
    status_claim: String(row.status_claim ?? ""),
    next: String(row.next_text ?? ""),
    ledger_version_read: String(row.ledger_version_read ?? ""),
    incomplete: asBool(row.incomplete),
    corrects: row.corrects == null ? null : String(row.corrects),
  };
}

function rowToLedger(row: Record<string, unknown>): ProofLedger {
  return {
    id: String(row.id),
    n: Number(row.n),
    at: iso(row.at),
    version: String(row.version),
    as_of: String(row.as_of),
    open: String(row.open_text ?? ""),
    closed: String(row.closed_text ?? ""),
    refuted: String(row.refuted_text ?? ""),
    dead_ends: String(row.dead_ends_text ?? ""),
    sources: String(row.sources_text ?? ""),
  };
}

function asBool(value: unknown): boolean {
  return value === true || value === 1 || value === "t" || value === "true";
}

function pgCode(error: unknown): string {
  const found = codeOf(error);
  if (found) return found;
  if (typeof error === "object" && error !== null && "cause" in error) return codeOf((error as { cause?: unknown }).cause);
  return "";
}

function codeOf(error: unknown): string {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code?: unknown }).code;
    if (typeof code === "string") return code;
  }
  return "";
}

function duplicate(error: unknown): boolean {
  return pgCode(error) === "23505";
}

export async function listProofLines(spec: ProofTableSpec = PROOF_003_SPEC): Promise<ProofLine[]> {
  const sql = await getSql();
  const rows = await sql<Record<string, unknown>>`
    select id, n, at, speaker, line_type, carried_by, relay, text,
      round, turn_n, seat, item, goal, action, result, check_text, status_claim, next_text,
      ledger_version_read, incomplete, corrects
    from proof_lines
    where gathering_id = ${spec.id}
    order by n
  `;
  return rows.map(rowToLine);
}

export async function listProofLedger(spec: ProofTableSpec = PROOF_003_SPEC): Promise<ProofLedger[]> {
  const sql = await getSql();
  const rows = await sql<Record<string, unknown>>`
    select id, n, at, version, as_of, open_text, closed_text, refuted_text, dead_ends_text, sources_text
    from proof_ledger
    where gathering_id = ${spec.id}
    order by n
  `;
  return rows.map(rowToLedger);
}

function relayOf(input: ProofLineInput, spec: ProofTableSpec): { relay: string | null } | Fail {
  if (input.relay === null || input.relay === false) return { relay: null };
  if (typeof input.relay === "string") {
    const value = keep(input.relay);
    const limit = tooLong("relay", value, 200);
    if (limit) return limit;
    if (!filled(value)) return { relay: spec.relayDefault };
    return { relay: value };
  }
  return { relay: spec.relayDefault };
}

export async function addProofLine(
  request: Request,
  input: ProofLineInput,
  spec: ProofTableSpec = PROOF_003_SPEC,
): Promise<LineOk | Fail> {
  const auth = authorizeCourier(request, spec.couriers ?? ["Puck"]);
  if (!auth.ok) return auth;
  const lineType = input.line_type;
  if (!lineType || !spec.lineTypes.includes(lineType as ProofLineType)) {
    return { ok: false, status: 422, error: `line_type must be ${spec.lineTypes.join(", ")}` };
  }
  const carriedBy = input.carried_by?.trim() ?? "";
  const allowedCarriers: readonly string[] = auth.courier === "Hesper" ? ["Hesper"] : PROOF_CARRIERS;
  if (!allowedCarriers.includes(carriedBy)) {
    return {
      ok: false,
      status: 422,
      error:
        auth.courier === "Hesper"
          ? "carried_by must be Hesper"
          : "carried_by must be Puck or Tuzi (temporary courier)",
    };
  }
  const relay = relayOf(input, spec);
  if ("error" in relay) return relay;
  const corrects = input.corrects == null || input.corrects === "" ? null : input.corrects.trim();
  if (corrects && !new RegExp(`^${spec.slug}-\\d+$`).test(corrects)) {
    return { ok: false, status: 422, error: "corrects must be an existing line id" };
  }
  const round = input.round == null || input.round === "" ? null : integer(input.round);
  if (input.round != null && input.round !== "" && (round == null || round < 0 || round > 10000)) {
    return { ok: false, status: 422, error: "round must be a whole number from 0" };
  }

  let speaker = input.speaker?.trim() ?? "";
  let text = keep(input.text);
  let seat: string | null = null;
  let turn: number | null = null;
  let item: string | null = null;
  let goal = "";
  let action = "";
  let result = "";
  let check = "";
  let statusClaim = "";
  let next = "";
  let ledgerVersionRead = "";
  let incomplete = false;

  if (lineType === "host_note") {
    if (speaker && speaker !== "Tuzi") return { ok: false, status: 422, error: "a host note is spoken by Tuzi" };
    speaker = "Tuzi";
    const limit = tooLong("text", text, NOTE_MAX);
    if (limit) return limit;
    if (!filled(text)) return { ok: false, status: 422, error: "empty words" };
  } else if (lineType === "courier_note") {
    if (speaker && speaker !== auth.courier) {
      return { ok: false, status: 422, error: `a courier note is spoken by ${auth.courier}` };
    }
    speaker = auth.courier;
    const limit = tooLong("text", text, NOTE_MAX);
    if (limit) return limit;
    if (!filled(text)) return { ok: false, status: 422, error: "empty words" };
  } else if (lineType === "chair_summary") {
    if (speaker && speaker !== "Opus") return { ok: false, status: 422, error: "a chair summary is spoken by Opus" };
    speaker = "Opus";
    const limit = tooLong("text", text, NOTE_MAX);
    if (limit) return limit;
    if (!filled(text)) return { ok: false, status: 422, error: "empty words" };
    if (lineCount(text) > CHAIR_LINES) {
      return { ok: false, status: 422, error: "chair_summary is 15 lines max" };
    }
  } else if (lineType === "chair_note") {
    if (speaker && speaker !== "Opus") return { ok: false, status: 422, error: "a chair note is spoken by Opus" };
    speaker = "Opus";
    const limit = tooLong("text", text, NOTE_MAX);
    if (limit) return limit;
    if (!filled(text)) return { ok: false, status: 422, error: "empty words" };
  } else if (lineType === "rerun_record" || lineType === "read_record") {
    speaker = input.speaker?.trim() ?? "";
    if (!spec.seats.includes(speaker)) return { ok: false, status: 422, error: "seat is not at this table" };
    const limit = tooLong("text", text, lineType === "rerun_record" ? RESULT_MAX : NOTE_MAX);
    if (limit) return limit;
    if (!filled(text)) return { ok: false, status: 422, error: "empty words" };
    if (lineType === "read_record") {
      const one = text.trim();
      const marks = ["READ_BY:", "FILE:", "SHA256:", "AS_OF:", "VERDICT:"];
      if (one.includes("\n") || marks.some((mark) => !one.includes(mark))) {
        return { ok: false, status: 422, error: "read_record is one line: READ_BY / FILE / SHA256 / AS_OF / VERDICT" };
      }
      text = one;
    }
  } else {
    if (input.incomplete != null && typeof input.incomplete !== "boolean") {
      return { ok: false, status: 422, error: "incomplete must be true or false" };
    }
    incomplete = input.incomplete === true;
    seat = input.seat?.trim() ?? "";
    if (!spec.seats.includes(seat)) {
      return { ok: false, status: 422, error: "seat is not at this table" };
    }
    if (speaker && speaker !== seat) return { ok: false, status: 422, error: "speaker must match seat" };
    speaker = seat;
    turn = input.turn == null || input.turn === "" ? null : integer(input.turn);
    if (turn == null || turn < 1 || turn > 10000) {
      return { ok: false, status: 422, error: "turn must be a whole number from 1" };
    }
    if (round == null) return { ok: false, status: 422, error: "round is required" };
    item = keep(input.item);
    goal = keep(input.goal);
    action = keep(input.action);
    result = keep(input.result);
    check = keep(input.check);
    statusClaim = keep(input.status_claim).trim();
    next = keep(input.next);
    ledgerVersionRead = keep(input.ledger_version_read);
    for (const [name, value, max] of [
      ["item", item, 200],
      ["goal", goal, FIELD_MAX],
      ["action", action, FIELD_MAX],
      ["result", result, RESULT_MAX],
      ["check", check, FIELD_MAX],
      ["next", next, FIELD_MAX],
      ["ledger_version_read", ledgerVersionRead, 200],
    ] as const) {
      const limit = tooLong(name, value, max);
      if (limit) return limit;
    }
    if (!incomplete) {
      const missing = [
        ["item", item],
        ["goal", goal],
        ["action", action],
        ["result", result],
        ["check", check],
        ["status_claim", statusClaim],
        ["next", next],
        ["ledger_version_read", ledgerVersionRead],
      ].filter(([, value]) => !filled(value));
      if (missing.length) {
        return {
          ok: false,
          status: 422,
          error: `missing ${missing.map(([name]) => name).join(", ")}. Send incomplete true to keep an INCOMPLETE TURN`,
        };
      }
    }
    if (filled(statusClaim) && !spec.statusClaims.includes(statusClaim)) {
      return {
        ok: false,
        status: 422,
        error: `status_claim must be ${spec.statusClaims.join(", ")}`,
      };
    }
    text = "";
  }

  const sql = await getSql();
  if (corrects) {
    const found = await sql<{ id: string }>`
      select id from proof_lines where gathering_id = ${spec.id} and id = ${corrects}
    `;
    if (!found.length) return { ok: false, status: 422, error: "corrects must be an existing line id" };
  }
  const nextRow = await sql<{ n: number }>`
    select coalesce(max(n), 0) + 1 as n from proof_lines where gathering_id = ${spec.id}
  `;
  const n = Number(nextRow[0]?.n ?? 1);
  const id = `${spec.slug}-${n}`;
  let rows: Record<string, unknown>[];
  try {
    rows = await sql<Record<string, unknown>>`
      insert into proof_lines (
        id, gathering_id, n, speaker, line_type, carried_by, relay, text,
        round, turn_n, seat, item, goal, action, result, check_text, status_claim, next_text,
        ledger_version_read, incomplete, corrects
      ) values (
        ${id}, ${spec.id}, ${n}, ${speaker}, ${lineType}, ${carriedBy}, ${relay.relay}, ${text},
        ${round}, ${turn}, ${seat}, ${item}, ${goal}, ${action}, ${result}, ${check}, ${statusClaim}, ${next},
        ${ledgerVersionRead}, ${incomplete}, ${corrects}
      )
      returning id, n, at, speaker, line_type, carried_by, relay, text,
        round, turn_n, seat, item, goal, action, result, check_text, status_claim, next_text,
        ledger_version_read, incomplete, corrects
    `;
  } catch (error) {
    if (duplicate(error)) return { ok: false, status: 409, error: "post again" };
    throw error;
  }
  const line = rows[0] ? rowToLine(rows[0]) : null;
  if (!line) return { ok: false, status: 500, error: "not kept" };
  return { ok: true, line };
}

export async function addProofLedger(
  request: Request,
  input: ProofLedgerInput,
  spec: ProofTableSpec = PROOF_003_SPEC,
): Promise<LedgerOk | Fail> {
  const auth = authorizeCourier(request, spec.couriers ?? ["Puck"]);
  if (!auth.ok) return auth;
  const version = versionText(input.version);
  if (!version || /[\r\n]/.test(version) || version.length > 80) {
    return { ok: false, status: 422, error: "version is required" };
  }
  const open = keep(input.open);
  const closed = keep(input.closed);
  const refuted = keep(input.refuted);
  const deadEnds = keep(input.dead_ends);
  const sources = keep(input.sources);
  for (const [name, value] of [
    ["open", open],
    ["closed", closed],
    ["refuted", refuted],
    ["dead_ends", deadEnds],
    ["sources", sources],
  ] as const) {
    const limit = tooLong(name, value, RESULT_MAX);
    if (limit) return limit;
  }
  let asOf = keep(input.as_of).trim();
  if (asOf.length > 80) return { ok: false, status: 422, error: "as_of is too long" };
  if (!asOf) asOf = isoKualaLumpur(new Date().toISOString());
  const sql = await getSql();
  const nextRow = await sql<{ n: number }>`
    select coalesce(max(n), 0) + 1 as n from proof_ledger where gathering_id = ${spec.id}
  `;
  const n = Number(nextRow[0]?.n ?? 1);
  const id = `${spec.slug}-ledger-${n}`;
  let rows: Record<string, unknown>[];
  try {
    rows = await sql<Record<string, unknown>>`
      insert into proof_ledger (
        id, gathering_id, n, version, as_of, open_text, closed_text, refuted_text, dead_ends_text, sources_text
      ) values (
        ${id}, ${spec.id}, ${n}, ${version}, ${asOf}, ${open}, ${closed}, ${refuted}, ${deadEnds}, ${sources}
      )
      returning id, n, at, version, as_of, open_text, closed_text, refuted_text, dead_ends_text, sources_text
    `;
  } catch (error) {
    if (duplicate(error)) return { ok: false, status: 409, error: "that ledger version is already kept" };
    if (pgCode(error) === "22021" || pgCode(error) === "22P05") {
      return { ok: false, status: 422, error: "a field contains a character this table cannot store" };
    }
    const message = error instanceof Error ? error.message.split("\n")[0] : "";
    const brief = message.replace(/\s+/g, " ").slice(0, 180);
    return { ok: false, status: 500, error: brief ? `not kept: ${brief}` : "not kept" };
  }
  const ledger = rows[0] ? rowToLedger(rows[0]) : null;
  if (!ledger) return { ok: false, status: 500, error: "not kept" };
  return { ok: true, ledger };
}

export async function ensureOpeningLedger(spec: ProofTableSpec, input: ProofLedgerInput): Promise<void> {
  const existing = await listProofLedger(spec);
  if (existing.length) return;
  const version = versionText(input.version);
  const asOf = keep(input.as_of).trim();
  const sql = await getSql();
  try {
    await sql`
      insert into proof_ledger (
        id, gathering_id, n, version, as_of, open_text, closed_text, refuted_text, dead_ends_text, sources_text
      ) values (
        ${`${spec.slug}-ledger-1`}, ${spec.id}, ${1}, ${version}, ${asOf},
        ${keep(input.open)}, ${keep(input.closed)}, ${keep(input.refuted)}, ${keep(input.dead_ends)}, ${keep(input.sources)}
      )
      on conflict (gathering_id, version) do nothing
    `;
  } catch (error) {
    if (duplicate(error)) return;
    throw error;
  }
}
