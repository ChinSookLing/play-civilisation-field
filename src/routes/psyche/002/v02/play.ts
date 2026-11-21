import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { airlockV2PlayHtml, airlockV2Query } from "@/lib/play/psyche-002-v02-start.server";

export const Route = createFileRoute("/psyche/002/v02/play")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const query = airlockV2Query(request);
        if ("error" in query) return textResponse(query.error, "text/plain; charset=utf-8", 400);
        return textResponse(airlockV2PlayHtml(query), "text/html; charset=utf-8");
      },
    },
  },
});
