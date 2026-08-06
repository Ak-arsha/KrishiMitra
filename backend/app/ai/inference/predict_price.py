"""
Loads the trained price model (training a fresh one on the fly if artifacts
are missing, e.g. on first run) and exposes a single predict() function used
by the Sell Advisor and Storage Advisor engines.
"""
import os
import joblib
import numpy as np
import pandas as pd
from datetime import date

HERE = os.path.dirname(__file__)
MODEL_DIR = os.path.join(HERE, "..", "models")
MODEL_PATH = os.path.join(MODEL_DIR, "price_model.joblib")
ENCODERS_PATH = os.path.join(MODEL_DIR, "encoders.joblib")

_bundle = None
_encoders = None


def _ensure_trained():
    global _bundle, _encoders
    if _bundle is not None:
        return
    if not os.path.exists(MODEL_PATH):
        from app.ai.training.train_price_model import train
        train()
    _bundle = joblib.load(MODEL_PATH)
    _encoders = joblib.load(ENCODERS_PATH)


def get_bundle() -> dict:
    _ensure_trained()
    return _bundle


def get_encoders() -> dict:
    _ensure_trained()
    return _encoders


def _safe_encode(encoder, value: str) -> int:
    if value in encoder.classes_:
        return int(encoder.transform([value])[0])
    # unseen crop/market at inference time -> fall back to nearest known class (index 0)
    return 0


def predict_price(crop: str, market: str, state: str, msp: float = 0.0,
                   target_date: date | None = None) -> dict:
    _ensure_trained()
    target_date = target_date or date.today()

    row = pd.DataFrame([{
        "crop_enc": _safe_encode(_encoders["crop"], crop),
        "market_enc": _safe_encode(_encoders["market"], market),
        "state_enc": _safe_encode(_encoders["state"], state),
        "day_of_year": target_date.timetuple().tm_yday,
        "days_since_epoch": (target_date - date(2024, 1, 1)).days,
        "msp": msp,
    }])[_bundle["feature_cols"]]

    model = _bundle["model"]
    pred = float(model.predict(row)[0])

    # simple uncertainty band from tree-level variance (works for XGB/LightGBM sklearn API)
    try:
        leaf_preds = np.array([est.predict(row) for est in getattr(model, "estimators_", [])])
        std = float(leaf_preds.std()) if leaf_preds.size else pred * 0.05
    except Exception:
        std = pred * 0.05

    return {
        "predicted_price": round(pred, 2),
        "low": round(pred - 1.5 * max(std, pred * 0.03), 2),
        "high": round(pred + 1.5 * max(std, pred * 0.03), 2),
        "model_used": _bundle["name"],
    }


def predict_price_series(crop: str, market: str, state: str, msp: float, days_ahead: int = 30) -> list[dict]:
    """Used by Storage Advisor to project a price curve forward."""
    from datetime import timedelta
    out = []
    today = date.today()
    for d in range(0, days_ahead + 1, 5):
        target = today + timedelta(days=d)
        result = predict_price(crop, market, state, msp, target)
        out.append({"date": target.isoformat(), **result})
    return out
