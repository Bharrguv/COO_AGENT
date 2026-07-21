import json

from app.core.llm import call_llm
from app.prompts.health_prompt import SYSTEM_PROMPT
from app.schemas.health import HealthResponse


def evaluate_health(
    plan,
    risks,
    assignments,
    kpis,
    insights,
):
    user_prompt = f"""
PLAN

{json.dumps(plan, indent=2)}

RISKS

{json.dumps(risks, indent=2)}

ASSIGNMENTS

{json.dumps(assignments, indent=2)}

KPIS

{json.dumps(kpis, indent=2)}

INSIGHTS

{json.dumps(insights, indent=2)}
"""

    response = call_llm(
        system_prompt=SYSTEM_PROMPT,
        user_prompt=user_prompt,
    )

    return HealthResponse(**response).model_dump()