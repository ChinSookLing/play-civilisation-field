import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon007StaticHtml } from "@/lib/play/salon-007";

export const Route = createFileRoute("/salon/how-llms-work-together.html")({
  server: {
    handlers: {
      GET: () => textResponse(salon007StaticHtml(), "text/html; charset=utf-8"),
    },
  },
});
