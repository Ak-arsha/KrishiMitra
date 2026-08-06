"""
AI Sell Advisor — the core "should I sell now or wait" recommendation engine.
Combines: price prediction (XGBoost/LightGBM), a short-horizon price series,
MSP comparison, and explainable-AI feature contributions into one response.
"""
import pandas as pd
from app.ai.inference.predict_price import predict_price, predict_price_series, get_bundle, _safe_encode, get_encoders
from app.ai.explainable_ai import explain_prediction
from app.ai.msp_engine import compare_to_msp, MSP_TABLE
from datetime import date


def get_sell_advice(crop: str, quantity_quintal: float, quality_grade: str,
                     market: str, state: str) -> dict:
    msp = MSP_TABLE.get(crop, 0)
    current = predict_price(crop, market, state, msp)
    series = predict_price_series(crop, market, state, msp, days_ahead=30)

    # quality grade adjustment (grade B/C typically fetch less than modal "fair average quality" price)
    grade_multiplier = {"A": 1.0, "B": 0.93, "C": 0.85}.get(quality_grade, 1.0)
    adjusted_price = round(current["predicted_price"] * grade_multiplier, 2)
    adjusted_low = round(current["low"] * grade_multiplier, 2)
    adjusted_high = round(current["high"] * grade_multiplier, 2)

    # decide: is price trending up over the next 30 days?
    future_prices = [p["predicted_price"] for p in series]
    trend_pct = ((future_prices[-1] - future_prices[0]) / future_prices[0]) * 100 if future_prices[0] else 0

    if trend_pct > 4:
        action = "wait"
        best_window = _best_window(series)
        summary = (f"Prices for {crop} in {market} are projected to rise ~{trend_pct:.1f}% "
                    f"over the next 30 days. Consider holding stock if storage is available.")
    elif trend_pct < -4:
        action = "sell_now"
        best_window = "Now (within the next 3-5 days)"
        summary = (f"Prices for {crop} in {market} are projected to fall ~{abs(trend_pct):.1f}% "
                    f"over the next 30 days. Selling soon is recommended.")
    else:
        action = "sell_partial"
        best_window = "Now, with the remainder over the next 2 weeks"
        summary = (f"Prices for {crop} in {market} look broadly stable "
                    f"({trend_pct:+.1f}% over 30 days). Selling in batches balances risk.")

    msp_result = compare_to_msp(crop, adjusted_price)

    # explainability needs the raw feature row used for the *current* prediction
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
    explanation = explain_prediction(crop, market, state, msp, row)

    confidence = max(0.55, min(0.95, 1 - (adjusted_high - adjusted_low) / max(adjusted_price, 1)))

    return {
        "predicted_price_per_quintal": adjusted_price,
        "price_range_low": adjusted_low,
        "price_range_high": adjusted_high,
        "recommended_action": action,
        "best_sell_window": best_window,
        "confidence": round(confidence, 2),
        "msp_comparison": msp_result,
        "explainability": explanation,
        "reasoning_summary": summary,
        "price_forecast_30d": series,
        "quantity_quintal": quantity_quintal,
        "estimated_total_value": round(adjusted_price * quantity_quintal, 2),
    }


def _best_window(series: list[dict]) -> str:
    best = max(series, key=lambda p: p["predicted_price"])
    return f"Around {best['date']} (projected peak of ₹{best['predicted_price']:.0f}/quintal)"
