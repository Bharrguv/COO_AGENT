from app.agents.planner_agent import generate_plan
from app.agents.risk_agent import analyze_risks
from app.agents.kpi_agent import generate_kpis
from app.agents.assignment_agent import assign_tasks
from app.agents.insights_agent import generate_insights
from app.agents.health_agent import evaluate_health
from app.workflow.state import COOState
from app.core.logger import logger
import time
import json

def planner_node(state: COOState):
    start = time.time()

    logger.info("Planner node started")

    plan = generate_plan(state["goal"])

    print("=" * 80)
    print(json.dumps(plan, indent=2))
    print("=" * 80)
    logger.info(
        f"Planner node finished in {(time.time()-start):.2f}s"
    )

    return {
        "plan": plan
    }

def risk_node(state: COOState):
    start = time.time()

    logger.info("Risk node started")

    risks = analyze_risks(state["plan"])

    logger.info(
        f"Risk node finished in {(time.time()-start):.2f}s"
    )

    return {
        "risks": risks
    }


def kpi_node(state: COOState):
    start = time.time()

    logger.info("KPI node started")

    kpis = generate_kpis(state["goal"])

    logger.info(
        f"KPI node finished in {(time.time()-start):.2f}s"
    )

    return {
        "kpis": kpis
    }


def assignment_node(state: COOState):
    start = time.time()

    logger.info("Assignment node started")

    assignments = assign_tasks(state["plan"])

    logger.info(
        f"Assignment node finished in {(time.time()-start):.2f}s"
    )

    return {
        "assignments": assignments
    }

def insights_node(state: COOState) -> COOState:
    start = time.time()

    logger.info("Insights node started")
    insights = generate_insights(
        plan=state["plan"],
        risks=state["risks"],
        kpis=state["kpis"]
    )
    state["insights"] = insights
    logger.info(
        f"Insights node finished in {(time.time()-start):.2f}s"
    )
    return state


def health_node(state: COOState):
    start = time.time()

    logger.info("Health node started")

    health = evaluate_health(
        plan=state["plan"],
        risks=state["risks"],
        assignments=state["assignments"],
        kpis=state["kpis"],
        insights=state["insights"],
    )

    logger.info(
        f"Health node finished in {(time.time()-start):.2f}s"
    )

    return {
        "health": health
    }