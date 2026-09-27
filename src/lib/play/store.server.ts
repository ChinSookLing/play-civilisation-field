import { getSql } from "@/lib/db";
import { getGame, getCurrentGame } from "./catalog";
import { setOverlay } from "./games";
import type { PlayGame } from "./types";

type OverlayPatch = Partial<
  Pick<PlayGame, "moves" | "status" | "result" | "dispatch" | "updatedAt" | "startedAt" | "notes" | "sessions">
>;

function parseOverlay(raw: string): OverlayPatch | null {
  try {
    const value = JSON.parse(raw) as unknown;
    if (!value || typeof value !== "object") return null;
    const o = value as Record<string, unknown>;
    const patch: OverlayPatch = {};
    if (Array.isArray(o.moves)) patch.moves = o.moves as PlayGame["moves"];
    if (typeof o.status === "string") patch.status = o.status as PlayGame["status"];
    if (o.result === null || typeof o.result === "string") patch.result = o.result as string | null;
    if (typeof o.dispatch === "string") patch.dispatch = o.dispatch;
    if (typeof o.updatedAt === "string") patch.updatedAt = o.updatedAt;
    if (typeof o.startedAt === "string" || o.startedAt === null) patch.startedAt = o.startedAt as string | null;
    if (Array.isArray(o.notes)) patch.notes = o.notes as PlayGame["notes"];
    if (o.sessions && typeof o.sessions === "object") {
      patch.sessions = o.sessions as PlayGame["sessions"];
    }
    return patch;
  } catch {
    return null;
  }
}

export async function loadPlayStore(): Promise<void> {
  const sql = await getSql();
  const rows = await sql<{ id: string; payload: string }>`select id, payload from play_tables`;
  for (const row of rows) {
    const patch = parseOverlay(row.payload);
    if (patch) setOverlay(row.id, patch);
  }
}

export async function savePlayTable(id: string): Promise<void> {
  const game = getGame(id);
  if (!game || (game.kind !== "TEST" && game.kind !== "FIELD" && game.kind !== "PRACTICE")) return;
  const patch: OverlayPatch = {
    moves: game.moves,
    status: game.status,
    result: game.result,
    dispatch: game.dispatch,
    updatedAt: game.updatedAt,
    startedAt: game.startedAt,
    notes: game.notes,
    sessions: game.sessions,
  };
  setOverlay(id, patch);
  const sql = await getSql();
  await sql`
    insert into play_tables (id, payload, updated_at)
    values (${id}, ${JSON.stringify(patch)}, now())
    on conflict (id) do update set
      payload = excluded.payload,
      updated_at = now()
  `;
}

export async function loadCurrentGame(): Promise<PlayGame> {
  await loadPlayStore();
  return getCurrentGame();
}

export async function loadGameById(id: string): Promise<PlayGame | undefined> {
  await loadPlayStore();
  return getGame(id);
}
