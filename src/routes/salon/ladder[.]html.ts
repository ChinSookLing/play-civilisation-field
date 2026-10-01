import { createFileRoute } from "@tanstack/react-router";
import { htmlMirror } from "@/lib/play/html-mirror";
import { textResponse } from "@/lib/play/json-response";
import { SALON_PIECE, salonPlain } from "@/lib/play/salon-piece";

export const Route = createFileRoute("/salon/ladder.html")({
  server: {
    handlers: {
      GET: () =>
        textResponse(
          htmlMirror({
            title: SALON_PIECE.title,
            description: SALON_PIECE.english,
            textUrl: SALON_PIECE.plain,
            text: salonPlain(),
            also: [{ href: "/salon", label: "文 · Salon" }],
          }),
          "text/html; charset=utf-8",
        ),
    },
  },
});
