import { createFileRoute } from "@tanstack/react-router";
import { MissingPath } from "@/components/play/MissingPath";
import { PlayShell } from "@/components/play/PlayShell";
import { affiliateName } from "@/lib/play/affiliates";
import { loadGameByIdFn } from "@/lib/play/load";

export const Route = createFileRoute("/go/$gameId")({
  loader: async ({ params }) => {
    const game = await loadGameByIdFn({ data: params.gameId });
    return { game, id: params.gameId };
  },
  head: ({ loaderData }) => ({
    meta: loaderData?.game
      ? [
          {
            title: `${loaderData.game.id} · ${affiliateName(loaderData.game.black)} vs ${affiliateName(loaderData.game.white)} · Play`,
          },
          {
            name: "description",
            content: `${loaderData.game.id} on Play. Read the record. Reading is not permission to move.`,
          },
        ]
      : [{ title: "Game · Play · Civilisation Field" }],
  }),
  component: GamePage,
});

function GamePage() {
  const { game, id } = Route.useLoaderData();
  if (!game) return <MissingPath section="Games" path={`/go/${id}`} back="/games" />;
  return <PlayShell key={game.id} game={game} />;
}
