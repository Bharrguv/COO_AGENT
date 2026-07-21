from sqlalchemy.orm import Session
from app.models.task import Task


from app.core.logger import logger


def save_task(
    db: Session,
    plan_id: int,
    title: str,
    description: str,
    priority: str,
    owner: str,
):
    task = Task(
        plan_id=plan_id,
        title=title,
        description=description,
        priority=priority,
        owner=owner,
    )

    db.add(task)
    db.commit()
    db.refresh(task)
    logger.info(
        "DB write: task created",
        extra={"task_id": task.id, "plan_id": plan_id, "owner": owner},
    )

    return task


def save_tasks(
    db: Session,
    plan_id: int,
    projects: list,
    assignments: list,
):
    owner_lookup = {
        item["task"]: item["owner"]
        for item in assignments
    }

    created_tasks = []

    for project in projects:
        for task in project["tasks"]:
            created_task = save_task(
                db=db,
                plan_id=plan_id,
                title=task["title"],
                description=task["description"],
                priority=task["priority"],
                owner=owner_lookup.get(
                    task["title"],
                    "Founder"
                ),
            )

            created_tasks.append(created_task)

    return created_tasks


def get_all_tasks(db: Session):
    return db.query(Task).all()


def get_task_by_id(
    db: Session,
    task_id: int,
):
    return (
        db.query(Task)
        .filter(Task.id == task_id)
        .first()
    )


def update_task_status(
    db: Session,
    task_id: int,
    completed: bool,
):
    task = get_task_by_id(db, task_id)

    if task is None:
        return None

    task.completed = completed

    db.commit()
    db.refresh(task)
    logger.info(
        "DB write: task status updated",
        extra={"task_id": task.id, "completed": completed},
    )

    return task


def update_task_owner(
    db: Session,
    task_id: int,
    owner: str,
):
    task = get_task_by_id(db, task_id)

    if task is None:
        return None

    task.owner = owner

    db.commit()
    db.refresh(task)
    logger.info(
        "DB write: task owner updated",
        extra={"task_id": task.id, "owner": owner},
    )

    return task


def delete_task(
    db: Session,
    task_id: int,
):
    task = get_task_by_id(db, task_id)

    if task is None:
        return False

    db.delete(task)
    db.commit()
    logger.info(
        "DB write: task deleted",
        extra={"task_id": task_id},
    )

    return True

def completed_tasks(db: Session):
    return (
        db.query(Task)
        .filter(Task.completed == True)
        .count()
    )

def get_tasks_by_plan(db: Session, plan_id: int):
    return (
        db.query(Task)
        .filter(Task.plan_id == plan_id)
        .all()
    )

def update_google_event(
    db: Session,
    task: Task,
    event_id: str,
):
    task.google_event_id = event_id

    db.commit()

    db.refresh(task)

    return task