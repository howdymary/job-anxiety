"""Base scraper with ethical guardrails and shared helpers."""

from __future__ import annotations

import asyncio
import hashlib
import time
from abc import ABC, abstractmethod
from collections import defaultdict
from dataclasses import dataclass
from datetime import datetime, timezone
from urllib.parse import urlparse
from urllib.robotparser import RobotFileParser

import httpx

from ..models import ParsedJob, RawJob, ScraperRun


@dataclass
class RobotsCacheEntry:
    parser: RobotFileParser
    fetched_at: float


class BaseScraper(ABC):
    """All scrapers should be polite, rate-limited, and source-specific."""

    USER_AGENT = "JobAnxietyBot/1.0 (+https://jobanxiety.ai/bot; jobs@jobanxiety.ai)"
    MIN_DELAY_SECONDS = 1.0
    MAX_DELAY_SECONDS = 3.0
    ROBOTS_TTL_SECONDS = 24 * 60 * 60

    def __init__(self, *, client: httpx.AsyncClient | None = None) -> None:
        self.client = client or httpx.AsyncClient(timeout=30.0, headers={"User-Agent": self.USER_AGENT})
        self._last_request_at: dict[str, float] = defaultdict(float)
        self._robots_cache: dict[str, RobotsCacheEntry] = {}
        self._seen_source_urls: set[str] = set()
        self._seen_fingerprints: set[str] = set()
        self._locks: dict[str, asyncio.Lock] = defaultdict(asyncio.Lock)

    @abstractmethod
    async def fetch_jobs(self) -> list[RawJob]:
        """Fetch raw jobs from the upstream source."""

    @abstractmethod
    def parse_job(self, raw_job: RawJob) -> ParsedJob:
        """Convert a raw payload into a normalized job."""

    def get_source_name(self) -> str:
        return self.__class__.__name__.replace("Scraper", "").lower()

    async def close(self) -> None:
        await self.client.aclose()

    async def _polite_get(self, url: str, *, source_name: str | None = None) -> httpx.Response:
        domain = urlparse(url).netloc
        lock = self._locks[domain]
        async with lock:
            await self._respect_rate_limit(domain)
            await self._ensure_robots_allowed(url, source_name=source_name)
            response = await self.client.get(url)
            response.raise_for_status()
            self._last_request_at[domain] = time.monotonic()
            return response

    async def _respect_rate_limit(self, domain: str) -> None:
        elapsed = time.monotonic() - self._last_request_at[domain]
        if elapsed < self.MIN_DELAY_SECONDS:
            await asyncio.sleep(self.MIN_DELAY_SECONDS - elapsed)

    async def _ensure_robots_allowed(self, url: str, *, source_name: str | None = None) -> None:
        parsed = urlparse(url)
        origin = f"{parsed.scheme}://{parsed.netloc}"
        entry = self._robots_cache.get(origin)
        if entry and (time.time() - entry.fetched_at) < self.ROBOTS_TTL_SECONDS:
            parser = entry.parser
        else:
            parser = RobotFileParser()
            parser.set_url(f"{origin}/robots.txt")
            try:
                robots_response = await self.client.get(f"{origin}/robots.txt")
                if robots_response.status_code == 200:
                    parser.parse(robots_response.text.splitlines())
                else:
                    parser.parse(["User-agent: *", "Allow: /"])
            except httpx.HTTPError:
                parser.parse(["User-agent: *", "Allow: /"])
            self._robots_cache[origin] = RobotsCacheEntry(parser=parser, fetched_at=time.time())

        if source_name is not None and not parser.can_fetch(self.USER_AGENT, url):
            raise PermissionError(f"robots.txt disallows {source_name} scraping for {url}")

    @staticmethod
    def make_fingerprint(job: ParsedJob) -> str:
        payload = "|".join(
            [
                job.company_name.lower(),
                job.title.lower(),
                job.source.lower(),
                job.location_city.lower() if job.location_city else "",
                job.location_state.lower() if job.location_state else "",
            ]
        )
        return hashlib.sha256(payload.encode("utf-8")).hexdigest()

    def is_duplicate(self, raw_job: RawJob) -> bool:
        return raw_job.source_url in self._seen_source_urls

    def record_seen(self, job: ParsedJob) -> None:
        self._seen_source_urls.add(job.source_url)
        self._seen_fingerprints.add(self.make_fingerprint(job))

    def dedupe_jobs(self, jobs: list[ParsedJob]) -> list[ParsedJob]:
        unique_jobs: list[ParsedJob] = []
        for job in jobs:
            if job.source_url in self._seen_source_urls:
                continue
            fingerprint = self.make_fingerprint(job)
            if fingerprint in self._seen_fingerprints:
                continue
            self._seen_source_urls.add(job.source_url)
            self._seen_fingerprints.add(fingerprint)
            unique_jobs.append(job)
        return unique_jobs

    def new_run(self) -> ScraperRun:
        return ScraperRun(source=self.get_source_name(), started_at=datetime.now(tz=timezone.utc))
