import polars as pl
import psycopg2
import sys
import os
import time

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from backend.app.core.config import settings

def import_data_ultra_fast(file_path: str):
    print(f"Starting ULTRA FAST import from {file_path}...")
    start_all = time.time()
    
    conn = psycopg2.connect(
        dbname=settings.DB_NAME,
        user=settings.DB_USER,
        password=settings.DB_PASSWORD,
        host=settings.DB_HOST,
        port=settings.DB_PORT
    )
    cursor = conn.cursor()
    
    temp_csv = "temp_import.csv"
    
    try:
        print("Reading CSV with Polars...")
        df = pl.read_csv(file_path, ignore_errors=True)
        
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
        
        cols_to_use = [c for c in df.columns if c.strip() in selected_columns]
        df = df.select(cols_to_use).rename({c: selected_columns[c.strip()] for c in cols_to_use})
        
        # Format date_z
        df = df.with_columns(pl.col("date_z").str.to_date(format="%Y-%m-%d", strict=False))
        
        # KEY FIX: Ensure all columns are handled for nulls/empty strings
        for col_name in df.columns:
            # If it's string-like, replace empty with None
            if df[col_name].dtype == pl.Utf8:
                df = df.with_columns(pl.col(col_name).replace("", None))
            # Drop any nulls in this column
            df = df.filter(pl.col(col_name).is_not_null())
            
        # Cast integer columns to Int32
        int_cols = ["region_code", "location_type", "year"]
        for col in int_cols:
            if col in df.columns:
                df = df.with_columns(pl.col(col).cast(pl.Int32))
        
        print(f"Cleaning finished. {len(df)} rows ready.")
        if len(df) > 0:
            print("Row 1 sample:", df[0].to_dicts()[0])
        
        df.write_csv(temp_csv, separator='\t', include_header=False)
        
        print("Truncating table...")
        cursor.execute("TRUNCATE TABLE transactions;")
        conn.commit()

        print("Executing COPY command from file...")
        columns_str = ", ".join([df.columns[i] for i in range(len(df.columns))])
        copy_sql = f"COPY transactions ({columns_str}) FROM STDIN WITH DELIMITER '\t';"
        
        with open(temp_csv, 'r') as f:
            cursor.copy_expert(copy_sql, f)
        
        conn.commit()
        print(f"ULTRA FAST Import completed successfully in {time.time() - start_all:.1f} seconds.")
        
    except Exception as e:
        print(f"Error during ULTRA FAST import: {e}")
        conn.rollback()
    finally:
        cursor.close()
        conn.close()
        time.sleep(1)
        if os.path.exists(temp_csv):
            try:
                os.remove(temp_csv)
            except:
                pass

if __name__ == "__main__":
    csv_file = "synthetic_D003.csv"
    if os.path.exists(csv_file):
        import_data_ultra_fast(csv_file)
    else:
        print(f"File {csv_file} not found.")
