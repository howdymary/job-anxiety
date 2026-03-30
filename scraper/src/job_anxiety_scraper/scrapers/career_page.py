"""Generic career page scraper for structured HTML and JSON-LD."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
import html.parser
import re
from typing import Any
from urllib.parse import urljoin

from ..categorizer.rules import classify_job
from ..models import JobCategory, LocationType, ParsedJob, RawJob
from .base import BaseScraper


@dataclass
class CareerPageConfig:
    jobs_container_selector: str | None = None
    job_link_pattern: str = r"/jobs?/|/careers?/|/positions?/"
    title_selector: str | None = None
    description_selector: str | None = None
    company_name: str = "Unknown Company"
    company_domain: str | None = None
    source_name: str = "career_page"


class CareerPageScraper(BaseScraper):
    def __init__(
        self,
        base_url: str,
        config: CareerPageConfig | None = None,
        *,
        client=None,
    ) -> None:
        super().__init__(client=client)
        self.base_url = base_url
        self.config = config or CareerPageConfig()

    async def fetch_jobs(self) -> list[RawJob]:
        response = await self._polite_get(self.base_url, source_name="career_page")
        html = response.text
        job_urls = extract_job_links(self.base_url, html, self.config.job_link_pattern)
        jobs = [
            RawJob(source=self.config.source_name, source_url=url, payload={"html": html, "job_url": url})
            for url in job_urls
        ]
        return jobs

    def parse_job(self, raw_job: RawJob) -> ParsedJob:
        html = str(raw_job.payload.get("html") or "")
        title = _extract_json_ld_value(html, ("title", "jobTitle")) or _derive_title(raw_job.source_url)
        description = _extract_json_ld_value(html, ("description",)) or _extract_meta_description(html)
        decision = classify_job(title, description)
        return ParsedJob(
            title=title,
            raw_title=title,
            description=description,
            company_name=self.config.company_name,
            company_domain=self.config.company_domain,
            category=decision.category if decision.category is not JobCategory.OTHER else JobCategory.OTHER,
            source=self.config.source_name,
            source_url=raw_job.source_url,
            source_id=raw_job.source_id,
            location_type=LocationType.REMOTE if "remote" in html.lower() else None,
            posted_at=_extract_date(html),
        )


def extract_job_links(base_url: str, html: str, pattern: str) -> list[str]:
    hrefs = re.findall(r'href=["\']([^"\']+)["\']', html, flags=re.I)
    compiled = re.compile(pattern, flags=re.I)
    seen: set[str] = set()
    jobs: list[str] = []
    for href in hrefs:
        if not compiled.search(href):
            continue
        absolute = urljoin(base_url, href)
        if absolute not in seen:
            seen.add(absolute)
            jobs.append(absolute)
    return jobs


def _extract_json_ld_value(html: str, keys: tuple[str, ...]) -> str | None:
    if '"@type":"JobPosting"' not in html and '"@type": "JobPosting"' not in html:
        return None

    for key in keys:
        match = re.search(rf'"{re.escape(key)}"\s*:\s*"([^"]+)"', html)
        if match:
            return match.group(1)
    return None


def _extract_meta_description(html: str) -> str:
    match = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']+)["\']', html, flags=re.I)
    if match:
        return match.group(1)
    return html[:2000]


def _derive_title(url: str) -> str:
    slug = url.rstrip("/").split("/")[-1]
    slug = slug.replace("-", " ").replace("_", " ")
    return slug.title() if slug else "Open Role"


def _extract_date(html: str) -> datetime | None:
    match = re.search(r'(\d{4}-\d{2}-\d{2})', html)
    if not match:
        return None
    try:
        return datetime.fromisoformat(match.group(1)).replace(tzinfo=timezone.utc)
    except ValueError:
        return None
