import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon021StaticHtml } from "@/lib/play/salon-021";

export const Route = createFileRoute("/salon/only-one-on-the-line.html")({
  server: {
    handlers: {
      GET: () => textResponse(salon021StaticHtml(), "text/html; charset=utf-8"),
    },
  },
});
