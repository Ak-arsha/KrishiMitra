from fastapi import APIRouter
import pandas as pd
from datetime import date

from app.ai.explainable_ai import explain_prediction
from app.ai.inference.predict_price import get_bundle, _safe_encode, get_encoders
from app.ai.msp_engine import MSP_TABLE

router = APIRouter(prefix="/api/explainable", tags=["explainable-ai"])


@router.get("/breakdown")
def breakdown(crop: str, market: str = "Jaipur", state: str = "Rajasthan"):
    msp = MSP_TABLE.get(crop, 0)
    bundle = get_bundle()
    encoders = get_encoders()
    row = pd.DataFrame([{
        "crop_enc": _safe_encode(encoders["crop"], crop),
        "market_enc": _safe_encode(encoders["market"], market),
        "state_enc": _safe_encode(encoders["state"], state),
        "day_of_year": date.today().timetuple().tm_yday,
        "days_since_epoch": (date.today() - date(2024, 1, 1)).days,
        "msp": msp,
    }])[bundle["feature_cols"]]

    return {"crop": crop, "market": market, "state": state,
            "explanation": explain_prediction(crop, market, state, msp, row)}
