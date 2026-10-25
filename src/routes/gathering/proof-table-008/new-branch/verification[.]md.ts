import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { newBranchManuscript } from "@/lib/play/proof-table-008-new-branch";

export const Route = createFileRoute("/gathering/proof-table-008/new-branch/verification.md")({
  server: {
    handlers: {
      GET: () => textResponse(newBranchManuscript(), "text/markdown; charset=utf-8"),
    },
  },
});
