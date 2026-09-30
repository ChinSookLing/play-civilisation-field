import { createFileRoute } from "@tanstack/react-router";
import { formatGameSlice } from "@/lib/play/catalog";
import { jsonResponse, textResponse } from "@/lib/play/json-response";
import { loadGameById } from "@/lib/play/store.server";

export const Route = createFileRoute("/api/games/$gameId/text")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const game = await loadGameById(params.gameId);
        if (!game) return jsonResponse({ error: "not found" }, 404);
        const url = new URL(request.url);
        const from = Number(url.searchParams.get("from") ?? "1");
        const to = Number(url.searchParams.get("to") ?? String((Number.isFinite(from) ? from : 1) + 49));
        return textResponse(`${formatGameSlice(game, from, to)}\n`, "text/plain; charset=utf-8");
      },
    },
  },
});
