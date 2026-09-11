import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Sparkles,
  AlertTriangle,
  Ambulance,
  Building2,
  Home,
  ShieldAlert,
  CheckCircle2,
  Navigation,
  Radio,
  Layers,
  Zap,
  Clock,
  Eye,
  Crosshair,
  Hospital,
  AlertOctagon,
  ArrowRight,
  Check,
  X,
  Compass,
  LifeBuoy,
  Flame,
  Activity,
  Send,
  HelpCircle,
  RotateCcw,
  Users,
  Shield,
  Filter
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useDisaster } from '../context/DisasterContext';
import { DemoProgressBar } from '../components/DemoProgressBar';
import { soundFX } from '../utils/audio';

// Dynamic Map Centering Helper
function ChangeMapView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || 13, { animate: true });
    }
  }, [center, zoom, map]);
  return null;
}

// Custom Leaflet DivIcon Generator
const createMapMarkerIcon = (type, severity, iconEmoji, pulse = false) => {
  let bgColor = 'bg-cyan-500';
  let ringColor = 'border-cyan-400';

  if (type === 'incident') {
    if (severity === 'Critical') {
      bgColor = 'bg-red-600 text-white';
      ringColor = 'border-red-400';
    } else if (severity === 'High') {
      bgColor = 'bg-orange-500 text-white';
      ringColor = 'border-orange-400';
    } else {
      bgColor = 'bg-amber-400 text-black';
      ringColor = 'border-amber-300';
    }
  } else if (type === 'boat') {
    bgColor = 'bg-cyan-600 text-white';
    ringColor = 'border-cyan-300';
  } else if (type === 'team' || type === 'ambulance') {
    bgColor = 'bg-emerald-600 text-white';
    ringColor = 'border-emerald-300';
  } else if (type === 'hospital') {
    bgColor = 'bg-rose-600 text-white';
    ringColor = 'border-rose-400';
  } else if (type === 'shelter') {
    bgColor = 'bg-blue-600 text-white';
    ringColor = 'border-blue-400';
  } else if (type === 'block') {
    bgColor = 'bg-amber-600 text-white';
    ringColor = 'border-amber-400';
  }

  const html = `
    <div class="relative flex items-center justify-center cursor-pointer group">
      ${
        pulse
          ? '<span class="absolute -inset-2.5 rounded-full bg-red-500/60 animate-ping opacity-80 pointer-events-none"></span>'
          : ''
      }
      <div class="w-8 h-8 rounded-full ${bgColor} border-2 ${ringColor} shadow-xl shadow-black/80 flex items-center justify-center text-xs font-bold transition-transform transform group-hover:scale-125">
        <span class="text-sm">${iconEmoji}</span>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-map-pin',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18]
  });
};

// Map Entities Data (Coordinates centered around emergency zone)
const mapIncidents = [
  {
    id: 'INC-01',
    name: 'VILLAGE A FLOOD',
    type: 'incident',
    severity: 'Critical',
    priority: '🔴 P1 — CRITICAL',
    disaster: 'Severe Flooding',
    peopleAffected: 80,
    roadStatus: 'Main Road Blocked (1.8m Water)',
    medicalStatus: 'Medical Support Required',
    coords: [28.7041, 77.1025],
    confidence: '94%',
    verified: 'Multi-Source Verified',
    assignedUnit: 'Boat #07',
    unitStatus: 'EN ROUTE',
    eta: '6 minutes',
    distanceRemaining: '1.2 km',
    isPrimaryDemo: true
  },
  {
    id: 'INC-02',
    name: 'RIVER VALLEY FLOOD',
    type: 'incident',
    severity: 'Critical',
    priority: '🔴 P1 — CRITICAL',
    disaster: 'River Surge Flooding',
    peopleAffected: 45,
    roadStatus: 'Partial Submersion',
    medicalStatus: 'Hypothermia Risk',
    coords: [28.6750, 77.1650],
    confidence: '91%',
    verified: 'Multi-Source Verified',
    assignedUnit: 'Rescue Team #03',
    unitStatus: 'ON SCENE',
    eta: '0 mins (Arrived)',
    distanceRemaining: '0.0 km',
    isPrimaryDemo: false
  },
  {
    id: 'INC-03',
    name: 'MOUNTAIN ROAD LANDSLIDE',
    type: 'incident',
    severity: 'High',
    priority: '🟠 P2 — HIGH',
    disaster: 'Debris Flow & Rockfall',
    peopleAffected: 15,
    roadStatus: 'Road Blocked (120m Debris)',
    medicalStatus: 'Minor Injuries',
    coords: [28.7450, 77.1350],
    confidence: '88%',
    verified: 'Field Team Verified',
    assignedUnit: 'Fire & Rescue Unit #02',
    unitStatus: 'RESPONDING',
    eta: '12 minutes',
    distanceRemaining: '3.6 km',
    isPrimaryDemo: false
  },
  {
    id: 'INC-04',
    name: 'RIVERSIDE OVERFLOW',
    type: 'incident',
    severity: 'Moderate',
    priority: '🟡 P3 — MODERATE',
    disaster: 'Minor River Swell',
    peopleAffected: 5,
    roadStatus: 'Passable with Caution',
    medicalStatus: 'Monitoring Required',
    coords: [28.6900, 77.0600],
    confidence: '96%',
    verified: 'Gauge Sensor Verified',
    assignedUnit: 'None (Patrol Monitored)',
    unitStatus: 'STANDBY',
    eta: 'N/A',
    distanceRemaining: 'N/A',
    isPrimaryDemo: false
  }
];

const mapResources = [
  {
    id: 'RES-01',
    name: 'BOAT #07 (Swift-Water Unit)',
    type: 'boat',
    coords: [28.6940, 77.0920],
    status: 'EN ROUTE',
    statusBadge: '🚨 EN ROUTE',
    statusClass: 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse',
    mission: 'Village A Flood',
    distanceRemaining: '1.2 km',
    eta: '6 minutes',
    speed: '28 km/h',
    isPrimaryDemo: true
  },
  {
    id: 'RES-02',
    name: 'RESCUE TEAM #03 (Field Medical)',
    type: 'ambulance',
    coords: [28.6850, 77.1250],
    status: 'AVAILABLE',
    statusBadge: '🟢 AVAILABLE',
    statusClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    mission: 'Standby / Secondary Backup',
    distanceRemaining: '2.4 km',
    eta: '11 mins',
    speed: '0 km/h',
    isPrimaryDemo: false
  }
];

const mapHospitals = [
  {
    id: 'HOSP-01',
    name: 'DISTRICT GENERAL TRAUMA HOSPITAL',
    type: 'hospital',
    coords: [28.7180, 77.0850],
    status: 'AVAILABLE',
    capacity: 'High (42 ICU / 110 General Beds)',
    ambulancesReady: 4,
    contact: '+91 11 2700 8900'
  },
  {
    id: 'HOSP-02',
    name: 'NORTH VALLEY EMERGENCY CLINIC',
    type: 'hospital',
    coords: [28.6620, 77.1400],
    status: 'AVAILABLE',
    capacity: 'Medium (18 Beds)',
    ambulancesReady: 2,
    contact: '+91 11 2700 8911'
  }
];

const mapShelters = [
  {
    id: 'SHELTER-01',
    name: 'EMERGENCY SHELTER A (Community High School)',
    type: 'shelter',
    coords: [28.7250, 77.1150],
    capacity: '120 people available capacity',
    rations: '72 Hours Stocked',
    power: 'Diesel Generator Online'
  },
  {
    id: 'SHELTER-02',
    name: 'SECTOR 4 RELIEF COMPLEX',
    type: 'shelter',
    coords: [28.6700, 77.0800],
    capacity: '200 people capacity',
    rations: '96 Hours Stocked',
    power: 'Solar Microgrid'
  }
];

const mapRoadBlocks = [
  {
    id: 'BLOCK-01',
    name: 'KM 12 MAIN ROAD BLOCKAGE',
    type: 'block',
    coords: [28.7000, 77.0980],
    reason: '1.8m Severe Flood Submersion',
    impact: 'Direct arterial to Village A Severed'
  },
  {
    id: 'BLOCK-02',
    name: 'SECTOR 7 MOUNTAIN PASS',
    type: 'block',
    coords: [28.7400, 77.1300],
    reason: 'Debris flow boulder blockade',
    impact: 'One-lane clearing underway'
  }
];

// Simulated Coordinates Routes
const alternativeRouteCoords = [
  [28.6940, 77.0920], // Boat #07
  [28.6970, 77.0890], // High levee bend
  [28.7010, 77.0930], // North water corridor bypass
  [28.7041, 77.1025]  // Village A Flood
];

const blockedRoadRouteCoords = [
  [28.6940, 77.0920],
  [28.6980, 77.0960],
  [28.7000, 77.0980], // Blocked point
  [28.7041, 77.1025]
];

export const LiveCommandMap = () => {
  const navigate = useNavigate();
  const { setSelectedIncidentId, addToast } = useDisaster();

  // Active filter state: 'ALL' | 'INCIDENTS' | 'RESOURCES' | 'HOSPITALS' | 'SHELTERS' | 'ROAD CONDITIONS'
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedEntity, setSelectedEntity] = useState({ type: 'incident', data: mapIncidents[0] });
  const [mapCenter, setMapCenter] = useState([28.7041, 77.1025]);
  const [mapZoom, setMapZoom] = useState(13);

  // Response simulation progress step: 0 = DISPATCHED, 1 = EN ROUTE, 2 = ARRIVED, 3 = MISSION ACTIVE
  const [responseStage, setResponseStage] = useState(1);

  const responseStageLabels = ['DISPATCHED', 'EN ROUTE', 'ARRIVED', 'MISSION ACTIVE'];

  const handleStageChange = (newStage) => {
    soundFX.playClick();
    setResponseStage(newStage);
    addToast(
      'Mission Telemetry Updated',
      `Boat #07 status transitioned to ${responseStageLabels[newStage]}.`,
      'info'
    );
  };

  const handleSelectIncident = (inc) => {
    setSelectedEntity({ type: 'incident', data: inc });
    setMapCenter(inc.coords);
    setSelectedIncidentId(inc.id);
    soundFX.playClick();
  };

  const handleSelectResource = (res) => {
    setSelectedEntity({ type: 'resource', data: res });
    setMapCenter(res.coords);
    soundFX.playClick();
  };

  const handleSelectOther = (type, data) => {
    setSelectedEntity({ type, data });
    setMapCenter(data.coords);
    soundFX.playClick();
  };

  // Filter checks
  const showIncidents = activeFilter === 'ALL' || activeFilter === 'INCIDENTS';
  const showResources = activeFilter === 'ALL' || activeFilter === 'RESOURCES';
  const showHospitals = activeFilter === 'ALL' || activeFilter === 'HOSPITALS';
  const showShelters = activeFilter === 'ALL' || activeFilter === 'SHELTERS';
  const showRoads = activeFilter === 'ALL' || activeFilter === 'ROAD CONDITIONS';

  return (
    <div className="space-y-5 pb-16 max-w-[1500px] mx-auto">
      {/* Demo Progress Bar (Step 6 / Live Map View) */}
      <DemoProgressBar currentStep={5} />

      {/* ================================================== */}
      {/* 1. PAGE HEADER                                     */}
      {/* ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#1c315e]/70">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 via-teal-500 to-blue-600 text-black shadow-lg shadow-cyan-500/20">
                <Compass className="w-6 h-6" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-teal-300">
                Live Command Map
              </span>
            </h1>

            <span className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase shadow">
              GIS-ASSISTED RESPONSE VIEW
            </span>
          </div>

          <p className="text-xs sm:text-sm text-cyan-200/80 mt-1 font-medium italic">
            "Real-time situational awareness for faster emergency response."
          </p>
        </div>

        {/* Live Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#08152c] border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold self-start sm:self-auto shadow-inner">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
          </span>
          <span>● COMMAND MAP LIVE</span>
        </div>
      </div>

      {/* ================================================== */}
      {/* 2. TOP FILTER BAR & QUICK METRICS OVERLAY          */}
      {/* ================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-[#081024] p-3 rounded-2xl border border-[#1c315e]/80 shadow-lg">
        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono text-slate-400 font-bold uppercase mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            Layers:
          </span>
          {[
            { key: 'ALL', label: 'All Markers' },
            { key: 'INCIDENTS', label: '🚨 Incidents' },
            { key: 'RESOURCES', label: '🚤 Resources' },
            { key: 'HOSPITALS', label: '🏥 Hospitals' },
            { key: 'SHELTERS', label: '🏠 Shelters' },
            { key: 'ROAD CONDITIONS', label: '🚧 Blocked Roads' }
          ].map((tab) => {
            const isActive = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveFilter(tab.key);
                  soundFX.playClick();
                }}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400 shadow-md shadow-cyan-950 font-bold'
                    : 'bg-[#060b17] text-slate-400 hover:text-white border border-[#1c315e]/70'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Command Overview Quick Overlay (Prompt Spec) */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-slate-300">
          <div className="bg-[#050b17] px-2.5 py-1 rounded-lg border border-[#162547]">
            <span className="text-slate-500 text-[10px] block">ACTIVE INCIDENTS</span>
            <span className="text-white font-extrabold">12</span>
          </div>
          <div className="bg-[#050b17] px-2.5 py-1 rounded-lg border border-red-500/30">
            <span className="text-red-400 text-[10px] block">CRITICAL</span>
            <span className="text-red-300 font-extrabold">3</span>
          </div>
          <div className="bg-[#050b17] px-2.5 py-1 rounded-lg border border-cyan-500/30">
            <span className="text-cyan-400 text-[10px] block">DEPLOYED</span>
            <span className="text-cyan-200 font-extrabold">5</span>
          </div>
          <div className="bg-[#050b17] px-2.5 py-1 rounded-lg border border-emerald-500/30">
            <span className="text-emerald-400 text-[10px] block">AVAILABLE</span>
            <span className="text-emerald-300 font-extrabold">8</span>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* 3. MAIN MAP CONTAINER (Full interactive Leaflet)   */}
      {/* ================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* MAP VIEW (8 Cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="glass-panel rounded-3xl overflow-hidden border border-cyan-500/40 shadow-2xl relative h-[620px]">
            {/* Map Component */}
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              scrollWheelZoom={true}
              className="w-full h-full z-10"
              style={{ background: '#050914' }}
            >
              <ChangeMapView center={mapCenter} zoom={mapZoom} />

              {/* Dark High-Contrast Futuristic TileLayer */}
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />

              {/* Inundation Zone Simulated Shading */}
              <Circle
                center={[28.7041, 77.1025]}
                radius={900}
                pathOptions={{
                  color: '#ef4444',
                  fillColor: '#ef4444',
                  fillOpacity: 0.18,
                  weight: 2,
                  dashArray: '6, 6'
                }}
              />

              {/* Alternative Route Polyline (Green Glow) */}
              {showRoads && (
                <Polyline
                  positions={alternativeRouteCoords}
                  pathOptions={{
                    color: '#10b981',
                    weight: 5,
                    opacity: 0.9,
                    dashArray: '8, 8'
                  }}
                />
              )}

              {/* Blocked Road Polyline (Red Alert) */}
              {showRoads && (
                <Polyline
                  positions={blockedRoadRouteCoords}
                  pathOptions={{
                    color: '#ef4444',
                    weight: 4,
                    opacity: 0.7,
                    dashArray: '4, 8'
                  }}
                />
              )}

              {/* Incidents Markers */}
              {showIncidents &&
                mapIncidents.map((inc) => (
                  <Marker
                    key={inc.id}
                    position={inc.coords}
                    icon={createMapMarkerIcon('incident', inc.severity, '🔴', inc.isPrimaryDemo)}
                    eventHandlers={{
                      click: () => handleSelectIncident(inc)
                    }}
                  >
                    <Popup className="custom-leaflet-popup">
                      <div className="p-2 text-xs font-mono bg-[#0c162e] text-white rounded-lg">
                        <strong className="text-red-400 block">{inc.name}</strong>
                        <span>{inc.peopleAffected} People Affected</span>
                      </div>
                    </Popup>
                  </Marker>
                ))}

              {/* Resource Markers */}
              {showResources &&
                mapResources.map((res) => (
                  <Marker
                    key={res.id}
                    position={res.coords}
                    icon={createMapMarkerIcon(res.type, 'Normal', res.type === 'boat' ? '🚤' : '🚑')}
                    eventHandlers={{
                      click: () => handleSelectResource(res)
                    }}
                  />
                ))}

              {/* Hospital Markers */}
              {showHospitals &&
                mapHospitals.map((hosp) => (
                  <Marker
                    key={hosp.id}
                    position={hosp.coords}
                    icon={createMapMarkerIcon('hospital', 'Normal', '🏥')}
                    eventHandlers={{
                      click: () => handleSelectOther('hospital', hosp)
                    }}
                  />
                ))}

              {/* Shelter Markers */}
              {showShelters &&
                mapShelters.map((shelter) => (
                  <Marker
                    key={shelter.id}
                    position={shelter.coords}
                    icon={createMapMarkerIcon('shelter', 'Normal', '🏠')}
                    eventHandlers={{
                      click: () => handleSelectOther('shelter', shelter)
                    }}
                  />
                ))}

              {/* Blocked Road Markers */}
              {showRoads &&
                mapRoadBlocks.map((block) => (
                  <Marker
                    key={block.id}
                    position={block.coords}
                    icon={createMapMarkerIcon('block', 'Normal', '🚧')}
                    eventHandlers={{
                      click: () => handleSelectOther('block', block)
                    }}
                  />
                ))}
            </MapContainer>

            {/* Floating Live Map Legend */}
            <div className="absolute bottom-4 left-4 z-20 p-3 rounded-2xl bg-[#060c1ad0] backdrop-blur-md border border-[#1c315e]/80 text-[11px] font-mono space-y-1 shadow-2xl">
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">MAP LEGEND</div>
              <div className="flex items-center gap-2 text-slate-300">
                <span>🔴</span> <span>P1 Critical (Village A)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span>🚤</span> <span>Boat #07 (En Route)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span>🚧</span> <span>Blocked Roadway</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-3 h-1 bg-emerald-400 rounded-full inline-block" />
                <span>Alternative Route (1.2 km)</span>
              </div>
            </div>

            {/* Floating Top Right Recenter Button */}
            <button
              onClick={() => {
                setMapCenter([28.7041, 77.1025]);
                setMapZoom(13);
                soundFX.playClick();
              }}
              className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-xl bg-[#060c1ad0] hover:bg-cyan-500/20 text-cyan-300 hover:text-white border border-cyan-500/40 text-xs font-mono font-bold transition-all shadow-lg cursor-pointer flex items-center gap-1.5"
            >
              <Crosshair className="w-3.5 h-3.5" />
              <span>FOCUS VILLAGE A</span>
            </button>
          </div>

          {/* AI MAP INSIGHT (Compact Floating Banner - Prompt Spec) */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0a1b38] to-[#071329] border border-cyan-400/50 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-xs font-mono font-extrabold text-cyan-300 uppercase tracking-wide">
                  🤖 AI COMMAND INSIGHT
                </span>
              </div>
              <p className="text-xs text-slate-100 font-semibold">
                "Village A Flood remains the highest priority incident."
              </p>
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-300 pt-0.5">
                <span>✓ 80 people affected</span>
                <span>•</span>
                <span>✓ Severe flooding</span>
                <span>•</span>
                <span>✓ Medical risk</span>
                <span>•</span>
                <span>✓ Road blockage</span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs font-mono font-extrabold px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-200 border border-cyan-400">
                Action: Boat #07 Responding
              </span>
            </div>
          </div>
        </div>

        {/* SIDE PANELS (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* 1. INSPECTED ENTITY DETAILS PANEL */}
          <div className="glass-panel p-5 rounded-2xl border-cyan-500/40 shadow-2xl bg-gradient-to-b from-[#0c1833] via-[#09152b] to-[#070e1c] space-y-3.5">
            <div className="pb-3 border-b border-[#1c315e] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-cyan-300 block">
                  SELECTED MAP ENTITY
                </span>
                <h3 className="text-base font-extrabold text-white tracking-tight mt-0.5">
                  {selectedEntity.data.name}
                </h3>
              </div>

              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {selectedEntity.type.toUpperCase()}
              </span>
            </div>

            {/* Entity Context View */}
            {selectedEntity.type === 'incident' && (
              <div className="space-y-2.5 text-xs font-mono">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                    <span className="text-[9px] text-slate-400 block font-bold">PRIORITY</span>
                    <span className="text-red-400 font-extrabold">{selectedEntity.data.priority}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                    <span className="text-[9px] text-slate-400 block font-bold">PEOPLE AFFECTED</span>
                    <span className="text-cyan-300 font-extrabold">{selectedEntity.data.peopleAffected} People</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                    <span className="text-[9px] text-slate-400 block font-bold">DISASTER</span>
                    <span className="text-orange-300 font-extrabold">{selectedEntity.data.disaster}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                    <span className="text-[9px] text-slate-400 block font-bold">ACCESS</span>
                    <span className="text-red-300 font-extrabold truncate">Main Road Blocked</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#080e1d] border border-cyan-500/30 space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Verification:</span>
                    <span className="text-emerald-400 font-bold">✓ {selectedEntity.data.verified}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">AI Confidence:</span>
                    <span className="text-emerald-400 font-bold">{selectedEntity.data.confidence}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Current Response:</span>
                    <span className="text-cyan-300 font-bold">🚤 {selectedEntity.data.assignedUnit}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">ETA:</span>
                    <span className="text-emerald-300 font-bold">{selectedEntity.data.eta}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      soundFX.playClick();
                      navigate('/priority');
                    }}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#0d172e] hover:bg-[#132347] text-slate-200 hover:text-white border border-[#1c315e] font-mono text-[11px] font-semibold transition-all cursor-pointer text-center"
                  >
                    VIEW PRIORITY
                  </button>
                  <button
                    onClick={() => {
                      soundFX.playClick();
                      navigate('/dispatch');
                    }}
                    className="flex-1 py-2 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-[11px] font-extrabold transition-all cursor-pointer text-center shadow"
                  >
                    VIEW DISPATCH
                  </button>
                </div>
              </div>
            )}

            {selectedEntity.type === 'resource' && (
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-[#080e1d] border border-cyan-500/30 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="text-red-400 font-bold">{selectedEntity.data.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Mission:</span>
                    <span className="text-white font-bold">{selectedEntity.data.mission}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Distance Remaining:</span>
                    <span className="text-cyan-300 font-bold">{selectedEntity.data.distanceRemaining}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">ETA:</span>
                    <span className="text-emerald-300 font-bold">{selectedEntity.data.eta}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Dispatch Status:</span>
                    <span className="text-emerald-400 font-bold">✓ ACTIVE</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundFX.playClick();
                    navigate('/dispatch');
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-extrabold transition-all cursor-pointer"
                >
                  MANAGE IN DISPATCH CENTER
                </button>
              </div>
            )}

            {selectedEntity.type !== 'incident' && selectedEntity.type !== 'resource' && (
              <div className="p-3 rounded-xl bg-[#080e1d] border border-[#1c315e] text-xs font-mono space-y-1 text-slate-300">
                <div>Status: <strong className="text-emerald-400">Available</strong></div>
                <div>Coordinates: <strong className="text-white">{selectedEntity.data.coords.join(', ')}</strong></div>
                {selectedEntity.data.capacity && <div>Capacity: <strong className="text-cyan-300">{selectedEntity.data.capacity}</strong></div>}
              </div>
            )}
          </div>

          {/* 2. LIVE RESPONSE TRACKING PANEL (With Progress Simulation) */}
          <div className="glass-panel p-5 rounded-2xl border-emerald-500/40 shadow-2xl bg-gradient-to-b from-[#0a1f18] via-[#09152b] to-[#060e1e] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#1c315e]">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-400" />
                ACTIVE RESPONSE TRACKING
              </span>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800 font-bold">
                SIMULATED
              </span>
            </div>

            {/* Step Pipeline Graphic */}
            <div className="space-y-2 text-xs font-mono">
              <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
                {responseStageLabels.map((stageName, idx) => (
                  <button
                    key={stageName}
                    onClick={() => handleStageChange(idx)}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      responseStage === idx
                        ? 'bg-emerald-500/30 text-emerald-300 border-emerald-400 font-bold shadow'
                        : responseStage > idx
                        ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30'
                        : 'bg-[#060b17] text-slate-500 border-[#1c315e]/50'
                    }`}
                  >
                    {stageName}
                  </button>
                ))}
              </div>

              {/* Progress Summary Card */}
              <div className="p-3 rounded-xl bg-[#060c1a] border border-[#1c315e] space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Incident:</span>
                  <span className="text-white font-bold">Village A Flood</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Resource:</span>
                  <span className="text-cyan-300 font-bold">Boat #07</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Stage:</span>
                  <span className="text-emerald-400 font-bold">{responseStageLabels[responseStage]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">ETA:</span>
                  <span className="text-emerald-300 font-bold">
                    {responseStage === 2 || responseStage === 3 ? '0 mins (On-Site)' : '6 Minutes'}
                  </span>
                </div>
              </div>
            </div>

            <span className="text-[9px] text-slate-400 font-mono italic block text-center">
              * Click stage tabs above to simulate mission lifecycle progress.
            </span>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* 4. FOOTER TRANSPARENCY BANNER                      */}
      {/* ================================================== */}
      <footer className="p-4 rounded-2xl bg-[#060b17]/90 border border-[#1c315e]/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <HelpCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span className="italic">
            "Demo / Prototype — map data, resource tracking, routes, and live status are simulated for frontend demonstration."
          </span>
        </div>

        <div className="font-mono text-cyan-300 font-bold text-xs tracking-tight">
          "See the situation. Understand the priority. Coordinate the response."
        </div>
      </footer>
    </div>
  );
};
