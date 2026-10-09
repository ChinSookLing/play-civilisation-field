import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon005Plain } from "@/lib/play/salon-005";

export const Route = createFileRoute("/salon/fifteen-speeds.txt")({
  server: {
    handlers: {
      GET: () => textResponse(salon005Plain(), "text/plain; charset=utf-8"),
    },
  },
});
