# main.py

from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from models import WaterSample
from aigua import analyze_water_dual
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="AIgua API",
    description="💧 Analyze water quality with AI-powered insights. Just provide basic test parameters and get friendly, actionable advice.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://aigua.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "AIgua API is alive 💧"}

@app.post("/api/analyze")
def analyze_water(sample: WaterSample = Body(..., example={
    "pH": 7.2,
    "TDS": 600,
    "turbidity": 3.0,
    "free_chlorine": 0.15,
    "usage": "drinking"
})):
    parameters = sample.dict()
    usage = parameters.pop("usage")
    report = analyze_water_dual(parameters, usage)
    return report

if __name__ == "__main__":
    import uvicorn
    import os

    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)