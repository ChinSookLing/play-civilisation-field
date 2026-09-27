import { createFileRoute } from "@tanstack/react-router";
import { toPublicState } from "@/lib/play/catalog";
import { jsonResponse } from "@/lib/play/json-response";
import { loadGameById } from "@/lib/play/store.server";

export const Route = createFileRoute("/api/games/$gameId")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const game = await loadGameById(params.gameId);
        if (!game) return jsonResponse({ error: "not found" }, 404);
        return jsonResponse(toPublicState(game));
      },
    },
  },
});
