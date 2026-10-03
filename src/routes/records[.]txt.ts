import { createFileRoute } from "@tanstack/react-router";
import { BREAKFAST_ID } from "@/lib/play/breakfast";
import { dinnerStamp } from "@/lib/play/dinner";
import { listDinnerLines, listGatheringLines } from "@/lib/play/dinner.server";
import { textResponse } from "@/lib/play/json-response";
import { proofRevision } from "@/lib/play/proof-table";
import { PROOF_004_LEDGER_V1, PROOF_004_SPEC } from "@/lib/play/proof-table-004";
import { ensureOpeningLedger, listProofLedger, listProofLines } from "@/lib/play/proof-table.server";
import { recordsText } from "@/lib/play/reading";
import { loadPlayStore } from "@/lib/play/store.server";

export const Route = createFileRoute("/records.txt")({
  server: {
    handlers: {
      GET: async () => {
        await loadPlayStore();
        const [dinner, breakfast, proofLines, proofLedger] = await Promise.all([
          listDinnerLines(),
          listGatheringLines(BREAKFAST_ID),
          listProofLines(),
          listProofLedger(),
        ]);
        await ensureOpeningLedger(PROOF_004_SPEC, PROOF_004_LEDGER_V1);
        const [proof004Lines, proof004Ledger] = await Promise.all([
          listProofLines(PROOF_004_SPEC),
          listProofLedger(PROOF_004_SPEC),
        ]);
        const proofTimes = [...proofLines.map((line) => line.at), ...proofLedger.map((version) => version.at)];
        const proofUpdated = proofTimes.sort().at(-1) ?? "";
        return textResponse(
          recordsText({
            dinner: { messages: dinner.length, ...dinnerStamp(dinner) },
            breakfast: { messages: breakfast.length, ...dinnerStamp(breakfast) },
            proof: {
              messages: proofLines.length,
              revision: proofRevision(proofLines, proofLedger),
              updated: proofUpdated,
              ledger: proofLedger.at(-1)?.version ?? "none yet",
            },
            proof004: {
              messages: proof004Lines.length,
              updated: [...proof004Lines.map((line) => line.at), ...proof004Ledger.map((version) => version.at)].sort().at(-1) ?? "",
              ledger: proof004Ledger.at(-1)?.version ?? "none yet",
            },
          }),
          "text/plain; charset=utf-8",
        );
      },
    },
  },
});