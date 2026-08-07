from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, GoogleLoginRequest, Token, UserOut
from app.services.auth_service import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == payload.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        full_name=payload.full_name,
        email=payload.email,
        hashed_password=hash_password(payload.password),
        role=payload.role,
        latitude=payload.latitude,
        longitude=payload.longitude,
        location_name=payload.location_name,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token({"user_id": user.id, "role": user.role})
    return Token(access_token=token, user=UserOut.model_validate(user))


@router.post("/login", response_model=Token)
def login(payload: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    
    # Auto-seed demo user if attempting demo login on a fresh database
    if not user and payload.email == "farmer@example.com" and payload.password == "password123":
        user = User(
            full_name="Ramesh Kumar (Demo Farmer)",
            email="farmer@example.com",
            hashed_password=hash_password("password123"),
            role="farmer",
            latitude=28.6139,
            longitude=77.2090,
            location_name="Karnal, Haryana",
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"user_id": user.id, "role": user.role})
    return Token(access_token=token, user=UserOut.model_validate(user))


@router.post("/google", response_model=Token)
def google_login(payload: GoogleLoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user:
        user = User(
            full_name=payload.full_name,
            email=payload.email,
            hashed_password=hash_password("google-oauth-account"),
            role="farmer",
            location_name="New Delhi, India",
            latitude=28.6139,
            longitude=77.2090,
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    token = create_access_token({"user_id": user.id, "role": user.role})
    return Token(access_token=token, user=UserOut.model_validate(user))


