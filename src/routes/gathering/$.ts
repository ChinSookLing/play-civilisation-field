import { createFileRoute } from "@tanstack/react-router";
import { missingResponse } from "@/lib/play/missing-response";

export const Route = createFileRoute("/gathering/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const splat = params._splat ?? "";
        return missingResponse("Gathering", `/gathering/${splat}`, "/gathering", splat);
      },
    },
  },
});
