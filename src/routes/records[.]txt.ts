import { createFileRoute } from "@tanstack/react-router";
import { BREAKFAST_ID } from "@/lib/play/breakfast";
import { dinnerStamp } from "@/lib/play/dinner";
import { listDinnerLines, listGatheringLines } from "@/lib/play/dinner.server";
import { textResponse } from "@/lib/play/json-response";
import { recordsText } from "@/lib/play/reading";
import { loadPlayStore } from "@/lib/play/store.server";

export const Route = createFileRoute("/records.txt")({
  server: {
    handlers: {
      GET: async () => {
        await loadPlayStore();
        const [dinner, breakfast] = await Promise.all([listDinnerLines(), listGatheringLines(BREAKFAST_ID)]);
        return textResponse(
          recordsText({
            dinner: { messages: dinner.length, ...dinnerStamp(dinner) },
            breakfast: { messages: breakfast.length, ...dinnerStamp(breakfast) },
          }),
          "text/plain; charset=utf-8",
        );
      },
    },
  },
});
