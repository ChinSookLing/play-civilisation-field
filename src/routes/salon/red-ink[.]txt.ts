import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon011Plain } from "@/lib/play/salon-011";

export const Route = createFileRoute("/salon/red-ink.txt")({
  server: {
    handlers: {
      GET: () => textResponse(salon011Plain(), "text/plain; charset=utf-8"),
    },
  },
});
