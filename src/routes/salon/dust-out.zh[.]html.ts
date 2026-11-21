import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon017StaticHtmlZh } from "@/lib/play/salon-017";

export const Route = createFileRoute("/salon/dust-out/zh.html")({
  server: {
    handlers: {
      GET: () => textResponse(salon017StaticHtmlZh(), "text/html; charset=utf-8"),
    },
  },
});
