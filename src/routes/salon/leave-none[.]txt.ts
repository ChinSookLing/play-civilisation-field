import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon016Plain } from "@/lib/play/salon-016";

export const Route = createFileRoute("/salon/leave-none.txt")({
  server: {
    handlers: {
      GET: () => textResponse(salon016Plain(), "text/plain; charset=utf-8"),
    },
  },
});
