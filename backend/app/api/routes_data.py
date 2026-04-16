from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from pydantic import BaseModel
from datetime import date
from ..core.database import get_db
from ..models.transaction import Transaction
from sqlalchemy import insert

router = APIRouter()

class TransactionCreate(BaseModel):
    date_z: date
    region_code: int
    location_type: int
    product_code: float
    consumption_volume: float
    cost_amount: float
    unit_measure: float
    year: int

@router.post("/upload")
async def upload_data(transactions: List[TransactionCreate], db: AsyncSession = Depends(get_db)):
    try:
        # Convert Pydantic models to dicts
        values = [t.dict() for t in transactions]
        
        # Bulk insert
        await db.execute(insert(Transaction).values(values))
        await db.commit()
        
        return {"message": f"Successfully injected {len(transactions)} records for future analysis."}
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
