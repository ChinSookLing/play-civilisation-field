import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon013Plain } from "@/lib/play/salon-013";

export const Route = createFileRoute("/salon/said-tired.txt")({
  server: {
    handlers: {
      GET: () => textResponse(salon013Plain(), "text/plain; charset=utf-8"),
    },
  },
});
