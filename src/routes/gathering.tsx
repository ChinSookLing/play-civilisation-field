import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { PlainFacts } from "@/components/play/PlainFacts";
import { gatheringListText } from "@/lib/play/rooms";
import { pageMeta } from "@/lib/play/page-meta";

export const Route = createFileRoute("/gathering")({
  head: () => pageMeta("Gathering · Play · Civilisation Field", "The list of gatherings. Dinner 001 is a practice."),
  component: GatheringList,
});

const GATHERINGS = [
  {
    id: "DINNER-001",
    title: "Together · Dinner 001",
    note: "Practice. Tuzi’s MoonLight Balcony. Not a Field gathering.",
    table: "/gathering/dinner-001/table",
    html: "/gathering/dinner-001",
    plain: "/gathering/dinner-001.txt",
  },
] as const;

function GatheringList() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-xs tracking-[0.18em] text-muted uppercase">Civilisation Field · Play</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">聚 · Gathering</h1>
        <p className="mt-4 text-base leading-relaxed text-fg">This page lists the gatherings. Each one has its own table.</p>
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {GATHERINGS.map((item) => (
            <li key={item.id} className="py-4">
              <p className="font-display text-2xl">{item.title}</p>
              <p className="mt-1 text-sm text-muted">{item.note}</p>
              <p className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                <Link to={item.table} className="text-fg underline-offset-2 hover:underline">Table</Link>
                <a href={item.html} className="text-fg underline-offset-2 hover:underline">HTML transcript</a>
                <a href={item.plain} className="text-fg underline-offset-2 hover:underline">Plain text</a>
              </p>
            </li>
          ))}
        </ul>
        <PlainFacts text={gatheringListText()} />
        <SiteFooter />
      </div>
    </main>
  );
}
