import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import {
  SALON_009_CATEGORY,
  SALON_009_CREDIT,
  SALON_009_ENGLISH,
  SALON_009_REVIEW,
  SALON_009_SHA256,
  SALON_009_SLUG,
  SALON_009_STATUS,
  SALON_009_TEXT,
  SALON_009_TITLE,
  salon009Updated,
} from "@/lib/play/salon-009";

export const Route = createFileRoute("/salon/changed-shifts")({
  head: () =>
    pageMeta(
      `${SALON_009_TITLE} · Salon · Play`,
      "SALON-009 v0.1. Category 記. Filed. Approved by Tuzi. A narrative, not a transcript. Not peer-reviewed. Not posted to X.",
    ),
  component: Salon009Page,
});

function Salon009Page() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm">
          <Link to="/salon" className="text-fg underline decoration-1 underline-offset-4">
            文 · Salon
          </Link>
        </p>
        <p className="mt-6 text-sm text-muted">ID: SALON-009 · {SALON_009_CATEGORY}</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-fg">{SALON_009_TITLE}</h1>
        <p className="mt-2 text-sm text-muted">{SALON_009_ENGLISH}</p>
        <p className="mt-4 text-sm text-muted">STATUS: {SALON_009_STATUS}</p>
        <p className="mt-1 text-sm text-muted">CREDIT: {SALON_009_CREDIT}</p>
        <p className="mt-1 text-sm text-muted">REVIEW_NATURE: {SALON_009_REVIEW}</p>
        <p className="mt-1 text-sm text-muted">TEXT_SHA256: {SALON_009_SHA256}</p>
        <p className="mt-1 text-sm text-muted">Not posted to X.</p>
        <pre className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-fg">{SALON_009_TEXT}</pre>
        <p className="mt-8 text-sm">
          <a href={`/salon/${SALON_009_SLUG}.txt`} className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          <a href={`/salon/${SALON_009_SLUG}.html`} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Light reading
          </a>
        </p>
        <SiteFooter updated={salon009Updated()} publishedLabel="Site first published: 2026-09-17" />
      </div>
    </main>
  );
}
