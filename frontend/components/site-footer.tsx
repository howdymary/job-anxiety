import Image from "next/image";
import Link from "next/link";

const navigation = [
  { href: "/jobs", label: "Jobs" },
  { href: "/layoffs", label: "Layoffs" },
  { href: "/trends", label: "Trends" },
  { href: "/career-notes", label: "Career Guides" },
  { href: "/companies", label: "Companies" },
  { href: "/about", label: "About" }
];

const resources = [
  { href: "/check-your-occupation", label: "Occupation check" },
  { href: "/research", label: "Research" },
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
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="max-w-[22rem]">
            <div className="flex items-center gap-4">
              <Image
                src="/logo/jobanxiety-logo.png"
                alt="JobAnxiety.ai lighthouse logo"
                width={56}
                height={56}
                className="h-14 w-14"
              />
              <p className="font-[var(--ja-font-editorial)] text-[2rem] leading-none tracking-[-0.03em] text-white">
                JobAnxiety<span className="text-[var(--ja-teal-light)]">.ai</span>
              </p>
            </div>
            <p className="mt-4 text-[var(--ja-text-base)] leading-[1.7] text-white/78">
              Tracking AI job growth, job destruction, and career transitions for people who want clear sourcing, explicit
              caveats, and less spin.
            </p>
            <p className="mt-4 text-[var(--ja-text-sm)] leading-[1.7] text-white/70">
              Questions, partnerships, or sponsorship inquiries:
              {" "}
              <a href="mailto:hello@jobanxiety.ai" className="text-white underline decoration-white/35 underline-offset-4 transition hover:text-[var(--ja-teal-light)]">
                hello@jobanxiety.ai
              </a>
            </p>
            <p className="mt-3 text-[var(--ja-text-sm)] leading-[1.7] text-white/58">
              Reach out if you want to sponsor newsletter or on-site advertising space.
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
