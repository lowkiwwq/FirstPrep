from fastapi import APIRouter, HTTPException, Depends
from database import supabase
from models.user import RegisterRequest, LoginRequest
from deps import get_current_user

router = APIRouter()


@router.post("/register")
def register(body: RegisterRequest):
    try:
        result = supabase.auth.sign_up({"email": body.email, "password": body.password})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    if not result.user:
        raise HTTPException(status_code=400, detail="Registration failed")

    try:
        supabase.table("profiles").insert({
            "id": result.user.id,
            "display_name": body.name,
        }).execute()
    except Exception:
        pass

    access_token = result.session.access_token if result.session else None
    return {
        "access_token": access_token,
        "user": {
            "id": result.user.id,
            "email": result.user.email,
            "display_name": body.name,
        },
    }


@router.post("/login")
def login(body: LoginRequest):
    try:
        result = supabase.auth.sign_in_with_password({"email": body.email, "password": body.password})
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not result.user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    profile = supabase.table("profiles").select("display_name").eq("id", result.user.id).execute()
    display_name = profile.data[0]["display_name"] if profile.data else result.user.email

    return {
        "access_token": result.session.access_token,
        "user": {
            "id": result.user.id,
            "email": result.user.email,
            "display_name": display_name,
        },
    }


@router.get("/me")
def me(current_user=Depends(get_current_user)):
    profile = supabase.table("profiles").select("display_name").eq("id", current_user["id"]).execute()
    display_name = profile.data[0]["display_name"] if profile.data else current_user["email"]
    return {
        "id": current_user["id"],
        "email": current_user["email"],
        "display_name": display_name,
    }


@router.post("/logout")
def logout(current_user=Depends(get_current_user)):
    try:
        supabase.auth.sign_out()
    except Exception:
        pass
    return {"message": "Logged out"}
