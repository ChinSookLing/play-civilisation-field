import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { psyche002PageHtml } from "@/lib/play/psyche-002-notes";

export const Route = createFileRoute("/psyche/002")({
  server: {
    handlers: {
      GET: () => textResponse(psyche002PageHtml(), "text/html; charset=utf-8"),
    },
  },
});
