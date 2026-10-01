import { SiteFooter } from "@/components/play/SiteFooter";
import { PlainFacts } from "@/components/play/PlainFacts";

export type RoomItem = {
  href: string;
  title: string;
  note: string;
};

export function RoomIndex({
  mark,
  title,
  intro,
  sections,
  facts,
}: {
  mark: string;
  title: string;
  intro: string;
  sections: { heading?: string; items: RoomItem[] }[];
  facts: string;
}) {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
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
                    <p className="mt-1 text-sm text-muted">{item.note}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
        <PlainFacts text={facts} />
        <SiteFooter />
      </div>
    </main>
  );
}
