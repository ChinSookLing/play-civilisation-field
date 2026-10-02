import { createFileRoute } from "@tanstack/react-router";
import { dinnerParts, partDocument } from "@/lib/play/dinner";
import { listDinnerLines } from "@/lib/play/dinner.server";
import { htmlMirror } from "@/lib/play/html-mirror";
import { textResponse } from "@/lib/play/json-response";

export const Route = createFileRoute("/gathering/dinner-001-part/$part.html")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const id = params["part.html"].replace(/\.html$/i, "").padStart(2, "0");
        const lines = await listDinnerLines();
        const part = dinnerParts(lines).find((item) => item.id === id);
        if (!part) return textResponse("part not found\n", "text/plain; charset=utf-8", 404);
        const also = [
          { href: "https://play.civilisationfield.com/gathering/dinner-001-index.html", label: "Index" },
        ];
        if (part.previous !== "none") {
          also.unshift({ href: part.previous.replace(/\.txt$/, ".html"), label: "Previous part" });
        }
        if (part.next !== "none") {
          also.push({ href: part.next.replace(/\.txt$/, ".html"), label: "Next part" });
        }
        return textResponse(
          htmlMirror({
            title: `Dinner 001 part ${part.id}`,
            description: `Together Dinner 001, ${part.from} to ${part.to}. Next stays on HTML.`,
            textUrl: part.url,
            text: partDocument(lines, part, "html"),
            also,
          }),
          "text/html; charset=utf-8",
        );
      },
    },
  },
});
