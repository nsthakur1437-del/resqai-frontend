import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, AlertTriangle, CheckCircle2, Clock3, Eye, MapPin, Radio, Send, ShieldAlert, Users, Video } from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';

const severityStyles = {
  Critical: 'border-red-500/30 bg-red-500/10 text-red-300',
  High: 'border-orange-500/30 bg-orange-500/10 text-orange-300',
  Moderate: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
  Resolved: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const {
    incidents, rescueTeams, resources, reports, activityLog, stats,
    assignRescueTeam, resolveIncident, deployResource,
    simulateIncomingEmergency, setSelectedIncidentId, isSimulatingAi
  } = useDisaster();
  const [now, setNow] = useState(new Date());
  const [query, setQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [assigningIncidentId, setAssigningIncidentId] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeIncidents = incidents.filter(incident => incident.status !== 'Resolved');
  const activeTeams = rescueTeams.filter(team => team.status === 'Dispatched' || team.status === 'On Mission');
  const availableTeams = rescueTeams.filter(team => team.status === 'Available');
  const deployedResources = resources.filter(resource => resource.status === 'Deployed');
  const filteredIncidents = useMemo(() => activeIncidents.filter(incident => {
    const text = `${incident.title} ${incident.location} ${incident.disaster}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (severityFilter === 'All' || incident.severity === severityFilter);
  }), [activeIncidents, query, severityFilter]);

  const metricCards = [
    { label: 'System status', value: 'ONLINE', detail: 'API and command services', icon: Activity, color: 'text-emerald-300' },
    { label: 'Active incidents', value: stats.totalActiveIncidents, detail: `${reports.length} incoming reports`, icon: Radio, color: 'text-cyan-300' },
    { label: 'Critical incidents', value: stats.criticalCasesCount, detail: 'Immediate operator action', icon: ShieldAlert, color: 'text-red-300' },
    { label: 'Rescue teams active', value: activeTeams.length, detail: `${stats.availableRescueTeamsCount} available`, icon: Users, color: 'text-blue-300' },
    { label: 'People at risk', value: stats.totalPeopleAffected.toLocaleString(), detail: 'Across active incidents', icon: AlertTriangle, color: 'text-amber-300' }
  ];

  return (
    <div className="mx-auto max-w-[1600px] space-y-5 pb-12">
      <header className="flex flex-col justify-between gap-4 border-b border-slate-700/70 pb-4 lg:flex-row lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> ResQAI command center</span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">System online</span>
          </div>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">Response operations</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-right"><div className="font-mono text-sm font-bold text-white">{now.toLocaleTimeString()}</div><div className="text-[10px] text-slate-400">{now.toLocaleDateString()}</div></div>
          <button onClick={() => simulateIncomingEmergency()} disabled={isSimulatingAi} className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-slate-950 transition hover:bg-cyan-300 disabled:cursor-wait disabled:opacity-60"><Radio className="h-4 w-4" />{isSimulatingAi ? 'Processing' : 'Simulate alert'}</button>
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {metricCards.map(({ label, value, detail, icon: Icon, color }) => (
          <div key={label} className="glass-panel rounded-2xl p-4"><div className="flex items-start justify-between"><div><div className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">{label}</div><div className={`mt-2 text-2xl font-black ${color}`}>{value}</div><div className="mt-1 text-[11px] text-slate-500">{detail}</div></div><Icon className={`h-5 w-5 ${color}`} /></div></div>
        ))}
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
        <section className="glass-panel overflow-hidden rounded-2xl">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-700/70 p-4 sm:flex-row sm:items-center">
            <div><div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Live queue</div><h2 className="mt-1 text-lg font-bold text-white">Active incidents</h2></div>
            <div className="flex flex-wrap gap-2"><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search incidents" className="w-44 rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-xs text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/50" />{['All', 'Critical', 'High', 'Moderate'].map(value => <button key={value} onClick={() => setSeverityFilter(value)} className={`rounded-lg border px-2.5 py-2 text-[11px] font-semibold ${severityFilter === value ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-200' : 'border-slate-700 text-slate-400'}`}>{value}</button>)}</div>
          </div>
          <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-slate-950/40 text-[10px] uppercase tracking-[0.15em] text-slate-500"><tr><th className="px-4 py-3">Incident</th><th className="px-4 py-3">Location</th><th className="px-4 py-3">Risk</th><th className="px-4 py-3">People</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Actions</th></tr></thead><tbody className="divide-y divide-slate-800/80">{filteredIncidents.map(incident => <tr key={incident.id} className="transition hover:bg-cyan-500/5"><td className="px-4 py-3"><div className="font-semibold text-white">{incident.title}</div><div className="mt-1 text-[11px] text-slate-500">{incident.id} · {incident.disaster}</div></td><td className="px-4 py-3 text-slate-300">{incident.location}</td><td className="px-4 py-3"><span className={`rounded-full border px-2 py-1 text-[10px] font-bold uppercase ${severityStyles[incident.severity] || severityStyles.High}`}>{incident.severity}</span></td><td className="px-4 py-3 font-mono text-slate-200">{incident.peopleAffected}</td><td className="px-4 py-3 text-xs text-slate-300">{incident.assignedTeam ? 'Team assigned' : incident.status}</td><td className="px-4 py-3"><div className="flex items-center gap-2"><button onClick={() => { setSelectedIncidentId(incident.id); navigate('/map'); }} className="rounded-lg border border-slate-700 px-2.5 py-1.5 text-[11px] font-semibold text-slate-300 hover:border-cyan-400/40 hover:text-cyan-200"><Eye className="mr-1 inline h-3.5 w-3.5" />View</button>{incident.assignedTeam ? <button onClick={() => resolveIncident(incident.id)} className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-300">Resolve</button> : <button onClick={() => setAssigningIncidentId(assigningIncidentId === incident.id ? null : incident.id)} className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1.5 text-[11px] font-semibold text-cyan-200">Assign</button>}</div>{assigningIncidentId === incident.id && <select autoFocus defaultValue="" onChange={event => { if (event.target.value) { assignRescueTeam(incident.id, event.target.value); setAssigningIncidentId(null); } }} className="mt-2 rounded-lg border border-cyan-500/30 bg-slate-950 px-2 py-1 text-[11px] text-white"><option value="">Select team</option>{availableTeams.map(team => <option key={team.id} value={team.id}>{team.name} · {team.etaMinutes}m</option>)}</select>}</td></tr>)}</tbody></table>{filteredIncidents.length === 0 && <div className="p-10 text-center text-sm text-slate-400">No incidents match the current filters.</div>}</div>
        </section>

        <aside className="space-y-5">
          <section className="glass-panel rounded-2xl p-4"><div className="mb-3 flex items-center justify-between"><div><div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Command actions</div><h2 className="mt-1 text-lg font-bold text-white">Operator tools</h2></div><Activity className="h-5 w-5 text-cyan-300" /></div><div className="grid grid-cols-2 gap-2"><button onClick={() => navigate('/map')} className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-left text-xs font-semibold text-cyan-200"><MapPin className="mb-2 h-4 w-4" />Open live map</button><button onClick={() => navigate('/monitoring')} className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-left text-xs font-semibold text-red-200"><Video className="mb-2 h-4 w-4" />Live monitoring</button><button onClick={() => navigate('/vision')} className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-3 text-left text-xs font-semibold text-indigo-200"><Activity className="mb-2 h-4 w-4" />AI image analysis</button><button onClick={() => navigate('/dispatch')} className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-left text-xs font-semibold text-emerald-200"><Send className="mb-2 h-4 w-4" />Dispatch center</button></div></section>
          <section className="glass-panel rounded-2xl p-4"><div className="mb-3 flex items-center justify-between"><div><div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Resource board</div><h2 className="mt-1 text-lg font-bold text-white">Field capacity</h2></div><Users className="h-5 w-5 text-emerald-300" /></div><div className="space-y-2">{resources.slice(0, 4).map(resource => <div key={resource.id} className="flex items-center justify-between rounded-xl border border-slate-700/80 bg-slate-900/50 p-3"><div><div className="text-xs font-semibold text-white">{resource.name}</div><div className="mt-1 text-[10px] text-slate-400">{resource.type} · {resource.capacityStatus}</div></div>{resource.status === 'Deployed' ? <span className="text-[10px] font-bold text-cyan-300">DEPLOYED</span> : <button onClick={() => deployResource(resource.id, activeIncidents[0]?.id)} className="rounded-lg border border-cyan-500/30 px-2 py-1 text-[10px] font-bold text-cyan-200">Deploy</button>}</div>)}</div><div className="mt-3 grid grid-cols-3 gap-2 text-center"><div><div className="text-lg font-bold text-white">{resources.length}</div><div className="text-[10px] text-slate-500">Total</div></div><div><div className="text-lg font-bold text-emerald-300">{resources.filter(resource => resource.status !== 'Deployed').length}</div><div className="text-[10px] text-slate-500">Available</div></div><div><div className="text-lg font-bold text-cyan-300">{deployedResources.length}</div><div className="text-[10px] text-slate-500">Deployed</div></div></div></section>
          <section className="glass-panel rounded-2xl p-4"><div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold text-white">Activity feed</h2><Clock3 className="h-4 w-4 text-slate-400" /></div><div className="space-y-2">{activityLog.slice(0, 5).map(item => <div key={item.id} className="border-l-2 border-cyan-500/40 pl-3"><div className="text-xs text-slate-200">{item.text}</div><div className="mt-1 text-[10px] text-slate-500">{item.time}</div></div>)}</div></section>
        </aside>
      </div>
    </div>
  );
};
