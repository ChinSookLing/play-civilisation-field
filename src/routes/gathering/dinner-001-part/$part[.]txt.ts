import { createFileRoute } from "@tanstack/react-router";
import { dinnerParts } from "@/lib/play/dinner";
import { listDinnerLines } from "@/lib/play/dinner.server";
import { textResponse } from "@/lib/play/json-response";

export const Route = createFileRoute("/gathering/dinner-001-part/$part.txt")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const raw = params["part.txt"];
        const id = raw.replace(/\.txt$/i, "").padStart(2, "0");
        const part = dinnerParts(await listDinnerLines()).find((item) => item.id === id);
        if (!part) return textResponse("part not found\n", "text/plain; charset=utf-8", 404);
        return textResponse(part.text, "text/plain; charset=utf-8");
      },
    },
  },
});
