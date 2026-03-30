"use client";

import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

import { ChartSurface } from "@/components/charts/chart-surface";
import type { TrendPoint } from "@/lib/types";

type TrendChartProps = {
  data: TrendPoint[];
};

export function TrendChart({ data }: TrendChartProps) {
  return (
    <div className="editorial-card p-5">
      <div className="mb-5">
        <p className="eyebrow">Hiring momentum</p>
        <h2 className="section-title mt-3">AI roles tracked over the last six months</h2>
      </div>
      <div className="h-[20rem]">
        <ChartSurface>
          {({ width, height }) => (
            <AreaChart width={width} height={height} data={data}>
              <defs>
                <linearGradient id="market-chart-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#1A56DB" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#1A56DB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="rgba(26,26,24,0.08)" />
              <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#6B6B64", fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: "#6B6B64", fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="roles" stroke="#1A56DB" fill="url(#market-chart-fill)" strokeWidth={2} />
            </AreaChart>
          )}
        </ChartSurface>
      </div>
    </div>
  );
}
