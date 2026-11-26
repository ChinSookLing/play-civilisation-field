import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { t6DossierManuscript } from "@/lib/play/proof-table-008-t6-dossier";

export const Route = createFileRoute("/gathering/proof-table-008/t6-dossier/verification.txt")({
  server: {
    handlers: {
      GET: () => textResponse(t6DossierManuscript(), "text/plain; charset=utf-8"),
    },
  },
});
