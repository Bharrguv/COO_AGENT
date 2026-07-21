from pydantic import BaseModel


class TaskResponse(BaseModel):
    id: int
    title: str
    description: str
    priority: str
    owner: str
    completed: bool

    class Config:
        from_attributes = True


class AssignRequest(BaseModel):
    owner: str


class TaskUpdateStatus(BaseModel):
    completed: bool