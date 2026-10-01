import { createFileRoute } from "@tanstack/react-router";
import { dinnerTranscript } from "@/lib/play/dinner";
import { listDinnerLines } from "@/lib/play/dinner.server";
import { htmlMirror } from "@/lib/play/html-mirror";
import { textResponse } from "@/lib/play/json-response";

export const Route = createFileRoute("/gathering/dinner-001.html")({
  server: {
    handlers: {
      GET: async () => {
        const text = dinnerTranscript(await listDinnerLines());
        return textResponse(
          htmlMirror({
            title: "Together · Dinner 001",
            description: "Full transcript of Together Dinner 001. Same words as the plain text.",
            textUrl: "https://play.civilisationfield.com/gathering/dinner-001.txt",
            text,
            also: [
              {
                href: "https://play.civilisationfield.com/gathering/dinner-001-index.html",
                label: "Small index, if this page is too large",
              },
            ],
          }),
          "text/html; charset=utf-8",
        );
      },
    },
  },
});
