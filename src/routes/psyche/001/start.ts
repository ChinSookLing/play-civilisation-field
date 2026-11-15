import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { escapeHtml, psycheStartHtml, startSeed } from "@/lib/play/psyche-001-start.server";

export const Route = createFileRoute("/psyche/001/start")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const seed = startSeed(request);
        if ("error" in seed) return textResponse(escapeHtml(seed.error), "text/html; charset=utf-8", 400);
        try {
          return textResponse(psycheStartHtml(seed.seed), "text/html; charset=utf-8");
        } catch {
          return textResponse("The turn 1 packet could not be built.\n", "text/html; charset=utf-8", 500);
        }
      },
    },
  },
});
