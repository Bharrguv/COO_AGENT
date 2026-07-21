import time
from dataclasses import dataclass

import bcrypt
import jwt

from app.core.config import settings
from app.repositories.user_repository import create_user, get_user_by_email


@dataclass(frozen=True)
class AuthToken:
    access_token: str
    token_type: str = "bearer"


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")


def verify_password(password: str, password_hash: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), password_hash.encode("utf-8"))


def create_jwt_token(*, subject: str) -> str:
    now = int(time.time())

    payload = {
        "sub": subject,
        "iat": now,
        "exp": now + int(settings.JWT_ACCESS_TOKEN_EXPIRE_SECONDS),
    }

    return jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)


def signup(*, db_session, email: str, password: str) -> AuthToken:
    existing = get_user_by_email(db_session, email)
    if existing is not None:
        # Caller will translate to HTTPException.
        raise ValueError("email_already_registered")

    password_hash = hash_password(password)
    user = create_user(db_session, email=email, password_hash=password_hash)
    token = create_jwt_token(subject=str(user.id))
    return AuthToken(access_token=token)


def login(*, db_session, email: str, password: str) -> AuthToken:
    user = get_user_by_email(db_session, email)
    if user is None or not verify_password(password, user.password_hash):
        raise ValueError("invalid_credentials")

    token = create_jwt_token(subject=str(user.id))
    return AuthToken(access_token=token)

