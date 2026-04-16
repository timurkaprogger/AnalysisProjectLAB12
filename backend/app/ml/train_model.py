import pandas as pd
from sqlalchemy import create_engine
import sys
import os
import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score, mean_squared_error
import numpy as np
import json

sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from backend.app.core.config import settings

def train_baseline():
    print("Connecting to DB for training data...")
    engine = create_engine(settings.DATABASE_URL)
    
    # We select a sample for baseline training or full if possible
    # For 19M rows, we'll take a representative sample of 1M for the first iteration
    query = "SELECT region_code, location_type, product_code, year, EXTRACT(MONTH FROM date_z) as month, cost_amount FROM transactions LIMIT 1000000"
    
    print("Loading sample data...")
    df = pd.read_sql(query, engine)
    
    if df.empty:
        print("No data found for training.")
        return

    print("Preprocessing...")
    X = df[['region_code', 'location_type', 'product_code', 'year', 'month']]
    y = df['cost_amount']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print(f"Training Random Forest on {len(X_train)} rows...")
    model = RandomForestRegressor(n_estimators=50, max_depth=10, n_jobs=-1, random_state=42)
    model.fit(X_train, y_train)
    
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    r2 = r2_score(y_test, y_pred)
    
    print(f"Model trained. MAE: {mae:.2f}, RMSE: {rmse:.2f}, R2: {r2:.2f}")
    
    # Save model and metadata
    os.makedirs("models", exist_ok=True)
    joblib.dump(model, "models/rf_baseline.joblib")
    
    # Extract feature importances
    feature_names = X_train.columns.tolist()
    importances = model.feature_importances_.tolist()
    feature_importance_dict = dict(zip(feature_names, importances))
    
    metrics = {
        "mae": round(float(mae), 2),
        "rmse": round(float(rmse), 2),
        "r2": round(float(r2), 4),
        "train_rows": len(X_train),
        "model_type": "RandomForestRegressor",
        "feature_importance": feature_importance_dict
    }
    with open("models/metrics.json", "w") as f:
        json.dump(metrics, f)
        
    print("Model and metrics saved.")

if __name__ == "__main__":
    train_baseline()
