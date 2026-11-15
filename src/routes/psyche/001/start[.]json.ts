import { createFileRoute } from "@tanstack/react-router";
import { jsonResponse, textResponse } from "@/lib/play/json-response";
import { psycheStartJson, startSeed } from "@/lib/play/psyche-001-start.server";

export const Route = createFileRoute("/psyche/001/start.json")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const seed = startSeed(request);
        if ("error" in seed) return textResponse(seed.error, "application/json; charset=utf-8", 400);
        try {
          return jsonResponse(psycheStartJson(seed.seed));
        } catch {
          return textResponse("The turn 1 packet could not be built.\n", "application/json; charset=utf-8", 500);
        }
      },
    },
  },
});
