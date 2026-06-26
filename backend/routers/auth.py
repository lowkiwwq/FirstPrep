from fastapi import APIRouter, HTTPException, Depends

from database import query_one, execute
from models.user import RegisterRequest, LoginRequest
from deps import get_current_user
from auth_utils import hash_password, verify_password, create_access_token

router = APIRouter()


@router.post("/register")
def register(body: RegisterRequest):
    existing = query_one("SELECT id FROM users WHERE email = %s", (body.email,))
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    row = query_one(
        """
        INSERT INTO users (email, password_hash, display_name)
        VALUES (%s, %s, %s)
        RETURNING id, email, display_name
        """,
        (body.email, hash_password(body.password), body.name),
    )

    token = create_access_token(row["id"], row["email"])
    return {
        "access_token": token,
        "user": {
            "id": str(row["id"]),
            "email": row["email"],
            "display_name": row["display_name"],
        },
    }


@router.post("/login")
def login(body: LoginRequest):
    user = query_one(
        "SELECT id, email, password_hash, display_name FROM users WHERE email = %s",
        (body.email,),
    )
    if not user or not verify_password(body.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(user["id"], user["email"])
    return {
        "access_token": token,
        "user": {
            "id": str(user["id"]),
            "email": user["email"],
            "display_name": user["display_name"],
        },
    }


@router.get("/me")
def me(current_user=Depends(get_current_user)):
    user = query_one(
        "SELECT id, email, display_name FROM users WHERE id = %s",
        (current_user["id"],),
    )
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "id": str(user["id"]),
        "email": user["email"],
        "display_name": user["display_name"],
    }


@router.post("/logout")
def logout(current_user=Depends(get_current_user)):
    # Stateless JWT: nothing to revoke server-side; client drops the token.
    return {"message": "Logged out"}
