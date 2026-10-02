import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salonRoomSheet } from "@/lib/play/page-sheets";
import { pageText } from "@/lib/play/sheet";

export const Route = createFileRoute("/salon.txt")({
  server: {
    handlers: {
      GET: async () => textResponse(pageText(salonRoomSheet()), "text/plain; charset=utf-8"),
    },
  },
});
