"""
SQLAlchemy engine/session setup.
Defaults to local SQLite so the project runs out-of-the-box for demo/hackathon judging
without requiring live Supabase credentials. Point DATABASE_URL at your Supabase
Postgres connection string in .env for production use — no code changes needed.
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from app.config import settings

connect_args = {"check_same_thread": False} if settings.DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(settings.DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
