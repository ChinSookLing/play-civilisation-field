import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { gamesIndexText } from "@/lib/play/reading";
import { loadPlayStore } from "@/lib/play/store.server";

export const Route = createFileRoute("/games.txt")({
  server: {
    handlers: {
      GET: async () => {
        await loadPlayStore();
        return textResponse(gamesIndexText(), "text/plain; charset=utf-8");
      },
    },
  },
});
