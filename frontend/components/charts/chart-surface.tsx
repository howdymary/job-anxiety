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
    let settleTimeoutId = 0;

    const resolveBounds = () => {
      let width = Math.max(0, Math.floor(element.getBoundingClientRect().width));
      let height = Math.max(0, Math.floor(element.getBoundingClientRect().height));
      let parent = element.parentElement;

      while ((width === 0 || height === 0) && parent) {
        const parentBounds = parent.getBoundingClientRect();

        if (width === 0 && parentBounds.width > 0) {
          width = Math.floor(parentBounds.width);
        }

        if (height === 0 && parentBounds.height > 0) {
          height = Math.floor(parentBounds.height);
        }

        parent = parent.parentElement;
      }

      return { width, height };
    };

    const measure = () => {
      const next = resolveBounds();

      setSize((current) => (current.width === next.width && current.height === next.height ? current : next));
    };

    const scheduleMeasure = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(measure);
    };

    scheduleMeasure();
    timeoutId = window.setTimeout(measure, 120);
    settleTimeoutId = window.setTimeout(measure, 360);

    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(scheduleMeasure) : null;
    resizeObserver?.observe(element);

    window.addEventListener("resize", scheduleMeasure);
    window.addEventListener("orientationchange", scheduleMeasure);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      window.clearTimeout(settleTimeoutId);
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
