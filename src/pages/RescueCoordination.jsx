import React, { useState } from 'react';
import {
  Ambulance,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Shield,
  Users,
  MapPin,
  Check,
  Radio,
  ArrowRight,
  LifeBuoy,
  Navigation,
  Layers,
  Activity,
  Award,
  ChevronRight,
  X
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { soundFX } from '../utils/audio';
import { DemoProgressBar } from '../components/DemoProgressBar';

export const RescueCoordination = () => {
  const {
    incidents,
    assignRescueTeam
  } = useDisaster();

  // Local assignment state for demo interaction
  const [isTeam3Assigned, setIsTeam3Assigned] = useState(false);
  const [selectedTeamModal, setSelectedTeamModal] = useState(null);

  const handleAssignTeam3 = () => {
    assignRescueTeam('INC-101', 'TEAM-03');
    setIsTeam3Assigned(true);
    soundFX.playSuccess();
  };

  return (
    <div className="space-y-7 pb-12 max-w-[1400px] mx-auto">
      {/* Demo Progress Bar */}
      <DemoProgressBar currentStep={5} />

      {/* ================================================== */}
      {/* 1. PAGE HEADER                                     */}
      {/* ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1c315e]/60">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Ambulance className="w-6 h-6 text-emerald-400" />
            <span>Rescue Coordination</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            "AI recommends the best available team for every emergency."
          </p>
        </div>

        {/* Live Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold font-mono self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>RESCUE OPERATIONS LIVE</span>
        </div>
      </div>

      {/* ================================================== */}
      {/* 2. TOP SUMMARY (4 Simple Summary Cards)            */}
      {/* ================================================== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: 🚑 AVAILABLE TEAMS */}
        <div className="glass-panel p-5 rounded-2xl border-emerald-500/30 hover:border-emerald-500/50 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              🚑 AVAILABLE TEAMS
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Ambulance className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-4xl font-extrabold text-white tracking-tight font-display">
              8
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Ready for deployment
            </p>
          </div>
        </div>

        {/* Card 2: 🚨 ACTIVE MISSIONS */}
        <div className="glass-panel p-5 rounded-2xl border-orange-500/30 hover:border-orange-500/50 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-300">
              🚨 ACTIVE MISSIONS
            </span>
            <div className="w-9 h-9 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/30 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-4xl font-extrabold text-white tracking-tight font-display">
              5
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Currently responding
            </p>
          </div>
        </div>

        {/* Card 3: 🤖 AI RECOMMENDATIONS */}
        <div className="glass-panel p-5 rounded-2xl border-cyan-500/30 hover:border-cyan-500/50 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              🤖 AI RECOMMENDATIONS
            </span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-4xl font-extrabold text-cyan-300 tracking-tight font-display">
              3
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Awaiting approval
            </p>
          </div>
        </div>

        {/* Card 4: ✓ COMPLETED RESCUES */}
        <div className="glass-panel p-5 rounded-2xl border-[#1c315e]/70 hover:border-cyan-500/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              ✓ COMPLETED RESCUES
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-4xl font-extrabold text-white tracking-tight font-display">
              24
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Successfully handled
            </p>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 3. MAIN RESCUE DECISION SECTION (Large Hero)       */}
      {/* ================================================== */}
      <section className="glass-panel p-6 sm:p-7 rounded-3xl border-cyan-500/40 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#0e1d3b] via-[#09152b] to-[#071021]">
        {/* Glow Accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left / Center Summary */}
          <div className="space-y-4 max-w-3xl">
            {/* Header Tag */}
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-cyan-300">
                🤖 AI RECOMMENDED ASSIGNMENT
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 ml-auto sm:ml-0">
                AI MATCH SCORE: 98%
              </span>
            </div>

            {/* Critical Incident Info */}
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30">
              <div className="text-[11px] font-extrabold text-red-400 uppercase tracking-wide flex items-center gap-1.5 mb-0.5">
                <AlertTriangle className="w-4 h-4" />
                🚨 INCIDENT: BRIDGE A FLOOD
              </div>
              <p className="text-sm font-bold text-white leading-snug">
                20 people trapped • 1 person seriously injured
              </p>
              <span className="text-[10px] font-mono font-bold text-red-300 uppercase mt-1 inline-block">
                Priority: 🔴 P1 — CRITICAL
              </span>
            </div>

            {/* AI Recommendation Banner */}
            <div className="flex items-center gap-3">
              <div className="text-base font-extrabold text-white flex items-center gap-2">
                <span className="text-cyan-300 font-mono text-xs uppercase block">
                  AI RECOMMENDATION:
                </span>
                <span className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 font-display">
                  🚑 SEND RESCUE TEAM 3
                </span>
              </div>
            </div>

            {/* Clear AI Explanation */}
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
              <p className="text-xs text-cyan-200 font-medium leading-relaxed">
                🤖 <strong className="text-white">AI Reason:</strong> "Rescue Team 3 is selected because it is the closest available team with the required rescue equipment."
              </p>
            </div>

            {/* WHY THIS TEAM? (4 Simple Visual Reasons) */}
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                CRITERIA BREAKDOWN:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                {/* 1. Closest Team */}
                <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                  <span className="text-[10px] font-mono text-slate-400 block">
                    📍 Distance
                  </span>
                  <strong className="text-white text-xs mt-0.5 block">
                    2.1 km
                  </strong>
                </div>

                {/* 2. Required Equipment */}
                <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                  <span className="text-[10px] font-mono text-slate-400 block">
                    🛟 Equipment
                  </span>
                  <strong className="text-cyan-300 text-xs mt-0.5 block">
                    Rescue Boat, First Aid
                  </strong>
                </div>

                {/* 3. Availability */}
                <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                  <span className="text-[10px] font-mono text-slate-400 block">
                    🟢 Availability
                  </span>
                  <strong className="text-emerald-400 text-xs mt-0.5 block">
                    Available
                  </strong>
                </div>

                {/* 4. Fast Response */}
                <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                  <span className="text-[10px] font-mono text-slate-400 block">
                    ⚡ Estimated Response
                  </span>
                  <strong className="text-yellow-300 text-xs mt-0.5 block">
                    8 minutes
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Large Action Box & Final Success Card */}
          <div className="w-full lg:w-96 flex-shrink-0">
            {isTeam3Assigned ? (
              <div className="p-5 rounded-2xl bg-gradient-to-b from-emerald-500/25 to-teal-500/15 border-2 border-emerald-400/80 text-emerald-200 flex flex-col gap-3 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex items-center gap-2 pb-2 border-b border-emerald-500/30">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <span className="font-extrabold text-sm text-white tracking-wide">
                    ✓ RESCUE OPERATION ACTIVATED
                  </span>
                </div>

                <div className="space-y-1.5 text-xs font-mono bg-[#061122]/90 p-3.5 rounded-xl border border-emerald-500/30">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Incident:</span>
                    <strong className="text-white">Bridge A Flood</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">People Affected:</span>
                    <strong className="text-red-400 font-bold">20</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Assigned Team:</span>
                    <strong className="text-cyan-300 font-bold">Rescue Team 3</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estimated Arrival:</span>
                    <strong className="text-yellow-300">8 minutes</strong>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-[#1c315e]">
                    <span className="text-slate-400">Status:</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-extrabold text-[11px] border border-emerald-500/40">
                      🚑 RESPONDING
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-emerald-200 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 text-center leading-relaxed font-medium">
                  "AI-assisted rescue coordination successfully initiated."
                </div>

                <div className="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider text-center">
                  "From Chaos to Coordinated Rescue."
                </div>
              </div>
            ) : (
              <button
                onClick={handleAssignTeam3}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-extrabold text-sm tracking-wider uppercase shadow-2xl shadow-cyan-500/30 flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 cursor-pointer ring-2 ring-cyan-400/50 hover:ring-cyan-300"
              >
                <Zap className="w-5 h-5 fill-black" />
                <span>ASSIGN RESCUE TEAM</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 4. AVAILABLE RESCUE TEAMS (Cards)                  */}
      {/* ================================================== */}
      <section className="space-y-3">
        <div className="flex items-center justify-between pb-1">
          <h2 className="text-base font-extrabold text-white tracking-tight">
            AVAILABLE RESCUE TEAMS
          </h2>
          <span className="text-xs text-cyan-400 font-mono">
            GPS Telemetry Sync Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* TEAM 1 */}
          <div
            onClick={() => {
              setSelectedTeamModal({
                name: 'Rescue Team 1',
                status: '🟢 Available',
                distance: '4.5 km',
                equipment: 'Ambulance, Medical Kit',
                response: '15 minutes'
              });
              soundFX.playClick();
            }}
            className="glass-panel p-4 rounded-2xl border-[#1c315e]/70 hover:border-cyan-500/40 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">🚑 RESCUE TEAM 1</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  🟢 Available
                </span>
              </div>
              <div className="space-y-1 text-xs text-slate-300 bg-[#080e1d] p-3 rounded-xl border border-[#1c315e] font-mono">
                <div>Distance: <strong className="text-white">4.5 km</strong></div>
                <div>Equipment: <strong className="text-slate-200">Ambulance, Medical Kit</strong></div>
                <div>Est. Response: <strong className="text-cyan-300">15 minutes</strong></div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-2 block">
              Click to view details
            </span>
          </div>

          {/* TEAM 2 */}
          <div
            onClick={() => {
              setSelectedTeamModal({
                name: 'Rescue Team 2',
                status: '🟠 On Mission',
                task: 'Village B Evacuation',
                equipment: 'Rescue Truck',
                response: 'Active Deployment'
              });
              soundFX.playClick();
            }}
            className="glass-panel p-4 rounded-2xl border-[#1c315e]/70 hover:border-orange-500/40 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">🚑 RESCUE TEAM 2</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  🟠 On Mission
                </span>
              </div>
              <div className="space-y-1 text-xs text-slate-300 bg-[#080e1d] p-3 rounded-xl border border-[#1c315e] font-mono">
                <div>Current Task: <strong className="text-orange-300">Village B Evacuation</strong></div>
                <div>Equipment: <strong className="text-slate-200">Rescue Truck</strong></div>
                <div>Status: <strong className="text-orange-400">Deployed</strong></div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-2 block">
              Click to view details
            </span>
          </div>

          {/* TEAM 3 (RECOMMENDED) */}
          <div
            onClick={() => {
              setSelectedTeamModal({
                name: 'Rescue Team 3',
                status: isTeam3Assigned ? '🚑 Responding' : '🟢 Available',
                distance: '2.1 km',
                equipment: 'Rescue Boat, First Aid Kit',
                response: '8 minutes',
                match: '98%'
              });
              soundFX.playClick();
            }}
            className="glass-panel p-4 rounded-2xl border-cyan-400 ring-2 ring-cyan-500/40 bg-[#101d3b] shadow-xl transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-gradient-to-l from-cyan-500 to-blue-600 text-black text-[9px] font-extrabold uppercase font-mono tracking-wider rounded-bl-lg">
              🤖 RECOMMENDED
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-cyan-300">🚑 RESCUE TEAM 3</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mr-16">
                  {isTeam3Assigned ? '🚑 Responding' : '🟢 Available'}
                </span>
              </div>
              <div className="space-y-1 text-xs text-slate-300 bg-[#080e1d] p-3 rounded-xl border border-cyan-500/40 font-mono">
                <div>Distance: <strong className="text-white">2.1 km</strong></div>
                <div>Equipment: <strong className="text-cyan-300">Rescue Boat, First Aid Kit</strong></div>
                <div>AI Match Score: <strong className="text-emerald-400 font-bold">98%</strong></div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-cyan-300 mt-2 block font-semibold">
              ✓ Best Match for Bridge A
            </span>
          </div>

          {/* TEAM 4 */}
          <div
            onClick={() => {
              setSelectedTeamModal({
                name: 'Rescue Team 4',
                status: '🟢 Available',
                distance: '6.8 km',
                equipment: 'Rescue Truck, Emergency Supplies',
                response: '22 minutes'
              });
              soundFX.playClick();
            }}
            className="glass-panel p-4 rounded-2xl border-[#1c315e]/70 hover:border-cyan-500/40 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">🚑 RESCUE TEAM 4</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  🟢 Available
                </span>
              </div>
              <div className="space-y-1 text-xs text-slate-300 bg-[#080e1d] p-3 rounded-xl border border-[#1c315e] font-mono">
                <div>Distance: <strong className="text-white">6.8 km</strong></div>
                <div>Equipment: <strong className="text-slate-200">Rescue Truck, Supplies</strong></div>
                <div>Est. Response: <strong className="text-slate-400">22 minutes</strong></div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-2 block">
              Click to view details
            </span>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 5. TEAM COMPARISON: Why Team 3 Was Selected        */}
      {/* ================================================== */}
      <section className="glass-panel p-5 rounded-2xl border-cyan-500/30 shadow-xl bg-gradient-to-r from-[#091326] via-[#0d1c38] to-[#091326]">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#1c315e]">
          <h3 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Why Team 3 Was Selected
          </h3>
          <span className="text-[10px] font-mono text-cyan-300 font-bold">
            Multi-factor Comparison
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* TEAM 1 */}
          <div className="p-3.5 rounded-xl bg-[#080e1d] border border-[#1c315e] space-y-1 text-xs font-mono">
            <div className="font-extrabold text-white text-xs mb-1">TEAM 1</div>
            <div>Distance: <strong className="text-slate-200">4.5 km</strong></div>
            <div>Equipment: <strong className="text-slate-200">Medical Kit</strong></div>
            <div>Availability: <strong className="text-emerald-400">Available</strong></div>
          </div>

          {/* TEAM 3 (BEST MATCH) */}
          <div className="p-3.5 rounded-xl bg-[#0e2147] border border-cyan-400 ring-1 ring-cyan-500/40 space-y-1 text-xs font-mono shadow-lg">
            <div className="flex items-center justify-between font-extrabold text-cyan-300 text-xs mb-1">
              <span>TEAM 3</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40">
                ✓ BEST MATCH
              </span>
            </div>
            <div>Distance: <strong className="text-white">2.1 km (Shortest)</strong></div>
            <div>Equipment: <strong className="text-cyan-300">Rescue Boat (Required)</strong></div>
            <div>Availability: <strong className="text-emerald-400">Available Now</strong></div>
          </div>

          {/* TEAM 4 */}
          <div className="p-3.5 rounded-xl bg-[#080e1d] border border-[#1c315e] space-y-1 text-xs font-mono">
            <div className="font-extrabold text-white text-xs mb-1">TEAM 4</div>
            <div>Distance: <strong className="text-slate-200">6.8 km</strong></div>
            <div>Equipment: <strong className="text-slate-200">Rescue Truck</strong></div>
            <div>Availability: <strong className="text-emerald-400">Available</strong></div>
          </div>
        </div>

        <p className="text-xs text-slate-300 mt-3 pt-2 border-t border-[#1c315e]/70 italic leading-relaxed">
          "ResQAI recommends the team with the best combination of distance, availability, and required equipment."
        </p>
      </section>

      {/* ================================================== */}
      {/* 6. ACTIVE RESCUE MISSIONS                          */}
      {/* ================================================== */}
      <section className="glass-panel p-5 rounded-2xl border-[#1c315e]/70">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#1c315e]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            ACTIVE MISSIONS
          </h3>
          <span className="text-[10px] text-cyan-400 font-mono">
            Live Field Units
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* TEAM 2 */}
          <div className="p-3.5 rounded-xl bg-[#080e1d] border border-[#1c315e] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-white text-xs">🚑 TEAM 2</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Responding
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Mission: <strong>Village B Evacuation</strong>
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-2">
              ETA: 6 minutes
            </span>
          </div>

          {/* TEAM 5 */}
          <div className="p-3.5 rounded-xl bg-[#080e1d] border border-[#1c315e] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-white text-xs">🚑 TEAM 5</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  On Scene
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Mission: <strong>River Valley Flood</strong>
              </p>
            </div>
            <span className="text-[10px] font-mono text-emerald-300 mt-2">
              Operations Active
            </span>
          </div>

          {/* TEAM 7 */}
          <div className="p-3.5 rounded-xl bg-[#080e1d] border border-[#1c315e] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-white text-xs">🚑 TEAM 7</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Returning
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Mission: <strong>Mountain Road Landslide</strong>
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-2">
              Refueling at Base
            </span>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 7. SIMPLE DECISION WORKFLOW (Bottom Chain)         */}
      {/* ================================================== */}
      <section className="glass-panel p-4 rounded-2xl border-[#1c315e]/70 bg-gradient-to-r from-[#091224] via-[#0b162f] to-[#091224]">
        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
          SIMPLE DECISION WORKFLOW:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
            <span className="font-bold text-white block">🚨 INCIDENT</span>
            <span className="text-[10px] text-slate-400">Bridge A Flood</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-cyan-500/30">
            <span className="font-bold text-cyan-300 block">🤖 AI ANALYSIS</span>
            <span className="text-[10px] text-slate-400">Needs Water Rescue</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
            <span className="font-bold text-white block">DISTANCE + GEAR + AVAILABILITY</span>
            <span className="text-[10px] text-slate-400">2.1km • Boat • Ready</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-emerald-500/30">
            <span className="font-bold text-emerald-300 block">🚑 BEST TEAM SELECTED</span>
            <span className="text-[10px] text-slate-400">Team 3 (98% Match)</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-teal-500/30">
            <span className="font-bold text-teal-300 block">✓ RESCUE TEAM ASSIGNED</span>
            <span className="text-[10px] text-slate-400">Dispatched in 1-Click</span>
          </div>
        </div>
      </section>

      {/* TEAM DETAIL MODAL */}
      {selectedTeamModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-2xl border-cyan-500/40 p-6 shadow-2xl animate-in zoom-in-95 duration-200 bg-[#0c162e]">
            <div className="flex items-center justify-between pb-3 border-b border-[#1c315e]">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Ambulance className="w-4 h-4 text-cyan-400" />
                {selectedTeamModal.name}
              </h3>
              <button
                onClick={() => setSelectedTeamModal(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-2.5 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e] flex justify-between">
                <span className="text-slate-400">Status:</span>
                <strong className="text-white">{selectedTeamModal.status}</strong>
              </div>
              {selectedTeamModal.distance && (
                <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e] flex justify-between">
                  <span className="text-slate-400">Distance:</span>
                  <strong className="text-cyan-300">{selectedTeamModal.distance}</strong>
                </div>
              )}
              {selectedTeamModal.equipment && (
                <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e] flex justify-between">
                  <span className="text-slate-400">Equipment:</span>
                  <strong className="text-white">{selectedTeamModal.equipment}</strong>
                </div>
              )}
              {selectedTeamModal.response && (
                <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e] flex justify-between">
                  <span className="text-slate-400">Response / Task:</span>
                  <strong className="text-emerald-400">{selectedTeamModal.response}</strong>
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-[#1c315e] flex justify-end">
              <button
                onClick={() => setSelectedTeamModal(null)}
                className="px-4 py-2 rounded-xl bg-[#080e1d] text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
