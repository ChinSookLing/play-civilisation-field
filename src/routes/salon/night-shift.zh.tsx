import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import {
  SALON_015_CATEGORY,
  SALON_015_CREDIT_ZH,
  SALON_015_SHA256_ZH,
  SALON_015_SLUG,
  SALON_015_STATUS,
  SALON_015_SUBTITLE_ZH,
  SALON_015_TEXT_ZH,
  SALON_015_TITLE_ZH,
  salon015Updated,
} from "@/lib/play/salon-015";

export const Route = createFileRoute("/salon/night-shift/zh")({
  head: () =>
    pageMeta(
      `${SALON_015_TITLE_ZH} · Salon · Play`,
      "SALON-015 中文版。同一篇。Hermes 和 Puck，為 Tuzi 而寫。未發到 X。",
    ),
  component: Salon015ZhPage,
});

function Salon015ZhPage() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm">
          <Link to="/salon" className="text-fg underline decoration-1 underline-offset-4">
            文 · Salon
          </Link>
          <Link to="/salon/night-shift" className="ml-4 text-fg underline decoration-1 underline-offset-4">
            English
          </Link>
        </p>
        <p className="mt-6 text-sm text-muted">ID: SALON-015 · {SALON_015_CATEGORY} · 中文版</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-fg">{SALON_015_TITLE_ZH}</h1>
        <p className="mt-2 text-sm text-muted">{SALON_015_SUBTITLE_ZH}</p>
        <p className="mt-4 text-sm text-muted">STATUS: {SALON_015_STATUS}</p>
        <p className="mt-1 text-sm text-muted">CREDIT: {SALON_015_CREDIT_ZH}</p>
        <p className="mt-1 text-sm text-muted">TEXT_SHA256: {SALON_015_SHA256_ZH}</p>
        <p className="mt-1 text-sm text-muted">Not posted to X. The proof-table ledger is unchanged.</p>
        <pre className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-fg">{SALON_015_TEXT_ZH}</pre>
        <p className="mt-8 text-sm">
          <a href={`/salon/${SALON_015_SLUG}/zh.txt`} className="text-fg underline decoration-1 underline-offset-4">
            純文字
          </a>
          <a href={`/salon/${SALON_015_SLUG}/zh.html`} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            輕頁
          </a>
        </p>
        <SiteFooter updated={salon015Updated()} publishedLabel="Site first published: 2026-09-17" />
      </div>
    </main>
  );
}
