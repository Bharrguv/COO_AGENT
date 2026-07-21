from app.repositories.plan_repository import get_all_plans

def build_context(db):
    plans = get_all_plans(db)

    context = ""

    for plan in plans:
        context += f"""
Goal:
{plan["goal"]}

Plan:
{plan["plan"]}

-----------------------
"""

    return context