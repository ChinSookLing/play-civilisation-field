import { SheetBottom, SheetTop } from "@/components/play/SheetMark";
import type { Sheet } from "@/lib/play/sheet";

export type RoomItem = {
  href: string;
  title: string;
  note: string;
  status?: string;
  light?: string;
};

export function RoomIndex({
  mark,
  title,
  intro,
  sections,
  sheet,
}: {
  mark: string;
  title: string;
  intro: string;
  sections: { heading?: string; items: RoomItem[] }[];
  sheet: Sheet;
}) {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <SheetTop sheet={sheet} />
        <p className="text-xs tracking-[0.18em] text-muted uppercase">Civilisation Field · {mark}</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">{title}</h1>
        <p className="mt-4 text-base leading-relaxed text-fg">{intro}</p>
        {sections.map((section) => (
          <section key={section.heading ?? "items"} className="mt-8">
            {section.heading ? <h2 className="font-display text-2xl">{section.heading}</h2> : null}
            {section.items.length === 0 ? (
              <p className="mt-3 text-base text-muted">Nothing inside yet.</p>
            ) : (
              <ul className={`${section.heading ? "mt-3" : ""} divide-y divide-line border-y border-line`}>
                {section.items.map((item) => (
                  <li key={item.href} className="py-4">
                    <a href={item.href} className="font-display text-2xl text-fg underline decoration-1 underline-offset-4">
                      {item.title}
                    </a>
                    {item.status ? <p className="mt-1 text-sm text-fg">{item.status}</p> : null}
                    <p className="mt-1 text-sm text-muted">{item.note}</p>
                    {item.light ? (
                      <p className="mt-2 text-sm">
                        <a href={item.light} className="text-fg underline decoration-1 underline-offset-4">Light reading</a>
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
        <SheetBottom sheet={sheet} />
      </div>
    </main>
  );
}
