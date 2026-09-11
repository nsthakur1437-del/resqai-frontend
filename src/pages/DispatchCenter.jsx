import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Send,
  Radio,
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
  Cpu,
  Layers,
  Activity,
  Award,
  Navigation,
  LifeBuoy,
  Ambulance,
  Flame,
  PhoneCall,
  Bell,
  Wifi,
  ExternalLink,
  ShieldAlert,
  FileText
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { DemoProgressBar } from '../components/DemoProgressBar';
import { soundFX } from '../utils/audio';

// Active missions initial list
const initialActiveMissions = [
  {
    id: 'MISSION-01',
    unit: '🚤 BOAT #07 (Swift-Water Unit)',
    type: 'boat',
    incident: 'Village A Flood',
    location: 'Village A (North Inundation Zone)',
    peopleAffected: 80,
    priority: 'P1 — Critical',
    status: 'EN ROUTE',
    statusBadge: '🚨 EN ROUTE (6 MINS)',
    statusClass: 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse',
    eta: '6 minutes',
    distance: '1.2 km',
    speed: '28 km/h',
    isPrimaryDemo: true
  },
  {
    id: 'MISSION-02',
    unit: '🚑 RESCUE TEAM #03 (Field Medical)',
    type: 'ambulance',
    incident: 'River Valley Flood',
    location: 'River Valley Settlement',
    peopleAffected: 45,
    priority: 'P1 — Critical',
    status: 'ON SCENE',
    statusBadge: '🟢 ON SCENE',
    statusClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    eta: '0 minutes (Arrived)',
    distance: '0.0 km',
    speed: 'Stationary',
    isPrimaryDemo: false
  },
  {
    id: 'MISSION-03',
    unit: '🚒 FIRE & RESCUE UNIT #02 (Heavy Extrication)',
    type: 'fire',
    incident: 'Mountain Road Landslide',
    location: 'Mountain Road km 14',
    peopleAffected: 15,
    priority: 'P2 — High',
    status: 'RESPONDING',
    statusBadge: '🟠 RESPONDING',
    statusClass: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    eta: '12 minutes',
    distance: '3.6 km',
    speed: '45 km/h',
    isPrimaryDemo: false
  }
];

export const DispatchCenter = () => {
  const navigate = useNavigate();
  const { setSelectedIncidentId, addToast } = useDisaster();

  // Dispatch state
  const [isDispatched, setIsDispatched] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('Boat #07');
  const [dispatchNotes, setDispatchNotes] = useState('Use alternative levee waterway route due to KM 12 road blockage. Triage boat on standby for 80 stranded residents.');
  const [dispatchTime, setDispatchTime] = useState(null);
  const [activeMissions, setActiveMissions] = useState(initialActiveMissions);

  // Trigger Confirmation Modal
  const handleOpenConfirmModal = () => {
    soundFX.playEmergencyAlert();
    setIsConfirmModalOpen(true);
  };

  // Final Dispatch Execution (Human in the Loop)
  const handleConfirmDispatch = () => {
    soundFX.playSuccess();
    setIsConfirmModalOpen(false);
    setIsDispatched(true);
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setDispatchTime(now);

    // Confetti celebration for final operational dispatch
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#06b6d4', '#10b981', '#ef4444', '#f59e0b']
      });
    } catch (e) {
      console.log('Confetti trigger', e);
    }

    // Update active missions list
    setActiveMissions((prev) =>
      prev.map((m) =>
        m.isPrimaryDemo
          ? {
              ...m,
              unit: `🚤 ${selectedUnit} (Swift-Water Unit)`,
              status: 'EN ROUTE',
              statusBadge: '🚨 EN ROUTE (6 MINS)',
              statusClass: 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse'
            }
          : m
      )
    );

    addToast(
      '🚨 Resource Deployed to Village A',
      `${selectedUnit} authorized and dispatched by Emergency Coordinator. Live telemetry stream connected.`,
      'success'
    );
  };

  // Reset Dispatch Demo
  const handleResetDispatch = () => {
    soundFX.playClick();
    setIsDispatched(false);
    setDispatchTime(null);
    addToast('Dispatch Terminal Reset', 'Ready for new operational authorization.', 'info');
  };

  // Navigate to Live Map
  const handleNavigateToLiveMap = () => {
    soundFX.playClick();
    setSelectedIncidentId('INC-101');
    navigate('/map');
  };

  return (
    <div className="space-y-7 pb-16 max-w-[1450px] mx-auto">
      {/* Demo Progress Bar (Step 5: Dispatch Center) */}
      <DemoProgressBar currentStep={5} />

      {/* ================================================== */}
      {/* 1. PAGE HEADER                                     */}
      {/* ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1c315e]/70">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-black shadow-lg shadow-emerald-500/20">
                <Send className="w-6 h-6" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-emerald-200">
                Dispatch Center
              </span>
            </h1>

            <span className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase shadow">
              HUMAN-IN-THE-LOOP DECISION CENTER
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 font-medium italic">
            "Review, approve, and coordinate emergency resource deployment."
          </p>
        </div>

        {/* Live Indicator */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#08152c] border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold shadow-inner">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
            <span>● DISPATCH OPERATIONS LIVE</span>
          </div>

          {isDispatched && (
            <button
              onClick={handleResetDispatch}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0d172e] hover:bg-[#132347] text-slate-300 hover:text-white border border-[#1c315e] text-xs font-semibold transition-all cursor-pointer"
              title="Reset state to re-run demo"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Reset Dispatch</span>
            </button>
          )}
        </div>
      </div>

      {/* ================================================== */}
      {/* 2. DISPATCH SUMMARY (Prompt Spec)                  */}
      {/* ================================================== */}
      <section className={`glass-panel p-5 rounded-2xl border transition-all duration-500 shadow-2xl relative overflow-hidden ${
        isDispatched
          ? 'border-emerald-500/50 bg-gradient-to-r from-[#0a1f18] via-[#0d2238] to-[#0a162b]'
          : 'border-red-500/40 bg-gradient-to-r from-[#1a0a14] via-[#0f1730] to-[#091124]'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-[#1c315e]/80">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border flex items-center justify-center ${
              isDispatched
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse'
            }`}>
              {isDispatched ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
            </div>
            <div>
              <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-slate-300 block">
                {isDispatched ? '✓ ACTIVE RESCUE MISSION' : '🚨 READY FOR DISPATCH'}
              </span>
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                INCIDENT: VILLAGE A FLOOD
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-bold">
            <span className="px-2.5 py-1 rounded-lg bg-red-500/20 text-red-300 border border-red-500/40">
              🔴 P1 — CRITICAL
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              🚤 {selectedUnit} (98% MATCH)
            </span>
            <span className={`px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
              isDispatched
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse'
                : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
            }`}>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {isDispatched ? '🚨 EN ROUTE (DISPATCHED)' : 'READY FOR HUMAN DISPATCH'}
            </span>
          </div>
        </div>

        {/* 6 Grid Metrics */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
            <span className="text-[10px] text-slate-400 block font-bold">📍 LOCATION</span>
            <span className="text-white font-extrabold mt-0.5 block">Village A</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
            <span className="text-[10px] text-slate-400 block font-bold">👥 PEOPLE AFFECTED</span>
            <span className="text-cyan-300 font-extrabold mt-0.5 block">80 People</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-cyan-500/30">
            <span className="text-[10px] text-cyan-300 block font-bold">🚤 SELECTED RESOURCE</span>
            <span className="text-white font-extrabold mt-0.5 block">{selectedUnit}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
            <span className="text-[10px] text-slate-400 block font-bold">🤖 AI MATCH SCORE</span>
            <span className="text-emerald-400 font-extrabold text-sm mt-0.5 block">98% Match</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
            <span className="text-[10px] text-slate-400 block font-bold">📍 DISTANCE</span>
            <span className="text-slate-200 font-extrabold mt-0.5 block">1.2 km</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-emerald-500/30">
            <span className="text-[10px] text-emerald-400 block font-bold">⏱️ ESTIMATED ARRIVAL</span>
            <span className="text-emerald-300 font-extrabold text-sm mt-0.5 block">6 minutes</span>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 3. MAIN TWO-COLUMN: AI RECOMMENDATION & REVIEW     */}
      {/* ================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ============================================== */}
        {/* LEFT: AI RECOMMENDATION SUMMARY (6 Cols)       */}
        {/* ============================================== */}
        <div className="lg:col-span-6 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border-cyan-500/40 shadow-2xl bg-gradient-to-b from-[#0c1833] via-[#09152b] to-[#070e1c] flex flex-col justify-between min-h-[460px]">
            <div>
              <div className="pb-3 border-b border-[#1c315e] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow">
                    <Cpu className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-white tracking-tight">
                      🤖 AI RECOMMENDATION SUMMARY
                    </h2>
                    <span className="text-[11px] text-cyan-300 font-mono">
                      Multi-Parameter Triage Solution
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  98% AI CONFIDENCE
                </span>
              </div>

              {/* Recommendation Quote */}
              <div className="mt-4 p-3.5 rounded-xl bg-[#081226] border border-cyan-500/30">
                <p className="text-xs text-white font-semibold leading-relaxed">
                  "Boat #07 is the most suitable available resource for the Village A Flood incident."
                </p>
              </div>

              {/* Reasons list */}
              <div className="mt-3 space-y-2 text-xs font-mono">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  VERIFIED OPERATIONAL REASONS:
                </span>
                <div className="space-y-1.5 text-slate-200">
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-[#060c1a] border border-[#162547]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>✓ Closest available water rescue resource (1.2 km away)</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-[#060c1a] border border-[#162547]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>✓ Required rescue & paramedic trauma equipment available on board</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-[#060c1a] border border-[#162547]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>✓ Alternative high-levee route identified (bypassing road submersion)</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-[#060c1a] border border-[#162547]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>✓ High evacuation capacity (20 persons per transit run)</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-[#060c1a] border border-[#162547]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>✓ Reinforced hull suitable for high-velocity flood conditions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Disclaimer */}
            <div className="mt-4 pt-3 border-t border-[#1c315e] flex items-center gap-2 text-[11px] text-slate-400 italic">
              <HelpCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>
                "This recommendation supports human decision-making. Final dispatch remains under emergency coordinator control."
              </span>
            </div>
          </div>
        </div>

        {/* ============================================== */}
        {/* RIGHT: FINAL HUMAN REVIEW & DISPATCH (6 Cols) */}
        {/* ============================================== */}
        <div className="lg:col-span-6 space-y-4">
          <div className={`glass-panel p-5 rounded-2xl border transition-all duration-300 shadow-2xl flex flex-col justify-between min-h-[460px] ${
            isDispatched
              ? 'border-emerald-500/50 bg-gradient-to-b from-[#081a14] via-[#09152b] to-[#060e1e]'
              : 'border-cyan-500/40 bg-gradient-to-b from-[#0c1833] via-[#09152b] to-[#060e1e]'
          }`}>
            <div>
              {/* Header */}
              <div className="pb-3 border-b border-[#1c315e] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-black shadow">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-white tracking-tight">
                      👤 FINAL DISPATCH APPROVAL
                    </h2>
                    <span className="text-[11px] text-cyan-300 font-mono">
                      Authorized Operator: OP-CHIEF-01
                    </span>
                  </div>
                </div>

                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  isDispatched
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}>
                  {isDispatched ? 'DISPATCHED' : 'PENDING ACTION'}
                </span>
              </div>

              {/* Review Card Summary */}
              <div className="mt-4 p-4 rounded-xl bg-[#081226] border border-[#1c315e] space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-[#1c315e]/50">
                  <span className="text-slate-400">Selected Incident:</span>
                  <span className="text-white font-extrabold">Village A Flood</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1c315e]/50">
                  <span className="text-slate-400">Selected Resource:</span>
                  <span className="text-cyan-300 font-extrabold">{selectedUnit}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1c315e]/50">
                  <span className="text-slate-400">Operational Priority:</span>
                  <span className="text-red-400 font-extrabold">🔴 P1 — Critical</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1c315e]/50">
                  <span className="text-slate-400">Estimated Arrival:</span>
                  <span className="text-emerald-400 font-extrabold">6 minutes</span>
                </div>
                <div className="py-1">
                  <span className="text-slate-400 block mb-1">Operational Dispatch Orders:</span>
                  <p className="text-[11px] text-slate-200 italic bg-[#050b17] p-2 rounded border border-[#162547]">
                    "{dispatchNotes}"
                  </p>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS / SUCCESS STATE */}
            <div className="mt-5 pt-3 border-t border-[#1c315e] space-y-2.5">
              {isDispatched ? (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-1">
                    <span className="text-xs font-extrabold text-emerald-300 font-mono flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ✓ RESOURCE SUCCESSFULLY DISPATCHED
                    </span>
                    <p className="text-[11px] text-slate-200 font-mono">
                      {selectedUnit} is currently <strong className="text-red-300 animate-pulse">EN ROUTE</strong> (ETA: 6 mins). Telemetry synchronized.
                    </p>
                  </div>

                  <button
                    onClick={handleNavigateToLiveMap}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>TRACK ON LIVE DISASTER MAP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <button
                    onClick={handleOpenConfirmModal}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-mono font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 active:scale-95"
                  >
                    <Check className="w-4 h-4" />
                    <span>✓ CONFIRM & DISPATCH</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsModifyModalOpen(true);
                      soundFX.playClick();
                    }}
                    className="w-full sm:w-auto py-3 px-4 rounded-xl bg-[#0d172e] hover:bg-[#132347] text-slate-300 hover:text-white border border-[#1c315e] font-mono text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>CANCEL / MODIFY</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* 4. ACTIVE DISPATCH OPERATIONS & TIMELINE           */}
      {/* ================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Active Dispatch Operations Feed (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-white font-mono flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>ACTIVE DISPATCH OPERATIONS ({activeMissions.length})</span>
            </h2>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">
              ● REAL-TIME TELEMETRY STREAM
            </span>
          </div>

          <div className="space-y-2.5">
            {activeMissions.map((mission) => {
              const isVillageA = mission.isPrimaryDemo;

              return (
                <div
                  key={mission.id}
                  className={`p-4 rounded-2xl border transition-all duration-200 relative ${
                    isVillageA
                      ? 'bg-[#0f1d3a] border-cyan-400/60 shadow-lg shadow-cyan-950'
                      : 'bg-[#080e1d]/90 border-[#1c315e]/70'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-white font-mono">
                        {mission.unit}
                      </span>
                    </div>

                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border self-start sm:self-auto ${mission.statusClass}`}>
                      {mission.statusBadge}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono py-1.5 my-1 border-y border-[#1c315e]/40 text-slate-300">
                    <div>
                      <span className="text-[9px] text-slate-500 block">MISSION:</span>
                      <span className="text-white font-bold">{mission.incident}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 block">TARGET:</span>
                      <span className="text-cyan-300">{mission.location}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 block">EST. ARRIVAL:</span>
                      <span className="text-emerald-300 font-bold">{mission.eta}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mission Timeline & Dispatch Notifications (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Mission Timeline */}
          <div className="glass-panel p-4 rounded-2xl border-cyan-500/30 space-y-3 bg-[#081024]">
            <div className="flex items-center justify-between pb-2 border-b border-[#1c315e]">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                END-TO-END DECISION TIMELINE
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">
                LATENCY: &lt; 3 MINS
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-1.5 rounded bg-[#060c1a] border border-[#162547]">
                <span className="text-slate-200">✓ INCIDENT VERIFIED</span>
                <span className="text-cyan-300 font-bold">10:42 AM</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-[#060c1a] border border-[#162547]">
                <span className="text-slate-200">✓ PRIORITY APPROVED (P1)</span>
                <span className="text-cyan-300 font-bold">10:44 AM</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-[#060c1a] border border-[#162547]">
                <span className="text-slate-200">✓ RESOURCE MATCHED (98%)</span>
                <span className="text-cyan-300 font-bold">10:45 AM</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-[#060c1a] border border-[#162547]">
                <span className="text-slate-200">✓ HUMAN OPERATOR APPROVAL</span>
                <span className="text-cyan-300 font-bold">10:46 AM</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-[#0b1b36] border border-cyan-500/40 text-cyan-200 font-bold">
                <span>🚤 RESOURCE DISPATCHED</span>
                <span className="text-emerald-400 font-extrabold">{dispatchTime || '10:47 AM'}</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-red-950/30 border border-red-500/30 text-red-300 font-bold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  ⏳ EN ROUTE TO VILLAGE A
                </span>
                <span className="text-red-400">Live Mission</span>
              </div>
            </div>
          </div>

          {/* Dispatch Communication Panel */}
          <div className="glass-panel p-4 rounded-2xl border-cyan-500/30 space-y-2.5 bg-[#081024]">
            <div className="flex items-center justify-between pb-2 border-b border-[#1c315e]">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-cyan-400" />
                Dispatch Notifications
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                4/4 SENT
              </span>
            </div>

            <div className="space-y-1.5 text-[11px] font-mono">
              <div className="flex items-center justify-between p-1.5 rounded bg-[#060c1a] border border-[#162547]">
                <span className="text-slate-300">📡 Boat #07 crew notified</span>
                <span className="text-emerald-400 font-bold">✓ Delivered</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-[#060c1a] border border-[#162547]">
                <span className="text-slate-300">📍 Incident coordinates shared</span>
                <span className="text-emerald-400 font-bold">✓ Delivered</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-[#060c1a] border border-[#162547]">
                <span className="text-slate-300">🚨 P1 Critical priority packet</span>
                <span className="text-emerald-400 font-bold">✓ Delivered</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-[#060c1a] border border-[#162547]">
                <span className="text-slate-300">🗺️ Levee alternative route shared</span>
                <span className="text-emerald-400 font-bold">✓ Delivered</span>
              </div>
            </div>

            <span className="text-[9px] text-slate-400 font-mono italic block pt-1">
              * Demo communication status — simulated for prototype.
            </span>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* 5. COMPLETE WORKFLOW VISUAL BANNER (Prompt Spec)   */}
      {/* ================================================== */}
      <section className="glass-panel p-5 rounded-2xl border-cyan-500/30 shadow-2xl bg-gradient-to-r from-[#071126] via-[#091a38] to-[#071126]">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-300 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            COMPLETE RESQAI OPERATIONAL LIFECYCLE
          </span>
          <h3 className="text-base font-extrabold text-white mt-1.5">
            "From Chaos to Coordinated Rescue"
          </h3>
        </div>

        {/* 8-Stage Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-[10px] font-mono">
          <div className="p-2 rounded-xl bg-[#060c1a] border border-[#1c315e]">
            <span className="text-slate-400 block">📞 📱 👤 🛰️</span>
            <span className="text-white font-bold block mt-1">MULTI-SOURCE</span>
          </div>
          <div className="p-2 rounded-xl bg-[#060c1a] border border-[#1c315e]">
            <span className="text-cyan-400 block">🤖</span>
            <span className="text-cyan-300 font-bold block mt-1">AI FUSION</span>
          </div>
          <div className="p-2 rounded-xl bg-[#060c1a] border border-[#1c315e]">
            <span className="text-slate-400 block">🔍</span>
            <span className="text-white font-bold block mt-1">VERIFIED</span>
          </div>
          <div className="p-2 rounded-xl bg-[#060c1a] border border-[#1c315e]">
            <span className="text-red-400 block">🚨</span>
            <span className="text-red-300 font-bold block mt-1">PRIORITY P1</span>
          </div>
          <div className="p-2 rounded-xl bg-[#060c1a] border border-[#1c315e]">
            <span className="text-cyan-400 block">🚤</span>
            <span className="text-cyan-300 font-bold block mt-1">MATCHING</span>
          </div>
          <div className="p-2 rounded-xl bg-[#060c1a] border border-[#1c315e]">
            <span className="text-slate-400 block">👤</span>
            <span className="text-white font-bold block mt-1">APPROVAL</span>
          </div>
          <div className="p-2 rounded-xl bg-[#060c1a] border border-emerald-500/30">
            <span className="text-emerald-400 block">📢</span>
            <span className="text-emerald-300 font-bold block mt-1">DISPATCH</span>
          </div>
          <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-400 font-extrabold text-emerald-300 animate-pulse">
            <span className="block">✓</span>
            <span className="block mt-1">ACTIVE RESPONSE</span>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 6. CONFIRMATION MODAL                              */}
      {/* ================================================== */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-2xl border-emerald-500/50 p-6 shadow-2xl animate-in zoom-in-95 duration-200 bg-[#0c162e]">
            <div className="flex items-center justify-between pb-3 border-b border-[#1c315e]">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 block">
                  AUTHORIZE DISPATCH
                </span>
                <h3 className="text-base font-extrabold text-white mt-0.5">
                  Confirm Emergency Dispatch
                </h3>
              </div>
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-[#080e1d] border border-[#1c315e] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                "You are about to dispatch <strong className="text-cyan-300">{selectedUnit}</strong> to <strong className="text-white">Village A Flood</strong>."
              </p>

              <div className="p-3 rounded-xl bg-[#080e1d] border border-[#1c315e] space-y-1.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Incident:</span>
                  <span className="text-white font-bold">Village A Flood</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Resource:</span>
                  <span className="text-cyan-300 font-bold">{selectedUnit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Priority:</span>
                  <span className="text-red-400 font-bold">🔴 P1 — Critical</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated Arrival:</span>
                  <span className="text-emerald-400 font-bold">6 minutes</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#1c315e] flex items-center justify-end gap-2">
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#080e1d] text-slate-300 hover:text-white text-xs font-semibold border border-[#1c315e] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDispatch}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>CONFIRM DISPATCH</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* 7. CANCEL / MODIFY MODAL                           */}
      {/* ================================================== */}
      {isModifyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-lg rounded-2xl border-cyan-500/40 p-6 shadow-2xl animate-in zoom-in-95 duration-200 bg-[#0c162e]">
            <div className="flex items-center justify-between pb-3 border-b border-[#1c315e]">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-cyan-300 block">
                  HUMAN OVERRIDE
                </span>
                <h3 className="text-base font-extrabold text-white mt-0.5">
                  Modify Dispatch Parameters
                </h3>
              </div>
              <button
                onClick={() => setIsModifyModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-[#080e1d] border border-[#1c315e] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs font-mono">
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                  Assigned Emergency Unit:
                </label>
                <select
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e] text-white text-xs cursor-pointer focus:border-cyan-400 focus:outline-none"
                >
                  <option value="Boat #07">🚤 Boat #07 (Swift-Water Rescue Unit — 98% Match)</option>
                  <option value="Rescue Team #03">🚑 Rescue Team #03 (Field Medical Squad — 92% Match)</option>
                  <option value="Fire & Rescue Unit #02">🚒 Fire & Rescue Unit #02 (Heavy Extrication — 78% Match)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                  Coordinator Dispatch Orders / Notes:
                </label>
                <textarea
                  value={dispatchNotes}
                  onChange={(e) => setDispatchNotes(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e] text-slate-200 text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#1c315e] flex items-center justify-end gap-2">
              <button
                onClick={() => setIsModifyModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#080e1d] text-slate-300 hover:text-white text-xs font-semibold border border-[#1c315e] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsModifyModalOpen(false);
                  soundFX.playClick();
                  addToast('Parameters Updated', `Dispatched unit set to ${selectedUnit}.`, 'info');
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs uppercase tracking-wider shadow cursor-pointer"
              >
                Save Changes
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
            "Demo / Prototype — dispatch status, communication, AI recommendations, and route information are simulated for frontend demonstration."
          </span>
        </div>

        <div className="font-mono text-cyan-300 font-bold text-xs tracking-tight">
          "AI supports the decision. Humans take the action."
        </div>
      </footer>
    </div>
  );
};
