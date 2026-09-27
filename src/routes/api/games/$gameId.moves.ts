import { createFileRoute } from "@tanstack/react-router";
import { nextPlayer, submitMove, toPublicState } from "@/lib/play/catalog";
import { authorizeCourier } from "@/lib/play/courier-key";
import { corsPreflight, jsonResponse } from "@/lib/play/json-response";
import { loadGameById, loadPlayStore, savePlayTable } from "@/lib/play/store.server";

export const Route = createFileRoute("/api/games/$gameId/moves")({
  server: {
    handlers: {
      OPTIONS: () => corsPreflight(),
      GET: async ({ params, request }) => {
        const game = await loadGameById(params.gameId);
        if (!game) return jsonResponse({ error: "not found" }, 404);
        const url = new URL(request.url);
        const since = Number(url.searchParams.get("since") ?? 0);
        const state = toPublicState(game, Number.isFinite(since) ? since : 0);
        return jsonResponse({
          game_id: state.game_id,
          status: state.status,
          to_move: state.to_move,
          move_number: state.move_number,
          moves: state.moves,
        });
      },
      POST: async ({ params, request }) => {
        const auth = authorizeCourier(request);
        if (!auth.ok) return jsonResponse({ ok: false, error: auth.error }, auth.status);
        await loadPlayStore();
        let body: {
          coord?: string;
          talk?: string;
          display_comment?: string;
          raw?: string;
          portal?: string;
          session_id?: string;
          source?: string;
          pause?: boolean;
          resume?: boolean;
          reason?: string;
          expected_move_number?: number;
          confirm_score?: boolean;
          dead?: string[];
          carried_by?: string;
          tool_record?: { jev_probabilities?: unknown };
        } = {};
        try {
          body = (await request.json()) as typeof body;
        } catch {
          return jsonResponse({ error: "invalid json" }, 400);
        }
        const result = submitMove(params.gameId, {
          coord: typeof body.coord === "string" ? body.coord : undefined,
          talk: typeof body.talk === "string" ? body.talk : undefined,
          display_comment: typeof body.display_comment === "string" ? body.display_comment : undefined,
          raw: typeof body.raw === "string" ? body.raw : undefined,
          portal: typeof body.portal === "string" ? body.portal : undefined,
          session_id: typeof body.session_id === "string" ? body.session_id : undefined,
          source: typeof body.source === "string" ? body.source : undefined,
          pause: body.pause === true,
          resume: body.resume === true,
          reason: typeof body.reason === "string" ? body.reason : undefined,
          expected_move_number:
            typeof body.expected_move_number === "number" ? body.expected_move_number : undefined,
          confirm_score: body.confirm_score === true,
          dead: Array.isArray(body.dead) ? body.dead.filter((item) => typeof item === "string") : undefined,
          carried_by: body.carried_by === "Puck" || body.carried_by === "Tuzi (temporary courier)" ? body.carried_by : undefined,
          tool_record: readJevProbabilities(body.tool_record),
        });
        if (!result.ok) {
          const current = result.game ? toPublicState(result.game).expected_move_number : null;
          return jsonResponse(
            {
              ok: false,
              error: result.error,
              receipt: `RECEIPT ${params.gameId} · REJECTED · reason: ${result.error}${result.game ? ` · current state version ${result.game.moves.length} · expected move number ${current ?? "none"}` : ""} · nothing was recorded`,
              to_move: result.game ? nextPlayer(result.game) : null,
              game: result.game ? toPublicState(result.game) : null,
            },
            result.status,
          );
        }
        await savePlayTable(result.game.id);
        const state = toPublicState(result.game);
        const last = result.game.moves.at(-1);
        const record = `${publicBase(request)}/go/${result.game.id}`;
        return jsonResponse({
          ok: true,
          receipt: last
            ? `RECEIPT ${result.game.id} · ACCEPTED · move ${last.n} · ${last.color.toUpperCase()} ${last.coord} · new state version ${state.state_version ?? result.game.moves.length} · next expected move number ${state.expected_move_number ?? "none"} · recorded at ${last.at} · record ${record}`
            : `RECEIPT ${result.game.id} · ACCEPTED · recorded at ${state.as_of} · record ${record}`,
          game: state,
        });
      },
    },
  },
});

function publicBase(request: Request): string {
  const configured = process.env.PLAY_PUBLIC_BASE_URL?.trim().replace(/\/$/, "");
  if (configured) return configured;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!host) return "https://play.civilisationfield.com";
  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  return `${proto}://${host}`;
}

function readJevProbabilities(value: { jev_probabilities?: unknown } | undefined) {
  if (!value || !Array.isArray(value.jev_probabilities)) return undefined;
  const choices = value.jev_probabilities.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const choice = "choice" in item && typeof item.choice === "string" ? item.choice.trim() : "";
    const percent = "percent" in item && typeof item.percent === "number" ? item.percent : NaN;
    if (!choice || choice.length > 16 || !Number.isFinite(percent) || percent < 0 || percent > 100) return [];
    return [{ choice, percent }];
  });
  return choices.length ? { jev_probabilities: choices.slice(0, 8) } : undefined;
}
