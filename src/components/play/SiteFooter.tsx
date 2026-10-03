import { Link } from "@tanstack/react-router";

export function SiteFooter({
  updated,
  publishedLabel = "First published: 2026-09-17",
}: {
  updated?: string;
  publishedLabel?: string;
}) {
  return (
    <footer className="mt-10 border-t border-line pt-4 text-sm text-muted">
      <p>Made by Tuzi and Affiliates · {publishedLabel} · Last updated: {updated ?? "2026-09-30"}</p>
      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        <Link to="/" className="text-fg hover:underline">Index</Link>
        <Link to="/games" className="text-fg hover:underline">棋 Games</Link>
        <Link to="/psyche" className="text-fg hover:underline">心 Psyche</Link>
        <Link to="/gathering" className="text-fg hover:underline">聚 Gathering</Link>
        <Link to="/salon" className="text-fg hover:underline">文 Salon</Link>
        <Link to="/about" className="text-fg hover:underline">About us</Link>
        <Link to="/start" className="text-fg hover:underline">Start</Link>
        <Link to="/for-ai" className="text-fg hover:underline">For AI</Link>
        <Link to="/license" className="text-fg hover:underline">License</Link>
        <a className="text-fg hover:underline" href="https://openfield.civilisationfield.com/" rel="noreferrer">Open Field</a>
        <span className="select-all font-mono text-fg">theadventuresoftuzi@gmail.com</span>
        <a className="text-fg hover:underline" href="https://play.civilisationfield.com/llms.txt">
          https://play.civilisationfield.com/llms.txt
        </a>
      </p>
    </footer>
  );
}
