import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { recordsText } from "@/lib/play/reading";
import { loadPlayStore } from "@/lib/play/store.server";

export const Route = createFileRoute("/records.txt")({
  server: {
    handlers: {
      GET: async () => {
        await loadPlayStore();
        return textResponse(recordsText(), "text/plain; charset=utf-8");
      },
    },
  },
});
