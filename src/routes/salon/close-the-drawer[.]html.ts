import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon018StaticHtml } from "@/lib/play/salon-018";

export const Route = createFileRoute("/salon/close-the-drawer.html")({
  server: {
    handlers: {
      GET: () => textResponse(salon018StaticHtml(), "text/html; charset=utf-8"),
    },
  },
});
