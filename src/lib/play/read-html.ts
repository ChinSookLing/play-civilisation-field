import katex from "katex";
import { parseT6Dossier, type ReadBlock } from "./proof-table-008-t6-dossier-read";

function escapeText(value: string): string {
  return value
    .replace(/&/g, "&" + "amp;")
    .replace(/</g, "&" + "lt;")
    .replace(/>/g, "&" + "gt;")
    .replace(/"/g, "&" + "quot;");
}

function mathHtml(tex: string, display: boolean): string {
  try {
    return katex.renderToString(tex, {
      displayMode: display,
      throwOnError: true,
      trust: false,
      strict: "ignore",
      output: "html",
    });
  } catch {
    return `<span class="font-mono">${escapeText(display ? `$$${tex}$$` : `$${tex}$`)}</span>`;
  }
}

export function inlineHtml(text: string): string {
  let html = "";
  let index = 0;
  while (index < text.length) {
    if (text.startsWith("**", index)) {
      const end = text.indexOf("**", index + 2);
      if (end > index + 1) {
        html += `<strong>${inlineHtml(text.slice(index + 2, end))}</strong>`;
        index = end + 2;
        continue;
      }
    }
    if (text[index] === "*" && !text.startsWith("**", index)) {
      const end = text.indexOf("*", index + 1);
      if (end > index + 1) {
        html += `<em>${inlineHtml(text.slice(index + 1, end))}</em>`;
        index = end + 1;
        continue;
      }
    }
    if (text[index] === "$") {
      const end = text.indexOf("$", index + 1);
      if (end > index + 1) {
        html += mathHtml(text.slice(index + 1, end), false);
        index = end + 1;
        continue;
      }
    }
    if (text[index] === "[") {
      const close = text.indexOf("](", index + 1);
      const end = close > index ? text.indexOf(")", close + 2) : -1;
      if (close > index + 1 && end > close + 2) {
        html += `<a href="${escapeText(text.slice(close + 2, end))}">${inlineHtml(text.slice(index + 1, close))}</a>`;
        index = end + 1;
        continue;
      }
    }
    if (text[index] === "`") {
      const end = text.indexOf("`", index + 1);
      if (end > index) {
        html += `<code>${escapeText(text.slice(index + 1, end))}</code>`;
        index = end + 1;
        continue;
      }
    }
    let end = index + 1;
    while (end < text.length && text[end] !== "$" && text[end] !== "`" && text[end] !== "[" && text[end] !== "*") end += 1;
    html += escapeText(text.slice(index, end));
    index = end;
  }
  return html;
}

function renderBlock(block: ReadBlock): string {
  if (block.kind === "heading") {
    const tag = block.level === 3 ? "h3" : "h2";
    return `<${tag}>${inlineHtml(block.text)}</${tag}>`;
  }
  if (block.kind === "math") return mathHtml(block.tex, true);
  if (block.kind === "code") {
    return `<pre>${escapeText(block.text)}</pre>`;
  }
  if (block.kind === "list") {
    return `<ul>${block.items.map((item) => `<li>${inlineHtml(item)}</li>`).join("")}</ul>`;
  }
  if (block.kind === "table") {
    const head = block.header.map((cell) => `<th>${inlineHtml(cell)}</th>`).join("");
    const rows = block.rows
      .map((row) => `<tr>${row.map((cell) => `<td>${inlineHtml(cell)}</td>`).join("")}</tr>`)
      .join("");
    return `<table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>`;
  }
  if (block.kind === "image") {
    return `<figure><img src="${escapeText(block.src)}" alt="${escapeText(block.alt)}"></figure>`;
  }
  return block.lines
    .map((line) => {
      if (line.startsWith("# ")) return `<h1>${inlineHtml(line.slice(2).trim())}</h1>`;
      return `<p>${inlineHtml(line)}</p>`;
    })
    .join("\n");
}

export function readArticleHtml(source: string): string {
  return parseT6Dossier(source).map(renderBlock).join("\n");
}
