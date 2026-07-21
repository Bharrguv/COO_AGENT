from sqlalchemy import Column, Integer, Text, Boolean, String
from sqlalchemy.orm import relationship

from app.db.database import Base


class Plan(Base):
    __tablename__ = "plans"

    id = Column(Integer, primary_key=True, index=True)

    goal = Column(Text)

    plan_json = Column(Text)

    user_id = Column(String, index=True, nullable=True)

    approved = Column(Boolean, default=False)

    tasks = relationship(
        "Task",
        back_populates="plan",
        cascade="all, delete-orphan",
    )