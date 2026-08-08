"""
Gemini API wrapper — used for:
  1. News/market summarization (Market Intelligence Feed)
  2. Turning structured sell-advice JSON into a natural-language explanation
  3. Answering free-text queries for the Voice Assistant

Falls back to a deterministic template response when GEMINI_API_KEY isn't
set, so the app is fully demoable without a live key.
"""
from app.config import settings

_configured = False


def _configure():
    global _configured
    if _configured or not settings.GEMINI_API_KEY:
        return
    import google.generativeai as genai
    genai.configure(api_key=settings.GEMINI_API_KEY)
    _configured = True


def generate_text(prompt: str, fallback: str) -> str:
    _configure()
    if not settings.GEMINI_API_KEY:
        return fallback
    try:
        import google.generativeai as genai
        for model_name in ["gemini-flash-latest", "gemini-2.0-flash", "gemini-2.5-flash", "gemini-pro-latest"]:
            try:
                model = genai.GenerativeModel(model_name)
                response = model.generate_content(prompt)
                if response.text:
                    return response.text.strip()
            except Exception:
                continue
        return fallback
    except Exception:
        return fallback


def summarize_market_news(crop: str, headlines: list[str]) -> str:
    prompt = (
        f"Summarize in 2-3 short sentences, for a farmer, what these recent "
        f"headlines about {crop} mean for market prices:\n" + "\n".join(headlines)
    )
    fallback = (
        f"No live news feed configured — based on price data alone, monitor {crop} "
        f"mandi prices over the next few weeks before deciding when to sell."
    )
    return generate_text(prompt, fallback)


def narrate_sell_advice(advice: dict) -> str:
    prompt = (
        "Explain this crop-selling recommendation in 2-3 plain-language sentences "
        f"a farmer with no technical background can understand: {advice}"
    )
    return generate_text(prompt, advice.get("reasoning_summary", ""))


def answer_voice_query(query: str, context: dict) -> str:
    prompt = (
        f"You are KrishiMitra, a farming assistant. Answer this farmer's question "
        f"concisely using this context data: {context}\n\nQuestion: {query}"
    )
    fallback = "I couldn't reach the language model right now — please check GEMINI_API_KEY in .env."
    return generate_text(prompt, fallback)
