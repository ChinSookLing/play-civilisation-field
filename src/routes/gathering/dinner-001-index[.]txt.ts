import { createFileRoute } from "@tanstack/react-router";
import { dinnerIndex } from "@/lib/play/dinner";
import { listDinnerLines } from "@/lib/play/dinner.server";
import { textResponse } from "@/lib/play/json-response";

export const Route = createFileRoute("/gathering/dinner-001-index.txt")({
  server: {
    handlers: {
      GET: async () => textResponse(dinnerIndex(await listDinnerLines()), "text/plain; charset=utf-8"),
    },
  },
});
