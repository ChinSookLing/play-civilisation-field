import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";

const BODY = `User-agent: *
Allow: /
Disallow: /courier
Disallow: /puck

User-agent: ClaudeBot
Disallow: /courier
Disallow: /puck
Disallow: /psyche/002/play
Disallow: /psyche/002/v02/play

Sitemap: https://play.civilisationfield.com/sitemap.xml
# https://play.civilisationfield.com/llms.txt
`;

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () => textResponse(BODY, "text/plain; charset=utf-8"),
    },
  },
});
