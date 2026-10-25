import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon010Plain } from "@/lib/play/salon-010";

export const Route = createFileRoute("/salon/final-gate.txt")({
  server: {
    handlers: {
      GET: () => textResponse(salon010Plain(), "text/plain; charset=utf-8"),
    },
  },
});
