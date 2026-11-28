import { createFileRoute, Link } from "@tanstack/react-router";
import "katex/dist/katex.min.css";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import {
  SALON_021_CATEGORY,
  SALON_021_CREDIT,
  SALON_021_ENGLISH,
  SALON_021_READING,
  SALON_021_REVIEW,
  SALON_021_SHA256,
  SALON_021_SLUG,
  SALON_021_STATUS,
  SALON_021_SUBTITLE,
  SALON_021_TITLE,
  salon021ArticleHtml,
  salon021Updated,
} from "@/lib/play/salon-021";

export const Route = createFileRoute("/salon/only-one-on-the-line")({
  head: () =>
    pageMeta(
      `${SALON_021_TITLE} · Salon · Play`,
      "SALON-021. Seven runners, integer classification C45. Not externally peer-reviewed. Not posted to X. The proof-table ledger is unchanged.",
    ),
  component: Salon021Page,
});

function Salon021Page() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm">
          <Link to="/salon" className="text-fg underline decoration-1 underline-offset-4">
            文 · Salon
          </Link>
        </p>
        <p className="mt-6 text-sm text-muted">ID: SALON-021 · {SALON_021_CATEGORY}</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-fg">{SALON_021_TITLE}</h1>
        <p className="mt-2 text-sm text-fg">SUBTITLE: {SALON_021_SUBTITLE}</p>
        <p className="mt-2 text-sm text-muted">{SALON_021_ENGLISH}</p>
        <p className="mt-4 text-sm text-muted">STATUS: {SALON_021_STATUS}</p>
        <p className="mt-1 text-sm text-muted">CREDIT: {SALON_021_CREDIT}</p>
        <p className="mt-1 text-sm text-muted">REVIEW_NATURE: {SALON_021_REVIEW}</p>
        <p className="mt-1 text-sm text-muted">TEXT_SHA256: {SALON_021_SHA256}</p>
        <p className="mt-1 text-sm text-muted">Not posted to X. The proof-table ledger is unchanged.</p>
        <article
          className="mt-8 text-sm leading-relaxed [&_h1]:mt-2 [&_h1]:text-2xl [&_h2]:mt-8 [&_h2]:text-xl [&_p]:mt-4 [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: salon021ArticleHtml() }}
        />
        <p className="mt-4 text-sm">
          <Link to={SALON_021_READING.href} className="text-fg underline decoration-1 underline-offset-4">
            {SALON_021_READING.label}
          </Link>
        </p>
        <p className="mt-8 text-sm">
          <a href={`/salon/${SALON_021_SLUG}.txt`} className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          <a href={`/salon/${SALON_021_SLUG}.md`} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Markdown
          </a>
          <a href={`/salon/${SALON_021_SLUG}.html`} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Light reading
          </a>
        </p>
        <SiteFooter updated={salon021Updated()} publishedLabel="Site first published: 2026-09-17" />
      </div>
    </main>
  );
}
