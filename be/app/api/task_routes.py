from typing import List

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.schemas.task import (
    TaskResponse,
    AssignRequest,
    TaskUpdateStatus,
)

from app.repositories.task_repository import (
    get_all_tasks,
    get_task_by_id,
    update_task_owner,
    update_task_status,
    delete_task,
)

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"],
)


@router.get(
    "/",
    response_model=List[TaskResponse],
)
def get_tasks(
    db: Session = Depends(get_db),
):
    return get_all_tasks(db)


@router.get(
    "/{task_id}",
    response_model=TaskResponse,
)
def get_task(
    task_id: int,
    db: Session = Depends(get_db),
):
    task = get_task_by_id(
        db,
        task_id,
    )

    if task is None:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    return task


@router.patch(
    "/{task_id}/complete",
    response_model=TaskResponse,
)
def update_completion_status(
    task_id: int,
    request: TaskUpdateStatus,
    db: Session = Depends(get_db),
):
    task = update_task_status(
        db=db,
        task_id=task_id,
        completed=request.completed,
    )

    if task is None:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    return task


@router.patch(
    "/{task_id}/assign",
    response_model=TaskResponse,
)
def assign_task(
    task_id: int,
    request: AssignRequest,
    db: Session = Depends(get_db),
):
    task = update_task_owner(
        db=db,
        task_id=task_id,
        owner=request.owner,
    )

    if task is None:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    return task


@router.delete("/{task_id}")
def remove_task(
    task_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_task(
        db,
        task_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    return {
        "message": "Task deleted successfully"
    }