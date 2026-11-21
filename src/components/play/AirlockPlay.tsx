import { useState } from "react";
import { airlockMove, airlockView, parseAirlockSeed } from "@/lib/play/airlock-v0.1";

export function AirlockPlay({ seed, lang }: { seed: string; lang: "en" | "zh" }) {
  const [moves, setMoves] = useState("");
  const [comment, setComment] = useState("");
  const [note, setNote] = useState("");
  const [step8Comment, setStep8Comment] = useState("");
  const parsed = parseAirlockSeed(seed);
  if (parsed === null) return <p className="mt-6 text-sm">Seed not accepted. Use S1.</p>;
  const view = airlockView(seed, moves, lang, step8Comment);
  if ("error" in view) return <p className="mt-6 text-sm">{view.error}</p>;
  const turn = view;
  const other = lang === "zh" ? "en" : "zh";
  const q = `?seed=${encodeURIComponent(seed)}&lang=${other}`;

  function choose(letter: string) {
    const result = airlockMove(seed, moves, letter, lang);
    if ("error" in result) {
      setNote(result.error);
      return;
    }
    setNote("");
    if (turn.step === 8) setStep8Comment(comment.slice(0, 280));
    setComment("");
    setMoves(result.moves);
  }

  return (
    <div className="mt-6">
      <p className="text-sm">
        <a className="text-fg underline" href={q}>{lang === "zh" ? "English" : "繁中"}</a>
      </p>
      {view.finished ? (
        <>
          <pre className="mt-4 whitespace-pre-wrap text-sm leading-relaxed">{turn.ending}</pre>
          <p className="mt-6 text-sm text-muted">{lang === "zh" ? "預覽。牆上還沒有列。" : "Preview. The wall has no rows yet."}</p>
        </>
      ) : (
        <>
          <pre className="mt-4 whitespace-pre-wrap font-mono text-sm leading-relaxed">{turn.packet}</pre>
          <div className="mt-4 flex flex-wrap gap-2">
            {turn.offered.map((letter) => (
              <button key={letter} type="button" className="border border-line px-3 py-2 text-sm" onClick={() => choose(letter)}>
                {letter}
              </button>
            ))}
            <button type="button" className="border border-line px-3 py-2 text-sm" onClick={() => choose("PASS")}>
              PASS
            </button>
          </div>
          <label className="mt-4 block text-sm text-muted">
            COMMENT
            <input
              className="mt-1 block w-full border border-line bg-bg px-2 py-1 text-fg"
              maxLength={280}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </label>
          {note ? <p className="mt-3 text-sm">{note}</p> : null}
        </>
      )}
    </div>
  );
}
