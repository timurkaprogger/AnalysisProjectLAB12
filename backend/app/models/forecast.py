from sqlalchemy import Column, Integer, Float, String, Date, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class Forecast(Base):
    __tablename__ = "forecasts"

    id = Column(Integer, primary_key=True, index=True)
    forecast_date = Column(Date, index=True)
    region_code = Column(Integer)
    product_code = Column(Float)
    predicted_cost = Column(Float)
    model_name = Column(String)
    rmse = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class ModelRun(Base):
    __tablename__ = "model_runs"

    id = Column(Integer, primary_key=True, index=True)
    model_name = Column(String)
    train_date = Column(DateTime(timezone=True), server_default=func.now())
    train_rows = Column(Integer)
    rmse = Column(Float)
    mae = Column(Float)
    r2 = Column(Float)
    notes = Column(String)
