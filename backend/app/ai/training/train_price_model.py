"""
Trains the crop price-prediction model.

Per the tech stack: we experiment with BOTH XGBoost and LightGBM and keep
whichever performs better on held-out validation data (this mirrors what
you present in the PPT — both libraries are used, one is selected).

Run:  python -m app.ai.training.train_price_model
Produces: app/ai/models/price_model.joblib, app/ai/models/encoders.joblib
"""
import os
import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error, r2_score
from xgboost import XGBRegressor
from lightgbm import LGBMRegressor

HERE = os.path.dirname(__file__)
DATA_PATH = os.path.join(HERE, "..", "..", "..", "data", "synthetic_mandi_prices.csv")
MODEL_DIR = os.path.join(HERE, "..", "models")


def load_data() -> pd.DataFrame:
    if not os.path.exists(DATA_PATH):
        from app.ai.training.generate_synthetic_data import generate
        df = generate()
    else:
        df = pd.read_csv(DATA_PATH)
    return df


def build_features(df: pd.DataFrame):
    crop_enc = LabelEncoder().fit(df["crop"])
    market_enc = LabelEncoder().fit(df["market"])
    state_enc = LabelEncoder().fit(df["state"])

    X = pd.DataFrame({
        "crop_enc": crop_enc.transform(df["crop"]),
        "market_enc": market_enc.transform(df["market"]),
        "state_enc": state_enc.transform(df["state"]),
        "day_of_year": df["day_of_year"],
        "days_since_epoch": df["days_since_epoch"],
        "msp": df["msp"],
    })
    y = df["modal_price"]
    encoders = {"crop": crop_enc, "market": market_enc, "state": state_enc}
    return X, y, encoders


def train():
    df = load_data()
    X, y, encoders = build_features(df)
    X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

    xgb = XGBRegressor(
        n_estimators=400, max_depth=6, learning_rate=0.05,
        subsample=0.8, colsample_bytree=0.8, random_state=42,
    )
    xgb.fit(X_train, y_train)
    xgb_pred = xgb.predict(X_val)
    xgb_mae = mean_absolute_error(y_val, xgb_pred)
    xgb_r2 = r2_score(y_val, xgb_pred)

    lgbm = LGBMRegressor(
        n_estimators=400, max_depth=6, learning_rate=0.05,
        subsample=0.8, colsample_bytree=0.8, random_state=42, verbose=-1,
    )
    lgbm.fit(X_train, y_train)
    lgbm_pred = lgbm.predict(X_val)
    lgbm_mae = mean_absolute_error(y_val, lgbm_pred)
    lgbm_r2 = r2_score(y_val, lgbm_pred)

    print(f"XGBoost   -> MAE: {xgb_mae:.2f}  R2: {xgb_r2:.4f}")
    print(f"LightGBM  -> MAE: {lgbm_mae:.2f}  R2: {lgbm_r2:.4f}")

    best_model, best_name = (xgb, "xgboost") if xgb_mae <= lgbm_mae else (lgbm, "lightgbm")
    print(f"Selected best-performing model: {best_name}")

    os.makedirs(MODEL_DIR, exist_ok=True)
    joblib.dump({"model": best_model, "name": best_name, "feature_cols": list(X.columns)},
                os.path.join(MODEL_DIR, "price_model.joblib"))
    joblib.dump(encoders, os.path.join(MODEL_DIR, "encoders.joblib"))
    print(f"Saved model artifacts to {MODEL_DIR}")
    return best_model, best_name


if __name__ == "__main__":
    train()
