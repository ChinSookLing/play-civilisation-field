import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon020Plain } from "@/lib/play/salon-020";

export const Route = createFileRoute("/salon/only-two-safe-moments.txt")({
  server: {
    handlers: {
      GET: () => textResponse(salon020Plain(), "text/plain; charset=utf-8"),
    },
  },
});
