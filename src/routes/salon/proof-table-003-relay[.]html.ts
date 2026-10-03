import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon004StaticHtml } from "@/lib/play/salon-004";

export const Route = createFileRoute("/salon/proof-table-003-relay.html")({
  server: {
    handlers: {
      GET: () => textResponse(salon004StaticHtml(), "text/html; charset=utf-8"),
    },
  },
});
