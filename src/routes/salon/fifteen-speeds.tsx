import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import {
  SALON_005_CAPTION,
  SALON_005_CATEGORY,
  SALON_005_CREDIT,
  SALON_005_LICENSE,
  SALON_005_REVIEW,
  SALON_005_SLUG,
  SALON_005_STATUS,
  SALON_005_TITLE,
  SALON_005_VERSION,
  salon005Parts,
  salon005Updated,
} from "@/lib/play/salon-005";

export const Route = createFileRoute("/salon/fifteen-speeds")({
  head: () =>
    pageMeta(
      `${SALON_005_TITLE} · Salon · Play`,
      "SALON-005 v0.2. Category 记. CC BY 4.0. Tuzi and Affiliates.",
    ),
  component: Salon005Page,
});

function Salon005Page() {
  const { before, after } = salon005Parts();
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm">
          <Link to="/salon" className="text-fg underline decoration-1 underline-offset-4">
            文 · Salon
          </Link>
        </p>
        <p className="mt-6 text-sm text-muted">
          ID: SALON-005 · {SALON_005_CATEGORY} · {SALON_005_LICENSE}
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-fg">{SALON_005_TITLE}</h1>
        <p className="mt-4 text-sm text-muted">STATUS: {SALON_005_STATUS}</p>
        <p className="mt-1 text-sm text-muted">VERSION: {SALON_005_VERSION}</p>
        <p className="mt-1 text-sm text-muted">CREDIT: {SALON_005_CREDIT}</p>
        <p className="mt-1 text-sm text-muted">REVIEW_TUZI: {SALON_005_REVIEW}</p>
        <pre className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-fg">{before}</pre>
        <figure className="mt-8 bg-white p-4 text-black">
          <img src="/figures/SALON-005-fig1-sixteen-points.svg" alt={SALON_005_CAPTION} className="mx-auto w-full max-w-md" />
          <figcaption className="mt-3 text-sm leading-relaxed">{SALON_005_CAPTION}</figcaption>
        </figure>
        <pre className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-fg">{after}</pre>
        <p className="mt-8 text-sm">
          <a href={`/salon/${SALON_005_SLUG}.txt`} className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          <a href={`/salon/${SALON_005_SLUG}.html`} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Light reading
          </a>
        </p>
        <SiteFooter updated={salon005Updated()} publishedLabel="Site first published: 2026-09-17" />
      </div>
    </main>
  );
}
