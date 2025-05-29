from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from analysis import predict_linear_regression

app = FastAPI()

# Add CORS middleware to handle browser preflight requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  #
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

