"""Workday scraper scaffold."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any

from ..categorizer.rules import classify_job
from ..models import JobCategory, LocationType, ParsedJob, RawJob
from .base import BaseScraper


class WorkdayScraper(BaseScraper):
    def __init__(self, company: str, jobs_url: str | None = None, *, client=None) -> None:
        super().__init__(client=client)
        self.company = company
        self.jobs_url = jobs_url

    async def fetch_jobs(self) -> list[RawJob]:
        if not self.jobs_url:
            return []
        response = await self._polite_get(self.jobs_url, source_name="workday")
        payload = response.text
        return [
            RawJob(
                source="workday",
                source_url=self.jobs_url,
                payload={"html": payload, "jobs_url": self.jobs_url},
            )
        ]

    def parse_job(self, raw_job: RawJob) -> ParsedJob:
        payload: dict[str, Any] = raw_job.payload
        html = str(payload.get("html") or "")
        title = _first_json_ld_value(html, ("title", "jobTitle")) or f"{self.company} role"
        description = _first_json_ld_value(html, ("description",)) or html[:2000]
        decision = classify_job(title, description)
        return ParsedJob(
            title=title,
            raw_title=title,
            description=description,
            company_name=self.company.replace("-", " ").title(),
            company_domain=None,
            category=decision.category if decision.category is not JobCategory.OTHER else JobCategory.AI_ENGINEER,
            source="workday",
            source_url=raw_job.source_url,
            source_id=raw_job.source_id,
            location_type=LocationType.ONSITE if "workday" in html.lower() else None,
            posted_at=None,
        )


def _first_json_ld_value(html: str, keys: tuple[str, ...]) -> str | None:
    marker = '"@type":"JobPosting"'
    if marker not in html:
        return None

    for key in keys:
        candidate = f'"{key}":"'
        start = html.find(candidate)
        if start == -1:
            continue
        value_start = start + len(candidate)
        value_end = html.find('"', value_start)
        if value_end > value_start:
            return html[value_start:value_end]
    return None
