import os
from fastapi import FastAPI, Request, status
from mongoengine import connect
from .route import user, tag, profile, blog


def create_app() -> FastAPI:
    app = FastAPI(debug=True, title="Bloogo APP", version="0.0.1", redoc_url=None)

    connect(host=os.getenv("MONGODB_URI"))

    @app.get("/test", tags=["Test App"])
    def testApp():
        return {"message": "Working the app"}

    app.include_router(user)
    app.include_router(tag)
    app.include_router(profile)
    app.include_router(blog)

    return app
