from openai import OpenAI
import os
from app.core.llm import call_llm
from app.prompts.planner_prompt import SYSTEM_PROMPT

def generate_plan(goal: str):
    return call_llm(
        system_prompt=SYSTEM_PROMPT,
        user_prompt=goal
    )


