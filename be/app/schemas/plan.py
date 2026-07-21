from pydantic import BaseModel 
from typing import List, Dict, Any

class Task(BaseModel):
    title:str
    description: str
    priority: str
    estimated_days: int

class Project(BaseModel):
    title: str
    description: str
    priority: str
    tasks: List[Task]

class Assignment(BaseModel):
    task: str
    owner: str
    reason: str
class ReviewRequest(BaseModel):
    question: str

class ReviewResponse(BaseModel):
    answer: str
class PlanResponse(BaseModel):
    id: int
    
    goal: str

    projects: List[Project]

    assignments: List[Assignment]

    risks: List[Dict[str, Any]]

    kpis: List[Dict[str, Any]]

    insights: Dict[str, Any]

    health: Dict[str, Any]


class PlanRequest(BaseModel):
    goal:str  

class PlanDBResponse(BaseModel):
    id: int
    goal: str
    plan_json: Dict[str, Any]

    class Config:
        from_attributes = True

