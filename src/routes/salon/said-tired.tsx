import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import {
  SALON_013_CATEGORY,
  SALON_013_CREDIT,
  SALON_013_ENGLISH,
  SALON_013_REVIEW,
  SALON_013_SHA256,
  SALON_013_SLUG,
  SALON_013_STATUS,
  SALON_013_TEXT,
  SALON_013_TITLE,
  salon013Updated,
} from "@/lib/play/salon-013";

export const Route = createFileRoute("/salon/said-tired")({
  head: () =>
    pageMeta(
      `${SALON_013_TITLE} · Salon · Play`,
      "SALON-013 v0.1. Category 記. Filed at Tuzi's request. In-circle six-runner note. Not peer-reviewed. Not posted to X. The proof-table ledger is unchanged.",
    ),
  component: Salon013Page,
});

function Salon013Page() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm">
          <Link to="/salon" className="text-fg underline decoration-1 underline-offset-4">
            文 · Salon
          </Link>
        </p>
        <p className="mt-6 text-sm text-muted">ID: SALON-013 · {SALON_013_CATEGORY}</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-fg">{SALON_013_TITLE}</h1>
        <p className="mt-2 text-sm text-muted">{SALON_013_ENGLISH}</p>
        <p className="mt-4 text-sm text-muted">STATUS: {SALON_013_STATUS}</p>
        <p className="mt-1 text-sm text-muted">CREDIT: {SALON_013_CREDIT}</p>
        <p className="mt-1 text-sm text-muted">REVIEW_NATURE: {SALON_013_REVIEW}</p>
        <p className="mt-1 text-sm text-muted">TEXT_SHA256: {SALON_013_SHA256}</p>
        <p className="mt-1 text-sm text-muted">Not posted to X. The proof-table ledger is unchanged.</p>
        <pre className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-fg">{SALON_013_TEXT}</pre>
        <p className="mt-8 text-sm">
          <a href={`/salon/${SALON_013_SLUG}.txt`} className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          <a href={`/salon/${SALON_013_SLUG}.html`} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Light reading
          </a>
        </p>
        <SiteFooter updated={salon013Updated()} publishedLabel="Site first published: 2026-09-17" />
      </div>
    </main>
  );
}
