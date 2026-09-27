import { createFileRoute } from "@tanstack/react-router";
import { jsonResponse } from "@/lib/play/json-response";
import { gamesIndexJson } from "@/lib/play/reading";
import { loadPlayStore } from "@/lib/play/store.server";

export const Route = createFileRoute("/games/index.json")({
  server: {
    handlers: {
      GET: async () => {
        await loadPlayStore();
        return jsonResponse(gamesIndexJson());
      },
    },
  },
});
