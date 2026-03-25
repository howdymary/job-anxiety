"""Orchestration for source scrapers, categorization, and enrichment."""

from __future__ import annotations

import argparse
import asyncio
import json
from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from typing import Iterable

from .categorizer.rules import classify_job
from .enrichment.classifier import enrich_company
from .models import CompanyRecord, ParsedJob, ScraperRun
from .scrapers.base import BaseScraper


@dataclass
class PipelineResult:
    jobs: list[ParsedJob] = field(default_factory=list)
    companies: list[CompanyRecord] = field(default_factory=list)
    runs: list[ScraperRun] = field(default_factory=list)
    errors: list[str] = field(default_factory=list)


class ScraperPipeline:
    def __init__(self, scrapers: Iterable[BaseScraper]) -> None:
        self.scrapers = list(scrapers)

    async def run(self) -> PipelineResult:
        result = PipelineResult()
        companies_by_slug: dict[str, CompanyRecord] = {}
        for scraper in self.scrapers:
            run = scraper.new_run()
            try:
                raw_jobs = await scraper.fetch_jobs()
                run.jobs_found = len(raw_jobs)
                parsed_jobs: list[ParsedJob] = []

                for raw_job in raw_jobs:
                    job = scraper.parse_job(raw_job)
                    if job.category.value == "other":
                        decision = classify_job(job.title, job.description)
                        job.category = decision.category
                    parsed_jobs.append(job)
                    company = enrich_company({"name": job.company_name, "domain": job.company_domain})
                    companies_by_slug[company.slug] = company

                parsed_jobs = scraper.dedupe_jobs(parsed_jobs)
                run.jobs_new = len(parsed_jobs)
                result.jobs.extend(parsed_jobs)
                run.status = "success"
            except Exception as exc:  # pragma: no cover - orchestration guardrail
                run.errors.append(str(exc))
                run.status = "failed"
                result.errors.append(f"{scraper.get_source_name()}: {exc}")
            finally:
                run.finished_at = datetime.now(tz=timezone.utc)
                result.runs.append(run)
                await scraper.close()

        result.companies.extend(companies_by_slug.values())
        return result


def result_to_json(result: PipelineResult) -> str:
    payload = {
        "jobs": [asdict(job) for job in result.jobs],
        "companies": [asdict(company) for company in result.companies],
        "runs": [asdict(run) for run in result.runs],
        "errors": result.errors,
    }
    return json.dumps(payload, default=str, indent=2)


def build_demo_pipeline() -> ScraperPipeline:
    from .scrapers.career_page import CareerPageConfig, CareerPageScraper

    return ScraperPipeline(
        scrapers=[
            CareerPageScraper(
                base_url="https://example.com/careers",
                config=CareerPageConfig(company_name="Example AI", company_domain="example.com"),
            )
        ]
    )


async def _run_async() -> int:
    pipeline = build_demo_pipeline()
    result = await pipeline.run()
    print(result_to_json(result))
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Run the Reframe scraper pipeline.")
    parser.add_argument("--demo", action="store_true", help="Run the demo pipeline.")
    args = parser.parse_args(argv)
    return asyncio.run(_run_async())
