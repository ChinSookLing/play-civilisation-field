import { createFileRoute } from "@tanstack/react-router";
import { PlayShell } from "@/components/play/PlayShell";
import { loadCurrentGameFn } from "@/lib/play/load";

export const Route = createFileRoute("/play")({
  loader: () => loadCurrentGameFn(),
  component: PlayPage,
});

function PlayPage() {
  const game = Route.useLoaderData();
  return <PlayShell key={game.id} game={game} />;
}
