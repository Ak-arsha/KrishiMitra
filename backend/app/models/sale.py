from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, func
from app.database import Base


class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    listing_id = Column(Integer, ForeignKey("listings.id"), nullable=False)
    buyer_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    final_price = Column(Float, nullable=False)
    quantity_quintal = Column(Float, nullable=False)
    sold_at = Column(DateTime(timezone=True), server_default=func.now())
