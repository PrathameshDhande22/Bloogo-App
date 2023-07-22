from typing import Annotated
from fastapi import APIRouter, Path, Depends, HTTPException, status
from ..auth import verify_token
from ..database import Tags
from ..models import General, TagsList

tag = APIRouter(prefix="/api", tags=["Blog Tags"])


@tag.post(
    "/tag/{name}",
    response_model=General,
    summary="Add the Tag Name",
    description="Adds the tag name which can be used with blog",
    response_description="Tag Added Successfully",
)
def addTag(
    name: Annotated[str, Path(description="Tag Name which want to add", example="Java")],
    udata: Annotated[tuple, Depends(verify_token)],
):
    tags_data = Tags.objects(name=name).first()
    if tags_data is not None:
        raise HTTPException(status.HTTP_403_FORBIDDEN, detail=f"{name} Tag Already Present")
    Tags(name=name).save()
    return {"message": f"Tag {name} added Successfully"}


@tag.get(
    "/tags",
    response_model=TagsList,
    summary="List of All tags",
    description="Tag list which can be used with blog",
    response_description="List of Tags",
)
def viewTag():
    tags_data = list(Tags.objects().exclude("id").scalar("name"))
    return {"tags": tags_data, "total_tags": len(tags_data)}
