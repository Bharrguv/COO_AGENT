import json

from app.core.logger import logger
from app.models.plan import Plan


def save_plan(db, goal, plan, user_id):
    db_plan = Plan(
        goal=goal,
        plan_json=json.dumps(plan),
        user_id=user_id,
    )

    db.add(db_plan)
    db.commit()
    db.refresh(db_plan)

    logger.info(
        "DB write: plan created",
        extra={
            "plan_id": db_plan.id,
            "goal": goal,
        },
    )

    return db_plan



# Get all plans

def get_all_plans(db, user_id):
    plans = (
    db.query(Plan)
    .filter(Plan.user_id == user_id)
    .all()
)

    result = []

    for plan in plans:
        result.append(
            {
                "id": plan.id,
                "goal": plan.goal,
                "plan_json": json.loads(plan.plan_json),
            }
        )

    return result



# Get raw SQLAlchemy object

def get_plan_by_id(db, plan_id):
    return (
        db.query(Plan)
        .filter(Plan.id == plan_id)
        .first()
    )



# Get parsed plan

def get_plan_response(db, plan_id):
    plan = get_plan_by_id(db, plan_id)

    if not plan:
        return None

    return {
        "id": plan.id,
        "goal": plan.goal,
        "plan_json": json.loads(plan.plan_json),
    }



# Approve plan

def approve_plan(db, plan_id):
    plan = get_plan_by_id(db, plan_id)

    if not plan:
        return None

    plan.approved = True

    db.commit()
    db.refresh(plan)

    logger.info(
        "DB write: plan approved",
        extra={
            "plan_id": plan_id,
        },
    )

    return {
        "id": plan.id,
        "goal": plan.goal,
        "plan_json": json.loads(plan.plan_json),
    }