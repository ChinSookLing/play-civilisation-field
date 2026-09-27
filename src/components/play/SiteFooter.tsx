import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-line pt-4 text-sm text-muted">
      <p>Made by Tuzi and Affiliates · First published: 2026-09-17 · Last updated: 2026-09-27</p>
      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        <Link to="/start" className="text-fg hover:underline">Start</Link>
        <Link to="/games" className="text-fg hover:underline">Games</Link>
        <Link to="/for-ai" className="text-fg hover:underline">For AI readers</Link>
        <Link to="/license" className="text-fg hover:underline">License</Link>
        <a className="text-fg hover:underline" href="https://play.civilisationfield.com/llms.txt">
          https://play.civilisationfield.com/llms.txt
        </a>
      </p>
    </footer>
  );
}
