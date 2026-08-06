"""
Storage Advisor — decides whether a farmer should pay for cold storage /
warehousing and wait for a better price, or sell immediately, factoring in
storage cost, spoilage risk (perishables decay faster), and projected
price gain from the price-forecast series.
"""
from datetime import date, datetime

PERISHABLE_SPOILAGE_RATE = {  # % quality/value loss per week in ambient storage
    "Onion": 4.0, "Potato": 3.0, "Tomato": 12.0,
}
NON_PERISHABLE_SPOILAGE_RATE = 0.5  # grains etc. — minimal with proper storage

STORAGE_COST_PER_QUINTAL_PER_WEEK = 15.0  # ₹, warehouse rental approximation


def get_storage_advice(crop: str, quantity_quintal: float, harvest_date: str,
                        current_price: float, predicted_price_30d: float | None) -> dict:
    try:
        h_date = datetime.fromisoformat(harvest_date).date()
    except ValueError:
        h_date = date.today()

    weeks_held = 4  # evaluating a 4-week (~30 day) hold, matching the price forecast horizon
    spoilage_rate = PERISHABLE_SPOILAGE_RATE.get(crop, NON_PERISHABLE_SPOILAGE_RATE)
    spoilage_risk_pct = round(spoilage_rate * weeks_held, 1)

    storage_cost = round(STORAGE_COST_PER_QUINTAL_PER_WEEK * weeks_held * quantity_quintal, 2)

    if predicted_price_30d is None:
        predicted_price_30d = current_price * 1.02  # mild default assumption

    gross_gain_per_quintal = predicted_price_30d - current_price
    spoilage_loss_per_quintal = predicted_price_30d * (spoilage_risk_pct / 100)
    net_gain = round(
        (gross_gain_per_quintal - spoilage_loss_per_quintal) * quantity_quintal - storage_cost, 2
    )

    if crop in PERISHABLE_SPOILAGE_RATE:
        recommendation = "sell_immediately"
        reasoning = (f"{crop} is highly perishable (~{spoilage_rate}% value loss/week). "
                     f"Storage costs and spoilage risk outweigh any price gain — sell now.")
    elif net_gain > storage_cost * 0.5:
        recommendation = "store"
        reasoning = (f"Projected price gain (₹{gross_gain_per_quintal:.0f}/quintal) comfortably "
                     f"covers storage cost (₹{STORAGE_COST_PER_QUINTAL_PER_WEEK:.0f}/quintal/week) "
                     f"and spoilage risk ({spoilage_risk_pct}%). Storing is worthwhile.")
    elif net_gain > 0:
        recommendation = "partial_store"
        reasoning = "Storing is marginally profitable — consider storing only part of the stock."
    else:
        recommendation = "sell_immediately"
        reasoning = "Storage cost and spoilage risk exceed the projected price gain — sell now."

    return {
        "recommendation": recommendation,
        "estimated_storage_cost": storage_cost,
        "estimated_spoilage_risk_pct": spoilage_risk_pct,
        "projected_gain_if_stored": net_gain,
        "nearest_warehouse_suggestion": "Nearest govt. warehousing corp (WDRA-registered) facility",
        "reasoning": reasoning,
    }
