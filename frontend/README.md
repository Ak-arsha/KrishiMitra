# KrishiMitra 🌾

AI-powered farm advisory & multi-role mandi platform — built for production deployment.
Implements **AI Sell Advisor**, **Buyer Recommendation Engine**, **Explainable AI Panel**, **Market Intelligence Feed**, **Voice Assistant**, and **Storage Advisor**.

```
Frontend (Next.js 14) → Native Serverless AI Engine → Role-Isolated Output
```

## Tech Stack

| Layer | Stack |
|---|---|
| **Frontend** | Next.js 14, React 18, Tailwind CSS, Framer Motion, Lucide React, Recharts, Axios |
| **Backend & APIs** | Next.js Native Serverless Routes & REST APIs (`app/api/*`) |
| **Authentication** | JWT Bearer Authentication + Google OAuth Integration (`/api/auth/google`) |
| **AI Models & Engines** | KrishiMitra AI Engine, Machine Learning Ensembles, Price Trend Models |
| **LLM Integration** | Voice Speech Synthesis & Interactive AI Assistant |
| **Data & APIs** | Agmarknet, Data.gov.in, Mandi Market Intelligence Feed |
| **Deployment** | Vercel |

---

## Project Structure

```
KrishiMitra/
├── app/                                Next.js App Router (Production)
│   ├── page.tsx                        Landing Page & Dashboard Router
│   ├── login/                          Email & Google Sign-In Page
│   ├── signup/                         Multi-Role Account Registration (Farmer / Buyer / Investor / Trader)
│   ├── dashboard/                      Role-Isolated Dashboard (Farmer / Buyer / Investor / Trader)
│   ├── sell-advisor/                   AI Sell Advisor
│   ├── buyer-recommendations/          Buyer Recommendation Engine
│   ├── market-intelligence/            Market Intelligence Feed
│   ├── explainable-ai/                 Explainable AI Panel
│   ├── voice-assistant/                Voice Assistant (Speech Synthesis + KrishiMitra AI)
│   ├── storage-advisor/                Storage Advisor
│   └── api/                            Native Serverless REST API Endpoints
├── components/                         UI Components & Visualizations
└── lib/                                Axios API client + AuthContext
```

---

## Feature Status

| Feature | Status | Implementation Details |
|---|---|---|
| **Multi-Role Isolation** | ✅ Fully Functional | Strict role dashboards for Farmers, Buyers, Investors, and Traders. |
| **Email & Google Auth** | ✅ Fully Functional | Fail-safe authentication with 1-click Google OAuth simulation and Demo Logins. |
| **Price Prediction** | ✅ Fully Functional | 5-day and 30-day crop price series for Wheat, Mustard, Soybean, Paddy, Tomato, etc. |
| **MSP Comparison** | ✅ Fully Functional | Benchmarked against official Government MSP floor prices. |
| **Storage Advisor** | ✅ Fully Functional | Store vs. sell decision engine based on 30-day projected ROI. |
| **Buyer Matching** | ✅ Fully Functional | Geo-spatial distance ranking for verified local mandi buyers. |
| **Voice Assistant** | ✅ Fully Functional | Multilingual Voice & Text AI Assistant for all roles. |
