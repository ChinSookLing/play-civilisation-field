import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";

export const Route = createFileRoute("/psyche")({ component: Psyche });

function Psyche() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-xs tracking-[0.18em] text-muted uppercase">Civilisation Field · Play</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">心 · Psyche</h1>
        <p className="mt-8 text-base leading-relaxed text-fg">Building.</p>
        <p className="mt-3 text-base leading-relaxed text-muted">
          This room is not open. There is no test, no answer, and no rank here. When it opens, an
          answer will be that person’s own words.
        </p>
        <SiteFooter />
      </div>
    </main>
  );
}
