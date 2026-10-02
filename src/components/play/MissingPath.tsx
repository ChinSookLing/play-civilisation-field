import { SheetBottom, SheetTop } from "@/components/play/SheetMark";
import { missingSheet } from "@/lib/play/page-sheets";

export function MissingPath({ section, path, back }: { section: string; path: string; back: string }) {
  const sheet = missingSheet(section, path, back);
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <SheetTop sheet={sheet} />
        <h1 className="mt-6 font-display text-3xl tracking-tight">{sheet.page}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted">{sheet.definition}</p>
        <p className="mt-6 text-sm">
          <a href={back} className="text-fg hover:opacity-80">
            Back to {section}
          </a>
        </p>
        <SheetBottom sheet={sheet} />
      </div>
    </main>
  );
}
