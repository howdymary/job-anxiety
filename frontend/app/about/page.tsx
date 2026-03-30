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

const missionAreas = [
  {
    title: "Track growth and destruction",
    copy: "The mission is to track both sides of the labor market at once: where AI is creating roles, where it is compressing teams, and where companies are openly redrawing headcount around AI."
  },
  {
    title: "Translate the market into guidance",
    copy: "The point is not just to publish numbers. It is to help readers understand which categories are growing, which tasks are being automated, and what skills are worth building next."
  },
  {
    title: "Give subscribers a useful edge",
    copy: "Newsletter subscribers should get a practical weekly brief: what changed, what is hiring, what is shrinking, and what AI upskilling guidance is most worth acting on right now."
  }
];

export default function AboutPage() {
  return (
    <div className="page-grid grid gap-10">
      <SectionHeading
        eyebrow="About"
        title="A labor-market site for tracking AI job growth, job destruction, and what to do next"
        description="jobanxiety.ai tracks public hiring signals, verified layoff disclosures, and occupation data, then turns that into clearer market context and AI upskilling guidance for newsletter subscribers."
      />

      <section className="editorial-card p-6">
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="body-copy">
              The premise is simple. Public labor-market data exists, but most people encounter it through scattered dashboards,
              optimistic recruiting copy, or headlines that flatten everything into panic. This site tries to do the slower job:
              track where AI is adding demand, track where it is helping justify cuts, label what can be sourced, and keep the
              reader oriented.
            </p>
            <p className="body-copy mt-4">
              That means treating job creation and job destruction as part of the same story. If AI is changing the labor market,
              readers deserve to see both the hiring signals and the contraction signals, not just whichever side makes for a
              cleaner headline.
            </p>
          </div>
          <div className="border-l border-[var(--color-border)] pl-6">
            <p className="eyebrow">What subscribers should get</p>
            <ul className="body-copy mt-4 grid gap-3">
              <li>A weekly read on what is hiring, what is slowing, and which signals matter.</li>
              <li>AI upskilling guidance that helps readers move toward the categories gaining budget and headcount.</li>
              <li>Links back to the source trail, not just a summary stripped of caveats.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {missionAreas.map((area) => (
          <article key={area.title} className="editorial-card p-5">
            <p className="section-title text-[1.3rem]">{area.title}</p>
            <p className="body-copy muted-copy mt-4">{area.copy}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {principles.map((principle) => (
          <article key={principle.title} className="editorial-card p-5">
            <p className="section-title text-[1.3rem]">{principle.title}</p>
            <p className="body-copy muted-copy mt-4">{principle.copy}</p>
          </article>
        ))}
      </section>

      <section className="editorial-card p-6">
        <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="eyebrow">Contact</p>
            <p className="body-copy mt-4">
              If you want to reach the site, send tips, ask about partnerships, or talk about sponsoring newsletter or on-site
              advertising inventory, email
              {" "}
              <a href="mailto:hello@jobanxiety.ai" className="inline-link">
                hello@jobanxiety.ai
              </a>
              .
            </p>
          </div>
          <div className="rounded-[var(--ja-radius-lg)] border border-[var(--ja-fog)] bg-[var(--ja-cloud)] p-5">
            <p className="eyebrow">Sponsor note</p>
            <p className="body-copy mt-4">
              The audience here includes workers, researchers, operators, and journalists following how AI is reshaping the labor
              market. If that audience is a fit for your brand, reach out at
              {" "}
              <a href="mailto:hello@jobanxiety.ai" className="inline-link">
                hello@jobanxiety.ai
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
