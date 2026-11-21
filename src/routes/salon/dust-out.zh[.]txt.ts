import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon017PlainZh } from "@/lib/play/salon-017";

export const Route = createFileRoute("/salon/dust-out/zh.txt")({
  server: {
    handlers: {
      GET: () => textResponse(salon017PlainZh(), "text/plain; charset=utf-8"),
    },
  },
});
