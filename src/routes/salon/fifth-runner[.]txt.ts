import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon008Plain } from "@/lib/play/salon-008";

export const Route = createFileRoute("/salon/fifth-runner.txt")({
  server: {
    handlers: {
      GET: () => textResponse(salon008Plain(), "text/plain; charset=utf-8"),
    },
  },
});
