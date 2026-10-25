import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { newBranchEntrance } from "@/lib/play/proof-table-008-new-branch";

export const Route = createFileRoute("/gathering/proof-table-008/new-branch.txt")({
  server: {
    handlers: {
      GET: () => textResponse(newBranchEntrance(), "text/plain; charset=utf-8"),
    },
  },
});
