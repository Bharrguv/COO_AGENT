import json

from app.prompts.risk_prompt import SYSTEM_PROMPT
from app.core.llm import call_llm


def analyze_risks(plan: dict):
    prompt = f"""
Analyze the following startup execution plan.

PLAN:

{json.dumps(plan, indent=2)}
"""

    return call_llm(
        system_prompt=SYSTEM_PROMPT,
        user_prompt=prompt,
    )