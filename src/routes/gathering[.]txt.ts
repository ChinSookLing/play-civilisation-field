import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { gatheringRoomSheet } from "@/lib/play/page-sheets";
import { pageText } from "@/lib/play/sheet";

export const Route = createFileRoute("/gathering.txt")({
  server: {
    handlers: {
      GET: async () => textResponse(pageText(gatheringRoomSheet()), "text/plain; charset=utf-8"),
    },
  },
});
