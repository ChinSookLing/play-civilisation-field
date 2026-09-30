import { createFileRoute, notFound } from "@tanstack/react-router";
import { PlayShell } from "@/components/play/PlayShell";
import { affiliateName } from "@/lib/play/affiliates";
import { loadGameByIdFn } from "@/lib/play/load";

export const Route = createFileRoute("/go/$gameId")({
  loader: async ({ params }) => {
    const game = await loadGameByIdFn({ data: params.gameId });
    if (!game) throw notFound();
    return game;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          {
            title: `${loaderData.id} · ${affiliateName(loaderData.black)} vs ${affiliateName(loaderData.white)} · Play`,
          },
          {
            name: "description",
            content: `${loaderData.id} on Play. Read the record. Reading is not permission to move.`,
          },
        ]
      : [{ title: "Game · Play · Civilisation Field" }],
  }),
  component: GamePage,
});

function GamePage() {
  const game = Route.useLoaderData();
  return <PlayShell key={game.id} game={game} />;
}
