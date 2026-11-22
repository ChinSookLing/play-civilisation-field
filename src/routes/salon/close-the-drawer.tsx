import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import {
  SALON_018_CATEGORY,
  SALON_018_CREDIT,
  SALON_018_ENGLISH,
  SALON_018_READING,
  SALON_018_REVIEW,
  SALON_018_SHA256,
  SALON_018_SLUG,
  SALON_018_STATUS,
  SALON_018_TEXT,
  SALON_018_TITLE,
  salon018Updated,
} from "@/lib/play/salon-018";

export const Route = createFileRoute("/salon/close-the-drawer")({
  head: () =>
    pageMeta(
      `${SALON_018_TITLE} · Salon · Play`,
      "SALON-018 v0.2. Dramatised narrative, not a transcript. G19 (C46) and G20 (C48) were re-run by the chair. The T5 real join is a derived candidate, pending an independent boundary check. Not externally peer-reviewed. Not posted to X. The proof-table ledger is unchanged.",
    ),
  component: Salon018Page,
});

function Salon018Page() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm">
          <Link to="/salon" className="text-fg underline decoration-1 underline-offset-4">
            文 · Salon
          </Link>
        </p>
        <p className="mt-6 text-sm text-muted">ID: SALON-018 · {SALON_018_CATEGORY}</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-fg">{SALON_018_TITLE}</h1>
        <p className="mt-2 text-sm text-muted">{SALON_018_ENGLISH}</p>
        <p className="mt-4 text-sm text-muted">STATUS: {SALON_018_STATUS}</p>
        <p className="mt-1 text-sm text-muted">CREDIT: {SALON_018_CREDIT}</p>
        <p className="mt-1 text-sm text-muted">REVIEW_NATURE: {SALON_018_REVIEW}</p>
        <p className="mt-1 text-sm text-muted">TEXT_SHA256: {SALON_018_SHA256}</p>
        <p className="mt-1 text-sm text-muted">Not posted to X. The proof-table ledger is unchanged.</p>
        <pre className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-fg">{SALON_018_TEXT}</pre>
        <p className="mt-4 text-sm">
          <Link to={SALON_018_READING.href} className="text-fg underline decoration-1 underline-offset-4">
            {SALON_018_READING.label}
          </Link>
        </p>
        <p className="mt-8 text-sm">
          <a href={`/salon/${SALON_018_SLUG}.txt`} className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          <a href={`/salon/${SALON_018_SLUG}.html`} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Light reading
          </a>
        </p>
        <SiteFooter updated={salon018Updated()} publishedLabel="Site first published: 2026-09-17" />
      </div>
    </main>
  );
}
