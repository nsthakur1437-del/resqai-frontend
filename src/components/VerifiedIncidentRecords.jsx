import React from 'react';
import {
  ShieldCheck,
  MapPin,
  Users,
  AlertTriangle,
  CheckCircle2,
  Flame,
  Droplets,
  ShieldAlert,
  FileCheck
} from 'lucide-react';
import { soundFX } from '../utils/audio';

const verifiedIncidents = [
  {
    id: 'Incident #1042',
    disasterType: 'Flood',
    location: 'Village A',
    peopleAffected: 'Approximately 80',
    severity: 'HIGH',
    verificationStatus: 'VERIFIED',
    priority: 'CRITICAL',
    isPrimaryDemo: true
  },
  {
    id: 'Incident #1043',
    disasterType: 'Flood',
    location: 'River Valley East',
    peopleAffected: 'Approximately 45',
    severity: 'HIGH',
    verificationStatus: 'VERIFIED',
    priority: 'HIGH',
    isPrimaryDemo: false
  },
  {
    id: 'Incident #1044',
    disasterType: 'Urban Inundation',
    location: 'Sector 4 Lowlands',
    peopleAffected: 'Approximately 25',
    severity: 'MODERATE',
    verificationStatus: 'VERIFIED',
    priority: 'MEDIUM',
    isPrimaryDemo: false
  },
  {
    id: 'Incident #1045',
    disasterType: 'Flash Flood',
    location: 'South Canal Enclave',
    peopleAffected: 'Approximately 18',
    severity: 'MODERATE',
    verificationStatus: 'VERIFIED',
    priority: 'LOW',
    isPrimaryDemo: false
  }
];

export const VerifiedIncidentRecords = ({
  selectedIncidentId = 'Incident #1042',
  onSelectIncident = () => {}
}) => {
  return (
    <section className="glass-panel p-6 rounded-3xl border-cyan-500/30 shadow-2xl bg-gradient-to-b from-[#081226] via-[#091734] to-[#071124] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-28 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-28 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-[#1c315e]/70">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-black shadow-lg shadow-emerald-500/20">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight uppercase">
                VERIFIED INCIDENT RECORDS
              </h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                Structured Post-AI Fusion
              </span>
            </div>
            <p className="text-xs text-cyan-200/80 font-medium mt-0.5">
              Raw multi-source emergency reports converted into structured, verified incident records (Click to focus on Map)
            </p>
          </div>
        </div>

        {/* Status Count */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#060c1a] border border-emerald-500/40 text-xs font-mono text-emerald-300 self-start sm:self-auto">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">{verifiedIncidents.length} RECORDS VERIFIED</span>
        </div>
      </div>

      {/* Incident Records Table / Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {verifiedIncidents.map((incident) => {
          const isSelected = incident.id === selectedIncidentId;
          const isCritical = incident.priority === 'CRITICAL';
          const isHigh = incident.priority === 'HIGH';
          const isMedium = incident.priority === 'MEDIUM';

          return (
            <div
              key={incident.id}
              onClick={() => {
                soundFX.playClick();
                onSelectIncident(incident.id);
              }}
              className={`p-4 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between relative shadow-lg ${
                isSelected
                  ? 'ring-2 ring-cyan-400 bg-[#0d1c3a] shadow-cyan-500/30 scale-[1.02] border-cyan-400'
                  : isCritical
                  ? 'bg-gradient-to-b from-[#1c0a14] via-[#140818] to-[#0a0f24] border-2 border-red-500/70 hover:border-red-400 ring-1 ring-red-500/30 shadow-red-950/40'
                  : 'bg-[#060d1e]/90 border border-[#1c315e]/80 hover:border-cyan-500/50 hover:bg-[#0a152e]'
              }`}
            >
              {/* Card Top: ID & Priority */}
              <div>
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#1c315e]/60">
                  <span className="text-xs font-mono font-black text-white tracking-wider">
                    {incident.id}
                  </span>

                  {/* Priority Badge */}
                  <span
                    className={`text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm ${
                      isCritical
                        ? 'bg-red-500/25 text-red-300 border border-red-500 animate-pulse font-black'
                        : isHigh
                        ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 font-bold'
                        : isMedium
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                        : 'bg-slate-500/20 text-slate-300 border border-slate-500/40 font-bold'
                    }`}
                  >
                    {isCritical && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />}
                    PRIORITY: {incident.priority}
                  </span>
                </div>

                {/* Primary Demo Highlight Banner */}
                {incident.isPrimaryDemo && (
                  <div className="mb-2.5 px-2 py-0.5 rounded bg-red-950/60 border border-red-800/60 text-[9px] font-mono font-bold text-red-300 uppercase tracking-widest text-center">
                    ★ PRIMARY PRESENTATION SCENARIO
                  </div>
                )}

                {/* 5 Core Information Fields */}
                <div className="space-y-2 text-xs font-mono">
                  {/* Disaster Type */}
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#040814] border border-[#131f3d]">
                    <span className="text-slate-400 text-[11px]">Disaster Type:</span>
                    <span className="text-white font-bold flex items-center gap-1">
                      <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                      {incident.disasterType}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#040814] border border-[#131f3d]">
                    <span className="text-slate-400 text-[11px]">Location:</span>
                    <span className="text-cyan-300 font-bold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {incident.location}
                    </span>
                  </div>

                  {/* People Affected */}
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#040814] border border-[#131f3d]">
                    <span className="text-slate-400 text-[11px]">People Affected:</span>
                    <span className="text-white font-extrabold flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-rose-400" />
                      {incident.peopleAffected}
                    </span>
                  </div>

                  {/* Severity */}
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#040814] border border-[#131f3d]">
                    <span className="text-slate-400 text-[11px]">Severity:</span>
                    <span
                      className={`font-extrabold ${
                        incident.severity === 'HIGH' ? 'text-red-400' : 'text-amber-400'
                      }`}
                    >
                      {incident.severity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Verification Status */}
              <div className="mt-3 pt-2.5 border-t border-[#1c315e]/60 flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400">Verification Status:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {incident.verificationStatus}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
