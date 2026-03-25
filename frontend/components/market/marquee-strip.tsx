"use client";

import { useEffect, useState } from "react";

type MarqueeStripProps = {
  items: string[];
  label?: string;
};

export function MarqueeStrip({ items, label = "Role ticker" }: MarqueeStripProps) {
  const [paused, setPaused] = useState(false);
  const repeatedItems = [...items, ...items];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPaused(media.matches);
    const handler = () => setPaused(media.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return (
    <div className="overflow-hidden border-y border-[color:var(--rf-border)] bg-[color:var(--rf-bg-sunken)]/70 py-3">
      <div className="page-shell flex items-center gap-4">
        <span className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--rf-text-faint)] sm:inline">
          {label}
        </span>
        <div className="relative w-full overflow-hidden">
          <div
            className="market-marquee flex min-w-max items-center gap-6 text-[0.8rem] uppercase tracking-[0.16em] text-[color:var(--rf-text-faint)]"
            data-paused={paused ? "true" : "false"}
          >
            {repeatedItems.map((item, index) => (
              <span key={`${item}-${index}`} className="whitespace-nowrap">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .market-marquee {
          animation: marquee 36s linear infinite;
        }

        .market-marquee[data-paused="true"] {
          animation-play-state: paused;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
