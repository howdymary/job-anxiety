import Link from "next/link";

import type { CompanyRecord } from "@/lib/types";

type CompanyCardProps = {
  company: CompanyRecord;
  openRoles: number;
};

export function CompanyCard({ company, openRoles }: CompanyCardProps) {
  return (
    <Link
      href={`/companies/${company.slug}`}
      className="editorial-card flex flex-col justify-between gap-4 p-5 transition hover:-translate-y-px hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-sm)]"
    >
      <div>
        <p className="eyebrow">{company.stageLabel}</p>
        <h2 className="section-title mt-3 text-[1.55rem]">{company.name}</h2>
        <p className="body-copy muted-copy mt-4 text-[0.97rem]">{company.description}</p>
      </div>
      <div className="grid gap-2 text-[0.86rem] text-[var(--color-text-muted)]">
        <p>{company.headquarters}</p>
        <p>{company.hiringFocus}</p>
        <p className="data-copy text-[0.76rem] uppercase text-[var(--color-text-faint)]">{openRoles} open roles in Reframe</p>
      </div>
    </Link>
  );
}
