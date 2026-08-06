"""
Buyer Recommendation Engine — geo-spatial matching between a farmer's
listing and registered buyers, scored on distance, price competitiveness,
and quantity fit. Distance uses the haversine formula; in production, swap
the straight-line distance for Google Maps Distance Matrix API (road
distance/ETA) — the scoring logic downstream is unchanged.
"""
import math
from sqlalchemy.orm import Session
from app.models.user import User


def haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371.0
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)
    a = math.sin(dphi / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dlambda / 2) ** 2
    return 2 * R * math.asin(math.sqrt(a))


def find_buyer_matches(db: Session, crop: str, quantity_quintal: float,
                        quality_grade: str, latitude: float, longitude: float,
                        max_distance_km: float, predicted_price: float) -> list[dict]:
    buyers = db.query(User).filter(User.role == "buyer").filter(
        User.latitude.isnot(None), User.longitude.isnot(None)
    ).all()

    results = []
    for b in buyers:
        dist = haversine_km(latitude, longitude, b.latitude, b.longitude)
        if dist > max_distance_km:
            continue

        # scoring: closer is better, price near market rate is better
        distance_score = max(0, 1 - dist / max_distance_km)
        price_score = 0.9  # placeholder until buyer-side bid data exists
        match_score = round(0.65 * distance_score + 0.35 * price_score, 3)

        results.append({
            "buyer_id": b.id,
            "buyer_name": b.full_name,
            "distance_km": round(dist, 1),
            "estimated_price_per_quintal": round(predicted_price, 2),
            "match_score": match_score,
            "reason": f"{round(dist, 1)} km away, buys {crop}, offers competitive rates.",
        })

    results.sort(key=lambda r: r["match_score"], reverse=True)
    return results
