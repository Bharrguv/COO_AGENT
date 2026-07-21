import time

from sqlalchemy.orm import Session

from app.workflow.workflow import graph

from app.core.logger import logger

from app.repositories.plan_repository import save_plan
from app.repositories.task_repository import save_tasks

from app.schemas.plan import PlanResponse
from fastapi import HTTPException

def execute_workflow(
    goal: str,
    db: Session,
     user_id,
) -> PlanResponse:
    """
    Execute the complete COO workflow.

    Steps:
    1. Run LangGraph workflow
    2. Save generated plan
    3. Save generated tasks
    4. Return API response
    """

    logger.info("Starting COO workflow")

    start = time.time()

    try:
        # Execute LangGraph workflow
        result = graph.invoke(
            {
                "goal": goal
            }
        )
        

        # Save plan
        saved_plan = save_plan(
            db=db,
            goal=goal,
            plan=result["plan"],
            user_id=user_id,
        )

        # Save generated tasks
        save_tasks(
            db=db,
            plan_id=saved_plan.id,
            projects=result["plan"]["projects"],
            assignments=result["assignments"],
        )

        elapsed = round(time.time() - start, 2)


        total_projects = len(result["plan"]["projects"])

        total_tasks = sum(
            len(project["tasks"])
            for project in result["plan"]["projects"]
        )

        logger.info(
            "Workflow completed successfully",
            extra={
                "plan_id": saved_plan.id,
                "elapsed_seconds": elapsed,
                "projects": total_projects,
                "tasks": total_tasks,
                "agents": 6,
            },
        )

        # Return API response
        return PlanResponse(
            id=saved_plan.id,
            
            goal=goal,

            projects=result["plan"]["projects"],

            assignments=result["assignments"],

            risks=result["risks"]["risks"],

            kpis=result["kpis"]["kpis"],

            insights=result["insights"],

            health=result["health"],
        )

    except Exception:
        logger.exception("Workflow execution failed")

    raise HTTPException(
        status_code=500,
        detail="Workflow execution failed."
    )