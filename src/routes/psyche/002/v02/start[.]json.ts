import { createFileRoute } from "@tanstack/react-router";
import { jsonResponse, textResponse } from "@/lib/play/json-response";
import { airlockV2Json, airlockV2Query } from "@/lib/play/psyche-002-v02-start.server";

export const Route = createFileRoute("/psyche/002/v02/start.json")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const query = airlockV2Query(request);
        if ("error" in query) return textResponse(query.error, "application/json; charset=utf-8", 400);
        return jsonResponse(airlockV2Json(query));
      },
    },
  },
});
