import json
import random
import re
import time
from typing import Any

from openai import OpenAI
from openai import RateLimitError

from app.core.config import settings
from app.core.logger import logger


client = OpenAI(
    api_key=settings.GROQ_API_KEY,
    base_url=settings.GROQ_BASE_URL,
)

_CODE_FENCE_RE = re.compile(r"^```(?:json)?\s*|```\s*$", re.MULTILINE)


def _strip_code_fences(content: str) -> str:
    return _CODE_FENCE_RE.sub("", content).strip()


def call_llm(system_prompt: str, user_prompt: str) -> dict[str, Any]:
    """Call Groq chat completion and parse JSON output.

    Retries on provider rate limiting (HTTP 429) since tests may invoke multiple LLM nodes.

    In test mode, returns deterministic stub JSON to avoid external provider flakiness.
    """

    # Treat any non-production environment (including unit-test runs) as “test mode”.
    env = (getattr(settings, "ENVIRONMENT", "development") or "development").lower()
    if env in {"test", "testing"}:
        return {
            "stub": True,
            "system_prompt": system_prompt,
            "user_prompt": user_prompt,
        }




    start = time.time()
    logger.info(
        "LLM request started",
        extra={"model": settings.GROQ_MODEL},
    )

    max_attempts = 6
    base_sleep_s = 2.0

    last_exc: Exception | None = None
    for attempt in range(1, max_attempts + 1):
        try:
            response = client.chat.completions.create(
                model=settings.GROQ_MODEL,
                temperature=0,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
            )
            content = (response.choices[0].message.content or "").strip()

            elapsed = time.time() - start
            logger.info(
                "LLM response received",
                extra={"elapsed_ms": int(elapsed * 1000)},
            )

            content = _strip_code_fences(content)

            try:
                parsed = json.loads(content)
            except json.JSONDecodeError:
                logger.error("Invalid JSON received from LLM")
                raise ValueError("Invalid JSON returned by LLM")

            if not isinstance(parsed, dict):
                raise ValueError("LLM returned JSON but not an object")

            return parsed
        except RateLimitError as exc:
            last_exc = exc
            if attempt == max_attempts:
                logger.exception("llm call failed after rate-limit retries")
                raise

            # Exponential backoff + jitter.
            sleep_s = base_sleep_s * (2 ** (attempt - 1))
            sleep_s = min(sleep_s, 60.0)
            sleep_s = sleep_s + random.uniform(0, 0.5)
            logger.info(
                "Rate limited; retrying LLM call",
                extra={"attempt": attempt, "max_attempts": max_attempts, "sleep_s": sleep_s},
            )
            time.sleep(sleep_s)
        except Exception:
            logger.exception("llm call failed")
            raise

    # Defensive: should not reach here.
    if last_exc:
        raise last_exc
    raise RuntimeError("LLM call failed")


