from fastapi import APIRouter
from app.ai.msp_engine import compare_to_msp
from app.ai.inference.predict_price import predict_price
from app.ai.msp_engine import MSP_TABLE

router = APIRouter(prefix="/api/msp", tags=["msp"])


@router.get("/compare")
def compare(crop: str, market: str = "Jaipur", state: str = "Rajasthan"):
    msp = MSP_TABLE.get(crop, 0)
    price = predict_price(crop, market, state, msp)["predicted_price"]
    return compare_to_msp(crop, price)
