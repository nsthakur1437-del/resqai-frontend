import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Gauge,
  MapPin,
  Shield,
  Users,
  Zap
} from 'lucide-react';

export const Landing = () => {
  const navigate = useNavigate();

  const handleNavigateCommandCenter = () => navigate('/dashboard');
  const handleNavigateMap = () => navigate('/map');

  return (
    <div className="min-h-screen bg-[#020b17] text-slate-100">
      <header className="sticky top-0 z-40 border-b border-cyan-500/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button onClick={() => navigate('/')} className="flex items-center gap-3 text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 shadow-lg shadow-cyan-500/20">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-white">ResQAI</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Response hub</div>
            </div>
          </button>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <button onClick={handleNavigateCommandCenter} className="transition-colors hover:text-cyan-300">Overview</button>
            <button onClick={handleNavigateMap} className="transition-colors hover:text-cyan-300">Map</button>
            <button onClick={() => navigate('/login')} className="transition-colors hover:text-cyan-300">Login</button>
          </nav>

          <button
            onClick={handleNavigateCommandCenter}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
          >
            <Zap className="h-4 w-4" />
            Open dashboard
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <section className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Live emergency response
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl">
              Disaster response,
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">made intelligent.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              ResQAI helps teams detect risk, analyze disaster images, prioritize incidents, and coordinate rescue operations from a single modern emergency command center.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={handleNavigateCommandCenter}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
              >
                Enter command center
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={handleNavigateMap}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/70 px-6 py-3.5 text-sm font-semibold text-slate-100 transition hover:border-cyan-500/30 hover:text-cyan-200"
              >
                <MapPin className="h-4 w-4 text-cyan-300" />
                View live map
              </button>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl shadow-slate-950/10">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                  Incidents
                </div>
                <div className="mt-3 text-3xl font-black text-white">12</div>
                <div className="text-sm text-slate-400">Active now</div>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl shadow-slate-950/10">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  <Users className="h-3.5 w-3.5 text-emerald-400" />
                  Teams
                </div>
                <div className="mt-3 text-3xl font-black text-white">18</div>
                <div className="text-sm text-slate-400">Ready</div>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl shadow-slate-950/10">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  <Clock3 className="h-3.5 w-3.5 text-amber-400" />
                  Response
                </div>
                <div className="mt-3 text-3xl font-black text-white">8 min</div>
                <div className="text-sm text-slate-400">Average</div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-cyan-500/20 bg-slate-900/60 p-5 shadow-2xl shadow-cyan-500/5 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Current status</div>
                <div className="mt-2 text-2xl font-black text-white">Priority queue</div>
              </div>
              <div className="rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-red-300">
                P1
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-white">Bridge A flood</div>
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">Critical</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-300">
                  <MapPin className="h-4 w-4 text-rose-400" />
                  Sector 7 • 20 trapped
                </div>
              </div>

              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-white">Road blockage</div>
                  <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">High</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-300">
                  <Gauge className="h-4 w-4 text-amber-400" />
                  Route rerouted • 3 units assigned
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-white">Shelter readiness</div>
                  <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">Stable</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  8 beds available • 2 teams on standby
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-6">
            <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Operations</div>
            <h2 className="mt-2 text-3xl font-black text-white">What needs attention</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: MapPin, title: 'Flood alert', text: 'High-risk zone near Bridge A needs immediate rescue routing and medical support.', color: 'cyan' },
              { icon: Gauge, title: 'Road access', text: 'Alternate routes are active. Keep emergency crews moving with updated route guidance.', color: 'amber' },
              { icon: CheckCircle2, title: 'Shelter capacity', text: 'Local shelters are stable, but additional transport support is still recommended for evacuees.', color: 'emerald' }
            ].map(({ icon: Icon, title, text, color }) => (
              <div key={title} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/10">
                <div className="flex items-center gap-3">
                  <div className={`rounded-2xl p-2 ${
                    color === 'cyan' ? 'bg-cyan-500/10 text-cyan-300' :
                    color === 'amber' ? 'bg-amber-500/10 text-amber-300' :
                    'bg-emerald-500/10 text-emerald-300'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Field</div>
                    <div className="font-semibold text-white">{title}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
