import logging
from typing import Any

from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import ValidationError
from sqlalchemy.exc import SQLAlchemyError

from app.core.logger import logger


def _error_response(message: str, details: Any = None, status_code: int = 400) -> JSONResponse:
    payload: dict[str, Any] = {
        "success": False,
        "message": message,
        "details": details,
    }
    return JSONResponse(status_code=status_code, content=payload)


def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(ValidationError)
    async def pydantic_validation_error_handler(request: Request, exc: ValidationError):
        logger.info("ValidationError", extra={"path": str(request.url), "errors": exc.errors()})
        return _error_response(
            message="Validation error",
            details=exc.errors(),
            status_code=422,
        )

    @app.exception_handler(RequestValidationError)
    async def fastapi_request_validation_error_handler(request: Request, exc: RequestValidationError):
        logger.info(
            "RequestValidationError",
            extra={"path": str(request.url), "errors": exc.errors()},
        )
        return _error_response(
            message="Request validation error",
            details=exc.errors(),
            status_code=422,
        )

    @app.exception_handler(HTTPException)
    async def http_exception_handler(request: Request, exc: HTTPException):
        # Avoid leaking internal details.
        return _error_response(
            message=str(exc.detail) if exc.detail else "HTTP error",
            details=None,
            status_code=exc.status_code,
        )

    @app.exception_handler(SQLAlchemyError)
    async def sqlalchemy_error_handler(request: Request, exc: SQLAlchemyError):
        logger.exception("Database error")
        return _error_response(
            message="Database error",
            details=None,
            status_code=500,
        )

    @app.exception_handler(Exception)
    async def unhandled_exception_handler(request: Request, exc: Exception):
        # Never expose stack traces.
        logger.exception("Unhandled exception")
        return _error_response(
            message="Internal server error",
            details=None,
            status_code=500,
        )

