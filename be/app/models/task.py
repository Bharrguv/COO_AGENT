from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from app.db.database import Base
from pydantic import BaseModel

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)

    plan_id = Column(Integer, ForeignKey("plans.id"))

    title = Column(String)

    description = Column(Text)

    priority = Column(String)

    owner = Column(String)

    completed = Column(Boolean, default=False)

    google_event_id = Column(String, nullable=True)
    
    plan = relationship(
        "Plan",
        back_populates="tasks"
    )

class AssignRequest(BaseModel):
    owner: str
