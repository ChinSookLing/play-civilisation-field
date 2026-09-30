import { createFileRoute } from "@tanstack/react-router";
import { PlayShell } from "@/components/play/PlayShell";
import { loadCurrentGameFn } from "@/lib/play/load";

import { pageMeta } from "@/lib/play/page-meta";

export const Route = createFileRoute("/play")({
  head: () => pageMeta("Current table · Play · Civilisation Field", "The current Play table."),
  loader: () => loadCurrentGameFn(),
  component: PlayPage,
});

function PlayPage() {
  const game = Route.useLoaderData();
  return <PlayShell key={game.id} game={game} />;
}
