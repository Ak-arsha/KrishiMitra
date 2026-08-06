"""
Compares the model's predicted market price against the government MSP
(Minimum Support Price) and flags whether the farmer is better off selling
in the open market or via MSP procurement centres.
"""

MSP_TABLE = {
    "Wheat": 2275, "Rice": 2183, "Cotton": 7121, "Soybean": 4600,
    "Maize": 2090, "Mustard": 5650, "Sugarcane": 315,
    # Perishables generally have no MSP
    "Onion": 0, "Potato": 0, "Tomato": 0,
}


def compare_to_msp(crop: str, predicted_price: float) -> dict:
    msp = MSP_TABLE.get(crop, 0)
    if msp == 0:
        return {
            "has_msp": False,
            "msp": 0,
            "predicted_price": predicted_price,
            "verdict": "no_msp_scheme",
            "message": f"{crop} has no MSP scheme — sell in the open/mandi market.",
        }

    diff = predicted_price - msp
    diff_pct = round((diff / msp) * 100, 1)

    if diff >= 0:
        verdict = "market_better"
        message = (f"Predicted market price (₹{predicted_price:.0f}) is {diff_pct}% above "
                    f"MSP (₹{msp:.0f}) — selling in the open market is likely better.")
    else:
        verdict = "msp_better"
        message = (f"Predicted market price (₹{predicted_price:.0f}) is {abs(diff_pct)}% below "
                    f"MSP (₹{msp:.0f}) — consider selling via an MSP procurement centre instead.")

    return {
        "has_msp": True,
        "msp": msp,
        "predicted_price": predicted_price,
        "difference": round(diff, 2),
        "difference_pct": diff_pct,
        "verdict": verdict,
        "message": message,
    }
