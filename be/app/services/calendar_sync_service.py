from datetime import datetime, timedelta
from sqlalchemy.orm import Session

from app.models.task import Task
from app.services.google_calendar_service import get_calendar_service


def sync_tasks_to_calendar(
    db: Session,
    token,
    tasks: list[Task],
):
    """
    Sync COO tasks to Google Calendar.

    - Skips tasks already synced
    - Saves Google Event ID
    - Returns created events
    """

    service = get_calendar_service(token)

    created_events = []

    current_date = datetime.now().replace(
        hour=10,
        minute=0,
        second=0,
        microsecond=0,
    )

    for task in tasks:

        # Skip if already synced
        if task.google_event_id:
            current_date += timedelta(days=1)
            continue

        event = {
            "summary": task.title,
            "description": task.description or "",
            "start": {
                "dateTime": current_date.isoformat(),
                "timeZone": "Asia/Kolkata",
            },
            "end": {
                "dateTime": (
                    current_date + timedelta(hours=1)
                ).isoformat(),
                "timeZone": "Asia/Kolkata",
            },
        }

        created = (
            service.events()
            .insert(
                calendarId="primary",
                body=event,
            )
            .execute()
        )

        # Save Google Event ID
        task.google_event_id = created["id"]

        db.commit()
        db.refresh(task)

        created_events.append(created)

        current_date += timedelta(days=1)

    return created_events