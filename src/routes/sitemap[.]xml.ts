import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { GAMES } from "@/lib/play/games";

const ORIGIN = "https://play.civilisationfield.com";
const PAGES = ["/", "/home.txt", "/games", "/games.txt", "/records.txt", "/psyche", "/psyche.txt", "/gathering", "/gathering.txt", "/gathering/index.html", "/gathering/dinner-001/table", "/gathering/breakfast-002/table", "/gathering/proof-table/rules", "/gathering/proof-table/rules.txt", "/gathering/proof-table/rules/v0.5.1", "/gathering/proof-table/rules/v0.5.1.txt", "/gathering/proof-table/rules/v0.5", "/gathering/proof-table/rules/v0.5.txt", "/gathering/proof-table/rules/v0.3", "/gathering/proof-table/rules/v0.3.txt", "/gathering/proof-table-005/table", "/gathering/proof-table-005/table.txt", "/gathering/proof-table-004/table", "/gathering/proof-table-004/table.txt", "/gathering/proof-table-003/table", "/gathering/proof-table-003/table.txt", "/gathering/proof-table-003/table.html", "/gathering/proof-table-003/rules", "/gathering/proof-table-003/rules.txt", "/gathering/proof-table-003/rules.html", "/gathering/proof-table-003/task", "/gathering/proof-table-003/task.txt", "/gathering/proof-table-003/task.html", "/gathering/proof-table-003.txt", "/gathering/proof-table-003.html", "/salon", "/salon.txt", "/salon/plain-water", "/salon/plain-water.txt", "/salon/plain-water.html", "/salon/ladder", "/salon/ladder.txt", "/salon/ladder.html", "/salon/proof-table-003-relay", "/salon/proof-table-003-relay.txt", "/salon/proof-table-003-relay.html", "/salon/jev-controlled-probe-001", "/salon/jev-controlled-probe-001.txt", "/salon/jev-controlled-probe-001.html", "/about", "/about.txt", "/start", "/start.txt", "/for-ai", "/for-ai.txt", "/license", "/license.txt", "/llms.txt", "/llms.html", "/gathering/dinner-001", "/gathering/dinner-001.txt", "/gathering/dinner-001.html", "/gathering/dinner-001-index.txt", "/gathering/dinner-001-index.html", "/gathering/dinner-001.json", "/gathering/breakfast-002.txt", "/gathering/breakfast-002.html"];

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
