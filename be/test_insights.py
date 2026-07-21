from app.agents.insights_agent import analyze_dashboard

metrics = {
    "total_tasks": 20,
    "completed_tasks": 8,
    "pending_tasks": 12,
    "completion_rate": 40,
    "high_priority_tasks": 6,
    "owners": {
        "Backend Engineer": 8,
        "Frontend Engineer": 4,
        "AI Engineer": 2
    }
}

result = analyze_dashboard(metrics)

print(result)