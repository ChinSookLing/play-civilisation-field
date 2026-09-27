// @ts-nocheck
/**
 * Copy finished Play games from the old public table into play_tables.
 * Run: DATABASE_URL='...' node scripts/import-play-history.mjs
 * The URL stays in the environment. Do not print it.
 */
import pg from "pg";

export const OLD_ORIGIN = "https://play.civilisationfield.com";
export const GAME_IDS = ["GO-TEST-001", "GO-001", "GO-002", "GO-003", "GO-004"];
const EXPECTED_MOVES = {
  "GO-TEST-001": 71,
  "GO-001": 47,
  "GO-002": 30,
  "GO-003": 26,
  "GO-004": 0,
};

export function overlayFromPublic(body) {
  const ref = body.reference_score?.value;
  const result = body.result ? (ref ? `${body.result} Reference: ${ref}` : body.result) : null;
  const moves = (body.moves ?? []).map((move) => ({
    n: move.n,
    color: move.color,
    player: move.player,
    coord: move.coord,
    at: move.at,
    ...(move.talk ? { talk: move.talk } : {}),
    ...(move.raw_response ? { raw: move.raw_response } : {}),
    ...(move.portal ? { portal: move.portal } : {}),
    ...(move.session_id ? { session_id: move.session_id } : {}),
    ...(move.source ? { source: move.source } : {}),
    ...(move.coord_source ? { coord_source: move.coord_source } : {}),
    ...(move.carried_by ? { carried_by: move.carried_by } : {}),
  }));
  const notes = (body.tuzi_notes ?? []).map((note) => ({
    id: note.id,
    afterMove: note.after_move,
    at: note.at,
    text: note.text,
    carryTo: note.carry_to ?? null,
    ...(note.by ? { by: note.by } : {}),
  }));
  return {
    moves,
    status: body.status,
    result,
    dispatch: body.dispatch ?? "",
    updatedAt: body.updated_at,
    startedAt: body.started_at ?? null,
    notes,
    sessions: body.sessions ?? {},
  };
}

export function stableView(body) {
  return {
    status: body.status ?? null,
    result: body.result ?? null,
    end_reason: body.end_reason ?? null,
    reference: body.reference_score?.value ?? null,
    dispatch: body.dispatch ?? "",
    move_count: (body.moves ?? []).length,
    board: body.board ?? "",
    sessions: body.sessions ?? {},
    moves: (body.moves ?? []).map((move) => ({
      n: move.n,
      player: move.player,
      color: move.color,
      coord: move.coord,
      at: move.at,
      raw: move.raw_response ?? null,
      comment: move.display_comment ?? null,
      source: move.source ?? null,
      coord_source: move.coord_source ?? null,
      evidence: move.coordinate_evidence ?? null,
      note: move.coordinate_note ?? null,
    })),
    notes: (body.tuzi_notes ?? []).map((note) => ({
      id: note.id,
      after: note.after_move,
      by: note.by ?? null,
      text: note.text,
    })),
  };
}

export function diffViews(before, after) {
  const problems = [];
  const walk = (left, right, path) => {
    if (problems.length > 40) return;
    if (JSON.stringify(left) === JSON.stringify(right)) return;
    if (left && right && typeof left === "object" && typeof right === "object" && !Array.isArray(left)) {
      for (const key of new Set([...Object.keys(left), ...Object.keys(right)])) {
        walk(left[key], right[key], `${path}.${key}`);
      }
      return;
    }
    problems.push(path || "root");
  };
  walk(before, after, "");
  return problems;
}

export async function fetchOldGame(id) {
  const response = await fetch(`${OLD_ORIGIN}/api/games/${id}`, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`${id} old table HTTP ${response.status}`);
  const body = await response.json();
  const expected = EXPECTED_MOVES[id];
  if ((body.moves ?? []).length !== expected) {
    throw new Error(`${id} has ${(body.moves ?? []).length} moves, expected ${expected}`);
  }
  return body;
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (!databaseUrl) {
    console.error("DATABASE_URL is not set. Set it in the shell. Do not paste it into chat.");
    process.exit(1);
  }
  const client = new pg.Client({ connectionString: databaseUrl });
  await client.connect();
  try {
    for (const id of GAME_IDS) {
      const existing = await client.query("select payload from play_tables where id = $1", [id]);
      const stored = existing.rows[0] ? JSON.parse(existing.rows[0].payload) : null;
      if (!stored || stored.status !== "finished" || (stored.moves ?? []).length > 0) {
        console.log(`refused ${id}: not an empty finished record`);
        continue;
      }
      const body = await fetchOldGame(id);
      const payload = overlayFromPublic(body);
      await client.query(
        `insert into play_tables (id, payload, updated_at)
         values ($1, $2, now())
         on conflict (id) do update set payload = excluded.payload, updated_at = now()`,
        [id, JSON.stringify(payload)],
      );
      console.log(`imported ${id} ${body.status} moves ${payload.moves.length}`);
    }
  } finally {
    await client.end();
  }
}

if (import.meta.url === new URL(process.argv[1], "file:").href || process.argv[1]?.endsWith("import-play-history.mjs")) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
