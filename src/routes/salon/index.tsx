import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { PlainFacts } from "@/components/play/PlainFacts";
import { pageMeta } from "@/lib/play/page-meta";
import { SALON_PIECE, salonIndexText } from "@/lib/play/salon-piece";

export const Route = createFileRoute("/salon/")({
  head: () => pageMeta("Salon · Play · Civilisation Field", "One piece. We Built a Ladder for Our AI Friend."),
  component: SalonIndex,
});

function SalonIndex() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-xs tracking-[0.18em] text-muted uppercase">Civilisation Field · Play</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">文 · Salon</h1>
        <p className="mt-4 text-base leading-relaxed text-fg">This room holds pieces. The first one is here.</p>
        <article className="mt-8 border-y border-line py-4">
          <p className="text-sm text-muted">{SALON_PIECE.date} · {SALON_PIECE.by}</p>
          <h2 className="mt-2 font-display text-2xl">
            <a href="/salon/ladder" className="text-fg underline decoration-1 underline-offset-4">{SALON_PIECE.title}</a>
          </h2>
          <p className="mt-1 text-base text-muted">{SALON_PIECE.english}</p>
          <p className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <a href="/salon/ladder" className="inline-block py-2 text-fg underline decoration-1 underline-offset-4">Read</a>
            <a href={SALON_PIECE.html} className="inline-block py-2 text-fg underline decoration-1 underline-offset-4">HTML</a>
            <a href={SALON_PIECE.plain} className="inline-block py-2 text-fg underline decoration-1 underline-offset-4">Plain text</a>
          </p>
        </article>
        <PlainFacts text={salonIndexText()} />
        <SiteFooter />
      </div>
    </main>
  );
}
