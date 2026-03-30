"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { ResearchChartFrame } from "@/components/research/research-chart-frame";
import type { LiveWeeklyOpeningsPoint } from "@/lib/live-market-analytics";

type ResearchLiveOpeningsChartProps = {
  data: LiveWeeklyOpeningsPoint[];
  source: string;
};

export function ResearchLiveOpeningsChart({ data, source }: ResearchLiveOpeningsChartProps) {
  const latest = data[data.length - 1];
  const hasData = data.some((point) => point.openings > 0);

  return (
    <ResearchChartFrame
      eyebrow="Live ATS feed"
      title="Current open roles by original posting week"
      question="How is the current live inventory distributed by original post week across the boards we monitor?"
      description="This chart is built from the current open snapshot, then bucketed by original posted date. It is not a frozen historical series, so older weeks can shrink as roles close."
      statusLabel="Source-backed"
      source={source}
      methodologyLabel="Methodology v1.1"
      legend={[{ label: "Openings posted", tone: "teal", style: "solid" }]}
    >
      <div className="grid gap-4 rounded-[var(--ja-radius-md)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] p-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div>
          <p className="eyebrow">Latest week in view</p>
          <p className="data-copy mt-3 text-[1.35rem] font-semibold text-[var(--ja-ink)]">
            {latest ? latest.openings.toLocaleString("en-US") : "No live rows"} currently open roles
          </p>
        </div>
        <p className="fine-print md:text-right">{hasData ? "Current live inventory by original post week." : "No live ATS rows were returned for this refresh."}</p>
      </div>

      <div className="mt-5 h-[22rem] overflow-hidden">
        {hasData ? (
          <div role="img" aria-label="Area chart showing the current open-role inventory bucketed by original posting week across tracked company career boards." className="h-full">
            <ResponsiveContainer width="100%" height="100%" debounce={150}>
              <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="live-openings-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="var(--ja-teal)" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="var(--ja-teal)" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="rgba(74, 80, 96, 0.12)" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} width={60} tick={{ fill: "#6B7280", fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="openings" stroke="var(--ja-teal)" strokeWidth={2.5} fill="url(#live-openings-fill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center rounded-[var(--ja-radius-md)] border border-dashed border-[var(--ja-fog)] bg-[var(--ja-cloud)] px-6 text-center">
            <div className="max-w-md">
              <p className="eyebrow">No live rows</p>
              <p className="body-copy muted-copy mt-3">
                The feed returned no opening data for this refresh, so the chart stays explicit rather than blank.
              </p>
            </div>
          </div>
        )}
      </div>
    </ResearchChartFrame>
  );
}
