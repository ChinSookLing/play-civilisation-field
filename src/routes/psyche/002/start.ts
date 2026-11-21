import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { airlockStartHtml, airlockStartQuery } from "@/lib/play/psyche-002-start.server";

export const Route = createFileRoute("/psyche/002/start")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const seed = airlockStartQuery(request);
        if ("error" in seed) return textResponse(seed.error, "text/plain; charset=utf-8", 400);
        try {
          return textResponse(airlockStartHtml(seed.seed, seed.lang, seed.moves, seed.comment), "text/html; charset=utf-8");
        } catch {
          return textResponse("The turn 1 packet could not be built.\n", "text/plain; charset=utf-8", 500);
        }
      },
    },
  },
});
