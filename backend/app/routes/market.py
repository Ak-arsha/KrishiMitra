from fastapi import APIRouter, Query
from app.ai.market_stability import get_market_feed
from app.ai.msp_engine import MSP_TABLE
from app.services.gemini_client import summarize_market_news

router = APIRouter(prefix="/api/market", tags=["market"])

DEFAULT_CROPS = list(MSP_TABLE.keys())


@router.get("/feed")
def market_feed(market: str = Query("Jaipur"), state: str = Query("Rajasthan"),
                 crops: str = Query(None, description="comma-separated crop list")):
    crop_list = crops.split(",") if crops else DEFAULT_CROPS
    return {"market": market, "state": state, "feed": get_market_feed(crop_list, market, state)}


@router.get("/news-summary")
def news_summary(crop: str = Query(...)):
    # Placeholder headlines until NEWS_API_KEY integration is wired to a live fetch job.
    sample_headlines = [
        f"{crop} sowing area reported higher than last year in key states.",
        f"Traders expect {crop} demand to stay steady through the season.",
    ]
    return {"crop": crop, "summary": summarize_market_news(crop, sample_headlines)}
