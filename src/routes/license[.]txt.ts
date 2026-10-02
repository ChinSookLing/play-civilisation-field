import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { licenseSheet } from "@/lib/play/page-sheets";
import { pageText } from "@/lib/play/sheet";

export const Route = createFileRoute("/license.txt")({
  server: {
    handlers: {
      GET: async () => textResponse(pageText(licenseSheet()), "text/plain; charset=utf-8"),
    },
  },
});
