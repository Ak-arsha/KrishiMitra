from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, func
from app.database import Base


class Listing(Base):
    __tablename__ = "listings"

    id = Column(Integer, primary_key=True, index=True)
    farmer_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    crop = Column(String, nullable=False)
    quantity_quintal = Column(Float, nullable=False)
    quality_grade = Column(String, default="A")  # A | B | C
    asking_price = Column(Float, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    status = Column(String, default="active")  # active | sold | expired
    created_at = Column(DateTime(timezone=True), server_default=func.now())
