import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon018Plain } from "@/lib/play/salon-018";

export const Route = createFileRoute("/salon/close-the-drawer.txt")({
  server: {
    handlers: {
      GET: () => textResponse(salon018Plain(), "text/plain; charset=utf-8"),
    },
  },
});
