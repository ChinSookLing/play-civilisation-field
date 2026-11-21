import { Link } from "@tanstack/react-router";
import katex from "katex";
import "katex/dist/katex.min.css";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/play/SiteFooter";
import { parseT8, type ReadBlock } from "@/lib/play/proof-table-008-t8-read";
import {
  T8_ENTRANCE,
  T8_MANUSCRIPT,
  T8_MARKDOWN,
  T8_SHA256,
  T8_VERIFICATION_TXT,
  t8Updated,
} from "@/lib/play/proof-table-008-t8";

const TOC = [
  ["abstract", "摘要"],
  ["concordance", "輪次"],
  ["defs", "定義"],
  ["tree", "總定理"],
  ["k2", "K2"],
  ["machine", "機器證明"],
  ["still", "尚缺"],
  ["c", "附錄 C"],
  ["d", "附錄 D"],
  ["f", "附錄 F"],
] as const;

function mathHtml(tex: string, display: boolean): string | null {
  try {
    return katex.renderToString(tex, {
      displayMode: display,
      throwOnError: true,
      trust: false,
      strict: "ignore",
      output: "html",
    });
  } catch {
    return null;
  }
}

function Inline({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let index = 0;
  let key = 0;
  while (index < text.length) {
    if (text.startsWith("**", index)) {
      const end = text.indexOf("**", index + 2);
      if (end > index + 1) {
        nodes.push(<strong key={key}>{text.slice(index + 2, end)}</strong>);
        key += 1;
        index = end + 2;
        continue;
      }
    }
    if (text[index] === "$") {
      const end = text.indexOf("$", index + 1);
      if (end > index + 1) {
        const html = mathHtml(text.slice(index + 1, end), false);
        if (html) {
          nodes.push(<span key={key} dangerouslySetInnerHTML={{ __html: html }} />);
          key += 1;
          index = end + 1;
          continue;
        }
      }
    }
    if (text[index] === "`") {
      const end = text.indexOf("`", index + 1);
      if (end >= 0) {
        nodes.push(
          <code key={key} className="font-mono text-[0.92em]">
            {text.slice(index + 1, end)}
          </code>,
        );
        key += 1;
        index = end + 1;
        continue;
      }
    }
    let end = index + 1;
    while (end < text.length && text[end] !== "$" && text[end] !== "`" && !text.startsWith("**", end)) end += 1;
    nodes.push(text.slice(index, end));
    key += 1;
    index = end;
  }
  return <>{nodes}</>;
}

function BlockView({ block }: { block: ReadBlock }) {
  if (block.kind === "heading") {
    const className =
      block.level === 3 ? "mt-6 text-lg tracking-tight scroll-mt-6" : "mt-10 text-xl tracking-tight scroll-mt-6";
    const Tag = block.level === 3 ? "h3" : "h2";
    return (
      <Tag id={block.id} className={className}>
        <Inline text={block.text} />
      </Tag>
    );
  }
  if (block.kind === "math") {
    const html = mathHtml(block.tex, true);
    if (!html) return <pre className="my-4 overflow-x-auto font-mono text-xs leading-relaxed">{block.tex}</pre>;
    return <div className="my-4 overflow-x-auto text-fg" dangerouslySetInnerHTML={{ __html: html }} />;
  }
  if (block.kind === "list") {
    return (
      <ul className="my-3 list-disc pl-5 text-sm leading-relaxed">
        {block.items.map((item) => (
          <li key={item} className="mt-1">
            <Inline text={item} />
          </li>
        ))}
      </ul>
    );
  }
  if (block.kind === "table") {
    return (
      <div className="my-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {block.header.map((cell, cellIndex) => (
                <th key={`${cell}-${cellIndex}`} className="border border-line px-2 py-1 text-left font-medium">
                  <Inline text={cell} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border border-line px-2 py-1 align-top">
                    <Inline text={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <p className="mt-3 text-sm leading-relaxed">
      {block.lines.map((line, lineIndex) => (
        <span key={`${lineIndex}-${line}`}>
          {lineIndex > 0 ? <br /> : null}
          <Inline text={line} />
        </span>
      ))}
    </p>
  );
}

export function T8Reading() {
  const blocks = parseT8(T8_MANUSCRIPT);
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-3xl px-5 py-10">
        <p className="text-sm">
          <Link to="/gathering" className="text-fg underline decoration-1 underline-offset-4">
            聚 · Gathering
          </Link>
          <Link to="/gathering/proof-table-008/table" className="ml-4 text-fg underline decoration-1 underline-offset-4">
            證明桌
          </Link>
          <a href={T8_VERIFICATION_TXT} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            純文字
          </a>
          <a href={T8_MARKDOWN} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Markdown
          </a>
        </p>
        <h1 className="mt-6 font-display text-4xl tracking-tight">八跑者：构造性选时、分支闭合与计算机辅助证明档案</h1>
        <p className="mt-2 text-sm text-muted">The Eighth Runner — A Constructive Time-Selection Proof Dossier</p>
        <p className="mt-4 text-sm text-muted">Gathering v0.7 · 歸檔草稿 · 2026-11-21（Asia/Kuala_Lumpur）</p>
        <p className="mt-1 text-sm text-muted">
          稿內記錄項目級 T8 CLOSED，範圍是整數核心。這不是自足論文，也不是外部同行評審。實速度約化沒有在本卷重證。任意人數通式仍開放。證明桌維持 OPEN。這次沒有附送審包。
        </p>
        <nav className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm" aria-label="目錄">
          {TOC.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="text-fg underline decoration-1 underline-offset-4">
              {label}
            </a>
          ))}
        </nav>
        <article className="mt-8">
          {blocks.map((block, index) => (
            <BlockView key={index} block={block} />
          ))}
        </article>
        <details className="mt-12 border-t border-line pt-6 text-sm">
          <summary className="cursor-pointer text-muted">給機器的欄位與檔案</summary>
          <pre className="mt-4 whitespace-pre-wrap text-xs leading-relaxed text-muted">{T8_ENTRANCE}</pre>
          <p className="mt-2 text-xs text-muted">MANUSCRIPT SHA-256 {T8_SHA256}</p>
        </details>
        <SiteFooter updated={t8Updated()} />
      </div>
    </main>
  );
}
