import requests
import os
import json
from PIL import Image

# Check if the file exists first
img_path = "mri.jpg"
if not os.path.exists(img_path):
    print(f"Error: File '{img_path}' not found")
    exit(1)

# Print image information
try:
    with Image.open(img_path) as img:
        print(f"Image size: {img.size}, format: {img.format}, mode: {img.mode}")
except Exception as e:
    print(f"Error reading image: {e}")
    exit(1)

# Send request
url = "http://127.0.0.1:5000/predict"
files = {"file": open(img_path, "rb")}
response = requests.post(url, files=files)

# Close the file after sending
files["file"].close()

# Print the response
print(f"Status Code: {response.status_code}")
data = response.json()
print(f"Response: {json.dumps(data, indent=2)}")

# Process and display the prediction in a more readable format
if "class" in data:
    print("\n=== Prediction Results ===")
    print(f"Detected: {data['class']}")
    print(f"Confidence: {data['confidence']*100:.2f}%")
    print(f"Class index: {data['class_index']}")
elif "prediction" in data and isinstance(data["prediction"], list):
    # Handle original response format
    print("\n=== Raw Prediction Values ===")
    predictions = data["prediction"][0]
    for i, prob in enumerate(predictions):
        print(f"Class {i}: {prob*100:.6f}%")
    
    # Identify highest probability class
    max_index = predictions.index(max(predictions))
    print(f"\nMost likely class: {max_index} with {predictions[max_index]*100:.6f}% confidence")
