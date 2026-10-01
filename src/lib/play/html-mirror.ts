const AMP = "&" + "amp;";
const LT = "&" + "lt;";
const GT = "&" + "gt;";
const QUOT = "&" + "quot;";

function escapeText(value: string): string {
  return value.replace(/&/g, AMP).replace(/</g, LT).replace(/>/g, GT);
}

function escapeAttr(value: string): string {
  return escapeText(value).replace(/"/g, QUOT);
}

export function htmlMirror(options: {
  title: string;
  description: string;
  textUrl: string;
  text: string;
  also?: { href: string; label: string }[];
}): string {
  const links = [
    `<p>Plain text, same words: <a href="${escapeAttr(options.textUrl)}">${escapeText(options.textUrl)}</a></p>`,
    ...(options.also ?? []).map(
      (link) => `<p><a href="${escapeAttr(link.href)}">${escapeText(link.label)}</a></p>`,
    ),
  ].join("\n");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeText(options.title)}</title>
<meta name="description" content="${escapeAttr(options.description)}">
</head>
<body>
<main>
<h1>${escapeText(options.title)}</h1>
${links}
<pre>${escapeText(options.text.trim())}</pre>
</main>
</body>
</html>
`;
}
