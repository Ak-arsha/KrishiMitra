from fastapi import APIRouter
from app.schemas.sell import SellAdviceRequest, SellAdviceResponse
from app.ai.sell_advisor import get_sell_advice
from app.services.gemini_client import narrate_sell_advice

router = APIRouter(prefix="/api/sell-advisor", tags=["sell-advisor"])


@router.post("/advise")
def advise(payload: SellAdviceRequest):
    advice = get_sell_advice(
        crop=payload.crop,
        quantity_quintal=payload.quantity_quintal,
        quality_grade=payload.quality_grade,
        market=payload.market,
        state=payload.state,
    )
    advice["natural_language_summary"] = narrate_sell_advice(advice)
    return advice
