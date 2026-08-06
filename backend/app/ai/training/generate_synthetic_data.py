"""
Generates a realistic synthetic mandi-price dataset so the price-prediction
model can be trained and the app can be demoed end-to-end WITHOUT needing
live Agmarknet/data.gov.in credentials during the hackathon.

Swap this out for a real ETL job (see app/services/) once API keys are available —
the training script and model schema stay identical either way.

Run:  python -m app.ai.training.generate_synthetic_data
"""
import numpy as np
import pandas as pd
from datetime import date, timedelta
import os

CROPS = {
    "Wheat": {"base": 2200, "msp": 2275, "volatility": 120},
    "Rice": {"base": 2800, "msp": 2183, "volatility": 150},
    "Cotton": {"base": 6800, "msp": 7121, "volatility": 400},
    "Soybean": {"base": 4500, "msp": 4600, "volatility": 300},
    "Maize": {"base": 1900, "msp": 2090, "volatility": 100},
    "Mustard": {"base": 5300, "msp": 5650, "volatility": 250},
    "Sugarcane": {"base": 340, "msp": 315, "volatility": 20},
    "Onion": {"base": 1500, "msp": 0, "volatility": 600},
    "Potato": {"base": 1100, "msp": 0, "volatility": 400},
    "Tomato": {"base": 1400, "msp": 0, "volatility": 700},
}

MARKETS = {
    "Jaipur": "Rajasthan", "Kota": "Rajasthan", "Indore": "Madhya Pradesh",
    "Bhopal": "Madhya Pradesh", "Ludhiana": "Punjab", "Amritsar": "Punjab",
    "Lucknow": "Uttar Pradesh", "Kanpur": "Uttar Pradesh", "Nashik": "Maharashtra",
    "Pune": "Maharashtra",
}

RNG = np.random.default_rng(42)


def generate(days: int = 730) -> pd.DataFrame:
    rows = []
    start = date.today() - timedelta(days=days)
    for crop, meta in CROPS.items():
        for market, state in MARKETS.items():
            base = meta["base"] * RNG.uniform(0.9, 1.1)
            for d in range(days):
                cur_date = start + timedelta(days=d)
                # seasonality: harvest-season dip, lean-season rise
                seasonal = 1 + 0.08 * np.sin(2 * np.pi * (cur_date.timetuple().tm_yday / 365))
                trend = 1 + 0.00015 * d  # mild long-term inflation
                noise = RNG.normal(0, meta["volatility"] * 0.15)
                modal = max(base * seasonal * trend + noise, meta["volatility"])
                spread = meta["volatility"] * 0.3
                rows.append({
                    "crop": crop,
                    "market": market,
                    "state": state,
                    "date": cur_date.isoformat(),
                    "min_price": round(modal - spread, 2),
                    "max_price": round(modal + spread, 2),
                    "modal_price": round(modal, 2),
                    "msp": meta["msp"],
                    "day_of_year": cur_date.timetuple().tm_yday,
                    "days_since_epoch": d,
                })
    return pd.DataFrame(rows)


if __name__ == "__main__":
    df = generate()
    out_dir = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "synthetic_mandi_prices.csv")
    df.to_csv(out_path, index=False)
    print(f"Generated {len(df)} rows -> {out_path}")
