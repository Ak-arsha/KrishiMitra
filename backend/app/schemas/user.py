from pydantic import BaseModel, EmailStr
from typing import Optional


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: str = "farmer"
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    location_name: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class GoogleLoginRequest(BaseModel):
    email: EmailStr
    full_name: str
    google_id: Optional[str] = None
    avatar_url: Optional[str] = None


class UserOut(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    location_name: Optional[str] = None

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut
