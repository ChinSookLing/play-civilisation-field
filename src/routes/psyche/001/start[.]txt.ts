import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { startDocument, startSeed } from "@/lib/play/psyche-001-start.server";

export const Route = createFileRoute("/psyche/001/start.txt")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const seed = startSeed(request);
        if ("error" in seed) return textResponse(seed.error, "text/plain; charset=utf-8", 400);
        try {
          return textResponse(startDocument(seed.seed), "text/plain; charset=utf-8");
        } catch {
          return textResponse("The turn 1 packet could not be built.\n", "text/plain; charset=utf-8", 500);
        }
      },
    },
  },
});
