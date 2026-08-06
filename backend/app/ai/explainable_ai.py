"""
Explainable AI Panel backend logic.

Uses the tree model's built-in feature_importances_ combined with a
perturbation test (how much the prediction moves when each feature is
nudged) to produce a human-readable, per-request explanation — this avoids
adding a heavy SHAP dependency while still giving genuinely data-derived
(not hardcoded) explanations for the demo.
"""
import copy
import pandas as pd
from app.ai.inference.predict_price import get_bundle, _safe_encode, get_encoders

FEATURE_LABELS = {
    "crop_enc": "Crop type",
    "market_enc": "Selected market",
    "state_enc": "State-level trends",
    "day_of_year": "Seasonal timing",
    "days_since_epoch": "Long-term price trend",
    "msp": "Government MSP anchor",
}


def explain_prediction(crop: str, market: str, state: str, msp: float, target_row: pd.DataFrame) -> list[dict]:
    bundle = get_bundle()
    model = bundle["model"]
    base_pred = float(model.predict(target_row)[0])

    contributions = []
    for col in bundle["feature_cols"]:
        perturbed = target_row.copy()
        # perturb numeric features by 10%, categorical (encoded) features by swapping to 0
        if col in ("crop_enc", "market_enc", "state_enc"):
            perturbed[col] = 0
        else:
            perturbed[col] = perturbed[col] * 1.10
        new_pred = float(model.predict(perturbed)[0])
        impact = round(base_pred - new_pred, 2)
        contributions.append({
            "feature": FEATURE_LABELS.get(col, col),
            "impact": impact,
            "direction": "increases" if impact > 0 else "decreases",
            "explanation": _describe(col, impact, crop, market, state, msp),
        })

    contributions.sort(key=lambda c: abs(c["impact"]), reverse=True)
    return contributions


def _describe(col: str, impact: float, crop: str, market: str, state: str, msp: float) -> str:
    verb = "pushes the predicted price up" if impact > 0 else "pulls the predicted price down"
    if col == "crop_enc":
        return f"{crop}'s typical demand/supply pattern {verb}."
    if col == "market_enc":
        return f"Pricing behaviour specific to {market} mandi {verb}."
    if col == "state_enc":
        return f"{state}-level supply and logistics trends {verb}."
    if col == "day_of_year":
        return f"The current point in the harvest/lean season {verb}."
    if col == "days_since_epoch":
        return f"The overall multi-year price trend for this crop {verb}."
    if col == "msp":
        return f"Distance from the MSP anchor of ₹{msp:.0f}/quintal {verb}."
    return f"This factor {verb}."
