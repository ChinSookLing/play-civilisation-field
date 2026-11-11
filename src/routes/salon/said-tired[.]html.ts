import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon013StaticHtml } from "@/lib/play/salon-013";

export const Route = createFileRoute("/salon/said-tired.html")({
  server: {
    handlers: {
      GET: () => textResponse(salon013StaticHtml(), "text/html; charset=utf-8"),
    },
  },
});
