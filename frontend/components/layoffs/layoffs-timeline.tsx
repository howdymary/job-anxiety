"use client";

import { useMemo, useState } from "react";

import { ChartSurface } from "@/components/charts/chart-surface";

type TimelineLayoffEvent = {
  slug: string;
  company: string;
  announcedAt: string;
  announcedLabel: string;
  affectedCount: number;
  affectedCountLabel: string;
  affectedPercent?: number;
  isApproximate?: boolean;
  confidence: "Confirmed" | "Reported";
  aiSignal: "Cited" | "Not cited";
  sourceType: string;
  sourceLabel: string;
  sourceUrl: string;
  reportingOutlet?: string;
  summary: string;
  aiAttribution?: string;
};

type LayoffsTimelineProps = {
  events: TimelineLayoffEvent[];
  generatedAt: string;
};

type TimelineFilter = "all" | "confirmed" | "reported" | "ai-cited";

type TimelinePoint = TimelineLayoffEvent & {
  timestamp: number;
  monthKey: string;
};

type TimelineBar = {
  event: TimelinePoint;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
};

type TimelineMonth = {
  key: string;
  timestamp: number;
  label: string;
};

const filterOptions: Array<{ key: TimelineFilter; label: string }> = [
  { key: "all", label: "All tracked events" },
  { key: "confirmed", label: "Confirmed only" },
  { key: "reported", label: "Reported only" },
  { key: "ai-cited", label: "AI cited in source text" }
];

const tooltipDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric"
});

const monthTickFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short"
});

const workerNumberFormatter = new Intl.NumberFormat("en-US");

const MARGINS = {
  top: 16,
  right: 24,
  bottom: 52,
  left: 76
};

export function LayoffsTimeline({ events, generatedAt }: LayoffsTimelineProps) {
  const [filter, setFilter] = useState<TimelineFilter>("all");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const filteredEvents = useMemo(() => {
    const nextEvents =
      filter === "ai-cited"
        ? events.filter((event) => event.aiSignal === "Cited")
        : filter === "confirmed"
          ? events.filter((event) => event.confidence === "Confirmed")
          : filter === "reported"
            ? events.filter((event) => event.confidence === "Reported")
            : events;

    return [...nextEvents]
      .sort((left, right) => new Date(left.announcedAt).getTime() - new Date(right.announcedAt).getTime())
      .map(
        (event): TimelinePoint => ({
          ...event,
          timestamp: new Date(event.announcedAt).getTime(),
          monthKey: getMonthKey(new Date(event.announcedAt))
        })
      );
  }, [events, filter]);

  const timelineMonths = useMemo(() => buildTimelineMonths(filteredEvents), [filteredEvents]);
  const yMax = useMemo(() => getNiceMax(filteredEvents), [filteredEvents]);

  return (
    <article className="editorial-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[rgba(26,26,24,0.08)] pb-5">
        <div className="max-w-[40rem]">
          <p className="eyebrow">Interactive tracker</p>
          <h2 className="section-title mt-3 text-[1.55rem]">Layoff timeline</h2>
          <p className="body-copy muted-copy mt-3">
            Time runs left to right. Each bar marks a single disclosed or reported workforce reduction, and bar height shows
            how many workers were affected. Hover a bar to see the company, date, source tier, and tracked AI language.
          </p>
        </div>

        <div className="grid gap-3">
          <div className="flex flex-wrap justify-end gap-2">
            {filterOptions.map((option) => {
              const isActive = option.key === filter;

              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setFilter(option.key)}
                  className={`rounded-full border px-3 py-1.5 text-[0.75rem] uppercase tracking-[0.08em] transition-colors ${
                    isActive
                      ? "border-[var(--ja-ink)] bg-[var(--ja-ink)] text-[var(--ja-paper)]"
                      : "border-[rgba(26,26,24,0.12)] text-[var(--ja-slate)] hover:border-[var(--ja-ink)] hover:text-[var(--ja-ink)]"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <p className="fine-print text-right">
            Last refreshed{" "}
            {new Date(generatedAt).toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
              timeZoneName: "short"
            })}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-4 text-[0.78rem] uppercase tracking-[0.08em] text-[var(--ja-slate)]">
        <LegendPill color="var(--color-red)" label="Confirmed event with AI cited" />
        <LegendPill color="var(--ja-slate)" label="Confirmed event without explicit AI citation" />
        <LegendPill color="var(--color-amber)" label="Trusted reported event" />
      </div>

      {filteredEvents.length ? (
        <div className="mt-5 h-[22rem] md:h-[24rem] lg:h-[26rem]">
          <ChartSurface>
            {({ width, height }) => {
              const layout = buildChartLayout(filteredEvents, timelineMonths, width, height, yMax);
              const hoveredBar = layout.bars.find((bar) => bar.event.slug === hoveredSlug) ?? null;
              const tooltipWidth = Math.min(304, Math.max(width - 24, 220));
              const tooltipLeft = hoveredBar ? clamp(hoveredBar.x + 18, 12, width - tooltipWidth - 12) : 0;
              const tooltipTop = hoveredBar ? clamp(hoveredBar.y - 22, 8, height - 220) : 0;

              return (
                <div className="relative h-full w-full">
                  <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Layoff timeline chart">
                    <AxisLayer width={width} height={height} yMax={yMax} timelineMonths={timelineMonths} />

                    {layout.bars.map((bar) => {
                      const isHovered = hoveredBar?.event.slug === bar.event.slug;

                      return (
                        <g
                          key={bar.event.slug}
                          role="button"
                          tabIndex={0}
                          aria-label={`${bar.event.company}, ${bar.event.affectedCountLabel}, announced ${bar.event.announcedLabel}`}
                          className="cursor-pointer outline-none"
                          onMouseEnter={() => setHoveredSlug(bar.event.slug)}
                          onMouseLeave={() => setHoveredSlug((current) => (current === bar.event.slug ? null : current))}
                          onFocus={() => setHoveredSlug(bar.event.slug)}
                          onBlur={() => setHoveredSlug((current) => (current === bar.event.slug ? null : current))}
                          onClick={() => openSource(bar.event.sourceUrl)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              openSource(bar.event.sourceUrl);
                            }
                          }}
                        >
                          <rect
                            x={bar.x - bar.width / 2}
                            y={bar.y}
                            width={bar.width}
                            height={bar.height}
                            rx={10}
                            fill={bar.fill}
                            stroke={isHovered ? "rgba(26,26,24,0.65)" : "rgba(26,26,24,0.12)"}
                            strokeWidth={isHovered ? 2 : 1}
                            opacity={isHovered ? 1 : 0.92}
                          />
                        </g>
                      );
                    })}
                  </svg>

                  {hoveredBar ? (
                    <div className="pointer-events-none absolute z-10" style={{ left: tooltipLeft, top: tooltipTop, width: tooltipWidth }}>
                      <LayoffsTimelineTooltip event={hoveredBar.event} />
                    </div>
                  ) : null}
                </div>
              );
            }}
          </ChartSurface>
        </div>
      ) : (
        <div className="mt-5 rounded-[var(--ja-radius-md)] border border-dashed border-[rgba(26,26,24,0.12)] px-4 py-6">
          <p className="section-title text-[1.1rem]">No events match the current timeline filter.</p>
          <p className="body-copy muted-copy mt-3">
            The tracker does not infer AI causation from weak sourcing. Switch back to all tracked events to review the full
            monitored set.
          </p>
        </div>
      )}
    </article>
  );
}

function AxisLayer({
  width,
  height,
  yMax,
  timelineMonths
}: {
  width: number;
  height: number;
  yMax: number;
  timelineMonths: TimelineMonth[];
}) {
  const plotWidth = Math.max(width - MARGINS.left - MARGINS.right, 1);
  const plotHeight = Math.max(height - MARGINS.top - MARGINS.bottom, 1);
  const baselineY = MARGINS.top + plotHeight;
  const yTicks = buildYTicks(yMax);
  const monthTicks = selectVisibleMonthTicks(timelineMonths);

  return (
    <g>
      {yTicks.map((tickValue) => {
        const y = valueToY(tickValue, yMax, plotHeight);

        return (
          <g key={tickValue} transform={`translate(0 ${y})`}>
            <line
              x1={MARGINS.left}
              x2={width - MARGINS.right}
              y1={0}
              y2={0}
              stroke={tickValue === 0 ? "rgba(26,26,24,0.2)" : "rgba(26,26,24,0.08)"}
              strokeWidth={tickValue === 0 ? 1.5 : 1}
            />
            <text
              x={MARGINS.left - 14}
              y={4}
              textAnchor="end"
              className="fill-[var(--ja-slate)] text-[11px]"
              style={{ fontFamily: "var(--ja-font-data)" }}
            >
              {tickValue === 0 ? "0" : workerNumberFormatter.format(tickValue)}
            </text>
          </g>
        );
      })}

      {monthTicks.map((tick) => {
        const x = monthIndexToX(tick.index, timelineMonths.length, plotWidth);

        return (
          <g key={tick.key} transform={`translate(${x} 0)`}>
            <line x1={0} x2={0} y1={MARGINS.top} y2={baselineY} stroke="rgba(26,26,24,0.05)" strokeDasharray="3 5" />
            <text
              x={0}
              y={baselineY + 24}
              textAnchor="middle"
              className="fill-[var(--ja-slate)] text-[11px]"
              style={{ fontFamily: "var(--ja-font-body)" }}
            >
              {tick.label}
            </text>
          </g>
        );
      })}

      <text
        x={MARGINS.left}
        y={MARGINS.top - 4}
        className="fill-[var(--ja-slate)] text-[11px]"
        style={{ fontFamily: "var(--ja-font-body)" }}
      >
        Impacted workers
      </text>
    </g>
  );
}

function LegendPill({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}

function LayoffsTimelineTooltip({ event }: { event: TimelinePoint }) {
  return (
    <div className="max-w-[19rem] rounded-[var(--ja-radius-md)] border border-[rgba(26,26,24,0.12)] bg-[var(--ja-paper)] p-4 shadow-[0_12px_40px_rgba(26,26,24,0.08)]">
      <p className="eyebrow">{event.sourceType}</p>
      <p className="mt-2 font-[var(--ja-font-editorial)] text-[1.05rem] leading-tight text-[var(--ja-ink)]">{event.company}</p>
      <p className="fine-print mt-2 uppercase tracking-[0.08em]">{event.confidence}</p>
      {event.reportingOutlet ? <p className="fine-print mt-1">Trusted reporting outlet: {event.reportingOutlet}</p> : null}
      <p className="fine-print mt-1">
        {tooltipDateFormatter.format(new Date(event.announcedAt))} · {event.affectedCountLabel}
        {typeof event.affectedPercent === "number" ? ` · ${event.affectedPercent}% of workforce` : ""}
      </p>
      <p className="body-copy muted-copy mt-3">{event.summary}</p>
      <p className="body-copy mt-3">
        <strong>AI signal:</strong>{" "}
        {event.aiAttribution
          ? event.aiAttribution
          : event.aiSignal === "Cited"
            ? "AI appears in the tracked source text."
            : "No explicit AI attribution in the tracked source."}
      </p>
      <p className="fine-print mt-3">Click to open: {event.sourceLabel}</p>
    </div>
  );
}

function buildChartLayout(
  events: TimelinePoint[],
  timelineMonths: TimelineMonth[],
  width: number,
  height: number,
  yMax: number
) {
  const plotWidth = Math.max(width - MARGINS.left - MARGINS.right, 1);
  const plotHeight = Math.max(height - MARGINS.top - MARGINS.bottom, 1);
  const baselineY = MARGINS.top + plotHeight;
  const monthCount = Math.max(timelineMonths.length, 1);
  const monthSlotWidth = plotWidth / monthCount;
  const maxEventsPerMonth = getMaxEventsPerMonth(events);
  const baseBarWidth = clamp(monthSlotWidth / Math.max(maxEventsPerMonth + 1, 2), 12, 28);
  const monthIndexByKey = new Map(timelineMonths.map((month, index) => [month.key, index]));

  const rawBars = events.map((event) => {
    const monthIndex = monthIndexByKey.get(event.monthKey) ?? 0;
    const x = monthIndexToX(monthIndex, monthCount, plotWidth);
    const y = valueToY(event.affectedCount, yMax, plotHeight);

    return {
      event,
      monthIndex,
      baseX: x,
      y,
      height: Math.max(baselineY - y, 4)
    };
  });

  const bars: TimelineBar[] = [];
  const minCenter = MARGINS.left + baseBarWidth / 2;
  const maxCenter = width - MARGINS.right - baseBarWidth / 2;
  let cluster: typeof rawBars = [];

  const flushCluster = () => {
    if (!cluster.length) {
      return;
    }

    cluster.forEach((bar, index) => {
      const offset = (index - (cluster.length - 1) / 2) * (baseBarWidth + 2);
      const x = clamp(bar.baseX + offset, minCenter, maxCenter);

      bars.push({
        event: bar.event,
        x,
        y: bar.y,
        width: baseBarWidth,
        height: bar.height,
        fill: getBarColor(bar.event)
      });
    });

    cluster = [];
  };

  rawBars.forEach((bar) => {
    const previous = cluster[cluster.length - 1];

    if (!previous || bar.monthIndex === previous.monthIndex) {
      cluster.push(bar);
      return;
    }

    flushCluster();
    cluster.push(bar);
  });

  flushCluster();

  return { bars };
}

function buildYTicks(yMax: number) {
  const step = yMax / 4;

  return [0, step, step * 2, step * 3, yMax];
}

function buildTimelineMonths(events: TimelinePoint[]) {
  if (!events.length) {
    const now = new Date();

    return [
      {
        key: getMonthKey(now),
        timestamp: new Date(now.getFullYear(), now.getMonth(), 1).getTime(),
        label: monthTickFormatter.format(now)
      }
    ];
  }

  const first = new Date(events[0].timestamp);
  const last = new Date(events[events.length - 1].timestamp);
  const cursor = new Date(first.getFullYear(), first.getMonth(), 1);
  const end = new Date(last.getFullYear(), last.getMonth(), 1);
  const months: TimelineMonth[] = [];

  while (cursor <= end) {
    months.push({
      key: getMonthKey(cursor),
      timestamp: cursor.getTime(),
      label: monthTickFormatter.format(cursor)
    });

    cursor.setMonth(cursor.getMonth() + 1);
  }

  return months;
}

function selectVisibleMonthTicks(timelineMonths: TimelineMonth[]) {
  const step = Math.max(1, Math.ceil(timelineMonths.length / 8));

  return timelineMonths
    .map((month, index) => ({ ...month, index }))
    .filter((month, index, months) => index % step === 0 || index === months.length - 1);
}

function getNiceMax(events: TimelinePoint[]) {
  const maxValue = Math.max(...events.map((event) => event.affectedCount), 1000);
  const roughStep = maxValue / 4;
  const magnitude = 10 ** Math.floor(Math.log10(roughStep || 1));
  const normalized = roughStep / magnitude;
  const niceFactor = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;

  return niceFactor * magnitude * 4;
}

function monthIndexToX(monthIndex: number, monthCount: number, plotWidth: number) {
  const progress = (monthIndex + 0.5) / Math.max(monthCount, 1);

  return MARGINS.left + progress * plotWidth;
}

function valueToY(value: number, yMax: number, plotHeight: number) {
  const safeValue = Math.max(0, value);
  const progress = safeValue / Math.max(yMax, 1);

  return MARGINS.top + plotHeight - progress * plotHeight;
}

function getBarColor(event: TimelinePoint) {
  if (event.confidence === "Reported") {
    return "var(--color-amber)";
  }

  return event.aiSignal === "Cited" ? "var(--color-red)" : "var(--ja-slate)";
}

function getMonthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getMaxEventsPerMonth(events: TimelinePoint[]) {
  const counts = new Map<string, number>();

  events.forEach((event) => {
    counts.set(event.monthKey, (counts.get(event.monthKey) ?? 0) + 1);
  });

  return Math.max(...counts.values(), 1);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function openSource(url: string) {
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
