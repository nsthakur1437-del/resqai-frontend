import React, { useState, useEffect } from 'react';
import {
  Bell,
  Clock,
  User,
  Volume2,
  VolumeX,
  Radio,
  Sparkles,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { soundFX } from '../utils/audio';

export const Header = () => {
  const {
    soundEnabled,
    setSoundEnabled,
    activityLog
  } = useDisaster();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return (
    <header className="sticky top-0 z-30 border-b border-cyan-500/10 bg-slate-950/65 px-6 py-4 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-300">Operations overview</p>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-white">Response control</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            System live
          </div>

          <div className="hidden items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-slate-300 sm:flex">
            <Clock className="h-4 w-4 text-cyan-300" />
            <div className="text-right">
              <div className="font-mono text-sm font-bold text-white">{formattedTime}</div>
              <div className="text-[10px] text-slate-400">{formattedDate}</div>
            </div>
          </div>

          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              soundFX.playClick();
            }}
            className={`rounded-2xl border p-2.5 transition-all ${
              soundEnabled
                ? 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/15'
                : 'border-slate-800 bg-slate-900/80 text-slate-400 hover:text-slate-200'
            }`}
            title={soundEnabled ? 'Audio On' : 'Audio Off'}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative rounded-2xl border border-slate-800 bg-slate-900/80 p-2.5 text-slate-200 transition-colors hover:border-cyan-500/20 hover:text-cyan-200"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full z-50 mt-3 w-80 rounded-3xl border border-slate-800 bg-slate-950/95 p-4 shadow-2xl shadow-slate-950/40">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <Bell className="h-4 w-4 text-cyan-300" />
                    Live updates
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{activityLog.length}</span>
                </div>

                <div className="mt-3 space-y-2">
                  {activityLog.slice(0, 5).map((act) => (
                    <div key={act.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-2.5 text-xs text-slate-300">
                      <div className="font-semibold text-white">{act.text}</div>
                      <div className="mt-1 font-mono text-[10px] text-slate-400">{act.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-2.5 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20">
              <User className="h-4 w-4" />
            </div>
            <div className="hidden text-left lg:block">
              <div className="text-xs font-bold text-white">Cmdr. A. Sharma</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-300">Incident command</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
