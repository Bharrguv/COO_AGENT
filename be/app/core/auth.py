import os
from functools import lru_cache
import traceback

import httpx
import jwt

from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

security = HTTPBearer()

CLERK_JWKS_URL = os.getenv("CLERK_JWKS_URL")



def get_jwks():
    response = httpx.get(CLERK_JWKS_URL, timeout=10)
    response.raise_for_status()
    return response.json()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Security(security),
):
    token = credentials.credentials

    if not token:
        raise HTTPException(
            status_code=401,
            detail="Missing token",
        )

    try:
        jwks = get_jwks()

        header = jwt.get_unverified_header(token)

        kid = header["kid"]

        key = None

        for jwk in jwks["keys"]:
            if jwk["kid"] == kid:
                key = jwt.algorithms.RSAAlgorithm.from_jwk(jwk)
                break

        if key is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid signing key",
            )

        payload = jwt.decode(
            token,
            key=key,
            algorithms=["RS256"],
            issuer="https://exact-jaybird-98.clerk.accounts.dev",
            options={
                "verify_aud": False,
            },
        )

        return {
            "user_id": payload["sub"],
        }

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=401,
            detail="Token expired",
        )

    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token",
        )

    

    except Exception as e:
        traceback.print_exc()

        raise HTTPException(
            status_code=401,
            detail=str(e),
    )