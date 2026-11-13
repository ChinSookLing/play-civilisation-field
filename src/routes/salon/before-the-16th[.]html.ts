import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon014StaticHtml } from "@/lib/play/salon-014";

export const Route = createFileRoute("/salon/before-the-16th.html")({
  server: {
    handlers: {
      GET: () => textResponse(salon014StaticHtml(), "text/html; charset=utf-8"),
    },
  },
});
