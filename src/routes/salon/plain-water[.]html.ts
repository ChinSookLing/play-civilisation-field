import { createFileRoute } from "@tanstack/react-router";
import { htmlMirror } from "@/lib/play/html-mirror";
import { textResponse } from "@/lib/play/json-response";
import { PLAIN_WATER, plainWaterPlain } from "@/lib/play/plain-water";

export const Route = createFileRoute("/salon/plain-water.html")({
  server: {
    handlers: {
      GET: () =>
        textResponse(
          htmlMirror({
            title: PLAIN_WATER.title,
            description: PLAIN_WATER.byline,
            textUrl: PLAIN_WATER.plain,
            text: plainWaterPlain(),
            also: [{ href: "/salon", label: "文 · Salon" }],
          }),
          "text/html; charset=utf-8",
        ),
    },
  },
});
