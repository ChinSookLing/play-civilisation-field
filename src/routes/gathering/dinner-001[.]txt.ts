import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { dinnerTranscript } from "@/lib/play/machine";

export const Route = createFileRoute("/gathering/dinner-001.txt")({
  server: {
    handlers: {
      GET: () => textResponse(dinnerTranscript() + "\n", "text/plain; charset=utf-8"),
    },
  },
});
