from fastapi import FastAPI
import os
from app.db.database import Base, engine
from app.api.routes import router
from app.api.task_routes import router as task_router
from app.api.dashboard_routes import router as dashboard_router
from app.core.exceptions import register_exception_handlers
from app.services.scheduler import scheduler
from fastapi.middleware.cors import CORSMiddleware
from app.api.chat import router as chat_router
from app.models.google_token import GoogleToken

app = FastAPI(
    title="COO Agent",
    version="1.0.0",
)

FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_exception_handlers(app)

if not scheduler.running:
    scheduler.start()

from time import time
from app.api.google import router as google_router
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start = time()
        response = None
        try:
            response = await call_next(request)
            return response
        finally:
            elapsed_ms = int((time() - start) * 1000)
            status_code = getattr(response, "status_code", None)
            from app.core.logger import logger

            logger.info(
                "API request",
                extra={
                    "method": request.method,
                    "path": request.url.path,
                    "status_code": status_code,
                    "elapsed_ms": elapsed_ms,
                },
            )


app.add_middleware(RequestLoggingMiddleware)


# Create database tables
# Base.metadata.create_all(bind=engine)

# Register routes
app.include_router(router)
app.include_router(task_router)
app.include_router(dashboard_router)

# Auth + private routes
from app.api.auth_routes import router as auth_router
from app.api.private_routes import router as private_router

app.include_router(auth_router)
app.include_router(private_router)


app.include_router(chat_router)
app.include_router(google_router)
