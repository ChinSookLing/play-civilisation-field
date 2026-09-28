import { createFileRoute } from "@tanstack/react-router";
import { previewScore } from "@/lib/play/catalog";
import { authorizeCourier } from "@/lib/play/courier-key";
import { corsPreflight, jsonResponse } from "@/lib/play/json-response";
import { loadGameById, loadPlayStore } from "@/lib/play/store.server";

export const Route = createFileRoute("/api/games/$gameId/score-preview")({
  server: {
    handlers: {
      OPTIONS: () => corsPreflight(),
      POST: async ({ params, request }) => {
        const auth = authorizeCourier(request);
        if (!auth.ok) return jsonResponse({ ok: false, error: auth.error }, auth.status);
        await loadPlayStore();
        const game = await loadGameById(params.gameId);
        if (!game) return jsonResponse({ ok: false, error: "not found" }, 404);
        let body: { dead?: unknown } = {};
        try {
          body = (await request.json()) as { dead?: unknown };
        } catch {
          return jsonResponse({ ok: false, error: "invalid json" }, 400);
        }
        const dead = Array.isArray(body.dead) ? body.dead.filter((item) => typeof item === "string") : [];
        const preview = previewScore(game, dead);
        if (!preview.ok) return jsonResponse({ ok: false, error: preview.error }, preview.status);
        return jsonResponse({
          ok: true,
          writes: false,
          game_id: game.id,
          session_id: preview.session_id,
          dead: preview.dead,
          rules: "Chinese scoring",
          komi: preview.komi,
          score: preview.scoreText,
          result_if_published: preview.result,
          warning: "confirm_score can be sent once. After it is accepted, the result cannot be replaced.",
        });
      },
    },
  },
});
