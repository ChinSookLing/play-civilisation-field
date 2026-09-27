import { createFileRoute } from "@tanstack/react-router";
import { toPublicState } from "@/lib/play/catalog";
import { jsonResponse } from "@/lib/play/json-response";
import { loadCurrentGame } from "@/lib/play/store.server";

export const Route = createFileRoute("/api/games/current")({
  server: {
    handlers: {
      GET: async () => jsonResponse(toPublicState(await loadCurrentGame())),
    },
  },
});
