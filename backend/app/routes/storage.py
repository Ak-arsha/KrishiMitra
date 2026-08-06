from fastapi import APIRouter
from app.schemas.storage import StorageAdviceRequest, StorageAdviceResponse
from app.ai.storage_engine import get_storage_advice

router = APIRouter(prefix="/api/storage", tags=["storage"])


@router.post("/advise", response_model=StorageAdviceResponse)
def advise(payload: StorageAdviceRequest):
    result = get_storage_advice(
        crop=payload.crop,
        quantity_quintal=payload.quantity_quintal,
        harvest_date=payload.harvest_date,
        current_price=payload.current_price,
        predicted_price_30d=payload.predicted_price_30d,
    )
    return result
