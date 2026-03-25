from reframe_scraper.models import JobCategory, ParsedJob
from reframe_scraper.scrapers.base import BaseScraper


class DummyScraper(BaseScraper):
    async def fetch_jobs(self):  # pragma: no cover - not used here
        return []

    def parse_job(self, raw_job):  # pragma: no cover - not used here
        raise NotImplementedError


def test_dedupe_jobs_by_fingerprint() -> None:
    scraper = DummyScraper()
    job_one = ParsedJob(
        title="AI Engineer",
        raw_title="AI Engineer",
        description="Build inference systems",
        company_name="OpenAI",
        company_domain="openai.com",
        category=JobCategory.AI_ENGINEER,
        source="greenhouse",
        source_url="https://example.com/job-1",
    )
    job_two = ParsedJob(
        title="AI Engineer",
        raw_title="AI Engineer",
        description="Build inference systems",
        company_name="OpenAI",
        company_domain="openai.com",
        category=JobCategory.AI_ENGINEER,
        source="greenhouse",
        source_url="https://example.com/job-2",
    )

    unique = scraper.dedupe_jobs([job_one, job_two])
    assert len(unique) == 1

