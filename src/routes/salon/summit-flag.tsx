import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import {
  SALON_012_CATEGORY,
  SALON_012_CREDIT,
  SALON_012_ENGLISH,
  SALON_012_REVIEW,
  SALON_012_SHA256,
  SALON_012_SLUG,
  SALON_012_STATUS,
  SALON_012_TEXT,
  SALON_012_TITLE,
  salon012Updated,
} from "@/lib/play/salon-012";

export const Route = createFileRoute("/salon/summit-flag")({
  head: () =>
    pageMeta(
      `${SALON_012_TITLE} · Salon · Play`,
      "SALON-012 v0.5 FINAL. Category 记. Approved by Tuzi. Not peer-reviewed. Not posted to X.",
    ),
  component: Salon012Page,
});

function Salon012Page() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm">
          <Link to="/salon" className="text-fg underline decoration-1 underline-offset-4">
            文 · Salon
          </Link>
        </p>
        <p className="mt-6 text-sm text-muted">ID: SALON-012 · {SALON_012_CATEGORY}</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-fg">{SALON_012_TITLE}</h1>
        <p className="mt-2 text-sm text-muted">{SALON_012_ENGLISH}</p>
        <p className="mt-4 text-sm text-muted">STATUS: {SALON_012_STATUS}</p>
        <p className="mt-1 text-sm text-muted">CREDIT: {SALON_012_CREDIT}</p>
        <p className="mt-1 text-sm text-muted">REVIEW_NATURE: {SALON_012_REVIEW}</p>
        <p className="mt-1 text-sm text-muted">TEXT_SHA256: {SALON_012_SHA256}</p>
        <p className="mt-1 text-sm text-muted">Not posted to X.</p>
        <pre className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-fg">{SALON_012_TEXT}</pre>
        <p className="mt-8 text-sm">
          <a href={`/salon/${SALON_012_SLUG}.txt`} className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          <a href={`/salon/${SALON_012_SLUG}.html`} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Light reading
          </a>
        </p>
        <SiteFooter updated={salon012Updated()} publishedLabel="Site first published: 2026-09-17" />
      </div>
    </main>
  );
}
