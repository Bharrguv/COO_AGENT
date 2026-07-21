from app.core.llm import call_llm
from app.prompts.assignment_agent_prompt import SYSTEM_PROMPT


def assign_tasks(goal: str):
    """Assign each task to an owner using the shared LLM JSON parsing."""
    return call_llm(system_prompt=SYSTEM_PROMPT, user_prompt=goal)


