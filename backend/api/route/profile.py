import datetime
import json
from typing import Annotated
from fastapi import APIRouter, Depends, Query, HTTPException, status, Form
from pydantic import EmailStr
from ..database import Blog, User
from ..auth import verify_token
from ..models import General, ProfileModel, UserModel
from ..utils import checkNone, hashed_password, verify_password


profile = APIRouter(prefix="/api/user", tags=["User Profile"])


@profile.get(
    "/profile",
    response_model=ProfileModel,
    summary="User Profile",
    description="Details of the user.",
    response_description="User Profile",
)
def getUserProfile(udata: Annotated[tuple, Depends(verify_token)]):
    user_data = json.loads(User.objects(email=udata[0]).exclude("id").first().to_json())
    user_data["createdon"] = datetime.datetime.utcfromtimestamp(
        user_data["createdon"]["$date"] / 1000
    ).strftime("%Y-%m-%d")
    try:
        user_data["dob"] = datetime.datetime.utcfromtimestamp(
            user_data["dob"]["$date"] / 1000
        ).strftime("%Y-%m-%d")
    except KeyError as ke:
        pass
    return user_data


@profile.put(
    "/profile",
    response_model=General,
    summary="Update the User profile",
    description="Update the remaining fields which are remaining to be filled.",
    response_description="Updated Successfully.",
)
def updateProfile(usermodel: UserModel, udata: Annotated[tuple, Depends(verify_token)]):
    user_data = User.objects(id=udata[2]).first()
    user_data.update(
        set__firstname=checkNone(usermodel.firstname, user_data.firstname),
        set__lastname=checkNone(usermodel.lastname, user_data.lastname),
        set__dob=checkNone(usermodel.dob, user_data.dob),
        set__profileurl=checkNone(usermodel.profileurl, user_data.profileurl),
    )
    return {"message": "Profile Updated Successfully"}


@profile.delete(
    "/profile",
    response_model=General,
    summary="Delete the User Profile",
    description="Deletes the user profile along with user related blogs.",
    response_description="Delete Success",
)
def deleteUserProfile(udata: Annotated[tuple, Depends(verify_token)]):
    user_data = User.objects(id=udata[2]).first()
    blogs = Blog.objects(authorid=udata[2])
    if blogs:
        blogs.delete()
    user_data.delete()
    return {"message": "User Deleted Successfully"}


@profile.put(
    "/forgot",
    response_model=General,
    summary="Forgot Password",
    description="If user forgots the password use by entering the email and change your password",
    response_description="Password Changed Successfully",
)
def forgotPassword(
    password: Annotated[str, Query(description="Password you want to change", example="johnny@12")],
    email: Annotated[
        EmailStr,
        Query(description="Email of the user want to change password", example="johnny@gmail.com"),
    ],
):
    user_data = User.objects(email=email).first()
    if user_data is not None:
        hash_passw = hashed_password(password)
        user_data.password = hash_passw
        user_data.save()
        return {"message": "Password Changed Successfully."}
    raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Email Id Doesn't Exists.")


@profile.put(
    "/change",
    response_model=General,
    summary="Change the Password",
    description="Change the password by using the current password and new password. Both password should not be same.",
    response_description="Password Changed Successfully",
)
def changePassword(
    password: Annotated[str, Form(description="New Password", example="newJohn@gm")],
    current: Annotated[str, Form(description="Current Password", example="johnny@12")],
    udata: Annotated[tuple, Depends(verify_token)],
):
    if password == current:
        raise HTTPException(status.HTTP_406_NOT_ACCEPTABLE, detail="Same password")
    user_data = User.objects(id=udata[2]).first()
    if verify_password(current, user_data.password):
        hash_pass = hashed_password(password)
        user_data.password = hash_pass
        user_data.save()
        return {"message": "Password Changed Successfully"}
    raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Password not Matched")
