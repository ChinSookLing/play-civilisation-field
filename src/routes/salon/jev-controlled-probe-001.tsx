import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SheetTop } from "@/components/play/SheetMark";
import { SiteFooter } from "@/components/play/SiteFooter";
import { parseInlines, type Inline } from "@/lib/play/plain-water";
import { pageMeta } from "@/lib/play/page-meta";
import { sheetMeta } from "@/lib/play/sheet";
import {
  JEV_DOES_NOT_CLAIM,
  JEV_TITLE,
  jevKindLabel,
  jevSections,
  jevSheet,
  jevUpdated,
  type JevBlock,
} from "@/lib/play/salon-jev";

export const Route = createFileRoute("/salon/jev-controlled-probe-001")({
  head: () =>
    pageMeta(
      `${JEV_TITLE} · Salon · Play`,
      "Draft research note on the Jev probes. Tuzi decides publication.",
    ),
  component: JevPage,
});

function InlineText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex}>
          {lineIndex > 0 ? <br /> : null}
          {parseInlines(line).map((part, index) => (
            <InlinePiece key={index} part={part} />
          ))}
        </span>
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

function Blocks({ blocks }: { blocks: JevBlock[] }) {
  const nodes: ReactNode[] = [];
  let index = 0;
  while (index < blocks.length) {
    const block = blocks[index]!;
    if (block.tag === "li") {
      const items: JevBlock[] = [];
      while (index < blocks.length && blocks[index]!.tag === "li") {
        items.push(blocks[index]!);
        index += 1;
      }
      nodes.push(
        <ul key={`ul-${index}`} className="list-disc space-y-1 pl-5">
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>
              <InlineText text={item.text} />
            </li>
          ))}
        </ul>,
      );
      continue;
    }
    if (block.tag === "h1") {
      nodes.push(
        <h1 key={index} className="font-display text-4xl tracking-tight text-fg">
          {block.text}
        </h1>,
      );
    } else if (block.tag === "h2") {
      nodes.push(
        <h2 key={index} className="pt-6 font-display text-2xl text-fg">
          {block.text}
        </h2>,
      );
    } else if (block.tag === "h3") {
      nodes.push(
        <h3 key={index} className="pt-3 font-display text-xl text-fg">
          {block.text}
        </h3>,
      );
    } else {
      nodes.push(
        <p key={index}>
          <InlineText text={block.text} />
        </p>,
      );
    }
    index += 1;
  }
  return <>{nodes}</>;
}

function JevPage() {
  const sheet = jevSheet();
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <SheetTop sheet={sheet} />
        <p className="mt-6 text-sm">
          <Link to="/salon" className="text-fg underline decoration-1 underline-offset-4">
            文 · Salon
          </Link>
        </p>
        <aside className="mt-6 rounded-lg border border-line px-4 py-3 text-sm leading-relaxed" aria-label="This note does not claim">
          <p className="text-xs tracking-[0.14em] text-muted uppercase">This note does not claim</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {JEV_DOES_NOT_CLAIM.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </aside>
        <article className="mt-8 space-y-4 text-base leading-relaxed text-muted">
          {jevSections().map((section, index) => (
            <section key={index} data-kind={section.kind} className="space-y-4">
              {section.kind ? (
                <p className="text-xs tracking-[0.16em] text-faint uppercase">{jevKindLabel(section.kind)}</p>
              ) : null}
              <Blocks blocks={section.blocks} />
            </section>
          ))}
        </article>
        <p className="mt-8 text-sm">
          <a href="/salon/jev-controlled-probe-001.txt" className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          <a href="/salon/jev-controlled-probe-001.html" className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Light reading
          </a>
        </p>
        <pre className="mt-8 whitespace-pre-wrap border-t border-line pt-6 text-sm leading-relaxed text-fg">{sheetMeta(sheet)}</pre>
        <SiteFooter updated={jevUpdated()} />
      </div>
    </main>
  );
}
