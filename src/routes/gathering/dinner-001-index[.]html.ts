import { createFileRoute } from "@tanstack/react-router";
import { dinnerIndex, dinnerParts } from "@/lib/play/dinner";
import { listDinnerLines } from "@/lib/play/dinner.server";
import { htmlMirror } from "@/lib/play/html-mirror";
import { textResponse } from "@/lib/play/json-response";

export const Route = createFileRoute("/gathering/dinner-001-index.html")({
  server: {
    handlers: {
      GET: async () => {
        const lines = await listDinnerLines();
        return textResponse(
          htmlMirror({
            title: "Dinner 001 index",
            description: "Small index for Together Dinner 001. Same words as the plain text.",
            textUrl: "https://play.civilisationfield.com/gathering/dinner-001-index.txt",
            text: dinnerIndex(lines),
            also: dinnerParts(lines).map((part) => ({
              href: part.url.replace(/\.txt$/, ".html"),
              label: `Part ${part.id}, ${part.from} to ${part.to}`,
            })),
          }),
          "text/html; charset=utf-8",
        );
      },
    },
  },
});
