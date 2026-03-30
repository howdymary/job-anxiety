from job_anxiety_scraper.categorizer.rules import classify_job
from job_anxiety_scraper.models import JobCategory


def test_classify_ai_engineer_title() -> None:
    decision = classify_job("Senior AI Engineer", "Build LLM inference systems")
    assert decision.category == JobCategory.AI_ENGINEER
    assert decision.confidence > 0.5


def test_classify_prompt_engineer_title() -> None:
    decision = classify_job("Prompt Engineer", "Prompt optimization and evaluation")
    assert decision.category == JobCategory.PROMPT_ENGINEER
