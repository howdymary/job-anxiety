"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type SearchCommandProps = {
  open: boolean;
  onClose: () => void;
};

const items = [
  { href: "/jobs", label: "All jobs", meta: "Market" },
  { href: "/layoffs", label: "Layoff tracker", meta: "Market" },
  { href: "/career-notes", label: "Career Notes", meta: "Guides" },
  { href: "/companies", label: "Companies", meta: "Directory" },
  { href: "/insights", label: "Insights", meta: "Editorial" },
  { href: "/trends", label: "Trends", meta: "Data" },
  { href: "/methodology", label: "Methodology", meta: "Trust" },
  { href: "/press", label: "Press", meta: "Resources" },
  { href: "/api", label: "API docs", meta: "Developers" },
  { href: "/corrections", label: "Corrections", meta: "Trust" },
  { href: "/career-notes/ai-engineer", label: "AI Engineer guide", meta: "Career note" },
  { href: "/career-notes/gtm-engineer", label: "GTM Engineer guide", meta: "Career note" },
  { href: "/insights/will-ai-take-my-job", label: "Will AI take my job?", meta: "Insight" }
];

export function SearchCommand({ open, onClose }: SearchCommandProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return items;
    }

    return items.filter((item) => `${item.label} ${item.meta}`.toLowerCase().includes(normalized));
  }, [query]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] bg-[rgba(26,26,24,0.16)] p-4 md:p-8" onClick={onClose} role="presentation">
      <div
        className="mx-auto mt-12 w-full max-w-[40rem] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-[var(--shadow-lg)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search jobanxiety.ai"
      >
        <div className="border-b border-[var(--color-border)] px-5 py-4">
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search jobs, companies, and field notes"
            className="w-full border-0 bg-transparent p-0 text-[1rem] text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-faint)]"
          />
        </div>
        <div className="max-h-[26rem] overflow-y-auto px-3 py-2">
          {filteredItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-center justify-between border-b border-[var(--color-border)] px-3 py-3 last:border-b-0 hover:bg-[var(--color-bg-sunken)]"
            >
              <span className="body-copy">{item.label}</span>
              <span className="data-copy text-[0.74rem] uppercase text-[var(--color-text-faint)]">{item.meta}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
