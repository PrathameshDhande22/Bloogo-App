import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mongoengine import connect
from .route import user, tag, profile, blog
from .models import General

description = """
<b>Bloogo API which is the REST api and serves for the particular application to view </b>

<a href="link">Click here</a>

API is the backend for the app.

"""

tags_metadata = [
    {"name": "Test App", "description": "Testing the app to see if api is working or not."},
    {"name": "Authentication", "description": "Endpoints to **login, Register, Verify email.**"},
    {"name": "Blog Tags", "description": "Tags to be used for adding the tag for a blog."},
    {
        "name": "User Profile",
        "description": "Endpoints related to user **profile, delete account, update profile** or **change** and **forgot password**.",
    },
    {"name": "Blogs", "description": "Endpoints related to **blogs, update blog, delete blog**."},
]


def create_app() -> FastAPI:
    app = FastAPI(
        title="Bloogo API",
        version="0.0.1",
        redoc_url=None,
        description=description,
        summary="Bloogo APP is simply the blog app where user can write the blog of any domain.",
        contact={"name": "Prathamesh Dhande", "email": "developerprathamesh.coder@gmail.com"},
        openapi_tags=tags_metadata,
    )

    connect(host=os.getenv("MONGODB_URI"))

    @app.get(
        "/test",
        tags=["Test App"],
        summary="Test the Working of the App",
        description="Use it in the homepage to see if the api is working correctly or not.",
        response_model=General,
        responses={200: {"description": "Working the app"}},
    )
    def testApp():
        return {"message": "Working the app"}

    origins = ["http://localhost:5173/", "http://localhost"]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(user)
    app.include_router(tag)
    app.include_router(profile)
    app.include_router(blog)

    return app
