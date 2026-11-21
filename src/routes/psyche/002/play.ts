import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { airlockPlayHtml, airlockStartQuery } from "@/lib/play/psyche-002-start.server";

export const Route = createFileRoute("/psyche/002/play")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const query = airlockStartQuery(request);
        if ("error" in query) return textResponse(query.error, "text/plain; charset=utf-8", 400);
        return textResponse(airlockPlayHtml(query), "text/html; charset=utf-8");
      },
    },
  },
});
