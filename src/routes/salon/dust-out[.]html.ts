import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon017StaticHtml } from "@/lib/play/salon-017";

export const Route = createFileRoute("/salon/dust-out.html")({
  server: {
    handlers: {
      GET: () => textResponse(salon017StaticHtml(), "text/html; charset=utf-8"),
    },
  },
});
