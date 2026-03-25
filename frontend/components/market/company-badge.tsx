import type { CompanyTier } from "@/lib/types";

type CompanyBadgeProps = {
  tier: CompanyTier;
  stageLabel: string;
};

export function CompanyBadge({ tier, stageLabel }: CompanyBadgeProps) {
  return (
    <span className="text-[0.78rem] uppercase tracking-[0.06em] text-[var(--color-text-faint)]">
      {stageLabel} · {tier}
    </span>
  );
}
