from typing import Annotated
from fastapi import APIRouter, Path, Depends, HTTPException, status
from ..auth import verify_token
from ..database import Tags
from ..models import General, TagsList

tag = APIRouter(prefix="/api", tags=["Blog Tags"])


@tag.post("/tag/{name}", response_model=General)
def addTag(name: Annotated[str, Path()], udata: Annotated[tuple, Depends(verify_token)]):
    tags_data = Tags.objects(name=name).first()
    if tags_data is not None:
        raise HTTPException(status.HTTP_403_FORBIDDEN, detail=f"{name} Tag Already Present")
    Tags(name=name).save()
    return {"message": f"Tag {name} added Successfully"}


@tag.get("/tags", response_model=TagsList)
def viewTag():
    tags_data = list(Tags.objects().exclude("id").scalar("name"))
    return {"tags": tags_data, "total_tags": len(tags_data)}
