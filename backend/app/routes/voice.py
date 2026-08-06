from fastapi import APIRouter
from pydantic import BaseModel
from app.services.gemini_client import answer_voice_query
from app.ai.market_stability import get_market_feed
from app.ai.msp_engine import MSP_TABLE

router = APIRouter(prefix="/api/voice", tags=["voice-assistant"])


class VoiceQuery(BaseModel):
    query: str
    crop: str | None = None
    market: str = "Jaipur"
    state: str = "Rajasthan"


@router.post("/ask")
def ask(payload: VoiceQuery):
    context = {}
    if payload.crop:
        context = get_market_feed([payload.crop], payload.market, payload.state)[0]
    answer = answer_voice_query(payload.query, context)
    return {"query": payload.query, "answer": answer, "context_used": context}
