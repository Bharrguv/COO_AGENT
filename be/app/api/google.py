import os

from dotenv import load_dotenv

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from fastapi.responses import RedirectResponse

from google_auth_oauthlib.flow import Flow

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.repositories.google_repository import (
    get_google_token,
    save_google_token,
)

from app.repositories.task_repository import (
    get_tasks_by_plan,
)

from app.services.calendar_sync_service import (
    sync_tasks_to_calendar,
)

from app.services.google_calendar_service import (
    get_calendar_service,
)

from app.services.oauth_store import flows

load_dotenv()

router = APIRouter(
    prefix="/api/google",
    tags=["Google Calendar"],
)

CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI")

SCOPES = [
    "https://www.googleapis.com/auth/calendar",
]


def create_flow():
    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
            }
        },
        scopes=SCOPES,
    )

    flow.redirect_uri = GOOGLE_REDIRECT_URI

    return flow


@router.get("/login")
async def google_login():
    flow = create_flow()

    authorization_url, state = flow.authorization_url(
        access_type="offline",
        include_granted_scopes="true",
        prompt="consent",
    )

    flows[state] = flow

    return RedirectResponse(authorization_url)


@router.get("/callback")
async def google_callback(
    code: str,
    state: str,
    user_id: str,
    db: Session = Depends(get_db),
):
    try:
        flow = flows.pop(state, None)

        if flow is None:
            raise HTTPException(
                status_code=400,
                detail="OAuth session expired. Please login again.",
            )

        flow.fetch_token(code=code)

        credentials = flow.credentials

        save_google_token(
            db=db,
            user_id=user_id,
            access_token=credentials.token,
            refresh_token=credentials.refresh_token,
            expiry=str(credentials.expiry),
        )

        return {
            "success": True,
            "message": "Google Calendar connected successfully.",
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.post("/sync/{plan_id}")
async def sync_plan(
    plan_id: int,
    user_id: str,
    db: Session = Depends(get_db),
):
    token = get_google_token(
        db=db,
        user_id=user_id,
    )

    if token is None:
        raise HTTPException(
            status_code=404,
            detail="Google account not connected.",
        )

    tasks = get_tasks_by_plan(
        db=db,
        plan_id=plan_id,
    )

    if not tasks:
        raise HTTPException(
            status_code=404,
            detail="No tasks found for this plan.",
        )

    events = sync_tasks_to_calendar(
        db=db,
        token=token,
        tasks=tasks,
    )

    return {
        "success": True,
        "events_created": len(events),
        "events": events,
    }


@router.get("/test-event")
async def test_event(
    user_id: str,
    db: Session = Depends(get_db),
):
    token = get_google_token(
        db=db,
        user_id=user_id,
    )

    if token is None:
        raise HTTPException(
            status_code=404,
            detail="Google account not connected.",
        )

    service = get_calendar_service(token)

    event = {
        "summary": "AI COO Test Event",
        "description": "Created from Startup COO Agent",
        "start": {
            "dateTime": "2026-07-20T10:00:00+05:30",
            "timeZone": "Asia/Kolkata",
        },
        "end": {
            "dateTime": "2026-07-20T11:00:00+05:30",
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

    return created