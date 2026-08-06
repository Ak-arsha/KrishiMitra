from sqlalchemy import Column, Integer, String, Float, Date
from app.database import Base


class MarketPrice(Base):
    """
    Historical / daily mandi price records.
    In production this table is populated by a scheduled job pulling from
    Agmarknet + data.gov.in; for the demo it's seeded with synthetic data
    (see app/ai/training/generate_synthetic_data.py).
    """
    __tablename__ = "market_prices"

    id = Column(Integer, primary_key=True, index=True)
    crop = Column(String, index=True, nullable=False)
    market = Column(String, index=True, nullable=False)
    state = Column(String, nullable=False)
    min_price = Column(Float, nullable=False)
    max_price = Column(Float, nullable=False)
    modal_price = Column(Float, nullable=False)
    date = Column(Date, index=True, nullable=False)
