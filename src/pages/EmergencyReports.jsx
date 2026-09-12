import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Inbox,
  Sparkles,
  Cpu,
  AlertTriangle,
  MapPin,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  Zap,
  PlusCircle,
  FileText,
  Ambulance,
  HeartPulse,
  Radio,
  RefreshCw,
  Layers,
  ArrowDown
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { DemoProgressBar } from '../components/DemoProgressBar';
import { soundFX } from '../utils/audio';

// Default initial reports matching exact prompt specifications with Bridge A as primary
const defaultReports = [
  {
    id: 'REPORT #001',
    priorityType: 'Critical',
    priorityBadge: '🚨 CRITICAL',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40',
    message: '20 people are trapped near Bridge A due to severe flooding. One person is seriously injured and requires immediate medical assistance.',
    location: 'Bridge A',
    timeAgo: '2 minutes ago',
    status: 'AI PROCESSED',
    extracted: {
      location: 'Bridge A',
      people: '20',
      disaster: 'Flood',
      medical: 'Yes (Immediate Medical Required)',
      priority: 'P1 — Critical',
      resources: 'Rescue Boat, Medical Team, Ambulance'
    }
  },
  {
    id: 'REPORT #002',
    priorityType: 'High',
    priorityBadge: '⚠️ HIGH PRIORITY',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    message: 'Road near Village B is completely flooded. Vehicles cannot pass.',
    location: 'Village B',
    timeAgo: '5 minutes ago',
    status: 'AI PROCESSED',
    extracted: {
      location: 'Village B',
      people: '8 (Stranded in vehicles)',
      disaster: 'Flood / Inundation',
      medical: 'Standby',
      priority: 'P2 — High Priority',
      resources: 'Rescue Team + 4x4 Troop Carrier'
    }
  },
  {
    id: 'REPORT #003',
    priorityType: 'High',
    priorityBadge: '🚨 HIGH PRIORITY',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    message: '15 people need immediate evacuation from the River Valley area.',
    location: 'River Valley',
    timeAgo: '8 minutes ago',
    status: 'AI PROCESSED',
    extracted: {
      location: 'River Valley',
      people: '15',
      disaster: 'Flash Flood Risk',
      medical: 'Elder Care Standby',
      priority: 'P2 — High Priority',
      resources: 'Evacuation Team + Inflatable Boats'
    }
  },
  {
    id: 'REPORT #004',
    priorityType: 'Moderate',
    priorityBadge: '⚠️ MODERATE',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    message: 'Small landslide reported on Mountain Road. Traffic movement is affected.',
    location: 'Mountain Road',
    timeAgo: '12 minutes ago',
    status: 'AI PROCESSED',
    extracted: {
      location: 'Mountain Road',
      people: '0 (Road Blocked)',
      disaster: 'Landslide',
      medical: 'Not Needed',
      priority: 'P3 — Moderate',
      resources: 'Heavy Road Clearing Rig'
    }
  }
];

export const EmergencyReports = () => {
  const navigate = useNavigate();
  const { setSelectedIncidentId } = useDisaster();

  const [reportsList, setReportsList] = useState(defaultReports);
  const [selectedId, setSelectedId] = useState('REPORT #001');
  const [isSimulating, setIsSimulating] = useState(false);

  // Find currently selected report
  const selectedReport = reportsList.find((r) => r.id === selectedId) || reportsList[0];

  // Navigate to Step 2 in Connected Demo Flow
  const handleViewCreatedIncident = () => {
    soundFX.playClick();
    setSelectedIncidentId('INC-101'); // Bridge A Flood
    navigate('/incidents');
  };

  // SIMULATE NEW REPORT FUNCTIONALITY
  const handleSimulateNewReport = () => {
    soundFX.playEmergencyAlert();
    setIsSimulating(true);

    const newReportId = `REPORT #${String(reportsList.length + 1).padStart(3, '0')}`;
    const rawMessage = 'Three people are trapped inside a vehicle near River Bridge due to flooding.';

    // Temporary "PROCESSING..." item
    const pendingReport = {
      id: newReportId,
      priorityType: 'High',
      priorityBadge: '🚨 NEW REPORT',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      message: rawMessage,
      location: 'River Bridge',
      timeAgo: 'Just now',
      status: 'PROCESSING...',
      extracted: {
        location: 'River Bridge',
        people: '3',
        disaster: 'Flood',
        medical: 'Standby',
        priority: 'High',
        resources: 'Rescue Team'
      }
    };

    setReportsList((prev) => [pendingReport, ...prev]);
    setSelectedId(newReportId);

    // After 1.4s, change to AI PROCESSED
    setTimeout(() => {
      soundFX.playAiChime();
      setReportsList((prev) =>
        prev.map((item) =>
          item.id === newReportId
            ? {
                ...item,
                status: 'AI PROCESSED',
                priorityBadge: '⚠️ HIGH PRIORITY',
                badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40'
              }
            : item
        )
      );
      setIsSimulating(false);
    }, 1400);
  };

  return (
    <div className="space-y-6 pb-12 max-w-[1400px] mx-auto">
      {/* Demo Progress Bar (Step 1 & 2) */}
      <DemoProgressBar currentStep={1} />

      {/* ================================================== */}
      {/* 1. PAGE HEADER                                     */}
      {/* ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1c315e]/60">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Inbox className="w-6 h-6 text-cyan-400" />
            <span>Emergency Reports</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            "AI transforms emergency information into actionable rescue data."
          </p>
        </div>

        {/* SIMULATE NEW REPORT BUTTON */}
        <button
          onClick={handleSimulateNewReport}
          disabled={isSimulating}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer flex-shrink-0"
        >
          <PlusCircle className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
          <span>{isSimulating ? 'Processing Report...' : '+ SIMULATE NEW REPORT'}</span>
        </button>
      </div>

      {/* ================================================== */}
      {/* 3. MAIN TWO-COLUMN LAYOUT                          */}
      {/* ================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ============================================== */}
        {/* LEFT SIDE: Incoming Emergency Reports (5 Cols) */}
        {/* ============================================== */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              INCOMING EMERGENCY REPORTS ({reportsList.length})
            </h3>
            <span className="text-[10px] text-cyan-400 font-mono">
              Click Bridge A to see AI extraction
            </span>
          </div>

          {/* Reports Feed */}
          <div className="space-y-3">
            {reportsList.map((report) => {
              const isSelected = report.id === selectedId;
              const isProcessing = report.status === 'PROCESSING...';
              const isBridgeA = report.id === 'REPORT #001';

              return (
                <div
                  key={report.id}
                  onClick={() => {
                    setSelectedId(report.id);
                    soundFX.playClick();
                  }}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer relative ${
                    isSelected
                      ? 'bg-[#101e3d] border-cyan-400 ring-2 ring-cyan-500/40 shadow-xl shadow-cyan-950/70'
                      : 'bg-[#080e1d]/90 hover:bg-[#0c1730] border-[#1c315e]/70'
                  }`}
                >
                  {isBridgeA && (
                    <div className="absolute top-0 right-0 px-2 py-0.5 bg-gradient-to-l from-red-600 to-orange-500 text-white text-[9px] font-extrabold uppercase font-mono tracking-wider rounded-bl-lg">
                      CANONICAL DEMO REPORT
                    </div>
                  )}

                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold font-mono text-white">
                        {report.id}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border ${report.badgeColor}`}
                      >
                        {report.priorityBadge}
                      </span>
                    </div>

                    {/* Status badge */}
                    {isProcessing ? (
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                        PROCESSING...
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        ✓ AI PROCESSED
                      </span>
                    )}
                  </div>

                  {/* Message Body */}
                  <p className="text-xs text-slate-100 font-medium leading-relaxed my-2">
                    "{report.message}"
                  </p>

                  {/* Footer Info */}
                  <div className="mt-3 pt-2 border-t border-[#1c315e]/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1 text-slate-300 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {report.location}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {report.timeAgo}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================== */}
        {/* RIGHT SIDE: AI Analysis Panel (6 Cols)        */}
        {/* ============================================== */}
        <div className="lg:col-span-6">
          <div className="glass-panel p-6 rounded-2xl border-cyan-500/30 shadow-2xl sticky top-24 bg-gradient-to-b from-[#0c1833] via-[#091326] to-[#070e1c] flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="pb-4 border-b border-[#1c315e]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
                      <Cpu className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-base font-extrabold text-white tracking-tight">
                        🤖 AI UNDERSTANDING
                      </h2>
                      <span className="text-[11px] text-cyan-300 font-mono">
                        Active Inspection for {selectedReport.id}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    98.6% CONFIDENCE
                  </span>
                </div>

                <p className="text-xs text-slate-400 mt-2 italic leading-normal">
                  "AI automatically extracts important information from the emergency report."
                </p>
              </div>

              {/* Selected Raw Message Quote */}
              <div className="mt-4 p-3.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block mb-1">
                  INCOMING CITIZEN MESSAGE:
                </span>
                <p className="text-xs text-slate-100 font-medium leading-relaxed italic">
                  "{selectedReport.message}"
                </p>
              </div>

              {/* STRUCTURED EXTRACTED DATA GRID (Exact Prompt Specifications) */}
              <div className="mt-4 space-y-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 font-mono block">
                  EXTRACTED EMERGENCY DATA:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {/* 📍 LOCATION */}
                  <div className="p-3 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                    <span className="text-[10px] font-mono text-slate-400 block font-bold">
                      📍 LOCATION
                    </span>
                    <span className="text-sm font-extrabold text-white mt-0.5 block">
                      {selectedReport.extracted.location}
                    </span>
                  </div>

                  {/* 👥 PEOPLE AFFECTED */}
                  <div className="p-3 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                    <span className="text-[10px] font-mono text-slate-400 block font-bold">
                      👥 PEOPLE AFFECTED
                    </span>
                    <span className="text-sm font-extrabold text-cyan-300 mt-0.5 block">
                      {selectedReport.extracted.people}
                    </span>
                  </div>

                  {/* 🌊 DISASTER TYPE */}
                  <div className="p-3 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                    <span className="text-[10px] font-mono text-slate-400 block font-bold">
                      🌊 DISASTER TYPE
                    </span>
                    <span className="text-sm font-extrabold text-orange-300 mt-0.5 block">
                      {selectedReport.extracted.disaster}
                    </span>
                  </div>

                  {/* 🔴 PRIORITY */}
                  <div className="p-3 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                    <span className="text-[10px] font-mono text-slate-400 block font-bold">
                      🔴 PRIORITY
                    </span>
                    <span className="text-sm font-extrabold text-red-400 mt-0.5 block">
                      {selectedReport.extracted.priority}
                    </span>
                  </div>

                  {/* 🏥 MEDICAL EMERGENCY */}
                  <div className="p-3 rounded-xl bg-[#080e1d] border border-[#1c315e] col-span-1 sm:col-span-2">
                    <span className="text-[10px] font-mono text-slate-400 block font-bold">
                      🏥 MEDICAL EMERGENCY
                    </span>
                    <span className="text-xs font-extrabold text-red-300 mt-0.5 block">
                      {selectedReport.extracted.medical}
                    </span>
                  </div>

                  {/* 🚑 RESOURCES REQUIRED */}
                  <div className="p-3 rounded-xl bg-[#080e1d] border border-[#1c315e] col-span-1 sm:col-span-2">
                    <span className="text-[10px] font-mono text-slate-400 block font-bold">
                      🚑 RESOURCES REQUIRED
                    </span>
                    <span className="text-xs font-extrabold text-emerald-300 mt-0.5 block">
                      {selectedReport.extracted.resources}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 1 -> STEP 2 CONNECTED DEMO BUTTON */}
            <div className="mt-5 pt-3 border-t border-[#1c315e] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Multi-source reports ready for deduplication
              </span>

              <button
                onClick={() => {
                  soundFX.playClick();
                  navigate('/fusion');
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <span>FUSE REPORTS IN AI ENGINE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
