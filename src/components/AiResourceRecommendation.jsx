import React from 'react';
import {
  LifeBuoy,
  AlertTriangle,
  MapPin,
  Compass,
  CheckCircle2,
  Navigation,
  ShieldCheck,
  Zap,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { soundFX } from '../utils/audio';

const resourceRecommendations = {
  'Incident #1042': {
    incidentId: 'Incident #1042',
    priority: 'CRITICAL',
    recommendedResource: 'Boat #07',
    nearestTeam: 'Swift-Water Rescue Unit 07',
    distance: '1.2 km',
    roadStatus: 'Blocked',
    matchScore: '98% AI Match',
    reason: 'Primary road is Blocked by floodwaters. Boat #07 is the nearest available resource equipped for flood rescue.'
  },
  'Incident #1043': {
    incidentId: 'Incident #1043',
    priority: 'HIGH',
    recommendedResource: 'Rescue Team #03',
    nearestTeam: 'NDRF Battalion 03',
    distance: '2.4 km',
    roadStatus: 'Partially Blocked',
    matchScore: '95% AI Match',
    reason: 'River Valley road partially blocked. Amphibious unit dispatched for stranded citizens.'
  },
  'Incident #1044': {
    incidentId: 'Incident #1044',
    priority: 'MEDIUM',
    recommendedResource: 'High-Water Truck #05',
    nearestTeam: 'Municipal Rescue Unit 05',
    distance: '3.8 km',
    roadStatus: 'Passable with Caution',
    matchScore: '92% AI Match',
    reason: 'Lowlands water depth is passable with high-clearance truck.'
  },
  'Incident #1045': {
    incidentId: 'Incident #1045',
    priority: 'LOW',
    recommendedResource: 'Utility Support Unit #01',
    nearestTeam: 'Civil Defense Unit 01',
    distance: '4.5 km',
    roadStatus: 'Clear',
    matchScore: '89% AI Match',
    reason: 'Clear road access; standard utility unit assigned for water drainage support.'
  }
};

export const AiResourceRecommendation = ({
  selectedIncidentId = 'Incident #1042'
}) => {
  const currentRecommendation =
    resourceRecommendations[selectedIncidentId] ||
    resourceRecommendations['Incident #1042'];

  const isCritical = currentRecommendation.priority === 'CRITICAL';
  const isRoadBlocked = currentRecommendation.roadStatus === 'Blocked';

  return (
    <section className="glass-panel p-6 rounded-3xl border-cyan-500/30 shadow-2xl bg-gradient-to-b from-[#081226] via-[#091836] to-[#071124] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-28 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-28 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-[#1c315e]/70">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-black shadow-lg shadow-cyan-500/20">
            <LifeBuoy className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight uppercase">
                AI RESOURCE RECOMMENDATION
              </h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                Best-Fit Rescue Match
              </span>
            </div>
            <p className="text-xs text-cyan-200/80 font-medium mt-0.5">
              Automated resource matching based on verified incident severity, proximity, and road access
            </p>
          </div>
        </div>

        {/* Selected Incident Reference Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#060c1a] border border-cyan-500/40 text-xs font-mono text-cyan-300 self-start sm:self-auto">
          <span className="text-slate-400">Target:</span>
          <span className="font-extrabold text-white">{currentRecommendation.incidentId}</span>
        </div>
      </div>

      {/* Main AI Resource Match Card displaying only the 6 required fields */}
      <div className="p-5 rounded-2xl bg-[#060d1e]/95 border-2 border-cyan-500/50 shadow-xl space-y-4">
        {/* Recommendation Top Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1c315e]/80">
          <div>
            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
              OPTIMAL RESCUE ASSET IDENTIFIED:
            </span>
            <div className="flex items-center gap-2.5 mt-0.5">
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                {currentRecommendation.recommendedResource}
              </h3>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {currentRecommendation.matchScore}
              </span>
            </div>
          </div>

          {/* Priority Pill */}
          <div
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-black uppercase tracking-wider self-start sm:self-auto flex items-center gap-1.5 ${
              isCritical
                ? 'bg-red-500/25 text-red-300 border-2 border-red-500 animate-pulse'
                : 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
            }`}
          >
            {isCritical && <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />}
            PRIORITY: {currentRecommendation.priority}
          </div>
        </div>

        {/* The 6 Explicitly Required Fields in a Clean Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
          {/* 1. Selected Incident ID */}
          <div className="p-3 rounded-xl bg-[#040814] border border-[#131f3d] flex flex-col justify-between">
            <span className="text-slate-400 text-[11px] block">1. Selected Incident ID</span>
            <span className="text-white font-black text-sm mt-1">
              {currentRecommendation.incidentId}
            </span>
          </div>

          {/* 2. Priority Level */}
          <div className="p-3 rounded-xl bg-[#040814] border border-[#131f3d] flex flex-col justify-between">
            <span className="text-slate-400 text-[11px] block">2. Priority Level</span>
            <span
              className={`font-black text-sm mt-1 ${
                isCritical ? 'text-red-400' : 'text-orange-400'
              }`}
            >
              {currentRecommendation.priority}
            </span>
          </div>

          {/* 3. Recommended Resource */}
          <div className="p-3 rounded-xl bg-[#040814] border border-cyan-500/40 flex flex-col justify-between">
            <span className="text-cyan-400 text-[11px] block font-bold">3. Recommended Resource</span>
            <span className="text-cyan-300 font-black text-sm mt-1">
              {currentRecommendation.recommendedResource}
            </span>
          </div>

          {/* 4. Nearest Team */}
          <div className="p-3 rounded-xl bg-[#040814] border border-[#131f3d] flex flex-col justify-between">
            <span className="text-slate-400 text-[11px] block">4. Nearest Team</span>
            <span className="text-white font-bold text-sm mt-1 truncate">
              {currentRecommendation.nearestTeam}
            </span>
          </div>

          {/* 5. Distance */}
          <div className="p-3 rounded-xl bg-[#040814] border border-[#131f3d] flex flex-col justify-between">
            <span className="text-slate-400 text-[11px] block">5. Distance</span>
            <span className="text-emerald-400 font-extrabold text-sm mt-1">
              {currentRecommendation.distance}
            </span>
          </div>

          {/* 6. Road Status */}
          <div
            className={`p-3 rounded-xl border flex flex-col justify-between ${
              isRoadBlocked
                ? 'bg-red-950/30 border-red-500/50'
                : 'bg-[#040814] border-[#131f3d]'
            }`}
          >
            <span className="text-slate-400 text-[11px] block">6. Road Status</span>
            <span
              className={`font-black text-sm mt-1 flex items-center gap-1.5 ${
                isRoadBlocked ? 'text-red-400 animate-pulse' : 'text-emerald-400'
              }`}
            >
              {isRoadBlocked ? '⛔ Blocked (Water Inundation)' : currentRecommendation.roadStatus}
            </span>
          </div>
        </div>

        {/* Explainability / Rationale Line */}
        <div className="p-3 rounded-xl bg-[#040917] border border-[#162547] text-xs font-mono text-slate-300 flex items-center justify-between">
          <span className="italic leading-snug">
            "{currentRecommendation.reason}"
          </span>
          <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 flex-shrink-0 ml-2 hidden sm:inline">
            ✓ ROUTE CALCULATED
          </span>
        </div>
      </div>
    </section>
  );
};
