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
    title: "Context without panic",
    copy: "The aim is to make the market more legible, not more frightening. When the evidence is thin, the site narrows its claims instead of reaching for drama."
  }
];

export default function AboutPage() {
  return (
    <div className="page-grid grid gap-10">
      <SectionHeading
        eyebrow="About"
        title="A labor-market site built to survive fact-checking"
        description="jobanxiety.ai tracks public hiring signals, verified layoff disclosures, and occupation data for readers who want something more durable than AI hype or reassurance."
      />

      <section className="editorial-card p-6">
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="body-copy">
              The premise is simple. Public labor-market data exists, but most people encounter it through scattered dashboards, optimistic recruiting copy, or headlines that flatten everything into panic. This site tries to do the slower job: collect what can be sourced, label what cannot, and keep the reader oriented.
            </p>
          </div>
          <div className="border-l border-[var(--color-border)] pl-6">
            <p className="eyebrow">How the data works</p>
            <ul className="body-copy mt-4 grid gap-3">
              <li>Collection from public ATS providers and company career endpoints.</li>
              <li>Company grouping by operating profile: Fortune 500, VC-backed, and high-revenue software businesses.</li>
              <li>Preference for current inventory, official disclosures, and auditable source trails over broad market storytelling.</li>
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
