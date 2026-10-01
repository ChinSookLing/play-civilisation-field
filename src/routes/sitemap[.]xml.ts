import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { GAMES } from "@/lib/play/games";

const ORIGIN = "https://play.civilisationfield.com";
const PAGES = ["/", "/games", "/records.txt", "/psyche", "/gathering", "/gathering/index.html", "/gathering/dinner-001/table", "/salon", "/salon/ladder", "/salon/ladder.txt", "/salon/ladder.html", "/about", "/start", "/for-ai", "/license", "/llms.txt", "/llms.html", "/gathering/dinner-001", "/gathering/dinner-001.txt", "/gathering/dinner-001.html", "/gathering/dinner-001-index.txt", "/gathering/dinner-001-index.html", "/gathering/dinner-001.json"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = [...PAGES, ...GAMES.map((game) => `/go/${game.id}`)];
        const body = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls.map((path) => `  <url><loc>${ORIGIN}${path}</loc></url>`),
          `</urlset>`,
          "",
        ].join("\n");
        return textResponse(body, "application/xml; charset=utf-8");
      },
    },
  },
});
