FROM python:3.13.3

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./Student_Performance.csv /code/Student_Performance.csv


# Copy the app directory
COPY ./app /code/app

# Copy the .env file
COPY ./.env /code/.env

# Expose the port
EXPOSE 8000

# Use uvicorn to run the FastAPI application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]