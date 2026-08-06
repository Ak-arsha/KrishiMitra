"""
Computes a market-stability / volatility index per crop from the recent
price series and produces the feed shown on the Market Intelligence page.
"""
import numpy as np
from app.ai.inference.predict_price import predict_price_series
from app.ai.msp_engine import MSP_TABLE


def get_market_feed(crops: list[str], market: str, state: str) -> list[dict]:
    feed = []
    for crop in crops:
        msp = MSP_TABLE.get(crop, 0)
        series = predict_price_series(crop, market, state, msp, days_ahead=30)
        prices = np.array([p["predicted_price"] for p in series])
        volatility = float(np.std(prices) / np.mean(prices) * 100) if prices.mean() else 0
        trend_pct = float((prices[-1] - prices[0]) / prices[0] * 100) if prices[0] else 0

        if volatility < 3:
            stability = "stable"
        elif volatility < 7:
            stability = "moderate"
        else:
            stability = "volatile"

        feed.append({
            "crop": crop,
            "current_price": round(float(prices[0]), 2),
            "trend_pct_30d": round(trend_pct, 2),
            "volatility_index": round(volatility, 2),
            "stability": stability,
            "series": series,
        })
    return feed
