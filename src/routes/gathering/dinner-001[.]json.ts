import { createFileRoute } from "@tanstack/react-router";
import { dinnerManifest } from "@/lib/play/dinner";
import { listDinnerLines } from "@/lib/play/dinner.server";
import { jsonResponse } from "@/lib/play/json-response";

export const Route = createFileRoute("/gathering/dinner-001.json")({
  server: {
    handlers: {
      GET: async () => jsonResponse(dinnerManifest(await listDinnerLines())),
    },
  },
});
