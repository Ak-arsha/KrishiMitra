from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import Base, engine
from app import models  # noqa: F401  (ensures models are registered before create_all)
from app.routes import auth, sell_advisor, buyer, market, storage, msp, explainable, voice, farmer_dashboard

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="KrishiMitra API",
    description="AI Sell Advisor, Buyer Recommendation, Explainable AI, Market Intelligence, "
                 "Voice Assistant, and Storage Advisor for farmers.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in settings.CORS_ORIGINS.split(",")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(sell_advisor.router)
app.include_router(buyer.router)
app.include_router(market.router)
app.include_router(storage.router)
app.include_router(msp.router)
app.include_router(explainable.router)
app.include_router(voice.router)
app.include_router(farmer_dashboard.router)


@app.get("/")
def root():
    return {"status": "ok", "service": "KrishiMitra API", "docs": "/docs"}


@app.get("/api/health")
def health():
    return {"status": "healthy"}
