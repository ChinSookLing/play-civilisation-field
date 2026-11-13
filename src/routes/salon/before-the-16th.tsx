import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import {
  SALON_014_CATEGORY,
  SALON_014_CREDIT,
  SALON_014_ENGLISH,
  SALON_014_REVIEW,
  SALON_014_SHA256,
  SALON_014_SLUG,
  SALON_014_STATUS,
  SALON_014_TEXT,
  SALON_014_TITLE,
  salon014Updated,
} from "@/lib/play/salon-014";

export const Route = createFileRoute("/salon/before-the-16th")({
  head: () =>
    pageMeta(
      `${SALON_014_TITLE} · Salon · Play`,
      "SALON-014 v0.1. Category 記. Filed at Tuzi's request. The manuscript says the seven-runner direct construction passed an in-circle ruling on 2026-11-13. Not externally peer-reviewed. Not posted to X. The proof-table ledger is unchanged.",
    ),
  component: Salon014Page,
});

function Salon014Page() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm">
          <Link to="/salon" className="text-fg underline decoration-1 underline-offset-4">
            文 · Salon
          </Link>
        </p>
        <p className="mt-6 text-sm text-muted">ID: SALON-014 · {SALON_014_CATEGORY}</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-fg">{SALON_014_TITLE}</h1>
        <p className="mt-2 text-sm text-muted">{SALON_014_ENGLISH}</p>
        <p className="mt-4 text-sm text-muted">STATUS: {SALON_014_STATUS}</p>
        <p className="mt-1 text-sm text-muted">CREDIT: {SALON_014_CREDIT}</p>
        <p className="mt-1 text-sm text-muted">REVIEW_NATURE: {SALON_014_REVIEW}</p>
        <p className="mt-1 text-sm text-muted">TEXT_SHA256: {SALON_014_SHA256}</p>
        <p className="mt-1 text-sm text-muted">Not posted to X. The proof-table ledger is unchanged.</p>
        <pre className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-fg">{SALON_014_TEXT}</pre>
        <p className="mt-8 text-sm">
          <a href={`/salon/${SALON_014_SLUG}.txt`} className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          <a href={`/salon/${SALON_014_SLUG}.html`} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Light reading
          </a>
        </p>
        <SiteFooter updated={salon014Updated()} publishedLabel="Site first published: 2026-09-17" />
      </div>
    </main>
  );
}
