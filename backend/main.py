from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import torch
from torchvision import transforms
from PIL import Image
import io

from model import TinyVGG

# Setup device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Model parameters (update if needed)
hidden_units = 32
output_shape = 11  # number of classes

# Initialize and load model weights
model = TinyVGG(input_shape=3, hidden_units=hidden_units, output_shape=output_shape)
model.load_state_dict(torch.load("model_010_state_dict-2.pkl", map_location=device))
model.to(device)
model.eval()

# Class names (update with your classes)
class_names = [
    "Bacterial_spot", 
    "Early_blight", 
    "Late_blight", 
    "Leaf_Mold",
    "Septoria_leaf_spot", 
    "Spider_mites Two-spotted_spider_mite", 
    "Target_Spot",
    "Tomato_Yellow_Leaf_Curl_Virus", 
    "Tomato_mosaic_virus", 
    "Tomato___healthy",
    "powdery_mildew"
]



# Image preprocessing pipeline - MUST match training exactly!
transform = transforms.Compose([
    transforms.Resize((224, 224)),  # Same as training
    transforms.ToTensor(),          # Same as training - no normalization!
])

app = FastAPI()

# CORS middleware for frontend access (adjust origins for production)
# CORS middleware for frontend access (adjust origins for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",                           # for local dev
        "https://tomato-lef-detection.vercel.app",         # your deployed frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    input_tensor = transform(image).unsqueeze(0).to(device)
    
    with torch.no_grad():
        outputs = model(input_tensor)
        probabilities = torch.softmax(outputs, dim=1)
        predicted_idx = torch.argmax(outputs, dim=1).item()
        predicted_label = class_names[predicted_idx]
        confidence = probabilities[0][predicted_idx].item()
        
        # Return top 3 predictions for debugging
        top3_probs, top3_indices = torch.topk(probabilities[0], 3)
        top3_predictions = [(class_names[idx.item()], prob.item()) 
                           for idx, prob in zip(top3_indices, top3_probs)]
    
    return {
        "prediction": predicted_label,
        "confidence": confidence,
        "top3_predictions": top3_predictions
    }
