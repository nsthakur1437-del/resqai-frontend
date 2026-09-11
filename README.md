# ResQAI — AI Disaster Response & Rescue Coordinator
> *"Nature Warns. We Act."*
> **Core Concept:** An AI-powered disaster command center that converts chaotic emergency reports into prioritized rescue actions.

---

## 🌟 Hackathon Presentation Guide (10–15 Second Explainer)

ResQAI is built specifically to allow judges to understand the entire workflow in **under 15 seconds**:

```
🚨 EMERGENCY REPORT
       ↓
🤖 AI UNDERSTANDS THE SITUATION
       ↓
🔴 IDENTIFIES PRIORITY
       ↓
🗺️ SHOWS INCIDENT ON MAP
       ↓
🚑 RECOMMENDS BEST RESCUE TEAM
       ↓
✅ RESCUE ACTION (1-Click Dispatch)
```

---

## 🚀 Key Features & 8 Interactive Pages

1. **🏠 Dashboard (`/`)**:
   - **4 Prominent Metrics**: Active Incidents (12), Critical Cases (5), People Affected (47), Available Rescue Teams (8).
   - **"How ResQAI Helps" Interactive Explainer Bar**: 6-step interactive workflow.
   - **Live 2-Column Split**:
     - *Left*: High-contrast GIS Disaster Map with real-time incident pins, hospital beds, and road blockades.
     - *Right*: **AI Rescue Recommendation Panel** featuring the Critical Bridge A flood, Rescue Team 3 recommendation (98% match score), and a live **ASSIGN RESCUE TEAM** button with confetti, sound feedback, and real-time state mutation.
   - **Live Rescue Updates Stream**: Real-time ticker of incoming reports and team dispatches.

2. **📩 Emergency Reports (`/reports`)**:
   - Live citizen SOS and telemetry distress feed.
   - **Interactive SOS Ingestion Box**: Judges can type or pick emergency presets to test the autonomous AI NLP extraction pipeline live.
   - **AI Understanding Inspector**: Shows raw text vs structured entity breakdown (Location, Victims, Disaster Type, Priority Score P1-P4, Medical Urgency, Key Named Entities).

3. **🚨 Active Incidents (`/incidents`)**:
   - Filter tabs: `All`, `Critical`, `High`, `Moderate`, `Resolved`.
   - Real-time incident table with severity color badges (Red = Critical, Orange = High, Yellow = Moderate, Green = Resolved).
   - Modal inspection with complete incident timelines and equipment requirements.

4. **🗺️ Live Disaster Map (`/map`)**:
   - Dedicated full-screen GIS command map.
   - Layer toggles for Incidents, Rescue Teams, Hospitals, Shelters, and Road Blockades.
   - Clickable interactive pins with popup briefings and direct dispatch actions.

5. **🚑 Rescue Coordination (`/coordination`)**:
   - **AI Recommended Assignment Hero**: 98% match score breakdown with rationale checklist.
   - Full 8-team roster with specialized equipment (Rescue Boats, Heavy Extrication, Thermal Drones, Mobile Trauma Surgery, K9 Detection).

6. **🏥 Emergency Resources (`/resources`)**:
   - Real-time telemetry for Hospitals, Shelters, Fire Stations, Police Posts, and Helipads.
   - Available bed counts, ICU availability, oxygen reserve status, and food intake duration.

7. **🛰️ AI Vision Analysis (`/vision`)**:
   - **AI Vision Prototype** demonstration for satellite and drone flood segmentation.
   - Layer toggles: *Raw Satellite*, *AI Flood Mask Only*, *Combined AI Overlay*.
   - Instant **"ADD TO DISASTER MAP"** action creating new live geofenced incidents.

8. **⚙️ Settings (`/settings`)**:
   - Commander profile management, notification triggers, AI confidence threshold, and **"Reset Demo State"** button.

---

## 🛠️ Technology Stack

- **React 18** (Clean functional components, Hooks & Context API)
- **Vite 6** (Blazing fast HMR and optimized production build)
- **Tailwind CSS 3** (Custom deep-navy command center design system, glassmorphism, glowing status badges)
- **React Router 6** (Seamless multi-page navigation)
- **Lucide React** (Modern high-clarity iconography)
- **Leaflet & React-Leaflet** (GIS mapping with dark CartoDB tiles and animated radar pins)
- **Web Audio API Sound Engine** (Subtle synthesized futuristic audio chimes without external audio dependencies)
- **Canvas Confetti** (Rewarding visual feedback on rescue team dispatches)

---

## 💻 Running the Application Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser:
http://localhost:3000
```
