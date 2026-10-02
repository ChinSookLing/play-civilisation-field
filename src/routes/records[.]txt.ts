import { createFileRoute } from "@tanstack/react-router";
import { dinnerStamp } from "@/lib/play/dinner";
import { listDinnerLines } from "@/lib/play/dinner.server";
import { textResponse } from "@/lib/play/json-response";
import { recordsText } from "@/lib/play/reading";
import { loadPlayStore } from "@/lib/play/store.server";

export const Route = createFileRoute("/records.txt")({
  server: {
    handlers: {
      GET: async () => {
        await loadPlayStore();
        const lines = await listDinnerLines();
        const stamp = dinnerStamp(lines);
        return textResponse(
          recordsText({ messages: lines.length, revision: stamp.revision, updated: stamp.updated }),
          "text/plain; charset=utf-8",
        );
      },
    },
  },
});
