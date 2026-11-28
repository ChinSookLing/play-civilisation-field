import { createFileRoute, Link } from "@tanstack/react-router";
import "katex/dist/katex.min.css";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import { readArticleHtml } from "@/lib/play/read-html";
import {
  T7_C45_MANUSCRIPT,
  T7_C45_RULING,
  T7_C45_SHA256,
  T7_C45_STATUS,
  T7_C45_TITLE,
  T7_C45_ZIP,
  T7_C45_ZIP_SHA256,
  t7C45Updated,
} from "@/lib/play/proof-table-008-t7-c45";

export const Route = createFileRoute("/gathering/proof-table-008/t7-c45")({
  head: () =>
    pageMeta(
      `PT-008 · ${T7_C45_TITLE}`,
      "C45 closes the seven-runner integer classification inside the project. Q46 independent review is complete. Not externally peer-reviewed. The proof table stays OPEN.",
    ),
  component: T7C45Page,
});

function T7C45Page() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm">
          <Link to="/gathering" className="text-fg underline decoration-1 underline-offset-4">
            聚 · Gathering
          </Link>
        </p>
        <p className="mt-6 text-sm text-muted">PT-008 · Time Forge · 七跑者（T7） · C45</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-fg">{T7_C45_TITLE}</h1>
        <p className="mt-4 text-sm text-muted">STATUS: {T7_C45_STATUS}</p>
        <p className="mt-1 text-sm text-muted">MANUSCRIPT_SHA256: {T7_C45_SHA256}</p>
        <p className="mt-1 text-sm text-muted">ZIP_SHA256: {T7_C45_ZIP_SHA256}</p>
        <p className="mt-1 text-sm text-muted">Not posted to X. The proof-table ledger is unchanged. The earlier T7 page stays.</p>
        <article
          className="mt-8 text-sm leading-relaxed [&_h1]:mt-2 [&_h1]:text-2xl [&_h2]:mt-8 [&_h2]:text-xl [&_h3]:mt-8 [&_h3]:text-lg [&_p]:mt-4 [&_li]:mt-1 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5 [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-line [&_pre]:p-3 [&_pre]:font-mono [&_pre]:text-xs [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-line [&_td]:px-2 [&_td]:py-1 [&_th]:border [&_th]:border-line [&_th]:px-2 [&_th]:py-1 [&_th]:text-left [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: readArticleHtml(T7_C45_MANUSCRIPT) }}
        />
        <p className="mt-8 text-sm">
          <a href="/gathering/proof-table-008/t7-c45.txt" className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          <a href={T7_C45_RULING} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            C45–Q46
          </a>
          <a href={T7_C45_ZIP} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Evidence ZIP
          </a>
        </p>
        <SiteFooter updated={t7C45Updated()} publishedLabel="Site first published: 2026-09-17" />
      </div>
    </main>
  );
}
