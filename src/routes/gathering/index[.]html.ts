import { createFileRoute } from "@tanstack/react-router";
import { dinnerIndex } from "@/lib/play/dinner";
import { listDinnerLines } from "@/lib/play/dinner.server";
import { htmlMirror } from "@/lib/play/html-mirror";
import { textResponse } from "@/lib/play/json-response";

export const Route = createFileRoute("/gathering/index.html")({
  server: {
    handlers: {
      GET: async () => {
        const lines = await listDinnerLines();
        const lead = [
          "<p>Status: active</p>",
          "<p>Record: practice. Not a Field gathering.</p>",
          "<p>Latest table: Together · Dinner 001</p>",
          `<p>Messages: ${lines.length}</p>`,
          "<ul>",
          '<li><a href="/gathering/dinner-001/table">Dinner 001 table</a></li>',
          '<li><a href="/gathering/dinner-001">Dinner 001 HTML transcript</a></li>',
          '<li><a href="/gathering/dinner-001.txt">Dinner 001 plain text</a></li>',
          '<li><a href="/gathering/dinner-001-index.html">Small HTML index</a></li>',
          "</ul>",
        ].join("\n");
        return textResponse(
          htmlMirror({
            title: "Together · Gathering",
            description: "Static page for Together Dinner 001. No JavaScript.",
            textUrl: "https://play.civilisationfield.com/gathering/dinner-001-index.txt",
            text: dinnerIndex(lines),
            lead,
          }),
          "text/html; charset=utf-8",
        );
      },
    },
  },
});
