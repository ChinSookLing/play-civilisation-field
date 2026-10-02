import { createFileRoute } from "@tanstack/react-router";
import { missingResponse } from "@/lib/play/missing-response";

export const Route = createFileRoute("/salon/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const splat = params._splat ?? "";
        return missingResponse("Salon", `/salon/${splat}`, "/salon", splat);
      },
    },
  },
});
