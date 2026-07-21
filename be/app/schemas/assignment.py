from pydantic import BaseModel

class AssignmentRequest(BaseModel):
    title:str
    description: str
class AssignmentResponse(BaseModel):
    owner: str
    reason: str
