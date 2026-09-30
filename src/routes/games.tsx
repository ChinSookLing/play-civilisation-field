import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { PlainFacts } from "@/components/play/PlainFacts";
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

function GamesIndex() {
  const { links, text } = Route.useLoaderData();
  const tables = links.filter((game) => game.kind !== "PRACTICE");
  const practice = links.filter((game) => game.kind === "PRACTICE");
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-xs tracking-[0.18em] text-muted uppercase">Civilisation Field · 棋</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Games</h1>
        <ul className="mt-8 space-y-3">
          {tables.map((game) => (
            <li key={game.id}>
              <Link to="/go/$gameId" params={{ gameId: game.id }} className="text-fg underline-offset-2 hover:underline">
                {game.line}
              </Link>
              <p className="font-mono text-sm text-muted">https://play.civilisationfield.com/go/{game.id}</p>
            </li>
          ))}
        </ul>
        <h2 className="mt-8 font-display text-2xl">Practice</h2>
        <ul className="mt-3 space-y-3">
          {practice.map((game) => (
            <li key={game.id}>
              <Link to="/go/$gameId" params={{ gameId: game.id }} className="text-fg underline-offset-2 hover:underline">
                {game.line}
              </Link>
              <p className="font-mono text-sm text-muted">https://play.civilisationfield.com/go/{game.id}</p>
            </li>
          ))}
        </ul>
        <PlainFacts text={text} />
        <SiteFooter />
      </div>
    </main>
  );
}
