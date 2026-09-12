from pathlib import Path

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError
from ultralytics import YOLO
import io


BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "best.pt"

app = FastAPI(title="ResQAI YOLO11 Inference API")
app.add_middleware(
	CORSMiddleware,
	allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://127.0.0.1:3000"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

model = None
model_error = None

try:
	if not MODEL_PATH.is_file():
		raise FileNotFoundError(f"Model file not found: {MODEL_PATH}")
	model = YOLO(str(MODEL_PATH))
except Exception as exc:
	model_error = str(exc)


def run_inference(image: Image.Image) -> dict:
	if model is None:
		raise HTTPException(status_code=503, detail=f"YOLO model is unavailable: {model_error}")

	try:
		result = model.predict(source=image, verbose=False)[0]
		detections = []
		names = result.names or {}

		if result.boxes is not None:
			for box in result.boxes:
				coordinates = box.xyxy[0].tolist()
				class_id = int(box.cls[0].item())
				confidence = float(box.conf[0].item())
				detections.append(
					{
						"bbox": {
							"x1": coordinates[0],
							"y1": coordinates[1],
							"x2": coordinates[2],
							"y2": coordinates[3],
						},
						"confidence": confidence,
						"class": names.get(class_id, str(class_id)),
						"class_id": class_id,
					}
				)

		max_confidence = max((item["confidence"] for item in detections), default=0.0)
		risk_level = "HIGH" if max_confidence >= 0.75 else "MEDIUM" if detections else "LOW"
		height, width = image.height, image.width
		return {
			"success": True,
			"detections": detections,
			"total_detections": len(detections),
			"max_confidence": max_confidence,
			"risk_level": risk_level,
			"image_size": {"width": width, "height": height},
		}
	except HTTPException:
		raise
	except Exception as exc:
		raise HTTPException(status_code=500, detail=f"YOLO inference failed: {exc}") from exc


async def read_image(file: UploadFile) -> Image.Image:
	if not file.content_type or not file.content_type.startswith("image/"):
		raise HTTPException(status_code=415, detail="Please upload a valid image file.")

	try:
		image = Image.open(io.BytesIO(await file.read()))
		image.load()
		return image.convert("RGB")
	except (UnidentifiedImageError, OSError) as exc:
		raise HTTPException(status_code=400, detail="The uploaded file is not a readable image.") from exc


@app.get("/health")
def health() -> dict:
	return {
		"status": "ok",
		"backend": "online",
		"model": "loaded" if model is not None else "unavailable",
		"model_status": "ACTIVE" if model is not None else "UNAVAILABLE",
		"model_path": str(MODEL_PATH),
		"error": model_error,
	}


@app.post("/predict")
async def predict(file: UploadFile = File(...)) -> dict:
	return run_inference(await read_image(file))


@app.post("/predict_frame")
async def predict_frame(file: UploadFile = File(...)) -> dict:
	return run_inference(await read_image(file))


if __name__ == "__main__":
	import uvicorn

	uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=False)