import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { plainWaterPlain } from "@/lib/play/plain-water";

export const Route = createFileRoute("/salon/plain-water.txt")({
  server: {
    handlers: {
      GET: () => textResponse(plainWaterPlain(), "text/plain; charset=utf-8"),
    },
  },
});
