import Link from "next/link";

const navigation = [
  { href: "/jobs", label: "Jobs" },
  { href: "/layoffs", label: "Layoffs" },
  { href: "/trends", label: "Trends" },
  { href: "/career-notes", label: "Career Guides" },
  { href: "/companies", label: "Companies" }
];

const resources = [
  { href: "/newsletter", label: "Newsletter" },
  { href: "/methodology", label: "Methodology" },
  { href: "/press", label: "Press" },
  { href: "/api", label: "API" }
];

const legal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/corrections", label: "Corrections" }
];

export function SiteFooter() {
  return (
    <footer className="mt-[var(--ja-space-20)] border-t border-white/10 bg-[var(--ja-charcoal)] text-white">
      <div className="mx-auto grid w-[min(var(--max-w-page),calc(100vw-2rem))] gap-8 py-[var(--ja-space-16)]">
        <div className="rounded-[var(--ja-radius-lg)] border border-white/10 bg-white/4 px-[var(--ja-space-6)] py-[var(--ja-space-5)]">
          <p className="text-center text-[var(--ja-text-sm)] leading-[1.7] text-white/78">
            JobAnxiety.ai is an independent platform. We do not sell recruitment ads or sponsored job placements. Our data
            methodology is open and versioned. All sources are linked. Corrections are public.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="max-w-[22rem]">
            <p className="font-[var(--ja-font-editorial)] text-[2rem] leading-none tracking-[-0.03em] text-white">
              JobAnxiety<span className="text-[var(--ja-teal-light)]">.ai</span>
            </p>
            <p className="mt-4 text-[var(--ja-text-base)] leading-[1.7] text-white/78">
              Source-verified reporting on AI jobs, layoffs, and career transitions for people who want the signal, not the
              spin.
            </p>
            <p className="mt-6 text-[var(--ja-text-xs)] uppercase tracking-[0.08em] text-white/52">Updated for workers, researchers, and journalists.</p>
          </div>
          <FooterColumn title="Navigation" items={navigation} />
          <FooterColumn title="Resources" items={resources} />
          <FooterColumn title="Legal" items={legal} />
        </div>
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
      <p className="text-[var(--ja-text-xs)] font-semibold uppercase tracking-[0.08em] text-white/52">{title}</p>
      <ul className="mt-4 grid gap-3">
        {items.map((item) => (
          <li key={`${title}-${item.label}`}>
            <Link href={item.href} className="text-[var(--ja-text-sm)] text-white/78 transition hover:text-white">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
