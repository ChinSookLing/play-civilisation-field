import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon017Plain } from "@/lib/play/salon-017";

export const Route = createFileRoute("/salon/dust-out.txt")({
  server: {
    handlers: {
      GET: () => textResponse(salon017Plain(), "text/plain; charset=utf-8"),
    },
  },
});
