import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon019StaticHtml } from "@/lib/play/salon-019";

export const Route = createFileRoute("/salon/last-two-remainders.html")({
  server: {
    handlers: {
      GET: () => textResponse(salon019StaticHtml(), "text/html; charset=utf-8"),
    },
  },
});
