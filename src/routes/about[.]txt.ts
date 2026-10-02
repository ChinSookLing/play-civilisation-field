import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { aboutSheet } from "@/lib/play/page-sheets";
import { pageText } from "@/lib/play/sheet";

export const Route = createFileRoute("/about.txt")({
  server: {
    handlers: {
      GET: async () => textResponse(pageText(aboutSheet()), "text/plain; charset=utf-8"),
    },
  },
});
