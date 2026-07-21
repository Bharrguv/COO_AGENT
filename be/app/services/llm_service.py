from typing import Any

from openai import OpenAI

from app.core.config import settings

client = OpenAI(
    api_key=settings.GROQ_API_KEY,
    base_url=settings.GROQ_BASE_URL,
)

def generate_completion(messages: list[dict[str, Any]]) -> str:
    response = client.chat.completions.create(
        model=settings.GROQ_MODEL,
        temperature=0,
        messages=messages,
    )

    return response.choices[0].message.content or ""
