from app.prompts.assignment_agent_prompt import SYSTEM_PROMPT
from app.core.llm import call_llm


def assign_task(
    task_title: str,
    task_description: str,
):
    prompt = f"""
Task:
{task_title}

Description:
{task_description}
"""

    return call_llm(
        system_prompt=SYSTEM_PROMPT,
        user_prompt=prompt,
    )


def assign_tasks(plan: dict):
    assignments = []

    for project in plan["projects"]:

        for task in project["tasks"]:

            result = assign_task(
                task_title=task["title"],
                task_description=task["description"],
            )

            assignments.append(
                {
                    "task": task["title"],
                    "owner": result["owner"],
                    "reason": result["reason"],
                }
            )

    return assignments