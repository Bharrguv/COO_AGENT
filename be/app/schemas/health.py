from typing import List
from pydantic import BaseModel


class HealthResponse(BaseModel):
    overall_score: int
    status: str
    summary: str
    strengths: List[str]
    warnings: List[str]
    next_actions: List[str]