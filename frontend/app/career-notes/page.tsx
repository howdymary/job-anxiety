import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { careerNotes } from "@/lib/editorial-content";

export const metadata: Metadata = {
  title: "Career Notes",
  description:
    "Editorial field guides to AI-era roles and transitions. Some guides are still being re-sourced before release and should be read as working drafts.",
  robots: {
    index: false,
    follow: true
  }
};

export default function CareerNotesPage() {
  return (
    <div className="page-grid-wide">
      <SectionHeading
        eyebrow="Career notes"
        title="Career notes"
        description="Field guides to AI-era job titles and transitions. The strongest pieces are source-backed analysis; some role guides are still being re-sourced before release."
      />
      <section className="editorial-card mt-10 p-6 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
          <div>
            <p className="eyebrow">Featured analysis</p>
            <h2 className="display-subtitle mt-4">Will AI replace software engineers?</h2>
            <p className="body-copy muted-copy mt-4 max-w-[42rem]">
              The short answer is no. The more useful answer is that software work is splitting: some specialties are
              growing, some entry paths are tightening, and the value of judgment is rising faster than the value of routine output.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
              <Link href="/career-notes/will-ai-replace-software-engineers" className="arrow-link">
                <span>Read the full analysis</span>
                <span>→</span>
              </Link>
              <Link href="/check-your-occupation?soc=15-1252" className="arrow-link">
                <span>Check software-developer risk</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          <div className="rounded-[var(--ja-radius-lg)] border border-[var(--ja-fog)] bg-[var(--ja-cloud)] p-5">
            <p className="eyebrow">What this piece covers</p>
            <div className="mt-4 grid gap-3">
              <p className="fine-print">BLS growth projections versus the pressure showing up in junior hiring.</p>
              <p className="fine-print">Which engineering tasks current AI tools help with, and which still depend on context.</p>
              <p className="fine-print">What to do next if you are senior, mid-career, or still trying to break in.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {careerNotes.map((note) => (
          <Link key={note.slug} href={`/career-notes/${note.slug}`} className="editorial-card p-5 hover:border-[var(--color-border-hover)]">
            <h2 className="section-title text-[1.45rem]">{note.role}</h2>
            <p className="body-copy muted-copy mt-4">{note.cardDescription}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
