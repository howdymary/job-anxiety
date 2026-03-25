import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { careerNotes } from "@/lib/editorial-content";

export const metadata: Metadata = {
  title: "Career Notes — Field Guides to Every AI Job Title",
  description: "In-depth guides to new AI careers: what the role is, who's hiring, what it pays, and how to break in."
};

export default function CareerNotesPage() {
  return (
    <div className="page-grid-wide">
      <SectionHeading
        eyebrow="Career notes"
        title="Career notes"
        description="Field guides to every AI job title. What the role is, who's hiring, what it pays, and how to break in."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {careerNotes.map((note) => (
          <Link key={note.slug} href={`/career-notes/${note.slug}`} className="editorial-card p-5 hover:border-[var(--color-border-hover)]">
            <h2 className="section-title text-[1.45rem]">{note.role}</h2>
            <p className="data-copy mt-4 text-[0.82rem] text-[var(--color-text-muted)]">
              {note.salaryRange} · {note.growth}
            </p>
            <p className="body-copy muted-copy mt-4">{note.cardDescription}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
