import json

from  app.agents.planner_agent import generate_projects
from app.agents.risk_agent import generate_risks
from app.agents.task_assignment import assign_tasks

def generate_coo_plan(goal:str):

    projects = generate_projects(goal)
    risks = generate_risks(goal)
    assignments = assign_tasks(goal)

    projects_dict = json.loads(projects)
    risks_dict = json.loads(risks)

    final_plan = {
    "goal": goal,
    "projects": projects_dict["projects"],
    "risks": risks_dict["risks"],
    "assignments": assignments["assignments"]
}

    return final_plan