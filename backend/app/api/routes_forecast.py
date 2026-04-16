from fastapi import APIRouter, HTTPException
import joblib
import os
import pandas as pd

import json

router = APIRouter()

# Load model and metrics on startup
MODEL_PATH = "models/rf_baseline.joblib"
METRICS_PATH = "models/metrics.json"

model = None
metrics_data = None

if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)
if os.path.exists(METRICS_PATH):
    with open(METRICS_PATH, "r") as f:
        metrics_data = json.load(f)

@router.get("/metrics")
async def get_model_metrics():
    if metrics_data is None:
        raise HTTPException(status_code=503, detail="Metrics not available.")
    return metrics_data

@router.get("/predict")
async def predict_expense(region_code: int, month: int, year: int, location_type: int = 1, product_code: float = 1171001.0):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not trained yet.")
    
    try:
        # Prepare input features
        X = pd.DataFrame([{
            'region_code': region_code,
            'location_type': location_type,
            'product_code': product_code,
            'year': year,
            'month': month
        }])
        
        prediction = model.predict(X)[0]
        return {
            "region_code": region_code,
            "predicted_cost": round(float(prediction), 2),
            "confidence": 0.08 # Placeholder for real confidence/R2
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
