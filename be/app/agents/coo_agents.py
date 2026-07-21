from app.core.llm import call_llm
from app.prompts.coo_prompt import SYSTEM_PROMPT


def generate_plan(goal: str) -> dict:
    return call_llm(
        system_prompt=SYSTEM_PROMPT,
        user_prompt=goal,
    )

