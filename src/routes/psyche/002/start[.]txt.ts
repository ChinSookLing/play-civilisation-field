import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { airlockStartSeed, airlockStartText } from "@/lib/play/psyche-002-start.server";

export const Route = createFileRoute("/psyche/002/start.txt")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const seed = airlockStartSeed(request);
        if ("error" in seed) return textResponse(seed.error, "text/plain; charset=utf-8", 400);
        try {
          return textResponse(airlockStartText(seed.seed, seed.lang), "text/plain; charset=utf-8");
        } catch {
          return textResponse("The turn 1 packet could not be built.\n", "text/plain; charset=utf-8", 500);
        }
      },
    },
  },
});
