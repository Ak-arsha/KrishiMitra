from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.buyer import BuyerMatchRequest, BuyerMatchResponse
from app.ai.buyer_engine import find_buyer_matches
from app.ai.inference.predict_price import predict_price
from app.ai.msp_engine import MSP_TABLE

router = APIRouter(prefix="/api/buyers", tags=["buyers"])


@router.post("/match", response_model=BuyerMatchResponse)
def match_buyers(payload: BuyerMatchRequest, db: Session = Depends(get_db)):
    # use a generic market/state fallback for the price estimate feeding the match
    msp = MSP_TABLE.get(payload.crop, 0)
    price = predict_price(payload.crop, "Jaipur", "Rajasthan", msp)["predicted_price"]

    matches = find_buyer_matches(
        db=db,
        crop=payload.crop,
        quantity_quintal=payload.quantity_quintal,
        quality_grade=payload.quality_grade,
        latitude=payload.latitude,
        longitude=payload.longitude,
        max_distance_km=payload.max_distance_km,
        predicted_price=price,
    )
    return BuyerMatchResponse(matches=matches)
