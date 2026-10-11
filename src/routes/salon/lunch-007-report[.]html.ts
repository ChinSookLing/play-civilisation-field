import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon006StaticHtml } from "@/lib/play/salon-006";

export const Route = createFileRoute("/salon/lunch-007-report.html")({
  server: {
    handlers: {
      GET: () => textResponse(salon006StaticHtml(), "text/html; charset=utf-8"),
    },
  },
});
