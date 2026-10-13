import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon007Plain } from "@/lib/play/salon-007";

export const Route = createFileRoute("/salon/how-llms-work-together.txt")({
  server: {
    handlers: {
      GET: () => textResponse(salon007Plain(), "text/plain; charset=utf-8"),
    },
  },
});
