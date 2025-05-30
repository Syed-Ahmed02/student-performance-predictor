FROM python:3.13.3

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

# Install system dependencies including curl for healthcheck
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./Student_Performance.csv /code/Student_Performance.csv

# Copy the app directory
COPY ./app /code/app

# Copy the .env file
COPY ./.env /code/.env

# Expose the port
EXPOSE 8000

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

# Use uvicorn to run the FastAPI application with more verbose logging
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--log-level", "debug"]