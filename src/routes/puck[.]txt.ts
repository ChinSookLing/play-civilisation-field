import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { puckSheet } from "@/lib/play/page-sheets";
import { pageText } from "@/lib/play/sheet";

export const Route = createFileRoute("/puck.txt")({
  server: {
    handlers: {
      GET: async () => textResponse(pageText(puckSheet()), "text/plain; charset=utf-8"),
    },
  },
});
