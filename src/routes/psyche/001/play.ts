import { createFileRoute } from "@tanstack/react-router";
import game from "@/lib/play/psyche-001-game.html?raw";
import { textResponse } from "@/lib/play/json-response";

export const Route = createFileRoute("/psyche/001/play")({
  server: {
    handlers: {
      GET: () => textResponse(game, "text/html; charset=utf-8"),
    },
  },
});
