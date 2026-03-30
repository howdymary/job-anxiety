import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { EditorialShell } from "@/components/editorial-shell";
import { careerNoteMap, careerNotes } from "@/lib/editorial-content";

type CareerNotePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return careerNotes.map((note) => ({ slug: note.slug }));
}

export function generateMetadata({ params }: CareerNotePageProps): Metadata {
  const note = careerNoteMap[params.slug];
  if (!note) {
    return { title: "Career note not found" };
  }

  return {
    title: `${note.role}: Salary, Skills & How to Get Hired (2026)`,
    description: `Everything about becoming an ${note.role}. Salary: ${note.salaryRange}. ${note.growth}. Who's hiring and how to break in.`
  };
}

export default function CareerNotePage({ params }: CareerNotePageProps) {
  const note = careerNoteMap[params.slug];
  if (!note) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    datePublished: "2026-03-25",
    author: {
      "@type": "Organization",
      name: "jobanxiety.ai"
    }
  };

  const related = note.relatedNoteSlugs.map((slug) => careerNoteMap[slug]).filter(Boolean);

  return (
    <div className="grid gap-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <EditorialShell
        eyebrow="Career note"
        title={note.title}
        subtitle={note.subtitle}
        metaLine={`${note.salaryRange} · ${note.growth} · ${note.experienceBand} · Updated ${note.updatedAt}`}
        sections={note.sections}
        ctaHref={`/jobs?category=${note.slug}`}
        ctaLabel={`View open ${note.role} roles`}
      />

      <div className="page-grid-prose prose-block">
        {note.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

        <section id="salary-table">
          <h2>What it pays</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Experience</th>
                <th>Base</th>
                <th>Total comp</th>
              </tr>
            </thead>
            <tbody>
              {note.salaryRows.map((row) => (
                <tr key={row.experience}>
                  <td>{row.experience}</td>
                  <td>{row.base}</td>
                  <td>{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="skills">
          <h2>What you need to know</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="eyebrow">Must have</p>
              <ul className="mt-3">
                {note.mustHave.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Nice to have</p>
              <ul className="mt-3">
                {note.niceToHave.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="hiring">
          <h2>Who&apos;s hiring</h2>
          <div className="grid gap-5">
            {note.hiringByTier.map((group) => (
              <div key={group.tier}>
                <p className="eyebrow">{group.tier}</p>
                <p className="body-copy mt-3">{group.companies.join(", ")}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="page-grid-prose border-t border-[var(--color-border)] pt-8">
        <p className="eyebrow">You might also read</p>
        <div className="mt-4 flex flex-wrap gap-6">
          {related.map((relatedNote) => (
            <Link key={relatedNote.slug} href={`/career-notes/${relatedNote.slug}`} className="inline-link body-copy">
              {relatedNote.role}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
