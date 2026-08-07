# KrishiMitra 🌾

AI-powered farm advisory platform — built for the hackathon Round 2 submission.
Implements the full architecture from the PPT: **AI Sell Advisor**, **Buyer Recommendation Engine**, **Explainable AI Panel**, **Market Intelligence Feed**, **Voice Assistant**, and **Storage Advisor**, on the exact tech stack that was finalized.

```
Frontend (Next.js 14) → Backend (FastAPI) → ML/AI layer → Output
```

## Tech Stack

| Layer | Stack |
|---|---|
| **Frontend** | Next.js 14, React 18, Tailwind CSS, Framer Motion, Lucide React, Recharts, Axios |
| **Backend** | FastAPI, Python 3.11+, REST APIs, Pydantic v2, SQLAlchemy, PyJWT, Passlib, Uvicorn |
| **Database** | Supabase (PostgreSQL) — falls back to local SQLite for zero-config dev |
| **Authentication** | JWT Bearer Authentication + Google OAuth Integration (`/api/auth/google`) |
| **ML Models** | Scikit-Learn, XGBoost, LightGBM, Pandas, NumPy, Joblib |
| **LLM Integration** | Gemini API & Web Speech API Voice Assistant |
| **Data & APIs** | Agmarknet, Data.gov.in, OpenWeather, News API, Google Maps API |
| **Deployment** | Vercel (frontend), Render (backend), Supabase (DB) |

---

## Project Structure

```
KrishiMitra/
├── frontend/                  Next.js app (App Router)
│   ├── app/
│   │   ├── page.tsx                    Landing Page & Dashboard router
│   │   ├── login/                      Email & Google Sign-In Page
│   │   ├── signup/                     New Account Registration (Farmer / Buyer / Trader)
│   │   ├── dashboard/                  Personalized Farmer Advisory Dashboard
│   │   ├── sell-advisor/               AI Sell Advisor
│   │   ├── buyer-recommendations/      Buyer Recommendation Engine
│   │   ├── market-intelligence/        Market Intelligence Feed
│   │   ├── explainable-ai/             Explainable AI Panel
│   │   ├── voice-assistant/            Voice Assistant (Web Speech API + Gemini)
│   │   └── storage-advisor/            Storage Advisor
│   ├── components/
│   │   ├── Navbar.tsx                  Global Header with User Profile, Location & Logout
│   │   ├── CropInput.tsx               Crop selection component
│   │   ├── MarketPrices.tsx            Live Agmarknet prices feed
│   │   ├── PriceForecast.tsx           5-Day ML Price Forecast cards
│   │   └── SellRecommendation.tsx      XGBoost/LightGBM sell recommendation card
│   └── lib/                            Axios API client + AuthContext
│
├── backend/
│   ├── app/
│   │   ├── main.py                     FastAPI entrypoint
│   │   ├── config.py                   Env-driven settings (Supabase, JWT, CORS)
│   │   ├── database.py                 SQLAlchemy session (Supabase/Postgres or SQLite)
│   │   ├── models/                     SQLAlchemy ORM models (User, Crop, Market)
│   │   ├── schemas/                    Pydantic request/response schemas
│   │   ├── routes/                     REST endpoints (auth, farmer_dashboard, sell_advisor, etc.)
│   │   ├── services/                   Supabase client, Gemini client, JWT auth
│   │   └── ai/                         ← ML/AI Layer
│   │       ├── training/               Synthetic data + XGBoost/LightGBM model training
│   │       ├── inference/              Price prediction inference (`predict_price.py`)
│   │       ├── explainable_ai.py       Perturbation feature-contribution explanations
│   │       ├── buyer_engine.py         Geo-spatial buyer matching (haversine formula)
│   │       ├── sell_advisor.py         Sell now / wait / hold decision engine
│   │       ├── storage_engine.py       Store vs. sell-now decision engine
│   │       ├── market_stability.py     Volatility index for market feed
│   │       └── msp_engine.py           MSP (Minimum Support Price) floor comparison
│   └── requirements.txt
```

---

## Quick Start

### 1. Backend Setup

```bash
cd backend
python -m venv venv
# On Windows: venv\Scripts\activate
# On Mac/Linux: source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```
- API will be live at `http://localhost:8000` (Interactive docs at `http://localhost:8000/docs`).

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
- Frontend will be live at `http://localhost:3000`.

---

## Environment Configuration

### Backend Environment (`backend/.env`)
```env
SUPABASE_URL=https://bzaevtaubnhqadetigco.supabase.co
SUPABASE_KEY=your-supabase-key
DATABASE_URL=sqlite:///./krishimitra.db
JWT_SECRET_KEY=krishimitra-dev-jwt-secret-key-2026-secure
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Frontend Environment (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

---

## Feature Status

| Feature | Status | Implementation Details |
|---|---|---|
| **Email & Google Auth** | ✅ Fully Functional | JWT authentication with `/api/auth/login`, `/api/auth/register`, and `/api/auth/google`. |
| **Top Navigation Bar** | ✅ Fully Functional | Global `Navbar.tsx` displaying user initial, name, location badge, and one-click Logout. |
| **Price Prediction (ML)** | ✅ Fully Functional | XGBoost & LightGBM regression models producing 5-day price series. |
| **MSP Comparison** | ✅ Fully Functional | Benchmarked against official Government MSP floor prices (Wheat ₹2275, Rice ₹2183, Mustard ₹5650, etc.). |
| **Explainable AI Panel** | ✅ Fully Functional | Real perturbation-based feature contribution analysis per request. |
| **Storage Advisor** | ✅ Fully Functional | Store vs. sell decision engine based on 30-day projected ROI. |
| **Buyer Matching** | ✅ Fully Functional | Geo-spatial haversine distance ranking for local mandi buyers. |
| **Voice Assistant** | ✅ Fully Functional | Web Speech API voice-to-text with Gemini LLM advisory. |
