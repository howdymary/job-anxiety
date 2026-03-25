import Link from "next/link";
import type { ReactNode } from "react";

import type { CareerNoteSection } from "@/lib/types";

type EditorialShellProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  metaLine: string;
  sections: CareerNoteSection[];
  children?: ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
};

export function EditorialShell({ eyebrow, title, subtitle, metaLine, sections, children, ctaHref, ctaLabel }: EditorialShellProps) {
  return (
    <article className="page-grid-wide grid gap-12 lg:grid-cols-[12rem_minmax(0,var(--max-w-prose))]">
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <p className="eyebrow">Contents</p>
          <nav className="mt-4 grid gap-3">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="fine-print inline-link">
                {section.title}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display-subtitle mt-4">{title}</h1>
        <p className="body-copy muted-copy mt-4">{subtitle}</p>
        <p className="data-copy mt-6 text-[0.82rem] uppercase text-[var(--color-text-faint)]">{metaLine}</p>
        {ctaHref && ctaLabel ? (
          <Link href={ctaHref} className="arrow-link mt-6">
            <span>{ctaLabel}</span>
            <span>→</span>
          </Link>
        ) : null}
        {children}
      </div>
    </article>
  );
}
