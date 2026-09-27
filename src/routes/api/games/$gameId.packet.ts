import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { formatTurnPacket } from "@/lib/play/reading";
import { loadGameById } from "@/lib/play/store.server";

export const Route = createFileRoute("/api/games/$gameId/packet")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const game = await loadGameById(params.gameId);
        if (!game) return textResponse("not found\n", "text/plain; charset=utf-8", 404);
        return textResponse(`${formatTurnPacket(game)}\n`, "text/plain; charset=utf-8");
      },
    },
  },
});
