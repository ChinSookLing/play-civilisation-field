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
