import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { psycheSheet } from "@/lib/play/page-sheets";
import { pageText } from "@/lib/play/sheet";

export const Route = createFileRoute("/psyche.txt")({
  server: {
    handlers: {
      GET: async () => textResponse(pageText(psycheSheet()), "text/plain; charset=utf-8"),
    },
  },
});
