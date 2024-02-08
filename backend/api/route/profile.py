import datetime
import json
from typing import Annotated
from fastapi import (
    APIRouter,
    BackgroundTasks,
    Depends,
    File,
    Path,
    Query,
    HTTPException,
    UploadFile,
    status,
    Form,
)
from pydantic import EmailStr
from ..database import Blog, User
from ..auth import verify_token
from ..models import AuthorList, AuthorProfile, General, ProfileModel, UserModel
from ..utils import (
    checkNone,
    deleteImage,
    deleteImages,
    hashed_password,
    upload_image,
    verify_password,
)
from mongoengine.errors import ValidationError
from mongoengine.queryset.visitor import Q

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
async def updateProfile(
    background: BackgroundTasks,
    firstname: Annotated[
        str,
        Form(description="First Name for the User", examples=["John"]),
    ],
    lastname: Annotated[
        str,
        Form(description="Last Name of the User", examples=["Kevlar"]),
    ],
    dob: Annotated[
        str,
        Form(description="User's Date of Birth", examples=["2003-04-22"]),
    ],
    udata: Annotated[tuple, Depends(verify_token)],
    image: Annotated[UploadFile | str, File(description="Profile Image")] = None,
):
    try:
        user_data = User.objects(id=udata[2]).first()
        first = checkNone(firstname, user_data.firstname)
        last = checkNone(lastname, user_data.lastname)
        public_id = user_data.profileurl
        if public_id != None:
            delete_id = public_id
            background.add_task(deleteImage, public_id=delete_id)
        if image != "null":
            public_id = await upload_image(image)
        user_data.update(
            set__firstname=first,
            set__lastname=last,
            set__dob=checkNone(dob, user_data.dob),
            set__profileurl=public_id,
        )

        if firstname is None:
            full_name = lastname
        elif lastname is None:
            full_name = firstname
        elif firstname is None and lastname is None:
            full_name = None
        else:
            full_name = first + " " + last
        Blog.objects(authorid=user_data.id).update(set__name=full_name)

        return {"message": "Profile Updated Successfully"}
    except Exception as e:
        print(e)
        return {"message": "Something went wrong"}
        pass


@profile.delete(
    "/profile",
    response_model=General,
    summary="Delete the User Profile",
    description="Deletes the user profile along with user related blogs.",
    response_description="Delete Success",
)
async def deleteUserProfile(
    background: BackgroundTasks, udata: Annotated[tuple, Depends(verify_token)]
):
    user_data = User.objects(id=udata[2]).first()
    blogs = Blog.objects(authorid=udata[2])
    list_of_publicid = []
    if blogs:
        for blog in blogs:
            thumbnailurl = json.loads(blog.to_json())["thumbnail"]
            if thumbnailurl != "null":
                list_of_publicid.append(thumbnailurl)
        blogs.delete()
    if len(list_of_publicid) != 0:
        background.add_task(deleteImages, public_id=list_of_publicid)
    if user_data.profileurl != None:
        background.add_task(deleteImage, public_id=user_data.profileurl)
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
    password: Annotated[
        str, Query(description="Password you want to change", example="johnny@12")
    ],
    email: Annotated[
        EmailStr,
        Query(
            description="Email of the user want to change password",
            example="johnny@gmail.com",
        ),
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


@profile.get(
    "/profile/{id}",
    response_model=AuthorProfile,
    summary="User Profile with Blogs",
    description="Retreving the user related blogs and user data.",
    response_description="Details of User with User created Blog.",
)
def getAuthorProfile(
    id: Annotated[
        str,
        Path(
            description="Id of the user for retrieving the user data and user published Blogs.",
            example="4dhjfjh30apaid",
        ),
    ]
):
    try:
        data = json.loads(User.objects(id=id).exclude("id").first().to_json())
        data["createdon"] = datetime.datetime.utcfromtimestamp(
            data["createdon"]["$date"] / 1000
        ).strftime("%Y-%m-%d")
        try:
            data["dob"] = datetime.datetime.utcfromtimestamp(
                data["dob"]["$date"] / 1000
            ).strftime("%Y-%m-%d")
        except KeyError as ke:
            pass
        if data is None:
            raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Profile Not Found")
        blogs = Blog.objects(authorid=id).order_by("createdon")
        author_blogs = json.loads(blogs.to_json())
        for blogi in author_blogs:
            blogi["createdon"] = datetime.datetime.utcfromtimestamp(
                blogi["createdon"]["$date"] / 1000
            )
            blogi["id"] = blogi["_id"]["$oid"]
            blogi["authorid"] = blogi["authorid"]["$oid"]
        return {
            "profile": data,
            "blogs": {"Total_Blogs": len(author_blogs), "blogs": author_blogs},
        }
    except ValidationError as v:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Profile Not Found")


@profile.get(
    "/search",
    response_model=AuthorList,
    description="Searches the Author according to his firstname or lastname",
    summary="Search Authors",
    response_description="List of Authors",
)
def searchProfiles(
    q: Annotated[str, Query(description="Author Name to Search", example="prathamesh")]
):
    query = Q(firstname__iregex=q) | Q(lastname__iregex=q)
    authors = json.loads(User.objects.filter(query).to_json())
    for blogi in authors:
        blogi["createdon"] = datetime.datetime.utcfromtimestamp(
            blogi["createdon"]["$date"] / 1000
        )
        blogi["id"] = blogi["_id"]["$oid"]
        try:
            blogi["dob"] = datetime.datetime.utcfromtimestamp(
                blogi["dob"]["$date"] / 1000
            ).strftime("%Y-%m-%d")
        except KeyError as e:
            pass
    return {"total": len(authors), "authors": authors}
