import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const KEY_NAME = "play-courier-key";
const CARRIERS = ["Puck", "Tuzi (temporary courier)"] as const;

type GameJson = {
  game_id?: string;
  status?: string;
  to_move?: string | null;
  to_move_color?: string | null;
  move_number?: number;
  expected_move_number?: number | null;
  state_version?: number | null;
  black_seat?: string | null;
  white_seat?: string | null;
  sessions?: Record<string, string>;
  courier_handoff?: string;
  komi?: number;
  rules?: string;
};

type ScorePreview = {
  ok?: boolean;
  error?: string;
  game_id?: string;
  session_id?: string;
  dead?: string[];
  rules?: string;
  komi?: number;
  score?: string;
  result_if_published?: string;
  warning?: string;
};

export const Route = createFileRoute("/courier")({
  headers: () => ({
    "X-Robots-Tag": "noindex, nofollow",
    "Cache-Control": "no-store",
  }),
  head: () => ({
    meta: [
      { title: "Courier" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CourierPage,
});

function CourierPage() {
  const [key, setKey] = useState("");
  const [games, setGames] = useState<string[]>(["PRACTICE-001", "GO-004"]);
  const [gameId, setGameId] = useState("GO-004");
  const [state, setState] = useState<GameJson | null>(null);
  const [raw, setRaw] = useState("");
  const [carrier, setCarrier] = useState<(typeof CARRIERS)[number]>("Tuzi (temporary courier)");
  const [receipt, setReceipt] = useState("");
  const [busy, setBusy] = useState(false);
  const [deadText, setDeadText] = useState("");
  const [preview, setPreview] = useState<ScorePreview | null>(null);
  const [acceptOnce, setAcceptOnce] = useState(false);
  const [acceptUnresolved, setAcceptUnresolved] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(KEY_NAME);
    if (saved) setKey(saved);
    void fetch("/api/games")
      .then((res) => res.json())
      .then((body: { games?: { game_id: string }[]; practice?: { game_id: string }[] }) => {
        const ids = [...(body.practice ?? []), ...(body.games ?? [])].map((game) => game.game_id);
        if (ids.length) setGames(ids);
      })
      .catch(() => undefined);
  }, []);

  function keepKey(value: string) {
    setKey(value);
    if (value) sessionStorage.setItem(KEY_NAME, value);
    else sessionStorage.removeItem(KEY_NAME);
  }

  const sessionId = sessionFor(state);
  const expected = state?.expected_move_number ?? null;
  const portal =
    state?.to_move_color === "white"
      ? state.white_seat
      : state?.to_move_color === "black"
        ? state.black_seat
        : null;

  async function readTable() {
    setBusy(true);
    setReceipt("");
    try {
      const res = await fetch(`/api/games/${gameId}`);
      const body = (await res.json()) as GameJson;
      setState(res.ok ? body : null);
      if (!res.ok) setReceipt(`Could not read the table (${res.status}).`);
    } finally {
      setBusy(false);
    }
  }

  async function send() {
    if (!key || !state || expected == null || !sessionId || !raw.trim()) return;
    setBusy(true);
    setReceipt("");
    try {
      const res = await fetch(`/api/games/${gameId}/moves`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Play-Courier-Key": key,
        },
        body: JSON.stringify({
          raw,
          portal: portal ?? state.to_move,
          session_id: sessionId,
          expected_move_number: expected,
          carried_by: carrier,
        }),
      });
      const body = (await res.json().catch(() => null)) as { receipt?: string; error?: string } | null;
      setReceipt(body?.receipt ?? body?.error ?? `HTTP ${res.status}`);
    } finally {
      setBusy(false);
    }
  }

  function deadList() {
    return deadText
      .split(/[\s,]+/)
      .map((item) => item.trim().toUpperCase())
      .filter(Boolean);
  }

  function changeDead(value: string) {
    setDeadText(value);
    setPreview(null);
    setAcceptOnce(false);
  }

  async function showScore() {
    if (!key) return;
    setBusy(true);
    setReceipt("");
    setPreview(null);
    setAcceptOnce(false);
    try {
      const res = await fetch(`/api/games/${gameId}/score-preview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Play-Courier-Key": key,
        },
        body: JSON.stringify({ dead: deadList() }),
      });
      const body = (await res.json().catch(() => null)) as ScorePreview | null;
      setPreview(body ?? { ok: false, error: `HTTP ${res.status}` });
    } finally {
      setBusy(false);
    }
  }

  async function publishScore() {
    if (!key || !preview?.ok || !acceptOnce || !preview.session_id) return;
    setBusy(true);
    setReceipt("");
    try {
      const res = await fetch(`/api/games/${gameId}/moves`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Play-Courier-Key": key,
        },
        body: JSON.stringify({
          confirm_score: true,
          session_id: preview.session_id,
          dead: preview.dead ?? [],
        }),
      });
      const body = (await res.json().catch(() => null)) as { receipt?: string; error?: string } | null;
      setReceipt(body?.receipt ?? body?.error ?? `HTTP ${res.status}`);
      if (res.ok) {
        setPreview(null);
        setAcceptOnce(false);
        const again = await fetch(`/api/games/${gameId}`);
        if (again.ok) setState((await again.json()) as GameJson);
      }
    } finally {
      setBusy(false);
    }
  }

  async function recordNoResult() {
    if (!key || !acceptUnresolved) return;
    setBusy(true);
    setReceipt("");
    try {
      const res = await fetch(`/api/games/${gameId}/moves`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Play-Courier-Key": key,
        },
        body: JSON.stringify({
          record_unresolved: true,
          session_id: `play-${gameId}-tuzi`,
        }),
      });
      const body = (await res.json().catch(() => null)) as { receipt?: string; error?: string } | null;
      setReceipt(body?.receipt ?? body?.error ?? `HTTP ${res.status}`);
      if (res.ok) {
        setAcceptUnresolved(false);
        setPreview(null);
        setAcceptOnce(false);
        const again = await fetch(`/api/games/${gameId}`);
        if (again.ok) setState((await again.json()) as GameJson);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-lg px-5 py-8">
        <p className="text-xs tracking-[0.18em] text-muted uppercase">Not listed</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Courier</h1>
        <p className="mt-3 text-base text-muted">
          Paste the reply you were given. Do not choose a different move. The key stays in this tab only.
        </p>

        <label className="mt-6 block text-sm text-muted" htmlFor="courier-key">
          Courier key
        </label>
        <input
          id="courier-key"
          type="password"
          autoComplete="off"
          value={key}
          onChange={(event) => keepKey(event.target.value)}
          className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-3 text-base"
        />

        <label className="mt-4 block text-sm text-muted" htmlFor="courier-game">
          Game
        </label>
        <select
          id="courier-game"
          value={gameId}
          onChange={(event) => {
            setGameId(event.target.value);
            setState(null);
            setReceipt("");
            setPreview(null);
            setAcceptOnce(false);
          }}
          className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-3 text-base"
        >
          {games.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => void readTable()}
          disabled={busy}
          className="mt-3 rounded-md border border-line px-4 py-3 text-base"
        >
          Read the table
        </button>

        {state ? (
          <div className="mt-4 space-y-1 text-base">
            <p>{state.game_id}</p>
            <p>
              {state.status} · move {state.move_number} · {state.to_move_color} {state.to_move ?? "none"}
            </p>
            <p>moves played {state.state_version ?? "none"} · expected move {state.expected_move_number ?? "none"}</p>
            <p>expected {expected ?? "none"}</p>
          </div>
        ) : null}

        <label className="mt-4 block text-sm text-muted" htmlFor="courier-raw">
          Reply, unchanged
        </label>
        <textarea
          id="courier-raw"
          value={raw}
          onChange={(event) => setRaw(event.target.value)}
          rows={6}
          className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-3 text-base"
        />

        <label className="mt-4 block text-sm text-muted" htmlFor="courier-who">
          Who is carrying this
        </label>
        <select
          id="courier-who"
          value={carrier}
          onChange={(event) => setCarrier(event.target.value as (typeof CARRIERS)[number])}
          className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-3 text-base"
        >
          {CARRIERS.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => void send()}
          disabled={busy || !key || !raw.trim() || expected == null || !sessionId}
          className="mt-4 rounded-md bg-fg px-4 py-3 text-base text-bg disabled:opacity-40"
        >
          Send
        </button>
        {receipt ? <pre className="mt-4 whitespace-pre-wrap text-base">{receipt}</pre> : null}

        {state?.status === "scoring" ? (
          <section className="mt-8 border border-line px-4 py-4">
            <h2 className="font-display text-2xl">Confirm the score</h2>
            <p className="mt-2 text-sm text-muted">
              Nothing is sent until you press Publish. Showing the score does not record it.
            </p>
            <label className="mt-4 block text-sm text-muted" htmlFor="dead-stones">
              Dead stones, if both lists agreed. Leave empty only when the agreed list is empty.
            </label>
            <textarea
              id="dead-stones"
              value={deadText}
              onChange={(event) => changeDead(event.target.value)}
              rows={3}
              placeholder="D4, K10"
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-3 text-base"
            />
            <button
              type="button"
              onClick={() => void showScore()}
              disabled={busy || !key}
              className="mt-3 rounded-md border border-line px-4 py-3 text-base"
            >
              Show the score
            </button>
            {preview?.ok ? (
              <div className="mt-4 space-y-1 text-base">
                <p>Game: {preview.game_id}</p>
                <p>Submitting identity: {preview.session_id}</p>
                <p>Dead stones: {preview.dead?.length ? preview.dead.join(", ") : "none marked"}</p>
                <p>{preview.rules}</p>
                <p>Komi {preview.komi}</p>
                <p>{preview.score}</p>
                <p className="text-sm text-muted">This line would be stored: {preview.result_if_published}</p>
                <p className="mt-3 text-fg">{preview.warning}</p>
                <label className="mt-3 flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={acceptOnce}
                    onChange={(event) => setAcceptOnce(event.target.checked)}
                  />
                  <span>Tuzi has compared the two lists. Publish this result once. It cannot be undone.</span>
                </label>
                <button
                  type="button"
                  onClick={() => void publishScore()}
                  disabled={busy || !acceptOnce}
                  className="mt-3 rounded-md bg-fg px-4 py-3 text-base text-bg disabled:opacity-40"
                >
                  Publish the result
                </button>
              </div>
            ) : preview?.error ? (
              <p className="mt-3 text-base">{preview.error}</p>
            ) : null}
            <div className="mt-8 border-t border-line pt-4">
              <h3 className="font-display text-xl">Record no result</h3>
              <p className="mt-2 text-sm text-muted">This does not publish a score. Nothing is sent until you press the button below.</p>
              <div className="mt-3 space-y-1 text-base">
                <p>Game: {state.game_id}</p>
                <p>Submitting identity: play-{state.game_id}-tuzi</p>
                <p>Status: finished</p>
                <p>Result: no result</p>
                <p>End reason: unresolved</p>
                <p>Tuzi · human-stated. 双方 pass 之后棋盘冻结，没下完的对杀就不替棋手补上结局。</p>
                <p className="mt-3 text-fg">One time. After this, Publish the result is refused.</p>
              </div>
              <label className="mt-3 flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={acceptUnresolved}
                  onChange={(event) => setAcceptUnresolved(event.target.checked)}
                />
                <span>Tuzi decided not to score the unfinished fights. Record no result.</span>
              </label>
              <button
                type="button"
                onClick={() => void recordNoResult()}
                disabled={busy || !acceptUnresolved || !key}
                className="mt-3 rounded-md bg-fg px-4 py-3 text-base text-bg disabled:opacity-40"
              >
                Record no result
              </button>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}

function sessionFor(state: GameJson | null): string | null {
  if (!state?.to_move) return null;
  const saved = state.sessions?.[state.to_move];
  if (saved) return saved;
  const line = state.courier_handoff?.split("\n").find((item) => item.startsWith("CONTESTANT_SESSION_ID:"));
  const value = line?.slice("CONTESTANT_SESSION_ID:".length).trim();
  return value && value !== "none" ? value : null;
}
