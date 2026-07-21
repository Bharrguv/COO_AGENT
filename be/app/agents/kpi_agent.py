import os
import json

from dotenv import load_dotenv
from openai import OpenAI
from app.prompts.kpi_prompt import SYSTEM_PROMPT
from app.core.llm import call_llm





def generate_kpis(goal: str):
    return call_llm(
        system_prompt=SYSTEM_PROMPT,
        user_prompt=goal,
    )

# def generate_kpis(goal: str) -> dict:
    # response = client.chat.completions.create(
    #     model="llama-3.3-70b-versatile",
    #     temperature=0,
    #     messages=[
    #         {
    #             "role": "system",
    #             "content": SYSTEM_PROMPT
    #         },
    #         {
    #             "role": "user",
    #             "content": goal
    #         }
    #     ]
    # )

    # content = response.choices[0].message.content.strip()

    # print("\n===== KPI AGENT =====")
    # print(content)
    # print("=====================\n")

    # # Remove markdown if the model returns ```json ... ```
    # if content.startswith("```"):
    #     content = (
    #         content
    #         .replace("```json", "")
    #         .replace("```", "")
    #         .strip()
    #     )

    # try:
    #     return json.loads(content)

    # except json.JSONDecodeError:
    #     raise ValueError(
    #         f"Invalid JSON returned by KPI Agent:\n\n{content}"
    #     )