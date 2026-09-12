# ResQAI

**Hackathon topic:** AI Disaster Response & Rescue Coordinator

ResQAI is a React-based emergency operations interface for monitoring disaster incidents, reviewing AI detections, coordinating rescue teams, dispatching resources, and inspecting live map data. The frontend is designed to connect to a separately hosted FastAPI and YOLO11 inference service.

## Features

- Operations dashboard with live incident metrics and activity feed
- Searchable and severity-filtered incident queue
- Incident assignment, resolution, and resource deployment actions
- Interactive Leaflet map with OpenStreetMap tiles
- Incident, rescue team, hospital, and shelter markers
- AI image analysis workflow connected to `POST /predict`
- Real-time camera monitoring connected to `POST /predict_frame`
- React Router SPA navigation with Netlify refresh support
- Shared React Context state for incidents, teams, resources, reports, and alerts

## Technology

- React 18
- Vite 6
- React Router 6
- Tailwind CSS 3
- React Leaflet and Leaflet
- Lucide React
- FastAPI and Ultralytics YOLO11 backend in `backend/`

## Requirements

- Node.js 18 or newer
- npm
- Python 3.10+ only when running the optional local AI backend

## Install and run locally

```bash
npm install
npm run dev
```

The frontend is available at `http://localhost:5173`.

To run the optional local inference backend in a separate terminal:

```bash
cd backend
python -m pip install -r requirements.txt
python main.py
```

The backend runs at `http://127.0.0.1:8000` and exposes:

- `GET /health`
- `POST /predict`
- `POST /predict_frame`

## Backend API configuration

The frontend uses the local backend by default. For a deployed backend, configure this Netlify environment variable:

```text
VITE_API_BASE_URL=https://your-api.example.com
```

Do not put API keys, tokens, credentials, or private URLs in source files. Vite exposes variables prefixed with `VITE_` to the browser, so only public service URLs belong there.

## Production build

```bash
npm run build
npm run preview
```

The Vite output is written to `dist/`.

## Netlify deployment

This repository includes `netlify.toml` with the correct settings:

- Build command: `npm run build`
- Publish directory: `dist`
- SPA fallback: all routes rewrite to `/index.html`

Connect the GitHub repository to Netlify. Netlify will build and deploy pushes automatically. Set `VITE_API_BASE_URL` in Netlify Site configuration when the separate FastAPI backend is deployed.

Public frontend: https://buildwithbharat2.netlify.app

Netlify deploy dashboard: https://app.netlify.com/projects/buildwithbharat2/deploys

## GitHub workflow

If this directory is already connected to a GitHub remote:

```bash
git status
git add .
git commit -m "Prepare ResQAI for deployment"
git push
```

For a new repository that has not been initialized or connected:

```bash
git init
git add .
git commit -m "Prepare ResQAI for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Replace the remote URL with the repository you create on GitHub.

## Model and repository safety

The trained `best.pt` file is kept outside the frontend build and is ignored by Git. It should remain on the backend host or in private model storage. Do not publish model weights, credentials, `.env` files, generated build output, or private datasets in the frontend repository.

## Future backend integration

The current frontend is ready for a separately deployed FastAPI service. The YOLO11 backend can be hosted independently with CORS configured for the Netlify site domain. Set `VITE_API_BASE_URL` to that public backend URL and redeploy the frontend.
