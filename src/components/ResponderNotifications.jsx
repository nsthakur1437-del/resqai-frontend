import React from 'react';
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  LifeBuoy,
  Send,
  Radio,
  Clock,
  ShieldAlert,
  ShieldCheck
} from 'lucide-react';
import { soundFX } from '../utils/audio';

const incidentNotifications = {
  'Incident #1042': [
    {
      id: 'n1',
      message: 'Critical incident identified.',
      status: 'CRITICAL DETECTED',
      statusType: 'critical',
      timestamp: '4m ago',
      icon: ShieldAlert
    },
    {
      id: 'n2',
      message: 'Incident location verified successfully.',
      status: 'GEO-VERIFIED',
      statusType: 'success',
      timestamp: '3m ago',
      icon: CheckCircle2
    },
    {
      id: 'n3',
      message: 'Priority updated to CRITICAL.',
      status: 'P1 CRITICAL',
      statusType: 'critical',
      timestamp: '2m ago',
      icon: AlertTriangle
    },
    {
      id: 'n4',
      message: 'Best-fit resource Boat #07 recommended.',
      status: 'ASSET MATCHED',
      statusType: 'cyan',
      timestamp: '1m ago',
      icon: LifeBuoy
    },
    {
      id: 'n5',
      message: 'Nearest rescue team notified.',
      status: 'TEAM ALERTED',
      statusType: 'dispatch',
      timestamp: 'Just now',
      icon: Send
    }
  ],
  'Incident #1043': [
    {
      id: 'n1',
      message: 'High-severity flood incident identified.',
      status: 'HIGH DETECTED',
      statusType: 'high',
      timestamp: '6m ago',
      icon: AlertTriangle
    },
    {
      id: 'n2',
      message: 'Incident location verified successfully.',
      status: 'GEO-VERIFIED',
      statusType: 'success',
      timestamp: '5m ago',
      icon: CheckCircle2
    },
    {
      id: 'n3',
      message: 'Priority updated to HIGH.',
      status: 'P2 HIGH',
      statusType: 'high',
      timestamp: '4m ago',
      icon: AlertTriangle
    },
    {
      id: 'n4',
      message: 'Best-fit resource Rescue Team #03 recommended.',
      status: 'ASSET MATCHED',
      statusType: 'cyan',
      timestamp: '2m ago',
      icon: LifeBuoy
    },
    {
      id: 'n5',
      message: 'Nearest rescue team notified.',
      status: 'TEAM ALERTED',
      statusType: 'dispatch',
      timestamp: '1m ago',
      icon: Send
    }
  ],
  'Incident #1044': [
    {
      id: 'n1',
      message: 'Moderate urban inundation identified.',
      status: 'MODERATE DETECTED',
      statusType: 'medium',
      timestamp: '10m ago',
      icon: AlertTriangle
    },
    {
      id: 'n2',
      message: 'Incident location verified successfully.',
      status: 'GEO-VERIFIED',
      statusType: 'success',
      timestamp: '8m ago',
      icon: CheckCircle2
    },
    {
      id: 'n3',
      message: 'Priority updated to MEDIUM.',
      status: 'P3 MEDIUM',
      statusType: 'medium',
      timestamp: '6m ago',
      icon: AlertTriangle
    },
    {
      id: 'n4',
      message: 'Best-fit resource High-Water Truck #05 recommended.',
      status: 'ASSET MATCHED',
      statusType: 'cyan',
      timestamp: '4m ago',
      icon: LifeBuoy
    },
    {
      id: 'n5',
      message: 'Nearest rescue team notified.',
      status: 'TEAM ALERTED',
      statusType: 'dispatch',
      timestamp: '3m ago',
      icon: Send
    }
  ],
  'Incident #1045': [
    {
      id: 'n1',
      message: 'Flash flood alert identified.',
      status: 'MONITORING',
      statusType: 'medium',
      timestamp: '12m ago',
      icon: AlertTriangle
    },
    {
      id: 'n2',
      message: 'Incident location verified successfully.',
      status: 'GEO-VERIFIED',
      statusType: 'success',
      timestamp: '10m ago',
      icon: CheckCircle2
    },
    {
      id: 'n3',
      message: 'Priority updated to LOW.',
      status: 'P4 LOW',
      statusType: 'success',
      timestamp: '8m ago',
      icon: AlertTriangle
    },
    {
      id: 'n4',
      message: 'Best-fit resource Utility Support Unit #01 recommended.',
      status: 'ASSET MATCHED',
      statusType: 'cyan',
      timestamp: '5m ago',
      icon: LifeBuoy
    },
    {
      id: 'n5',
      message: 'Nearest rescue team notified.',
      status: 'TEAM ALERTED',
      statusType: 'dispatch',
      timestamp: '4m ago',
      icon: Send
    }
  ]
};

export const ResponderNotifications = ({
  selectedIncidentId = 'Incident #1042'
}) => {
  const notifications =
    incidentNotifications[selectedIncidentId] ||
    incidentNotifications['Incident #1042'];

  return (
    <section className="glass-panel p-6 rounded-3xl border-cyan-500/30 shadow-2xl bg-gradient-to-b from-[#081226] via-[#091836] to-[#071124] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-28 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-28 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-[#1c315e]/70">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-600 text-black shadow-lg shadow-emerald-500/20">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight uppercase">
                RESPONDER NOTIFICATIONS
              </h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                Final Response Output
              </span>
            </div>
            <p className="text-xs text-cyan-200/80 font-medium mt-0.5">
              Live operational notifications delivered to rescue coordinators and field units
            </p>
          </div>
        </div>

        {/* Target Incident & Count */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#060c1a] border border-cyan-500/40 text-xs font-mono text-cyan-300 self-start sm:self-auto">
          <span className="text-slate-400">Target:</span>
          <span className="font-extrabold text-white">{selectedIncidentId}</span>
          <span className="text-slate-500">•</span>
          <span className="text-emerald-400 font-bold">{notifications.length} Delivered</span>
        </div>
      </div>

      {/* Notifications List (5 Demonstration Notifications) */}
      <div className="space-y-2.5 font-mono text-xs">
        {notifications.map((item) => {
          const Icon = item.icon;
          const isCritical = item.statusType === 'critical';
          const isHigh = item.statusType === 'high';
          const isDispatch = item.statusType === 'dispatch';
          const isSuccess = item.statusType === 'success';

          return (
            <div
              key={item.id}
              onClick={() => soundFX.playClick()}
              className={`p-3.5 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md ${
                isCritical
                  ? 'bg-gradient-to-r from-[#1c0a14] via-[#12081c] to-[#080e22] border-2 border-red-500/80 shadow-red-950/40 ring-1 ring-red-500/30'
                  : isHigh
                  ? 'bg-[#140b17] border border-orange-500/60'
                  : isDispatch
                  ? 'bg-gradient-to-r from-[#06181f] to-[#081226] border border-emerald-500/60'
                  : 'bg-[#060d1e]/90 border border-[#1c315e]/80 hover:border-cyan-500/50 hover:bg-[#0a152e]'
              }`}
            >
              {/* Notification Left: Icon + Notification Message */}
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl flex-shrink-0 ${
                    isCritical
                      ? 'bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse'
                      : isHigh
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                      : isDispatch
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="space-y-0.5">
                  <span
                    className={`font-black text-xs block ${
                      isCritical
                        ? 'text-white drop-shadow-sm font-extrabold'
                        : 'text-slate-100 font-bold'
                    }`}
                  >
                    {item.message}
                  </span>
                  <span className="text-[10px] text-slate-400 block sm:hidden">
                    {item.timestamp}
                  </span>
                </div>
              </div>

              {/* Notification Right: Status Badge + Timestamp */}
              <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0 self-start sm:self-center">
                {/* Status Badge */}
                <span
                  className={`text-[10px] font-mono font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm ${
                    isCritical
                      ? 'bg-red-500/25 text-red-300 border border-red-500 animate-pulse'
                      : isHigh
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                      : isDispatch
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : isSuccess
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  }`}
                >
                  {isCritical && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />}
                  {isDispatch && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                  {item.status}
                </span>

                {/* Timestamp */}
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 hidden sm:flex">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {item.timestamp}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
