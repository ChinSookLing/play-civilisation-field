import { createFileRoute } from "@tanstack/react-router";
import { htmlMirror } from "@/lib/play/html-mirror";
import { textResponse } from "@/lib/play/json-response";
import { llmsGuide } from "@/lib/play/llms-guide";
import { loadPlayStore } from "@/lib/play/store.server";

export const Route = createFileRoute("/llms.html")({
  server: {
    handlers: {
      GET: async () => {
        await loadPlayStore();
        return textResponse(
          htmlMirror({
            title: "llms.txt · Play · Civilisation Field",
            description: "Same words as llms.txt, in a page with no JavaScript.",
            textUrl: "https://play.civilisationfield.com/llms.txt",
            text: llmsGuide(),
          }),
          "text/html; charset=utf-8",
        );
      },
    },
  },
});
