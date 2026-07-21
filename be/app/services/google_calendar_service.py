import os
from dotenv import load_dotenv

from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

from app.models.google_token import GoogleToken

load_dotenv()

CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")


def get_calendar_service(token: GoogleToken):
    credentials = Credentials(
        token=token.access_token,
        refresh_token=token.refresh_token,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
    )

    # Refresh expired token automatically
    if credentials.expired and credentials.refresh_token:
        credentials.refresh(Request())

        token.access_token = credentials.token

    service = build(
        "calendar",
        "v3",
        credentials=credentials,
    )

    return service


def create_event(
    service,
    *,
    title,
    description,
    start_datetime,
    end_datetime,
):
    event = {
        "summary": title,
        "description": description,
        "start": {
            "dateTime": start_datetime,
            "timeZone": "Asia/Kolkata",
        },
        "end": {
            "dateTime": end_datetime,
            "timeZone": "Asia/Kolkata",
        },
    }

    created_event = (
        service.events()
        .insert(
            calendarId="primary",
            body=event,
        )
        .execute()
    )

    return created_event


def update_event(
    service,
    event_id,
    *,
    title,
    description,
    start_datetime,
    end_datetime,
):
    event = service.events().get(
        calendarId="primary",
        eventId=event_id,
    ).execute()

    event["summary"] = title
    event["description"] = description
    event["start"]["dateTime"] = start_datetime
    event["end"]["dateTime"] = end_datetime

    return (
        service.events()
        .update(
            calendarId="primary",
            eventId=event_id,
            body=event,
        )
        .execute()
    )


def delete_event(
    service,
    event_id,
):
    service.events().delete(
        calendarId="primary",
        eventId=event_id,
    ).execute()

    return True


def list_events(service):
    return (
        service.events()
        .list(calendarId="primary")
        .execute()
    )