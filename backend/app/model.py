#import the necessary libaries 
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import SGDRegressor
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from sklearn.metrics import mean_absolute_error
import os

current_dir = os.path.dirname(__file__)
csv_path = os.path.join(current_dir, '..', 'Student_Performance.csv')

np.set_printoptions(precision=2)

df=pd.read_csv(csv_path)

X = df[["Hours Studied","Previous Scores","Extracurricular Activities","Sleep Hours","Sample Question Papers Practiced"]] 
y = df["Performance Index"]



#Encode Extra Curricular Activities
X.loc[:, "Extracurricular Activities"] = X["Extracurricular Activities"].map({"Yes":1,"No":0})
X_features = ["Hours Studied","Previous Scores","Extracurricular Activities","Sleep Hours","Sample Question Papers Practiced"]



scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)


X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)


model = LinearRegression()
model.fit(X_train, y_train)




y_pred = model.predict(X_test)

mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)


def predict_linear_regression(hours_studied, previous_scores, extracurricular_activities, sleep_hours, sample_question_papers_practiced):
    # Create a new data point
    new_data = pd.DataFrame({
        "Hours Studied": [hours_studied],
        "Previous Scores": [previous_scores],
        "Extracurricular Activities": [extracurricular_activities],
        "Sleep Hours": [sleep_hours],
        "Sample Question Papers Practiced": [sample_question_papers_practiced]
    })

    # Scale the new data
    new_data_scaled = scaler.transform(new_data)

    # Make the prediction
    predicted_performance = model.predict(new_data_scaled)

    return predicted_performance[0].round(2) 

