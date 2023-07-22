import datetime
import json
import re
from typing import Annotated
from fastapi import APIRouter, Depends, Form, HTTPException, Path, Query, status
from mongoengine.errors import ValidationError
from mongoengine.queryset.visitor import Q
from ..auth import verify_token
from ..database import Blog, User
from ..models import BlogData, BlogModel, General, Sort

blog = APIRouter(prefix="/api", tags=["Blogs"])


def formdata(
    content: Annotated[str, Form(description="Blog Content in HTML")],
    title: Annotated[str, Form(description="Blog Title")],
    tag: Annotated[str, Form(description="Blog Tag")],
    thumbnail: Annotated[str, Form(description="Blog Thumbnail URL")],
):
    return {"title": title, "tag": tag, "thumbnail": thumbnail, "content": content}


@blog.post(
    "/blog/new",
    response_model=General,
    summary="Create New Blog",
    description="Create new Blog and publish it.",
    response_description="Blog Added Successfully",
)
def createNewBlog(
    formd: Annotated[dict, Depends(formdata)],
    udata: Annotated[tuple, Depends(verify_token)],
):
    user_data = User.objects(id=udata[2]).first()
    if not user_data.isverified:
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED,
            detail={
                "message": "Email is Unverified to add the new blog you need to verify your email",
                "help": "use send endpoint to get verification code and verify.",
            },
        )
    try:
        full_name = user_data.firstname + " " + user_data.lastname
    except TypeError as ae:
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED,
            detail={
                "message": "First Complete your Profile",
                "help": "use profile update endpoint to update your profile.",
            },
        )

    try:
        Blog(
            title=formd["title"],
            content=formd["content"],
            tag=formd["tag"],
            thumbnail=formd["thumbnail"],
            createdby=user_data.email,
            name=full_name,
            authorid=user_data.id,
        ).save()
        return {"message": "Blog Added Successfully"}
    except ValidationError as e:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Invalid Thumbnail URL")


@blog.get(
    "/blogs",
    response_model=BlogData,
    summary="View all Blogs",
    description="View all blogs or filter the blogs to view",
    response_description="List of blogs",
)
def viewAllBlog(
    tag: Annotated[str, Query()] = None,
    author: Annotated[str, Query()] = None,
    sort: Annotated[Sort, Query()] = None,
    q: Annotated[str, Query()] = None,
):
    query = Q()

    if author:
        query &= Q(name__regex=re.compile(author, re.IGNORECASE))
    if tag:
        query &= Q(tag__regex=re.compile(tag, re.IGNORECASE))
    if q:
        query &= Q(title__regex=re.compile(q, re.IGNORECASE))
    if sort == Sort.NEWEST.value:
        blogs = Blog.objects(query).order_by("-createdon").to_json()
    elif sort == Sort.OLDEST.value:
        blogs = Blog.objects(query).order_by("createdon").to_json()
    else:
        blogs = Blog.objects(query).to_json()
    blogs = json.loads(blogs)
    for blogi in blogs:
        blogi["createdon"] = datetime.datetime.utcfromtimestamp(
            blogi["createdon"]["$date"] / 1000
        ).strftime("%Y-%m-%d")
        blogi["id"] = blogi["_id"]["$oid"]
        blogi["authorid"] = blogi["authorid"]["$oid"]
    return {"Total_Blogs": len(blogs), "blogs": blogs}


@blog.get(
    "/blog/{id}",
    response_model=BlogModel,
    summary="View Specific Blog",
    description="View the Specific Blog using the blog unique ID.",
    response_description="Blog",
)
def getBlogById(id: Annotated[str, Path(description="Blog Unique ID", example="deiyrwujdsa")]):
    try:
        blog_data = Blog.objects(id=id).first()
        if blog_data is None:
            raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Blog Doesn't Exists")
        blog_data = json.loads(blog_data.to_json())
        blog_data["id"] = blog_data["_id"]["$oid"]
        blog_data["createdon"] = datetime.datetime.utcfromtimestamp(
            blog_data["createdon"]["$date"] / 1000
        ).strftime("%Y-%m-%d")
        blog_data["authorid"] = blog_data["authorid"]["$oid"]
        return blog_data
    except ValidationError as v:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Blog Doesn't Exists")


@blog.put(
    "/blog/{id}",
    response_model=General,
    summary="Update Blog",
    description="Update the blog",
    response_description="Blog Updated Successfully.",
)
def updateBlog(
    blog_data_form: Annotated[dict, Depends(formdata)],
    udata: Annotated[tuple, Depends(verify_token)],
    id: Annotated[str, Path(description="Blog Unique ID", example="deiyrwujdsa")],
):
    try:
        blog_data = Blog.objects(id=id).first()
        if blog_data is None:
            raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Blog Doesn't Exists")
        if blog_data.authorid != udata[2]:
            raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail="You cannot edit this blog")
        blog_data.update(
            set__title=blog_data_form["title"],
            set__content=blog_data_form["content"],
            set__thumbnail=blog_data_form["thumbnail"],
            set__tag=blog_data_form["tag"],
        )
        return {"message": "Blog Updated Successfully"}
    except ValidationError as ve:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Blog Doesn't Exists")


@blog.delete(
    "/blog/{id}",
    response_model=General,
    summary="Delete Blog",
    description="Delete a particular Blog. Blog can be deleted by the owner of the blog who has created.",
    response_description="Blog Updated Successfully",
)
def deleteblog(
    udata: Annotated[tuple, Depends(verify_token)],
    id: Annotated[str, Path(description="Blog Unique ID", example="deiyrwujdsa")],
):
    try:
        blog_data = Blog.objects(id=id).first()
        if blog_data is None:
            raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Blog Doesn't Exists")
        if blog_data.authorid != udata[2]:
            raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail="You cannot delete this blog")
        blog_data.delete()
        return {"message": "Blog deleted Successfully"}
    except ValidationError as ve:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Blog Doesn't Exists")


@blog.get(
    "/blogs/user",
    response_model=BlogData,
    summary="User added Blogs",
    description="List of all the blogs which was created by user.",
    response_description="List of Blog",
)
def getBlogsUser(udata: Annotated[tuple, Depends(verify_token)]):
    blog_data = Blog.objects(authorid=udata[2]).order_by("createdon")
    blogs = json.loads(blog_data.to_json())
    for blogi in blogs:
        blogi["createdon"] = datetime.datetime.utcfromtimestamp(
            blogi["createdon"]["$date"] / 1000
        ).strftime("%Y-%m-%d")
        blogi["id"] = blogi["_id"]["$oid"]
        blogi["authorid"] = blogi["authorid"]["$oid"]
    return {"Total_Blogs": len(blogs), "blogs": blogs}
