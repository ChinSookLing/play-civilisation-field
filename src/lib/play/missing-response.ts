import { htmlMirror } from "./html-mirror";
import { textResponse } from "./json-response";
import { missingSheet } from "./page-sheets";
import { pageText } from "./sheet";

export function missingResponse(section: string, path: string, back: string, splat: string): Response {
  const sheet = missingSheet(section, path, back);
  const text = pageText(sheet);
  if (splat.endsWith(".txt")) return textResponse(text, "text/plain; charset=utf-8");
  return textResponse(
    htmlMirror({
      title: sheet.page,
      description: sheet.definition,
      textUrl: sheet.plainText,
      text,
      lead: `<p>This path is not a record yet. <a href="${back}">Back to ${section}</a></p>`,
    }),
    "text/html; charset=utf-8",
  );
}
