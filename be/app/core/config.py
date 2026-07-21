from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Centralized application configuration.

    Uses environment variables for production deployments.
    """

    # LLM / Groq
    # Provide a safe default for local/test environments.
    # Production should always override via environment variables.
    GROQ_API_KEY: str = Field("", description="Groq API key")
    GROQ_BASE_URL: str = "https://api.groq.com/openai/v1"
    GROQ_MODEL: str = "llama-3.3-70b-versatile"

    # Security
    SECRET_KEY: str = Field("change-me", description="Used for signing; do not ship default in prod")
    # JWT (auth)
    JWT_SECRET_KEY: str = Field("change-me", description="JWT signing secret; set via environment in production")
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_SECONDS: int = Field(3600, description="Access token lifetime (seconds)")


    # App runtime
    ENVIRONMENT: str = Field("development", description="development|staging|production")
    DEBUG: bool = False

    # Database
    DATABASE_URL: str = "sqlite:///./coo_agent.db"

    # API
    API_PREFIX: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()


settings = get_settings()

