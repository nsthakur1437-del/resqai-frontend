import React from 'react';
import { NavLink } from 'react-router-dom';
import { Radio, Cpu, CheckCircle2, MapPin, LifeBuoy, Send, ChevronRight } from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';

const demoSteps = [
  { step: 1, name: '1. Multi-Source Info', path: '/reports', icon: Radio },
  { step: 2, name: '2. AI Processing', path: '/fusion', icon: Cpu },
  { step: 3, name: '3. Verified Incident', path: '/fusion', icon: CheckCircle2 },
  { step: 4, name: '4. Priority-Ranked Map', path: '/priority', icon: MapPin },
  { step: 5, name: '5. Resource Recommendation', path: '/resource-matching', icon: LifeBuoy },
  { step: 6, name: '6. Responder Notification', path: '/dispatch', icon: Send }
];

export const DemoProgressBar = ({ currentStep = 1 }) => {
  const { selectedIncident } = useDisaster();
  const isAssigned = Boolean(selectedIncident?.assignedTeam);

  return (
    <div className="p-2.5 px-4 rounded-2xl bg-[#0a142c]/90 border border-cyan-500/30 backdrop-blur-md shadow-lg flex flex-wrap items-center justify-between gap-3 text-xs">
      {/* Left Label */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-cyan-300">
          JOURNEY PIPELINE
        </span>
      </div>

      {/* 6-Step Compact Indicator */}
      <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
        {demoSteps.map((s, idx) => {
          const isActive = currentStep === s.step;
          const isPassed = currentStep > s.step || (s.step === 6 && isAssigned);
          const Icon = s.icon;

          return (
            <React.Fragment key={s.step}>
              <NavLink
                to={s.path}
                className={`px-2 py-1 rounded-lg flex items-center gap-1.5 transition-all font-semibold ${
                  isActive
                    ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400 shadow-md shadow-cyan-950 font-bold scale-105'
                    : isPassed
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    : 'bg-[#080e1d] text-slate-400 border border-[#1c315e]/70 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span className="truncate max-w-[120px] sm:max-w-none">{s.name}</span>
                {isPassed && <CheckCircle2 className="w-3 h-3 text-emerald-400 ml-0.5 flex-shrink-0" />}
              </NavLink>

              {idx < demoSteps.length - 1 && (
                <ChevronRight className="w-3 h-3 text-slate-600 hidden md:inline" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
