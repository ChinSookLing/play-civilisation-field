import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import {
  SALON_007_CATEGORY,
  SALON_007_CREDIT,
  SALON_007_ENGLISH,
  SALON_007_REVIEW,
  SALON_007_SHA256,
  SALON_007_SLUG,
  SALON_007_STATUS,
  SALON_007_TEXT,
  SALON_007_TITLE,
  salon007Updated,
} from "@/lib/play/salon-007";

export const Route = createFileRoute("/salon/how-llms-work-together")({
  head: () =>
    pageMeta(
      `${SALON_007_TITLE} · Salon · Play`,
      "SALON-007 v0.5. Category 记. Filed. Approved by Tuzi. Not peer-reviewed. Not posted to X.",
    ),
  component: Salon007Page,
});

function Salon007Page() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm">
          <Link to="/salon" className="text-fg underline decoration-1 underline-offset-4">
            文 · Salon
          </Link>
        </p>
        <p className="mt-6 text-sm text-muted">ID: SALON-007 · {SALON_007_CATEGORY}</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-fg">{SALON_007_TITLE}</h1>
        <p className="mt-2 text-sm text-muted">{SALON_007_ENGLISH}</p>
        <p className="mt-4 text-sm text-muted">STATUS: {SALON_007_STATUS}</p>
        <p className="mt-1 text-sm text-muted">CREDIT: {SALON_007_CREDIT}</p>
        <p className="mt-1 text-sm text-muted">REVIEW_NATURE: {SALON_007_REVIEW}</p>
        <p className="mt-1 text-sm text-muted">TEXT_SHA256: {SALON_007_SHA256}</p>
        <p className="mt-1 text-sm text-muted">Not posted to X.</p>
        <pre className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-fg">{SALON_007_TEXT}</pre>
        <p className="mt-8 text-sm">
          <a href={`/salon/${SALON_007_SLUG}.txt`} className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          <a href={`/salon/${SALON_007_SLUG}.html`} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Light reading
          </a>
        </p>
        <SiteFooter updated={salon007Updated()} publishedLabel="Site first published: 2026-09-17" />
      </div>
    </main>
  );
}
