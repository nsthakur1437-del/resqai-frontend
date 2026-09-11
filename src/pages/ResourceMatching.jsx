import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LifeBuoy,
  Ambulance,
  Shield,
  Truck,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Clock,
  Compass,
  ArrowRight,
  ShieldCheck,
  Check,
  Edit3,
  Sparkles,
  Zap,
  RotateCcw,
  HelpCircle,
  X,
  Users,
  Radio,
  Cpu,
  Layers,
  Activity,
  Award,
  Navigation,
  ExternalLink,
  Flame
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { DemoProgressBar } from '../components/DemoProgressBar';
import { soundFX } from '../utils/audio';

// Available Resources Data matching prompt specifications
const initialResources = [
  {
    id: 'RES-01',
    name: 'BOAT #07 (Swift-Water Rescue Unit)',
    type: 'boat',
    icon: LifeBuoy,
    iconColor: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/40',
    status: 'Available',
    statusBadge: '🟢 AVAILABLE NOW',
    statusClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    distanceKm: 1.2,
    etaMinutes: 6,
    equipment: ['Rescue Boat (Rigid Inflatable)', 'Life Jackets (x40)', 'Throw Ropes', 'Paramedic Trauma Bag'],
    equipmentMatch: 'Perfect Match (Water Rescue)',
    capacity: '20 people / trip',
    routeStatus: '✓ Alternative Route Available',
    matchScore: 98,
    isRecommended: true,
    reasons: [
      'Closest available water rescue resource (1.2 km)',
      'Required rescue equipment available on board',
      'Alternative route bypasses main road flooding',
      'Suitable for high-velocity flood current conditions',
      'High capacity for rapid evacuation'
    ]
  },
  {
    id: 'RES-02',
    name: 'RESCUE TEAM #03 (Field Medical Squad)',
    type: 'ambulance',
    icon: Ambulance,
    iconColor: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/40',
    status: 'Available',
    statusBadge: '🟢 AVAILABLE',
    statusClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    distanceKm: 2.4,
    etaMinutes: 11,
    equipment: ['First Aid & Trauma Kit', 'Emergency Transport', 'Oxygen Tanks', 'Stretchers'],
    equipmentMatch: 'Partial Match (Medical Support)',
    capacity: '10 people',
    routeStatus: '✓ Alternative Route Available',
    matchScore: 92,
    isRecommended: false,
    reasons: [
      'Equipped with advanced trauma and paramedic gear',
      'Longer ETA than Boat #07 (11 mins vs 6 mins)',
      'Ground vehicle cannot penetrate > 1m deep flood water without marine support'
    ]
  },
  {
    id: 'RES-03',
    name: 'BOAT #04 (Marine Patrol 2)',
    type: 'boat',
    icon: LifeBuoy,
    iconColor: 'text-orange-400 bg-orange-500/20 border-orange-500/40',
    status: 'Currently Assigned',
    statusBadge: '🟠 CURRENTLY ASSIGNED',
    statusClass: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    distanceKm: 1.8,
    etaMinutes: 14,
    equipment: ['Rescue Boat', 'Searchlights'],
    equipmentMatch: 'Good Match',
    capacity: '12 people',
    routeStatus: 'Route Congested',
    matchScore: null,
    isRecommended: false,
    reasons: [
      'Currently deployed to River Valley sector',
      'Estimated task completion in 35 minutes',
      'Unavailable for immediate Village A dispatch'
    ]
  },
  {
    id: 'RES-04',
    name: 'FIRE & RESCUE UNIT #02 (Heavy Extrication)',
    type: 'fire',
    icon: Flame,
    iconColor: 'text-red-400 bg-red-500/20 border-red-500/40',
    status: 'Available',
    statusBadge: '🟢 AVAILABLE',
    statusClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    distanceKm: 4.8,
    etaMinutes: 18,
    equipment: ['Emergency Rescue Equipment', 'Medical Support', 'Hydraulic Cutters', 'High-volume Pump'],
    equipmentMatch: 'Good Match (Extrication)',
    capacity: '6 people',
    routeStatus: '✓ Alternative Route Available',
    matchScore: 78,
    isRecommended: false,
    reasons: [
      'Heaviest extrication capability for collapsed structures',
      'Furthest away from Village A (4.8 km / 18 min ETA)',
      'Over-specialized for water surface rescue'
    ]
  }
];

export const ResourceMatching = () => {
  const navigate = useNavigate();
  const { setSelectedIncidentId, addToast } = useDisaster();

  const [resourcesList, setResourcesList] = useState(initialResources);
  const [selectedResourceId, setSelectedResourceId] = useState('RES-01');
  const [isApproved, setIsApproved] = useState(false);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);

  const selectedResource = resourcesList.find((r) => r.id === selectedResourceId) || resourcesList[0];

  // Human Approval Action
  const handleApproveResource = () => {
    soundFX.playSuccess();
    setIsApproved(true);
    addToast(
      '✓ Resource Approved for Dispatch',
      `${selectedResource.name} approved by Emergency Coordinator for Village A Flood.`,
      'success'
    );
  };

  // Change Resource Override Action
  const handleSelectDifferentResource = (resourceId) => {
    soundFX.playClick();
    setSelectedResourceId(resourceId);
    setIsApproved(false);
    setIsChangeModalOpen(false);
    const chosen = resourcesList.find(r => r.id === resourceId);
    addToast(
      'Resource Selection Changed',
      `Manual coordinator override: selected ${chosen?.name}.`,
      'info'
    );
  };

  // Navigate to Dispatch Center / Coordination
  const handleProceedToDispatch = () => {
    soundFX.playClick();
    setSelectedIncidentId('INC-101'); // Linked Village/Bridge A
    navigate('/coordination');
  };

  return (
    <div className="space-y-7 pb-16 max-w-[1450px] mx-auto">
      {/* Demo Progress Bar (Step 4: Resource Matching) */}
      <DemoProgressBar currentStep={4} />

      {/* ================================================== */}
      {/* 1. PAGE HEADER                                     */}
      {/* ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1c315e]/70">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 via-teal-500 to-blue-600 text-black shadow-lg shadow-cyan-500/20">
                <LifeBuoy className="w-6 h-6" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-teal-300">
                Resource Matching
              </span>
            </h1>

            <span className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase shadow">
              AI-ASSISTED RESOURCE DECISION
            </span>
          </div>

          <p className="text-xs sm:text-sm text-cyan-200/80 mt-1.5 font-medium italic">
            "AI recommends the most suitable emergency resource for every verified incident."
          </p>
        </div>

        {/* Live Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#08152c] border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold self-start sm:self-auto shadow-inner">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
          </span>
          <span>● RESOURCE MATCHING ENGINE LIVE</span>
        </div>
      </div>

      {/* ================================================== */}
      {/* 2. SELECTED INCIDENT CARD (Prompt Spec)            */}
      {/* ================================================== */}
      <section className="glass-panel p-5 rounded-2xl border-red-500/40 shadow-2xl bg-gradient-to-r from-[#190a16] via-[#0f1730] to-[#0a1224] relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-80 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-[#1c315e]/80 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-red-400 block">
                🚨 SELECTED INCIDENT FOR DISPATCH
              </span>
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                VILLAGE A FLOOD
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-bold">
            <span className="px-2.5 py-1 rounded-lg bg-red-500/20 text-red-300 border border-red-500/40">
              🔴 P1 — CRITICAL
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              PRIORITY APPROVED
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              READY FOR RESOURCE MATCHING
            </span>
          </div>
        </div>

        {/* Incident Key Metrics Row */}
        <div className="mt-3.5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs font-mono relative z-10">
          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
            <span className="text-[10px] text-slate-400 block font-bold">📍 LOCATION</span>
            <span className="text-white font-extrabold mt-0.5 block">Village A</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
            <span className="text-[10px] text-slate-400 block font-bold">👥 PEOPLE AFFECTED</span>
            <span className="text-cyan-300 font-extrabold mt-0.5 block">80 People</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
            <span className="text-[10px] text-slate-400 block font-bold">🌊 DISASTER TYPE</span>
            <span className="text-orange-300 font-extrabold mt-0.5 block">Severe Flooding</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
            <span className="text-[10px] text-slate-400 block font-bold">🚧 ACCESS CONDITIONS</span>
            <span className="text-red-300 font-extrabold mt-0.5 block">Main Road Blocked</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-cyan-500/30 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-cyan-300 block font-bold">🏥 REQUIRED ASSETS</span>
            <span className="text-emerald-300 font-extrabold text-[11px] mt-0.5 block">
              Rescue Boat + Med Team
            </span>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 3. AI REQUIREMENT ANALYSIS BANNER                  */}
      {/* ================================================== */}
      <section className="glass-panel p-5 rounded-2xl border-cyan-500/30 shadow-xl bg-gradient-to-r from-[#071126] via-[#0a1836] to-[#071126]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[#1c315e]/60">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
              🤖 AI REQUIREMENT ANALYSIS
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Derived from Multi-Modal Inundation & Victim Telemetry
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-3 italic">
          "Based on the verified incident, ResQAI identifies the following operational needs:"
        </p>

        {/* 4 Need Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-[#060c1a] border border-cyan-500/40 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300">
              <LifeBuoy className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block font-mono">🛟 WATER RESCUE</span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">✓ Required (High Current)</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#060c1a] border border-emerald-500/40 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
              <Ambulance className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block font-mono">🏥 MEDICAL SUPPORT</span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">✓ Required (Triage Ready)</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#060c1a] border border-blue-500/40 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-300">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block font-mono">🚑 TRANSPORT</span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">✓ Required (Evac Batch 20+)</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#060c1a] border border-orange-500/40 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/20 text-orange-300">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block font-mono">🚧 ROUTE ANALYSIS</span>
              <span className="text-[10px] text-orange-300 font-mono font-bold">✓ Alt Route Identified</span>
            </div>
          </div>
        </div>

        {/* Formula Flow */}
        <div className="mt-3.5 pt-2.5 border-t border-[#1c315e]/70 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-slate-300">
          <span className="px-2 py-0.5 rounded bg-[#081226] border border-[#1c315e] text-slate-200">
            INCIDENT REQUIREMENTS
          </span>
          <span className="text-cyan-400 font-bold">→</span>
          <span className="px-2 py-0.5 rounded bg-[#081226] border border-cyan-500/30 text-cyan-300">
            🤖 AI ANALYSIS
          </span>
          <span className="text-cyan-400 font-bold">→</span>
          <span className="px-2 py-0.5 rounded bg-[#081226] border border-[#1c315e] text-slate-200">
            AVAILABLE RESOURCES
          </span>
          <span className="text-cyan-400 font-bold">→</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold">
            BEST MATCH (98%)
          </span>
        </div>
      </section>

      {/* ================================================== */}
      {/* 4. MAIN TWO-COLUMN: AVAILABLE RESOURCES & AI MATCH */}
      {/* ================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ============================================== */}
        {/* LEFT: AVAILABLE RESOURCES LIST (6 Cols)        */}
        {/* ============================================== */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-white font-mono flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>AVAILABLE RESCUE RESOURCES ({resourcesList.length})</span>
            </h2>
            <span className="text-[10px] font-mono text-cyan-300">
              Live GIS Telemetry Range: 5 km
            </span>
          </div>

          <div className="space-y-3">
            {resourcesList.map((res) => {
              const isSelected = res.id === selectedResourceId;
              const isAvailable = res.status === 'Available';
              const Icon = res.icon;

              return (
                <div
                  key={res.id}
                  onClick={() => {
                    if (isAvailable) {
                      setSelectedResourceId(res.id);
                      soundFX.playClick();
                    }
                  }}
                  className={`p-4 rounded-2xl border transition-all duration-200 relative ${
                    isAvailable ? 'cursor-pointer' : 'opacity-70 cursor-not-allowed'
                  } ${
                    isSelected
                      ? 'bg-[#101e3d] border-cyan-400 ring-2 ring-cyan-500/40 shadow-xl shadow-cyan-950'
                      : 'bg-[#080e1d]/95 hover:bg-[#0c1833] border-[#1c315e]/80'
                  }`}
                >
                  {/* Recommended Badge */}
                  {res.isRecommended && (
                    <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-gradient-to-l from-emerald-500 via-teal-500 to-transparent text-black text-[9px] font-extrabold uppercase font-mono tracking-wider rounded-bl-xl shadow flex items-center gap-1">
                      <Award className="w-3 h-3 text-black" />
                      AI #1 RECOMMENDED MATCH
                    </div>
                  )}

                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl border ${res.iconColor}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-extrabold text-white font-mono tracking-tight">
                          {res.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] font-mono text-slate-400">
                          <span>📍 Distance: <strong className="text-slate-200">{res.distanceKm} km</strong></span>
                          <span>•</span>
                          <span>ETA: <strong className="text-cyan-300">{res.etaMinutes} mins</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      {res.matchScore ? (
                        <span className="text-sm font-extrabold text-emerald-400 font-display block">
                          {res.matchScore}% <span className="text-[10px] font-mono text-slate-400">Match</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-orange-400 font-bold block">
                          Assigned
                        </span>
                      )}
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${res.statusClass} mt-0.5 inline-block`}>
                        {res.statusBadge}
                      </span>
                    </div>
                  </div>

                  {/* Equipment & Capacity Line */}
                  <div className="mt-2.5 pt-2 border-t border-[#1c315e]/50 grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div>
                      <span className="text-[9px] text-slate-400 block font-bold">EQUIPMENT ON BOARD:</span>
                      <span className="text-slate-200 text-[10px] truncate block">
                        {res.equipment.slice(0, 2).join(', ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block font-bold">CAPACITY / ROUTE:</span>
                      <span className="text-emerald-300 text-[10px] block">
                        {res.capacity} ({res.routeStatus})
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================== */}
        {/* RIGHT: AI BEST RESOURCE RECOMMENDATION (6 Cols) */}
        {/* ============================================== */}
        <div className="lg:col-span-6 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border-cyan-500/40 shadow-2xl bg-gradient-to-b from-[#0c1833] via-[#09142b] to-[#060e1e] flex flex-col justify-between min-h-[580px]">
            <div>
              {/* Header */}
              <div className="pb-3 border-b border-[#1c315e] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25">
                    <LifeBuoy className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                      <span>🤖 AI BEST RESOURCE RECOMMENDATION</span>
                    </h2>
                    <p className="text-[11px] text-cyan-300 font-mono">
                      Multi-Parameter Optimization (Distance + Gear + Terrain)
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 block">MATCH SCORE</span>
                  <span className="text-xl font-extrabold text-emerald-400 font-display">
                    {selectedResource.matchScore || 98}%
                  </span>
                </div>
              </div>

              {/* Selected Resource Spotlight */}
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#091d3d] to-[#071329] border border-cyan-400/60 shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                      RECOMMENDED UNIT:
                    </span>
                    <span className="text-sm font-extrabold text-white">
                      {selectedResource.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    🟢 AVAILABLE NOW
                  </span>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono py-1">
                  <div className="bg-[#050e1f] p-2 rounded-lg border border-cyan-500/30">
                    <span className="text-[10px] text-slate-400 block">DISTANCE</span>
                    <span className="text-white font-extrabold text-sm">{selectedResource.distanceKm} km</span>
                  </div>

                  <div className="bg-[#050e1f] p-2 rounded-lg border border-cyan-500/30">
                    <span className="text-[10px] text-slate-400 block">EST. ARRIVAL</span>
                    <span className="text-emerald-400 font-extrabold text-sm">{selectedResource.etaMinutes} mins</span>
                  </div>

                  <div className="bg-[#050e1f] p-2 rounded-lg border border-cyan-500/30">
                    <span className="text-[10px] text-slate-400 block">EVAC CAPACITY</span>
                    <span className="text-cyan-300 font-extrabold text-sm">{selectedResource.capacity.split(' ')[0]} / run</span>
                  </div>
                </div>

                {/* Why Selected Reasons List */}
                <div className="pt-2 border-t border-[#1c315e]/70">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 block mb-1.5">
                    WHY {selectedResource.name.split(' ')[0]} {selectedResource.name.split(' ')[1]}?
                  </span>
                  <ul className="space-y-1 text-xs text-slate-200 font-medium">
                    {selectedResource.reasons.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* HUMAN-IN-THE-LOOP APPROVAL SECTION */}
              <div className="mt-4 p-3.5 rounded-xl bg-[#09152b] border border-cyan-400/40 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold text-cyan-300 flex items-center gap-1.5">
                    <span>👤 HUMAN DECISION REQUIRED</span>
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">
                    AUTHORIZATION STEP
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-snug">
                  "AI recommends the best available resource, but final dispatch approval remains with the emergency coordinator."
                </p>

                {/* State display */}
                {isApproved ? (
                  <div className="py-2 px-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>✓ RESOURCE APPROVED — READY FOR DISPATCH</span>
                    </div>
                    <span className="text-[10px] text-slate-300">AUTH: OP-CHIEF-01</span>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                    <button
                      onClick={handleApproveResource}
                      className="w-full sm:flex-1 py-2.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>✓ APPROVE RESOURCE</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsChangeModalOpen(true);
                        soundFX.playClick();
                      }}
                      className="w-full sm:w-auto py-2.5 px-3 rounded-lg bg-[#0d172e] hover:bg-[#132347] text-slate-300 hover:text-white border border-[#1c315e] font-mono text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>CHOOSE DIFFERENT RESOURCE</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* NEXT ACTION: PROCEED TO DISPATCH CENTER */}
            <div className="mt-5 pt-3 border-t border-[#1c315e] space-y-2">
              <button
                onClick={handleProceedToDispatch}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/60 transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-2"
              >
                <span>PROCEED TO DISPATCH CENTER</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-[10px] text-slate-400 font-mono text-center block">
                Passes {selectedResource.name.split(' ')[0]} {selectedResource.name.split(' ')[1]} (ETA: {selectedResource.etaMinutes} mins) to Live Dispatch Terminal.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* 5. RESOURCE COMPARISON (Why Boat #07 Was Selected) */}
      {/* ================================================== */}
      <section className="glass-panel p-6 rounded-2xl border-cyan-500/30 shadow-2xl bg-gradient-to-r from-[#071126] via-[#0b1a38] to-[#071126]">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-300 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            TRANSPARENT RESOURCE TRADEOFF ANALYSIS
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
            "Why Boat #07 Was Selected"
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            ResQAI evaluates distance, water navigation capability, road blockages, and equipment suitability.
          </p>
        </div>

        {/* 3-Card Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Option 1: Boat #07 (Selected Winner) */}
          <div className="p-4 rounded-2xl bg-[#081822] border-2 border-emerald-500/60 space-y-3 relative shadow-xl shadow-emerald-950/40">
            <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-emerald-500 text-black text-[9px] font-extrabold uppercase font-mono tracking-wider rounded-bl-xl">
              ✓ RECOMMENDED
            </div>

            <div className="flex items-center gap-2">
              <LifeBuoy className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-extrabold text-white font-mono">
                BOAT #07
              </h3>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-[#1c315e]/50">
                <span className="text-slate-400">Distance:</span>
                <span className="text-white font-bold">1.2 km (Closest)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1c315e]/50">
                <span className="text-slate-400">Availability:</span>
                <span className="text-emerald-400 font-bold">Available</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1c315e]/50">
                <span className="text-slate-400">Equipment:</span>
                <span className="text-cyan-300 font-bold">Perfect Match</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1c315e]/50">
                <span className="text-slate-400">Route:</span>
                <span className="text-emerald-400 font-bold">Available (Alt Route)</span>
              </div>
              <div className="flex justify-between py-1 pt-2">
                <span className="text-slate-300 font-bold">AI Match Score:</span>
                <span className="text-emerald-300 text-base font-extrabold font-display">98%</span>
              </div>
            </div>
          </div>

          {/* Option 2: Rescue Team #03 */}
          <div className="p-4 rounded-2xl bg-[#080e1d] border border-[#1c315e] space-y-3">
            <div className="flex items-center gap-2">
              <Ambulance className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-extrabold text-white font-mono">
                RESCUE TEAM #03
              </h3>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-[#1c315e]/50">
                <span className="text-slate-400">Distance:</span>
                <span className="text-slate-300">2.4 km</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1c315e]/50">
                <span className="text-slate-400">Availability:</span>
                <span className="text-emerald-400">Available</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1c315e]/50">
                <span className="text-slate-400">Equipment:</span>
                <span className="text-orange-300">Partial Match</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1c315e]/50">
                <span className="text-slate-400">Route:</span>
                <span className="text-emerald-400">Available</span>
              </div>
              <div className="flex justify-between py-1 pt-2">
                <span className="text-slate-300 font-bold">AI Match Score:</span>
                <span className="text-cyan-300 text-base font-extrabold font-display">92%</span>
              </div>
            </div>
          </div>

          {/* Option 3: Fire & Rescue Unit #02 */}
          <div className="p-4 rounded-2xl bg-[#080e1d] border border-[#1c315e] space-y-3">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-red-400" />
              <h3 className="text-sm font-extrabold text-white font-mono">
                FIRE & RESCUE UNIT #02
              </h3>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-[#1c315e]/50">
                <span className="text-slate-400">Distance:</span>
                <span className="text-slate-300">4.8 km</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1c315e]/50">
                <span className="text-slate-400">Availability:</span>
                <span className="text-emerald-400">Available</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1c315e]/50">
                <span className="text-slate-400">Equipment:</span>
                <span className="text-cyan-300">Good Match</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1c315e]/50">
                <span className="text-slate-400">Route:</span>
                <span className="text-emerald-400">Available</span>
              </div>
              <div className="flex justify-between py-1 pt-2">
                <span className="text-slate-300 font-bold">AI Match Score:</span>
                <span className="text-slate-300 text-base font-extrabold font-display">78%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 6. GIS ROUTE ANALYSIS (MAP-STYLE PANEL)            */}
      {/* ================================================== */}
      <section className="glass-panel p-5 rounded-2xl border-cyan-500/30 shadow-2xl bg-gradient-to-r from-[#081224] via-[#091836] to-[#081224]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[#1c315e]/70">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-white font-mono">
              🗺️ AI ROUTE ANALYSIS
            </h2>
          </div>
          <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
            GIS Obstacle Avoidance Active
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Visual Route Pipeline Box */}
          <div className="lg:col-span-8 p-4 rounded-xl bg-[#060c1a] border border-[#1c315e] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <span className="p-1.5 px-2.5 rounded bg-red-950/40 text-red-300 border border-red-500/30 font-bold">
                🚨 VILLAGE A FLOOD (Target)
              </span>
              <span className="text-cyan-400 font-bold">←</span>
              <span className="p-1.5 px-2.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 font-bold">
                RECOMMENDED ALTERNATIVE ROUTE (1.2 km)
              </span>
              <span className="text-cyan-400 font-bold">←</span>
              <span className="p-1.5 px-2.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 font-bold">
                🚤 BOAT #07 (Origin)
              </span>
            </div>

            {/* Simulated Road Hazard Markers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-[#1c315e]/50">
              <div className="p-2 rounded-lg bg-red-950/20 border border-red-500/30 text-red-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <div>
                  <span className="font-bold block text-[11px]">🚧 MAIN ROAD BLOCKED</span>
                  <span className="text-[10px] text-slate-400">1.8m Inundation at KM 12</span>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="font-bold block text-[11px]">✓ ALTERNATIVE ROUTE IDENTIFIED</span>
                  <span className="text-[10px] text-slate-400">High-levee waterway access (Clear)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="lg:col-span-4 p-4 rounded-xl bg-[#08152c] border border-cyan-500/40 text-center space-y-2">
            <div className="text-xs font-mono text-slate-300 font-bold">
              ESTIMATED TRANSIT METRICS:
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-[#050e1f] p-2 rounded border border-[#1c315e]">
                <span className="text-slate-400 block text-[10px]">DISTANCE</span>
                <span className="text-white font-extrabold text-sm">1.2 km</span>
              </div>
              <div className="bg-[#050e1f] p-2 rounded border border-[#1c315e]">
                <span className="text-slate-400 block text-[10px]">ARRIVAL TIME</span>
                <span className="text-emerald-400 font-extrabold text-sm">6 minutes</span>
              </div>
            </div>
            <span className="text-[9px] text-cyan-400/80 font-mono italic block">
              * Demo route visualization using simulated prototype data.
            </span>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 7. CHOOSE DIFFERENT RESOURCE MODAL                 */}
      {/* ================================================== */}
      {isChangeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-lg rounded-2xl border-cyan-500/40 p-6 shadow-2xl animate-in zoom-in-95 duration-200 bg-[#0c162e]">
            <div className="flex items-center justify-between pb-3 border-b border-[#1c315e]">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-cyan-300 block">
                  HUMAN DISPATCH CONTROL
                </span>
                <h3 className="text-base font-extrabold text-white mt-0.5">
                  Select Emergency Resource
                </h3>
              </div>
              <button
                onClick={() => setIsChangeModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-[#080e1d] border border-[#1c315e] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              <p className="text-xs text-slate-300">
                Choose which unit to dispatch to <strong className="text-white">Village A Flood</strong>:
              </p>

              <div className="space-y-2">
                {[
                  { id: 'RES-01', name: '🚤 Boat #07 (Swift-Water Rescue Unit)', score: '98% Match', desc: '1.2 km • 6 min ETA • Recommended' },
                  { id: 'RES-02', name: '🚑 Rescue Team #03 (Field Medical Squad)', score: '92% Match', desc: '2.4 km • 11 min ETA • Paramedic crew' },
                  { id: 'RES-04', name: '🚒 Fire & Rescue Unit #02 (Heavy Extrication)', score: '78% Match', desc: '4.8 km • 18 min ETA • Heavy gear' }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectDifferentResource(item.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      selectedResourceId === item.id
                        ? 'bg-[#102042] border-cyan-400 ring-1 ring-cyan-500/40 shadow'
                        : 'bg-[#080e1d] border-[#1c315e] hover:border-slate-500'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold text-white font-mono block">
                        {item.name}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {item.desc}
                      </span>
                    </div>

                    <span className="text-xs font-mono font-extrabold text-emerald-400">
                      {item.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#1c315e] flex items-center justify-end">
              <button
                onClick={() => setIsChangeModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#080e1d] text-slate-300 hover:text-white text-xs font-semibold border border-[#1c315e] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* 8. FOOTER TAGLINE BANNER                           */}
      {/* ================================================== */}
      <footer className="p-4 rounded-2xl bg-[#060b17]/90 border border-[#1c315e]/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <HelpCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span className="italic">
            "Demo / Prototype — AI resource matching and route analysis are simulated for frontend demonstration."
          </span>
        </div>

        <div className="font-mono text-cyan-300 font-bold text-xs tracking-tight">
          "The right resource. At the right time. For the right emergency."
        </div>
      </footer>
    </div>
  );
};
