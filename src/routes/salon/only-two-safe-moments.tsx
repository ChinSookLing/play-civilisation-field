import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import {
  SALON_020_CATEGORY,
  SALON_020_CREDIT,
  SALON_020_ENGLISH,
  SALON_020_READING,
  SALON_020_REVIEW,
  SALON_020_SHA256,
  SALON_020_SLUG,
  SALON_020_STATUS,
  SALON_020_SUBTITLE,
  SALON_020_TITLE,
  salon020Story,
  salon020Updated,
} from "@/lib/play/salon-020";

export const Route = createFileRoute("/salon/only-two-safe-moments")({
  head: () =>
    pageMeta(
      `${SALON_020_TITLE} · Salon · Play`,
      "SALON-020. Two isolated safe times for six runners. Not externally peer-reviewed. Not posted to X. The proof-table ledger is unchanged.",
    ),
  component: Salon020Page,
});

function Rich({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\(https:\/\/[^)\s]+\))/gu;
  let index = 0;
  let key = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > index) nodes.push(text.slice(index, start));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else {
      const close = token.indexOf("](");
      nodes.push(
        <a key={key} href={token.slice(close + 2, -1)} className="text-fg underline decoration-1 underline-offset-4">
          {token.slice(1, close)}
        </a>,
      );
    }
    key += 1;
    index = start + token.length;
  }
  if (index < text.length) nodes.push(text.slice(index));
  return <>{nodes}</>;
}

function Salon020Page() {
  const story = salon020Story();
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm">
          <Link to="/salon" className="text-fg underline decoration-1 underline-offset-4">
            文 · Salon
          </Link>
        </p>
        <p className="mt-6 text-sm text-muted">ID: SALON-020 · {SALON_020_CATEGORY}</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-fg">{SALON_020_TITLE}</h1>
        <p className="mt-2 text-sm text-fg">SUBTITLE: {SALON_020_SUBTITLE}</p>
        <p className="mt-2 text-sm text-muted">{SALON_020_ENGLISH}</p>
        <p className="mt-4 text-sm text-muted">STATUS: {SALON_020_STATUS}</p>
        <p className="mt-1 text-sm text-muted">CREDIT: {SALON_020_CREDIT}</p>
        <p className="mt-1 text-sm text-muted">REVIEW_NATURE: {SALON_020_REVIEW}</p>
        <p className="mt-1 text-sm text-muted">TEXT_SHA256: {SALON_020_SHA256}</p>
        <p className="mt-1 text-sm text-muted">Not posted to X. The proof-table ledger is unchanged.</p>
        <article className="mt-8 text-sm leading-relaxed">
          {story.map((node, index) => {
            if (node.kind === "h1") return null;
            if (node.kind === "figure") {
              return (
                <figure key={index} className="my-6">
                  <img src={node.src} alt={node.alt} className="w-full border border-line" />
                  {node.caption ? <figcaption className="mt-2 text-sm text-muted">{node.caption}</figcaption> : null}
                </figure>
              );
            }
            return (
              <p key={index} className="mt-4">
                <Rich text={node.text} />
              </p>
            );
          })}
        </article>
        <p className="mt-4 text-sm">
          <Link to={SALON_020_READING.href} className="text-fg underline decoration-1 underline-offset-4">
            {SALON_020_READING.label}
          </Link>
        </p>
        <p className="mt-8 text-sm">
          <a href={`/salon/${SALON_020_SLUG}.txt`} className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          <a href={`/salon/${SALON_020_SLUG}.md`} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Markdown
          </a>
          <a href={`/salon/${SALON_020_SLUG}.html`} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Light reading
          </a>
        </p>
        <SiteFooter updated={salon020Updated()} publishedLabel="Site first published: 2026-09-17" />
      </div>
    </main>
  );
}
