"""
Central app configuration. Reads from environment variables / .env file.
Never hardcode secrets here — everything is pulled from os.environ via pydantic-settings.
"""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # Supabase / DB
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    DATABASE_URL: str = "sqlite:///./krishimitra.db"  # falls back to local sqlite for dev/demo

    # Auth
    JWT_SECRET_KEY: str = "dev-secret-change-me"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # LLM
    GEMINI_API_KEY: str = ""

    # External data APIs
    AGMARKNET_API_KEY: str = ""
    DATA_GOV_IN_API_KEY: str = ""
    OPENWEATHER_API_KEY: str = ""
    NEWS_API_KEY: str = ""
    GOOGLE_MAPS_API_KEY: str = ""

    # App
    ENVIRONMENT: str = "development"
    CORS_ORIGINS: str = "http://localhost:3000"


settings = Settings()
