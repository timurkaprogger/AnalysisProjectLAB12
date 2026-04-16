import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.app.core.database import engine, Base
from backend.app.models.transaction import Transaction, RegionMapping, ProductMapping
from backend.app.models.forecast import Forecast, ModelRun

def init_db():
    print("Creating tables in PostgreSQL...")
    try:
        Base.metadata.create_all(bind=engine)
        print("Tables created successfully.")
    except Exception as e:
        print(f"Error creating tables: {e}")
        print("\nTIP: Make sure you have created the 'expense_analytics' database in PostgreSQL.")
        print("You can do this by running: CREATE DATABASE expense_analytics;")

if __name__ == "__main__":
    init_db()
