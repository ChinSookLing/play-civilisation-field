import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon010StaticHtml } from "@/lib/play/salon-010";

export const Route = createFileRoute("/salon/final-gate.html")({
  server: {
    handlers: {
      GET: () => textResponse(salon010StaticHtml(), "text/html; charset=utf-8"),
    },
  },
});
