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
    simulateIncomingEmergency,
    activityLog,
    isSimulatingAi
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
    <header className="sticky top-0 z-30 h-20 bg-[#080e1d]/90 backdrop-blur-xl border-b border-[#1c315e]/50 px-6 flex items-center justify-between">
      {/* Left: Clean Professional Title & Subtitle */}
      <div className="flex flex-col">
        <h1 className="text-xl font-extrabold text-white tracking-tight uppercase">
          AI DISASTER COMMAND CENTER
        </h1>
        <p className="text-xs text-cyan-300/80 font-medium">
          Unifying fragmented disaster information into one verified and prioritized response system.
        </p>
      </div>

      {/* Right: System Live, Date/Time, Notification, Profile Avatar */}
      <div className="flex items-center gap-3.5">
        {/* ● SYSTEM LIVE Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>SYSTEM LIVE</span>
        </div>

        {/* Current Date and Time */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0d152a] border border-[#1c315e]/70 text-slate-300">
          <Clock className="w-4 h-4 text-cyan-400" />
          <div className="flex flex-col text-right text-xs">
            <span className="font-mono font-bold text-white tracking-wide leading-tight">
              {formattedTime}
            </span>
            <span className="text-[10px] text-slate-400 font-medium leading-none">
              {formattedDate}
            </span>
          </div>
        </div>

        {/* Audio Toggle */}
        <button
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            soundFX.playClick();
          }}
          className={`p-2 rounded-xl border transition-colors cursor-pointer ${
            soundEnabled
              ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25'
              : 'bg-[#0d152a] border-[#1c315e]/60 text-slate-500 hover:text-slate-300'
          }`}
          title={soundEnabled ? 'Audio Chimes Enabled' : 'Audio Muted'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Notification Icon */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              soundFX.playClick();
            }}
            className="relative p-2 rounded-xl bg-[#0d152a] hover:bg-[#162547] text-slate-300 hover:text-white border border-[#1c315e]/70 transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0d152a]/98 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#1c315e]">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-cyan-400" />
                  Live Incident Notifications
                </h4>
                <span className="text-[10px] text-cyan-300 font-mono">
                  {activityLog.length} Updates
                </span>
              </div>
              <div className="mt-2 space-y-2 max-h-60 overflow-y-auto pr-1">
                {activityLog.slice(0, 5).map((act) => (
                  <div
                    key={act.id}
                    className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]/50 text-xs text-slate-300 flex flex-col gap-0.5"
                  >
                    <span className="font-semibold text-white text-[11px]">
                      {act.text}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {act.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 pl-1.5 border-l border-[#1c315e]/60">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-0.5 shadow-md shadow-cyan-950">
            <div className="w-full h-full bg-[#0d152a] rounded-[10px] flex items-center justify-center text-cyan-300 font-bold text-xs">
              <User className="w-4 h-4 text-cyan-300" />
            </div>
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="text-xs font-bold text-white leading-tight">
              Cmdr. A. Sharma
            </span>
            <span className="text-[10px] font-medium text-cyan-400 leading-tight">
              Incident Commander
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
