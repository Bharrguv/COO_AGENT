from pydantic import BaseModel
from typing import List


class InsightsResponse(BaseModel):
    executive_summary: str
    biggest_risk: str
    highest_priority: str
    bottleneck: str
    founder_focus: str
    recommendations: List[str]