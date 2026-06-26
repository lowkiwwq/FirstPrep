import sys
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import auth, courses, tests, dashboard, progress, rag

# backend/ в sys.path — нужно для импортов rag.* и config
_BACKEND_DIR = str(Path(__file__).parent)
if _BACKEND_DIR not in sys.path:
    sys.path.insert(0, _BACKEND_DIR)


@asynccontextmanager
async def lifespan(app: FastAPI):
    from rag.startup import warmup
    warmup(verbose=True)
    yield


app = FastAPI(title="Phoenix Forge API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(courses.router, tags=["courses"])
app.include_router(tests.router, tags=["tests"])
app.include_router(dashboard.router, tags=["dashboard"])
app.include_router(progress.router, tags=["progress"])
app.include_router(rag.router)


@app.get("/health")
def health():
    return {"status": "ok"}
