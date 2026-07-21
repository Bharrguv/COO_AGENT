from langgraph.graph import StateGraph, START, END

from app.workflow.state import COOState
from app.workflow.nodes import (
    planner_node,
    risk_node,
    assignment_node,
    kpi_node,
    insights_node,
    health_node,
)

builder = StateGraph(COOState)

builder.add_node("planner", planner_node)
builder.add_node("risk", risk_node)
builder.add_node("assignment", assignment_node)
builder.add_node("kpi", kpi_node)
builder.add_node("insights", insights_node)
builder.add_node("health", health_node)

builder.add_edge(START, "planner")

builder.add_edge("planner", "risk")
builder.add_edge("planner", "assignment")
builder.add_edge("planner", "kpi")

builder.add_edge("risk", "insights")
builder.add_edge("assignment", "insights")
builder.add_edge("kpi", "insights")

builder.add_edge("insights", "health")

builder.add_edge("health", END)

graph = builder.compile()