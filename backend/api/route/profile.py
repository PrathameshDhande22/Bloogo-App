import datetime
import json
from typing import Annotated
from fastapi import APIRouter, Depends
from ..database import Blog, User
from ..auth import verify_token
from ..models import General, ProfileModel, UserModel
from ..utils import checkNone


profile = APIRouter(prefix="/api/user", tags=["User Profile"])


@profile.get("/profile", response_model=ProfileModel)
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


@profile.put("/profile", response_model=General)
def updateProfile(usermodel: UserModel, udata: Annotated[tuple, Depends(verify_token)]):
    user_data = User.objects(id=udata[2]).first()
    user_data.update(
        set__firstname=checkNone(usermodel.firstname, user_data.firstname),
        set__lastname=checkNone(usermodel.lastname, user_data.lastname),
        set__dob=checkNone(usermodel.dob, user_data.dob),
        set__profileurl=checkNone(usermodel.profileurl, user_data.profileurl),
    )
    return {"message": "Profile Updated Successfully"}


@profile.delete("/profile")
def deleteUserProfile(udata: Annotated[tuple, Depends(verify_token)]):
    user_data = User.objects(id=udata[2]).first()
    blogs = Blog.objects(authorid=udata[2])
    if blogs:
        blogs.delete()
    user_data.delete()
    return {"message": "User Deleted Successfully"}
