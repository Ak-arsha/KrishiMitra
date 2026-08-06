"""
Thin Supabase client wrapper. Used for auth/storage features that live in
Supabase directly (e.g. file uploads for crop photos) alongside the
SQLAlchemy models which talk to the same Postgres DB via DATABASE_URL.
Returns None if credentials aren't configured, so the rest of the app can
run in local/demo mode without a Supabase project.
"""
from app.config import settings

_client = None


def get_supabase_client():
    global _client
    if _client is not None:
        return _client
    if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
        return None
    from supabase import create_client
    _client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
    return _client
