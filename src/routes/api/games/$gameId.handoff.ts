import { createFileRoute } from "@tanstack/react-router";
import { formatCourierHandoff } from "@/lib/play/catalog";
import { jsonResponse, textResponse } from "@/lib/play/json-response";
import { loadGameById } from "@/lib/play/store.server";

export const Route = createFileRoute("/api/games/$gameId/handoff")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const game = await loadGameById(params.gameId);
        if (!game) return jsonResponse({ error: "not found" }, 404);
        return textResponse(`${formatCourierHandoff(game)}\n`, "text/plain; charset=utf-8");
      },
    },
  },
});
