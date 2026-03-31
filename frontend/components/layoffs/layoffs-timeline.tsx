"use client";

import { useMemo, useState } from "react";
import { CartesianGrid, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";

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
  dotSize: number;
};

const filterOptions: Array<{ key: TimelineFilter; label: string }> = [
  { key: "all", label: "All tracked events" },
  { key: "confirmed", label: "Confirmed only" },
  { key: "reported", label: "Reported only" },
  { key: "ai-cited", label: "AI cited in source text" }
];

const axisDateFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

const tooltipDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric"
});

export function LayoffsTimeline({ events, generatedAt }: LayoffsTimelineProps) {
  const [filter, setFilter] = useState<TimelineFilter>("all");

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
          dotSize: 12 + Math.min(20, Math.sqrt(Math.max(event.affectedCount, 1)) / 4)
        })
      );
  }, [events, filter]);

  const domain = useMemo(() => {
    if (!filteredEvents.length) {
      const now = Date.now();
      const pad = 1000 * 60 * 60 * 24 * 7;
      return [now - pad, now + pad] as [number, number];
    }

    const timestamps = filteredEvents.map((event) => event.timestamp);
    const min = Math.min(...timestamps);
    const max = Math.max(...timestamps);
    const pad = Math.max(1000 * 60 * 60 * 24 * 7, Math.round((max - min || 0) * 0.2));

    return [min - pad, max + pad] as [number, number];
  }, [filteredEvents]);

  const chartHeight = Math.max(320, filteredEvents.length * 78);

  return (
    <article className="editorial-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[rgba(26,26,24,0.08)] pb-5">
        <div className="max-w-[38rem]">
          <p className="eyebrow">Interactive tracker</p>
          <h2 className="section-title mt-3 text-[1.55rem]">Layoff timeline</h2>
          <p className="body-copy muted-copy mt-3">
            Hover a point to see which company disclosed or reported the cut, how many workers were affected, and whether AI
            appeared in the tracked source text. Click a point to open the underlying filing, company release, or report.
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
        <LegendPill color="var(--color-amber)" label="High-confidence reported event" />
        <LegendPill color="var(--ja-ink)" label="Point size tracks affected workers" />
      </div>

      {filteredEvents.length ? (
        <div className="mt-5 min-h-[20rem]" style={{ height: chartHeight }}>
          <ChartSurface>
            {({ width, height }) => (
              <ScatterChart width={width} height={height} margin={{ top: 12, right: 16, bottom: 8, left: 8 }}>
                <CartesianGrid vertical={false} stroke="rgba(26,26,24,0.08)" />
                <XAxis
                  type="number"
                  dataKey="timestamp"
                  domain={domain}
                  tickFormatter={(value) => axisDateFormatter.format(new Date(value))}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#4A5060", fontSize: 12 }}
                />
                <YAxis
                  type="category"
                  dataKey="company"
                  width={160}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#4A5060", fontSize: 12 }}
                  tickFormatter={(value) => truncateCompany(value)}
                />
                <Tooltip content={<LayoffsTimelineTooltip />} cursor={{ stroke: "rgba(26,26,24,0.14)", strokeDasharray: "3 3" }} />
                <Scatter
                  data={filteredEvents}
                  shape={(shapeProps: { cx?: number; cy?: number; payload?: TimelinePoint }) => <TimelineDot {...shapeProps} />}
                  onClick={(point) => {
                    if (typeof window !== "undefined" && point && "sourceUrl" in point && typeof point.sourceUrl === "string") {
                      window.open(point.sourceUrl, "_blank", "noopener,noreferrer");
                    }
                  }}
                />
              </ScatterChart>
            )}
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

function truncateCompany(value: string) {
  return value.length > 24 ? `${value.slice(0, 21)}…` : value;
}

function LegendPill({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}

function TimelineDot(props: {
  cx?: number;
  cy?: number;
  payload?: TimelinePoint;
}) {
  if (typeof props.cx !== "number" || typeof props.cy !== "number" || !props.payload) {
    return null;
  }

  const fill =
    props.payload.confidence === "Reported"
      ? "var(--color-amber)"
      : props.payload.aiSignal === "Cited"
        ? "var(--color-red)"
        : "var(--ja-slate)";

  return (
    <circle
      cx={props.cx}
      cy={props.cy}
      r={props.payload.dotSize}
      fill={fill}
      fillOpacity={0.9}
      stroke="rgba(26,26,24,0.18)"
      strokeWidth={1.5}
      className="cursor-pointer transition-opacity hover:opacity-80"
    />
  );
}

function LayoffsTimelineTooltip({
  active,
  payload
}: {
  active?: boolean;
  payload?: Array<{ payload: TimelinePoint }>;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const event = payload[0]?.payload;

  if (!event) {
    return null;
  }

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
