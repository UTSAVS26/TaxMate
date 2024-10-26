# Use Python 3.9 as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY server/requirements.txt . 
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code into the container
COPY server/ . 

# Expose port 5000 for Flask
EXPOSE 5000

# Set default environment variable for Flask
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# Start the Flask application
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]