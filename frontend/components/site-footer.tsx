import Link from "next/link";

const navigation = [
  { href: "/jobs", label: "Jobs" },
  { href: "/career-notes", label: "Career Notes" },
  { href: "/companies", label: "Companies" },
  { href: "/trends", label: "Trends" },
  { href: "/about", label: "About" }
];

const resources = [
  { href: "/insights", label: "Insights" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/career-notes/ai-engineer", label: "AI Engineer guide" },
  { href: "/career-notes/gtm-engineer", label: "GTM Engineer guide" }
];

const legal = [
  { href: "/about", label: "Editorial policy" },
  { href: "/about", label: "Privacy" },
  { href: "/about", label: "Terms" }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
      <div className="mx-auto grid w-[min(var(--max-w-page),calc(100vw-2rem))] gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div className="max-w-[20rem]">
          <p className="font-[var(--font-display)] text-[1.8rem] tracking-[-0.03em]">Reframe</p>
          <p className="body-copy muted-copy mt-4">
            Editorial field notes, market data, and job discovery for people trying to understand where AI work is actually going.
          </p>
          <p className="fine-print mt-6">Set in Newsreader and Source Serif 4. Built with Next.js.</p>
        </div>
        <FooterColumn title="Navigation" items={navigation} />
        <FooterColumn title="Resources" items={resources} />
        <FooterColumn title="Legal" items={legal} />
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items
}: {
  title: string;
  items: Array<{
    href: string;
    label: string;
  }>;
}) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="mt-4 grid gap-3">
        {items.map((item) => (
          <li key={`${title}-${item.label}`}>
            <Link href={item.href} className="body-copy muted-copy inline-link">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
