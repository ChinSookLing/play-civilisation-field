import { createFileRoute } from "@tanstack/react-router";
import { jsonResponse, textResponse } from "@/lib/play/json-response";
import { airlockStartJson, airlockStartSeed } from "@/lib/play/psyche-002-start.server";

export const Route = createFileRoute("/psyche/002/start.json")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const seed = airlockStartSeed(request);
        if ("error" in seed) return textResponse(seed.error, "application/json; charset=utf-8", 400);
        try {
          return jsonResponse(airlockStartJson(seed.seed, seed.lang));
        } catch {
          return textResponse("The turn 1 packet could not be built.\n", "application/json; charset=utf-8", 500);
        }
      },
    },
  },
});
