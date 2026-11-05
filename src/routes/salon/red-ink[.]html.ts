import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon011StaticHtml } from "@/lib/play/salon-011";

export const Route = createFileRoute("/salon/red-ink.html")({
  server: {
    handlers: {
      GET: () => textResponse(salon011StaticHtml(), "text/html; charset=utf-8"),
    },
  },
});
