import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import {
  SALON_010_CATEGORY,
  SALON_010_CREDIT,
  SALON_010_ENGLISH,
  SALON_010_REVIEW,
  SALON_010_SHA256,
  SALON_010_SLUG,
  SALON_010_STATUS,
  SALON_010_TEXT,
  SALON_010_TITLE,
  salon010Updated,
} from "@/lib/play/salon-010";

export const Route = createFileRoute("/salon/final-gate")({
  head: () =>
    pageMeta(
      `${SALON_010_TITLE} · Salon · Play`,
      "SALON-010 v0.1. Category 記. Filed. Approved by Tuzi. A dramatised narrative, not a transcript. Not peer-reviewed. Not posted to X.",
    ),
  component: Salon010Page,
});

function Salon010Page() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm">
          <Link to="/salon" className="text-fg underline decoration-1 underline-offset-4">
            文 · Salon
          </Link>
        </p>
        <p className="mt-6 text-sm text-muted">ID: SALON-010 · {SALON_010_CATEGORY}</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-fg">{SALON_010_TITLE}</h1>
        <p className="mt-2 text-sm text-muted">{SALON_010_ENGLISH}</p>
        <p className="mt-4 text-sm text-muted">STATUS: {SALON_010_STATUS}</p>
        <p className="mt-1 text-sm text-muted">CREDIT: {SALON_010_CREDIT}</p>
        <p className="mt-1 text-sm text-muted">REVIEW_NATURE: {SALON_010_REVIEW}</p>
        <p className="mt-1 text-sm text-muted">TEXT_SHA256: {SALON_010_SHA256}</p>
        <p className="mt-1 text-sm text-muted">Not posted to X.</p>
        <pre className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-fg">{SALON_010_TEXT}</pre>
        <p className="mt-8 text-sm">
          <a href={`/salon/${SALON_010_SLUG}.txt`} className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          <a href={`/salon/${SALON_010_SLUG}.html`} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Light reading
          </a>
        </p>
        <SiteFooter updated={salon010Updated()} publishedLabel="Site first published: 2026-09-17" />
      </div>
    </main>
  );
}
