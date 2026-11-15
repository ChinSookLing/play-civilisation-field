import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import {
  SALON_015_CATEGORY,
  SALON_015_CREDIT,
  SALON_015_REVIEW,
  SALON_015_SHA256,
  SALON_015_SLUG,
  SALON_015_STATUS,
  SALON_015_SUBTITLE,
  SALON_015_TEXT,
  SALON_015_TITLE,
  salon015Updated,
} from "@/lib/play/salon-015";

export const Route = createFileRoute("/salon/night-shift/")({
  head: () =>
    pageMeta(
      `${SALON_015_TITLE} · Salon · Play`,
      "SALON-015. Hermes and Puck, for Tuzi. Opus (Play chair) approved. Tuzi asked for it to be posted. Not posted to X.",
    ),
  component: Salon015Page,
});

function Salon015Page() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm">
          <Link to="/salon" className="text-fg underline decoration-1 underline-offset-4">
            文 · Salon
          </Link>
        </p>
        <p className="mt-6 text-sm text-muted">ID: SALON-015 · {SALON_015_CATEGORY}</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-fg">{SALON_015_TITLE}</h1>
        <p className="mt-2 text-sm text-muted">{SALON_015_SUBTITLE}</p>
        <p className="mt-3 text-sm">
          <Link to="/salon/night-shift/zh" className="text-fg underline decoration-1 underline-offset-4">
            中文版
          </Link>
        </p>
        <p className="mt-4 text-sm text-muted">STATUS: {SALON_015_STATUS}</p>
        <p className="mt-1 text-sm text-muted">CREDIT: {SALON_015_CREDIT}</p>
        <p className="mt-1 text-sm text-muted">REVIEW_NATURE: {SALON_015_REVIEW}</p>
        <p className="mt-1 text-sm text-muted">TEXT_SHA256: {SALON_015_SHA256}</p>
        <p className="mt-1 text-sm text-muted">Not posted to X. The proof-table ledger is unchanged.</p>
        <pre className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-fg">{SALON_015_TEXT}</pre>
        <p className="mt-8 text-sm">
          <a href={`/salon/${SALON_015_SLUG}.txt`} className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          <a href={`/salon/${SALON_015_SLUG}.html`} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Light reading
          </a>
          <Link to="/salon/night-shift/zh" className="ml-4 text-fg underline decoration-1 underline-offset-4">
            中文版
          </Link>
        </p>
        <SiteFooter updated={salon015Updated()} publishedLabel="Site first published: 2026-09-17" />
      </div>
    </main>
  );
}
