import { SectionHeading } from "@/components/section-heading";

const principles = [
  {
    title: "Signal over panic",
    copy: "The job market is already stressful enough. The work here is to reduce noise, name what is actually changing, and avoid turning fear into a content strategy."
  },
  {
    title: "Transparent collection",
    copy: "The data comes from public hiring surfaces, then gets grouped into categories ordinary people can actually understand."
  },
  {
    title: "Useful optimism",
    copy: "jobanxiety.ai is not interested in panic as a growth strategy. The goal is to make the market more legible, not more frightening."
  }
];

export default function AboutPage() {
  return (
    <div className="page-grid grid gap-10">
      <SectionHeading
        eyebrow="About"
        title="A jobs platform built like a calmer newsroom"
        description="jobanxiety.ai exists for people tired of AI panic headlines who still want a practical answer to one question: what work is actually being created right now?"
      />

      <section className="editorial-card p-6">
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="body-copy">
              AI job anxiety is real. So is the hiring happening under unfamiliar titles. jobanxiety.ai turns that tension into something useful: a living map of the companies hiring, the categories emerging, and the compensation attached to them.
            </p>
          </div>
          <div className="border-l border-[var(--color-border)] pl-6">
            <p className="eyebrow">How the data works</p>
            <ul className="body-copy mt-4 grid gap-3">
              <li>API-first job collection from public ATS providers and career endpoints.</li>
              <li>Clear grouping by company type: Fortune 500, VC-backed, and high-revenue businesses.</li>
              <li>Freshness-first defaults so the board favors active openings over stale inventory.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {principles.map((principle) => (
          <article key={principle.title} className="editorial-card p-5">
            <p className="section-title text-[1.3rem]">{principle.title}</p>
            <p className="body-copy muted-copy mt-4">{principle.copy}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
