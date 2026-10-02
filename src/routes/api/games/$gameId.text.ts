import { createFileRoute } from "@tanstack/react-router";
import { formatGameSlice, formatGameVolume, formatGameVolumeIndex, gameVolumeCount } from "@/lib/play/catalog";
import { jsonResponse, textResponse } from "@/lib/play/json-response";
import { loadGameById } from "@/lib/play/store.server";

export const Route = createFileRoute("/api/games/$gameId/text")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const game = await loadGameById(params.gameId);
        if (!game) return jsonResponse({ error: "not found" }, 404);
        const url = new URL(request.url);
        const volume = Number(url.searchParams.get("volume") ?? "");
        if (Number.isInteger(volume) && volume >= 1 && volume <= gameVolumeCount(game)) {
          return textResponse(formatGameVolume(game, volume), "text/plain; charset=utf-8");
        }
        if (url.searchParams.has("from")) {
          const from = Number(url.searchParams.get("from") ?? "1");
          const to = Number(url.searchParams.get("to") ?? String((Number.isFinite(from) ? from : 1) + 49));
          return textResponse(`${formatGameSlice(game, from, to)}\n`, "text/plain; charset=utf-8");
        }
        return textResponse(formatGameVolumeIndex(game), "text/plain; charset=utf-8");
      },
    },
  },
});
