from sqlalchemy import Column, Integer, String

from app.db.database import Base


class GoogleToken(Base):
    __tablename__ = "google_tokens"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(String, unique=True, nullable=False, index=True)

    access_token = Column(String, nullable=False)

    refresh_token = Column(String)

    expiry = Column(String)