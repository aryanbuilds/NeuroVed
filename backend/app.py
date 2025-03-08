from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image
import io

app = Flask(__name__)

# Load the trained model
model = load_model("brain_tumor.h5")

# Function to preprocess image
def preprocess_image(image):
    # Print original image details for debugging
    print(f"Original image size: {image.size}, mode: {image.mode}")
    
    image = image.convert("RGB")  # Ensure 3-channel image
    image = image.resize((299, 299))  # Resize to match model input
    image_array = np.array(image) / 255.0   # Normalize pixel values (0-1)
    image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension (1, 299, 299, 3)
    
    # Print shape after processing
    print(f"Processed image shape: {image_array.shape}")
    
    return image_array

# Class labels
CLASS_LABELS = [
    "no_tumor", 
    "glioma_tumor", 
    "meningioma_tumor", 
    "pituitary_tumor"
]

@app.route("/predict", methods=["POST"])
def predict():
    try:
        if not request.files:
            return jsonify({"error": "No files uploaded"}), 400

        results = {}
        for filename, file in request.files.items():
            try:
                # Process each image
                image = Image.open(io.BytesIO(file.read()))
                input_data = preprocess_image(image)
                
                # Make prediction
                raw_prediction = model.predict(input_data)
                
                # Get the predicted class index and probability
                class_index = np.argmax(raw_prediction[0])
                confidence = float(raw_prediction[0][class_index])
                predicted_class = CLASS_LABELS[class_index]
                
                # Store result for this image
                results[filename] = {
                    "prediction": raw_prediction.tolist(),
                    "class": predicted_class,
                    "confidence": confidence,
                    "class_index": int(class_index)
                }
                
            except Exception as e:
                results[filename] = {"error": str(e)}
        
        return jsonify({
            "results": results,
            "count": len(results)
        })

    except Exception as e:
        import traceback
        print(traceback.format_exc())  # Print full error traceback for debugging
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
