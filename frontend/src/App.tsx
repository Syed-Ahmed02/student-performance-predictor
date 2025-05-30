import React, { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import { roasts } from "./lib/data";
interface FormData {
  hours_studied: number;
  previous_scores: number;
  extracurricular_activities: boolean;
  sleep_hours: number;
  sample_papers_practiced: number;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    hours_studied: 0,
    previous_scores: 0,
    extracurricular_activities: false,
    sleep_hours: 0,
    sample_papers_practiced: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
    setRandomNum(Math.floor(Math.random() * 3));
  };

  const [randomNum, setRandomNum] = useState(Number);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Student Performance Data:", formData);
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${backendUrl}/predict_performance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const result = await res.json();
        console.log("Prediction result:", result);
        if (result.prediction <= 25) {
          toast(`Predicted performance: ${result.prediction}% 
               ${roasts["0-25"][randomNum]}
            `);
        } else if (result.prediction > 25 && result.prediction <= 50) {
          toast(`Predicted performance: ${result.prediction}% 
               ${roasts["25-50"][randomNum]}
            `);
        } else if (result.prediction > 50 && result.prediction <= 75) {
          toast(`Predicted performance: ${result.prediction}% 
               ${roasts["50-75"][randomNum]}
            `);
        } else if (result.prediction > 75) {
          toast(`Predicted performance: ${result.prediction}% 
               ${roasts["75-100"][randomNum]}
            `);
        }
      } else {
        console.error("Failed to get prediction");
        toast.error("Failed to get prediction. Please try again.");
      }
    } catch (e) {
      console.log("Error:", e);
      toast.error("Error connecting to server. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen flex w-full">
      <div className="flex flex-col mx-auto mt-8 gap-6 items-center max-w-2xl px-4">
        <div className="text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold max-w-4xl text-center leading-tight">
            Got an exam soon and wondered how well you're{" "}
            <span className="underline text-yellow-400 text-5xl md:text-6xl">
              prepared?
            </span>{" "}
            🤔
          </h1>
          <h2 className="text-gray-300 text-xl md:text-2xl mt-4">
            Fill out this form and let our AI predict your performance!
          </h2>
          <h2 className="text-gray-300 text-sm md:text-md mt-4">
            (be prepared to get roasted)
          </h2>
        </div>

        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Performance Predictor
              </h3>
              <p className="text-gray-600 text-sm">We are judging you 😐</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                📚 Hours Studied (per week)
              </label>
              <input
                type="number"
                name="hours_studied"
                onChange={handleInputChange}
                className="w-full h-10 text-sm rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none px-4 py-2 text-gray-800 transition-colors"
                placeholder="e.g., 20"
                min="0"
                max="168"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                📊 Previous Test Scores (average %)
              </label>
              <input
                type="number"
                name="previous_scores"
                onChange={handleInputChange}
                className="w-full h-10 text-sm rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none px-4 py-2 text-gray-800 transition-colors"
                placeholder="e.g., 85"
                min="0"
                max="100"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                😴 Sleep Hours (per night)
              </label>
              <input
                type="number"
                name="sleep_hours"
                onChange={handleInputChange}
                className="w-full h-10 text-sm rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none px-4 py-2 text-gray-800 transition-colors"
                placeholder="e.g., 7"
                min="0"
                max="24"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                📝 Sample Papers Practiced
              </label>
              <input
                type="number"
                name="sample_papers_practiced"
                onChange={handleInputChange}
                className="w-full h-10 text-sm rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none px-4 py-2 text-gray-800 transition-colors"
                placeholder="e.g., 5"
                min="0"
                required
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="extracurricular_activities"
                checked={formData.extracurricular_activities}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm font-medium text-gray-700">
                🎯 I participate in extracurricular activities
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Am I cooked?
            </button>
            <ToastContainer
            position="top-center"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
