from fastapi import FastAPI
from analysis import predict_linear_regression
app = FastAPI()


@app.get("/predict_performance/{hours_studied}/{hours_slept}/{extracurricular_activities}/{sleep_hours}/{sample_papers_pratices}")
async def predict_performance(
    hours_studied: int,
    previous_scores: int,
    extracurricular_activities: bool,
    sleep_hours: int,
    sample_papers_pratices:int,
):
    # Convert boolean to int
    extracurricular_activities = 1 if extracurricular_activities else 0

    # Make the prediction
    prediction = predict_linear_regression(hours_studied, previous_scores, extracurricular_activities, sleep_hours, sample_papers_pratices)
    return {"prediction": prediction}

