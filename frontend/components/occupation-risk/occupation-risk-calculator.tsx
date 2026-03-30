"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { formatCurrency } from "@/lib/utils";
import type { OccupationRiskApiResponse, OccupationRiskSearchResult } from "@shared/occupation-risk";
import { occupationRiskMethodologyNotice } from "@shared/occupation-risk";

type OccupationRiskCalculatorProps = {
  initialAssessment: OccupationRiskApiResponse | null;
  popularOccupations: OccupationRiskSearchResult[];
};

type SearchResponse = {
  count: number;
  results: Array<{
    soc_code: string;
    title: string;
    employment_2024: number;
  }>;
};

export function OccupationRiskCalculator({
  initialAssessment,
  popularOccupations
}: OccupationRiskCalculatorProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialAssessment?.occupation.title ?? "");
  const [selectedSoc, setSelectedSoc] = useState<string | undefined>(initialAssessment?.occupation.soc_code);
  const [assessment, setAssessment] = useState<OccupationRiskApiResponse | null>(initialAssessment);
  const [assessmentStatus, setAssessmentStatus] = useState<"idle" | "loading" | "ready" | "error">(
    initialAssessment ? "ready" : "idle"
  );
  const [searchResults, setSearchResults] = useState<OccupationRiskSearchResult[]>([]);
  const [searchStatus, setSearchStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const listboxId = "occupation-risk-results";

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSearchResults([]);
      setSearchStatus("idle");
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      try {
        setSearchStatus("loading");
        const response = await fetch(`/api/occupations/search?q=${encodeURIComponent(query.trim())}`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error("Search failed");
        }

        const payload = (await response.json()) as SearchResponse;
        setSearchResults(
          payload.results.map((result) => ({
            socCode: result.soc_code,
            title: result.title,
            employment2024: result.employment_2024
          }))
        );
        setSearchStatus("ready");
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          return;
        }

        setSearchResults([]);
        setSearchStatus("error");
      }
    }, 200);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [query]);

  useEffect(() => {
    if (!selectedSoc) {
      return;
    }

    if (assessment?.occupation.soc_code === selectedSoc) {
      return;
    }

    const controller = new AbortController();

    void (async () => {
      try {
        setAssessmentStatus("loading");
        const response = await fetch(`/api/risk/${selectedSoc}`, { signal: controller.signal });

        if (!response.ok) {
          throw new Error("Assessment failed");
        }

        const payload = (await response.json()) as OccupationRiskApiResponse;
        setAssessment(payload);
        setAssessmentStatus("ready");
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          return;
        }

        setAssessmentStatus("error");
      }
    })();

    return () => controller.abort();
  }, [assessment?.occupation.soc_code, selectedSoc]);

  function selectOccupation(result: OccupationRiskSearchResult) {
    setSelectedSoc(result.socCode);
    setQuery(result.title);
    setIsOpen(false);
    setAssessment((current) => (current?.occupation.soc_code === result.socCode ? current : null));
    router.replace(`/check-your-occupation?soc=${result.socCode}`, { scroll: false });
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!searchResults.length) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) => (current + 1) % searchResults.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) => (current - 1 + searchResults.length) % searchResults.length);
    }

    if (event.key === "Enter" && isOpen) {
      event.preventDefault();
      const next = searchResults[activeIndex];
      if (next) {
        selectOccupation(next);
      }
    }

    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <div className="grid gap-[var(--ja-space-8)]">
      <section className="editorial-card p-[var(--ja-space-6)] md:p-[var(--ja-space-8)]">
        <div className="max-w-[44rem]">
          <p className="eyebrow">Occupation check</p>
          <h1 className="display-subtitle mt-[var(--ja-space-4)]">Check your occupation</h1>
          <p className="body-copy muted-copy mt-[var(--ja-space-4)] text-[var(--ja-text-lg)] leading-[var(--ja-leading-relaxed)]">
            This public release shows only directly sourced BLS employment, pay, and outlook data for each occupation.
            Modeled task, posting, and transition layers stay off the site until their provenance audit is complete.
          </p>
        </div>

        <div className="relative mt-[var(--ja-space-6)]">
          <label htmlFor="occupation-search" className="sr-only">
            Search for your occupation
          </label>
          <input
            id="occupation-search"
            type="text"
            role="combobox"
            aria-label="Search for your occupation"
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-activedescendant={
              isOpen && searchResults[activeIndex] ? `${listboxId}-${searchResults[activeIndex].socCode}` : undefined
            }
            placeholder="Start typing your job title..."
            className="text-input pr-[3.5rem] text-[var(--ja-text-base)]"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setIsOpen(true);
            }}
            onFocus={() => {
              if (query.trim().length >= 2) {
                setIsOpen(true);
              }
            }}
            onKeyDown={onKeyDown}
          />
          <div className="pointer-events-none absolute right-[1rem] top-[0.95rem] text-[var(--ja-steel)]">Search</div>

          {isOpen && query.trim().length >= 2 ? (
            <div
              id={listboxId}
              role="listbox"
              className="absolute z-20 mt-2 w-full rounded-[var(--ja-radius-md)] border border-[var(--ja-fog)] bg-[rgba(250,250,249,0.98)] p-2 shadow-[var(--ja-shadow-lg)]"
            >
              {searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <button
                    key={result.socCode}
                    id={`${listboxId}-${result.socCode}`}
                    type="button"
                    role="option"
                    aria-selected={index === activeIndex}
                    className={`flex w-full items-center justify-between rounded-[var(--ja-radius-sm)] px-3 py-3 text-left transition ${
                      index === activeIndex ? "bg-[var(--ja-cloud)]" : "hover:bg-[var(--ja-cloud)]"
                    }`}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => selectOccupation(result)}
                  >
                    <span>
                      <span className="block text-[var(--ja-text-sm)] font-semibold text-[var(--ja-ink)]">
                        {result.title}
                      </span>
                      <span className="fine-print mt-1 block">
                        SOC {result.socCode} · {formatNumber(result.employment2024)} employed
                      </span>
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-3 py-3 text-[var(--ja-text-sm)] text-[var(--ja-slate)]">
                  {searchStatus === "loading"
                    ? "Searching occupations..."
                    : searchStatus === "error"
                      ? "Search is temporarily unavailable. Try again in a moment or use one of the popular occupations below."
                      : "Nothing matched that search yet. Try a broader title or pick one of the popular occupations below."}
                </div>
              )}
            </div>
          ) : null}

          <p className="fine-print mt-3" aria-live="polite">
            {assessment && !isOpen && query.trim().toLowerCase() === assessment.occupation.title.toLowerCase()
              ? `Loaded ${assessment.occupation.title}.`
              : query.trim().length >= 2
                ? searchStatus === "loading"
                  ? "Searching..."
                  : `${searchResults.length} occupation${searchResults.length === 1 ? "" : "s"} found.`
                : "Type at least two characters to search."}
          </p>
        </div>

        <div className="mt-[var(--ja-space-5)] flex flex-wrap items-center gap-[var(--ja-space-2)]">
          <span className="fine-print">Popular searches:</span>
          {popularOccupations.map((record) => (
            <button
              key={record.socCode}
              type="button"
              className="rounded-full border border-[var(--ja-fog)] bg-[var(--ja-paper)] px-3 py-2 text-[var(--ja-text-xs)] font-medium text-[var(--ja-slate)] transition hover:border-[var(--ja-teal)] hover:text-[var(--ja-teal-dark)]"
              onClick={() => selectOccupation(record)}
            >
              {record.title}
            </button>
          ))}
        </div>

        <div className="mt-[var(--ja-space-6)] rounded-[var(--ja-radius-md)] border border-[var(--ja-fog)] bg-[var(--ja-cloud)] p-[var(--ja-space-4)]">
          <p className="fine-print">{occupationRiskMethodologyNotice}</p>
        </div>
      </section>

      {assessment ? (
        <ResultCard assessment={assessment} isLoading={assessmentStatus === "loading"} />
      ) : assessmentStatus === "error" ? (
        <section className="editorial-card p-[var(--ja-space-6)]">
          <p className="eyebrow">Occupation check error</p>
          <h2 className="section-title mt-[var(--ja-space-3)]">The occupation brief is taking longer than usual.</h2>
          <p className="body-copy muted-copy mt-[var(--ja-space-4)] max-w-[42rem]">
            Try the search again in a few seconds. The public page only returns directly sourced occupation fields, so we
            would rather fail cleanly than fill the gap with unsourced placeholders.
          </p>
        </section>
      ) : (
        <section className="editorial-card p-[var(--ja-space-6)]">
          <p className="eyebrow">What you&apos;ll get</p>
          <h2 className="section-title mt-[var(--ja-space-3)]">
            A source-backed occupation brief: employment, pay, projected openings, and the exact public sources behind
            them.
          </h2>
          <div className="mt-[var(--ja-space-5)] grid gap-[var(--ja-space-4)] md:grid-cols-2 xl:grid-cols-4">
            <PreviewCard title="Employment" body="The latest published BLS employment count for the occupation." />
            <PreviewCard title="Pay" body="Median wage and, where available, BLS wage percentiles." />
            <PreviewCard title="Outlook" body="BLS 2024–2034 projected growth and average annual openings." />
            <PreviewCard title="Sources" body="Direct links to the public references used on the page." />
          </div>
        </section>
      )}
    </div>
  );
}

function ResultCard({
  assessment,
  isLoading
}: {
  assessment: OccupationRiskApiResponse;
  isLoading: boolean;
}) {
  const growthTone = assessment.employment.projected_growth_pct >= 0 ? "teal" : "coral";

  return (
    <section className="editorial-card p-[var(--ja-space-6)] md:p-[var(--ja-space-8)]">
      <div className="grid gap-[var(--ja-space-6)] lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]">
        <div>
          <p className="eyebrow">{assessment.occupation.major_group}</p>
          <h2 className="display-subtitle mt-[var(--ja-space-3)] text-[clamp(1.9rem,4vw,2.6rem)]">
            {assessment.occupation.title}
          </h2>
          <p className="fine-print mt-2">SOC {assessment.occupation.soc_code}</p>
          <p className="body-copy muted-copy mt-[var(--ja-space-4)] max-w-[46rem]">{assessment.occupation.description}</p>
        </div>

        <div className="rounded-[var(--ja-radius-lg)] border border-[var(--ja-fog)] bg-[var(--ja-cloud)] p-[var(--ja-space-5)]">
          <p className="eyebrow">Public occupation brief</p>
          <h3 className="section-title mt-[var(--ja-space-3)] text-[1.35rem]">{assessment.public_summary.headline}</h3>
          <p className="body-copy mt-[var(--ja-space-4)] text-[var(--ja-ink)]">{assessment.public_summary.summary}</p>
        </div>
      </div>

      <section className="mt-[var(--ja-space-8)] grid gap-[var(--ja-space-4)] md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Employment"
          value={formatNumber(assessment.employment.current)}
          tone="slate"
          note="BLS employment, 2024"
        />
        <MetricCard
          label="BLS outlook"
          value={`${assessment.employment.projected_growth_pct > 0 ? "+" : ""}${assessment.employment.projected_growth_pct}%`}
          tone={growthTone}
          note="Projected growth, 2024–2034"
        />
        <MetricCard
          label="Annual openings"
          value={formatNumber(assessment.employment.annual_openings)}
          tone={growthTone}
          note="Average openings per year"
        />
        <MetricCard
          label="Median pay"
          value={formatCurrency(assessment.employment.median_wage)}
          tone="slate"
          note="BLS OEWS May 2024"
        />
      </section>

      <section className="mt-[var(--ja-space-8)] grid gap-[var(--ja-space-6)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <article className="rounded-[var(--ja-radius-lg)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] p-[var(--ja-space-5)]">
          <p className="eyebrow">Wage range</p>
          <h3 className="section-title mt-[var(--ja-space-2)] text-[1.35rem]">Published BLS percentiles</h3>
          <div className="mt-[var(--ja-space-5)] grid gap-[var(--ja-space-3)] sm:grid-cols-2">
            <WageRow label="10th percentile" value={assessment.employment.wage_range.p10} />
            <WageRow label="25th percentile" value={assessment.employment.wage_range.p25} />
            <WageRow label="75th percentile" value={assessment.employment.wage_range.p75} />
            <WageRow label="90th percentile" value={assessment.employment.wage_range.p90} />
          </div>
        </article>

        <article className="rounded-[var(--ja-radius-lg)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] p-[var(--ja-space-5)]">
          <p className="eyebrow">Scope</p>
          <h3 className="section-title mt-[var(--ja-space-2)] text-[1.35rem]">What is intentionally withheld</h3>
          <p className="body-copy muted-copy mt-[var(--ja-space-4)]">{assessment.metadata.notice}</p>
          <p className="fine-print mt-[var(--ja-space-3)]">{assessment.metadata.limitations}</p>
        </article>
      </section>

      <section className="mt-[var(--ja-space-8)]">
        <p className="eyebrow">Next steps</p>
        <h3 className="section-title mt-[var(--ja-space-2)] text-[1.35rem]">
          Use the sourced brief, then move into the live market pages
        </h3>
        <div className="mt-[var(--ja-space-5)] grid gap-[var(--ja-space-4)]">
          {assessment.actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="rounded-[var(--ja-radius-lg)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] p-[var(--ja-space-5)] transition hover:border-[var(--ja-teal)]"
            >
              <span className="arrow-link inline-flex items-center gap-2">
                <span>{action.label}</span>
                <span>→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mt-[var(--ja-space-8)] rounded-[var(--ja-radius-lg)] border border-[var(--ja-fog)] bg-[var(--ja-cloud)] p-[var(--ja-space-5)]">
        {isLoading ? <p className="fine-print">Refreshing the latest sourced occupation brief.</p> : null}
        <p className="fine-print">Data as of {assessment.metadata.data_as_of}. Methodology v{assessment.metadata.methodology_version}.</p>
        <div className="mt-[var(--ja-space-3)] flex flex-wrap gap-x-[var(--ja-space-4)] gap-y-[var(--ja-space-2)]">
          {assessment.metadata.source_links.map((source) => (
            <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="inline-link fine-print">
              {source.label}
            </a>
          ))}
          <Link href="/methodology" className="inline-link fine-print">
            Read our methodology
          </Link>
        </div>
      </footer>
    </section>
  );
}

function PreviewCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-[var(--ja-radius-lg)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] p-[var(--ja-space-5)]">
      <p className="text-[var(--ja-text-sm)] font-semibold text-[var(--ja-ink)]">{title}</p>
      <p className="body-copy muted-copy mt-[var(--ja-space-3)] text-[var(--ja-text-sm)]">{body}</p>
    </article>
  );
}

function MetricCard({
  label,
  value,
  note,
  tone
}: {
  label: string;
  value: string;
  note: string;
  tone: "teal" | "coral" | "slate";
}) {
  const toneClass =
    tone === "teal"
      ? "bg-[var(--ja-teal-light)]/45 border-[rgba(13,148,136,0.16)]"
      : tone === "coral"
        ? "bg-[var(--ja-coral-light)]/55 border-[rgba(220,38,38,0.16)]"
        : "bg-[var(--ja-paper)] border-[var(--ja-fog)]";

  return (
    <div className={`rounded-[var(--ja-radius-lg)] border p-[var(--ja-space-5)] ${toneClass}`}>
      <p className="eyebrow">{label}</p>
      <p className="data-copy mt-[var(--ja-space-3)] text-[2rem] leading-none text-[var(--ja-ink)]">{value}</p>
      <p className="fine-print mt-[var(--ja-space-3)]">{note}</p>
    </div>
  );
}

function WageRow({ label, value }: { label: string; value?: number }) {
  return (
    <div className="rounded-[var(--ja-radius-md)] border border-[var(--ja-fog)] bg-[var(--ja-cloud)] px-4 py-3">
      <p className="eyebrow">{label}</p>
      <p className="data-copy mt-2 text-[1.2rem] text-[var(--ja-ink)]">{value ? formatCurrency(value) : "Not published"}</p>
    </div>
  );
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}
