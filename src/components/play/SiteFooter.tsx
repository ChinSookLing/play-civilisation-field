import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-line pt-4 text-sm text-muted">
      <p>Made by Tuzi and Affiliates · First published: 2026-09-17 · Last updated: 2026-09-29</p>
      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        <a className="text-fg hover:underline" href="https://openfield.civilisationfield.com/" rel="noreferrer">Open Field</a>
        <Link to="/about" className="text-fg hover:underline">About</Link>
        <Link to="/start" className="text-fg hover:underline">Start</Link>
        <Link to="/games" className="text-fg hover:underline">Games</Link>
        <Link to="/for-ai" className="text-fg hover:underline">For AI</Link>
        <Link to="/license" className="text-fg hover:underline">License</Link>
        <span className="select-all font-mono text-fg">theadventuresoftuzi@gmail.com</span>
        <a className="text-fg hover:underline" href="https://play.civilisationfield.com/llms.txt">
          https://play.civilisationfield.com/llms.txt
        </a>
      </p>
    </footer>
  );
}
