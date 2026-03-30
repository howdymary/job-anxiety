from job_anxiety_scraper.enrichment.classifier import classify_company, enrich_company
from job_anxiety_scraper.models import CompanyTier


def test_classify_company_fortune_500() -> None:
    tier = classify_company({"name": "Microsoft"})
    assert tier == CompanyTier.FORTUNE_500


def test_enrich_company_defaults_slug() -> None:
    record = enrich_company({"name": "OpenAI"})
    assert record.slug == "openai"
    assert record.tier == CompanyTier.VC_BACKED
