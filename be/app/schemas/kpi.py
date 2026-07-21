from pydantic import BaseModel

class KPIRequest(BaseModel):
    total_tasks: int
    completed_tasks: int

class KPIResponse(BaseModel):
    completion_rate: str
    status: str
    recommendation: str
