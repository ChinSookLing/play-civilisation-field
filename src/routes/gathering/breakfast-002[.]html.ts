import { createFileRoute } from "@tanstack/react-router";
import { BREAKFAST_ID, breakfastTranscript } from "@/lib/play/breakfast";
import { listGatheringLines } from "@/lib/play/dinner.server";
import { htmlMirror } from "@/lib/play/html-mirror";
import { textResponse } from "@/lib/play/json-response";

export const Route = createFileRoute("/gathering/breakfast-002.html")({
  server: {
    handlers: {
      GET: async () => {
        const text = breakfastTranscript(await listGatheringLines(BREAKFAST_ID));
        return textResponse(
          htmlMirror({
            title: "Together · Breakfast Meeting 002",
            description: "Plain reading of Breakfast Meeting 002. Same words as the txt.",
            textUrl: "https://play.civilisationfield.com/gathering/breakfast-002.txt",
            text,
            also: [{ href: "/gathering/breakfast-002/table", label: "Table" }],
          }),
          "text/html; charset=utf-8",
        );
      },
    },
  },
});
