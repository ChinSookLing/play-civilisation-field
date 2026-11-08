import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon012StaticHtml } from "@/lib/play/salon-012";

export const Route = createFileRoute("/salon/summit-flag.html")({
  server: {
    handlers: {
      GET: () => textResponse(salon012StaticHtml(), "text/html; charset=utf-8"),
    },
  },
});
