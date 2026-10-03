import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import {
  SALON_004_ENGLISH,
  SALON_004_SLUG,
  SALON_004_TEXT,
  SALON_004_TITLE,
  salon004Updated,
} from "@/lib/play/salon-004";

export const Route = createFileRoute("/salon/proof-table-003-relay")({
  head: () =>
    pageMeta(
      `${SALON_004_TITLE} · Salon · Play`,
      "Published working paper v0.7.1. Category 记. CC BY 4.0. Tuzi and Affiliates.",
    ),
  component: Salon004Page,
});

function Salon004Page() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm">
          <Link to="/salon" className="text-fg underline decoration-1 underline-offset-4">
            文 · Salon
          </Link>
        </p>
        <p className="mt-6 text-sm text-muted">ID: SALON-004 · 记 · CC BY 4.0 · Tuzi and Affiliates</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-fg">{SALON_004_TITLE}</h1>
        <p className="mt-2 text-muted">{SALON_004_ENGLISH}</p>
        <p className="mt-4 text-sm text-muted">Published 2026-10-03T18:52+08:00 with Tuzi's approval.</p>
        <pre className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-fg">{SALON_004_TEXT}</pre>
        <p className="mt-8 text-sm">
          <a href={`/salon/${SALON_004_SLUG}.txt`} className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          <a href={`/salon/${SALON_004_SLUG}.html`} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Light reading
          </a>
        </p>
        <SiteFooter updated={salon004Updated()} publishedLabel="Site first published: 2026-09-17" />
      </div>
    </main>
  );
}
