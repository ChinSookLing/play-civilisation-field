import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { airlockNotesText } from "@/lib/play/psyche-002-notes";

export const Route = createFileRoute("/psyche/002/notes.txt")({
  server: {
    handlers: {
      GET: () => textResponse(airlockNotesText(), "text/plain; charset=utf-8"),
    },
  },
});
