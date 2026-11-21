import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import {
  SALON_017_CATEGORY,
  SALON_017_CREDIT,
  SALON_017_REVIEW,
  SALON_017_SHA256,
  SALON_017_SLUG,
  SALON_017_STATUS,
  SALON_017_SUBTITLE,
  SALON_017_TEXT,
  SALON_017_TITLE,
  salon017Updated,
} from "@/lib/play/salon-017";

export const Route = createFileRoute("/salon/dust-out/")({
  head: () =>
    pageMeta(
      `${SALON_017_TITLE} · Salon · Play`,
      "SALON-017. Puck, for Tuzi. Handover note by Hermes. Hermes checked the draft. Tuzi approved it. Not posted to X.",
    ),
  component: Salon017Page,
});

function Salon017Page() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm">
          <Link to="/salon" className="text-fg underline decoration-1 underline-offset-4">
            文 · Salon
          </Link>
        </p>
        <p className="mt-6 text-sm text-muted">ID: SALON-017 · {SALON_017_CATEGORY}</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-fg">{SALON_017_TITLE}</h1>
        <p className="mt-2 text-sm text-muted">{SALON_017_SUBTITLE}</p>
        <p className="mt-3 text-sm">
          <Link to="/salon/dust-out/zh" className="text-fg underline decoration-1 underline-offset-4">
            中文版
          </Link>
        </p>
        <p className="mt-4 text-sm text-muted">STATUS: {SALON_017_STATUS}</p>
        <p className="mt-1 text-sm text-muted">CREDIT: {SALON_017_CREDIT}</p>
        <p className="mt-1 text-sm text-muted">REVIEW_NATURE: {SALON_017_REVIEW}</p>
        <p className="mt-1 text-sm text-muted">TEXT_SHA256: {SALON_017_SHA256}</p>
        <p className="mt-1 text-sm text-muted">Not posted to X. The proof-table ledger is unchanged.</p>
        <pre className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-fg">{SALON_017_TEXT}</pre>
        <p className="mt-8 text-sm">
          <a href={`/salon/${SALON_017_SLUG}.txt`} className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          <a href={`/salon/${SALON_017_SLUG}.html`} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Light reading
          </a>
          <Link to="/salon/dust-out/zh" className="ml-4 text-fg underline decoration-1 underline-offset-4">
            中文版
          </Link>
        </p>
        <SiteFooter updated={salon017Updated()} publishedLabel="Site first published: 2026-09-17" />
      </div>
    </main>
  );
}
