import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GitMerge,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  PhoneCall,
  Smartphone,
  User,
  Satellite,
  HardHat,
  Compass,
  ArrowRight,
  ShieldCheck,
  Activity,
  FileText,
  Eye,
  Radio,
  Zap,
  RefreshCw,
  Clock,
  Users,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  Sliders,
  Play,
  RotateCcw
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { soundFX } from '../utils/audio';
import { DemoProgressBar } from '../components/DemoProgressBar';

// Raw Incoming Reports Data (Exact prompt specifications)
const incomingReportsData = [
  {
    id: 'REP-RAW-101',
    type: 'phone',
    icon: PhoneCall,
    iconColor: 'text-amber-400 bg-amber-500/20 border-amber-500/30',
    title: 'EMERGENCY CALL',
    content: 'People are trapped near Village A due to severe flooding.',
    source: 'Emergency Helpline',
    time: '2 minutes ago',
    status: 'NEW',
    statusBadge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    matched: true,
    locationTag: 'Village A',
    disasterTag: 'Flood'
  },
  {
    id: 'REP-RAW-102',
    type: 'social',
    icon: Smartphone,
    iconColor: 'text-pink-400 bg-pink-500/20 border-pink-500/30',
    title: 'SOCIAL MEDIA REPORT',
    content: 'Major flooding has blocked the road near Village A. People need help.',
    source: 'Social Media',
    time: '3 minutes ago',
    status: 'NEW',
    statusBadge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    matched: true,
    locationTag: 'Village A Road',
    disasterTag: 'Flood / Blockage'
  },
  {
    id: 'REP-RAW-103',
    type: 'citizen',
    icon: User,
    iconColor: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30',
    title: 'CITIZEN REPORT',
    content: 'Approximately 80 people are trapped near Village A. The main road is underwater.',
    source: 'Citizen App',
    time: '3 minutes ago',
    status: 'NEW',
    statusBadge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    matched: true,
    locationTag: 'Village A Sector 2',
    disasterTag: 'Flash Flood'
  },
  {
    id: 'REP-RAW-104',
    type: 'satellite',
    icon: Satellite,
    iconColor: 'text-indigo-400 bg-indigo-500/20 border-indigo-500/30',
    title: 'SATELLITE DETECTION',
    content: 'High water accumulation detected near Village A.',
    source: 'Satellite Monitoring',
    time: '5 minutes ago',
    status: 'NEW',
    statusBadge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    matched: true,
    locationTag: 'Village A Basin',
    disasterTag: 'Water Anomaly'
  },
  {
    id: 'REP-RAW-105',
    type: 'field',
    icon: HardHat,
    iconColor: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
    title: 'FIELD TEAM UPDATE',
    content: 'Flooding confirmed. Main access road blocked.',
    source: 'Field Response Team',
    time: '6 minutes ago',
    status: 'VERIFIED',
    statusBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    matched: true,
    locationTag: 'Village A Access Route',
    disasterTag: 'Submerged Roadway'
  },
  {
    id: 'REP-RAW-106',
    type: 'gps',
    icon: Compass,
    iconColor: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
    title: 'GPS / AGENCY DATA',
    content: 'Location and road blockage information confirmed.',
    source: 'Agency System',
    time: '6 minutes ago',
    status: 'VERIFIED',
    statusBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    matched: true,
    locationTag: 'Village A Grid 28.70°N',
    disasterTag: 'GIS Road Impediment'
  }
];

export const AiIncidentFusion = () => {
  const navigate = useNavigate();
  const { setSelectedIncidentId, addToast } = useDisaster();

  // Processing state: 'idle' | 'analyzing' | 'completed'
  const [fusionState, setFusionState] = useState('completed');
  const [currentProcessStep, setCurrentProcessStep] = useState(5); // 0 to 5
  const [selectedReportId, setSelectedReportId] = useState('REP-RAW-101');
  const [filterSource, setFilterSource] = useState('all');
  const [activeStepTab, setActiveStepTab] = useState(null);

  // Trigger automated fusion animation
  const handleStartFusion = () => {
    soundFX.playEmergencyAlert();
    setFusionState('analyzing');
    setCurrentProcessStep(1);
    addToast('AI Fusion Triggered', 'Comparing multi-source reports & identifying duplicate telemetry...', 'info');

    // Step 1: Location Matching (800ms)
    setTimeout(() => {
      soundFX.playClick();
      setCurrentProcessStep(2);
    }, 900);

    // Step 2: Duplicate Detection (1800ms)
    setTimeout(() => {
      soundFX.playClick();
      setCurrentProcessStep(3);
    }, 1900);

    // Step 3: NLP Analysis (2800ms)
    setTimeout(() => {
      soundFX.playAiChime();
      setCurrentProcessStep(4);
    }, 2900);

    // Step 4: Vision Analysis (3800ms)
    setTimeout(() => {
      soundFX.playClick();
      setCurrentProcessStep(5);
    }, 3900);

    // Final result verified (4800ms)
    setTimeout(() => {
      soundFX.playSuccess();
      setFusionState('completed');
      addToast('✓ Incident Verified (94% Confidence)', '12 raw reports consolidated into 1 actionable P1 Critical Incident.', 'success');
    }, 4900);
  };

  const handleReset = () => {
    soundFX.playClick();
    setFusionState('idle');
    setCurrentProcessStep(0);
    addToast('Fusion Engine Reset', 'Ready to initiate multi-source report analysis.', 'info');
  };

  const handleNavigateToPriorityQueue = () => {
    soundFX.playClick();
    setSelectedIncidentId('INC-01'); // Village A Flood
    navigate('/priority');
  };

  const selectedReport = incomingReportsData.find(r => r.id === selectedReportId) || incomingReportsData[0];

  const filteredReports = incomingReportsData.filter(r => {
    if (filterSource === 'all') return true;
    return r.type === filterSource;
  });

  return (
    <div className="space-y-7 pb-16 max-w-[1450px] mx-auto">
      {/* Demo Progress Bar (Step 2: AI Incident Fusion) */}
      <DemoProgressBar currentStep={2} />

      {/* ================================================== */}
      {/* 1. PAGE HEADER                                     */}
      {/* ================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1c315e]/70">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 via-teal-500 to-blue-600 text-black shadow-lg shadow-cyan-500/20">
                <GitMerge className="w-6 h-6" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-300">
                AI Incident Fusion
              </span>
            </h1>

            <span className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase shadow">
              MULTI-SOURCE INTELLIGENCE
            </span>
          </div>

          <p className="text-xs sm:text-sm text-cyan-200/80 mt-1.5 font-medium italic">
            "Transforming fragmented disaster information into verified incidents."
          </p>
        </div>

        {/* Live Engine Indicator & Quick Action */}
        <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#08152c] border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold shadow-inner">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
            <span>● AI FUSION ENGINE LIVE</span>
          </div>

          {fusionState === 'completed' && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0d172e] hover:bg-[#132347] text-slate-300 hover:text-white border border-[#1c315e] text-xs font-semibold transition-all cursor-pointer"
              title="Reset state to re-run demo"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Reset Demo</span>
            </button>
          )}
        </div>
      </div>

      {/* ================================================== */}
      {/* 2. TOP VISUAL WORKFLOW: MULTI-SOURCE TO INCIDENT   */}
      {/* ================================================== */}
      <section className="glass-panel p-5 rounded-2xl border-cyan-500/30 shadow-2xl bg-gradient-to-r from-[#070f22] via-[#0b1b3b] to-[#070f22] relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/4 w-96 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-[#1c315e]/60 relative z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
              END-TO-END FUSION PIPELINE WORKFLOW
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Ingesting 6 Multi-Modal Feeds in Real-Time
          </span>
        </div>

        {/* 5-Node Interactive Flow Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-stretch relative z-10">
          {/* Node 1: Disconnected Sources */}
          <div className="p-3.5 rounded-xl bg-[#080f21] border border-[#1c315e] flex flex-col justify-between hover:border-cyan-500/40 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                  1. MULTI-FEED INGEST
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">
                  6 SOURCES
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-medium text-slate-300 py-1">
                <span className="p-1 rounded bg-[#0d1833] border border-[#162952]" title="Emergency Calls">📞 Calls</span>
                <span className="p-1 rounded bg-[#0d1833] border border-[#162952]" title="Social Media">📱 Social</span>
                <span className="p-1 rounded bg-[#0d1833] border border-[#162952]" title="Citizen App">👤 App</span>
                <span className="p-1 rounded bg-[#0d1833] border border-[#162952]" title="Satellite Feed">🛰️ Sat</span>
                <span className="p-1 rounded bg-[#0d1833] border border-[#162952]" title="Field Units">👷 Field</span>
                <span className="p-1 rounded bg-[#0d1833] border border-[#162952]" title="GPS / Agency">📍 GPS</span>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 mt-2 block">
              12 fragmented raw messages
            </span>
          </div>

          {/* Node 2: AI Fusion Engine */}
          <div className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
            fusionState === 'analyzing' || fusionState === 'completed'
              ? 'bg-[#091d3d] border-cyan-400 ring-1 ring-cyan-500/40 shadow-lg shadow-cyan-950'
              : 'bg-[#080f21] border-[#1c315e]'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold uppercase text-cyan-300">
                  2. 🤖 AI FUSION ENGINE
                </span>
                <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              </div>
              <p className="text-xs font-bold text-white leading-tight">
                Cross-Modal Spatial & Temporal Clustering
              </p>
            </div>
            <span className="text-[10px] text-cyan-300 font-mono mt-2">
              Geo Radius: 350m • Temporal: 15m
            </span>
          </div>

          {/* Node 3: Duplicate Detection */}
          <div className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
            currentProcessStep >= 2
              ? 'bg-[#091a38] border-cyan-500/50 text-cyan-200'
              : 'bg-[#080f21] border-[#1c315e]'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                  3. 🔄 DUPLICATE DETECTION
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  8 MERGED
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-200 leading-tight">
                Semantic redundancy elimination
              </p>
            </div>
            <span className="text-[10px] text-emerald-300 font-mono mt-2">
              ✓ Noise Reduced by 67%
            </span>
          </div>

          {/* Node 4: Multi-Modal Verification */}
          <div className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
            currentProcessStep >= 3
              ? 'bg-[#091f33] border-cyan-400 text-white'
              : 'bg-[#080f21] border-[#1c315e]'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold uppercase text-cyan-300">
                  4. 🔍 VERIFICATION
                </span>
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <p className="text-xs font-semibold text-slate-200 leading-tight">
                NLP + Vision + GIS Triangulation
              </p>
            </div>
            <span className="text-[10px] text-cyan-300 font-mono mt-2">
              3 Independent Layers
            </span>
          </div>

          {/* Node 5: 1 Verified Incident */}
          <div className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
            fusionState === 'completed'
              ? 'bg-[#1b0d1e]/80 border-red-500 ring-1 ring-red-500/40 shadow-xl shadow-red-950/60'
              : 'bg-[#080f21] border-[#1c315e]'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold uppercase text-red-300">
                  5. 🚨 VERIFIED INCIDENT
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 animate-pulse">
                  P1 CRITICAL
                </span>
              </div>
              <p className="text-xs font-extrabold text-white leading-tight">
                Village A Flood (80 Affected)
              </p>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono font-bold mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              94% Confidence
            </span>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 3. MAIN THREE-COLUMN LAYOUT                        */}
      {/* ================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ============================================== */}
        {/* LEFT COLUMN: RAW INCOMING REPORTS (4 Cols)     */}
        {/* ============================================== */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-white font-mono flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                Live Incoming Reports
              </h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {incomingReportsData.length} LIVE
              </span>
            </div>
          </div>

          {/* Source Filter Tabs */}
          <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-[#080f21] border border-[#1c315e]/70 text-[10px] font-mono">
            {[
              { key: 'all', label: 'All Feeds' },
              { key: 'phone', label: '📞 Calls' },
              { key: 'social', label: '📱 Social' },
              { key: 'citizen', label: '👤 App' },
              { key: 'satellite', label: '🛰️ Sat' },
              { key: 'field', label: '👷 Field' },
              { key: 'gps', label: '📍 GPS' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => {
                  setFilterSource(tab.key);
                  soundFX.playClick();
                }}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  filterSource === tab.key
                    ? 'bg-cyan-500/30 text-cyan-200 font-bold border border-cyan-400/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* List of Incoming Reports */}
          <div className="space-y-2.5 max-h-[560px] overflow-y-auto pr-1">
            {filteredReports.map((report) => {
              const isSelected = report.id === selectedReportId;
              const Icon = report.icon;

              return (
                <div
                  key={report.id}
                  onClick={() => {
                    setSelectedReportId(report.id);
                    soundFX.playClick();
                  }}
                  className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer relative ${
                    isSelected
                      ? 'bg-[#102042] border-cyan-400 ring-2 ring-cyan-500/40 shadow-xl shadow-cyan-950'
                      : 'bg-[#080e1d]/95 hover:bg-[#0c1730] border-[#1c315e]/80'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg border ${report.iconColor}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-extrabold text-white font-mono tracking-tight">
                        {report.title}
                      </span>
                    </div>

                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${report.statusBadge}`}>
                      {report.status}
                    </span>
                  </div>

                  {/* Message Quote */}
                  <p className="text-xs text-slate-100 font-medium leading-relaxed my-1.5 italic">
                    "{report.content}"
                  </p>

                  {/* Metadata line */}
                  <div className="mt-2.5 pt-2 border-t border-[#1c315e]/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="text-slate-300 font-semibold">
                      Src: {report.source}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {report.time}
                    </span>
                  </div>

                  {/* Cluster indicator */}
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="text-[9px] font-mono bg-cyan-950/60 text-cyan-300 px-1.5 py-0.2 rounded border border-cyan-800">
                      📍 {report.locationTag}
                    </span>
                    <span className="text-[9px] font-mono bg-blue-950/60 text-blue-300 px-1.5 py-0.2 rounded border border-blue-800">
                      🌊 {report.disasterTag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI CONNECTION DETECTION BOX (Prompt Spec) */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#0e2246] to-[#08152c] border border-cyan-400/50 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-xs font-extrabold text-cyan-300 font-mono tracking-wide">
                  🤖 AI CONNECTION DETECTED
                </span>
              </div>
              <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                92% MATCH
              </span>
            </div>

            <p className="text-xs text-slate-200 font-medium leading-relaxed">
              "Multiple reports may describe the same disaster incident."
            </p>

            {/* Matching Factors */}
            <div className="grid grid-cols-2 gap-1.5 text-[11px] font-medium text-slate-300 bg-[#060c1a] p-2.5 rounded-xl border border-[#1c315e]">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Similar location</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Similar disaster type</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Similar time</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Similar affected area</span>
              </div>
            </div>

            {/* Action Trigger Button */}
            <button
              onClick={handleStartFusion}
              disabled={fusionState === 'analyzing'}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Zap className={`w-4 h-4 ${fusionState === 'analyzing' ? 'animate-spin' : ''}`} />
              <span>{fusionState === 'analyzing' ? 'FUSING MULTI-MODAL DATA...' : 'ANALYZE & FUSE REPORTS'}</span>
            </button>
          </div>
        </div>

        {/* ============================================== */}
        {/* CENTER COLUMN: AI FUSION ENGINE (4.5 Cols)    */}
        {/* ============================================== */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border-cyan-500/40 shadow-2xl bg-gradient-to-b from-[#0d1c3a] via-[#09152b] to-[#060e1e] flex flex-col justify-between min-h-[720px]">
            <div>
              {/* Center Header */}
              <div className="pb-4 border-b border-[#1c315e]/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25">
                    <Cpu className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                      <span>🤖 AI FUSION ENGINE</span>
                    </h2>
                    <p className="text-[11px] text-cyan-300 font-mono">
                      Multi-Modal Triangulation & Semantic Synthesis
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 block">STATUS</span>
                  <span className={`text-[11px] font-mono font-extrabold ${
                    fusionState === 'analyzing' ? 'text-amber-400 animate-pulse' : 'text-emerald-400'
                  }`}>
                    {fusionState === 'analyzing' ? 'PROCESSING...' : 'READY / VERIFIED'}
                  </span>
                </div>
              </div>

              {/* Live Processing Animation / Steps Container */}
              <div className="mt-4 space-y-3">
                {/* STEP 1: 📍 LOCATION MATCHING */}
                <div className={`p-3 rounded-xl border transition-all duration-300 ${
                  currentProcessStep >= 1
                    ? 'bg-[#08152c] border-cyan-500/50 shadow-md'
                    : 'bg-[#060b17] border-[#16233f] opacity-50'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-extrabold text-cyan-300 flex items-center gap-1.5 font-mono">
                      <span>STEP 1:</span>
                      <span>📍 LOCATION MATCHING</span>
                    </span>
                    {currentProcessStep >= 1 && (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3" /> MATCHED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 italic">
                    "Comparing locations from multiple sources..."
                  </p>
                  {currentProcessStep >= 1 && (
                    <div className="mt-2 py-1 px-2.5 rounded-lg bg-[#0c1a36] border border-cyan-500/30 text-[11px] font-mono text-cyan-200 flex items-center justify-between">
                      <span>✓ Village A matched</span>
                      <span className="text-slate-400 text-[10px]">Radius: 350m</span>
                    </div>
                  )}
                </div>

                {/* STEP 2: 🔄 DUPLICATE DETECTION */}
                <div className={`p-3 rounded-xl border transition-all duration-300 ${
                  currentProcessStep >= 2
                    ? 'bg-[#08152c] border-cyan-500/50 shadow-md'
                    : 'bg-[#060b17] border-[#16233f] opacity-50'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-extrabold text-cyan-300 flex items-center gap-1.5 font-mono">
                      <span>STEP 2:</span>
                      <span>🔄 DUPLICATE DETECTION</span>
                    </span>
                    {currentProcessStep >= 2 && (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3" /> 8 MERGED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 italic">
                    "Identifying reports related to the same incident..."
                  </p>
                  {currentProcessStep >= 2 && (
                    <div className="mt-2 p-2 rounded-lg bg-[#0c1a36] border border-cyan-500/30 text-xs font-mono text-slate-200 flex items-center justify-between">
                      <span className="text-slate-400">12 incoming reports</span>
                      <span className="text-cyan-400 font-bold">↓</span>
                      <span className="text-emerald-300 font-extrabold">8 duplicate / related reports detected</span>
                    </div>
                  )}
                </div>

                {/* STEP 3: 📝 NLP ANALYSIS */}
                <div className={`p-3 rounded-xl border transition-all duration-300 ${
                  currentProcessStep >= 3
                    ? 'bg-[#08152c] border-cyan-500/50 shadow-md'
                    : 'bg-[#060b17] border-[#16233f] opacity-50'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-extrabold text-cyan-300 flex items-center gap-1.5 font-mono">
                      <span>STEP 3:</span>
                      <span>📝 NLP ENTITY EXTRACTION</span>
                    </span>
                    {currentProcessStep >= 3 && (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3" /> 5 ENTITIES
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 italic mb-2">
                    Extract key emergency variables from unstructured voice/text:
                  </p>
                  {currentProcessStep >= 3 && (
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-mono font-bold">
                        🌊 Flood
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold">
                        📍 Village A
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-mono font-bold">
                        👥 80 People Trapped
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-300 border border-orange-500/30 text-[10px] font-mono font-bold">
                        🚧 Road Blocked
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                        🏥 Medical Assistance Needed
                      </span>
                    </div>
                  )}
                </div>

                {/* STEP 4: 🖼️ VISION ANALYSIS */}
                <div className={`p-3 rounded-xl border transition-all duration-300 ${
                  currentProcessStep >= 4
                    ? 'bg-[#08152c] border-cyan-500/50 shadow-md'
                    : 'bg-[#060b17] border-[#16233f] opacity-50'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-extrabold text-cyan-300 flex items-center gap-1.5 font-mono">
                      <span>STEP 4:</span>
                      <span>🖼️ VISION ANALYSIS (SATELLITE & DRONE)</span>
                    </span>
                    {currentProcessStep >= 4 && (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3" /> CONFIRMED
                      </span>
                    )}
                  </div>
                  {currentProcessStep >= 4 && (
                    <div className="mt-1 space-y-1 text-[11px] font-mono text-slate-200 bg-[#0b1836] p-2 rounded-lg border border-[#1c315e]">
                      <div className="flex items-center gap-1 text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Flooded area detected (1.8 sq km inundation)</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Water accumulation confirmed (Depth: 1.4m - 2.1m)</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Road impact detected (Arterial Access Submerged)</span>
                      </div>
                      <span className="text-[9px] text-cyan-400/80 italic block pt-1 border-t border-[#1c315e]/50">
                        * Demo AI analysis — simulated prototype result.
                      </span>
                    </div>
                  )}
                </div>

                {/* STEP 5: 🗺️ GIS VERIFICATION */}
                <div className={`p-3 rounded-xl border transition-all duration-300 ${
                  currentProcessStep >= 5
                    ? 'bg-[#08152c] border-emerald-500/50 shadow-md'
                    : 'bg-[#060b17] border-[#16233f] opacity-50'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-extrabold text-cyan-300 flex items-center gap-1.5 font-mono">
                      <span>STEP 5:</span>
                      <span>🗺️ GIS VERIFICATION</span>
                    </span>
                    {currentProcessStep >= 5 && (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3" /> 100% GEO-LOCKED
                      </span>
                    )}
                  </div>
                  {currentProcessStep >= 5 && (
                    <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-mono py-1">
                      <div className="bg-[#0b1933] p-1.5 rounded border border-emerald-500/30 text-emerald-300">
                        ✓ Location Confirmed
                      </div>
                      <div className="bg-[#0b1933] p-1.5 rounded border border-emerald-500/30 text-emerald-300">
                        ✓ Road Blockage
                      </div>
                      <div className="bg-[#0b1933] p-1.5 rounded border border-emerald-500/30 text-emerald-300">
                        ✓ Area Identified
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Final Overall Confidence Box */}
            <div className="mt-4 pt-3 border-t border-[#1c315e] flex items-center justify-between bg-[#071329] p-3 rounded-xl border border-cyan-500/30">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  FINAL RESULT
                </span>
                <span className="text-xs font-extrabold text-white flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  INCIDENT VERIFIED
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 block">OVERALL CONFIDENCE</span>
                <span className="text-xl font-extrabold text-emerald-300 font-display tracking-tight">
                  94%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================== */}
        {/* RIGHT COLUMN: VERIFIED INCIDENT (3.5 Cols)    */}
        {/* ============================================== */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border-red-500/40 shadow-2xl bg-gradient-to-b from-[#180e22] via-[#0f1429] to-[#070e1c] flex flex-col justify-between min-h-[720px] relative overflow-hidden">
            {/* Top alert glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              {/* Header */}
              <div className="pb-3 border-b border-[#1c315e]/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400 block">
                    🚨 CRITICAL INCIDENT
                  </span>
                  <h2 className="text-xl font-extrabold text-white tracking-tight mt-0.5">
                    VILLAGE A FLOOD
                  </h2>
                </div>

                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse">
                  P1 — CRITICAL
                </span>
              </div>

              {/* Incident Details Grid (Exact Prompt Specs) */}
              <div className="mt-4 space-y-2.5 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  {/* 📍 LOCATION */}
                  <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                    <span className="text-[10px] font-mono text-slate-400 block font-bold">
                      📍 LOCATION
                    </span>
                    <span className="font-extrabold text-white text-xs mt-0.5 block">
                      Village A
                    </span>
                  </div>

                  {/* 🌊 DISASTER TYPE */}
                  <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                    <span className="text-[10px] font-mono text-slate-400 block font-bold">
                      🌊 DISASTER TYPE
                    </span>
                    <span className="font-extrabold text-cyan-300 text-xs mt-0.5 block">
                      Flood
                    </span>
                  </div>

                  {/* 👥 PEOPLE AFFECTED */}
                  <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                    <span className="text-[10px] font-mono text-slate-400 block font-bold">
                      👥 PEOPLE AFFECTED
                    </span>
                    <span className="font-extrabold text-emerald-300 text-sm mt-0.5 block">
                      80 People
                    </span>
                  </div>

                  {/* 🔴 PRIORITY */}
                  <div className="p-2.5 rounded-xl bg-[#080e1d] border border-red-500/40">
                    <span className="text-[10px] font-mono text-red-400 block font-bold">
                      🔴 PRIORITY
                    </span>
                    <span className="font-extrabold text-red-300 text-xs mt-0.5 block">
                      P1 — CRITICAL
                    </span>
                  </div>

                  {/* 🚧 INFRASTRUCTURE IMPACT */}
                  <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e] col-span-2">
                    <span className="text-[10px] font-mono text-slate-400 block font-bold">
                      🚧 INFRASTRUCTURE IMPACT
                    </span>
                    <span className="font-extrabold text-orange-300 text-xs mt-0.5 block">
                      Main Road Blocked & Under 1.8m Water
                    </span>
                  </div>

                  {/* 🏥 MEDICAL EMERGENCY */}
                  <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e] col-span-2">
                    <span className="text-[10px] font-mono text-slate-400 block font-bold">
                      🏥 MEDICAL EMERGENCY
                    </span>
                    <span className="font-extrabold text-red-200 text-xs mt-0.5 block">
                      Possible (Urgent Triage Boat Required)
                    </span>
                  </div>
                </div>

                {/* SOURCES VERIFIED LIST */}
                <div className="p-3 rounded-xl bg-[#080e1d] border border-cyan-500/30 space-y-2 mt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300">
                      SOURCES VERIFIED (6/6):
                    </span>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      ✓ MULTI-SOURCE VERIFIED
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono text-slate-200">
                    <div className="p-1 rounded bg-[#0d162e] border border-[#192b52] flex items-center gap-1.5">
                      <PhoneCall className="w-3 h-3 text-amber-400" />
                      <span>📞 Emergency Call</span>
                    </div>
                    <div className="p-1 rounded bg-[#0d162e] border border-[#192b52] flex items-center gap-1.5">
                      <Smartphone className="w-3 h-3 text-pink-400" />
                      <span>📱 Social Media</span>
                    </div>
                    <div className="p-1 rounded bg-[#0d162e] border border-[#192b52] flex items-center gap-1.5">
                      <User className="w-3 h-3 text-cyan-400" />
                      <span>👤 Citizen Report</span>
                    </div>
                    <div className="p-1 rounded bg-[#0d162e] border border-[#192b52] flex items-center gap-1.5">
                      <Satellite className="w-3 h-3 text-indigo-400" />
                      <span>🛰️ Satellite Data</span>
                    </div>
                    <div className="p-1 rounded bg-[#0d162e] border border-[#192b52] flex items-center gap-1.5">
                      <HardHat className="w-3 h-3 text-emerald-400" />
                      <span>👷 Field Team</span>
                    </div>
                    <div className="p-1 rounded bg-[#0d162e] border border-[#192b52] flex items-center gap-1.5">
                      <Compass className="w-3 h-3 text-blue-400" />
                      <span>📍 GPS Data</span>
                    </div>
                  </div>
                </div>

                {/* AI Rationale Quote */}
                <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 block mb-1">
                    🤖 AI FUSION SUMMARY
                  </span>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "8 fragmented reports reconciled into 1 high-confidence incident. Redundant calls eliminated. Primary road blockage confirmed by SAR imagery."
                  </p>
                </div>
              </div>
            </div>

            {/* NEXT ACTION CARD & BUTTON (Prompt Spec) */}
            <div className="mt-5 pt-3 border-t border-[#1c315e] space-y-2.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <p className="text-xs text-slate-300 font-medium">
                  "The incident has been verified and is ready for priority assessment."
                </p>
              </div>

              <button
                onClick={handleNavigateToPriorityQueue}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-950/60 transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-2"
              >
                <span>VIEW PRIORITY ASSESSMENT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* 4. REPORT FUSION COMPARISON: BEFORE VS AFTER       */}
      {/* ================================================== */}
      <section className="glass-panel p-6 rounded-2xl border-cyan-500/30 shadow-2xl bg-gradient-to-r from-[#071126] via-[#0b1a38] to-[#071126]">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-300 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            VALUE DEMONSTRATION FOR COMMANDERS
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
            "From 12 Reports to 1 Verified Incident"
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            How ResQAI cuts through chaos to enable split-second rescue coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Left: BEFORE AI FUSION */}
          <div className="md:col-span-5 p-5 rounded-2xl bg-[#14080c]/80 border border-red-500/30 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-red-500/20">
              <span className="text-xs font-mono font-extrabold uppercase text-red-400 tracking-wider">
                BEFORE AI FUSION
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300">
                12 Fragmented Reports
              </span>
            </div>

            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li className="flex items-start gap-2 text-red-300">
                <span className="text-red-400 font-bold">❌</span>
                <span>Duplicate information causing confusion</span>
              </li>
              <li className="flex items-start gap-2 text-red-300">
                <span className="text-red-400 font-bold">❌</span>
                <span>Conflicting casualty and location details</span>
              </li>
              <li className="flex items-start gap-2 text-red-300">
                <span className="text-red-400 font-bold">❌</span>
                <span>Difficult to prioritize under high stress</span>
              </li>
              <li className="flex items-start gap-2 text-red-300">
                <span className="text-red-400 font-bold">❌</span>
                <span>Different information sources and formats</span>
              </li>
            </ul>
          </div>

          {/* Center Connector */}
          <div className="md:col-span-2 flex flex-col items-center justify-center p-3 text-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black font-extrabold shadow-lg shadow-cyan-500/30 mb-2">
              <GitMerge className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-extrabold text-cyan-300 uppercase">
              AI INCIDENT FUSION
            </span>
            <span className="text-[10px] text-slate-400 font-mono mt-0.5">
              Instant Synthesis
            </span>
          </div>

          {/* Right: AFTER AI FUSION */}
          <div className="md:col-span-5 p-5 rounded-2xl bg-[#081822]/80 border border-emerald-500/40 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
              <span className="text-xs font-mono font-extrabold uppercase text-emerald-400 tracking-wider">
                AFTER AI FUSION
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                1 Verified Incident
              </span>
            </div>

            <ul className="space-y-2 text-xs text-slate-200 font-medium">
              <li className="flex items-start gap-2 text-emerald-300">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Structured information ready for immediate dispatch</span>
              </li>
              <li className="flex items-start gap-2 text-emerald-300">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Location confirmed & geo-locked within 350m</span>
              </li>
              <li className="flex items-start gap-2 text-emerald-300">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Severity analyzed: P1 Critical (80 people affected)</span>
              </li>
              <li className="flex items-start gap-2 text-emerald-300">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Ready for seamless priority assessment & team routing</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 5. MULTI-MODAL VERIFICATION PANEL (3 CARDS)        */}
      {/* ================================================== */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-white font-mono">
              MULTI-MODAL VERIFICATION PANEL
            </h2>
          </div>
          <span className="text-[11px] font-mono text-emerald-300 bg-emerald-500/15 px-2.5 py-0.5 rounded border border-emerald-500/30 font-bold">
            OVERALL CONFIDENCE: 94%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: 📝 NLP Text Analysis */}
          <div className="glass-panel p-4 rounded-2xl border-cyan-500/30 space-y-3 bg-[#081024]">
            <div className="flex items-center justify-between pb-2 border-b border-[#1c315e]">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-500/20 text-blue-300">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-white block">
                    📝 NLP
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Text Analysis
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ✓ VERIFIED
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Detected Entities:</div>
              <div className="p-2 rounded-lg bg-[#050b17] border border-[#162547] space-y-1">
                <div className="text-cyan-300 font-semibold">• Disaster: Flood</div>
                <div className="text-cyan-300 font-semibold">• Location: Village A</div>
                <div className="text-cyan-300 font-semibold">• Impact: 80 People Trapped</div>
                <div className="text-cyan-300 font-semibold">• Access: Road Blocked</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
              <span>Model: ResQ-NLP v4</span>
              <span className="text-emerald-400 font-bold">96.2% Confidence</span>
            </div>
          </div>

          {/* Card 2: 🖼️ AI Vision Image Analysis */}
          <div className="glass-panel p-4 rounded-2xl border-cyan-500/30 space-y-3 bg-[#081024]">
            <div className="flex items-center justify-between pb-2 border-b border-[#1c315e]">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-white block">
                    🖼️ AI VISION
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Satellite / Drone Analysis
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ✓ VERIFIED
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Detected Visuals:</div>
              <div className="p-2 rounded-lg bg-[#050b17] border border-[#162547] space-y-1">
                <div className="text-indigo-300 font-semibold">• Flooded Area (1.8 sq km)</div>
                <div className="text-indigo-300 font-semibold">• Road Impact (Submerged)</div>
                <div className="text-indigo-300 font-semibold">• Water Accumulation Depth</div>
                <div className="text-indigo-300 font-semibold">• Isolated Rooftop Clusters</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
              <span>Model: SAR-Vision v2.1</span>
              <span className="text-emerald-400 font-bold">93.8% Confidence</span>
            </div>
          </div>

          {/* Card 3: 🗺️ GIS Location Verification */}
          <div className="glass-panel p-4 rounded-2xl border-cyan-500/30 space-y-3 bg-[#081024]">
            <div className="flex items-center justify-between pb-2 border-b border-[#1c315e]">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-white block">
                    🗺️ GIS
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Location Verification
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ✓ VERIFIED
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="text-[10px] font-bold text-slate-400 uppercase">GIS Verification:</div>
              <div className="p-2 rounded-lg bg-[#050b17] border border-[#162547] space-y-1">
                <div className="text-emerald-300 font-semibold">• Village A Coordinates Confirmed</div>
                <div className="text-emerald-300 font-semibold">• Lowland Flood Plain Match</div>
                <div className="text-emerald-300 font-semibold">• Blocked Road: NH-44 Spur</div>
                <div className="text-emerald-300 font-semibold">• Alternative Route Calculated</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
              <span>GIS Engine: Spatial-Lock</span>
              <span className="text-emerald-400 font-bold">97.4% Confidence</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 6. TRANSPARENCY NOTICE & TAGLINE BANNER            */}
      {/* ================================================== */}
      <footer className="p-4 rounded-2xl bg-[#060b17]/90 border border-[#1c315e]/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <HelpCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span className="italic">
            "Demo / Prototype — AI results are simulated for frontend demonstration."
          </span>
        </div>

        <div className="font-mono text-cyan-300 font-bold text-xs tracking-tight">
          "Many reports. One verified incident. Faster rescue decisions."
        </div>
      </footer>
    </div>
  );
};
