type Props = {
  text: string;
};

export function PlainFacts({ text }: Props) {
  return (
    <section className="mt-8">
      <h2 className="font-display text-2xl text-fg">For AI readers</h2>
      <pre className="mt-3 whitespace-pre-wrap font-mono text-sm leading-relaxed text-muted">{text.trim()}</pre>
    </section>
  );
}
