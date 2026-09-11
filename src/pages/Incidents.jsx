import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  ShieldAlert,
  Users,
  MapPin,
  Ambulance,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Layers,
  Filter,
  Eye,
  GitMerge,
  ArrowRight,
  Info,
  X,
  FileText,
  Radio,
  Cpu
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { DemoProgressBar } from '../components/DemoProgressBar';
import { soundFX } from '../utils/audio';

// Realistic Incident list matching exact prompt specifications with Village A Flood as primary
const incidentData = [
  {
    id: 'INC-01',
    title: 'Village A Flood',
    disaster: 'Flood',
    location: 'Village A',
    roadStatus: 'Blocked',
    peopleAffected: 80,
    confidence: '94%',
    priority: 'P1 Critical',
    priorityBadge: '🔴 P1 Critical',
    priorityClass: 'bg-red-500/20 text-red-300 border-red-500/40',
    status: 'Active',
    statusClass: 'bg-red-500/20 text-red-300 border-red-500/40',
    medicalHelp: 'Possible (Urgent Triage Required)',
    resourcesRequired: 'Rescue Boats, Medical Team, Earthmover',
    aiExplanation: 'Multi-source AI fusion verified 80 people trapped with main road submerged. 94% verification confidence across 6 sensory feeds.',
    reportedTime: '2 mins ago'
  },
  {
    id: 'INC-02',
    title: 'Village B Road Flooding',
    disaster: 'Flood',
    location: 'Village B',
    peopleAffected: 8,
    priority: 'P2 High',
    priorityBadge: '🟠 P2 High',
    priorityClass: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    status: 'Responding',
    statusClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    medicalHelp: 'Standby',
    resourcesRequired: 'Rescue Team + 4x4 Troop Carrier',
    aiExplanation: 'Road completely submerged, preventing access to 8 isolated residents.',
    reportedTime: '10 mins ago'
  },
  {
    id: 'INC-03',
    title: 'Mountain Road Landslide',
    disaster: 'Landslide',
    location: 'Mountain Road',
    peopleAffected: 5,
    priority: 'P3 Moderate',
    priorityBadge: '🟡 P3 Moderate',
    priorityClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    status: 'Monitoring',
    statusClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    medicalHelp: 'Not Needed',
    resourcesRequired: 'Heavy Road Clearing Rig',
    aiExplanation: 'Partial rockfall obstructing single lane with low immediate life threat.',
    reportedTime: '18 mins ago'
  },
  {
    id: 'INC-04',
    title: 'River Valley Evacuation',
    disaster: 'Flood',
    location: 'River Valley',
    peopleAffected: 15,
    priority: 'P1 Critical',
    priorityBadge: '🔴 P1 Critical',
    priorityClass: 'bg-red-500/20 text-red-300 border-red-500/40',
    status: 'Active',
    statusClass: 'bg-red-500/20 text-red-300 border-red-500/40',
    medicalHelp: 'Elderly Assistance',
    resourcesRequired: 'Evacuation Team + Inflatable Boats',
    aiExplanation: 'Rising water levels threatening 15 residents in a low-lying zone.',
    reportedTime: '25 mins ago'
  }
];

export const Incidents = () => {
  const navigate = useNavigate();
  const { setSelectedIncidentId } = useDisaster();

  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedModalIncident, setSelectedModalIncident] = useState(incidentData[0]); // Defaults to Bridge A

  // Filter Logic
  const filteredIncidents = incidentData.filter((inc) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Critical') return inc.priority.includes('P1');
    if (activeFilter === 'High') return inc.priority.includes('P2');
    if (activeFilter === 'Moderate') return inc.priority.includes('P3');
    if (activeFilter === 'Resolved') return inc.status === 'Resolved';
    return true;
  });

  const handleOpenDetails = (incident) => {
    setSelectedModalIncident(incident);
    setSelectedIncidentId('INC-101'); // Bridge A link
    soundFX.playClick();
  };

  const handleNavigateToMap = () => {
    soundFX.playClick();
    setSelectedIncidentId('INC-101');
    navigate('/map');
  };

  return (
    <div className="space-y-7 pb-12 max-w-[1400px] mx-auto">
      {/* Demo Progress Bar (Step 3) */}
      <DemoProgressBar currentStep={3} />

      {/* ================================================== */}
      {/* 1. PAGE HEADER                                     */}
      {/* ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1c315e]/60">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <AlertTriangle className="w-6 h-6 text-orange-400" />
            <span>Incident Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            "AI organizes and prioritizes emergencies for faster response."
          </p>
        </div>

        {/* Live Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold font-mono self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>LIVE INCIDENT STATUS</span>
        </div>
      </div>

      {/* ================================================== */}
      {/* 2. TOP SUMMARY (4 Simple Summary Cards)            */}
      {/* ================================================== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: 🔴 CRITICAL */}
        <div className="glass-card-critical p-5 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-red-300">
              🔴 CRITICAL
            </span>
            <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center animate-pulse">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-4xl font-extrabold text-red-100 tracking-tight font-display">
              5
            </div>
            <p className="text-xs text-red-200/90 mt-1 font-medium">
              Require immediate response
            </p>
          </div>
        </div>

        {/* Card 2: 🟠 HIGH PRIORITY */}
        <div className="glass-panel p-5 rounded-2xl border-orange-500/30 hover:border-orange-500/50 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-300">
              🟠 HIGH PRIORITY
            </span>
            <div className="w-9 h-9 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/30 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-4xl font-extrabold text-white tracking-tight font-display">
              4
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Need urgent attention
            </p>
          </div>
        </div>

        {/* Card 3: 🟡 MODERATE */}
        <div className="glass-panel p-5 rounded-2xl border-amber-500/30 hover:border-amber-500/50 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              🟡 MODERATE
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-4xl font-extrabold text-white tracking-tight font-display">
              3
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Currently being monitored
            </p>
          </div>
        </div>

        {/* Card 4: 🟢 RESOLVED */}
        <div className="glass-panel p-5 rounded-2xl border-emerald-500/30 hover:border-emerald-500/50 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              🟢 RESOLVED
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-4xl font-extrabold text-white tracking-tight font-display">
              8
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Successfully handled
            </p>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 3. PRIORITY EXPLANATION: How AI Sets Priority     */}
      {/* ================================================== */}
      <section className="glass-panel p-5 rounded-2xl border-cyan-500/30 shadow-xl bg-gradient-to-r from-[#091326] via-[#0d1a38] to-[#091326]">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1c315e]/60">
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              How AI Sets Priority
            </span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
              Triaging Logic
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
            Automated ranking based on lives at risk & urgency
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* 🔴 P1 — CRITICAL */}
          <div className="p-3.5 rounded-xl bg-[#080e1d] border border-red-500/40 flex flex-col justify-between">
            <div>
              <span className="text-xs font-extrabold text-red-400 flex items-center gap-1.5 mb-1">
                🔴 P1 — CRITICAL
              </span>
              <p className="text-xs text-slate-200 leading-snug">
                People trapped, serious injuries, or immediate danger.
              </p>
            </div>
            <span className="text-[10px] font-mono text-red-300/80 mt-2 font-semibold">
              Action: Dispatch in &lt; 10 mins
            </span>
          </div>

          {/* 🟠 P2 — HIGH */}
          <div className="p-3.5 rounded-xl bg-[#080e1d] border border-orange-500/40 flex flex-col justify-between">
            <div>
              <span className="text-xs font-extrabold text-orange-400 flex items-center gap-1.5 mb-1">
                🟠 P2 — HIGH
              </span>
              <p className="text-xs text-slate-200 leading-snug">
                Evacuation needed, major road blockage, or significant damage.
              </p>
            </div>
            <span className="text-[10px] font-mono text-orange-300/80 mt-2 font-semibold">
              Action: Dispatch within 30 mins
            </span>
          </div>

          {/* 🟡 P3 — MODERATE */}
          <div className="p-3.5 rounded-xl bg-[#080e1d] border border-amber-500/40 flex flex-col justify-between">
            <div>
              <span className="text-xs font-extrabold text-amber-400 flex items-center gap-1.5 mb-1">
                🟡 P3 — MODERATE
              </span>
              <p className="text-xs text-slate-200 leading-snug">
                Minor damage, monitoring required, or non-critical requests.
              </p>
            </div>
            <span className="text-[10px] font-mono text-amber-300/80 mt-2 font-semibold">
              Action: Continuous monitoring
            </span>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 4. DUPLICATE REPORT DETECTION (Visual AI Feature)  */}
      {/* ================================================== */}
      <section className="glass-panel p-5 rounded-2xl border-cyan-500/40 shadow-xl bg-gradient-to-r from-[#0d1833] via-[#091326] to-[#0c1833]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[#1c315e]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <GitMerge className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-2">
                🤖 DUPLICATE REPORT DETECTED
              </h3>
              <p className="text-xs text-cyan-300 font-mono">
                ResQAI NLP Semantic Clustering Engine
              </p>
            </div>
          </div>

          <span className="text-[11px] font-mono text-emerald-300 bg-emerald-500/15 px-3 py-1 rounded-lg border border-emerald-500/30 font-bold self-start sm:self-auto">
            ✓ AI MERGED THESE REPORTS
          </span>
        </div>

        {/* 3 Steps Pipeline Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Left: 10 Similar Emergency Reports (4 cols) */}
          <div className="lg:col-span-4 p-3.5 rounded-xl bg-[#080e1d] border border-[#1c315e] space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
              10 SIMILAR EMERGENCY REPORTS INGESTED:
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="p-1.5 rounded bg-[#0d152a] text-slate-200 border border-[#162547] text-[11px]">
                💬 "Bridge near Village A is flooded."
              </div>
              <div className="p-1.5 rounded bg-[#0d152a] text-slate-200 border border-[#162547] text-[11px]">
                💬 "People trapped near Bridge A."
              </div>
              <div className="p-1.5 rounded bg-[#0d152a] text-slate-200 border border-[#162547] text-[11px]">
                💬 "Road near Bridge A is underwater."
              </div>
            </div>
            <span className="text-[10px] text-slate-400 italic block">
              + 7 more identical citizen SOS calls
            </span>
          </div>

          {/* Center: AI Analysis Pipeline (3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-center">
            <Cpu className="w-6 h-6 text-cyan-400 mb-1 animate-pulse" />
            <span className="text-xs font-bold text-white">
              AI Semantic Matching
            </span>
            <span className="text-[10px] text-cyan-300 font-mono mt-0.5">
              Geo-radius: 300m • 99.2% Match
            </span>
          </div>

          {/* Right: 1 Verified Incident Result (5 cols) */}
          <div className="lg:col-span-5 p-3.5 rounded-xl bg-[#081822] border border-emerald-500/40 space-y-1.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 block">
              FINAL MERGED RESULT:
            </span>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono py-1">
              <div className="bg-[#050f14] p-2 rounded border border-emerald-500/30">
                <span className="text-slate-400 block text-[10px]">Incident</span>
                <span className="text-white font-extrabold">1 Verified</span>
              </div>
              <div className="bg-[#050f14] p-2 rounded border border-emerald-500/30">
                <span className="text-slate-400 block text-[10px]">Merged</span>
                <span className="text-cyan-300 font-extrabold">10 Reports</span>
              </div>
              <div className="bg-[#050f14] p-2 rounded border border-emerald-500/30">
                <span className="text-slate-400 block text-[10px]">Victims</span>
                <span className="text-emerald-400 font-extrabold">20 People</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug pt-1">
              "ResQAI helps reduce confusion by combining multiple reports about the same emergency."
            </p>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 5. ACTIVE INCIDENTS (Main Table Section)          */}
      {/* ================================================== */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Active Incidents</span>
            <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
              {filteredIncidents.length} Records
            </span>
          </h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { label: 'All', key: 'All' },
              { label: '🔴 Critical', key: 'Critical' },
              { label: '🟠 High', key: 'High' },
              { label: '🟡 Moderate', key: 'Moderate' },
              { label: '🟢 Resolved', key: 'Resolved' }
            ].map((tab) => {
              const isActive = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveFilter(tab.key);
                    soundFX.playClick();
                  }}
                  className={`px-3 py-1.5 rounded-xl font-medium text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-950 font-bold'
                      : 'bg-[#080e1d] text-slate-400 hover:text-white border border-[#1c315e]/70'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean, Professional Table */}
        <div className="glass-panel rounded-2xl overflow-hidden border border-[#1c315e]/80 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#080e1d] text-slate-400 uppercase tracking-wider font-mono text-[10px] border-b border-[#1c315e]">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Incident</th>
                  <th className="py-3.5 px-4 font-bold">Type</th>
                  <th className="py-3.5 px-4 font-bold">Location</th>
                  <th className="py-3.5 px-4 font-bold">People Affected</th>
                  <th className="py-3.5 px-4 font-bold">Priority</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1c315e]/40">
                {filteredIncidents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-slate-400">
                      No incidents match selected filter.
                    </td>
                  </tr>
                ) : (
                  filteredIncidents.map((incident) => {
                    const isBridgeA = incident.id === 'INC-01';
                    return (
                      <tr
                        key={incident.id}
                        onClick={() => handleOpenDetails(incident)}
                        className={`transition-colors group cursor-pointer ${
                          isBridgeA
                            ? 'bg-[#101e3d]/90 hover:bg-[#15274d] border-l-4 border-l-red-500'
                            : 'hover:bg-[#111f42]/70'
                        }`}
                      >
                        {/* Incident Title */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-white text-xs block group-hover:text-cyan-300 transition-colors">
                              {incident.title}
                            </span>
                            {isBridgeA && (
                              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                AI FUSED (94%)
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">
                            {incident.id} • {incident.reportedTime}
                          </span>
                        </td>

                        {/* Type */}
                        <td className="py-4 px-4 font-semibold text-slate-300">
                          {incident.disaster}
                        </td>

                        {/* Location */}
                        <td className="py-4 px-4 text-slate-300">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                            <span className="font-medium">{incident.location}</span>
                          </div>
                        </td>

                        {/* People Affected */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1.5 font-bold text-cyan-300">
                            <Users className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{incident.peopleAffected} People</span>
                          </div>
                        </td>

                        {/* Priority */}
                        <td className="py-4 px-4">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border ${incident.priorityClass}`}
                          >
                            {incident.priorityBadge}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded border ${incident.statusClass}`}
                          >
                            {incident.status}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDetails(incident);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#0d152a] hover:bg-cyan-500/20 text-cyan-300 hover:text-white font-bold text-[11px] border border-cyan-500/30 transition-all cursor-pointer inline-flex items-center gap-1 shadow"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>VIEW DETAILS</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 6. AI PRIORITIZATION FLOW (Bottom Visual Flow)     */}
      {/* ================================================== */}
      <section className="glass-panel p-4 rounded-2xl border-[#1c315e]/70 bg-gradient-to-r from-[#091224] via-[#0b162f] to-[#091224]">
        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
          AI PRIORITIZATION FLOW:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-center">
          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
            <span className="text-xs font-bold text-white block">📩 EMERGENCY REPORT</span>
            <span className="text-[10px] text-slate-400">Multi-source citizen alerts</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-cyan-500/30">
            <span className="text-xs font-bold text-cyan-300 block">🤖 AI ANALYSIS</span>
            <span className="text-[10px] text-slate-400">NLP Entity Extraction</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
            <span className="text-xs font-bold text-white block">PEOPLE + LOCATION + SEVERITY</span>
            <span className="text-[10px] text-slate-400">Multi-factor Risk Score</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-red-500/30">
            <span className="text-xs font-bold text-red-300 block">🔴 P1 / 🟠 P2 / 🟡 P3</span>
            <span className="text-[10px] text-slate-400">Instant Threat Grading</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-emerald-500/30">
            <span className="text-xs font-bold text-emerald-300 block">✓ RESCUE PRIORITY</span>
            <span className="text-[10px] text-slate-400">Dispatched in Order</span>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 7. INCIDENT DETAILS MODAL (Exact Prompt Spec)      */}
      {/* ================================================== */}
      {selectedModalIncident && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-lg rounded-2xl border-cyan-500/40 p-6 shadow-2xl animate-in zoom-in-95 duration-200 bg-[#0c162e]">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1c315e]">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 block">
                  INCIDENT DETAILS
                </span>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2 mt-0.5">
                  <span>🚨 {selectedModalIncident.title}</span>
                </h3>
              </div>
              <button
                onClick={() => setSelectedModalIncident(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-[#080e1d] border border-[#1c315e] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                {/* 📍 LOCATION */}
                <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">
                    📍 LOCATION
                  </span>
                  <span className="font-extrabold text-white text-xs mt-0.5 block">
                    {selectedModalIncident.location}
                  </span>
                </div>

                {/* 👥 PEOPLE AFFECTED */}
                <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">
                    👥 PEOPLE AFFECTED
                  </span>
                  <span className="font-extrabold text-cyan-300 text-xs mt-0.5 block">
                    {selectedModalIncident.peopleAffected}
                  </span>
                </div>

                {/* 🌊 DISASTER TYPE */}
                <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">
                    🌊 DISASTER TYPE
                  </span>
                  <span className="font-extrabold text-orange-300 text-xs mt-0.5 block">
                    {selectedModalIncident.disaster}
                  </span>
                </div>

                {/* 🔴 PRIORITY */}
                <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">
                    🔴 PRIORITY
                  </span>
                  <span className="font-extrabold text-red-400 text-xs mt-0.5 block">
                    {selectedModalIncident.priority === 'P1 Critical' ? 'P1 — Critical' : selectedModalIncident.priority}
                  </span>
                </div>

                {/* 🚧 ROAD / ACCESS STATUS */}
                <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">
                    🚧 ROAD STATUS
                  </span>
                  <span className="font-extrabold text-orange-300 text-xs mt-0.5 block">
                    {selectedModalIncident.roadStatus || 'Main Road Blocked'}
                  </span>
                </div>

                {/* 🤖 VERIFICATION CONFIDENCE */}
                <div className="p-2.5 rounded-xl bg-[#080e1d] border border-cyan-500/30">
                  <span className="text-[10px] font-mono text-cyan-300 block font-bold">
                    🤖 AI CONFIDENCE
                  </span>
                  <span className="font-extrabold text-emerald-300 text-xs mt-0.5 block">
                    {selectedModalIncident.confidence || '94% Multi-Source Fused'}
                  </span>
                </div>

                {/* 🏥 MEDICAL HELP */}
                <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e] col-span-1">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">
                    🏥 MEDICAL HELP
                  </span>
                  <span className="font-extrabold text-red-300 text-xs mt-0.5 block">
                    {selectedModalIncident.medicalHelp}
                  </span>
                </div>

                {/* 🚑 RESOURCES REQUIRED */}
                <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e] col-span-1">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">
                    🚑 RESOURCES REQUIRED
                  </span>
                  <span className="font-extrabold text-emerald-300 text-xs mt-0.5 block">
                    {selectedModalIncident.resourcesRequired}
                  </span>
                </div>
              </div>

              {/* 🤖 AI PRIORITY EXPLANATION */}
              <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 block mb-1">
                  🤖 AI PRIORITY EXPLANATION
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium italic">
                  "{selectedModalIncident.aiExplanation}"
                </p>
              </div>
            </div>

            {/* STEP 2 -> STEP 3 CONNECTED DEMO BUTTON */}
            <div className="mt-5 pt-3 border-t border-[#1c315e] flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedModalIncident(null)}
                className="px-4 py-2 rounded-xl bg-[#080e1d] text-slate-300 hover:text-white text-xs font-semibold border border-[#1c315e] cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={handleNavigateToMap}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <span>VIEW ON LIVE MAP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
