import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Hospital,
  Home,
  Flame,
  Shield,
  Ambulance,
  MapPin,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  ArrowRight,
  Eye,
  X,
  Phone,
  Layers,
  BedDouble,
  HeartPulse,
  Radio
} from 'lucide-react';
import { InteractiveMap } from '../components/InteractiveMap';
import { soundFX } from '../utils/audio';

// Realistic sample resource data matching exact prompt specifications
const resourceData = [
  {
    id: 'RES-01',
    name: 'District Hospital',
    type: 'Hospital',
    iconType: 'hospital',
    distance: '3.2 km',
    status: '🟢 Available',
    statusBadge: '🟢 Available',
    statusClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    emergencyCapacity: 'High',
    location: 'District Center',
    availableBeds: '24 Available Beds',
    traumaUnit: 'Available (Level 1)',
    ambulanceSupport: 'Available (4 Units)',
    contact: '+91 11 2789 0001'
  },
  {
    id: 'RES-02',
    name: 'City Medical Center',
    type: 'Hospital',
    iconType: 'hospital',
    distance: '5.6 km',
    status: '🟡 Limited Capacity',
    statusBadge: '🟡 Limited Capacity',
    statusClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    emergencyCapacity: 'Medium',
    location: 'North Sector Medical Zone',
    availableBeds: '6 Available Beds',
    traumaUnit: 'Limited',
    ambulanceSupport: 'Available (1 Unit)',
    contact: '+91 11 2789 4455'
  },
  {
    id: 'RES-03',
    name: 'Emergency Shelter A',
    type: 'Shelter',
    iconType: 'shelter',
    distance: '1.8 km',
    totalCapacity: '250 people',
    availableSpace: '120 people',
    status: '🟢 Available',
    statusBadge: '🟢 Available',
    statusClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    emergencyCapacity: 'Ready for Intake',
    location: 'Community Center Complex',
    availableBeds: '120 Spaces Ready',
    traumaUnit: 'First Aid Post',
    ambulanceSupport: 'On Standby',
    contact: '+91 11 2789 8899'
  },
  {
    id: 'RES-04',
    name: 'Community Relief Camp',
    type: 'Shelter',
    iconType: 'shelter',
    distance: '4.2 km',
    totalCapacity: '500 people',
    availableSpace: '75 people',
    status: '🟠 Nearly Full',
    statusBadge: '🟠 Nearly Full',
    statusClass: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    emergencyCapacity: '85% Occupied',
    location: 'Govt High School Grounds',
    availableBeds: '75 Spaces Ready',
    traumaUnit: 'Mobile Clinic',
    ambulanceSupport: 'Standby',
    contact: '+91 11 2789 2211'
  },
  {
    id: 'RES-05',
    name: 'Fire & Rescue Station',
    type: 'Fire Station',
    iconType: 'fire',
    distance: '2.5 km',
    status: '🟢 Operational',
    statusBadge: '🟢 Operational',
    statusClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    availableUnits: '3',
    emergencyCapacity: '3 Tenders Ready',
    location: 'Central Safety Depot',
    availableBeds: 'N/A',
    traumaUnit: 'Rescue Crew Ready',
    ambulanceSupport: 'Available',
    contact: '101 / +91 11 2789 1010'
  },
  {
    id: 'RES-06',
    name: 'Rescue Base Alpha',
    type: 'Rescue Base',
    iconType: 'base',
    distance: '3.8 km',
    status: '🟢 Operational',
    statusBadge: '🟢 Operational',
    statusClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    availableTeams: '4',
    emergencyCapacity: '4 Response Units',
    location: 'District Disaster Staging Base',
    availableBeds: 'N/A',
    traumaUnit: 'Triage Base Ready',
    ambulanceSupport: 'Direct Dispatch',
    contact: '+91 11 2789 9000'
  }
];

export const Resources = () => {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedModalResource, setSelectedModalResource] = useState(null);

  // Filter logic
  const filteredResources = resourceData.filter((res) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'Hospitals') return res.type === 'Hospital';
    if (activeFilter === 'Shelters') return res.type === 'Shelter';
    if (activeFilter === 'Fire Stations') return res.type === 'Fire Station';
    if (activeFilter === 'Police Stations') return res.type === 'Police Station';
    if (activeFilter === 'Rescue Bases') return res.type === 'Rescue Base';
    return true;
  });

  const getResourceIcon = (type) => {
    switch (type) {
      case 'Hospital':
        return <Hospital className="w-5 h-5 text-rose-400" />;
      case 'Shelter':
        return <Home className="w-5 h-5 text-emerald-400" />;
      case 'Fire Station':
        return <Flame className="w-5 h-5 text-orange-400" />;
      case 'Rescue Base':
        return <Ambulance className="w-5 h-5 text-cyan-400" />;
      default:
        return <Building2 className="w-5 h-5 text-blue-400" />;
    }
  };

  const handleOpenDetails = (res) => {
    setSelectedModalResource(res);
    soundFX.playClick();
  };

  const handleNavigateToMap = () => {
    soundFX.playClick();
    navigate('/map');
  };

  return (
    <div className="space-y-7 pb-12 max-w-[1400px] mx-auto">
      {/* ================================================== */}
      {/* 1. PAGE HEADER                                     */}
      {/* ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1c315e]/60">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Building2 className="w-6 h-6 text-cyan-400" />
            <span>Emergency Resources</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            "Find nearby hospitals, shelters, and emergency services."
          </p>
        </div>

        {/* Live Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold font-mono self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>RESOURCE NETWORK LIVE</span>
        </div>
      </div>

      {/* ================================================== */}
      {/* 2. TOP SUMMARY CARDS (4 Simple Summary Cards)      */}
      {/* ================================================== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: 🏥 HOSPITALS */}
        <div className="glass-panel p-5 rounded-2xl border-rose-500/30 hover:border-rose-500/50 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
              🏥 HOSPITALS
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center justify-center">
              <Hospital className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-4xl font-extrabold text-white tracking-tight font-display">
              12
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Emergency medical facilities
            </p>
          </div>
        </div>

        {/* Card 2: 🏠 SHELTERS */}
        <div className="glass-panel p-5 rounded-2xl border-emerald-500/30 hover:border-emerald-500/50 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              🏠 SHELTERS
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Home className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-4xl font-extrabold text-white tracking-tight font-display">
              8
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Safe evacuation locations
            </p>
          </div>
        </div>

        {/* Card 3: 🚒 FIRE STATIONS */}
        <div className="glass-panel p-5 rounded-2xl border-orange-500/30 hover:border-orange-500/50 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-300">
              🚒 FIRE STATIONS
            </span>
            <div className="w-9 h-9 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/30 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-4xl font-extrabold text-white tracking-tight font-display">
              6
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Emergency response units
            </p>
          </div>
        </div>

        {/* Card 4: 🚑 RESCUE BASES */}
        <div className="glass-panel p-5 rounded-2xl border-cyan-500/30 hover:border-cyan-500/50 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              🚑 RESCUE BASES
            </span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <Ambulance className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-4xl font-extrabold text-white tracking-tight font-display">
              5
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Rescue operation centers
            </p>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 3. AI RESOURCE RECOMMENDATION (Highlighted Hero)  */}
      {/* ================================================== */}
      <section className="glass-panel p-6 rounded-3xl border-cyan-500/40 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#0e1d3b] via-[#09152b] to-[#071021]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#1c315e]">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-extrabold text-white tracking-tight">
                🤖 AI RESOURCE RECOMMENDATION
              </h2>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 self-start sm:self-auto">
              REAL-TIME TRIAGE MATCH
            </span>
          </div>

          {/* Active Emergency Context */}
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-extrabold text-red-400 uppercase tracking-wide block">
                🚨 FOR ACTIVE INCIDENT: BRIDGE A FLOOD
              </span>
              <p className="text-xs text-slate-200 mt-0.5 font-medium">
                20 people affected • Medical emergency detected
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40 self-start sm:self-auto">
              P1 CRITICAL
            </span>
          </div>

          {/* Recommended Facilities Split: Hospital & Shelter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* RECOMMENDED MEDICAL FACILITY: 🏥 DISTRICT HOSPITAL */}
            <div className="p-4 rounded-2xl bg-[#080e1d] border border-rose-500/40 flex flex-col justify-between space-y-3 shadow-lg">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 block mb-1">
                  RECOMMENDED MEDICAL FACILITY:
                </span>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <Hospital className="w-4 h-4 text-rose-400" />
                    🏥 DISTRICT HOSPITAL
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    🟢 Available
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2 text-xs font-mono bg-[#0d152a] p-2.5 rounded-xl border border-[#1c315e]">
                  <div>Distance: <strong className="text-white">3.2 km</strong></div>
                  <div>Emergency Capacity: <strong className="text-emerald-400">High</strong></div>
                </div>

                <div className="mt-3 space-y-1 text-xs text-slate-300">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Reason:</div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-200">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Closest suitable hospital</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-200">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>High emergency capacity (24 beds ready)</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-200">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Currently available with trauma unit</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-[#1c315e]">
                <button
                  onClick={handleNavigateToMap}
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 fill-white" />
                  <span>VIEW ON MAP</span>
                </button>
                <button
                  onClick={() => handleOpenDetails(resourceData[0])}
                  className="px-3 py-2 rounded-xl bg-[#0d152a] hover:bg-[#162547] text-slate-200 hover:text-white font-bold text-xs border border-[#1c315e] cursor-pointer"
                >
                  VIEW RESOURCE
                </button>
              </div>
            </div>

            {/* RECOMMENDED SHELTER: 🏠 EMERGENCY SHELTER A */}
            <div className="p-4 rounded-2xl bg-[#080e1d] border border-emerald-500/40 flex flex-col justify-between space-y-3 shadow-lg">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  RECOMMENDED SHELTER:
                </span>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <Home className="w-4 h-4 text-emerald-400" />
                    🏠 EMERGENCY SHELTER A
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    🟢 Available
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2 text-xs font-mono bg-[#0d152a] p-2.5 rounded-xl border border-[#1c315e]">
                  <div>Distance: <strong className="text-white">1.8 km</strong></div>
                  <div>Available Space: <strong className="text-cyan-300">120 people</strong></div>
                </div>

                <div className="mt-3 space-y-1 text-xs text-slate-300">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Reason:</div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-200">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Closest available shelter</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-200">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Enough space for evacuation (120 spots)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-[#1c315e]">
                <button
                  onClick={handleNavigateToMap}
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 fill-black" />
                  <span>VIEW ON MAP</span>
                </button>
                <button
                  onClick={() => handleOpenDetails(resourceData[2])}
                  className="px-3 py-2 rounded-xl bg-[#0d152a] hover:bg-[#162547] text-slate-200 hover:text-white font-bold text-xs border border-[#1c315e] cursor-pointer"
                >
                  VIEW RESOURCE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 4. RESOURCE FILTERS & MAIN RESOURCE GRID           */}
      {/* ================================================== */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-base font-extrabold text-white tracking-tight">
            EMERGENCY RESOURCE DIRECTORY
          </h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { label: 'ALL', key: 'ALL' },
              { label: '🏥 Hospitals', key: 'Hospitals' },
              { label: '🏠 Shelters', key: 'Shelters' },
              { label: '🚒 Fire Stations', key: 'Fire Stations' },
              { label: '👮 Police Stations', key: 'Police Stations' },
              { label: '🚑 Rescue Bases', key: 'Rescue Bases' }
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
        </div>

        {/* Clean Grid of Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="glass-panel p-5 rounded-2xl border-[#1c315e]/70 hover:border-cyan-500/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                      {getResourceIcon(res.type)}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">
                        {res.type}
                      </span>
                      <h3 className="text-sm font-extrabold text-white leading-tight">
                        {res.name}
                      </h3>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${res.statusClass}`}>
                    {res.status}
                  </span>
                </div>

                {/* Specs */}
                <div className="bg-[#080e1d] p-3 rounded-xl border border-[#1c315e] space-y-1.5 text-xs font-mono mb-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Distance:</span>
                    <strong className="text-white">{res.distance}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Emergency Capacity:</span>
                    <strong className="text-cyan-300">{res.emergencyCapacity}</strong>
                  </div>

                  {res.totalCapacity && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Capacity:</span>
                      <strong className="text-slate-200">{res.totalCapacity}</strong>
                    </div>
                  )}

                  {res.availableSpace && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Available Space:</span>
                      <strong className="text-emerald-400">{res.availableSpace}</strong>
                    </div>
                  )}

                  {res.availableUnits && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Available Units:</span>
                      <strong className="text-orange-400">{res.availableUnits} Tenders</strong>
                    </div>
                  )}

                  {res.availableTeams && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Available Teams:</span>
                      <strong className="text-cyan-400">{res.availableTeams} Teams</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-[#1c315e]">
                <button
                  onClick={() => handleOpenDetails(res)}
                  className="w-full py-2 rounded-xl bg-[#0d152a] hover:bg-cyan-500/20 text-cyan-300 hover:text-white font-bold text-xs border border-cyan-500/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>VIEW DETAILS</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================== */}
      {/* 5. RESOURCE MAP SECTION (Nearby Resources Preview) */}
      {/* ================================================== */}
      <section className="glass-panel p-5 rounded-2xl border-[#1c315e]/70 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#1c315e]">
          <div>
            <h2 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              Nearby Emergency Resources
            </h2>
            <p className="text-xs text-slate-400">
              Live GIS proximity mapping for active emergency support
            </p>
          </div>

          <button
            onClick={handleNavigateToMap}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono hover:underline cursor-pointer"
          >
            <span>Open Full Disaster Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Embedded Interactive Map Preview */}
        <InteractiveMap height="h-[360px]" />
      </section>

      {/* ================================================== */}
      {/* 6. RESOURCE DETAILS MODAL                          */}
      {/* ================================================== */}
      {selectedModalResource && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-2xl border-cyan-500/40 p-6 shadow-2xl animate-in zoom-in-95 duration-200 bg-[#0c162e]">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1c315e]">
              <div className="flex items-center gap-2">
                {getResourceIcon(selectedModalResource.type)}
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    {selectedModalResource.type}
                  </span>
                  <h3 className="text-base font-extrabold text-white">
                    {selectedModalResource.name}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedModalResource(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Specifications */}
            <div className="mt-4 space-y-2.5 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e] flex justify-between">
                <span className="text-slate-400">LOCATION:</span>
                <strong className="text-white">{selectedModalResource.location}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e] flex justify-between">
                <span className="text-slate-400">DISTANCE:</span>
                <strong className="text-cyan-300">{selectedModalResource.distance}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e] flex justify-between">
                <span className="text-slate-400">STATUS:</span>
                <strong className="text-emerald-400">{selectedModalResource.status}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e] flex justify-between">
                <span className="text-slate-400">EMERGENCY CAPACITY:</span>
                <strong className="text-white">{selectedModalResource.emergencyCapacity}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e] flex justify-between">
                <span className="text-slate-400">AVAILABLE BEDS / SPACE:</span>
                <strong className="text-emerald-400">{selectedModalResource.availableBeds}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e] flex justify-between">
                <span className="text-slate-400">TRAUMA UNIT:</span>
                <strong className="text-cyan-300">{selectedModalResource.traumaUnit}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e] flex justify-between">
                <span className="text-slate-400">AMBULANCE SUPPORT:</span>
                <strong className="text-white">{selectedModalResource.ambulanceSupport}</strong>
              </div>

              {selectedModalResource.contact && (
                <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e] flex justify-between">
                  <span className="text-slate-400">DIRECT DISPATCH:</span>
                  <strong className="text-cyan-300">{selectedModalResource.contact}</strong>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="mt-5 pt-3 border-t border-[#1c315e] flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedModalResource(null)}
                className="px-4 py-2 rounded-xl bg-[#080e1d] text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={handleNavigateToMap}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow"
              >
                <MapPin className="w-3.5 h-3.5 fill-black" />
                <span>VIEW ON MAP</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
