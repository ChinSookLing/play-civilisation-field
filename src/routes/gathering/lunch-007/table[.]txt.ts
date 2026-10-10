import { createFileRoute } from "@tanstack/react-router";
import { listGatheringLines } from "@/lib/play/dinner.server";
import { textResponse } from "@/lib/play/json-response";
import { LUNCH_ID, lunchTranscript } from "@/lib/play/lunch";

export const Route = createFileRoute("/gathering/lunch-007/table.txt")({
  server: {
    handlers: {
      GET: async () => textResponse(lunchTranscript(await listGatheringLines(LUNCH_ID)), "text/plain; charset=utf-8"),
    },
  },
});
