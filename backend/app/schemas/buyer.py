from pydantic import BaseModel
from typing import Optional, List


class BuyerMatchRequest(BaseModel):
    crop: str
    quantity_quintal: float
    quality_grade: str = "A"
    latitude: float
    longitude: float
    max_distance_km: float = 100


class BuyerMatch(BaseModel):
    buyer_id: int
    buyer_name: str
    distance_km: float
    estimated_price_per_quintal: float
    match_score: float
    reason: str


class BuyerMatchResponse(BaseModel):
    matches: List[BuyerMatch]
