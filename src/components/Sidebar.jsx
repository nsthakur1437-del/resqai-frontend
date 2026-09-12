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
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-72 flex-col border-r border-cyan-500/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="relative overflow-hidden border-b border-cyan-500/10 p-5">
        <div className="absolute -left-12 -top-12 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -right-10 top-8 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/40">
            <Shield className="h-6 w-6 text-white" />
            <Mountain className="absolute bottom-2 left-3 h-3.5 w-3.5 text-cyan-100" />
            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-400 ring-2 ring-slate-950">
              <span className="h-2 w-2 rounded-full bg-emerald-200" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-white">
                ResQ<span className="text-cyan-400">AI</span>
              </h1>
              <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-cyan-300">
                v2.4
              </span>
            </div>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
              Nature Warns. We Act.
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-4 flex items-center justify-between rounded-2xl border border-cyan-500/15 bg-slate-900/80 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-slate-300">
          <span className="flex items-center gap-2 text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            AI coordinator
          </span>
          <span className="font-semibold text-emerald-400">Online</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
          Command menu
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => soundFX.playClick()}
              className={({ isActive }) =>
                `group flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'border border-cyan-500/20 bg-cyan-500/10 text-cyan-200 shadow-lg shadow-cyan-500/5'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-xl p-2 ${
                        isActive ? 'bg-cyan-500/15 text-cyan-300' : 'bg-slate-900/80 text-slate-400 group-hover:text-cyan-300'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span>{item.name}</span>
                  </div>

                  {item.badgeKey === 'matching' && (
                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
                      98%
                    </span>
                  )}
                  {item.badgeKey === 'live' && (
                    <span className="flex items-center gap-1 rounded-full border border-red-500/20 bg-red-500/10 px-1.5 py-0.5 text-[10px] font-bold text-red-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-ping" />
                      REC
                    </span>
                  )}
                  {item.badgeKey === 'fusion' && (
                    <span className="flex items-center gap-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-1.5 py-0.5 text-[10px] font-bold text-cyan-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      LIVE
                    </span>
                  )}
                  {item.badgeKey === 'reports' && (
                    <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-bold text-cyan-300">
                      {reports.length}
                    </span>
                  )}
                  {item.badgeKey === 'critical' && stats.criticalCasesCount > 0 && (
                    <span className="rounded-full border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold text-red-300">
                      {stats.criticalCasesCount}
                    </span>
                  )}
                  {item.badgeKey === 'teams' && (
                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                      {stats.availableRescueTeamsCount}
                    </span>
                  )}
                  {item.badgeKey === 'vision' && (
                    <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-1.5 py-0.5 text-[10px] font-bold text-indigo-300">
                      SAR
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}

        <div className="pt-3">
          <NavLink
            to="/"
            onClick={() => soundFX.playClick()}
            className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-cyan-500/20 hover:text-cyan-200"
          >
            <div className="flex items-center gap-2.5">
              <Home className="h-4 w-4" />
              <span>Public landing</span>
            </div>
            <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
          </NavLink>
        </div>
      </nav>

      <div className="border-t border-cyan-500/10 bg-slate-900/50 p-3">
        <div className="rounded-2xl border border-cyan-500/10 bg-slate-950/80 p-3">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-slate-400">
            <span className="flex items-center gap-2 text-cyan-300">
              <Radio className="h-3.5 w-3.5 animate-pulse text-cyan-400" />
              Telemetry
            </span>
            <span className="font-semibold text-emerald-400">Active</span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] font-mono">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-2">
              <div className="text-slate-500">AI engine</div>
              <div className="mt-1 font-semibold text-cyan-300">YOLO11</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-2">
              <div className="text-slate-500">Latency</div>
              <div className="mt-1 font-semibold text-emerald-300">18 ms</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
