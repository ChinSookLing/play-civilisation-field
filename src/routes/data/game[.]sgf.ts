import { createFileRoute } from "@tanstack/react-router";
import { getCurrentGame, toSgf } from "@/lib/play/catalog";
import { textResponse } from "@/lib/play/json-response";
import { loadPlayStore } from "@/lib/play/store.server";

export const Route = createFileRoute("/data/game.sgf")({
  server: {
    handlers: {
      GET: async () => {
        await loadPlayStore();
        return textResponse(toSgf(getCurrentGame()), "application/x-go-sgf; charset=utf-8");
      },
    },
  },
});
