import { createFileRoute } from "@tanstack/react-router";
import { RoomIndex, type RoomItem } from "@/components/play/RoomIndex";
import { loadGamesIndexTextFn, loadGamesLinksFn } from "@/lib/play/load";
import { pageMeta } from "@/lib/play/page-meta";

export const Route = createFileRoute("/games")({
  head: () => pageMeta("Games · Play · Civilisation Field", "Five Go tables and one practice. Each links to its own record."),
  loader: async () => {
    const [links, text] = await Promise.all([loadGamesLinksFn(), loadGamesIndexTextFn()]);
    return { links, text };
  },
  component: GamesIndex,
});

function toItem(line: string, href: string): RoomItem {
  const parts = line.split(" · ");
  const title = parts.slice(0, 2).join(" · ");
  const note = parts.slice(2).join(" · ");
  return { href, title, note };
}

function GamesIndex() {
  const { links, text } = Route.useLoaderData();
  const tables = links.filter((game) => game.kind !== "PRACTICE").map((game) => toItem(game.line, game.href));
  const practice = links.filter((game) => game.kind === "PRACTICE").map((game) => toItem(game.line, game.href));
  return (
    <RoomIndex
      mark="棋"
      title="Games"
      intro="This page lists the tables. Open one to read that game."
      sections={[
        { items: tables },
        { heading: "Practice", items: practice },
      ]}
      facts={text}
    />
  );
}
