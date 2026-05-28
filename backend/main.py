from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, courses, tests, dashboard, progress

app = FastAPI(title="Phoenix Forge API", version="1.0.0")

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

@app.get("/health")
def health():
    return {"status": "ok"}
