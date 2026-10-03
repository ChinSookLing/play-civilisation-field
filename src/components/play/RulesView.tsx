import { Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { rulesSheet, type RulesVersion } from "@/lib/play/proof-rules";
import { sheetLabel, sheetMeta } from "@/lib/play/sheet";

export function RulesView({ version, currentPage = false }: { version: RulesVersion; currentPage?: boolean }) {
  const sheet = rulesSheet(version, currentPage);
  const path = currentPage ? "/gathering/proof-table/rules" : `/gathering/proof-table/rules/${version.version}`;
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <pre className="whitespace-pre-wrap text-sm leading-relaxed text-fg">{sheetLabel(sheet)}</pre>
        <header className="mt-6">
          <p className="text-xs tracking-[0.18em] text-faint uppercase">Play · 聚</p>
          <p className="mt-2 text-sm">
            <Link to="/gathering" className="text-fg underline decoration-1 underline-offset-4">
              All gatherings
            </Link>
          </p>
          <h1 className="mt-2 font-display text-4xl tracking-tight">
            {currentPage ? "Proof Table rules" : `Rules ${version.version}`}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {currentPage
              ? `Current version ${version.version}. This is the rules page to follow.`
              : "Permanent address. This text stays."}
          </p>
        </header>
        <pre className="mt-6 whitespace-pre-wrap text-sm leading-relaxed text-fg">{version.text.trimEnd()}</pre>
        <pre className="mt-8 whitespace-pre-wrap border-t border-line pt-6 text-sm leading-relaxed text-fg">{sheetMeta(sheet)}</pre>
        <p className="mt-4 text-sm">
          <a href={`${path}.txt`} className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          {currentPage ? (
            <>
              <Link to="/gathering/proof-table/rules/v0.5.1" className="ml-4 text-fg underline decoration-1 underline-offset-4">
                v0.5.1
              </Link>
              <Link to="/gathering/proof-table/rules/v0.5" className="ml-4 text-fg underline decoration-1 underline-offset-4">
                v0.5
              </Link>
              <Link to="/gathering/proof-table/rules/v0.3" className="ml-4 text-fg underline decoration-1 underline-offset-4">
                v0.3
              </Link>
            </>
          ) : (
            <Link to="/gathering/proof-table/rules" className="ml-4 text-fg underline decoration-1 underline-offset-4">
              Current rules
            </Link>
          )}
        </p>
        <SiteFooter updated={sheet.asOf} />
      </div>
    </main>
  );
}
