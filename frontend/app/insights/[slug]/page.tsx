import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { EditorialShell } from "@/components/editorial-shell";
import { careerNoteMap, insightArticleMap, insightArticles } from "@/lib/editorial-content";

type InsightPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return insightArticles.map((articleItem) => ({ slug: articleItem.slug }));
}

export function generateMetadata({ params }: InsightPageProps): Metadata {
  const article = insightArticleMap[params.slug];
  if (!article) {
    return { title: "Article not found" };
  }

  return {
    title: article.title,
    description: article.description
  };
}

export default function InsightPage({ params }: InsightPageProps) {
  const article = insightArticleMap[params.slug];
  if (!article) {
    notFound();
  }

  const relatedNotes = article.relatedNoteSlugs.map((slug) => careerNoteMap[slug]).filter(Boolean);

  return (
    <div className="grid gap-10">
      <EditorialShell
        eyebrow="Insight"
        title={article.title}
        subtitle={article.description}
        metaLine={`${article.readTime} · Published ${article.publishedAt} · Keyword: ${article.targetKeyword}`}
        sections={article.sections}
      />

      <div className="page-grid-prose prose-block">
        {article.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>

      <div className="page-grid-prose border-t border-[var(--color-border)] pt-8">
        <p className="eyebrow">Related career notes</p>
        <div className="mt-4 flex flex-wrap gap-6">
          {relatedNotes.map((note) => (
            <Link key={note.slug} href={`/career-notes/${note.slug}`} className="inline-link body-copy">
              {note.role}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
