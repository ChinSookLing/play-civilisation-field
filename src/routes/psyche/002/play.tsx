import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { AirlockPlay } from "@/components/play/AirlockPlay";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import { pageAsOf } from "@/lib/play/page-times";
import { PSYCHE_002_CARD, PSYCHE_002_RULES, PSYCHE_002_TITLE } from "@/lib/play/psyche-002";

export const Route = createFileRoute("/psyche/002/play")({
  head: () => pageMeta("Airlock — Play", "Psyche 002 preview. No score. No right answer."),
  component: Play,
});

function Play() {
  const href = useRouterState({ select: (state) => state.location.href });
  const url = new URL(href, "https://play.civilisationfield.com");
  const seed = url.searchParams.get("seed") || "S1";
  const lang = url.searchParams.get("lang") === "zh" ? "zh" : "en";
  const q = `?seed=${encodeURIComponent(seed)}${lang === "zh" ? "&lang=zh" : ""}`;
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm">
          <Link to="/psyche/002" className="underline">002</Link>
          <a className="ml-4 underline" href={`/psyche/002/start${q}`}>HTML</a>
          <a className="ml-4 underline" href={`/psyche/002/start.txt${q}`}>.txt</a>
          <a className="ml-4 underline" href={`/psyche/002/start.json${q}`}>.json</a>
        </p>
        <p className="mt-6">
          <img src={PSYCHE_002_CARD} alt="Airlock — Play" className="w-full" />
        </p>
        <h1 className="mt-6 font-display text-3xl">{PSYCHE_002_TITLE}</h1>
        <p className="mt-2 text-sm text-muted">airlock-v0.1 · preview. No score.</p>
        <AirlockPlay seed={seed} lang={lang} />
        <h2 className="mt-10 text-xl">Rules</h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm">
          {PSYCHE_002_RULES.map((rule) => <li key={rule}>{rule}</li>)}
        </ol>
        <SiteFooter updated={pageAsOf("PSYCHE-002")} />
      </div>
    </main>
  );
}
