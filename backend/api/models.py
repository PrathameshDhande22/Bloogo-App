from datetime import date
from bson import ObjectId
from pydantic import BaseModel, EmailStr
from datetime import datetime
from enum import Enum


class Sort(str, Enum):
    NEWEST = "newest"
    OLDEST = "oldest"


class TagsList(BaseModel):
    total_tags: int
    tags: list[str]


class Token(BaseModel):
    message: str
    Access_Token: str


class General(BaseModel):
    message: str


class HelpMessage(General):
    help: str


class BlogModel(BaseModel):
    id: str
    title: str
    thumbnail: str
    content: str
    createdon: date = datetime.today()
    tag: str
    name: str
    authorid: str


class BlogData(BaseModel):
    Total_Blogs: int
    blogs: list[BlogModel]


class RegisterModel(BaseModel):
    email: EmailStr
    password: str
    isgooglelogin: bool = False
    isverified: bool = False
    createdon: date = datetime.today().date()


class UserModel(BaseModel):
    firstname: str = None
    lastname: str = None
    dob: date = None
    profileurl: str = None


class ProfileModel(BaseModel):
    email: EmailStr
    isgooglelogin: bool = False
    isverified: bool = False
    createdon: date
    firstname: str = None
    lastname: str = None
    dob: date = None
    profileurl: str = None
