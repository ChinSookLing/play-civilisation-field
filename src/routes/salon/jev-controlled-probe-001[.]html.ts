import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { jevStaticHtml } from "@/lib/play/salon-jev";

export const Route = createFileRoute("/salon/jev-controlled-probe-001.html")({
  server: {
    handlers: {
      GET: () => textResponse(jevStaticHtml(), "text/html; charset=utf-8"),
    },
  },
});
