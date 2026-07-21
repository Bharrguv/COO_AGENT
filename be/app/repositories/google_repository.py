from sqlalchemy.orm import Session

from app.models.google_token import GoogleToken


def get_google_token(
    db: Session,
    user_id: str,
):
    return (
        db.query(GoogleToken)
        .filter(GoogleToken.user_id == user_id)
        .first()
    )


def save_google_token(
    db: Session,
    user_id: str,
    access_token: str,
    refresh_token: str,
    expiry: str,
):
    token = get_google_token(db, user_id)

    if token:

        token.access_token = access_token

        if refresh_token:
            token.refresh_token = refresh_token

        token.expiry = expiry

    else:

        token = GoogleToken(
            user_id=user_id,
            access_token=access_token,
            refresh_token=refresh_token,
            expiry=expiry,
        )

        db.add(token)

    db.commit()
    db.refresh(token)

    return token