import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { insightArticles } from "@/lib/editorial-content";

export const metadata: Metadata = {
  title: "Insights",
  description: "Data-led editorial reporting on AI job formation, pay, and career transitions.",
  robots: {
    index: false,
    follow: true
  }
};

export default function InsightsPage() {
  return (
    <div className="page-grid">
      <SectionHeading
        eyebrow="Insights"
        title="Reported essays on the AI labor market"
        description="Longer pieces for people who want more than a list of roles. The tone is practical, skeptical, and specific."
      />
      <div className="mt-10 grid gap-6">
        {insightArticles.map((articleItem) => (
          <article key={articleItem.slug} className="border-b border-[var(--color-border)] pb-6">
            <Link href={`/insights/${articleItem.slug}`} className="section-title text-[1.6rem] inline-link">
              {articleItem.title}
            </Link>
            <p className="data-copy mt-3 text-[0.78rem] uppercase text-[var(--color-text-faint)]">
              {articleItem.readTime} · {articleItem.targetKeyword}
            </p>
            <p className="body-copy muted-copy mt-4">{articleItem.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
