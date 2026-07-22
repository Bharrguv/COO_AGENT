from typing import List
import time

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.logger import logger
from app.db.dependencies import get_db

from app.schemas.plan import (
    PlanRequest,
    PlanResponse,
    PlanDBResponse,
    ReviewRequest,
    ReviewResponse,
)

from app.schemas.kpi import (
    KPIRequest,
    KPIResponse,
)

from app.schemas.assignment import (
    AssignmentRequest,
    AssignmentResponse,
)

from app.repositories.plan_repository import (
    get_all_plans,
    get_plan_by_id,
    get_plan_response,
    approve_plan,
)

from app.agents.review_agents import review_plan
from app.agents.assignment_agent import assign_task
from app.agents.kpi_agent import generate_kpis

from app.services.workflow_service import execute_workflow
from app.core.auth import get_current_user


router = APIRouter()



# Health Check

@router.get("/health")
def health_check():
    return {
        "status": "running"
    }



# Generate COO Plan

@router.post("/plan", response_model=PlanResponse)
def create_plan(
    request: PlanRequest,
    db: Session = Depends(get_db),
):
    logger.info("Workflow started")

    start = time.time()

    try:
        result = execute_workflow(
            goal=request.goal,
            db=db,
            user_id="public-user",  # Temporary demo user
        )

        elapsed = round(time.time() - start, 2)

        logger.info(
            f"Workflow completed successfully in {elapsed} seconds"
        )

        return result

    except Exception as e:
        logger.exception("Workflow failed")

        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate COO plan: {str(e)}",
        )

# Get All Plans

@router.get(
    "/plans",
    response_model=List[PlanDBResponse]
)
def get_plans(
    db: Session = Depends(get_db),
     current_user=Depends(get_current_user),
):
    return get_all_plans(db,current_user["user_id"],)



# Get Plan By ID

@router.get(
    "/plan/{plan_id}",
    response_model=PlanDBResponse,
)
def get_plan(
    plan_id: int,
    db: Session = Depends(get_db),
):
    plan = get_plan_response(db, plan_id)

    if plan is None:
        raise HTTPException(
            status_code=404,
            detail="Plan not found",
        )

    return plan



# Review Plan

@router.post(
    "/plans/{plan_id}/review",
    response_model=ReviewResponse,
)
def review_saved_plan(
    plan_id: int,
    request: ReviewRequest,
    db: Session = Depends(get_db),
):
    plan = get_plan_by_id(
        db=db,
        plan_id=plan_id,
    )

    if plan is None:
        raise HTTPException(
            status_code=404,
            detail="Plan not found",
        )

    answer = review_plan(
        plan=plan.plan,
        question=request.question,
    )

    return ReviewResponse(
        answer=answer
    )



# KPI Endpoint

@router.post(
    "/kpi",
    response_model=KPIResponse,
)
def kpi_analysis(
    request: KPIRequest,
):
    result = generate_kpis(
        request.total_tasks,
        request.completed_tasks,
    )

    return KPIResponse(**result)



# Assignment Endpoint
@router.post(
    "/assign",
    response_model=AssignmentResponse,
)
def assign_task_endpoint(
    request: AssignmentRequest,
):
    result = assign_task(
        request.title,
        request.description,
    )

    return AssignmentResponse(**result)



# Approve Plan
@router.patch(
    "/{plan_id}/approve",
    response_model=PlanDBResponse,
)
def approve(
    plan_id: int,
    db: Session = Depends(get_db),
):
    plan = approve_plan(
        db,
        plan_id,
    )

    if plan is None:
        raise HTTPException(
            status_code=404,
            detail="Plan not found",
        )

    return plan
