import { createServerFn } from "@tanstack/react-start";
import type { PlayGame } from "./types";

export type GameLink = {
  id: string;
  kind: string;
  line: string;
  href: string;
};

export const loadGamesLinksFn = createServerFn({ method: "GET" }).handler(async (): Promise<GameLink[]> => {
  const { loadPlayStore } = await import("./store.server");
  const { listGames } = await import("./catalog");
  const { gameIndexLine } = await import("./reading");
  await loadPlayStore();
  return listGames().map((game) => ({
    id: game.id,
    kind: game.kind,
    line: gameIndexLine(game),
    href: `/go/${game.id}`,
  }));
});


export const loadDinnerLinesFn = createServerFn({ method: "GET" }).handler(async () => {
  const { listDinnerLines } = await import("./dinner.server");
  return listDinnerLines();
});

export const loadBreakfastLinesFn = createServerFn({ method: "GET" }).handler(async () => {
  const { BREAKFAST_ID } = await import("./breakfast");
  const { listGatheringLines } = await import("./dinner.server");
  return listGatheringLines(BREAKFAST_ID);
});

export const loadProofTableFn = createServerFn({ method: "GET" }).handler(async () => {
  const { listProofLedger, listProofLines } = await import("./proof-table.server");
  const [lines, ledger] = await Promise.all([listProofLines(), listProofLedger()]);
  return { lines, ledger };
});

export const loadProof004Fn = createServerFn({ method: "GET" }).handler(async () => {
  const { PROOF_004_LEDGER_V1, PROOF_004_SPEC } = await import("./proof-table-004");
  const { ensureOpeningLedger, listProofLedger, listProofLines } = await import("./proof-table.server");
  await ensureOpeningLedger(PROOF_004_SPEC, PROOF_004_LEDGER_V1);
  const [lines, ledger] = await Promise.all([
    listProofLines(PROOF_004_SPEC),
    listProofLedger(PROOF_004_SPEC),
  ]);
  return { lines, ledger };
});

export const loadProof005Fn = createServerFn({ method: "GET" }).handler(async () => {
  const { PROOF_005_SPEC } = await import("./proof-table-005");
  const { listProofLedger, listProofLines } = await import("./proof-table.server");
  const [lines, ledger] = await Promise.all([
    listProofLines(PROOF_005_SPEC),
    listProofLedger(PROOF_005_SPEC),
  ]);
  return { lines, ledger };
});

export const loadProof006Fn = createServerFn({ method: "GET" }).handler(async () => {
  const { PROOF_006_SPEC } = await import("./proof-table-006");
  const { listProofLedger, listProofLines } = await import("./proof-table.server");
  const [lines, ledger] = await Promise.all([
    listProofLines(PROOF_006_SPEC),
    listProofLedger(PROOF_006_SPEC),
  ]);
  return { lines, ledger };
});

export const loadGamesIndexTextFn = createServerFn({ method: "GET" }).handler(async (): Promise<string> => {
  const { loadPlayStore } = await import("./store.server");
  const { gamesIndexText } = await import("./reading");
  await loadPlayStore();
  return gamesIndexText();
});

export const loadCurrentGameFn = createServerFn({ method: "GET" }).handler(async (): Promise<PlayGame> => {
  const { loadCurrentGame } = await import("./store.server");
  return loadCurrentGame();
});

export const loadGameByIdFn = createServerFn({ method: "GET" })
  .validator((id: unknown) => {
    if (typeof id !== "string" || !id.trim()) throw new Error("game id required");
    return id;
  })
  .handler(async ({ data }): Promise<PlayGame | null> => {
    const { loadGameById } = await import("./store.server");
    return (await loadGameById(data)) ?? null;
  });
