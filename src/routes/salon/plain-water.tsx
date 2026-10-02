import { createFileRoute, Link } from "@tanstack/react-router";
import { SheetBottom, SheetTop } from "@/components/play/SheetMark";
import { parseInlines, PLAIN_WATER, PLAIN_WATER_BLOCKS, plainWaterSheet, type Inline } from "@/lib/play/plain-water";
import { pageMeta } from "@/lib/play/page-meta";

export const Route = createFileRoute("/salon/plain-water")({
  head: () => pageMeta(`${PLAIN_WATER.title} · Salon · Play`, "Puck on Breakfast 002, and an outsider's second look."),
  component: PlainWaterPage,
});

function InlineText({ text }: { text: string }) {
  return (
    <>
      {parseInlines(text).map((part, index) => (
        <InlinePiece key={index} part={part} />
      ))}
    </>
  );
}

function InlinePiece({ part }: { part: Inline }) {
  if (part.t === "strong") return <strong className="font-medium text-fg">{part.s}</strong>;
  if (part.t === "em") return <em>{part.s}</em>;
  if (part.t === "code") return <code className="font-mono text-sm">{part.s}</code>;
  if (part.t === "link") {
    return (
      <a href={part.href} className="text-fg underline decoration-1 underline-offset-4">
        {part.s}
      </a>
    );
  }
  return <span>{part.s}</span>;
}

function PlainWaterPage() {
  const sheet = plainWaterSheet();
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <SheetTop sheet={sheet} />
        <p className="text-sm">
          <Link to="/salon" className="text-fg underline-offset-2 hover:underline">
            文 · Salon
          </Link>
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-tight">{PLAIN_WATER.title}</h1>
        <article className="mt-8 space-y-4 text-base leading-relaxed text-muted">
          {PLAIN_WATER_BLOCKS.map((block, index) =>
            block.kind === "h2" ? (
              <h2 key={index} className="pt-4 font-display text-2xl text-fg">
                {block.text}
              </h2>
            ) : (
              <p key={index}>
                <InlineText text={block.text} />
              </p>
            ),
          )}
        </article>
        <SheetBottom sheet={sheet} />
      </div>
    </main>
  );
}
