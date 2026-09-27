import { createFileRoute } from "@tanstack/react-router";
import { getCurrentGame, nextPlayer, submitMove, toDeskJson } from "@/lib/play/catalog";
import { authorizeCourier } from "@/lib/play/courier-key";
import { corsPreflight, jsonResponse } from "@/lib/play/json-response";
import { loadPlayStore, savePlayTable } from "@/lib/play/store.server";

export const Route = createFileRoute("/data/game.json")({
  server: {
    handlers: {
      OPTIONS: () => corsPreflight(),
      GET: async () => {
        await loadPlayStore();
        return jsonResponse(toDeskJson(getCurrentGame()));
      },
      POST: async ({ request }) => {
        const auth = authorizeCourier(request);
        if (!auth.ok) return jsonResponse({ ok: false, error: auth.error }, auth.status);
        await loadPlayStore();
        const game = getCurrentGame();
        let body: {
          coord?: string;
          talk?: string;
          display_comment?: string;
          raw?: string;
          portal?: string;
          session_id?: string;
          pause?: boolean;
          resume?: boolean;
          reason?: string;
          expected_move_number?: number;
          confirm_score?: boolean;
          dead?: string[];
        } = {};
        try {
          body = (await request.json()) as typeof body;
        } catch {
          return jsonResponse({ error: "invalid json" }, 400);
        }
        const result = submitMove(game.id, {
          coord: typeof body.coord === "string" ? body.coord : undefined,
          talk: typeof body.talk === "string" ? body.talk : undefined,
          display_comment: typeof body.display_comment === "string" ? body.display_comment : undefined,
          raw: typeof body.raw === "string" ? body.raw : undefined,
          portal: typeof body.portal === "string" ? body.portal : undefined,
          session_id: typeof body.session_id === "string" ? body.session_id : undefined,
          pause: body.pause === true,
          resume: body.resume === true,
          reason: typeof body.reason === "string" ? body.reason : undefined,
          expected_move_number:
            typeof body.expected_move_number === "number" ? body.expected_move_number : undefined,
          confirm_score: body.confirm_score === true,
          dead: Array.isArray(body.dead) ? body.dead.filter((item) => typeof item === "string") : undefined,
        });
        if (!result.ok) {
          return jsonResponse(
            {
              ok: false,
              error: result.error,
              to_move: result.game ? nextPlayer(result.game) : null,
              game: result.game ? toDeskJson(result.game) : null,
            },
            result.status,
          );
        }
        await savePlayTable(result.game.id);
        return jsonResponse({ ok: true, game: toDeskJson(result.game) });
      },
    },
  },
});
