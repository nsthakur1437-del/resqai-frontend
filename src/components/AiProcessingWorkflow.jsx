import React, { useState } from 'react';
import {
  Inbox,
  GitMerge,
  ShieldCheck,
  AlertTriangle,
  Send,
  ArrowRight,
  Cpu,
  Sparkles,
  CheckCircle2,
  Zap,
  Activity
} from 'lucide-react';
import { soundFX } from '../utils/audio';

const stages = [
  {
    step: '01',
    id: 'ingest',
    name: 'INGEST',
    icon: Inbox,
    summary: 'Collect information from all six disaster information sources.',
    status: '24 Reports Ingested',
    statusColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    iconColor: 'from-cyan-500/20 to-blue-600/20 text-cyan-300 border-cyan-500/40',
    meta: 'Multi-Modal Ingestion API'
  },
  {
    step: '02',
    id: 'merge',
    name: 'MERGE',
    icon: GitMerge,
    summary: 'Detect and combine duplicate reports related to the same incident.',
    status: '8 Duplicates Clustered',
    statusColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    iconColor: 'from-purple-500/20 to-indigo-600/20 text-purple-300 border-purple-500/40',
    meta: 'DBSCAN & Spatial Clustering'
  },
  {
    step: '03',
    id: 'verify',
    name: 'VERIFY',
    icon: ShieldCheck,
    summary: 'Cross-check information using NLP, computer vision, and location signals.',
    status: '94% Confidence Score',
    statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    iconColor: 'from-emerald-500/20 to-teal-600/20 text-emerald-300 border-emerald-500/40',
    meta: 'NLP + Vision + GIS Lock'
  },
  {
    step: '04',
    id: 'prioritize',
    name: 'PRIORITIZE',
    icon: AlertTriangle,
    summary: 'Compute the urgency of the incident based on the available information.',
    status: 'P1 Critical (94/100)',
    statusColor: 'text-red-400 bg-red-500/10 border-red-500/30',
    iconColor: 'from-red-500/20 to-rose-600/20 text-red-300 border-red-500/40',
    meta: 'Threat & Urgency Scoring'
  },
  {
    step: '05',
    id: 'dispatch',
    name: 'DISPATCH',
    icon: Send,
    summary: 'Match and recommend the best-fit rescue unit.',
    status: 'Boat #07 (98% Match)',
    statusColor: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
    iconColor: 'from-teal-500/20 to-emerald-600/20 text-teal-300 border-teal-500/40',
    meta: 'Asset Proximity & Route Fit'
  }
];

export const AiProcessingWorkflow = ({ selectedIncidentId = 'Incident #1042' }) => {
  const [activeStage, setActiveStage] = useState(null);

  const dynamicStages = [
    {
      step: '01',
      id: 'ingest',
      name: 'INGEST',
      icon: Inbox,
      summary: 'Collect information from all six disaster information sources.',
      status: selectedIncidentId === 'Incident #1042' ? '24 Reports Ingested' : '18 Reports Ingested',
      statusColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      iconColor: 'from-cyan-500/20 to-blue-600/20 text-cyan-300 border-cyan-500/40',
      meta: 'Multi-Modal Ingestion API'
    },
    {
      step: '02',
      id: 'merge',
      name: 'MERGE',
      icon: GitMerge,
      summary: 'Detect and combine duplicate reports related to the same incident.',
      status: selectedIncidentId === 'Incident #1042' ? '8 Duplicates Clustered' : '5 Duplicates Clustered',
      statusColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      iconColor: 'from-purple-500/20 to-indigo-600/20 text-purple-300 border-purple-500/40',
      meta: 'DBSCAN & Spatial Clustering'
    },
    {
      step: '03',
      id: 'verify',
      name: 'VERIFY',
      icon: ShieldCheck,
      summary: 'Cross-check information using NLP, computer vision, and location signals.',
      status: selectedIncidentId === 'Incident #1042' ? '94% Confidence Score' : '91% Confidence Score',
      statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      iconColor: 'from-emerald-500/20 to-teal-600/20 text-emerald-300 border-emerald-500/40',
      meta: 'NLP + Vision + GIS Lock'
    },
    {
      step: '04',
      id: 'prioritize',
      name: 'PRIORITIZE',
      icon: AlertTriangle,
      summary: 'Compute the urgency of the incident based on the available information.',
      status: selectedIncidentId === 'Incident #1042' ? 'P1 Critical (94/100)' : 'Urgency Computed',
      statusColor: selectedIncidentId === 'Incident #1042' ? 'text-red-400 bg-red-500/10 border-red-500/30' : 'text-orange-400 bg-orange-500/10 border-orange-500/30',
      iconColor: 'from-red-500/20 to-rose-600/20 text-red-300 border-red-500/40',
      meta: 'Threat & Urgency Scoring'
    },
    {
      step: '05',
      id: 'dispatch',
      name: 'DISPATCH',
      icon: Send,
      summary: 'Match and recommend the best-fit rescue unit.',
      status: selectedIncidentId === 'Incident #1042' ? 'Boat #07 (98% Match)' : 'Rescue Unit Matched',
      statusColor: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
      iconColor: 'from-teal-500/20 to-emerald-600/20 text-teal-300 border-teal-500/40',
      meta: 'Asset Proximity & Route Fit'
    }
  ];

  return (
    <section className="glass-panel p-6 rounded-3xl border-cyan-500/30 shadow-2xl bg-gradient-to-b from-[#081226] via-[#0a1835] to-[#071124] relative overflow-hidden">
      {/* Background atmospheric ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-28 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-28 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-[#1c315e]/70">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-black shadow-lg shadow-cyan-500/20">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight uppercase">
                AI PROCESSING WORKFLOW
              </h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                5-Stage Pipeline
              </span>
            </div>
            <p className="text-xs text-cyan-200/80 font-medium mt-0.5 font-mono">
              INGEST → MERGE → VERIFY → PRIORITIZE → DISPATCH
            </p>
          </div>
        </div>

        {/* Live Status & Target Badge */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#060c1a] border border-cyan-500/40 text-xs font-mono text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold">AI PIPELINE ACTIVE</span>
          </div>
          <div className="px-2.5 py-1.5 rounded-xl bg-[#0b152d] border border-cyan-500/30 text-xs font-mono text-slate-300">
            <span className="text-slate-400">Target: </span>
            <span className="text-cyan-300 font-extrabold">{selectedIncidentId}</span>
          </div>
        </div>
      </div>

      {/* Connected 5-Stage Cards Grid with Arrows */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5 relative items-stretch">
        {dynamicStages.map((stage, idx) => {
          const Icon = stage.icon;
          const isSelected = activeStage === stage.id;

          return (
            <div
              key={stage.id}
              onClick={() => {
                soundFX.playClick();
                setActiveStage(isSelected ? null : stage.id);
              }}
              className={`p-4 rounded-2xl bg-[#060d1e]/90 border transition-all duration-200 cursor-pointer flex flex-col justify-between relative group shadow-md ${
                isSelected
                  ? 'border-cyan-400 ring-2 ring-cyan-500/40 bg-[#0c1936] shadow-lg shadow-cyan-500/20 scale-[1.02]'
                  : 'border-[#1c315e]/80 hover:border-cyan-500/50 hover:bg-[#0a152e]'
              }`}
            >
              <div>
                {/* Stage Number & Badge */}
                <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-[#162547]">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#0d1730] border border-[#1c315e] text-slate-400">
                      STAGE {stage.step}
                    </span>
                    <h3 className="text-xs font-black text-white group-hover:text-cyan-300 transition-colors tracking-wide">
                      {stage.name}
                    </h3>
                  </div>

                  <div className={`p-1.5 rounded-lg bg-gradient-to-br border ${stage.iconColor}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Exact Requirement Description */}
                <p className="text-xs text-slate-300 leading-snug font-normal">
                  {stage.summary}
                </p>
              </div>

              {/* Status & Sub-pipeline indicator */}
              <div className="mt-3.5 pt-2.5 border-t border-[#131f3d] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${stage.statusColor}`}>
                    {stage.status}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-slate-400 block truncate">
                  {stage.meta}
                </span>
              </div>

              {/* Desktop Arrow Indicator to next stage */}
              {idx < stages.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-[#080e1d] border border-cyan-500/40 items-center justify-center text-cyan-400 pointer-events-none shadow-md">
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
