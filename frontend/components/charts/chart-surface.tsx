"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type ChartSurfaceSize = {
  width: number;
  height: number;
};

type ChartSurfaceProps = {
  children: (size: ChartSurfaceSize) => ReactNode;
  className?: string;
  fallback?: ReactNode;
};

const DEFAULT_FALLBACK = (
  <div
    aria-hidden="true"
    className="h-full w-full rounded-[var(--ja-radius-md)] bg-[var(--ja-cloud)] animate-pulse"
  />
);

export function ChartSurface({ children, className, fallback = DEFAULT_FALLBACK }: ChartSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<ChartSurfaceSize>({ width: 0, height: 0 });

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    let frameId = 0;
    let timeoutId = 0;

    const measure = () => {
      const bounds = element.getBoundingClientRect();
      const next = {
        width: Math.max(0, Math.floor(bounds.width)),
        height: Math.max(0, Math.floor(bounds.height))
      };

      setSize((current) => (current.width === next.width && current.height === next.height ? current : next));
    };

    const scheduleMeasure = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(measure);
    };

    scheduleMeasure();
    timeoutId = window.setTimeout(measure, 120);

    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(scheduleMeasure) : null;
    resizeObserver?.observe(element);

    window.addEventListener("resize", scheduleMeasure);
    window.addEventListener("orientationchange", scheduleMeasure);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("orientationchange", scheduleMeasure);
    };
  }, []);

  const isReady = size.width > 0 && size.height > 0;

  return (
    <div ref={containerRef} className={`h-full w-full min-w-0 ${className ?? ""}`.trim()}>
      {isReady ? children(size) : fallback}
    </div>
  );
}
