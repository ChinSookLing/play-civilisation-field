import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { airlockNotesHtml } from "@/lib/play/psyche-002-notes";

export const Route = createFileRoute("/psyche/002/notes")({
  server: {
    handlers: {
      GET: () => textResponse(airlockNotesHtml(), "text/html; charset=utf-8"),
    },
  },
});
