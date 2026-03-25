"use client";

type MarqueeStripProps = {
  items: string[];
};

export function MarqueeStrip({ items }: MarqueeStripProps) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-[var(--color-border)] py-3">
      <div className="marquee-track whitespace-nowrap text-[0.82rem] uppercase tracking-[0.08em] text-[var(--color-text-faint)]">
        {doubled.map((item, index) => (
          <span key={`${item}-${index}`} className="inline-flex items-center">
            {item}
            <span className="mx-4">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
