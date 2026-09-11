import React from 'react';
import {
  PhoneCall,
  Share2,
  Smartphone,
  Satellite,
  HardHat,
  Navigation,
  Cpu,
  ArrowDown,
  ArrowRight,
  Radio,
  CheckCircle2,
  Zap,
  Layers
} from 'lucide-react';
import { soundFX } from '../utils/audio';

const disasterSources = [
  {
    id: 'calls',
    name: '1. Emergency Calls',
    icon: PhoneCall,
    badge: '112 Helpline',
    status: '12 Live Calls',
    statusColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    iconBg: 'from-cyan-500/20 to-blue-600/20 text-cyan-300 border-cyan-500/40',
    sample: 'Audio Transcript: "15 families stranded on roof at Village A main road"',
    meta: '1m ago • Audio NLP Transcribed'
  },
  {
    id: 'social',
    name: '2. Social Media',
    icon: Share2,
    badge: 'Public SOS Feeds',
    status: '28 Geotagged Posts',
    statusColor: 'text-pink-400 bg-pink-500/10 border-pink-500/30',
    iconBg: 'from-pink-500/20 to-purple-600/20 text-pink-300 border-pink-500/40',
    sample: 'Geotagged SOS: "Water level reached 2nd floor near bridge #FloodHelp"',
    meta: '2m ago • Geolocation Extracted'
  },
  {
    id: 'citizen',
    name: '3. Citizen Reports',
    icon: Smartphone,
    badge: 'Citizen Mobile App',
    status: '19 App Submissions',
    statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    iconBg: 'from-emerald-500/20 to-teal-600/20 text-emerald-300 border-emerald-500/40',
    sample: 'App User #849: "Bridge washed out, 40+ people trapped on north side"',
    meta: '3m ago • Photo & GPS Verified'
  },
  {
    id: 'satellite',
    name: '4. Satellite / Drone Imagery',
    icon: Satellite,
    badge: 'Satellite / UAV SAR',
    status: '3 Aerial Passes',
    statusColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
    iconBg: 'from-indigo-500/20 to-blue-600/20 text-indigo-300 border-indigo-500/40',
    sample: 'SAR change detection: +3.2 sq km inundation boundary polygon',
    meta: '5m ago • Computer Vision Analyzed'
  },
  {
    id: 'field',
    name: '5. Field Teams',
    icon: HardHat,
    badge: 'Field Responder Telemetry',
    status: '8 Ground Updates',
    statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    iconBg: 'from-amber-500/20 to-orange-600/20 text-amber-300 border-amber-500/40',
    sample: 'NDRF Team 03: "Primary road impassable due to 1.8m water, need boat route"',
    meta: '6m ago • VHF Radio Telemetry'
  },
  {
    id: 'gps',
    name: '6. GPS / Agency Data',
    icon: Navigation,
    badge: 'Civic & Agency APIs',
    status: '14 Sensor Nodes',
    statusColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    iconBg: 'from-blue-500/20 to-cyan-600/20 text-blue-300 border-blue-500/40',
    sample: 'Water gauge sensor #12: Depth threshold exceeded (4.1m water level)',
    meta: 'Just now • IoT Telemetry Feed'
  }
];

export const MultiSourceInputs = ({ selectedIncidentId = 'Incident #1042' }) => {
  return (
    <section className="glass-panel p-6 rounded-3xl border-cyan-500/30 shadow-2xl bg-gradient-to-b from-[#081226] via-[#0b1b38] to-[#071124] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/3 w-80 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-28 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-[#1c315e]/70">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-black shadow-lg shadow-cyan-500/20">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight uppercase">
                MULTI-SOURCE DISASTER INPUTS
              </h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                6 Disconnected Feeds
              </span>
            </div>
            <p className="text-xs text-cyan-200/80 font-medium mt-0.5">
              Ingesting fragmented disaster data from multiple separate streams into one unified system
            </p>
          </div>
        </div>

        {/* Live Stream & Target Badge */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#060c1a] border border-cyan-500/40 text-xs font-mono text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold">6/6 SOURCES ACTIVE</span>
          </div>
          <div className="px-2.5 py-1.5 rounded-xl bg-[#0b152d] border border-cyan-500/30 text-xs font-mono text-slate-300">
            <span className="text-slate-400">Target: </span>
            <span className="text-cyan-300 font-extrabold">{selectedIncidentId}</span>
          </div>
        </div>
      </div>

      {/* 6 Information Sources Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {disasterSources.map((src) => {
          const Icon = src.icon;
          return (
            <div
              key={src.id}
              className="p-4 rounded-2xl bg-[#060d1e]/90 border border-[#1c315e]/80 hover:border-cyan-500/50 hover:bg-[#0a152e] transition-all duration-200 shadow-md group flex flex-col justify-between"
            >
              <div>
                {/* Source Title & Icon */}
                <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-[#162547]">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl bg-gradient-to-br border ${src.iconBg} shadow-sm`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-white group-hover:text-cyan-200 transition-colors">
                        {src.name}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-400">
                        {src.badge}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${src.statusColor}`}>
                    {src.status}
                  </span>
                </div>

                {/* Sample Payload */}
                <div className="p-2.5 rounded-xl bg-[#040814] border border-[#131f3d] text-xs font-mono text-slate-300 space-y-1">
                  <span className="text-[9px] text-cyan-400/90 font-bold block uppercase tracking-wider">
                    LIVE INCOMING STREAM:
                  </span>
                  <p className="text-[11px] text-slate-200 leading-snug line-clamp-2 italic">
                    "{src.sample}"
                  </p>
                </div>
              </div>

              {/* Timestamp & NLP Meta */}
              <div className="mt-3 pt-2 border-t border-[#131f3d] flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>{src.meta}</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  FEED ACTIVE
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Convergence Funnel: All 6 Sources feeding into AI DISASTER COMMAND CENTER */}
      <div className="mt-5 pt-4 border-t border-[#1c315e]/70">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0a162e] via-[#0d2247] to-[#0a162e] border border-cyan-500/50 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left indicator */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
                <PhoneCall className="w-3.5 h-3.5" />
              </div>
              <div className="w-8 h-8 rounded-full bg-pink-500/20 border border-pink-400 flex items-center justify-center text-pink-300">
                <Share2 className="w-3.5 h-3.5" />
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300">
                <Smartphone className="w-3.5 h-3.5" />
              </div>
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-indigo-300">
                <Satellite className="w-3.5 h-3.5" />
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300">
                <HardHat className="w-3.5 h-3.5" />
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center text-blue-300">
                <Navigation className="w-3.5 h-3.5" />
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase block">
                6 DISCONNECTED SOURCES INGESTED
              </span>
              <span className="text-xs font-bold text-white">
                Streaming continuous multi-modal emergency signals
              </span>
            </div>
          </div>

          {/* Center visual flow arrow */}
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold animate-pulse">
            <span>FEEDING INTO</span>
            <ArrowRight className="w-4 h-4" />
          </div>

          {/* Right Central Unified Destination */}
          <div className="flex items-center gap-3 p-2.5 px-4 rounded-xl bg-[#060c18] border-2 border-cyan-400 shadow-lg shadow-cyan-500/20">
            <div className="p-2 rounded-lg bg-cyan-500 text-black font-extrabold">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] font-mono font-bold text-cyan-300 uppercase block tracking-wider">
                CENTRAL UNIFIED DESTINATION
              </span>
              <span className="text-sm font-black text-white tracking-tight uppercase">
                AI DISASTER COMMAND CENTER
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
