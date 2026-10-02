import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { homeSheet } from "@/lib/play/page-sheets";
import { pageText } from "@/lib/play/sheet";

export const Route = createFileRoute("/home.txt")({
  server: {
    handlers: {
      GET: async () => textResponse(pageText(homeSheet()), "text/plain; charset=utf-8"),
    },
  },
});
