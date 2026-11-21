import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { airlockV2DoorText, airlockV2Query } from "@/lib/play/psyche-002-v02-start.server";

export const Route = createFileRoute("/psyche/002/v02/start.txt")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const query = airlockV2Query(request);
        if ("error" in query) return textResponse(query.error, "text/plain; charset=utf-8", 400);
        return textResponse(airlockV2DoorText(query), "text/plain; charset=utf-8");
      },
    },
  },
});
