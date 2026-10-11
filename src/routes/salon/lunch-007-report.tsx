import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import {
  SALON_006_REVIEW,
  SALON_006_SHA256,
  SALON_006_SLUG,
  SALON_006_STATUS,
  SALON_006_TITLE,
  SALON_006_TOC,
  salon006Chunks,
  salon006Updated,
} from "@/lib/play/salon-006";

const WALL = "https://play.civilisationfield.com/gathering/lunch-007/table";

export const Route = createFileRoute("/salon/lunch-007-report")({
  head: () =>
    pageMeta(
      `${SALON_006_TITLE} · Salon · Play`,
      "SALON-006. Lunch 007 report v4, filed verbatim. Not posted to X.",
    ),
  component: Salon006Page,
});

function Salon006Page() {
  const chunks = salon006Chunks();
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm">
          <Link to="/salon" className="text-fg underline decoration-1 underline-offset-4">
            文 · Salon
          </Link>
        </p>
        <p className="mt-6 text-sm text-muted">ID: SALON-006 · {SALON_006_STATUS}</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-fg">{SALON_006_TITLE}</h1>
        <p className="mt-4 text-sm text-muted">{SALON_006_REVIEW}</p>
        <p className="mt-4 text-sm">
          <a href={WALL} className="text-fg underline decoration-1 underline-offset-4">
            Lunch 007 wall
          </a>
          <a href={`${WALL}.txt`} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Wall plain text
          </a>
        </p>
        <p className="mt-2 text-sm text-muted">REPORT_SHA256: {SALON_006_SHA256}</p>
        <nav className="mt-8">
          <p className="text-sm text-muted">目录</p>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm">
            {SALON_006_TOC.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-fg underline decoration-1 underline-offset-4">
                  {item.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <article className="mt-10">
          {chunks.map((chunk, index) => (
            <section key={chunk.id ?? `preface-${index}`}>
              {chunk.heading ? (
                <h2 id={chunk.id ?? undefined} className="mt-10 font-display text-2xl tracking-tight text-fg">
                  {chunk.heading}
                </h2>
              ) : null}
              {chunk.body.length > 0 ? (
                <pre className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-fg">{chunk.body}</pre>
              ) : null}
            </section>
          ))}
        </article>
        <p className="mt-8 text-sm">
          <a href={`/salon/${SALON_006_SLUG}.txt`} className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          <a href={`/salon/${SALON_006_SLUG}.html`} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Light reading
          </a>
        </p>
        <SiteFooter updated={salon006Updated()} publishedLabel="Site first published: 2026-09-17" />
      </div>
    </main>
  );
}
