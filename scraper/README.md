# Job Anxiety Scraper

Ethical, API-first job collection and enrichment pipeline for Job Anxiety.

## Quick Start

```bash
cd /Users/maryliu/job-anxiety/scraper
python -m job_anxiety_scraper --help
```

## Design Notes

- Prefer public ATS APIs before HTML parsing.
- Respect `robots.txt` and rate limit per domain.
- Keep scrapers isolated so one source failure does not stop the pipeline.
