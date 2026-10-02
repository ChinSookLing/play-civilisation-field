import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { forAiSheet } from "@/lib/play/page-sheets";
import { pageText } from "@/lib/play/sheet";

export const Route = createFileRoute("/for-ai.txt")({
  server: {
    handlers: {
      GET: async () => textResponse(pageText(forAiSheet()), "text/plain; charset=utf-8"),
    },
  },
});
