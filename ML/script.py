import uvicorn
from fastapi import FastAPI, File, UploadFile
from transformers import pipeline
import fitz  # PyMuPDF for PDF processing

# Initialize FastAPI app
app = FastAPI()

# Load a Hugging Face sentiment analysis model
model = pipeline("sentiment-analysis")

def extract_text_from_pdf(pdf_file):
    """Extract text from a PDF file."""
    doc = fitz.open(pdf_file)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

@app.post("/predict_pdf")
async def predict_pdf(file: UploadFile = File(...)):
    """Process PDF and return sentiment analysis."""
    # Save uploaded file temporarily
    temp_file = f"temp_{file.filename}"
    with open(temp_file, "wb") as f:
        f.write(await file.read())

    # Extract text from PDF
    text = extract_text_from_pdf(temp_file)

    # Run sentiment analysis on extracted text
    result = model(text[:512])  # Limit to 512 characters for processing

    return {"text": text[:200] + "...", "label": result[0]["label"], "score": result[0]["score"]}

# Run API
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
