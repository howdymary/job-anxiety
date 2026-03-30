"use client";

import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { SearchIcon } from "@/components/site-icons";
import { careerNotes, insightArticles } from "@/lib/editorial-content";
import { companies, jobs } from "@/lib/market-data";

type SearchCommandProps = {
  open: boolean;
  onClose: () => void;
};

type OccupationSearchResult = {
  soc_code: string;
  title: string;
  employment_2024: number;
};

type LiveFeedJob = {
  id: string;
  title: string;
  company: string;
  companySlug: string;
  location: string;
  postedAt: string;
  applyUrl: string;
  salaryMin: number | null;
  salaryMax: number | null;
};

type SearchEntry = {
  id: string;
  href: string;
  label: string;
  meta: string;
  summary?: string;
  kind: "page" | "job" | "occupation" | "guide";
  index?: number;
};

type SearchSection = {
  title: string;
  items: SearchEntry[];
};

const quickLinks: SearchEntry[] = [
  { id: "quick-jobs", href: "/jobs", label: "Live jobs board", meta: "Jobs", summary: "Tracked public roles", kind: "page" },
  { id: "quick-research", href: "/research", label: "Research brief", meta: "Pages", summary: "BLS-backed comparison chart", kind: "page" },
  { id: "quick-trends", href: "/trends", label: "Trends dashboard", meta: "Pages", summary: "Live ATS signals", kind: "page" },
  { id: "quick-layoffs", href: "/layoffs", label: "Layoff log", meta: "Pages", summary: "Confirmed disclosures only", kind: "page" },
  {
    id: "quick-occupation",
    href: "/check-your-occupation",
    label: "Check your occupation",
    meta: "Tool",
    summary: "BLS and AI exposure summary",
    kind: "page"
  },
  { id: "quick-methodology", href: "/methodology", label: "Methodology", meta: "Trust", summary: "How the site is sourced", kind: "page" }
];

const pageEntries: SearchEntry[] = [
  { id: "page-home", href: "/", label: "Home", meta: "Page", summary: "Market pulse and latest openings", kind: "page" },
  { id: "page-jobs", href: "/jobs", label: "Jobs", meta: "Page", summary: "Live postings across tracked companies", kind: "page" },
  { id: "page-companies", href: "/companies", label: "Companies", meta: "Page", summary: "Tracked employers and current boards", kind: "page" },
  { id: "page-layoffs", href: "/layoffs", label: "Layoffs", meta: "Page", summary: "Confirmed workforce disclosures", kind: "page" },
  { id: "page-trends", href: "/trends", label: "Trends", meta: "Page", summary: "Live hiring signals", kind: "page" },
  { id: "page-research", href: "/research", label: "Research", meta: "Page", summary: "BLS occupation brief", kind: "page" },
  { id: "page-methodology", href: "/methodology", label: "Methodology", meta: "Trust", summary: "Sourcing and limits", kind: "page" },
  { id: "page-corrections", href: "/corrections", label: "Corrections", meta: "Trust", summary: "Public corrections log", kind: "page" },
  { id: "page-press", href: "/press", label: "Press", meta: "Resources", summary: "Embeds and citation formats", kind: "page" },
  { id: "page-api", href: "/api", label: "API", meta: "Developers", summary: "Endpoint documentation", kind: "page" },
  { id: "page-newsletter", href: "/newsletter", label: "Newsletter", meta: "Page", summary: "Subscribe to updates", kind: "page" }
];

function formatSalary(job: Pick<(typeof jobs)[number], "salaryMin" | "salaryMax"> | Pick<LiveFeedJob, "salaryMin" | "salaryMax">) {
  if (job.salaryMin == null || job.salaryMax == null) {
    return "Salary not listed";
  }

  const minimum = job.salaryMin / 1000;
  const maximum = job.salaryMax / 1000;
  return `$${minimum.toFixed(0)}K–$${maximum.toFixed(0)}K`;
}

function matchesQuery(text: string, query: string) {
  return text.toLowerCase().includes(query);
}

function buildOccupationUrl(socCode: string) {
  return `/check-your-occupation?soc=${encodeURIComponent(socCode)}`;
}

export function SearchCommand({ open, onClose }: SearchCommandProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [occupationResults, setOccupationResults] = useState<OccupationSearchResult[]>([]);
  const [liveJobs, setLiveJobs] = useState<LiveFeedJob[]>([]);
  const [loadingOccupations, setLoadingOccupations] = useState(false);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const normalized = query.trim().toLowerCase();

  useEffect(() => {
    if (!open) {
      setQuery("");
      setOccupationResults([]);
      setLiveJobs([]);
      setLoadingOccupations(false);
      setLoadingJobs(false);
      setSelectedIndex(0);
      return;
    }

    const timeout = window.setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }

    let cancelled = false;

    const loadLiveJobs = async () => {
      setLoadingJobs(true);

      try {
        const response = await fetch("/api/homepage-feed", { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Homepage feed returned ${response.status}`);
        }

        const payload = (await response.json()) as {
          newestJobs?: LiveFeedJob[];
          trendingJobs?: LiveFeedJob[];
        };

        const combined = [...(payload.newestJobs ?? []), ...(payload.trendingJobs ?? [])];
        const deduped = combined.filter((job, index, array) => array.findIndex((candidate) => candidate.id === job.id) === index);

        if (!cancelled) {
          setLiveJobs(deduped);
        }
      } catch {
        if (!cancelled) {
          const fallback = jobs.slice(0, 12).map((job) => ({
            id: job.slug,
            title: job.title,
            company: job.company,
            companySlug: job.companySlug,
            location: job.location,
            postedAt: job.postedAt,
            applyUrl: job.applyUrl,
            salaryMin: job.salaryMin,
            salaryMax: job.salaryMax
          }));
          setLiveJobs(fallback);
        }
      } finally {
        if (!cancelled) {
          setLoadingJobs(false);
        }
      }
    };

    void loadLiveJobs();

    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const normalized = query.trim().toLowerCase();
    if (normalized.length < 2) {
      setOccupationResults([]);
      setLoadingOccupations(false);
      return;
    }

    let cancelled = false;
    const timeout = window.setTimeout(async () => {
      setLoadingOccupations(true);

      try {
        const response = await fetch(`/api/occupations/search?q=${encodeURIComponent(normalized)}`, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Occupation search returned ${response.status}`);
        }

        const payload = (await response.json()) as {
          results?: OccupationSearchResult[];
        };

        if (!cancelled) {
          setOccupationResults(payload.results ?? []);
        }
      } catch {
        if (!cancelled) {
          setOccupationResults([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingOccupations(false);
        }
      }
    }, 200);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [open, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [normalized]);

  const sections = useMemo<SearchSection[]>(() => {
    const quickSection = {
      title: "Quick Links",
      items: quickLinks.map((item) => ({ ...item }))
    };

    const pageMatches = pageEntries
      .filter((item) => {
        if (!normalized) {
          return false;
        }

        return matchesQuery(item.label, normalized) || matchesQuery(item.meta, normalized) || matchesQuery(item.summary ?? "", normalized);
      })
      .map((item) => ({ ...item }));

    const companyMatches = companies
      .filter((company) => {
        if (!normalized) {
          return false;
        }

        return (
          matchesQuery(company.name, normalized) ||
          matchesQuery(company.description, normalized) ||
          matchesQuery(company.hiringFocus, normalized) ||
          matchesQuery(company.headquarters, normalized)
        );
      })
      .map((company) => ({
        id: `company-${company.slug}`,
        href: `/companies/${company.slug}`,
        label: company.name,
        meta: "Company",
        summary: company.hiringFocus,
        kind: "page" as const
      }));

    const pageSection = {
      title: "Pages",
      items: [...pageMatches, ...companyMatches].slice(0, 10)
    };

    const jobPool = liveJobs.length > 0
      ? liveJobs
      : jobs.slice(0, 24).map((job) => ({
          id: job.slug,
          title: job.title,
          company: job.company,
          companySlug: job.companySlug,
          location: job.location,
          postedAt: job.postedAt,
          applyUrl: job.applyUrl,
          salaryMin: job.salaryMin,
          salaryMax: job.salaryMax
        }));

    const jobMatches = jobPool
      .filter((job) => {
        if (!normalized) {
          return false;
        }

        return (
          matchesQuery(job.title, normalized) ||
          matchesQuery(job.company, normalized) ||
          matchesQuery(job.location, normalized)
        );
      })
      .slice(0, 8)
      .map((job) => ({
        id: `job-${job.id}`,
        href: `/jobs/${job.id}`,
        label: job.title,
        meta: job.company,
        summary: `${job.location} · ${formatSalary(job)}`,
        kind: "job" as const
      }));

    const occupationMatches = occupationResults
      .map((occupation) => ({
        id: `occupation-${occupation.soc_code}`,
        href: buildOccupationUrl(occupation.soc_code),
        label: occupation.title,
        meta: occupation.soc_code,
        summary: `${occupation.employment_2024.toLocaleString("en-US")} employed`,
        kind: "occupation" as const
      }))
      .slice(0, 8);

    const guideMatches = [...careerNotes, ...insightArticles]
      .filter((item) => {
        if (!normalized) {
          return false;
        }

        const haystack = [
          item.title,
          "subtitle" in item ? item.subtitle : "",
          "description" in item ? item.description : "",
          "cardDescription" in item ? item.cardDescription : "",
          "role" in item ? item.role : ""
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalized);
      })
      .slice(0, 10)
      .map((item) =>
        "publishedAt" in item
          ? {
              id: `insight-${item.slug}`,
              href: `/insights/${item.slug}`,
              label: item.title,
              meta: item.readTime,
              summary: item.description,
              kind: "guide" as const
            }
          : {
              id: `career-note-${item.slug}`,
              href: `/career-notes/${item.slug}`,
              label: item.title,
              meta: "Career guide",
              summary: item.subtitle,
              kind: "guide" as const
            }
      );

    const indexedSections: SearchSection[] = [];
    let cursor = 0;

    const addIndexes = (items: SearchEntry[]) =>
      items.map((item) => {
        const next = { ...item, index: cursor };
        cursor += 1;
        return next;
      });

    indexedSections.push({ title: quickSection.title, items: addIndexes(quickSection.items) });
    indexedSections.push({ title: pageSection.title, items: addIndexes(pageSection.items) });
    indexedSections.push({ title: "Jobs", items: addIndexes(jobMatches) });
    indexedSections.push({ title: "Occupations", items: addIndexes(occupationMatches) });
    indexedSections.push({ title: "Guides", items: addIndexes(guideMatches) });
    return indexedSections;
  }, [liveJobs, occupationResults, normalized]);

  const selectableItems = useMemo(() => sections.flatMap((section) => section.items), [sections]);
  const hasSearchResults = sections.slice(1).some((section) => section.items.length > 0);
  const queryActive = normalized.length >= 2;
  const quickLinkCount = sections[0]?.items.length ?? 0;
  const activeItem = selectableItems[selectedIndex] ?? null;

  useEffect(() => {
    if (selectableItems.length === 0) {
      if (selectedIndex !== 0) {
        setSelectedIndex(0);
      }
      return;
    }

    if (queryActive && hasSearchResults) {
      setSelectedIndex((current) => {
        if (current < quickLinkCount) {
          return quickLinkCount;
        }

        return Math.min(current, selectableItems.length - 1);
      });
      return;
    }

    if (selectedIndex >= selectableItems.length) {
      setSelectedIndex(0);
    }
  }, [hasSearchResults, queryActive, quickLinkCount, selectableItems.length, selectedIndex]);

  const navigateTo = (item: SearchEntry) => {
    onClose();
    router.push(item.href);
  };

  const onInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (selectableItems.length === 0) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((current) => (current + 1) % selectableItems.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((current) => (current - 1 + selectableItems.length) % selectableItems.length);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setSelectedIndex(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      setSelectedIndex(selectableItems.length - 1);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      if (activeItem) {
        navigateTo(activeItem);
      }
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] bg-[rgba(26,29,35,0.2)] p-3 md:p-6" onClick={onClose} role="presentation">
      <div
        className="mx-auto mt-8 w-full max-w-[44rem] overflow-hidden rounded-[1.25rem] border border-[var(--ja-fog)] bg-[var(--ja-paper)] shadow-[var(--ja-shadow-xl)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search jobanxiety.ai"
      >
        <div className="border-b border-[var(--ja-fog)] px-5 py-4">
          <div className="flex items-center gap-3">
            <SearchIcon />
            <div className="min-w-0">
              <p className="eyebrow">Search</p>
              <p className="fine-print mt-1">Jobs, companies, occupations, guides, and pages</p>
            </div>
          </div>
          <div className="mt-4 rounded-[var(--ja-radius-md)] border border-[var(--ja-fog)] bg-[var(--ja-cloud)] px-4 py-3">
            <input
              ref={inputRef}
              autoComplete="off"
              spellCheck={false}
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder="Search jobs, companies, occupations, and guides"
              className="w-full border-0 bg-transparent p-0 text-[1rem] text-[var(--ja-ink)] outline-none placeholder:text-[var(--ja-slate)]"
              aria-label="Search the site"
              aria-describedby="search-command-help"
              aria-controls="search-command-results"
              aria-activedescendant={activeItem ? activeItem.id : undefined}
            />
          </div>
          <p id="search-command-help" className="fine-print mt-3">
            Use arrow keys to move through results, Enter to open, and Escape to close.
          </p>
        </div>

        <div id="search-command-results" role="listbox" className="max-h-[min(34rem,calc(100vh-12rem))] overflow-y-auto px-4 py-4">
          <Section
            title="Quick Links"
            items={sections[0]?.items ?? []}
            selectedIndex={selectedIndex}
            onHover={setSelectedIndex}
            onSelect={navigateTo}
          />

          {queryActive && loadingJobs ? <StatusLine>Refreshing live jobs feed…</StatusLine> : null}
          {queryActive && loadingOccupations ? <StatusLine>Looking up occupations…</StatusLine> : null}

          {queryActive && hasSearchResults ? (
            <div className="grid gap-5">
              {sections.slice(1).map((section) =>
                section.items.length > 0 ? (
                  <Section
                    key={section.title}
                    title={section.title}
                    items={section.items}
                    selectedIndex={selectedIndex}
                    onHover={setSelectedIndex}
                    onSelect={navigateTo}
                  />
                ) : null
              )}
            </div>
          ) : null}

          {queryActive && !hasSearchResults ? (
            <div className="rounded-[var(--ja-radius-md)] border border-dashed border-[var(--ja-fog)] bg-[var(--ja-cloud)] px-4 py-6 text-center">
              <p className="eyebrow">No results</p>
              <p className="body-copy muted-copy mt-3">
                No pages, jobs, occupations, or guides matched “{query.trim()}”.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  items,
  selectedIndex,
  onHover,
  onSelect,
}: {
  title: string;
  items: SearchEntry[];
  selectedIndex: number;
  onHover: (index: number) => void;
  onSelect: (item: SearchEntry) => void;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="grid gap-2">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--ja-steel)]">{title}</p>
      <div className="grid gap-1">
        {items.map((item) => {
          const selected = item.index === selectedIndex;

          return (
            <button
              key={item.id}
              type="button"
              id={item.id}
              role="option"
              aria-selected={selected}
              onClick={() => onSelect(item)}
              onMouseEnter={() => {
                if (typeof item.index === "number") {
                  onHover(item.index);
                }
              }}
              className={`flex w-full items-start justify-between gap-4 rounded-[var(--ja-radius-md)] border px-3 py-3 text-left transition ${
                selected
                  ? "border-[var(--ja-ink)] bg-[var(--ja-cloud)]"
                  : "border-transparent hover:border-[var(--ja-fog)] hover:bg-[var(--ja-cloud)]"
              }`}
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.96rem] font-medium text-[var(--ja-ink)]">{item.label}</span>
                {item.summary ? <span className="mt-1 block line-clamp-2 text-[0.84rem] text-[var(--ja-slate)]">{item.summary}</span> : null}
              </span>
              <span className="shrink-0 text-[0.72rem] uppercase tracking-[0.08em] text-[var(--ja-steel)]">{item.meta}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function StatusLine({ children }: { children: string }) {
  return <p className="fine-print mb-3 rounded-[var(--ja-radius-md)] border border-[var(--ja-fog)] bg-[var(--ja-cloud)] px-3 py-2">{children}</p>;
}
