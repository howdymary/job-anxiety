import type { ReactNode } from "react";

import type {
  ResearchRoadmapItem,
  ResearchSectorCoverage,
  ResearchSourceMatrixRow
} from "@/lib/research-content";

export function ResearchPhaseTimeline({
  phases
}: {
  phases: Array<{ title: string; timing: string; summary: string }>;
}) {
  return (
    <article className="editorial-card p-6">
      <p className="eyebrow">Execution timeline</p>
      <h2 className="section-title mt-3 text-[1.4rem]">When does the research move from data to publication?</h2>
      <p className="fine-print mt-3">Question this visual answers: how is the study sequenced, and what gets built in each phase?</p>

      <div className="mt-6 grid gap-4">
        {phases.map((phase, index) => (
          <div key={phase.title} className="grid gap-3 rounded-[var(--ja-radius-md)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] p-5 md:grid-cols-[auto_1fr]">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--ja-charcoal)] font-[var(--ja-font-data)] text-[var(--ja-text-sm)] text-white">
                {index + 1}
              </div>
              <div className="hidden h-full w-px bg-[var(--ja-fog)] md:block" aria-hidden="true" />
            </div>
            <div>
              <p className="eyebrow">{phase.timing}</p>
              <h3 className="mt-2 text-[var(--ja-text-lg)] font-semibold text-[var(--ja-ink)]">{phase.title}</h3>
              <p className="body-copy muted-copy mt-3">{phase.summary}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="fine-print">Source: Research Protocol v1.0</p>
        <a href="/research" className="inline-link fine-print">
          Research page
        </a>
      </div>
    </article>
  );
}

export function ResearchSourceMatrix({
  rows
}: {
  rows: ResearchSourceMatrixRow[];
}) {
  return (
    <article className="editorial-card p-6">
      <p className="eyebrow">Data coverage matrix</p>
      <h2 className="section-title mt-3 text-[1.4rem]">Which data streams feed which parts of the study?</h2>
      <p className="fine-print mt-3">Question this visual answers: where does each part of the study get its empirical footing?</p>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-[var(--ja-text-xs)] uppercase tracking-[0.08em] text-[var(--ja-slate)]">Source</th>
              <th className="px-4 py-2 text-center text-[var(--ja-text-xs)] uppercase tracking-[0.08em] text-[var(--ja-slate)]">Precursor</th>
              <th className="px-4 py-2 text-center text-[var(--ja-text-xs)] uppercase tracking-[0.08em] text-[var(--ja-slate)]">Software</th>
              <th className="px-4 py-2 text-center text-[var(--ja-text-xs)] uppercase tracking-[0.08em] text-[var(--ja-slate)]">National</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.source}>
                <td className="rounded-l-[var(--ja-radius-md)] border border-r-0 border-[var(--ja-fog)] bg-[var(--ja-paper)] px-4 py-4">
                  <p className="text-[var(--ja-text-sm)] font-semibold text-[var(--ja-ink)]">{row.source}</p>
                  <p className="fine-print mt-2">{row.note}</p>
                </td>
                <MatrixCell active={row.precursor} />
                <MatrixCell active={row.software} />
                <MatrixCell active={row.national} roundedRight />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="fine-print">Source: Research Protocol v1.0</p>
        <a href="/methodology" className="inline-link fine-print">
          Methodology
        </a>
      </div>
    </article>
  );
}

export function ResearchSectorCoverage({
  sectors
}: {
  sectors: ResearchSectorCoverage[];
}) {
  return (
    <article className="editorial-card p-6">
      <p className="eyebrow">Sector coverage</p>
      <h2 className="section-title mt-3 text-[1.4rem]">Which sectors sit closest to the front of the research queue?</h2>
      <p className="fine-print mt-3">Question this visual answers: where is the study expecting the clearest displacement and transition signals first?</p>

      <div className="mt-6 grid gap-3">
        {sectors.map((sector) => (
          <div key={sector.sector} className="rounded-[var(--ja-radius-md)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[var(--ja-text-sm)] font-semibold text-[var(--ja-ink)]">{sector.sector}</p>
                <p className="fine-print mt-2">{sector.detail}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Pill tone="indigo">{sector.exposure}</Pill>
                <Pill tone={priorityTone(sector.priority)}>{sector.priority}</Pill>
              </div>
            </div>
            <div className="mt-4">
              <p className="mb-2 text-[var(--ja-text-xs)] uppercase tracking-[0.08em] text-[var(--ja-steel)]">Exposure level</p>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={`${sector.sector}-${index}`}
                    className={`h-2 rounded-full ${
                      index < exposureLevel(sector.exposure) ? "bg-[var(--ja-chart-2)]" : "bg-[var(--ja-fog)]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export function ResearchChartRoadmap({
  items
}: {
  items: ResearchRoadmapItem[];
}) {
  return (
    <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article key={item.id} className="editorial-card overflow-hidden p-0">
          <div className="border-b border-[var(--ja-fog)] bg-[var(--ja-cloud)] px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <p className="eyebrow">{item.id}</p>
              <Pill tone="slate">Planned</Pill>
            </div>
            <h2 className="section-title mt-3 text-[1.2rem]">{item.title}</h2>
          </div>
          <div className="px-5 pt-5">{renderPreview(item.preview)}</div>
          <div className="px-5 pb-5 pt-4">
            <p className="text-[var(--ja-text-sm)] font-semibold text-[var(--ja-ink)]">{item.question}</p>
            <p className="body-copy muted-copy mt-3 text-[var(--ja-text-sm)]">{item.summary}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

export function ResearchMethodWalkthrough({
  steps
}: {
  steps: Array<{ step: string; title: string; detail: string }>;
}) {
  return (
    <article className="editorial-card p-6">
      <p className="eyebrow">Method walkthrough</p>
      <h2 className="section-title mt-3 text-[1.4rem]">How does the protocol turn labor data into an AI-impact estimate?</h2>
      <p className="fine-print mt-3">Question this visual answers: where do the numbers come from, and what guards stop the analysis from overreaching?</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-5">
        {steps.map((step) => (
          <div key={step.step} className="rounded-[var(--ja-radius-md)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--ja-charcoal)] font-[var(--ja-font-data)] text-[var(--ja-text-xs)] text-white">
                {step.step}
              </div>
              <p className="eyebrow">Step {step.step}</p>
            </div>
            <h3 className="mt-4 text-[var(--ja-text-sm)] font-semibold leading-[1.4] text-[var(--ja-ink)]">{step.title}</h3>
            <p className="body-copy muted-copy mt-3 text-[var(--ja-text-sm)]">{step.detail}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function MatrixCell({ active, roundedRight = false }: { active: boolean; roundedRight?: boolean }) {
  return (
    <td
      className={`border border-[var(--ja-fog)] bg-[var(--ja-paper)] px-4 py-4 text-center ${roundedRight ? "rounded-r-[var(--ja-radius-md)]" : ""}`}
    >
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-[var(--ja-text-xs)] font-semibold ${
          active ? "bg-[var(--ja-emerald-light)] text-[var(--ja-emerald)]" : "bg-[var(--ja-cloud)] text-[var(--ja-steel)]"
        }`}
      >
        {active ? "Yes" : "No"}
      </span>
    </td>
  );
}

function Pill({ children, tone }: { children: ReactNode; tone: "indigo" | "teal" | "amber" | "slate" }) {
  const className =
    tone === "indigo"
      ? "bg-[rgba(99,102,241,0.12)] text-[var(--ja-chart-2)] border-[rgba(99,102,241,0.25)]"
      : tone === "teal"
        ? "bg-[var(--ja-teal-light)] text-[var(--ja-teal-dark)] border-[rgba(13,148,136,0.22)]"
        : tone === "amber"
          ? "bg-[var(--ja-amber-light)] text-[var(--ja-amber)] border-[rgba(217,119,6,0.22)]"
          : "bg-[var(--ja-cloud)] text-[var(--ja-slate)] border-[var(--ja-fog)]";

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] ${className}`}>
      {children}
    </span>
  );
}

function priorityTone(priority: ResearchSectorCoverage["priority"]) {
  if (priority === "Primary") {
    return "teal";
  }
  if (priority === "High") {
    return "amber";
  }
  return "slate";
}

function exposureLevel(exposure: ResearchSectorCoverage["exposure"]) {
  if (exposure === "Very High") {
    return 4;
  }
  if (exposure === "High") {
    return 3;
  }
  if (exposure === "Medium-High") {
    return 2;
  }
  return 1;
}

function renderPreview(preview: ResearchRoadmapItem["preview"]) {
  if (preview === "split-area") {
    return (
      <svg viewBox="0 0 320 120" className="w-full">
        <path d="M0 82 C36 76 52 52 84 58 C112 64 128 94 160 84 C196 72 216 24 252 36 C284 46 302 72 320 68 L320 120 L0 120 Z" fill="rgba(13,148,136,0.2)" />
        <path d="M0 38 C28 48 56 44 86 52 C122 62 152 42 184 56 C218 72 244 32 280 40 C296 44 308 48 320 44 L320 0 L0 0 Z" fill="rgba(220,38,38,0.14)" />
        <line x1="0" y1="60" x2="320" y2="60" stroke="rgba(74,80,96,0.18)" strokeDasharray="4 4" />
        <path d="M0 82 C36 76 52 52 84 58 C112 64 128 94 160 84 C196 72 216 24 252 36 C284 46 302 72 320 68" fill="none" stroke="var(--ja-teal)" strokeWidth="3" />
        <path d="M0 38 C28 48 56 44 86 52 C122 62 152 42 184 56 C218 72 244 32 280 40 C296 44 308 48 320 44" fill="none" stroke="var(--ja-coral)" strokeWidth="3" />
      </svg>
    );
  }

  if (preview === "dual-line") {
    return (
      <svg viewBox="0 0 320 120" className="w-full">
        <path d="M8 96 C54 90 80 78 110 60 C144 40 176 34 214 26 C252 18 286 18 312 12" fill="none" stroke="var(--ja-chart-2)" strokeWidth="3" />
        <path d="M8 104 C56 100 82 94 112 80 C148 64 182 50 212 30 C244 14 274 10 312 8" fill="none" stroke="var(--ja-coral)" strokeWidth="3" strokeDasharray="7 5" />
        <path d="M8 104 C56 100 82 94 112 80 C148 64 182 50 212 30 C244 14 274 10 312 8 L312 36 C274 38 244 44 212 54 C182 66 148 80 112 92 C82 102 56 108 8 112 Z" fill="rgba(217,119,6,0.12)" />
      </svg>
    );
  }

  if (preview === "diverging-bars") {
    return (
      <svg viewBox="0 0 320 120" className="w-full">
        <line x1="160" y1="10" x2="160" y2="110" stroke="rgba(74,80,96,0.18)" />
        <rect x="56" y="18" width="104" height="12" rx="6" fill="rgba(220,38,38,0.84)" />
        <rect x="160" y="18" width="88" height="12" rx="6" fill="rgba(13,148,136,0.84)" />
        <rect x="88" y="42" width="72" height="12" rx="6" fill="rgba(220,38,38,0.84)" />
        <rect x="160" y="42" width="116" height="12" rx="6" fill="rgba(13,148,136,0.84)" />
        <rect x="32" y="66" width="128" height="12" rx="6" fill="rgba(220,38,38,0.84)" />
        <rect x="160" y="66" width="54" height="12" rx="6" fill="rgba(13,148,136,0.84)" />
        <rect x="118" y="90" width="42" height="12" rx="6" fill="rgba(220,38,38,0.84)" />
        <rect x="160" y="90" width="136" height="12" rx="6" fill="rgba(13,148,136,0.84)" />
      </svg>
    );
  }

  if (preview === "scatter") {
    return (
      <svg viewBox="0 0 320 120" className="w-full">
        <line x1="18" y1="8" x2="18" y2="112" stroke="rgba(74,80,96,0.18)" />
        <line x1="18" y1="60" x2="312" y2="60" stroke="rgba(74,80,96,0.18)" />
        <line x1="168" y1="8" x2="168" y2="112" stroke="rgba(74,80,96,0.14)" strokeDasharray="4 4" />
        <circle cx="218" cy="84" r="6" fill="var(--ja-coral)" />
        <circle cx="236" cy="88" r="5" fill="var(--ja-coral)" />
        <circle cx="252" cy="78" r="4" fill="var(--ja-coral)" />
        <circle cx="214" cy="34" r="6" fill="var(--ja-teal)" />
        <circle cx="248" cy="26" r="5" fill="var(--ja-teal)" />
        <circle cx="96" cy="30" r="4" fill="var(--ja-slate)" />
        <circle cx="118" cy="76" r="5" fill="var(--ja-slate)" />
        <circle cx="144" cy="54" r="4" fill="var(--ja-slate)" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 120" className="w-full">
      <path d="M46 30 L108 18 L148 40 L206 24 L258 34 L286 56 L256 92 L186 100 L112 94 L62 74 Z" fill="rgba(220,38,38,0.16)" stroke="var(--ja-coral)" strokeWidth="2" />
      <circle cx="100" cy="60" r="7" fill="var(--ja-coral)" />
      <circle cx="214" cy="52" r="7" fill="var(--ja-teal)" />
      <path d="M100 60 C132 44 168 40 214 52" fill="none" stroke="rgba(74,80,96,0.3)" strokeWidth="2" strokeDasharray="5 5" />
    </svg>
  );
}
