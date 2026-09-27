import { createFileRoute } from "@tanstack/react-router";
import { appendNote, toPublicState } from "@/lib/play/catalog";
import { authorizeCourier } from "@/lib/play/courier-key";
import { corsPreflight, jsonResponse } from "@/lib/play/json-response";
import { loadPlayStore, savePlayTable } from "@/lib/play/store.server";

export const Route = createFileRoute("/api/games/$gameId/notes")({
  server: {
    handlers: {
      OPTIONS: () => corsPreflight(),
      POST: async ({ params, request }) => {
        const auth = authorizeCourier(request);
        if (!auth.ok) return jsonResponse({ ok: false, error: auth.error }, auth.status);
        await loadPlayStore();
        let body: { text?: string; by?: string } = {};
        try {
          body = (await request.json()) as { text?: string; by?: string };
        } catch {
          return jsonResponse({ error: "invalid json" }, 400);
        }
        const result = appendNote(params.gameId, {
          text: typeof body.text === "string" ? body.text : undefined,
          by: typeof body.by === "string" ? body.by : undefined,
        });
        if (!result.ok) {
          return jsonResponse(
            { ok: false, error: result.error, game: result.game ? toPublicState(result.game) : null },
            result.status,
          );
        }
        await savePlayTable(result.game.id);
        return jsonResponse({ ok: true, game: toPublicState(result.game) });
      },
    },
  },
});
