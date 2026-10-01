import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { llmsGuide } from "@/lib/play/llms-guide";
import { loadPlayStore } from "@/lib/play/store.server";

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () => {
        await loadPlayStore();
        return textResponse(llmsGuide(), "text/plain; charset=utf-8");
      },
    },
  },
});
