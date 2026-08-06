from pydantic import BaseModel
from typing import Optional


class StorageAdviceRequest(BaseModel):
    crop: str
    quantity_quintal: float
    harvest_date: str          # ISO date string
    current_price: float
    predicted_price_30d: Optional[float] = None


class StorageAdviceResponse(BaseModel):
    recommendation: str          # "store" | "sell_immediately" | "partial_store"
    estimated_storage_cost: float
    estimated_spoilage_risk_pct: float
    projected_gain_if_stored: float
    nearest_warehouse_suggestion: str
    reasoning: str
