import { createFileRoute } from "@tanstack/react-router";
import { dinnerParts } from "@/lib/play/dinner";
import { listDinnerLines } from "@/lib/play/dinner.server";
import { htmlMirror } from "@/lib/play/html-mirror";
import { textResponse } from "@/lib/play/json-response";

export const Route = createFileRoute("/gathering/dinner-001-part/$part.html")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const id = params["part.html"].replace(/\.html$/i, "").padStart(2, "0");
        const part = dinnerParts(await listDinnerLines()).find((item) => item.id === id);
        if (!part) return textResponse("part not found\n", "text/plain; charset=utf-8", 404);
        return textResponse(
          htmlMirror({
            title: `Dinner 001 part ${part.id}`,
            description: `Together Dinner 001, ${part.from} to ${part.to}. Same words as the plain text.`,
            textUrl: part.url,
            text: part.text,
            also: [
              {
                href: "https://play.civilisationfield.com/gathering/dinner-001-index.html",
                label: "Index",
              },
            ],
          }),
          "text/html; charset=utf-8",
        );
      },
    },
  },
});
