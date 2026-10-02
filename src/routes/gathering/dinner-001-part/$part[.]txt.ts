import { createFileRoute } from "@tanstack/react-router";
import { dinnerParts, partDocument } from "@/lib/play/dinner";
import { listDinnerLines } from "@/lib/play/dinner.server";
import { textResponse } from "@/lib/play/json-response";

export const Route = createFileRoute("/gathering/dinner-001-part/$part.txt")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const id = params["part.txt"].replace(/\.txt$/i, "").padStart(2, "0");
        const lines = await listDinnerLines();
        const part = dinnerParts(lines).find((item) => item.id === id);
        if (!part) return textResponse("part not found\n", "text/plain; charset=utf-8", 404);
        return textResponse(partDocument(lines, part, "txt"), "text/plain; charset=utf-8");
      },
    },
  },
});
