type Props = {
  text: string;
};

export function AiReaders({ text }: Props) {
  return (
    <details className="rounded-md border border-line bg-surface">
      <summary className="min-h-11 cursor-pointer px-4 py-3 text-sm text-fg">For AI readers</summary>
      <pre id="of-play-ai" className="overflow-x-auto border-t border-line px-4 py-3 font-mono text-xs leading-relaxed whitespace-pre text-muted">
        {text}
      </pre>
    </details>
  );
}
