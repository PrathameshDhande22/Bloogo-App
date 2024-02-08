from typing import Annotated
from fastapi import HTTPException, status, Security
from fastapi.security import APIKeyHeader
import jwt
from .utils import check_Expiry, decode_jwt
from .database import User

token = APIKeyHeader(
    name="Authorization",
    scheme_name="Authorization Header",
    description="Add the **access Token** and explore the rest of the api.",
    auto_error=False,
)


def verify_token(auth_token: Annotated[str, Security(token)]):
    if auth_token is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "message": "Authorization Header Not found",
                "help": "Add Authorization Header with an Valid Token",
            },
            headers={"Authorization": "Bearer Token"},
        )
    if "Bearer" not in auth_token:
        raise HTTPException(
            status.HTTP_403_FORBIDDEN,
            detail={"message": "Bearer is Missing from Authorization Header Value"},
            headers={"Authorization": "Bearer Token"},
        )

    try:
        decoded_jet = decode_jwt(auth_token.split(" ")[1])
        expiry_date = decoded_jet.get("expiry")
        if not check_Expiry(expiry_date):
            raise HTTPException(
                status.HTTP_403_FORBIDDEN,
                detail={
                    "message": "Token Expired",
                    "help": "Login Again to generate new Token.",
                },
            )
        user_data = User.objects(email=decoded_jet.get("email")).first()
        if user_data is None:
            raise HTTPException(
                status.HTTP_404_NOT_FOUND, detail="Unauthorization Access"
            )
        return (user_data.email, user_data.isverified, user_data.id)
    except IndexError as i:
        raise HTTPException(status.HTTP_406_NOT_ACCEPTABLE, detail="Invalid Token")
    except jwt.DecodeError as d:
        raise HTTPException(status.HTTP_406_NOT_ACCEPTABLE, detail="Invalid Token")
