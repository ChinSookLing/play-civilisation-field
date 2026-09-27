import { createFileRoute, notFound } from "@tanstack/react-router";
import { PlayShell } from "@/components/play/PlayShell";
import { loadGameByIdFn } from "@/lib/play/load";

export const Route = createFileRoute("/go/$gameId")({
  loader: async ({ params }) => {
    const game = await loadGameByIdFn({ data: params.gameId });
    if (!game) throw notFound();
    return game;
  },
  component: GamePage,
});

function GamePage() {
  const game = Route.useLoaderData();
  return <PlayShell key={game.id} game={game} />;
}
