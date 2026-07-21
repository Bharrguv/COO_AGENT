from app.workflows.coo_graph import graph


result = graph.invoke(
    {
        "goal": "Build an AI SaaS Platform",
        "plan": {},
        "risks": {},
        "assignments": {},
        "kpis": {}
    }
)

print(result)