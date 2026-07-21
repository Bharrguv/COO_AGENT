from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.config import settings
from app.db.dependencies import get_db
from app.schemas.auth import LoginRequest, SignupRequest, TokenResponse
from app.services.auth_service import AuthToken, login, signup

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/signup", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def signup_endpoint(
    request: SignupRequest,
    db: Session = Depends(get_db),
):
    try:
        token: AuthToken = signup(db_session=db, email=request.email, password=request.password)
    except ValueError as exc:
        if str(exc) == "email_already_registered":
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")
        raise

    return TokenResponse(access_token=token.access_token)


@router.post("/login", response_model=TokenResponse)
def login_endpoint(
    request: LoginRequest,
    db: Session = Depends(get_db),
):
    try:
        token: AuthToken = login(db_session=db, email=request.email, password=request.password)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    return TokenResponse(access_token=token.access_token)

