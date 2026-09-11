import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import {
  AlertTriangle,
  Ambulance,
  Building2,
  Home,
  ShieldAlert,
  Layers,
  Crosshair,
  Sparkles,
  CheckCircle2,
  Phone,
  Navigation
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { soundFX } from '../utils/audio';

// Custom Map Helper to Recenter Map dynamically
function ChangeView({ center, zoom }) {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.setView(center, zoom || 13, { animate: true });
    }
  }, [center, zoom, map]);
  return null;
}

// Function to generate stylish SVG DivIcons for Leaflet
const createCustomIcon = (type, severity, title) => {
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
          ? '<span class="absolute -inset-2 rounded-full bg-red-500/40 animate-ping opacity-75 pointer-events-none"></span>'
          : ''
      }
      <div class="w-8 h-8 rounded-full ${bgColor} border-2 ${ringColor} shadow-lg shadow-black/80 flex items-center justify-center text-xs font-bold transition-transform transform group-hover:scale-125">
        <span class="text-sm">${iconEmoji}</span>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-leaflet-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18]
  });
};

export const InteractiveMap = ({ height = 'h-[460px]', showControls = true, onSelectIncident }) => {
  const {
    incidents,
    rescueTeams,
    resources,
    roadBlocks,
    selectedIncident,
    setSelectedIncidentId,
    assignRescueTeam
  } = useDisaster();

  // Layer Visibility Toggles
  const [layers, setLayers] = useState({
    incidents: true,
    teams: true,
    hospitals: true,
    shelters: true,
    blockades: true
  });

  const toggleLayer = (layerKey) => {
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
    soundFX.playClick();
  };

  const mapCenter = selectedIncident?.coordinates || [28.7041, 77.1025];

  return (
    <div className={`relative w-full ${height} rounded-2xl overflow-hidden border border-[#1c315e]/70 shadow-2xl bg-[#080e1d]`}>
      {/* Top Map Layer Control Bar */}
      {showControls && (
        <div className="absolute top-3 left-3 z-[1000] flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#0d152a]/95 backdrop-blur-md border border-[#1c315e]/80 shadow-lg text-xs">
          <div className="flex items-center gap-1 px-2 py-1 text-slate-300 font-semibold border-r border-[#1c315e]/80">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline text-[11px]">Layers:</span>
          </div>

          <button
            onClick={() => toggleLayer('incidents')}
            className={`px-2.5 py-1 rounded-lg font-medium text-[11px] transition-colors cursor-pointer ${
              layers.incidents
                ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🔴 Emergencies ({incidents.length})
          </button>

          <button
            onClick={() => toggleLayer('teams')}
            className={`px-2.5 py-1 rounded-lg font-medium text-[11px] transition-colors cursor-pointer ${
              layers.teams
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🚑 Teams ({rescueTeams.length})
          </button>

          <button
            onClick={() => toggleLayer('hospitals')}
            className={`px-2.5 py-1 rounded-lg font-medium text-[11px] transition-colors cursor-pointer ${
              layers.hospitals
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🏥 Hospitals
          </button>

          <button
            onClick={() => toggleLayer('shelters')}
            className={`px-2.5 py-1 rounded-lg font-medium text-[11px] transition-colors cursor-pointer ${
              layers.shelters
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🏠 Shelters
          </button>

          <button
            onClick={() => toggleLayer('blockades')}
            className={`px-2.5 py-1 rounded-lg font-medium text-[11px] transition-colors cursor-pointer ${
              layers.blockades
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🚧 Blockades
          </button>
        </div>
      )}

      {/* Recenter button */}
      <button
        onClick={() => {
          if (selectedIncident) {
            setSelectedIncidentId(selectedIncident.id);
            soundFX.playClick();
          }
        }}
        className="absolute bottom-4 right-4 z-[1000] p-2.5 rounded-xl bg-[#0d152a]/90 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xl backdrop-blur-md transition-colors cursor-pointer"
        title="Recenter on active incident"
      >
        <Crosshair className="w-4 h-4" />
      </button>

      {/* Map Instance */}
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <ChangeView center={mapCenter} zoom={13} />

        {/* High-Contrast Dark CartoDB Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a> & OpenStreetMap'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Highlight Radius Circle around selected incident */}
        {selectedIncident && (
          <Circle
            center={selectedIncident.coordinates}
            radius={2500}
            pathOptions={{
              color: '#06b6d4',
              fillColor: '#06b6d4',
              fillOpacity: 0.08,
              weight: 1.5,
              dashArray: '4, 8'
            }}
          />
        )}

        {/* Incidents Markers */}
        {layers.incidents &&
          incidents.map((inc) => (
            <Marker
              key={inc.id}
              position={inc.coordinates}
              icon={createCustomIcon('incident', inc.severity, inc.title)}
              eventHandlers={{
                click: () => {
                  setSelectedIncidentId(inc.id);
                  if (onSelectIncident) onSelectIncident(inc);
                  soundFX.playClick();
                }
              }}
            >
              <Popup>
                <div className="p-1 max-w-[260px] text-slate-100">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        inc.priority.includes('Critical')
                          ? 'bg-red-500/30 text-red-300 border border-red-500/40'
                          : inc.priority.includes('High')
                          ? 'bg-orange-500/30 text-orange-300 border border-orange-500/40'
                          : inc.priority.includes('Moderate')
                          ? 'bg-amber-500/30 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {inc.priority}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {inc.reportedAt}
                    </span>
                  </div>

                  <h4 className="text-xs font-extrabold text-white mb-1">
                    {inc.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 mb-2 leading-tight">
                    {inc.description}
                  </p>

                  <div className="grid grid-cols-2 gap-1 text-[10px] bg-[#080e1d] p-1.5 rounded mb-2.5 border border-[#1c315e]">
                    <div>
                      <span className="text-slate-400 block">Affected:</span>
                      <span className="font-bold text-cyan-300">
                        {inc.peopleAffected} People
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Medical:</span>
                      <span className="font-bold text-amber-300">
                        {inc.medicalHelp}
                      </span>
                    </div>
                  </div>

                  {inc.assignedTeam ? (
                    <div className="flex items-center gap-1.5 p-1.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{inc.assignedTeam} Dispatched</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => assignRescueTeam(inc.id, inc.recommendedTeamId)}
                      className="w-full py-1.5 px-2.5 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-bold text-[10px] flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Assign {inc.recommendedTeamId}</span>
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Rescue Teams Markers */}
        {layers.teams &&
          rescueTeams.map((team) => (
            <Marker
              key={team.id}
              position={team.coordinates}
              icon={createCustomIcon('team', null, team.name)}
            >
              <Popup>
                <div className="p-1 text-slate-100 max-w-[220px]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase">
                      {team.id}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                        team.status === 'Available'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}
                    >
                      {team.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">
                    {team.name}
                  </h4>
                  <div className="text-[10px] text-slate-400 space-y-0.5">
                    <div>Lead: <span className="text-slate-200">{team.lead}</span></div>
                    <div>ETA: <span className="text-cyan-300 font-bold">{team.etaMinutes} mins</span> ({team.distanceKm} km)</div>
                    <div>Specialty: <span className="text-slate-200">{team.specialization}</span></div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Hospital Resources Markers */}
        {layers.hospitals &&
          resources
            .filter((r) => r.type === 'Hospital')
            .map((res) => (
              <Marker
                key={res.id}
                position={res.coordinates}
                icon={createCustomIcon('hospital', null, res.name)}
              >
                <Popup>
                  <div className="p-1 text-slate-100 max-w-[220px]">
                    <span className="text-[10px] font-bold text-rose-400 uppercase block">
                      Hospital Facility
                    </span>
                    <h4 className="text-xs font-bold text-white mb-1">
                      {res.name}
                    </h4>
                    <div className="text-[10px] text-slate-300 space-y-0.5">
                      <div>Available Beds: <span className="text-emerald-400 font-bold">{res.availableBeds}</span> / {res.totalBeds}</div>
                      <div>ICU Beds: <span className="text-cyan-400 font-bold">{res.icuBedsAvailable}</span></div>
                      <div>Oxygen: <span className="text-amber-300">{res.oxygenSupply}</span></div>
                      <div>Emergency: <span className="text-slate-200 font-mono">{res.contact}</span></div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

        {/* Shelter Resources Markers */}
        {layers.shelters &&
          resources
            .filter((r) => r.type === 'Shelter')
            .map((res) => (
              <Marker
                key={res.id}
                position={res.coordinates}
                icon={createCustomIcon('shelter', null, res.name)}
              >
                <Popup>
                  <div className="p-1 text-slate-100 max-w-[220px]">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase block">
                      Emergency Relief Shelter
                    </span>
                    <h4 className="text-xs font-bold text-white mb-1">
                      {res.name}
                    </h4>
                    <div className="text-[10px] text-slate-300 space-y-0.5">
                      <div>Intake Capacity: <span className="text-emerald-400 font-bold">{res.availableBeds}</span> spots</div>
                      <div>Food Stocks: <span className="text-cyan-300">{res.foodSuppliesDays} Days</span></div>
                      <div>Potable Water: <span className="text-amber-300">{res.potableWaterLitres}</span></div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

        {/* Blocked Road Segments */}
        {layers.blockades &&
          roadBlocks.map((blk) => (
            <React.Fragment key={blk.id}>
              <Polyline
                positions={blk.coordinates}
                pathOptions={{
                  color: '#EF4444',
                  weight: 5,
                  dashArray: '8, 8',
                  opacity: 0.9
                }}
              />
              <Marker
                position={blk.coordinates[0]}
                icon={createCustomIcon('block', null, blk.name)}
              >
                <Popup>
                  <div className="p-1 text-slate-100 max-w-[200px]">
                    <span className="text-[10px] font-bold text-amber-400 uppercase block">
                      Road Blockade
                    </span>
                    <h4 className="text-xs font-bold text-red-400 mb-1">
                      {blk.name}
                    </h4>
                    <p className="text-[10px] text-slate-300">{blk.reason}</p>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          ))}
      </MapContainer>
    </div>
  );
};
