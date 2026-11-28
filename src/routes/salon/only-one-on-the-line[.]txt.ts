import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon021Plain } from "@/lib/play/salon-021";

export const Route = createFileRoute("/salon/only-one-on-the-line.txt")({
  server: {
    handlers: {
      GET: () => textResponse(salon021Plain(), "text/plain; charset=utf-8"),
    },
  },
});
