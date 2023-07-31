from typing import Annotated
from fastapi import APIRouter, BackgroundTasks, Path, Depends, Form, HTTPException, status
from pydantic import EmailStr
from ..auth import verify_token
from ..database import User
from ..models import General, HelpMessage, RegisterModel, Token
from ..utils import get_access_token, hashed_password, verify_password, getHash
from ..emailsend import send_email


user = APIRouter(prefix="/api/auth", tags=["Authentication"])


@user.post(
    "/register",
    summary="Register User",
    description="Registering a User to use the blog api",
    response_model=HelpMessage,
    responses={
        200: {"description": "User Registered"},
        422: {
            "description": "One or more Fields are Wrong.",
        },
    },
)
async def registeruser(register: RegisterModel):
    already_data = User.objects(email=register.email).first()
    if already_data is not None:
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail={"message": f"{register.email} Already Exists"},
        )
    register.password = hashed_password(register.password)
    User(**register.model_dump()).save()
    return {"message": "User Registered", "help": "login To get access Token"}


@user.post(
    "/login",
    response_model=Token,
    summary="Login to get Access Token",
    response_description="Login Success",
)
async def loginUser(
    email: Annotated[
        EmailStr,
        Form(description="Email Required to get the access Token", example="john@gmail.com"),
    ],
    password: Annotated[str, Form(description="Password Required to login", example="johnny@12")],
):
    """Login for access token using you can add blog, update profile and various actions."""
    user_data = User.objects(email=email).first()
    if user_data is None:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND, detail={"message": f"{email} Doesn't Exists"}
        )
    if not verify_password(password, user_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail={"message": "Invalid Password"}
        )
    return {"message": "Login Success", "Access_Token": get_access_token(email)}


# TODO : Create the Google Login using Google Authlib


@user.post(
    "/send",
    response_model=General,
    summary="Send Verification Mail",
    description="Used to send the verification mail to the login or registered user to verify the email i.e it belongs to user only.",
    response_description="Verification Mail Sent",
)
def sendVerificationMail(
    udata: Annotated[tuple, Depends(verify_token)], background: BackgroundTasks
):
    if udata[1]:
        raise HTTPException(status.HTTP_403_FORBIDDEN, detail="Your Email is Already Verified")
    hashed = getHash()
    User.objects(email=udata[0]).update(set__verification=hashed)
    background.add_task(send_email, token=hashed, email=udata[0])
    return {"message": "Verification Mail Sent."}


@user.get(
    "/verify/{token}",
    response_model=General,
    summary="Verify Email",
    description="Verify your email by passing the verification code which was sent by email.",
    response_description="Email Verified",
)
def verifyUser(
    token: Annotated[
        str, Path(description="An Email Send Verification Code", example="oerueikcvnsahut")
    ]
):
    user_token_data = User.objects(verification=token).first()
    if user_token_data is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Invalid verification Code")
    user_token_data.update(set__isverified=True, set__verification=None)
    return {"message": "User Verified Successfully"}


@user.get(
    "/authenticate",
    response_model=General,
    summary="Authenticate Login User",
    description="Used to verify that the access token belongs to current user only.",
    response_description="Authenticated User.",
)
def authenticateuser(udata: Annotated[dict, Depends(verify_token)]):
    return {"message": "Authenticated"}
