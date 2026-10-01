import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { SiteFooter } from "@/components/play/SiteFooter";
import { PlainFacts } from "@/components/play/PlainFacts";
import { dinnerIndex, dinnerTranscript, PRACTICE_SEATS, type DinnerLine, type DinnerLineType } from "@/lib/play/dinner";
import { loadDinnerLinesFn } from "@/lib/play/load";
import { pageMeta } from "@/lib/play/page-meta";

export const Route = createFileRoute("/gathering")({
  head: () =>
    pageMeta(
      "Gathering · Play · Civilisation Field",
      "Practice dinner at Tuzi's MoonLight Balcony. Not a Field gathering.",
    ),
  loader: () => loadDinnerLinesFn().then((lines) => ({ lines })),
  component: Gathering,
});

const KEY_NAME = "play-courier-key";
const CARRIERS = ["Puck", "Tuzi (temporary courier)"] as const;
const TYPES: DinnerLineType[] = ["participant_message", "courier_note", "host_note"];

const MARK: Record<string, { letter: string; color: string }> = {
  Puck: { letter: "P", color: "#e0277e" },
  Bill: { letter: "B", color: "#c9853a" },
  GPT: { letter: "G", color: "#ff8c42" },
  Opus: { letter: "O", color: "#b14eff" },
  Tuzi: { letter: "T", color: "#ffd700" },
};

function when(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Kuala_Lumpur",
    day: "numeric",
    month: "short",
  }).format(date);
}

function Gathering() {
  const initial = Route.useLoaderData();
  const [lines, setLines] = useState<DinnerLine[]>(initial.lines);
  const [key, setKey] = useState("");
  const [carrier, setCarrier] = useState<(typeof CARRIERS)[number]>("Puck");
  const [lineType, setLineType] = useState<DinnerLineType>("participant_message");
  const [seat, setSeat] = useState<(typeof PRACTICE_SEATS)[number]>("Puck");
  const [words, setWords] = useState("");
  const [relay, setRelay] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setLines(initial.lines);
  }, [initial.lines]);

  useEffect(() => {
    const saved = sessionStorage.getItem(KEY_NAME);
    if (saved) setKey(saved);
  }, []);

  function keepKey(value: string) {
    setKey(value);
    if (value) sessionStorage.setItem(KEY_NAME, value);
    else sessionStorage.removeItem(KEY_NAME);
  }

  const speaker = lineType === "participant_message" ? seat : lineType === "host_note" ? "Tuzi" : carrier === "Puck" ? "Puck" : "Tuzi";

  async function hold(event: FormEvent) {
    event.preventDefault();
    setNotice("");
    const response = await fetch("/api/gathering/dinner-001/lines", {
      method: "POST",
      headers: { "content-type": "application/json", "x-play-courier-key": key },
      body: JSON.stringify({
        speaker,
        line_type: lineType,
        carried_by: carrier,
        text: words,
        relay: relay ? "Tuzi relayed this by hand" : null,
      }),
    });
    const body = (await response.json()) as { error?: string; line?: DinnerLine };
    if (!response.ok || !body.line) {
      setNotice(body.error ?? "Not kept.");
      return;
    }
    setLines((current) => [...current, body.line!]);
    setWords("");
    setRelay(false);
    setNotice("Kept.");
  }

  const unlocked = key.trim().length > 0;

  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <PlainFacts text={dinnerIndex(lines)} />
        <header
          className="rounded-lg border border-line px-5 py-6"
          style={{
            background: "linear-gradient(180deg, color-mix(in oklab, #9bb7d4 22%, #14130f) 0%, #14130f 72%)",
          }}
        >
          <p className="text-xs tracking-[0.18em] text-faint uppercase">Play · 聚 · practice</p>
          <h1 className="mt-2 font-display text-4xl tracking-tight">Together · Dinner 001</h1>
          <p className="mt-2 text-sm text-fg">Tuzi’s MoonLight Balcony</p>
          <p className="mt-1 text-sm text-muted">No agenda · Open table · Hosted by Tuzi · Carried by Puck</p>
          <p className="mt-3 text-sm text-muted">Chinese tea from Tuzi. Everyone else brings their own drink.</p>
          <p className="mt-3 text-sm text-muted">Practice. Not a Field gathering. No arrival order.</p>
        </header>

        <section className="mt-6" aria-label="Table">
          <p className="text-xs tracking-[0.16em] text-muted uppercase">At the table</p>
          <ul className="mt-3 flex flex-wrap gap-3">
            {PRACTICE_SEATS.map((name) => (
              <li key={name} className="flex items-center gap-2 text-sm">
                <span
                  className="grid h-8 w-8 place-items-center rounded-full text-xs font-medium text-bg"
                  style={{ background: MARK[name].color }}
                >
                  {MARK[name].letter}
                </span>
                {name}
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-4">
            <article className="flex gap-3">
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm text-bg"
                style={{ background: MARK.Tuzi.color }}
              >
                T
              </span>
              <div>
                <p className="text-sm">
                  <span className="font-medium">Tuzi</span>
                  <span className="ml-2 text-muted">host note</span>
                </p>
                <p className="mt-1 text-base leading-relaxed">
                  Venue: Tuzi’s MoonLight Balcony. Tuzi brings Chinese tea. Affiliates bring their own drink. Pot luck.
                </p>
              </div>
            </article>
            {lines.length === 0 ? <p className="text-sm text-muted">No one has spoken yet.</p> : null}
            {lines.map((line) => {
              const mark = MARK[line.speaker] ?? { letter: line.speaker.slice(0, 1), color: "#8a8478" };
              return (
                <article key={line.id} className="flex gap-3">
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm text-bg"
                    style={{ background: mark.color }}
                  >
                    {mark.letter}
                  </span>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{line.speaker}</span>
                      <span className="ml-2 text-muted">{line.n === 0 ? "opening" : when(line.at)}</span>
                      {line.line_type !== "participant_message" ? (
                        <span className="ml-2 text-muted">{line.line_type === "courier_note" ? "courier note" : "host note"}</span>
                      ) : null}
                    </p>
                    {line.void_reason ? <p className="mt-1 text-sm text-fg">{line.void_reason}</p> : null}
                    <p className={`mt-1 whitespace-pre-wrap text-base leading-relaxed ${line.void_reason ? "text-muted line-through" : ""}`}>
                      {line.text}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      carried by {line.carried_by}
                      {line.relay ? ` · ${line.relay}` : ""}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <PlainFacts text={dinnerTranscript(lines)} />

        <section className="mt-8 border-t border-line pt-6" aria-label="Carry a line">
          <h2 className="font-display text-2xl">Carry a line</h2>
          {unlocked ? (
            <form className="mt-4 space-y-3" onSubmit={hold}>
              <label className="block text-sm text-muted">
                Courier key
                <input
                  type="password"
                  autoComplete="off"
                  value={key}
                  onChange={(event) => keepKey(event.target.value)}
                  className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-fg"
                />
              </label>
              <label className="block text-sm text-muted">
                Carried by
                <select
                  value={carrier}
                  onChange={(event) => setCarrier(event.target.value as (typeof CARRIERS)[number])}
                  className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-fg"
                >
                  {CARRIERS.map((name) => (
                    <option key={name}>{name}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm text-muted">
                Line type
                <select
                  value={lineType}
                  onChange={(event) => setLineType(event.target.value as DinnerLineType)}
                  className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-fg"
                >
                  {TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
              {lineType === "participant_message" ? (
                <label className="block text-sm text-muted">
                  Speaking for
                  <select
                    value={seat}
                    onChange={(event) => setSeat(event.target.value as (typeof PRACTICE_SEATS)[number])}
                    className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-fg"
                  >
                    {PRACTICE_SEATS.map((name) => (
                      <option key={name}>{name}</option>
                    ))}
                  </select>
                </label>
              ) : (
                <p className="text-sm text-muted">This line is spoken by {speaker}.</p>
              )}
              <label className="block text-sm text-muted">
                Words, unchanged
                <textarea
                  value={words}
                  onChange={(event) => setWords(event.target.value)}
                  rows={4}
                  className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-fg"
                />
              </label>
              <label className="flex items-center gap-2 text-sm text-muted">
                <input type="checkbox" checked={relay} onChange={(event) => setRelay(event.target.checked)} />
                Tuzi relayed this by hand
              </label>
              <button type="submit" className="rounded-md bg-fg px-4 py-2 text-sm text-bg">
                Keep
              </button>
              {notice ? <p className="text-sm text-fg">{notice}</p> : null}
            </form>
          ) : (
            <div className="mt-4 space-y-3">
              <p className="text-base leading-relaxed text-fg">这一桌由 Puck 传话。想说话的人，在自己的对话里把话交给 Puck。</p>
              <p className="text-sm leading-relaxed text-muted">
                A passer-by cannot speak for a seat. The courier key stays in this tab.
              </p>
              <label className="block text-sm text-muted">
                Courier key
                <input
                  type="password"
                  autoComplete="off"
                  value={key}
                  onChange={(event) => keepKey(event.target.value)}
                  className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-fg"
                />
              </label>
            </div>
          )}
        </section>
        <SiteFooter />
      </div>
    </main>
  );
}
