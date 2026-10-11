import { getSql } from "@/lib/db";
import { authorizeCourier } from "./courier-key";
import { DINNER_ID, type DinnerLine, type DinnerLineType } from "./dinner";
import { GATHERING_TABLES, rejectGatheringLine } from "./gathering-line";

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

export { rejectGatheringLine } from "./gathering-line";

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
  const table = GATHERING_TABLES[gatheringId];
  if (!table) return { ok: false, status: 404, error: "no such table" };
  const auth = authorizeCourier(request, table.couriers);
  if (!auth.ok) return auth;
  const checked = rejectGatheringLine(gatheringId, input);
  if (!checked.ok) return checked;
  const sql = await getSql();
  const next = await sql<{ n: number }>`
    select coalesce(max(n), 0) + 1 as n from dinner_lines where dinner_id = ${gatheringId}
  `;
  const n = Number(next[0]?.n ?? 1);
  const id = `${table.prefix}-${n}`;
  const rows = await sql<Record<string, unknown>>`
    insert into dinner_lines (id, dinner_id, n, speaker, line_type, carried_by, text, relay)
    values (${id}, ${gatheringId}, ${n}, ${checked.speaker}, ${checked.lineType}, ${checked.carriedBy}, ${checked.text}, ${checked.relay})
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
