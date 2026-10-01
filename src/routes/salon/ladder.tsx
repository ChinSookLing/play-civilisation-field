import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { PlainFacts } from "@/components/play/PlainFacts";
import { pageMeta } from "@/lib/play/page-meta";
import { SALON_BLOCKS, SALON_NOTE, SALON_PIECE, salonPlain } from "@/lib/play/salon-piece";

export const Route = createFileRoute("/salon/ladder")({
  head: () => pageMeta(`${SALON_PIECE.english} · Salon · Play`, SALON_PIECE.title),
  component: Ladder,
});

function Ladder() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm"><Link to="/salon" className="text-fg underline-offset-2 hover:underline">文 · Salon</Link></p>
        <h1 className="mt-4 font-display text-4xl tracking-tight">{SALON_PIECE.title}</h1>
        <p className="mt-2 text-lg text-muted">{SALON_PIECE.english}</p>
        <p className="mt-3 text-sm text-muted">{SALON_PIECE.date} · {SALON_PIECE.by}</p>
        <article className="mt-8 space-y-4 text-base leading-relaxed">
          {SALON_BLOCKS.map((block, index) =>
            block.kind === "h2" ? (
              <h2 key={index} className="pt-4 font-display text-2xl text-fg">{block.text}</h2>
            ) : (
              <p key={index}>{block.text}</p>
            ),
          )}
          <p>— {SALON_PIECE.by}</p>
          <p className="text-sm text-muted">文 · Salon · The Civilisation Field</p>
          <p className="text-sm text-muted">{SALON_NOTE}</p>
        </article>
        <PlainFacts text={salonPlain()} />
        <SiteFooter />
      </div>
    </main>
  );
}
