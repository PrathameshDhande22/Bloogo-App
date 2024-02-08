from api import create_app
from uvicorn import run

app = create_app()


if __name__ == "__main__":
    run("run:app", reload=True, env_file="./.env")
