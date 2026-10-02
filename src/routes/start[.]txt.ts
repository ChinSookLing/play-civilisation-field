import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { startSheet } from "@/lib/play/page-sheets";
import { pageText } from "@/lib/play/sheet";

export const Route = createFileRoute("/start.txt")({
  server: {
    handlers: {
      GET: async () => textResponse(pageText(startSheet()), "text/plain; charset=utf-8"),
    },
  },
});
