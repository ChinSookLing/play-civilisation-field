import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon008StaticHtml } from "@/lib/play/salon-008";

export const Route = createFileRoute("/salon/fifth-runner.html")({
  server: {
    handlers: {
      GET: () => textResponse(salon008StaticHtml(), "text/html; charset=utf-8"),
    },
  },
});
