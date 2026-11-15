import { createFileRoute } from "@tanstack/react-router";
import game from "@/lib/play/psyche-001-game.html?raw";
import { textResponse } from "@/lib/play/json-response";
import { pageAsOf } from "@/lib/play/page-times";
import { siteFooterHtml } from "@/lib/play/site-footer";

const HERMES_FOOT = `      <footer class="foot">
        <p>Made by Tuzi and Affiliates · designed by Hermes (Hark) · inspired by a Mars Polar City thread</p>
        <nav aria-label="Back to sections" data-auto=""></nav>
        <a class="badge" href="https://hark.com/" rel="noopener" target="_blank"><span class="hark-mark"></span><span>built by hark</span></a>
      </footer>`;

function withSiteFooter(html: string): string {
  const at = html.indexOf(HERMES_FOOT);
  if (at < 0) return html;
  const insertAt = at + HERMES_FOOT.length;
  return html.slice(0, insertAt) + "\n" + siteFooterHtml(pageAsOf("PSYCHE-001")) + html.slice(insertAt);
}

export const Route = createFileRoute("/psyche/001/play")({
  server: {
    handlers: {
      GET: () => textResponse(withSiteFooter(game), "text/html; charset=utf-8"),
    },
  },
});
