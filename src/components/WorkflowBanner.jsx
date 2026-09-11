import React, { useState } from 'react';
import {
  Radio,
  Cpu,
  CheckCircle2,
  MapPin,
  LifeBuoy,
  Send,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { soundFX } from '../utils/audio';

const workflowSteps = [
  {
    step: 1,
    icon: Radio,
    emoji: '📡',
    title: 'Multiple Disaster Info Sources',
    desc: 'Emergency helpline calls, social media SOS, citizen app alerts & satellite telemetry',
    color: 'from-blue-500/20 to-blue-600/10 border-blue-500/40 text-blue-400',
    iconColor: 'text-blue-400 bg-blue-500/20'
  },
  {
    step: 2,
    icon: Cpu,
    emoji: '🤖',
    title: 'AI Processing',
    desc: 'NLP + vision fusion parses reports, deduplicates, cross-checks and calculates confidence',
    color: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/40 text-cyan-300',
    iconColor: 'text-cyan-300 bg-cyan-500/20'
  },
  {
    step: 3,
    icon: CheckCircle2,
    emoji: '🔍',
    title: 'Verified Incident',
    desc: 'Unified incident created with verified casualty counts, hazards and geo-coordinates',
    color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/40 text-emerald-400',
    iconColor: 'text-emerald-400 bg-emerald-500/20'
  },
  {
    step: 4,
    icon: MapPin,
    emoji: '🚨',
    title: 'Priority-Ranked Map',
    desc: 'Dynamic urgency triage (P1/P2/P3) and live situational GIS mapping with route hazards',
    color: 'from-red-500/20 to-red-600/10 border-red-500/40 text-red-400',
    iconColor: 'text-red-400 bg-red-500/20'
  },
  {
    step: 5,
    icon: LifeBuoy,
    emoji: '🚤',
    title: 'Resource Recommendation',
    desc: 'AI matches optimal rescue units based on proximity, equipment and open access routes',
    color: 'from-amber-500/20 to-amber-600/10 border-amber-500/40 text-amber-300',
    iconColor: 'text-amber-300 bg-amber-500/20'
  },
  {
    step: 6,
    icon: Send,
    emoji: '📢',
    title: 'Responder Notification',
    desc: 'Human coordinator authorization, 1-click dispatch alerts and real-time mission tracking',
    color: 'from-teal-500/20 to-teal-600/10 border-teal-500/40 text-teal-300',
    iconColor: 'text-teal-300 bg-teal-500/20'
  }
];

export const WorkflowBanner = () => {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <section className="p-4 rounded-2xl bg-[#0a1226]/90 border border-cyan-500/25 shadow-xl relative overflow-hidden backdrop-blur-lg">
      {/* Decorative background accents */}
      <div className="absolute top-0 right-1/4 w-72 h-20 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-20 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#1c315e]/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <span>How ResQAI Helps</span>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-700/50">
                10-Second Explainer for Judges
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Autonomous AI pipeline transforming chaotic raw emergency reports into prioritized rescue actions
            </p>
          </div>
        </div>

        <div className="text-[11px] text-cyan-300/80 font-mono flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5" />
          <span>Click any stage to preview logic</span>
        </div>
      </div>

      {/* The 6-Step Visual Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 relative">
        {workflowSteps.map((s, idx) => {
          const Icon = s.icon;
          const isSelected = activeStep === s.step;

          return (
            <div
              key={s.step}
              onClick={() => {
                setActiveStep(isSelected ? null : s.step);
                soundFX.playClick();
              }}
              className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between relative group ${
                isSelected
                  ? 'bg-[#111f42] border-cyan-400 ring-2 ring-cyan-500/40 shadow-lg shadow-cyan-500/20 scale-105'
                  : 'bg-[#0d1730]/70 hover:bg-[#111f42]/80 border-[#1c315e]/70 hover:border-cyan-500/40'
              }`}
            >
              {/* Step Number Badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold font-mono text-slate-400 group-hover:text-cyan-300">
                  STEP 0{s.step}
                </span>
                <span className="text-base">{s.emoji}</span>
              </div>

              {/* Title & Desc */}
              <div className="flex flex-col gap-1">
                <h4 className="text-xs font-bold text-slate-100 group-hover:text-cyan-200 leading-tight">
                  {s.title}
                </h4>
                <p className="text-[10px] text-slate-400 leading-snug">
                  {s.desc}
                </p>
              </div>

              {/* Arrow Indicator on desktop */}
              {idx < workflowSteps.length - 1 && (
                <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-4 h-4 rounded-full bg-[#080e1d] border border-cyan-500/30 items-center justify-center text-cyan-400 pointer-events-none shadow">
                  <ArrowRight className="w-2.5 h-2.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
