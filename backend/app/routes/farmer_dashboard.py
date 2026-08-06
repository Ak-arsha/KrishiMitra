from fastapi import APIRouter, Query, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import random
from app.database import get_db
from app.models.user import User
from app.services.auth_service import get_current_user
from app.ai.msp_engine import MSP_TABLE

router = APIRouter(prefix="/api/farmer", tags=["farmer"])

# Mock market data - In production, fetch from external APIs or database
MOCK_CROP_PRICES = {
    "Rice": {"current": 4500, "previous": 4400},
    "Wheat": {"current": 2200, "previous": 2150},
    "Maize": {"current": 1900, "previous": 1850},
    "Cotton": {"current": 5800, "previous": 6000},
    "Sugarcane": {"current": 3100, "previous": 3050},
    "Tomato": {"current": 2800, "previous": 3000},
    "Onion": {"current": 1800, "previous": 1950},
    "Potato": {"current": 1200, "previous": 1150},
    "Chilli": {"current": 3500, "previous": 3400},
    "Turmeric": {"current": 7200, "previous": 7100},
    "Soybean": {"current": 4100, "previous": 4000},
    "Groundnut": {"current": 5000, "previous": 4900},
}

COMMON_CROPS = list(MOCK_CROP_PRICES.keys())


@router.get("/dashboard")
def get_dashboard(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Get farmer dashboard data - profile, market overview"""
    user = db.query(User).filter(User.id == current_user.id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "farmer": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "location_name": user.location_name,
            "latitude": user.latitude,
            "longitude": user.longitude,
        },
        "market_overview": get_market_prices(),
        "timestamp": datetime.now().isoformat()
    }


@router.get("/market-prices")
def get_market_prices(location: str = Query(None)):
    """Get current market prices for common crops"""
    prices = []
    for crop, price_data in MOCK_CROP_PRICES.items():
        current = price_data["current"]
        previous = price_data["previous"]
        change_percent = ((current - previous) / previous * 100) if previous > 0 else 0
        
        prices.append({
            "crop": crop,
            "current_price": current,
            "previous_price": previous,
            "change_percent": round(change_percent, 1),
            "change_amount": current - previous,
            "unit": "₹/quintal" if crop not in ["Cotton", "Chilli", "Turmeric"] else "₹/kg",
            "timestamp": datetime.now().isoformat()
        })
    
    return {
        "location": location or "India",
        "prices": prices,
        "last_updated": datetime.now().isoformat()
    }


@router.get("/price-forecast/{crop}")
def get_price_forecast(crop: str):
    """Get 5-day price forecast for a specific crop"""
    if crop not in MOCK_CROP_PRICES:
        raise HTTPException(status_code=404, detail=f"Crop '{crop}' not found in database")
    
    base_price = MOCK_CROP_PRICES[crop]["current"]
    forecast = []
    
    for day_offset in range(1, 6):
        forecast_date = datetime.now() + timedelta(days=day_offset)
        # Simulate price variation
        price_variation = random.uniform(-500, 500)
        predicted_price = max(base_price + price_variation, base_price * 0.8)
        
        # Determine trend
        if price_variation > 100:
            trend = "up"
        elif price_variation < -100:
            trend = "down"
        else:
            trend = "stable"
        
        forecast.append({
            "day": forecast_date.strftime("%a"),
            "date": forecast_date.strftime("%b %d"),
            "predicted_price": round(predicted_price, 2),
            "confidence": random.uniform(0.75, 0.95),
            "trend": trend,
            "price_change": round(price_variation, 2)
        })
    
    avg_price = sum(f["predicted_price"] for f in forecast) / len(forecast)
    
    return {
        "crop": crop,
        "forecast": forecast,
        "average_price": round(avg_price, 2),
        "forecast_period": "5 days",
        "model_confidence": 0.85,
        "generated_at": datetime.now().isoformat()
    }


@router.get("/sell-recommendation/{crop}")
def get_sell_recommendation(crop: str, location: str = Query(None)):
    """Get AI-powered sell recommendation for a crop"""
    if crop not in MOCK_CROP_PRICES:
        raise HTTPException(status_code=404, detail=f"Crop '{crop}' not found")
    
    # Random recommendation logic (in production, use actual ML model)
    recommendation_type = random.choice(["sell_now", "wait", "hold"])
    confidence = random.uniform(0.75, 0.95)
    
    reasons = {
        "sell_now": f"Current market prices for {crop} are at a 3-month high. Market demand is strong.",
        "wait": f"Price forecasts show {crop} prices may increase by 5-8% in the next 2-3 days.",
        "hold": f"{crop} prices are stable. No significant movement expected in the coming days."
    }
    
    factors = [
        "Market demand is high",
        "Weather conditions favorable",
        f"Current price point is optimal for {crop}",
        "Low supply in your region"
    ]
    
    best_selling_date = (datetime.now() + timedelta(days=random.randint(1, 5))).strftime("%A, %b %d")
    potential_gain = random.randint(100, 500)
    
    return {
        "crop": crop,
        "location": location or "Your Region",
        "recommendation": recommendation_type,
        "confidence": round(confidence * 100),
        "reason": reasons[recommendation_type],
        "factors": factors,
        "estimated_best_day": best_selling_date,
        "potential_gain": potential_gain,
        "generated_at": datetime.now().isoformat()
    }


@router.get("/crops/suggestions")
def get_crop_suggestions(query: str = Query(""), limit: int = Query(10)):
    """Get crop suggestions based on search query"""
    if not query:
        suggestions = COMMON_CROPS[:limit]
    else:
        query_lower = query.lower()
        suggestions = [
            crop for crop in COMMON_CROPS 
            if query_lower in crop.lower()
        ][:limit]
    
    return {
        "query": query,
        "suggestions": suggestions,
        "total": len(suggestions)
    }
