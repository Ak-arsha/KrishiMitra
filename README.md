# KrishiMitra 🌾

AI-powered farm advisory platform — built for the hackathon Round 2 submission.
Implements the full architecture from the PPT: **AI Sell Advisor**, **Buyer Recommendation
Engine**, **Explainable AI Panel**, **Market Intelligence Feed**, **Voice Assistant**, and
**Storage Advisor**, on the exact tech stack that was finalized.

```
Frontend (Next.js) → Backend (FastAPI) → ML/AI layer → Output
```

## Tech Stack (as finalized)

| Layer | Stack |
|---|---|
| Frontend | Next.js, React, Tailwind CSS, shadcn-style UI, React Router, Axios, Recharts, Framer Motion, React Hook Form |
| Backend | FastAPI, Python, REST APIs, Pydantic, SQLAlchemy, JWT Auth, Supabase SDK, Uvicorn |
| Database | Supabase (Postgres) — falls back to local SQLite for demo/dev |
| ML | Scikit-Learn, XGBoost, LightGBM, Pandas, NumPy, Joblib |
| LLM | Gemini API, Prompt Engineering |
| APIs | Agmarknet, Data.gov.in, OpenWeather, News API, Google Maps API |
| Deployment | Vercel (frontend), Render (backend), Supabase (DB) |

## Project Structure

The ML layer lives **inside the backend**, matching the architecture diagram
(Backend owns the intelligence — Frontend → Backend → ML → Output):

```
KrishiMitra/
├── frontend/                  Next.js app (App Router)
│   ├── app/
│   │   ├── page.tsx                    Dashboard
│   │   ├── sell-advisor/               AI Sell Advisor
│   │   ├── buyer-recommendations/      Buyer Recommendation Engine
│   │   ├── market-intelligence/        Market Intelligence Feed
│   │   ├── explainable-ai/             Explainable AI Panel
│   │   ├── voice-assistant/            Voice Assistant (Web Speech API + Gemini)
│   │   └── storage-advisor/            Storage Advisor
│   ├── components/ui/                  Reusable shadcn-style components
│   └── lib/                            Axios API client + shared utils
│
├── backend/
│   ├── app/
│   │   ├── main.py                     FastAPI entrypoint
│   │   ├── config.py                   Env-driven settings
│   │   ├── database.py                 SQLAlchemy session (Supabase/Postgres or SQLite)
│   │   ├── models/                     SQLAlchemy ORM models
│   │   ├── schemas/                    Pydantic request/response schemas
│   │   ├── routes/                     REST endpoints per feature
│   │   ├── services/                   Supabase client, Gemini client, auth/JWT
│   │   └── ai/                         ← the ML/AI layer
│   │       ├── training/               Synthetic data + XGBoost/LightGBM training
│   │       ├── inference/              Price prediction inference
│   │       ├── explainable_ai.py       Feature-contribution explanations
│   │       ├── buyer_engine.py         Geo-spatial buyer matching (haversine)
│   │       ├── sell_advisor.py         Sell now/wait recommendation engine
│   │       ├── storage_engine.py       Store vs. sell-now decision engine
│   │       ├── market_stability.py     Volatility index for the market feed
│   │       └── msp_engine.py           MSP (govt. floor price) comparison
│   └── requirements.txt
│
└── docs/
```

## Quick Start

### 1. Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # fill in real keys when you have them — see note below
uvicorn app.main:app --reload --port 8000
```

The API is now live at `http://localhost:8000` (interactive docs at `/docs`).
**No API keys are required to run the demo** — the app auto-generates synthetic
mandi-price data and trains the XGBoost/LightGBM models on first request, and
falls back to a local SQLite database if Supabase credentials aren't set.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Visit `http://localhost:3000`.

## Filling in real API keys (for the live demo/production)

Everything runs on synthetic/fallback data out of the box so you can demo it
today. Swap in real credentials in `backend/.env` when available — no code
changes are needed, since every external call already has a graceful fallback:

- `SUPABASE_URL` / `SUPABASE_KEY` / `DATABASE_URL` — point at your real Supabase project (auth + Postgres tables)
- `GEMINI_API_KEY` — enables real LLM-generated summaries and the Voice Assistant's actual answers
- `AGMARKNET_API_KEY` / `DATA_GOV_IN_API_KEY` — replace `generate_synthetic_data.py`'s output with a real ETL job into the `market_prices` table
- `OPENWEATHER_API_KEY` / `NEWS_API_KEY` — feed real weather/news context into the Sell Advisor and Market Intelligence Feed
- `GOOGLE_MAPS_API_KEY` — upgrade `buyer_engine.py`'s straight-line haversine distance to real road distance/ETA via the Distance Matrix API

## Notes on implementation decisions

- **LightGBM was kept**, not removed, per the plan to stay consistent with the
  submitted PPT — `train_price_model.py` trains both XGBoost and LightGBM and
  automatically selects whichever performs better (currently XGBoost wins on
  the synthetic dataset; this is expected to hold on real Agmarknet data too,
  but the comparison re-runs any time you retrain).
- **Explainable AI** uses a perturbation-based feature-contribution method
  (nudge each feature, see how much the prediction moves) instead of a heavy
  SHAP dependency — genuinely data-derived per request, not hardcoded text.
- **React Router** is listed in `package.json` per the agreed stack, but
  page-to-page navigation uses Next.js's built-in App Router (`next/link`,
  `next/navigation`) since that's the standard, non-conflicting way to route
  in a Next.js app — React Router is available if you need extra nested
  client-side routing inside any individual page.
- The frontend has been **built and verified** (`npm run build` passes with
  zero TypeScript errors across all 7 routes), and the backend has been
  **run and smoke-tested end-to-end** (auth, JWT, ML training + inference,
  MSP comparison, buyer geo-matching, storage advice, and the Gemini-backed
  voice assistant all return correct responses).

## What's stubbed vs. fully functional

| Feature | Status |
|---|---|
| Price prediction (XGBoost/LightGBM) | ✅ Fully functional, trained on synthetic data (swap in real Agmarknet data via the same pipeline) |
| MSP comparison | ✅ Fully functional |
| Explainable AI panel | ✅ Fully functional, real per-request computation |
| Storage advisor | ✅ Fully functional decision logic |
| Buyer geo-matching | ✅ Functional haversine distance-based matching (upgrade to Google Maps road-distance when you have a key) |
| Market intelligence feed | ✅ Functional volatility/trend computation |
| Voice Assistant | ✅ Functional UI (Web Speech API for voice-to-text) + Gemini-backed answers (falls back to a template message without a Gemini key) |
| Auth (JWT) | ✅ Fully functional register/login |
| Live Agmarknet/News/Weather ingestion | 🔲 Stubbed with synthetic data / sample headlines — swap in real API calls where marked in `services/` and `ai/training/` once you have keys |
