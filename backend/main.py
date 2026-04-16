from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import routes_analytics, routes_forecast, routes_data

app = FastAPI(title="Expense Analytics Platform")

# CORS setup for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Expense Analytics API is running"}

app.include_router(routes_analytics.router, prefix="/api/analytics", tags=["Analytics"])
app.include_router(routes_forecast.router, prefix="/api/forecast", tags=["Forecast"])
app.include_router(routes_data.router, prefix="/api/data", tags=["Data Injection"])
