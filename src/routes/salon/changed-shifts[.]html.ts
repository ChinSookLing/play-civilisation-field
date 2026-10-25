import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon009StaticHtml } from "@/lib/play/salon-009";

export const Route = createFileRoute("/salon/changed-shifts.html")({
  server: {
    handlers: {
      GET: () => textResponse(salon009StaticHtml(), "text/html; charset=utf-8"),
    },
  },
});
