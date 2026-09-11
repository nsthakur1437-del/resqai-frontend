import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import {
  MapPin,
  Compass,
  AlertTriangle,
  CheckCircle2,
  Droplets,
  ShieldCheck,
  Flame,
  ArrowRight,
  Filter
} from 'lucide-react';
import { soundFX } from '../utils/audio';

// Helper component to smoothly center Leaflet map on incident selection
function RecenterMap({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || 13, { animate: true });
    }
  }, [center, zoom, map]);
  return null;
}

// Function to generate priority-ranked custom Leaflet icons
const createPriorityIcon = (priority, isSelected) => {
  let bgColor = 'bg-slate-600';
  let borderColor = 'border-slate-400';
  let size = 30;
  let pulse = false;
  let label = 'P4';
  let emoji = '🟢';

  if (priority === 'CRITICAL') {
    bgColor = 'bg-gradient-to-br from-red-600 to-rose-700 text-white';
    borderColor = isSelected ? 'border-white ring-4 ring-red-400/80' : 'border-red-400 ring-2 ring-red-500/40';
    size = isSelected ? 46 : 42;
    pulse = true;
    label = 'P1';
    emoji = '🔴';
  } else if (priority === 'HIGH') {
    bgColor = 'bg-gradient-to-br from-orange-500 to-amber-600 text-white';
    borderColor = isSelected ? 'border-white ring-4 ring-orange-400/80' : 'border-orange-400 ring-2 ring-orange-500/30';
    size = isSelected ? 40 : 36;
    label = 'P2';
    emoji = '🟠';
  } else if (priority === 'MEDIUM') {
    bgColor = 'bg-gradient-to-br from-amber-500 to-yellow-600 text-slate-900';
    borderColor = isSelected ? 'border-white ring-4 ring-amber-400/80' : 'border-amber-400';
    size = isSelected ? 36 : 32;
    label = 'P3';
    emoji = '🟡';
  } else {
    bgColor = 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white';
    borderColor = isSelected ? 'border-white ring-4 ring-emerald-400/80' : 'border-emerald-400';
    size = isSelected ? 32 : 28;
    label = 'P4';
    emoji = '🟢';
  }

  const html = `
    <div class="relative flex items-center justify-center cursor-pointer group">
      ${
        pulse
          ? '<span class="absolute -inset-2 rounded-full bg-red-500/50 animate-ping opacity-75 pointer-events-none"></span>'
          : ''
      }
      <div class="rounded-full ${bgColor} border-2 ${borderColor} shadow-xl shadow-black/80 flex flex-col items-center justify-center text-[10px] font-black transition-transform duration-200 transform group-hover:scale-125" style="width: ${size}px; height: ${size}px;">
        <span class="leading-none text-[11px]">${emoji}</span>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-priority-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 6)]
  });
};

export const defaultVerifiedIncidents = [
  {
    id: 'Incident #1042',
    disasterType: 'Flood',
    location: 'Village A',
    peopleAffected: 'Approximately 80',
    severity: 'HIGH',
    verificationStatus: 'VERIFIED',
    priority: 'CRITICAL',
    coordinates: [28.715, 77.12]
  },
  {
    id: 'Incident #1043',
    disasterType: 'Flood',
    location: 'River Valley East',
    peopleAffected: 'Approximately 45',
    severity: 'HIGH',
    verificationStatus: 'VERIFIED',
    priority: 'HIGH',
    coordinates: [28.74, 77.14]
  },
  {
    id: 'Incident #1044',
    disasterType: 'Urban Inundation',
    location: 'Sector 4 Lowlands',
    peopleAffected: 'Approximately 25',
    severity: 'MODERATE',
    verificationStatus: 'VERIFIED',
    priority: 'MEDIUM',
    coordinates: [28.69, 77.08]
  },
  {
    id: 'Incident #1045',
    disasterType: 'Flash Flood',
    location: 'South Canal Enclave',
    peopleAffected: 'Approximately 18',
    severity: 'MODERATE',
    verificationStatus: 'VERIFIED',
    priority: 'LOW',
    coordinates: [28.67, 77.16]
  }
];

export const PriorityRankedMap = ({
  incidents = defaultVerifiedIncidents,
  selectedIncidentId = 'Incident #1042',
  onSelectIncident = () => {}
}) => {
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  const selectedIncident =
    incidents.find((inc) => inc.id === selectedIncidentId) || incidents[0];

  const filteredIncidents = incidents.filter((inc) => {
    if (priorityFilter === 'ALL') return true;
    return inc.priority === priorityFilter;
  });

  const mapCenter = selectedIncident?.coordinates || [28.715, 77.12];

  const handleMarkerClick = (inc) => {
    soundFX.playClick();
    onSelectIncident(inc.id);
  };

  return (
    <section className="glass-panel p-6 rounded-3xl border-cyan-500/30 shadow-2xl bg-gradient-to-b from-[#081226] via-[#0a1835] to-[#071124] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/3 w-96 h-28 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-28 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#1c315e]/70">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-red-500 to-orange-600 text-white shadow-lg shadow-red-500/20">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight uppercase">
                PRIORITY-RANKED MAP
              </h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 uppercase">
                Verified Incident GIS
              </span>
            </div>
            <p className="text-xs text-cyan-200/80 font-medium mt-0.5">
              Visualizing verified disaster incidents ranked strictly by priority level (CRITICAL → HIGH → MEDIUM → LOW)
            </p>
          </div>
        </div>

        {/* Priority Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#060c1a] border border-[#1c315e] text-xs font-mono">
          <button
            onClick={() => {
              soundFX.playClick();
              setPriorityFilter('ALL');
            }}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              priorityFilter === 'ALL'
                ? 'bg-cyan-500 text-black shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ALL ({incidents.length})
          </button>
          <button
            onClick={() => {
              soundFX.playClick();
              setPriorityFilter('CRITICAL');
            }}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              priorityFilter === 'CRITICAL'
                ? 'bg-red-600 text-white shadow animate-pulse'
                : 'text-red-400 hover:text-red-300'
            }`}
          >
            🔴 CRITICAL
          </button>
          <button
            onClick={() => {
              soundFX.playClick();
              setPriorityFilter('HIGH');
            }}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              priorityFilter === 'HIGH'
                ? 'bg-orange-500 text-white shadow'
                : 'text-orange-400 hover:text-orange-300'
            }`}
          >
            🟠 HIGH
          </button>
          <button
            onClick={() => {
              soundFX.playClick();
              setPriorityFilter('MEDIUM');
            }}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              priorityFilter === 'MEDIUM'
                ? 'bg-amber-500 text-black shadow'
                : 'text-amber-400 hover:text-amber-300'
            }`}
          >
            🟡 MEDIUM
          </button>
          <button
            onClick={() => {
              soundFX.playClick();
              setPriorityFilter('LOW');
            }}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              priorityFilter === 'LOW'
                ? 'bg-emerald-500 text-black shadow'
                : 'text-emerald-400 hover:text-emerald-300'
            }`}
          >
            🟢 LOW
          </button>
        </div>
      </div>

      {/* Main Map + Selected Incident Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Leaflet Map (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-[#1c315e] relative h-[420px] bg-[#060c18] shadow-inner">
          <MapContainer
            center={mapCenter}
            zoom={13}
            scrollWheelZoom={false}
            className="w-full h-full"
            style={{ background: '#050914' }}
          >
            <RecenterMap center={mapCenter} zoom={13} />
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              maxZoom={19}
            />

            {filteredIncidents.map((inc) => {
              const isSelected = inc.id === selectedIncidentId;
              const icon = createPriorityIcon(inc.priority, isSelected);

              return (
                <Marker
                  key={inc.id}
                  position={inc.coordinates}
                  icon={icon}
                  eventHandlers={{
                    click: () => handleMarkerClick(inc)
                  }}
                >
                  <Popup className="custom-leaflet-popup">
                    <div className="p-1 font-mono text-xs text-slate-900 min-w-[200px]">
                      <div className="font-extrabold text-sm border-b pb-1 mb-1">
                        {inc.id}
                      </div>
                      <div className="space-y-0.5 text-[11px]">
                        <div><strong>Disaster Type:</strong> {inc.disasterType}</div>
                        <div><strong>Location:</strong> {inc.location}</div>
                        <div><strong>Severity:</strong> {inc.severity}</div>
                        <div><strong>Verification:</strong> {inc.verificationStatus}</div>
                        <div><strong>Priority:</strong> {inc.priority}</div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>

          {/* Map Legend Overlay */}
          <div className="absolute bottom-3 left-3 z-[1000] p-2.5 rounded-xl bg-[#060d1edb] backdrop-blur-md border border-[#1c315e] font-mono text-[10px] text-slate-300 space-y-1 shadow-lg">
            <span className="font-bold text-cyan-300 block border-b border-[#1c315e] pb-0.5">
              PRIORITY RANKING
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="text-red-300 font-bold">CRITICAL (Prominent / Pulse)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              <span className="text-orange-300 font-bold">HIGH</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-amber-300 font-bold">MEDIUM</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-emerald-300 font-bold">LOW</span>
            </div>
          </div>
        </div>

        {/* Selected Incident Inspector Panel (4 cols) displaying strictly the 6 requested fields */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-[#060d1e]/95 border-2 border-cyan-500/40 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1c315e]">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                SELECTED INCIDENT INSPECTOR
              </span>
              <span
                className={`text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                  selectedIncident?.priority === 'CRITICAL'
                    ? 'bg-red-500/25 text-red-300 border border-red-500 animate-pulse'
                    : selectedIncident?.priority === 'HIGH'
                    ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                    : selectedIncident?.priority === 'MEDIUM'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                ● {selectedIncident?.priority} PRIORITY
              </span>
            </div>

            {/* Exactly 6 Required Incident Fields */}
            <div className="mt-3.5 space-y-2.5 font-mono text-xs">
              {/* 1. Incident ID */}
              <div className="p-2 rounded-xl bg-[#040814] border border-[#131f3d] flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Incident ID:</span>
                <span className="text-white font-black text-sm">
                  {selectedIncident?.id}
                </span>
              </div>

              {/* 2. Disaster Type */}
              <div className="p-2 rounded-xl bg-[#040814] border border-[#131f3d] flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Disaster Type:</span>
                <span className="text-white font-bold flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                  {selectedIncident?.disasterType}
                </span>
              </div>

              {/* 3. Location */}
              <div className="p-2 rounded-xl bg-[#040814] border border-[#131f3d] flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Location:</span>
                <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {selectedIncident?.location}
                </span>
              </div>

              {/* 4. Severity */}
              <div className="p-2 rounded-xl bg-[#040814] border border-[#131f3d] flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Severity:</span>
                <span
                  className={`font-black ${
                    selectedIncident?.severity === 'HIGH' ? 'text-red-400' : 'text-amber-400'
                  }`}
                >
                  {selectedIncident?.severity}
                </span>
              </div>

              {/* 5. Verification Status */}
              <div className="p-2 rounded-xl bg-[#040814] border border-[#131f3d] flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Verification Status:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {selectedIncident?.verificationStatus}
                </span>
              </div>

              {/* 6. Priority */}
              <div className="p-2 rounded-xl bg-[#040814] border border-[#131f3d] flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Priority:</span>
                <span
                  className={`font-black ${
                    selectedIncident?.priority === 'CRITICAL'
                      ? 'text-red-400 animate-pulse'
                      : selectedIncident?.priority === 'HIGH'
                      ? 'text-orange-400'
                      : selectedIncident?.priority === 'MEDIUM'
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {selectedIncident?.priority}
                </span>
              </div>
            </div>
          </div>

          {/* Connected Action Cue */}
          <div className="pt-3 border-t border-[#1c315e] text-center">
            <span className="text-[10px] font-mono text-slate-400 block italic">
              * Click any marker on the map or record above to re-center inspection.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
