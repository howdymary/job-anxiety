import type { Metadata } from "next";

import { SectionHeading } from "@/components/section-heading";
import { correctionEntries } from "@/lib/platform-data";

export const metadata: Metadata = {
  title: "Corrections",
  description: "Public corrections log for sourcing, counting, and classification changes."
};

export default function CorrectionsPage() {
  return (
    <div className="page-grid-prose grid gap-10">
      <SectionHeading
        eyebrow="Corrections"
        title="Public corrections log"
        description="If a count changes, a source gets downgraded, or a confidence label moves, the record should show it. Quiet edits are bad practice for a platform like this."
      />

      <section className="editorial-card p-6">
        <p className="body-copy">Corrections should explain what changed, why it changed, and whether a historical snapshot was amended or annotated. When in doubt, annotate rather than rewrite the past.</p>
      </section>

      <div className="grid gap-4">
        {correctionEntries.map((entry) => (
          <article key={`${entry.date}-${entry.title}`} className="editorial-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="eyebrow">{entry.date}</p>
              <p className="fine-print uppercase tracking-[0.08em]">{entry.status}</p>
            </div>
            <h2 className="section-title mt-3 text-[1.3rem]">{entry.title}</h2>
            <p className="body-copy muted-copy mt-4">{entry.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
