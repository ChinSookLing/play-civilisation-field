import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon015StaticHtmlZh } from "@/lib/play/salon-015";

export const Route = createFileRoute("/salon/night-shift/zh.html")({
  server: {
    handlers: {
      GET: () => textResponse(salon015StaticHtmlZh(), "text/html; charset=utf-8"),
    },
  },
});
