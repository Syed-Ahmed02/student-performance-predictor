import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
app = FastAPI()


from .model import predict_linear_regression

load_dotenv(dotenv_path="../.env")

allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

# Add CORS middleware to handle browser preflight requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

class StudentData(BaseModel):
    hours_studied: int
    previous_scores: int
    extracurricular_activities: bool
    sleep_hours: int
    sample_papers_practiced: int


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/predict_performance")
async def predict_performance(data: StudentData):
    extracurricular_activities = 1 if data.extracurricular_activities else 0

    prediction = predict_linear_regression(
        data.hours_studied, 
        data.previous_scores, 
        extracurricular_activities, 
        data.sleep_hours, 
        data.sample_papers_practiced
    )
    return {"prediction": prediction}

