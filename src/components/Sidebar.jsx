import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  AlertTriangle,
  MapPin,
  Ambulance,
  Building2,
  Eye,
  Settings,
  Shield,
  Activity,
  Radio,
  Sparkles,
  Mountain,
  Home,
  LogOut,
  ExternalLink,
  GitMerge,
  LifeBuoy,
  Send,
  Video
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { soundFX } from '../utils/audio';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, badgeKey: null },
  { name: 'AI Incident Fusion', path: '/fusion', icon: GitMerge, badgeKey: 'fusion' },
  { name: 'Live Monitoring', path: '/monitoring', icon: Video, badgeKey: 'live' },
  { name: 'AI Vision', path: '/vision', icon: Eye, badgeKey: 'vision' },
  { name: 'Priority Queue', path: '/priority', icon: AlertTriangle, badgeKey: 'critical' },
  { name: 'Resource Matching', path: '/resource-matching', icon: LifeBuoy, badgeKey: 'matching' },
  { name: 'Dispatch Center', path: '/dispatch', icon: Send, badgeKey: 'teams' },
  { name: 'Emergency Reports', path: '/reports', icon: Inbox, badgeKey: 'reports' },
  { name: 'Incidents Directory', path: '/incidents', icon: Shield, badgeKey: null },
  { name: 'Live Command Map', path: '/map', icon: MapPin, badgeKey: null },
  { name: 'Resources', path: '/resources', icon: Building2, badgeKey: null },
  { name: 'Settings', path: '/settings', icon: Settings, badgeKey: null }
];

export const Sidebar = () => {
  const { stats, reports, rescueTeams } = useDisaster();

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white/80 backdrop-blur-xl border-r border-slate-200/80 flex flex-col z-40 transition-all duration-300">
      {/* Brand & Logo */}
      <div className="p-5 border-b border-[#1c315e]/50 flex flex-col gap-1 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 h-24 bg-slate-100 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center gap-3 relative z-10">
          {/* Custom Futuristic Logo */}
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/40">
            <Shield className="w-6 h-6 text-white drop-shadow" />
            <Mountain className="w-3.5 h-3.5 text-cyan-200 absolute bottom-2 left-3 drop-shadow" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 ring-2 ring-white"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-extrabold tracking-wider text-slate-900 font-display">
                ResQ<span className="text-cyan-600">AI</span>
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                v2.4
              </span>
            </div>
            <p className="text-[11px] text-cyan-300/80 font-medium tracking-tight italic">
              "Nature Warns. We Act."
            </p>
          </div>
        </div>

        {/* AI Command badge */}
        <div className="mt-3 py-1 px-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AI COORDINATOR
          </span>
          <span className="text-[10px] font-mono text-slate-400">ONLINE</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-slate-400">
          Command Menu
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => soundFX.playClick()}
              className={({ isActive }) =>
                `group flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 relative ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 via-cyan-500/10 to-transparent text-cyan-300 border-l-4 border-cyan-400 shadow-md shadow-cyan-950/50'
                    : 'text-slate-300 hover:text-white hover:bg-[#111d38]/60'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-cyan-500/30 text-cyan-300'
                          : 'bg-[#162547]/50 text-slate-400 group-hover:text-cyan-300 group-hover:bg-cyan-500/20'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="tracking-tight">{item.name}</span>
                  </div>

                  {/* Dynamic badges */}
                  {item.badgeKey === 'matching' && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      98%
                    </span>
                  )}
                  {item.badgeKey === 'live' && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                      REC
                    </span>
                  )}
                  {item.badgeKey === 'fusion' && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      LIVE
                    </span>
                  )}
                  {item.badgeKey === 'reports' && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {reports.length}
                    </span>
                  )}
                  {item.badgeKey === 'critical' && stats.criticalCasesCount > 0 && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse">
                      {stats.criticalCasesCount} Critical
                    </span>
                  )}
                  {item.badgeKey === 'teams' && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {stats.availableRescueTeamsCount} Ready
                    </span>
                  )}
                  {item.badgeKey === 'vision' && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      SAR
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}

        {/* Public Landing Link */}
        <div className="pt-2 border-t border-[#1c315e]/40">
          <NavLink
            to="/"
            onClick={() => soundFX.playClick()}
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-cyan-300 hover:bg-[#111d38]/60 transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <Home className="w-4 h-4 text-slate-400 group-hover:text-cyan-300 transition-colors" />
              <span>Public Landing Page</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          </NavLink>
        </div>
      </nav>

      {/* Live System Status Widget */}
      <div className="p-3 border-t border-slate-200 bg-slate-50">
        <div className="p-3 rounded-xl bg-white border border-slate-200 flex flex-col gap-2 text-xs">
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5 text-[11px] text-slate-300">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              GIS Telemetry Link
            </span>
            <span className="font-mono text-[10px] text-emerald-400">ACTIVE</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
            <div className="bg-slate-50 p-1.5 rounded border border-slate-200">
              <span className="text-slate-500 block">AI Engine</span>
              <span className="text-cyan-300 font-semibold">ResQ-NLP 4.0</span>
            </div>
            <div className="bg-slate-50 p-1.5 rounded border border-slate-200">
              <span className="text-slate-500 block">Latency</span>
              <span className="text-emerald-300 font-semibold">18 ms</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
