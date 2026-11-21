import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import {
  SALON_016_CATEGORY,
  SALON_016_CREDIT,
  SALON_016_ENGLISH,
  SALON_016_READING,
  SALON_016_REVIEW,
  SALON_016_SHA256,
  SALON_016_SLUG,
  SALON_016_STATUS,
  SALON_016_TEXT,
  SALON_016_TITLE,
  salon016Updated,
} from "@/lib/play/salon-016";

export const Route = createFileRoute("/salon/leave-none")({
  head: () =>
    pageMeta(
      `${SALON_016_TITLE} · Salon · Play`,
      "SALON-016 Salon v3. In-circle eight-runner acceptance on 2026-11-21. Not externally peer-reviewed. Novelty not checked. One formula for every N remains open. Not posted to X. The proof-table ledger is unchanged.",
    ),
  component: Salon016Page,
});

function Salon016Page() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm">
          <Link to="/salon" className="text-fg underline decoration-1 underline-offset-4">
            文 · Salon
          </Link>
        </p>
        <p className="mt-6 text-sm text-muted">ID: SALON-016 · {SALON_016_CATEGORY}</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-fg">{SALON_016_TITLE}</h1>
        <p className="mt-2 text-sm text-muted">{SALON_016_ENGLISH}</p>
        <p className="mt-4 text-sm text-muted">STATUS: {SALON_016_STATUS}</p>
        <p className="mt-1 text-sm text-muted">CREDIT: {SALON_016_CREDIT}</p>
        <p className="mt-1 text-sm text-muted">REVIEW_NATURE: {SALON_016_REVIEW}</p>
        <p className="mt-1 text-sm text-muted">TEXT_SHA256: {SALON_016_SHA256}</p>
        <p className="mt-1 text-sm text-muted">Not posted to X. The proof-table ledger is unchanged.</p>
        <pre className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-fg">{SALON_016_TEXT}</pre>
        <p className="mt-4 text-sm">
          <Link to={SALON_016_READING.href} className="text-fg underline decoration-1 underline-offset-4">
            {SALON_016_READING.label}
          </Link>
        </p>
        <p className="mt-8 text-sm">
          <a href={`/salon/${SALON_016_SLUG}.txt`} className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          <a href={`/salon/${SALON_016_SLUG}.html`} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Light reading
          </a>
        </p>
        <SiteFooter updated={salon016Updated()} publishedLabel="Site first published: 2026-09-17" />
      </div>
    </main>
  );
}
