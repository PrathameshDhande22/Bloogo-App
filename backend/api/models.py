from datetime import date
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from enum import Enum


class Sort(str, Enum):
    NEWEST = "newest"
    OLDEST = "oldest"


class TagsList(BaseModel):
    total_tags: int = Field(examples=[12], description="Total Number of Tags")
    tags: list[str] = Field(examples=[["c++", "python"]], description="All tags in a List")


class Token(BaseModel):
    message: str = Field(description="Login Success", examples=["Login Success"])
    Access_Token: str = Field(description="JWT Access Token", examples=["dfdksksfd jflkddfs"])


class General(BaseModel):
    message: str = Field(description="Used to show any general message", examples=["Success"])


class HelpMessage(General):
    help: str = Field(
        description="Used to Show any Help Message", examples=["use login to get Access"]
    )


class BlogModel(BaseModel):
    id: str = Field(description="An Unique id of an Blog", examples=["dfer993nbnaie"])
    title: str = Field(description="Blog Title", examples=["How to maximize Fast API"])
    thumbnail: str = Field(
        description="Blog Thumbnail URL", examples=["https://www.giphy.com/defualt.png"]
    )
    content: str = Field(description="An Blog Content in HTML Format")
    createdon: datetime = Field(description="Blog created Date", default=datetime.now())
    tag: str = Field(description="Tag name for the Blog", examples=["Python"])
    name: str = Field(description="Author Name which added the blog", examples=["John Kevlar"])
    authorid: str = Field(description="Author id")


class BlogData(BaseModel):
    Total_Blogs: int = Field(description="Total number of Blogs", examples=[6])
    blogs: list[BlogModel] = Field(description="List of Blogs")


class RegisterModel(BaseModel):
    email: EmailStr = Field(description="Email to register the User", examples=["user@gmail.com"])
    password: str = Field(description="Password", examples=["johnny@12"])
    isgooglelogin: bool = False
    isverified: bool = False
    createdon: date = datetime.now().date()


class UserModel(BaseModel):
    firstname: str = Field(description="First Name for the User", examples=["John"], default=None)
    lastname: str = Field(description="Last Name of the User", examples=["Kevlar"], default=None)
    dob: date = Field(description="User's Date of Birth", examples=["2003-04-22"], default=None)
    profileurl: str = Field(
        description="Profile picture url of the User",
        examples=["https://www.facebook.com/mother.png"],
        default=None,
    )


class ProfileModel(BaseModel):
    email: EmailStr = Field(description="Email to register the User", examples=["user@gmail.com"])
    isgooglelogin: bool = False
    isverified: bool = False
    createdon: date
    firstname: str = Field(description="First Name for the User", examples=["John"], default=None)
    lastname: str = Field(description="Last Name of the User", examples=["Kevlar"], default=None)
    dob: date = Field(description="User's Date of Birth", examples=["2003-04-22"], default=None)
    profileurl: str = Field(
        description="Profile picture url of the User",
        examples=["https://www.facebook.com/mother.png"],
        default=None,
    )


class AuthorModel(ProfileModel):
    id: str = Field(description="ID of an Author", examples=["dhffkdhjse"])


class AuthorList(BaseModel):
    total: int = Field(description="Total Author List", examples=[3])
    authors: list[AuthorModel]


class AuthorProfile(BaseModel):
    profile: ProfileModel
    blogs: BlogData
