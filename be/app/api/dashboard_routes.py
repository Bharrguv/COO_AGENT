from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.schemas.dashboard import DashboardResponse


from app.services.dashboard_service import (
    total_tasks,
    completed_tasks,
    pending_tasks,
    completion_rate,
    high_priority_tasks,
    tasks_by_owner,
    get_dashboard_metrics
)


router = APIRouter(
     prefix="/dashboard",
     tags=["Dashboard"],
)

@router.get(
    "/",
    response_model=DashboardResponse,
)
def dashboard(
    db: Session = Depends(get_db),
):
    return DashboardResponse(
        total_tasks=total_tasks(db),
        completed_tasks=completed_tasks(db),
        pending_tasks=pending_tasks(db),
        completion_rate=completion_rate(db),
        high_priority_tasks=high_priority_tasks(db),
        owners=tasks_by_owner(db),
    )

