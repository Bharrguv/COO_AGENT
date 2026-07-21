from sqlalchemy.orm import Session
from app.models.task import Task
from sqlalchemy import func
from app.repositories.task_repository import (
    get_all_tasks,completed_tasks
)
from app.agents.health_agent import evaluate_health
from app.schemas.health import HealthResponse


def total_tasks(db: Session):
        return db.query(Task).count()

def completed_tasks(db: Session):
        return(
                db.query(Task)
                .filter(Task.completed == True)
                .count()

        )

def pending_tasks(db: Session):
        return(
                db.query(Task)
                .filter(Task.completed == False)
                .count()

        )

def completion_rate(db: Session):
    total = total_tasks(db)

    if total == 0:
        return 0

    completed = completed_tasks(db)

    return round((completed / total) * 100, 2)

def high_priority_tasks(db: Session):
        return(
                db.query(Task)
                .filter(Task.priority == "HIGH")
                .count()
        )


def tasks_by_owner(db:Session):
        rows = (
                db.query(
                        Task.owner,
                        func.count(Task.id)
                )
                .group_by(Task.owner)
                .all()

        )

        return{
                owner: count
                for owner,count in rows
        }

def get_dashboard_metrics(db):
        tasks = get_all_tasks(db)

        total_tasks = len(tasks)

        completed_tasks = len(
                [task for task in tasks if task.completed]

        )

        pending_tasks = total_tasks - completed_tasks

        high_priority_count = len(
                [
                        task
                        for task in tasks
                        if task.priority.upper() == "HIGH"
                        and not task.completed
                ]
        )

        completion_rate = (
                round((completed_tasks /  total_tasks) *100 ,2)
                if total_tasks >0
                else 0
        )

        owners =  {}

        for task in tasks:
                owners[task.owner] = owners.get(task.owner,0) + 1
        
        return {
                "total_tasks": total_tasks,
                 "completed_tasks": completed_tasks,
                 "pending_tasks": pending_tasks,
                 "high_priority_count": high_priority_count,
                 "completion_rate": completion_rate,
                 "owners": owners
        }


