import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useDisaster();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map((t) => {
        let border = 'border-cyan-500/40 bg-[#0d152a]/95 text-cyan-200';
        let Icon = Info;

        if (t.type === 'success') {
          border = 'border-emerald-500/50 bg-[#061e1a]/95 text-emerald-300';
          Icon = CheckCircle2;
        } else if (t.type === 'critical') {
          border = 'border-red-500/50 bg-[#250d12]/95 text-red-200';
          Icon = AlertTriangle;
        }

        return (
          <div
            key={t.id}
            className={`pointer-events-auto p-3.5 rounded-2xl border shadow-2xl backdrop-blur-xl flex items-start gap-3 animate-in slide-in-from-right-10 duration-300 ${border}`}
          >
            <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h5 className="text-xs font-bold text-white tracking-tight">{t.title}</h5>
              <p className="text-[11px] text-slate-300 leading-snug mt-0.5">{t.message}</p>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
