import { createFileRoute } from "@tanstack/react-router";
import { toPublicState } from "@/lib/play/catalog";
import { authorizeCourier } from "@/lib/play/courier-key";
import { setOverlay } from "@/lib/play/games";
import { jsonResponse } from "@/lib/play/json-response";
import { loadGameById, loadPlayStore, savePlayTable } from "@/lib/play/store.server";
import { diffViews, fetchOldGame, GAME_IDS, overlayFromPublic, stableView } from "../../../scripts/import-play-history.mjs";

export const Route = createFileRoute("/api/import-history")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const auth = authorizeCourier(request);
        if (!auth.ok) return jsonResponse({ ok: false, error: auth.error }, auth.status);
        await loadPlayStore();
        const report = [];
        for (const id of GAME_IDS) {
          try {
            const current = await loadGameById(id);
            if (!current || current.status !== "finished" || current.moves.length > 0) {
              report.push({
                id,
                ok: true,
                refused: true,
                moves: current?.moves.length ?? 0,
                status: current?.status ?? null,
                differences: ["refused: only an empty finished record can be replaced"],
              });
              continue;
            }
            const oldGame = await fetchOldGame(id);
            setOverlay(id, overlayFromPublic(oldGame));
            await savePlayTable(id);
            const saved = await loadGameById(id);
            const fresh = saved ? toPublicState(saved) : null;
            const problems = fresh ? diffViews(stableView(oldGame), stableView(fresh)) : ["not readable after import"];
            report.push({
              id,
              ok: problems.length === 0,
              moves: oldGame.moves?.length ?? 0,
              status: fresh?.status ?? null,
              differences: problems,
            });
          } catch (error) {
            report.push({ id, ok: false, differences: [error instanceof Error ? error.message : "import failed"] });
          }
        }
        return jsonResponse({ ok: report.every((item) => item.ok), games: report });
      },
    },
  },
});
