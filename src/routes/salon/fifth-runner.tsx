import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import {
  SALON_008_CATEGORY,
  SALON_008_CREDIT,
  SALON_008_ENGLISH,
  SALON_008_REVIEW,
  SALON_008_SHA256,
  SALON_008_SLUG,
  SALON_008_STATUS,
  SALON_008_TEXT,
  SALON_008_TITLE,
  salon008Updated,
} from "@/lib/play/salon-008";

export const Route = createFileRoute("/salon/fifth-runner")({
  head: () =>
    pageMeta(
      `${SALON_008_TITLE} · Salon · Play`,
      "SALON-008 v0.1. Category 記. Filed. Approved by Tuzi. Review still pending. Not peer-reviewed. Not posted to X.",
    ),
  component: Salon008Page,
});

function Salon008Page() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm">
          <Link to="/salon" className="text-fg underline decoration-1 underline-offset-4">
            文 · Salon
          </Link>
        </p>
        <p className="mt-6 text-sm text-muted">ID: SALON-008 · {SALON_008_CATEGORY}</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-fg">{SALON_008_TITLE}</h1>
        <p className="mt-2 text-sm text-muted">{SALON_008_ENGLISH}</p>
        <p className="mt-4 text-sm text-muted">STATUS: {SALON_008_STATUS}</p>
        <p className="mt-1 text-sm text-muted">CREDIT: {SALON_008_CREDIT}</p>
        <p className="mt-1 text-sm text-muted">REVIEW_NATURE: {SALON_008_REVIEW}</p>
        <p className="mt-1 text-sm text-muted">TEXT_SHA256: {SALON_008_SHA256}</p>
        <p className="mt-1 text-sm text-muted">Not posted to X.</p>
        <pre className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-fg">{SALON_008_TEXT}</pre>
        <p className="mt-8 text-sm">
          <a href={`/salon/${SALON_008_SLUG}.txt`} className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          <a href={`/salon/${SALON_008_SLUG}.html`} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Light reading
          </a>
        </p>
        <SiteFooter updated={salon008Updated()} publishedLabel="Site first published: 2026-09-17" />
      </div>
    </main>
  );
}
