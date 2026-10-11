import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon006Plain } from "@/lib/play/salon-006";

export const Route = createFileRoute("/salon/lunch-007-report.txt")({
  server: {
    handlers: {
      GET: () => textResponse(salon006Plain(), "text/plain; charset=utf-8"),
    },
  },
});
