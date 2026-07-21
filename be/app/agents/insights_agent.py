import json
from urllib import response

from app.prompts.insights_prompt import SYSTEM_PROMPT
from app.core.llm import call_llm
from app.schemas.insights import InsightsResponse


def generate_insights(
    plan,
    risks,
    kpis,
):
    user_prompt = f"""
PLAN

{json.dumps(plan, indent=2)}

RISKS

{json.dumps(risks, indent=2)}

KPIS

{json.dumps(kpis, indent=2)}
"""

    response = call_llm(
        system_prompt=SYSTEM_PROMPT,
        user_prompt=user_prompt,
    )
    print("=" * 80)
    print("INSIGHTS RESPONSE")
    print(json.dumps(response, indent=2))
    print("=" * 80)
    return InsightsResponse(**response).model_dump()
