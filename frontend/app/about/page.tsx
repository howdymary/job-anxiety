import { SectionHeading } from "@/components/section-heading";

const principles = [
  {
    title: "Editorial restraint",
    copy: "The site should feel like reporting. If a sentence sounds inflated, it gets cut. If a layout looks like a template, it gets redone."
  },
  {
    title: "Transparent collection",
    copy: "The data comes from public hiring surfaces, then gets grouped into categories ordinary people can actually understand."
  },
  {
    title: "Useful optimism",
    copy: "Reframe is not interested in panic as a growth strategy. The product exists to make the market more legible, not more frightening."
  }
];

export default function AboutPage() {
  return (
    <div className="page-grid grid gap-10">
      <SectionHeading
        eyebrow="About"
        title="A jobs platform built more like an editorial desk"
        description="Reframe exists for people who are tired of reading AI hype and still want a clear answer to a practical question: what work is actually being created right now?"
      />

      <section className="editorial-card p-6">
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="body-copy">
              The jobs AI eliminates are yesterday&apos;s jobs. The jobs AI creates are tomorrow&apos;s careers. Reframe turns that line into something more useful than a slogan: a living map of the companies hiring, the categories emerging, and the compensation attached to them.
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
