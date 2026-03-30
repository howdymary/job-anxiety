import type { ReactNode } from "react";

type ResearchChartLegendItem = {
  label: string;
  tone: "teal" | "coral" | "amber" | "indigo" | "slate";
  style?: "solid" | "dashed" | "band" | "dot";
};

type ResearchChartFrameProps = {
  eyebrow: string;
  title: string;
  question: string;
  description?: string;
  statusLabel?: string;
  source: string;
  methodologyLabel?: string;
  methodologyHref?: string;
  legend?: ResearchChartLegendItem[];
  controls?: ReactNode;
  children: ReactNode;
};

const toneStyles: Record<ResearchChartLegendItem["tone"], { color: string; soft: string }> = {
  teal: { color: "var(--ja-teal)", soft: "rgba(13, 148, 136, 0.16)" },
  coral: { color: "var(--ja-coral)", soft: "rgba(220, 38, 38, 0.14)" },
  amber: { color: "var(--ja-amber)", soft: "rgba(217, 119, 6, 0.18)" },
  indigo: { color: "var(--ja-chart-2)", soft: "rgba(99, 102, 241, 0.16)" },
  slate: { color: "var(--ja-slate)", soft: "rgba(74, 80, 96, 0.16)" }
};

export function ResearchChartFrame({
  eyebrow,
  title,
  question,
  description,
  statusLabel,
  source,
  methodologyLabel = "Research Protocol v1.0",
  methodologyHref = "/methodology",
  legend,
  controls,
  children
}: ResearchChartFrameProps) {
  return (
    <article className="editorial-card min-w-0 p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="max-w-[44rem]">
          <p className="eyebrow">{eyebrow}</p>
          {statusLabel ? (
            <div className="mt-3">
              <span className="rounded-full border border-[rgba(13,148,136,0.2)] bg-[var(--ja-teal-light)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--ja-teal-dark)]">
                {statusLabel}
              </span>
            </div>
          ) : null}
          <h2 className="section-title mt-3 text-[1.4rem]">{title}</h2>
          <p className="fine-print mt-3">Question this chart answers: {question}</p>
          {description ? <p className="body-copy muted-copy mt-4">{description}</p> : null}
        </div>

        {controls ? <div className="flex flex-wrap gap-2 md:justify-end">{controls}</div> : null}
      </div>

      {legend?.length ? (
        <div className="mt-5 flex flex-wrap gap-3">
          {legend.map((item) => (
            <div
              key={`${item.label}-${item.tone}-${item.style ?? "solid"}`}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--ja-fog)] bg-[var(--ja-paper)] px-3 py-1.5"
            >
              <LegendMark tone={item.tone} style={item.style ?? "solid"} />
              <span className="text-[var(--ja-text-xs)] font-medium tracking-[0.01em] text-[var(--ja-slate)]">{item.label}</span>
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-6 min-w-0">{children}</div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="fine-print">Source: {source}</p>
        <a href={methodologyHref} className="inline-link fine-print">
          {methodologyLabel}
        </a>
      </div>
    </article>
  );
}

function LegendMark({
  tone,
  style
}: {
  tone: ResearchChartLegendItem["tone"];
  style: NonNullable<ResearchChartLegendItem["style"]>;
}) {
  const palette = toneStyles[tone];

  if (style === "dot") {
    return <span className="inline-flex h-3 w-3 rounded-full" style={{ backgroundColor: palette.color }} aria-hidden="true" />;
  }

  if (style === "band") {
    return (
      <span
        className="inline-flex h-3 w-6 rounded-full border"
        style={{ backgroundColor: palette.soft, borderColor: palette.color }}
        aria-hidden="true"
      />
    );
  }

  return (
    <span className="relative inline-flex h-3 w-6 items-center" aria-hidden="true">
      <span
        className="block h-[2px] w-full rounded-full"
        style={{
          backgroundColor: style === "dashed" ? "transparent" : palette.color,
          borderTop: style === "dashed" ? `2px dashed ${palette.color}` : "none"
        }}
      />
    </span>
  );
}
