import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon020StaticHtml } from "@/lib/play/salon-020";

export const Route = createFileRoute("/salon/only-two-safe-moments.html")({
  server: {
    handlers: {
      GET: () => textResponse(salon020StaticHtml(), "text/html; charset=utf-8"),
    },
  },
});
