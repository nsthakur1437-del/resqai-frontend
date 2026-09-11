import React, { useState } from 'react';
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
  Compass
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useDisaster } from '../context/DisasterContext';
import { DemoProgressBar } from '../components/DemoProgressBar';
import { soundFX } from '../utils/audio';

// Helper component to center map dynamically
function ChangeMapView({ center, zoom }) {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.setView(center, zoom || 13, { animate: true });
    }
  }, [center, zoom, map]);
  return null;
}

// Custom Leaflet Icons Generator
const createMapMarkerIcon = (type, severity, title) => {
  let bgColor = 'bg-cyan-500';
  let ringColor = 'border-cyan-400';
  let pulse = false;
  let iconEmoji = '📍';

  if (type === 'incident') {
    if (severity === 'Critical') {
      bgColor = 'bg-red-600 text-white';
      ringColor = 'border-red-400';
      pulse = true;
      iconEmoji = '🔴';
    } else if (severity === 'High') {
      bgColor = 'bg-orange-500 text-white';
      ringColor = 'border-orange-400';
      iconEmoji = '🟠';
    } else if (severity === 'Moderate') {
      bgColor = 'bg-amber-400 text-black';
      ringColor = 'border-amber-300';
      iconEmoji = '🟡';
    } else {
      bgColor = 'bg-emerald-500 text-white';
      ringColor = 'border-emerald-300';
      iconEmoji = '🟢';
    }
  } else if (type === 'team') {
    bgColor = 'bg-blue-600 text-white';
    ringColor = 'border-blue-400';
    iconEmoji = '🚑';
  } else if (type === 'hospital') {
    bgColor = 'bg-rose-600 text-white';
    ringColor = 'border-rose-400';
    iconEmoji = '🏥';
  } else if (type === 'shelter') {
    bgColor = 'bg-emerald-600 text-white';
    ringColor = 'border-emerald-400';
    iconEmoji = '🏠';
  } else if (type === 'block') {
    bgColor = 'bg-yellow-600 text-white';
    ringColor = 'border-yellow-400';
    iconEmoji = '🚧';
  }

  const html = `
    <div class="relative flex items-center justify-center cursor-pointer group">
      ${
        pulse
          ? '<span class="absolute -inset-2.5 rounded-full bg-red-500/50 animate-ping opacity-75 pointer-events-none"></span>'
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

export const LiveMapPage = () => {
  const navigate = useNavigate();
  const {
    incidents,
    rescueTeams,
    resources,
    roadBlocks,
    selectedIncident,
    setSelectedIncidentId,
    assignRescueTeam
  } = useDisaster();

  // Active filter: 'ALL', 'INCIDENTS', 'RESCUE TEAMS', 'HOSPITALS', 'SHELTERS', 'BLOCKED ROADS'
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedEntity, setSelectedEntity] = useState({ type: 'incident', data: selectedIncident || incidents[0] });

  const recommendedTeam = rescueTeams.find((t) => t.id === 'TEAM-03') || rescueTeams[0];
  const isBridgeAAssigned = Boolean(incidents.find((i) => i.id === 'INC-101')?.assignedTeam);

  // Filter checks
  const showIncidents = activeFilter === 'ALL' || activeFilter === 'INCIDENTS';
  const showTeams = activeFilter === 'ALL' || activeFilter === 'RESCUE TEAMS';
  const showHospitals = activeFilter === 'ALL' || activeFilter === 'HOSPITALS';
  const showShelters = activeFilter === 'ALL' || activeFilter === 'SHELTERS';
  const showBlockedRoads = activeFilter === 'ALL' || activeFilter === 'BLOCKED ROADS';

  const mapCenter = [28.7041, 77.1025];

  const handleSelectIncident = (inc) => {
    setSelectedIncidentId(inc.id);
    setSelectedEntity({ type: 'incident', data: inc });
    soundFX.playClick();
  };

  const handleSelectResource = (res, type) => {
    setSelectedEntity({ type: type, data: res });
    soundFX.playClick();
  };

  // Step 3 -> Step 4 Navigation in Connected Demo Flow
  const handleViewRescuePlan = () => {
    soundFX.playClick();
    navigate('/coordination');
  };

  return (
    <div className="space-y-5 pb-12 max-w-[1500px] mx-auto">
      {/* Demo Progress Bar (Step 4) */}
      <DemoProgressBar currentStep={4} />

      {/* ================================================== */}
      {/* 1. PAGE HEADER                                     */}
      {/* ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1c315e]/60">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <MapPin className="w-6 h-6 text-cyan-400" />
            <span>Live Disaster Map</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            "Real-time visualization of emergencies and rescue resources."
          </p>
        </div>

        {/* Live Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold font-mono self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>LIVE MONITORING</span>
        </div>
      </div>

      {/* ================================================== */}
      {/* 2. MAP CONTROLS & FILTER BAR                       */}
      {/* ================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-2xl bg-[#0a1226]/90 border border-[#1c315e]/80 shadow-lg">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] font-mono text-slate-400 font-bold px-2 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            FILTER:
          </span>

          {[
            { label: 'ALL', key: 'ALL' },
            { label: 'INCIDENTS', key: 'INCIDENTS' },
            { label: 'RESCUE TEAMS', key: 'RESCUE TEAMS' },
            { label: 'HOSPITALS', key: 'HOSPITALS' },
            { label: 'SHELTERS', key: 'SHELTERS' },
            { label: 'BLOCKED ROADS', key: 'BLOCKED ROADS' }
          ].map((btn) => {
            const isActive = activeFilter === btn.key;
            return (
              <button
                key={btn.key}
                onClick={() => {
                  setActiveFilter(btn.key);
                  soundFX.playClick();
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-950'
                    : 'bg-[#080e1d] text-slate-400 hover:text-white border border-[#1c315e]/70'
                }`}
              >
                {btn.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="hidden md:inline text-[11px]">GIS Delhi NCR • Sat-Telemetry Active</span>
        </div>
      </div>

      {/* ================================================== */}
      {/* 3. MAIN MAP & DETAILS PANEL (Large Full-Page Focus)*/}
      {/* ================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* MAP CONTAINER (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-3 relative">
          <div className="relative w-full h-[620px] rounded-2xl overflow-hidden border border-[#1c315e] shadow-2xl bg-[#080e1d]">
            {/* FLOATING CARD OVER MAP: 🤖 AI LIVE INSIGHT */}
            <div className="absolute top-4 left-4 z-[1000] max-w-xs p-3.5 rounded-2xl bg-[#0d162ed9] backdrop-blur-xl border border-cyan-500/40 shadow-2xl text-xs space-y-1.5 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#1c315e]">
                <span className="text-[11px] font-extrabold text-cyan-300 font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  🤖 AI LIVE INSIGHT
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                  TOP PRIORITY
                </span>
              </div>

              <p className="font-bold text-white leading-snug">
                "Bridge A Flood is the highest priority incident."
              </p>

              <div className="text-[11px] text-slate-300 space-y-0.5 pt-1">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Reason:</div>
                <div className="flex items-center gap-1 text-slate-200">
                  <span className="text-red-400 font-bold">•</span> 20 people affected
                </div>
                <div className="flex items-center gap-1 text-slate-200">
                  <span className="text-red-400 font-bold">•</span> Medical emergency detected
                </div>
                <div className="flex items-center gap-1 text-slate-200">
                  <span className="text-emerald-400 font-bold">•</span> Rescue Team 3 is closest (2.1 km)
                </div>
              </div>

              <div className="pt-2 border-t border-[#1c315e]/70 flex items-center justify-between">
                <span className="text-[10px] text-cyan-300 font-mono font-semibold">
                  Action: Dispatch Team 3
                </span>
                {!isBridgeAAssigned && (
                  <button
                    onClick={handleViewRescuePlan}
                    className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-black font-extrabold text-[10px] uppercase shadow cursor-pointer"
                  >
                    View Plan ➔
                  </button>
                )}
              </div>
            </div>

            {/* Recenter Button */}
            <button
              onClick={() => {
                setSelectedEntity({ type: 'incident', data: incidents[0] });
                soundFX.playClick();
              }}
              className="absolute bottom-4 right-4 z-[1000] p-3 rounded-xl bg-[#0d152a]/95 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-2xl backdrop-blur-md transition-all cursor-pointer"
              title="Recenter Map"
            >
              <Crosshair className="w-5 h-5" />
            </button>

            {/* LEAFLET MAP */}
            <MapContainer
              center={mapCenter}
              zoom={13}
              scrollWheelZoom={true}
              className="w-full h-full"
            >
              <ChangeMapView center={mapCenter} zoom={13} />

              {/* High Contrast Dark Matter CartoDB Layer */}
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a> & OpenStreetMap'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />

              {/* High-urgency Danger Radar Circle around Bridge A */}
              <Circle
                center={[28.7041, 77.1025]}
                radius={2200}
                pathOptions={{
                  color: '#EF4444',
                  fillColor: '#EF4444',
                  fillOpacity: 0.08,
                  weight: 1.5,
                  dashArray: '5, 8'
                }}
              />

              {/* 1. INCIDENT MARKERS */}
              {showIncidents &&
                incidents.map((inc) => (
                  <Marker
                    key={inc.id}
                    position={inc.coordinates}
                    icon={createMapMarkerIcon('incident', inc.severity, inc.title)}
                    eventHandlers={{
                      click: () => handleSelectIncident(inc)
                    }}
                  >
                    <Popup>
                      <div className="p-1 max-w-[220px] text-slate-100">
                        <span className="text-[10px] font-bold text-red-400 uppercase block mb-0.5">
                          {inc.priority}
                        </span>
                        <h4 className="text-xs font-extrabold text-white mb-1">
                          {inc.title}
                        </h4>
                        <p className="text-[11px] text-slate-300 mb-1">
                          {inc.peopleAffected} people affected • {inc.location}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}

              {/* 2. RESCUE TEAM MARKERS */}
              {showTeams &&
                rescueTeams.map((team) => (
                  <Marker
                    key={team.id}
                    position={team.coordinates}
                    icon={createMapMarkerIcon('team', null, team.name)}
                    eventHandlers={{
                      click: () => handleSelectResource(team, 'team')
                    }}
                  >
                    <Popup>
                      <div className="p-1 text-slate-100 max-w-[220px]">
                        <span className="text-[10px] font-bold text-cyan-400 uppercase block">
                          🚑 Rescue Unit
                        </span>
                        <h4 className="text-xs font-bold text-white mb-1">
                          {team.name}
                        </h4>
                        <p className="text-[10px] text-slate-300">
                          Status: {team.status} • Distance: {team.distanceKm} km
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}

              {/* 3. HOSPITAL MARKERS */}
              {showHospitals &&
                resources
                  .filter((r) => r.type === 'Hospital')
                  .map((res) => (
                    <Marker
                      key={res.id}
                      position={res.coordinates}
                      icon={createMapMarkerIcon('hospital', null, res.name)}
                      eventHandlers={{
                        click: () => handleSelectResource(res, 'hospital')
                      }}
                    >
                      <Popup>
                        <div className="p-1 text-slate-100 max-w-[220px]">
                          <span className="text-[10px] font-bold text-rose-400 uppercase block">
                            🏥 Hospital Facility
                          </span>
                          <h4 className="text-xs font-bold text-white mb-1">
                            {res.name}
                          </h4>
                          <p className="text-[10px] text-slate-300">
                            Available Beds: {res.availableBeds} / {res.totalBeds}
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}

              {/* 4. SHELTER MARKERS */}
              {showShelters &&
                resources
                  .filter((r) => r.type === 'Shelter')
                  .map((res) => (
                    <Marker
                      key={res.id}
                      position={res.coordinates}
                      icon={createMapMarkerIcon('shelter', null, res.name)}
                      eventHandlers={{
                        click: () => handleSelectResource(res, 'shelter')
                      }}
                    >
                      <Popup>
                        <div className="p-1 text-slate-100 max-w-[220px]">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase block">
                            🏠 Relief Shelter
                          </span>
                          <h4 className="text-xs font-bold text-white mb-1">
                            {res.name}
                          </h4>
                          <p className="text-[10px] text-slate-300">
                            Capacity: {res.availableBeds} people
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}

              {/* 5. BLOCKED ROAD POLYLINE & PIN */}
              {showBlockedRoads &&
                roadBlocks.map((blk) => (
                  <React.Fragment key={blk.id}>
                    <Polyline
                      positions={blk.coordinates}
                      pathOptions={{
                        color: '#EF4444',
                        weight: 5,
                        dashArray: '8, 8'
                      }}
                    />
                    <Marker
                      position={blk.coordinates[0]}
                      icon={createMapMarkerIcon('block', null, blk.name)}
                      eventHandlers={{
                        click: () => handleSelectResource(blk, 'block')
                      }}
                    />
                  </React.Fragment>
                ))}
            </MapContainer>
          </div>

          {/* COMPACT MAP LEGEND BAR */}
          <div className="glass-panel p-3 rounded-2xl border-[#1c315e]/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 font-mono font-bold text-slate-400 text-[11px]">
              <span>MAP LEGEND:</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-200">
              <span className="flex items-center gap-1">
                <span>🔴</span> Critical
              </span>
              <span className="flex items-center gap-1">
                <span>🟠</span> High
              </span>
              <span className="flex items-center gap-1">
                <span>🟡</span> Moderate
              </span>
              <span className="flex items-center gap-1">
                <span>🟢</span> Resolved
              </span>
              <span className="flex items-center gap-1">
                <span>🚑</span> Rescue Team
              </span>
              <span className="flex items-center gap-1">
                <span>🏥</span> Hospital
              </span>
              <span className="flex items-center gap-1">
                <span>🏠</span> Shelter
              </span>
              <span className="flex items-center gap-1">
                <span>🚧</span> Blocked Road
              </span>
            </div>
          </div>
        </div>

        {/* DETAILS PANEL (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* IF SELECTED ENTITY IS INCIDENT */}
          {selectedEntity.type === 'incident' && (
            <div className="glass-panel p-5 rounded-2xl border-cyan-500/40 shadow-2xl flex flex-col justify-between h-full bg-gradient-to-b from-[#0e1c3a] via-[#0a142c] to-[#080e1d]">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#1c315e]">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400 block">
                      🚨 CRITICAL INCIDENT
                    </span>
                    <h3 className="text-base font-extrabold text-white mt-0.5">
                      {selectedEntity.data.title || 'Bridge A Flood'}
                    </h3>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse">
                    P1 — CRITICAL
                  </span>
                </div>

                {/* Structured Incident Specs */}
                <div className="mt-4 space-y-2.5 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                      <span className="text-[10px] font-mono text-slate-400 block font-bold">
                        📍 LOCATION
                      </span>
                      <span className="font-extrabold text-white text-xs mt-0.5 block">
                        {selectedEntity.data.location || 'Bridge A'}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                      <span className="text-[10px] font-mono text-slate-400 block font-bold">
                        👥 PEOPLE AFFECTED
                      </span>
                      <span className="font-extrabold text-cyan-300 text-xs mt-0.5 block">
                        {selectedEntity.data.peopleAffected || 20}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                      <span className="text-[10px] font-mono text-slate-400 block font-bold">
                        🌊 DISASTER
                      </span>
                      <span className="font-extrabold text-orange-300 text-xs mt-0.5 block">
                        {selectedEntity.data.disaster || 'Flood'}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                      <span className="text-[10px] font-mono text-slate-400 block font-bold">
                        🔴 PRIORITY
                      </span>
                      <span className="font-extrabold text-red-400 text-xs mt-0.5 block">
                        P1 — Critical
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                    <span className="text-[10px] font-mono text-slate-400 block font-bold">
                      🏥 MEDICAL HELP
                    </span>
                    <span className="font-extrabold text-red-300 text-xs mt-0.5 block">
                      Required (1 Serious Injury)
                    </span>
                  </div>

                  {/* 🚑 AI RECOMMENDATION */}
                  <div className="p-3.5 rounded-xl bg-cyan-950/50 border border-cyan-500/40 space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 block">
                      🚑 AI RECOMMENDATION
                    </span>
                    <div className="text-sm font-extrabold text-white">
                      Send Rescue Team 3
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-mono text-slate-300">
                      <div>Distance: <strong className="text-white">2.1 km</strong></div>
                      <div>Response: <strong className="text-cyan-300">8 minutes</strong></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons with Demo Flow Connection */}
              <div className="mt-5 pt-3 border-t border-[#1c315e] space-y-2">
                {/* STEP 3 -> STEP 4 CONNECTED DEMO BUTTON */}
                <button
                  onClick={handleViewRescuePlan}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                >
                  <span>VIEW RESCUE PLAN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {isBridgeAAssigned ? (
                  <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>✓ RESCUE TEAM ASSIGNED</span>
                    </div>
                    <span className="text-[10px] font-mono bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700">
                      RESPONDING
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => assignRescueTeam('INC-101', 'TEAM-03')}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-emerald-500 hover:from-red-500 hover:to-emerald-400 text-white font-extrabold text-xs tracking-wider uppercase shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>ASSIGN TEAM DIRECTLY</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* IF SELECTED ENTITY IS A RESOURCE */}
          {selectedEntity.type !== 'incident' && (
            <div className="glass-panel p-5 rounded-2xl border-cyan-500/40 shadow-2xl flex flex-col justify-between h-full bg-[#091326]">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#1c315e]">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 block">
                      RESOURCE DETAILS
                    </span>
                    <h3 className="text-base font-extrabold text-white mt-0.5">
                      {selectedEntity.data.name || 'Resource Facility'}
                    </h3>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {selectedEntity.data.status || 'Available'}
                  </span>
                </div>

                <div className="mt-4 space-y-3 text-xs">
                  {selectedEntity.type === 'team' && (
                    <div className="p-3 rounded-xl bg-[#080e1d] border border-[#1c315e] space-y-1.5 font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Status:</span>
                        <strong className="text-emerald-400">{selectedEntity.data.status === 'Dispatched' ? 'RESPONDING' : 'Available'}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Distance:</span>
                        <strong className="text-white">2.1 km from Bridge A</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Equipment:</span>
                        <strong className="text-cyan-300">Rescue Boat x2, Trauma Kit</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">AI Match Score:</span>
                        <strong className="text-emerald-400 font-bold">98% Match</strong>
                      </div>
                    </div>
                  )}

                  {selectedEntity.type === 'hospital' && (
                    <div className="p-3 rounded-xl bg-[#080e1d] border border-[#1c315e] space-y-1.5 font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Status:</span>
                        <strong className="text-emerald-400">Available</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Distance:</span>
                        <strong className="text-white">3.2 km</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Emergency Capacity:</span>
                        <strong className="text-emerald-300">High (68 Available Beds)</strong>
                      </div>
                    </div>
                  )}

                  {selectedEntity.type === 'shelter' && (
                    <div className="p-3 rounded-xl bg-[#080e1d] border border-[#1c315e] space-y-1.5 font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Status:</span>
                        <strong className="text-emerald-400">Available</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Capacity:</span>
                        <strong className="text-cyan-300">250 people</strong>
                      </div>
                    </div>
                  )}

                  {selectedEntity.type === 'block' && (
                    <div className="p-3 rounded-xl bg-[#080e1d] border border-red-500/30 space-y-1.5 font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Status:</span>
                        <strong className="text-red-400 font-bold">Closed</strong>
                      </div>
                      <p className="text-[11px] text-slate-300">
                        Debris and mud obstruct vehicular traffic.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#1c315e]">
                <button
                  onClick={() => handleSelectIncident(incidents[0])}
                  className="w-full py-2.5 rounded-xl bg-[#080e1d] hover:bg-[#101d3b] text-cyan-300 text-xs font-bold border border-cyan-500/30 transition-colors cursor-pointer"
                >
                  Focus Active Incident (Bridge A)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
