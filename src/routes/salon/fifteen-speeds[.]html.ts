import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon005StaticHtml } from "@/lib/play/salon-005";

export const Route = createFileRoute("/salon/fifteen-speeds.html")({
  server: {
    handlers: {
      GET: () => textResponse(salon005StaticHtml(), "text/html; charset=utf-8"),
    },
  },
});
