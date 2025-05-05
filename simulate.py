import requests
import random
import time
from datetime import datetime

# Backend endpoint (change this to your actual API endpoint)
API_URL =  "https://httpbin.org/post"

# Sample animal IDs
animals = ["cow-101", "sheep-205", "horse-331", "goat-112"]

# Simulate temperature for one animal
def generate_temperature():
    # Normal range: 37.0°C to 39.0°C
    base_temp = random.uniform(37.0, 39.0)

    # 10% chance the animal has a fever (spike of +1.0 to +2.0°C)
    has_fever = random.random() < 0.1
    if has_fever:
        base_temp += random.uniform(1.0, 2.0)

    return round(base_temp, 2), has_fever

# Loop forever, simulating data
while True:
    for animal in animals:
        temp, fever = generate_temperature()

        data = {
            "animal_id": animal,
            "temperature": temp,
            "fever": fever,
            "timestamp": datetime.utcnow().isoformat()
        }

        try:
            response = requests.post(API_URL, json=data)
            print(f"Sent: {data} | Status: {response.status_code}")
        except Exception as e:
            print(f"Failed to send data for {animal}: {e}")

        time.sleep(1)  # Small delay between animals

    print("Cycle complete\n")
    time.sleep(5)  # Delay between full cycles
