"use client";

import type { PropsWithChildren } from "react";
import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { FilterCheckbox } from "@/components/market/filter-checkbox";
import { JobCard } from "@/components/market/job-row";
import { SlidePanel } from "@/components/market/slide-panel";
import type { CompanyRecord, ExperienceBand, JobCategory, JobLocationType, JobRecord } from "@/lib/types";

type JobsBoardProps = {
  jobs: JobRecord[];
  categories: JobCategory[];
  companies: CompanyRecord[];
};

const experienceBands: ExperienceBand[] = ["Entry", "Mid", "Senior", "Lead"];
const locationTypes: JobLocationType[] = ["Remote", "Hybrid", "On-site"];

export function JobsBoard({ jobs, categories, companies }: JobsBoardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedJob, setSelectedJob] = useState<JobRecord | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const selectedCategories = searchParams.getAll("category");
  const selectedTiers = searchParams.getAll("tier");
  const selectedLocations = searchParams.getAll("location");
  const selectedExperience = searchParams.getAll("experience");
  const postedWithin = searchParams.get("posted") ?? "Any";
  const salaryMin = searchParams.get("salaryMin") ?? "";
  const salaryMax = searchParams.get("salaryMax") ?? "";
  const city = searchParams.get("city") ?? "";

  const updateParamSet = (key: string, nextValues: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    nextValues.forEach((value) => params.append(key, value));
    router.replace(nextValues.length || params.size ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
  };

  const updateSingleParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "Any") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.replace(params.size ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
  };

  const toggleValue = (values: string[], nextValue: string) =>
    values.includes(nextValue) ? values.filter((value) => value !== nextValue) : [...values, nextValue];

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (selectedCategories.length && !selectedCategories.includes(job.category)) {
        return false;
      }

      if (selectedTiers.length && !selectedTiers.includes(job.companyTier)) {
        return false;
      }

      if (selectedLocations.length && !selectedLocations.includes(job.locationType)) {
        return false;
      }

      if (selectedExperience.length && !selectedExperience.includes(job.experience)) {
        return false;
      }

      if (city && !job.city.toLowerCase().includes(city.toLowerCase())) {
        return false;
      }

      if (salaryMin && job.salaryMax < Number(salaryMin)) {
        return false;
      }

      if (salaryMax && job.salaryMin > Number(salaryMax)) {
        return false;
      }

      if (postedWithin === "24h") {
        return Date.now() - new Date(job.postedAt).getTime() <= 24 * 60 * 60 * 1000;
      }

      if (postedWithin === "7d") {
        return Date.now() - new Date(job.postedAt).getTime() <= 7 * 24 * 60 * 60 * 1000;
      }

      if (postedWithin === "30d") {
        return Date.now() - new Date(job.postedAt).getTime() <= 30 * 24 * 60 * 60 * 1000;
      }

      return true;
    });
  }, [city, jobs, postedWithin, salaryMax, salaryMin, selectedCategories, selectedExperience, selectedLocations, selectedTiers]);

  const similarJobs =
    selectedJob === null
      ? []
      : jobs.filter((job) => selectedJob.relatedCompanyJobSlugs.includes(job.slug) && job.slug !== selectedJob.slug);

  return (
    <>
      <div className="mb-5 mobile-only">
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(true)}
          className="filter-shell text-left text-[0.95rem] text-[var(--color-text-muted)]"
        >
          Filters
        </button>
      </div>
      <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <FiltersColumn
          className="hidden lg:block"
          categories={categories}
          companies={companies}
          selectedCategories={selectedCategories}
          selectedTiers={selectedTiers}
          selectedLocations={selectedLocations}
          selectedExperience={selectedExperience}
          postedWithin={postedWithin}
          salaryMin={salaryMin}
          salaryMax={salaryMax}
          city={city}
          updateParamSet={updateParamSet}
          updateSingleParam={updateSingleParam}
          toggleValue={toggleValue}
        />

        <div className="grid gap-4">
          {filteredJobs.map((job) => (
            <JobCard key={job.slug} job={job} onSelect={setSelectedJob} />
          ))}
        </div>
      </div>

      {mobileFiltersOpen ? (
        <div className="mobile-only fixed inset-0 z-[55] bg-[rgba(26,26,24,0.2)]" onClick={() => setMobileFiltersOpen(false)} role="presentation">
          <div className="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-[8px] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5" onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <p className="section-title text-[1.3rem]">Filters</p>
              <button type="button" onClick={() => setMobileFiltersOpen(false)} className="text-[1.3rem]">×</button>
            </div>
            <FiltersColumn
              categories={categories}
              companies={companies}
              selectedCategories={selectedCategories}
              selectedTiers={selectedTiers}
              selectedLocations={selectedLocations}
              selectedExperience={selectedExperience}
              postedWithin={postedWithin}
              salaryMin={salaryMin}
              salaryMax={salaryMax}
              city={city}
              updateParamSet={updateParamSet}
              updateSingleParam={updateSingleParam}
              toggleValue={toggleValue}
            />
          </div>
        </div>
      ) : null}

      <SlidePanel job={selectedJob} similarJobs={similarJobs} onClose={() => setSelectedJob(null)} />
    </>
  );
}

type FiltersColumnProps = {
  categories: JobCategory[];
  companies: CompanyRecord[];
  selectedCategories: string[];
  selectedTiers: string[];
  selectedLocations: string[];
  selectedExperience: string[];
  postedWithin: string;
  salaryMin: string;
  salaryMax: string;
  city: string;
  updateParamSet: (key: string, nextValues: string[]) => void;
  updateSingleParam: (key: string, value: string) => void;
  toggleValue: (values: string[], nextValue: string) => string[];
  className?: string;
};

function FiltersColumn({
  categories,
  companies,
  selectedCategories,
  selectedTiers,
  selectedLocations,
  selectedExperience,
  postedWithin,
  salaryMin,
  salaryMax,
  city,
  updateParamSet,
  updateSingleParam,
  toggleValue,
  className
}: FiltersColumnProps) {
  const uniqueTiers = Array.from(new Set(companies.map((company) => company.tier)));

  return (
    <aside className={`lg:sticky lg:top-24 lg:h-fit ${className ?? ""}`}>
      <div className="editorial-card grid gap-6 p-5">
        <FilterSection title="Category">
          {categories.map((category) => (
            <FilterCheckbox
              key={category.slug}
              label={category.title}
              checked={selectedCategories.includes(category.slug)}
              onChange={() => updateParamSet("category", toggleValue(selectedCategories, category.slug))}
            />
          ))}
        </FilterSection>

        <FilterSection title="Company type">
          {uniqueTiers.map((tier) => (
            <FilterCheckbox
              key={tier}
              label={tier}
              checked={selectedTiers.includes(tier)}
              onChange={() => updateParamSet("tier", toggleValue(selectedTiers, tier))}
            />
          ))}
        </FilterSection>

        <FilterSection title="Location">
          {locationTypes.map((locationType) => (
            <FilterCheckbox
              key={locationType}
              label={locationType}
              checked={selectedLocations.includes(locationType)}
              onChange={() => updateParamSet("location", toggleValue(selectedLocations, locationType))}
            />
          ))}
          <input className="text-input mt-3" value={city} onChange={(event) => updateSingleParam("city", event.target.value)} placeholder="City" />
        </FilterSection>

        <FilterSection title="Experience">
          {experienceBands.map((band) => (
            <FilterCheckbox
              key={band}
              label={band}
              checked={selectedExperience.includes(band)}
              onChange={() => updateParamSet("experience", toggleValue(selectedExperience, band))}
            />
          ))}
        </FilterSection>

        <FilterSection title="Salary range">
          <div className="grid gap-3">
            <input className="text-input" value={salaryMin} onChange={(event) => updateSingleParam("salaryMin", event.target.value)} placeholder="Minimum" />
            <input className="text-input" value={salaryMax} onChange={(event) => updateSingleParam("salaryMax", event.target.value)} placeholder="Maximum" />
          </div>
        </FilterSection>

        <FilterSection title="Posted within">
          {["Any", "24h", "7d", "30d"].map((windowValue) => (
            <button
              key={windowValue}
              type="button"
              onClick={() => updateSingleParam("posted", windowValue)}
              className={`w-full border px-3 py-2 text-left text-[0.9rem] ${
                postedWithin === windowValue
                  ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)]"
              }`}
            >
              {windowValue}
            </button>
          ))}
        </FilterSection>
      </div>
    </aside>
  );
}

function FilterSection({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <section>
      <p className="eyebrow">{title}</p>
      <div className="mt-3 grid gap-3">{children}</div>
    </section>
  );
}
