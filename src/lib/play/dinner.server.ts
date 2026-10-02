import { getSql } from "@/lib/db";
import { BREAKFAST_ID, BREAKFAST_SEATS } from "./breakfast";
import { authorizeCourier } from "./courier-key";
import { DINNER_ID, PRACTICE_SEATS, type DinnerLine, type DinnerLineType } from "./dinner";

const TYPES = new Set<DinnerLineType>(["participant_message", "courier_note", "host_note"]);
const CARRIERS = new Set(["Puck", "Tuzi (temporary courier)"]);

const TABLES: Record<string, { seats: readonly string[]; prefix: string }> = {
  [DINNER_ID]: { seats: PRACTICE_SEATS, prefix: "dinner-001" },
  [BREAKFAST_ID]: { seats: BREAKFAST_SEATS, prefix: "breakfast-002" },
};

function iso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

function rowToLine(row: Record<string, unknown>): DinnerLine {
  return {
    id: String(row.id),
    n: Number(row.n),
    at: iso(row.at),
    speaker: String(row.speaker),
    line_type: String(row.line_type) as DinnerLineType,
    carried_by: String(row.carried_by),
    text: String(row.text),
    relay: row.relay == null ? null : String(row.relay),
    void_reason: row.void_reason == null ? null : String(row.void_reason),
    filed_as: row.filed_as == null ? null : String(row.filed_as),
  };
}

export async function listGatheringLines(gatheringId: string): Promise<DinnerLine[]> {
  const sql = await getSql();
  const rows = await sql<Record<string, unknown>>`
    select id, n, at, speaker, line_type, carried_by, text, relay, void_reason, filed_as
    from dinner_lines
    where dinner_id = ${gatheringId}
    order by n
  `;
  return rows.map(rowToLine);
}

export async function listDinnerLines(): Promise<DinnerLine[]> {
  return listGatheringLines(DINNER_ID);
}

export async function addGatheringLine(
  gatheringId: string,
  request: Request,
  input: { speaker?: string; line_type?: string; carried_by?: string; text?: string; relay?: string | null },
): Promise<{ ok: true; line: DinnerLine } | { ok: false; status: number; error: string }> {
  const table = TABLES[gatheringId];
  if (!table) return { ok: false, status: 404, error: "no such table" };
  const auth = authorizeCourier(request);
  if (!auth.ok) return auth;
  const lineType = input.line_type;
  const speaker = input.speaker?.trim() ?? "";
  const carriedBy = input.carried_by?.trim() ?? "";
  const text = input.text?.replace(/\r\n/g, "\n").trim() ?? "";
  const relay = input.relay?.trim() || null;
  if (!lineType || !TYPES.has(lineType as DinnerLineType)) {
    return { ok: false, status: 422, error: "line type must be participant_message, courier_note, or host_note" };
  }
  if (!CARRIERS.has(carriedBy)) return { ok: false, status: 422, error: "carried_by is not a courier" };
  if (!text) return { ok: false, status: 422, error: "empty words" };
  if (text.length > 4000) return { ok: false, status: 422, error: "too long" };
  if (lineType === "participant_message" && !table.seats.includes(speaker)) {
    return { ok: false, status: 422, error: "speaker is not seated" };
  }
  if (lineType === "courier_note" && speaker !== "Puck" && speaker !== "Tuzi") {
    return { ok: false, status: 422, error: "a courier note is spoken by Puck or Tuzi" };
  }
  if (lineType === "host_note" && speaker !== "Tuzi") {
    return { ok: false, status: 422, error: "a host note is spoken by Tuzi" };
  }
  const sql = await getSql();
  const next = await sql<{ n: number }>`
    select coalesce(max(n), 0) + 1 as n from dinner_lines where dinner_id = ${gatheringId}
  `;
  const n = Number(next[0]?.n ?? 1);
  const id = `${table.prefix}-${n}`;
  const rows = await sql<Record<string, unknown>>`
    insert into dinner_lines (id, dinner_id, n, speaker, line_type, carried_by, text, relay)
    values (${id}, ${gatheringId}, ${n}, ${speaker}, ${lineType}, ${carriedBy}, ${text}, ${relay})
    returning id, n, at, speaker, line_type, carried_by, text, relay, void_reason, filed_as
  `;
  return { ok: true, line: rowToLine(rows[0]) };
}

export async function addDinnerLine(
  request: Request,
  input: { speaker?: string; line_type?: string; carried_by?: string; text?: string; relay?: string | null },
): Promise<{ ok: true; line: DinnerLine } | { ok: false; status: number; error: string }> {
  return addGatheringLine(DINNER_ID, request, input);
}
