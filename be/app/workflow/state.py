from typing import TypedDict, NotRequired


class COOState(TypedDict):
    goal: str

    plan: NotRequired[dict]
    risks: NotRequired[dict]
    assignments: NotRequired[list]
    kpis: NotRequired[dict]
    insights: NotRequired[dict]
    health: NotRequired[dict]