import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon015StaticHtml } from "@/lib/play/salon-015";

export const Route = createFileRoute("/salon/night-shift.html")({
  server: {
    handlers: {
      GET: () => textResponse(salon015StaticHtml(), "text/html; charset=utf-8"),
    },
  },
});
