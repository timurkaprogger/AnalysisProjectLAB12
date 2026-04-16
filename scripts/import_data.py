import polars as pl
import pandas as pd
from sqlalchemy import create_engine
import sys
import os
import time

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from backend.app.core.config import settings

def import_data(file_path: str):
    print(f"Starting import from {file_path}...")
    start_all = time.time()
    
    # Engine for bulk inserts
    engine = create_engine(settings.DATABASE_URL)
    
    # Read CSV using Polars
    # We use scan_csv for lazy evaluation if we wanted, 
    # but for initial import we can just read in chunks or full if memory allows.
    # 1.7GB fits comfortably in 16GB RAM with Polars.
    
    try:
        print("Reading CSV with Polars...")
        df = pl.read_csv(file_path, ignore_errors=True)
        print(f"Loaded {len(df)} rows.")
        
        # Select and rename columns
        # Mapping: TE->region_code, MESTPOK->location_type, KOD_TU->product_code, 
        # CUPL_POTR->consumption_volume, STOIM->cost_amount, EDIZM->unit_measure, god->year, DATE_Z->date_z
        
        selected_columns = {
            "DATE_Z": "date_z",
            "TE": "region_code",
            "MESTPOK": "location_type",
            "KOD_TU": "product_code",
            "CUPL_POTR": "consumption_volume",
            "STOIM": "cost_amount",
            "EDIZM": "unit_measure",
            "god": "year"
        }
        
        # Filter only existing columns just in case
        cols_to_use = [c for c in df.columns if c in selected_columns]
        df = df.select(cols_to_use).rename({c: selected_columns[c] for c in cols_to_use})
        
        # Convert date_z to actual date
        df = df.with_columns(pl.col("date_z").str.to_date(format="%Y-%m-%d", strict=False))
        
        # Drop rows with null dates or costs if necessary
        df = df.drop_nulls(subset=["date_z", "cost_amount"])
        
        print(f"Data cleaned. {len(df)} rows remaining.")
        
        # Insert in chunks using pandas to_sql (easiest for small-medium tables)
        # For 1.7GB, we'll do chunks of 100k
        chunk_size = 100000
        total_chunks = (len(df) // chunk_size) + 1
        
        print(f"Inserting into PostgreSQL in {total_chunks} chunks...")
        
        for i in range(total_chunks):
            start = i * chunk_size
            end = (i + 1) * chunk_size
            chunk = df[start:end].to_pandas()
            
            if not chunk.empty:
                chunk.to_sql("transactions", con=engine, if_exists="append", index=False, method="multi")
                print(f"Progress: {((i+1)/total_chunks)*100:.1f}% ({end} rows)")
        
        end_all = time.time()
        print(f"Import completed successfully in {end_all - start_all:.1f} seconds.")
        
    except Exception as e:
        print(f"Error during import: {e}")

if __name__ == "__main__":
    csv_file = "synthetic_D003.csv"
    if os.path.exists(csv_file):
        import_data(csv_file)
    else:
        print(f"File {csv_file} not found.")
