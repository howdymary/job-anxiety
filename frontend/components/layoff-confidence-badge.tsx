import type { LayoffConfidence } from "@/lib/types";

type LayoffConfidenceBadgeProps = {
  confidence: LayoffConfidence;
};

const styles: Record<LayoffConfidence, string> = {
  Confirmed: "border-[var(--color-green)] text-[var(--color-green)]",
  Reported: "border-[var(--color-amber)] text-[var(--color-amber)]",
  Rumored: "border-[var(--color-red)] text-[var(--color-red)]"
};

export function LayoffConfidenceBadge({ confidence }: LayoffConfidenceBadgeProps) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-[0.72rem] uppercase tracking-[0.08em] ${styles[confidence]}`}>
      {confidence}
    </span>
  );
}
