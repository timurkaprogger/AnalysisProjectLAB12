from sqlalchemy import Column, Integer, Float, String, Date, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    date_z = Column(Date, index=True)
    region_code = Column(Integer, index=True) # Mapping to 'TE'
    location_type = Column(Integer)           # Mapping to 'MESTPOK'
    product_code = Column(Float, index=True)  # Mapping to 'KOD_TU'
    consumption_volume = Column(Float)        # Mapping to 'CUPL_POTR'
    cost_amount = Column(Float)               # Mapping to 'STOIM'
    unit_measure = Column(Float)              # Mapping to 'EDIZM'
    year = Column(Integer, index=True)        # Mapping to 'god'
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class RegionMapping(Base):
    __tablename__ = "regions"
    id = Column(Integer, primary_key=True)
    code = Column(Integer, unique=True, index=True)
    name = Column(String)

class ProductMapping(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True)
    code = Column(Float, unique=True, index=True)
    name = Column(String)
    category = Column(String)
