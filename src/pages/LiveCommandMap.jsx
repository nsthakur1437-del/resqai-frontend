import React, { useMemo, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Activity, Crosshair, Filter, Hospital, Home, MapPin, Radio, ShieldAlert, Users } from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';

const MAP_CENTER = [28.7041, 77.1025];

const incidents = [
  { id: 'INC-01', type: 'Flood', location: 'Village A, North Delhi', severity: 'Critical', status: 'Rescue team en route', affected: 80, time: '8 min ago', coords: [28.7041, 77.1025] },
  { id: 'INC-02', type: 'Landslide', location: 'Mountain Pass, Sector 7', severity: 'High', status: 'Road clearance active', affected: 15, time: '22 min ago', coords: [28.745, 77.135] },
  { id: 'INC-03', type: 'Fire', location: 'Industrial Area, East Zone', severity: 'Medium', status: 'Fire unit responding', affected: 9, time: '31 min ago', coords: [28.675, 77.165] },
  { id: 'INC-04', type: 'Earthquake', location: 'Riverside District', severity: 'Low', status: 'Assessment complete', affected: 4, time: '1 hr ago', coords: [28.69, 77.06] }
];

const fieldAssets = [
  { id: 'TEAM-03', kind: 'Rescue team', name: 'Rescue Team 03', detail: 'Medical response unit', status: 'Available', coords: [28.685, 77.125], icon: '🚑', color: '#22c55e' },
  { id: 'HOSP-01', kind: 'Hospital', name: 'District General Trauma Hospital', detail: '42 ICU / 110 general beds', status: 'Available', coords: [28.718, 77.085], icon: '✚', color: '#fb7185' },
  { id: 'SHELTER-01', kind: 'Shelter', name: 'Community High School Shelter', detail: '120 places available', status: 'Open', coords: [28.725, 77.115], icon: '⌂', color: '#60a5fa' }
];

const severityColors = {
  Critical: { background: '#dc2626', border: '#fca5a5' },
  High: { background: '#f97316', border: '#fdba74' },
  Medium: { background: '#eab308', border: '#fde047' },
  Low: { background: '#16a34a', border: '#86efac' }
};

function FocusMap({ target }) {
  const map = useMap();
  React.useEffect(() => {
    map.setView(target.center, target.zoom, { animate: true });
  }, [map, target]);
  return null;
}

function markerIcon(background, border, label, pulse = false) {
  return L.divIcon({
    className: 'resqai-map-marker',
    html: `<span style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:${background};border:2px solid ${border};box-shadow:0 4px 16px rgba(0,0,0,.5);font-size:15px;${pulse ? 'animation:resqai-marker-pulse 1.6s infinite;' : ''}">${label}</span>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -16]
  });
}

function IncidentPopup({ incident }) {
  return (
    <div className="min-w-[190px] space-y-2 text-sm">
      <div className="flex items-center justify-between gap-3"><strong>{incident.type} incident</strong><span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700">{incident.severity}</span></div>
      <div><b>Location:</b> {incident.location}</div>
      <div><b>Status:</b> {incident.status}</div>
      <div><b>Affected:</b> {incident.affected} people</div>
      <div className="text-xs text-slate-500">Reported {incident.time} · {incident.id}</div>
    </div>
  );
}

export const LiveCommandMap = () => {
  const { incidents: contextIncidents, rescueTeams, resources, selectedIncidentId, setSelectedIncidentId } = useDisaster();
  const [incidentType, setIncidentType] = useState('All');
  const [severity, setSeverity] = useState('All');
  const [mapTarget, setMapTarget] = useState({ center: MAP_CENTER, zoom: 13 });
  const liveIncidents = useMemo(() => contextIncidents.filter((incident) => incident.status !== 'Resolved').map((incident) => ({
    id: incident.id,
    type: incident.disaster === 'Cloudburst' ? 'Flood' : incident.disaster,
    location: incident.location,
    severity: incident.severity === 'Moderate' ? 'Medium' : incident.severity,
    status: incident.assignedTeam ? 'Rescue team assigned' : incident.status,
    affected: incident.peopleAffected || 0,
    time: incident.reportedAt,
    coords: incident.coordinates,
    assignedTeam: incident.assignedTeam
  })), [contextIncidents]);
  const selectedIncident = liveIncidents.find((incident) => incident.id === selectedIncidentId) || liveIncidents[0] || incidents[0];
  const liveAssets = [
    ...rescueTeams.map((team) => ({ id: team.id, kind: 'Rescue team', name: team.name, detail: `${team.crewSize} members · ${team.specialization}`, status: team.status, coords: team.coordinates, icon: '🚑', color: '#22c55e' })),
    ...resources.filter((resource) => resource.type === 'Hospital' || resource.type === 'Shelter').map((resource) => ({ id: resource.id, kind: resource.type, name: resource.name, detail: resource.capacityStatus, status: resource.status, coords: resource.coordinates, icon: resource.type === 'Hospital' ? '✚' : '⌂', color: resource.type === 'Hospital' ? '#fb7185' : '#60a5fa' }))
  ];

  const visibleIncidents = useMemo(
    () => liveIncidents.filter((incident) => (incidentType === 'All' || incident.type === incidentType) && (severity === 'All' || incident.severity === severity)),
    [incidentType, severity, liveIncidents]
  );

  const selectIncident = (incident) => {
    setSelectedIncidentId(incident.id);
    setMapTarget({ center: incident.coords, zoom: 15 });
  };

  return (
    <div className="mx-auto max-w-[1500px] space-y-5 pb-12">
      <header className="flex flex-col justify-between gap-4 border-b border-slate-700/70 pb-4 sm:flex-row sm:items-center">
        <div><div className="flex items-center gap-3"><div className="rounded-xl bg-cyan-500/15 p-2 text-cyan-300"><MapPin className="h-6 w-6" /></div><h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">Live Map</h1><span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300"><Radio className="h-3 w-3" /> Live</span></div><p className="mt-2 text-sm text-slate-300">Interactive incident and response asset map.</p></div>
        <button onClick={() => setMapTarget({ center: MAP_CENTER, zoom: 13 })} className="inline-flex items-center gap-2 self-start rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-xs font-bold text-cyan-200 transition hover:bg-cyan-500/20 sm:self-auto"><Crosshair className="h-4 w-4" /> Reset view</button>
      </header>

      <section className="glass-panel flex flex-col gap-4 rounded-2xl p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2"><span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400"><Filter className="h-4 w-4 text-cyan-300" /> Incident type</span>{['All', 'Landslide', 'Flood', 'Fire', 'Earthquake'].map((value) => <button key={value} onClick={() => setIncidentType(value)} className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${incidentType === value ? 'border-cyan-400/50 bg-cyan-500/15 text-cyan-200' : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:text-white'}`}>{value}</button>)}</div>
        <div className="flex flex-wrap items-center gap-2"><span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Severity</span>{['All', 'Critical', 'High', 'Medium', 'Low'].map((value) => <button key={value} onClick={() => setSeverity(value)} className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${severity === value ? 'border-cyan-400/50 bg-cyan-500/15 text-cyan-200' : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:text-white'}`}>{value}</button>)}</div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
        <section className="glass-panel relative overflow-hidden rounded-2xl p-2"><div className="h-[520px] min-h-[420px] w-full overflow-hidden rounded-xl sm:h-[640px]"><MapContainer center={MAP_CENTER} zoom={13} scrollWheelZoom className="h-full w-full" zoomControl><FocusMap target={mapTarget} /><TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /><Circle center={MAP_CENTER} radius={900} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.08, weight: 1, dashArray: '6 8' }} />
          {visibleIncidents.map((incident) => <Marker key={incident.id} position={incident.coords} icon={markerIcon(severityColors[incident.severity].background, severityColors[incident.severity].border, '!', incident.severity === 'Critical')} eventHandlers={{ click: () => selectIncident(incident) }}><Popup><IncidentPopup incident={incident} /></Popup></Marker>)}
          {liveAssets.map((asset) => <Marker key={asset.id} position={asset.coords} icon={markerIcon(asset.color, '#e2e8f0', asset.icon)}><Popup><div className="min-w-[180px] space-y-1 text-sm"><strong>{asset.name}</strong><div>{asset.kind}</div><div>{asset.detail}</div><div className="font-semibold text-emerald-600">{asset.status}</div></div></Popup></Marker>)}
        </MapContainer></div><div className="pointer-events-none absolute bottom-5 left-5 z-[400] rounded-xl border border-slate-700 bg-slate-950/85 p-3 text-xs text-slate-200 shadow-xl backdrop-blur-md"><div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Map legend</div><div className="grid grid-cols-2 gap-x-4 gap-y-1.5"><span><b className="text-red-400">!</b> Critical</span><span><b className="text-orange-400">!</b> High</span><span><b className="text-green-400">!</b> Low</span><span>🚑 Teams</span><span>✚ Hospitals</span><span>⌂ Shelters</span></div></div></section>

        <aside className="space-y-4"><section className="glass-panel rounded-2xl p-4"><div className="mb-4 flex items-center justify-between"><div><div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Selected incident</div><h2 className="mt-1 text-lg font-bold text-white">{selectedIncident.type}</h2></div><ShieldAlert className="h-5 w-5 text-red-300" /></div><div className="space-y-2 text-sm text-slate-300"><div><b className="text-slate-100">Location:</b> {selectedIncident.location}</div><div><b className="text-slate-100">Severity:</b> {selectedIncident.severity}</div><div><b className="text-slate-100">Status:</b> {selectedIncident.status}</div><div><b className="text-slate-100">Affected:</b> {selectedIncident.affected} people</div><div><b className="text-slate-100">Reported:</b> {selectedIncident.time}</div></div><button onClick={() => setMapTarget({ center: selectedIncident.coords, zoom: 15 })} className="mt-4 w-full rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-xs font-bold text-cyan-200 hover:bg-cyan-500/20">Focus incident</button></section>
          <section className="glass-panel rounded-2xl p-4"><div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold text-white">Visible incidents</h2><span className="rounded-full bg-cyan-500/10 px-2 py-1 text-xs font-bold text-cyan-300">{visibleIncidents.length}</span></div><div className="space-y-2">{visibleIncidents.map((incident) => <button key={incident.id} onClick={() => selectIncident(incident)} className="flex w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-900/60 p-3 text-left transition hover:border-cyan-500/40"><span><span className="block text-sm font-semibold text-white">{incident.type}</span><span className="block text-xs text-slate-400">{incident.location}</span></span><span className="text-[10px] font-bold uppercase text-slate-300">{incident.severity}</span></button>)}</div></section>
          <section className="glass-panel rounded-2xl p-4"><div className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Response assets</div><div className="grid grid-cols-3 gap-2 text-center text-xs text-slate-300"><div className="rounded-xl bg-emerald-500/10 p-3"><Users className="mx-auto mb-1 h-4 w-4 text-emerald-300" />Teams</div><div className="rounded-xl bg-rose-500/10 p-3"><Hospital className="mx-auto mb-1 h-4 w-4 text-rose-300" />Hospitals</div><div className="rounded-xl bg-blue-500/10 p-3"><Home className="mx-auto mb-1 h-4 w-4 text-blue-300" />Shelters</div></div></section>
        </aside>
      </div>
    </div>
  );
};
