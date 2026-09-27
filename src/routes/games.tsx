import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { loadGamesIndexTextFn } from "@/lib/play/load";

export const Route = createFileRoute("/games")({
  loader: () => loadGamesIndexTextFn(),
  component: GamesIndex,
});

function GamesIndex() {
  const text = Route.useLoaderData();
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <h1 className="font-display text-4xl tracking-tight">Games</h1>
        <pre className="mt-6 whitespace-pre-wrap font-mono text-sm leading-relaxed text-fg">{text}</pre>
        <SiteFooter />
      </div>
    </main>
  );
}
