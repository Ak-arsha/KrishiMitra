from pydantic import BaseModel
from typing import Optional, List, Dict


class SellAdviceRequest(BaseModel):
    crop: str
    quantity_quintal: float
    quality_grade: str = "A"
    market: str
    state: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class FeatureContribution(BaseModel):
    feature: str
    impact: float           # signed contribution to the prediction
    direction: str          # "increases" | "decreases"
    explanation: str


class SellAdviceResponse(BaseModel):
    predicted_price_per_quintal: float
    price_range_low: float
    price_range_high: float
    recommended_action: str          # "sell_now" | "wait" | "sell_partial"
    best_sell_window: str
    confidence: float
    msp_comparison: Dict
    explainability: List[FeatureContribution]
    reasoning_summary: str
