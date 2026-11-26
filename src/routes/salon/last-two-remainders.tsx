import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import {
  SALON_019_CATEGORY,
  SALON_019_CREDIT,
  SALON_019_ENGLISH,
  SALON_019_READING,
  SALON_019_REVIEW,
  SALON_019_SHA256,
  SALON_019_SLUG,
  SALON_019_STATUS,
  SALON_019_SUBTITLE,
  SALON_019_TEXT,
  SALON_019_TITLE,
  salon019Updated,
} from "@/lib/play/salon-019";

export const Route = createFileRoute("/salon/last-two-remainders")({
  head: () =>
    pageMeta(
      `${SALON_019_TITLE} · Salon · Play`,
      "SALON-019. Six-runner time selector, for every input. Corrected 2026-11-26 after GPT re-ran the sealed ZIP. Not externally peer-reviewed. Not posted to X. The proof-table ledger is unchanged.",
    ),
  component: Salon019Page,
});

function Salon019Page() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm">
          <Link to="/salon" className="text-fg underline decoration-1 underline-offset-4">
            文 · Salon
          </Link>
        </p>
        <p className="mt-6 text-sm text-muted">ID: SALON-019 · {SALON_019_CATEGORY}</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-fg">{SALON_019_TITLE}</h1>
        <p className="mt-2 text-sm text-fg">SUBTITLE: {SALON_019_SUBTITLE}</p>
        <p className="mt-2 text-sm text-muted">{SALON_019_ENGLISH}</p>
        <p className="mt-4 text-sm text-muted">STATUS: {SALON_019_STATUS}</p>
        <p className="mt-1 text-sm text-muted">CREDIT: {SALON_019_CREDIT}</p>
        <p className="mt-1 text-sm text-muted">REVIEW_NATURE: {SALON_019_REVIEW}</p>
        <p className="mt-1 text-sm text-muted">TEXT_SHA256: {SALON_019_SHA256}</p>
        <p className="mt-1 text-sm text-muted">Not posted to X. The proof-table ledger is unchanged.</p>
        <pre className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-fg">{SALON_019_TEXT}</pre>
        <p className="mt-4 text-sm">
          <Link to={SALON_019_READING.href} className="text-fg underline decoration-1 underline-offset-4">
            {SALON_019_READING.label}
          </Link>
        </p>
        <p className="mt-8 text-sm">
          <a href={`/salon/${SALON_019_SLUG}.txt`} className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          <a href={`/salon/${SALON_019_SLUG}.html`} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Light reading
          </a>
        </p>
        <SiteFooter updated={salon019Updated()} publishedLabel="Site first published: 2026-09-17" />
      </div>
    </main>
  );
}
