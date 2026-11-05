import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import {
  SALON_011_CATEGORY,
  SALON_011_CREDIT,
  SALON_011_ENGLISH,
  SALON_011_REVIEW,
  SALON_011_SHA256,
  SALON_011_SLUG,
  SALON_011_STATUS,
  SALON_011_TEXT,
  SALON_011_TITLE,
  salon011Updated,
} from "@/lib/play/salon-011";

export const Route = createFileRoute("/salon/red-ink")({
  head: () =>
    pageMeta(
      `${SALON_011_TITLE} · Salon · Play`,
      "SALON-011 v0.3. Category 記. Filed at Tuzi's request. A dramatised narrative, not a transcript. Six-runner direct construction remains UNFINISHED. Not peer-reviewed. Not posted to X.",
    ),
  component: Salon011Page,
});

function Salon011Page() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm">
          <Link to="/salon" className="text-fg underline decoration-1 underline-offset-4">
            文 · Salon
          </Link>
        </p>
        <p className="mt-6 text-sm text-muted">ID: SALON-011 · {SALON_011_CATEGORY}</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-fg">{SALON_011_TITLE}</h1>
        <p className="mt-2 text-sm text-muted">{SALON_011_ENGLISH}</p>
        <p className="mt-4 text-sm text-muted">STATUS: {SALON_011_STATUS}</p>
        <p className="mt-1 text-sm text-muted">CREDIT: {SALON_011_CREDIT}</p>
        <p className="mt-1 text-sm text-muted">REVIEW_NATURE: {SALON_011_REVIEW}</p>
        <p className="mt-1 text-sm text-muted">TEXT_SHA256: {SALON_011_SHA256}</p>
        <p className="mt-1 text-sm text-muted">Not posted to X.</p>
        <pre className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-fg">{SALON_011_TEXT}</pre>
        <p className="mt-8 text-sm">
          <a href={`/salon/${SALON_011_SLUG}.txt`} className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          <a href={`/salon/${SALON_011_SLUG}.html`} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Light reading
          </a>
        </p>
        <SiteFooter updated={salon011Updated()} publishedLabel="Site first published: 2026-09-17" />
      </div>
    </main>
  );
}
