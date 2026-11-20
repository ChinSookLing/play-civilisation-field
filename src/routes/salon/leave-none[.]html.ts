import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon016StaticHtml } from "@/lib/play/salon-016";

export const Route = createFileRoute("/salon/leave-none.html")({
  server: {
    handlers: {
      GET: () => textResponse(salon016StaticHtml(), "text/html; charset=utf-8"),
    },
  },
});
