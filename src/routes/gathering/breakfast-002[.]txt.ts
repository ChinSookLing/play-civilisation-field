import { createFileRoute } from "@tanstack/react-router";
import { BREAKFAST_ID, breakfastTranscript } from "@/lib/play/breakfast";
import { listGatheringLines } from "@/lib/play/dinner.server";
import { textResponse } from "@/lib/play/json-response";

export const Route = createFileRoute("/gathering/breakfast-002.txt")({
  server: {
    handlers: {
      GET: async () => textResponse(breakfastTranscript(await listGatheringLines(BREAKFAST_ID)), "text/plain; charset=utf-8"),
    },
  },
});
