import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  ShieldAlert,
  Users,
  MapPin,
  Ambulance,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Layers,
  ArrowRight,
  ShieldCheck,
  Activity,
  FileText,
  Eye,
  Radio,
  Sliders,
  Check,
  Edit3,
  BarChart3,
  TrendingUp,
  Cpu,
  HelpCircle,
  X,
  RotateCcw,
  LifeBuoy,
  AlertCircle
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { DemoProgressBar } from '../components/DemoProgressBar';
import { soundFX } from '../utils/audio';

// Realistic Priority Queue Data matching exact prompt specifications
const initialQueueData = [
  {
    id: 'INC-01',
    rank: '#1',
    title: 'VILLAGE A FLOOD',
    location: 'Village A',
    disaster: 'Flood',
    peopleAffected: 80,
    roadCondition: 'Main Road Blocked',
    medicalStatus: 'Medical Emergency Possible',
    score: 94,
    priority: 'P1 — Critical',
    priorityBadge: '🔴 P1 — CRITICAL',
    priorityClass: 'bg-red-500/20 text-red-300 border-red-500/40',
    cardBorder: 'border-red-500/50 bg-gradient-to-r from-[#170912] via-[#101933] to-[#0a1226]',
    status: 'REQUIRES IMMEDIATE RESPONSE',
    statusClass: 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse',
    requirements: ['Rescue Boat', 'Medical Support Team', 'Dewatering Pumps'],
    breakdown: {
      peopleRisk: 90,
      severity: 100,
      accessDifficulty: 80,
      medicalRisk: 85
    },
    aiExplanation: 'This incident is ranked as Critical because a large number of people are affected, flooding is severe, access routes are blocked, and medical assistance may be required.',
    isHighest: true,
    humanApproved: false,
    impacts: {
      people: 'HIGH',
      severity: 'CRITICAL',
      access: 'HIGH',
      medical: 'HIGH'
    }
  },
  {
    id: 'INC-02',
    rank: '#2',
    title: 'RIVER VALLEY FLOOD',
    location: 'River Valley',
    disaster: 'Flood',
    peopleAffected: 45,
    roadCondition: 'Partial Bridge Submersion',
    medicalStatus: 'People Trapped / Hypothermia Risk',
    score: 89,
    priority: 'P1 — Critical',
    priorityBadge: '🔴 P1 — CRITICAL',
    priorityClass: 'bg-red-500/20 text-red-300 border-red-500/40',
    cardBorder: 'border-red-500/30 bg-[#081024]',
    status: 'URGENT',
    statusClass: 'bg-red-500/20 text-red-300 border-red-500/40',
    requirements: ['Inflatable Raft', 'Emergency Blankets', 'Paramedic'],
    breakdown: {
      peopleRisk: 84,
      severity: 92,
      accessDifficulty: 78,
      medicalRisk: 80
    },
    aiExplanation: 'Rapidly rising river currents threatening 45 trapped residents with high hypothermia danger.',
    isHighest: false,
    humanApproved: false,
    impacts: {
      people: 'HIGH',
      severity: 'HIGH',
      access: 'MEDIUM',
      medical: 'HIGH'
    }
  },
  {
    id: 'INC-03',
    rank: '#3',
    title: 'MOUNTAIN ROAD LANDSLIDE',
    location: 'Mountain Road',
    disaster: 'Landslide',
    peopleAffected: 15,
    roadCondition: 'Major Road Blockage (120m Debris)',
    medicalStatus: 'Minor Injuries Reported',
    score: 76,
    priority: 'P2 — High',
    priorityBadge: '🟠 P2 — HIGH',
    priorityClass: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    cardBorder: 'border-orange-500/30 bg-[#081024]',
    status: 'HIGH RESPONSE NEEDED',
    statusClass: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    requirements: ['Heavy Earthmover', 'Structural Shoring Kit'],
    breakdown: {
      peopleRisk: 65,
      severity: 80,
      accessDifficulty: 95,
      medicalRisk: 50
    },
    aiExplanation: 'Substantial rockfall cutting off commuter artery. 15 travelers stranded without active flood threat.',
    isHighest: false,
    humanApproved: false,
    impacts: {
      people: 'MEDIUM',
      severity: 'HIGH',
      access: 'CRITICAL',
      medical: 'LOW'
    }
  },
  {
    id: 'INC-04',
    rank: '#4',
    title: 'VILLAGE B FLOODING',
    location: 'Village B',
    disaster: 'Flood',
    peopleAffected: 20,
    roadCondition: 'Waterlogged Track',
    medicalStatus: 'Elder Care Standby',
    score: 72,
    priority: 'P2 — High',
    priorityBadge: '🟠 P2 — HIGH',
    priorityClass: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    cardBorder: 'border-orange-500/30 bg-[#081024]',
    status: 'ACTIVE',
    statusClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    requirements: ['4x4 Troop Carrier', 'Evacuation Squad'],
    breakdown: {
      peopleRisk: 68,
      severity: 65,
      accessDifficulty: 70,
      medicalRisk: 60
    },
    aiExplanation: 'Low-lying houses inundation requiring proactive evacuation before nightfall.',
    isHighest: false,
    humanApproved: false,
    impacts: {
      people: 'MEDIUM',
      severity: 'MEDIUM',
      access: 'MEDIUM',
      medical: 'MEDIUM'
    }
  },
  {
    id: 'INC-05',
    rank: '#5',
    title: 'RIVER OVERFLOW',
    location: 'Riverside Area',
    disaster: 'Flood Watch',
    peopleAffected: 5,
    roadCondition: 'Passable with Caution',
    medicalStatus: 'No Medical Risk',
    score: 48,
    priority: 'P3 — Moderate',
    priorityBadge: '🟡 P3 — MODERATE',
    priorityClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    cardBorder: 'border-amber-500/30 bg-[#081024]',
    status: 'MONITORING',
    statusClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    requirements: ['Sandbag Deployment Team', 'Water Gauge Drone'],
    breakdown: {
      peopleRisk: 35,
      severity: 40,
      accessDifficulty: 45,
      medicalRisk: 20
    },
    aiExplanation: 'Minor river overflow into agricultural embankment. No immediate life threat.',
    isHighest: false,
    humanApproved: false,
    impacts: {
      people: 'LOW',
      severity: 'LOW',
      access: 'LOW',
      medical: 'NONE'
    }
  }
];

export const PriorityQueue = () => {
  const navigate = useNavigate();
  const { setSelectedIncidentId, addToast } = useDisaster();

  const [queue, setQueue] = useState(initialQueueData);
  const [selectedIncidentId, setSelectedId] = useState('INC-01');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [manualPriority, setManualPriority] = useState('P1 — Critical');

  const selectedIncident = queue.find((item) => item.id === selectedIncidentId) || queue[0];

  // Filter logic
  const filteredQueue = queue.filter((item) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Critical') return item.priority.includes('P1');
    if (activeFilter === 'High') return item.priority.includes('P2');
    if (activeFilter === 'Moderate') return item.priority.includes('P3');
    return true;
  });

  // Human in the Loop: Approve Priority
  const handleApprovePriority = () => {
    soundFX.playSuccess();
    setQueue((prev) =>
      prev.map((item) =>
        item.id === selectedIncident.id
          ? { ...item, humanApproved: true, status: 'READY FOR RESOURCE MATCHING' }
          : item
      )
    );
    addToast(
      '✓ Priority Approved by Commander',
      `${selectedIncident.title} approved as ${selectedIncident.priority}. Incident unlocked for Resource Matching.`,
      'success'
    );
  };

  // Human in the Loop: Edit Priority Override
  const handleSaveEditedPriority = () => {
    soundFX.playClick();
    const isP1 = manualPriority.includes('P1');
    const isP2 = manualPriority.includes('P2');
    
    setQueue((prev) =>
      prev.map((item) =>
        item.id === selectedIncident.id
          ? {
              ...item,
              priority: manualPriority,
              priorityBadge: isP1 ? '🔴 P1 — CRITICAL' : isP2 ? '🟠 P2 — HIGH' : '🟡 P3 — MODERATE',
              priorityClass: isP1
                ? 'bg-red-500/20 text-red-300 border-red-500/40'
                : isP2
                ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40',
              humanApproved: true,
              status: 'READY FOR RESOURCE MATCHING (OVERRIDDEN)'
            }
          : item
      )
    );
    setIsEditModalOpen(false);
    addToast(
      'Priority Manually Adjusted',
      `${selectedIncident.title} updated to ${manualPriority} by Operational Authority.`,
      'info'
    );
  };

  // Navigate to Step 4: Resource Matching
  const handleNavigateToResourceMatching = () => {
    soundFX.playClick();
    setSelectedIncidentId('INC-01'); // Village A Flood
    navigate('/resource-matching');
  };

  return (
    <div className="space-y-7 pb-16 max-w-[1450px] mx-auto">
      {/* Demo Progress Bar (Step 3: Priority Queue) */}
      <DemoProgressBar currentStep={3} />

      {/* ================================================== */}
      {/* 1. PAGE HEADER                                     */}
      {/* ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1c315e]/70">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-red-500 via-orange-500 to-amber-500 text-white shadow-lg shadow-red-500/20">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-orange-200">
                Priority Queue
              </span>
            </h1>

            <span className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase shadow">
              AI-ASSISTED DECISION SUPPORT
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 font-medium italic">
            "AI ranks verified incidents based on urgency and response requirements."
          </p>
        </div>

        {/* Live Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#08152c] border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold self-start sm:self-auto shadow-inner">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <span>● PRIORITY ENGINE LIVE</span>
        </div>
      </div>

      {/* ================================================== */}
      {/* 2. TOP SUMMARY CARDS (4 Summary Cards)             */}
      {/* ================================================== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: 🔴 P1 CRITICAL */}
        <div className="glass-panel p-5 rounded-2xl border-red-500/40 bg-gradient-to-b from-[#1b0a13] to-[#0a1224] relative overflow-hidden group hover:border-red-500/60 transition-all shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-red-400">
              🔴 P1 CRITICAL
            </span>
            <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center animate-pulse">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-4xl font-extrabold text-white tracking-tight font-display">
              3
            </div>
            <p className="text-xs text-red-200/90 mt-1 font-medium">
              Immediate response required
            </p>
          </div>
        </div>

        {/* Card 2: 🟠 P2 HIGH */}
        <div className="glass-panel p-5 rounded-2xl border-orange-500/30 bg-gradient-to-b from-[#19110b] to-[#0a1224] hover:border-orange-500/50 transition-all shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-orange-400">
              🟠 P2 HIGH
            </span>
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/40 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-4xl font-extrabold text-white tracking-tight font-display">
              5
            </div>
            <p className="text-xs text-orange-200/90 mt-1 font-medium">
              Urgent response needed
            </p>
          </div>
        </div>

        {/* Card 3: 🟡 P3 MODERATE */}
        <div className="glass-panel p-5 rounded-2xl border-amber-500/30 bg-gradient-to-b from-[#18150b] to-[#0a1224] hover:border-amber-500/50 transition-all shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-amber-400">
              🟡 P3 MODERATE
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-4xl font-extrabold text-white tracking-tight font-display">
              4
            </div>
            <p className="text-xs text-amber-200/90 mt-1 font-medium">
              Monitoring required
            </p>
          </div>
        </div>

        {/* Card 4: 🟢 RESOLVED */}
        <div className="glass-panel p-5 rounded-2xl border-emerald-500/30 bg-gradient-to-b from-[#0a1815] to-[#0a1224] hover:border-emerald-500/50 transition-all shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-emerald-400">
              🟢 RESOLVED
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-4xl font-extrabold text-white tracking-tight font-display">
              12
            </div>
            <p className="text-xs text-emerald-200/90 mt-1 font-medium">
              Successfully handled
            </p>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 3. HOW AI DETERMINES PRIORITY (Interactive Flow)   */}
      {/* ================================================== */}
      <section className="glass-panel p-5 rounded-2xl border-cyan-500/30 shadow-2xl bg-gradient-to-r from-[#081224] via-[#0b1a38] to-[#081224]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-[#1c315e]/60">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
              🤖 How ResQAI Determines Priority
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Automated Triaging & Multi-Factor Risk Grading
          </span>
        </div>

        {/* 4 Major Factors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Factor 1: 👥 PEOPLE AFFECTED */}
          <div className="p-3.5 rounded-xl bg-[#060c1c] border border-[#1c315e] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white uppercase font-mono">
                  👥 PEOPLE AFFECTED
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                More people at risk directly increases priority weighting.
              </p>
            </div>
            <span className="text-[10px] font-mono text-cyan-300 font-semibold mt-2">
              Weight: 35%
            </span>
          </div>

          {/* Factor 2: ⚠️ SEVERITY */}
          <div className="p-3.5 rounded-xl bg-[#060c1c] border border-[#1c315e] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-xs font-bold text-white uppercase font-mono">
                  ⚠️ SEVERITY
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                Critical danger, structural collapse, or serious injuries increase priority.
              </p>
            </div>
            <span className="text-[10px] font-mono text-red-300 font-semibold mt-2">
              Weight: 30%
            </span>
          </div>

          {/* Factor 3: 📍 LOCATION & ACCESS */}
          <div className="p-3.5 rounded-xl bg-[#060c1c] border border-[#1c315e] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-bold text-white uppercase font-mono">
                  📍 LOCATION & ACCESS
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                Blocked roads or cut-off terrain accelerate the need for early deployment.
              </p>
            </div>
            <span className="text-[10px] font-mono text-orange-300 font-semibold mt-2">
              Weight: 20%
            </span>
          </div>

          {/* Factor 4: 🏥 RESOURCE REQUIREMENT */}
          <div className="p-3.5 rounded-xl bg-[#060c1c] border border-[#1c315e] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Ambulance className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white uppercase font-mono">
                  🏥 RESOURCE REQUIREMENT
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                Medical emergencies or specialized water rescue gear bump urgency.
              </p>
            </div>
            <span className="text-[10px] font-mono text-emerald-300 font-semibold mt-2">
              Weight: 15%
            </span>
          </div>
        </div>

        {/* Simple Flow Banner */}
        <div className="mt-4 pt-3 border-t border-[#1c315e]/70 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <span className="text-[11px] font-bold text-slate-400 uppercase">
            TRIAGING FORMULA:
          </span>
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className="px-2 py-0.5 rounded bg-[#09152b] text-slate-200 border border-[#1c315e]">
              VERIFIED INCIDENT
            </span>
            <span className="text-cyan-400 font-bold">→</span>
            <span className="px-2 py-0.5 rounded bg-[#09152b] text-cyan-300 border border-cyan-500/30">
              🤖 AI PRIORITY ENGINE
            </span>
            <span className="text-cyan-400 font-bold">→</span>
            <span className="px-2 py-0.5 rounded bg-[#09152b] text-slate-200 border border-[#1c315e]">
              RISK ANALYSIS
            </span>
            <span className="text-cyan-400 font-bold">→</span>
            <span className="px-2 py-0.5 rounded bg-[#09152b] text-emerald-300 border border-emerald-500/30 font-bold">
              PRIORITY SCORE (0-100)
            </span>
            <span className="text-cyan-400 font-bold">→</span>
            <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40 font-extrabold">
              P1 / P2 / P3
            </span>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 4. MAIN TWO-COLUMN LAYOUT: QUEUE + AI ANALYSIS     */}
      {/* ================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ============================================== */}
        {/* LEFT: LIVE INCIDENT PRIORITY QUEUE (7 Cols)   */}
        {/* ============================================== */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-white font-mono flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>LIVE INCIDENT PRIORITY QUEUE</span>
              <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                {filteredQueue.length} RANKED
              </span>
            </h2>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { label: 'All', key: 'All' },
                { label: '🔴 P1 Critical', key: 'Critical' },
                { label: '🟠 P2 High', key: 'High' },
                { label: '🟡 P3 Moderate', key: 'Moderate' }
              ].map((tab) => {
                const isActive = activeFilter === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setActiveFilter(tab.key);
                      soundFX.playClick();
                    }}
                    className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-950'
                        : 'bg-[#080e1d] text-slate-400 hover:text-white border border-[#1c315e]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Incident Queue List */}
          <div className="space-y-3">
            {filteredQueue.map((inc) => {
              const isSelected = inc.id === selectedIncidentId;
              const isP1 = inc.priority.includes('P1');

              return (
                <div
                  key={inc.id}
                  onClick={() => {
                    setSelectedId(inc.id);
                    soundFX.playClick();
                  }}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer relative ${
                    isSelected
                      ? 'bg-[#101e3d] border-cyan-400 ring-2 ring-cyan-500/40 shadow-xl shadow-cyan-950'
                      : inc.cardBorder
                  }`}
                >
                  {/* Highest Priority Tag */}
                  {inc.isHighest && (
                    <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-gradient-to-l from-red-600 via-orange-600 to-transparent text-white text-[9px] font-extrabold uppercase font-mono tracking-wider rounded-bl-xl shadow flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      HIGHEST PRIORITY INCIDENT
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-extrabold font-mono text-cyan-300 px-2 py-0.5 rounded bg-[#071329] border border-cyan-500/40">
                        {inc.rank}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider border ${inc.priorityClass}`}>
                        {inc.priorityBadge}
                      </span>
                      <h3 className="text-sm font-extrabold text-white tracking-tight">
                        {inc.title}
                      </h3>
                    </div>

                    {/* Score badge */}
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <div className="text-right">
                        <span className="text-[9px] font-mono text-slate-400 block uppercase">
                          Priority Score
                        </span>
                        <span className={`text-base font-extrabold font-display ${
                          isP1 ? 'text-red-400' : 'text-orange-300'
                        }`}>
                          {inc.score} <span className="text-xs text-slate-400 font-mono">/ 100</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Incident Meta Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs py-2 my-1 border-y border-[#1c315e]/50 font-mono">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{inc.location}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                      <Users className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{inc.peopleAffected} People Affected</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-orange-300">
                      <AlertCircle className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                      <span className="truncate">{inc.roadCondition}</span>
                    </div>
                  </div>

                  {/* Footer & Status */}
                  <div className="mt-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${inc.statusClass}`}>
                        {inc.humanApproved ? '✓ PRIORITY APPROVED (READY)' : inc.status}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(inc.id);
                        soundFX.playClick();
                      }}
                      className="px-3 py-1 rounded-lg bg-[#0d152a] hover:bg-cyan-500/20 text-cyan-300 hover:text-white font-mono font-bold text-[11px] border border-cyan-500/30 transition-all cursor-pointer inline-flex items-center gap-1 self-end sm:self-auto"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>VIEW INCIDENT</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================== */}
        {/* RIGHT: AI PRIORITY ANALYSIS PANEL (5 Cols)    */}
        {/* ============================================== */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border-cyan-500/40 shadow-2xl bg-gradient-to-b from-[#0c1833] via-[#091326] to-[#070e1c] flex flex-col justify-between sticky top-24">
            <div>
              {/* Header */}
              <div className="pb-3 border-b border-[#1c315e] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow">
                    <Cpu className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-white tracking-tight">
                      🤖 AI PRIORITY ANALYSIS
                    </h2>
                    <span className="text-[11px] text-cyan-300 font-mono">
                      {selectedIncident.title} ({selectedIncident.rank})
                    </span>
                  </div>
                </div>

                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${selectedIncident.priorityClass}`}>
                  {selectedIncident.priority}
                </span>
              </div>

              {/* 4 Factor Impact Cards */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                {/* 👥 PEOPLE AFFECTED */}
                <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">
                    👥 PEOPLE AFFECTED
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-extrabold text-white text-xs">
                      {selectedIncident.peopleAffected} People
                    </span>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-red-500/20 text-red-300 border border-red-500/40">
                      Impact: {selectedIncident.impacts.people}
                    </span>
                  </div>
                </div>

                {/* 🌊 DISASTER SEVERITY */}
                <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">
                    🌊 DISASTER SEVERITY
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-extrabold text-orange-300 text-xs truncate">
                      {selectedIncident.disaster}
                    </span>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-red-500/20 text-red-300 border border-red-500/40">
                      Impact: {selectedIncident.impacts.severity}
                    </span>
                  </div>
                </div>

                {/* 🚧 ACCESS CONDITIONS */}
                <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">
                    🚧 ACCESS CONDITIONS
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-extrabold text-white text-xs truncate">
                      {selectedIncident.roadCondition}
                    </span>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-300 border border-orange-500/40">
                      Impact: {selectedIncident.impacts.access}
                    </span>
                  </div>
                </div>

                {/* 🏥 MEDICAL RISK */}
                <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">
                    🏥 MEDICAL RISK
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-extrabold text-red-200 text-xs truncate">
                      {selectedIncident.medicalStatus}
                    </span>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-red-500/20 text-red-300 border border-red-500/40">
                      Impact: {selectedIncident.impacts.medical}
                    </span>
                  </div>
                </div>
              </div>

              {/* PRIORITY SCORE VISUALIZATION (Progress Bars) */}
              <div className="mt-4 p-3.5 rounded-xl bg-[#080e1d] border border-cyan-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300">
                    PRIORITY SCORE BREAKDOWN
                  </span>
                  <span className="text-xs font-mono font-extrabold text-white">
                    {selectedIncident.score} / 100
                  </span>
                </div>

                <div className="space-y-2 text-[11px] font-mono">
                  {/* People at Risk */}
                  <div>
                    <div className="flex justify-between text-slate-300 text-[10px] mb-0.5">
                      <span>People at Risk</span>
                      <span className="text-cyan-300 font-bold">{selectedIncident.breakdown.peopleRisk}%</span>
                    </div>
                    <div className="w-full bg-[#0d162e] h-2 rounded-full overflow-hidden border border-[#1c315e]">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${selectedIncident.breakdown.peopleRisk}%` }}
                      />
                    </div>
                  </div>

                  {/* Severity */}
                  <div>
                    <div className="flex justify-between text-slate-300 text-[10px] mb-0.5">
                      <span>Severity</span>
                      <span className="text-red-400 font-bold">{selectedIncident.breakdown.severity}%</span>
                    </div>
                    <div className="w-full bg-[#0d162e] h-2 rounded-full overflow-hidden border border-[#1c315e]">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${selectedIncident.breakdown.severity}%` }}
                      />
                    </div>
                  </div>

                  {/* Access Difficulty */}
                  <div>
                    <div className="flex justify-between text-slate-300 text-[10px] mb-0.5">
                      <span>Access Difficulty</span>
                      <span className="text-orange-400 font-bold">{selectedIncident.breakdown.accessDifficulty}%</span>
                    </div>
                    <div className="w-full bg-[#0d162e] h-2 rounded-full overflow-hidden border border-[#1c315e]">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${selectedIncident.breakdown.accessDifficulty}%` }}
                      />
                    </div>
                  </div>

                  {/* Medical Risk */}
                  <div>
                    <div className="flex justify-between text-slate-300 text-[10px] mb-0.5">
                      <span>Medical Risk</span>
                      <span className="text-pink-400 font-bold">{selectedIncident.breakdown.medicalRisk}%</span>
                    </div>
                    <div className="w-full bg-[#0d162e] h-2 rounded-full overflow-hidden border border-[#1c315e]">
                      <div
                        className="bg-gradient-to-r from-pink-500 to-red-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${selectedIncident.breakdown.medicalRisk}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Final Score Callout */}
                <div className="mt-2 pt-2 border-t border-[#1c315e] flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] text-slate-400 font-bold">
                    FINAL PRIORITY SCORE:
                  </span>
                  <span className="text-lg font-extrabold text-red-300 font-display">
                    {selectedIncident.score} / 100 ({selectedIncident.priority})
                  </span>
                </div>
              </div>

              {/* AI Explanation Quote */}
              <div className="mt-3 p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 block mb-1">
                  🤖 AI TRIAGING RATIONALE
                </span>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{selectedIncident.aiExplanation}"
                </p>
              </div>

              {/* HUMAN-IN-THE-LOOP SECTION (Prompt Spec) */}
              <div className="mt-4 p-3.5 rounded-xl bg-[#09142c] border border-cyan-400/40 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold text-cyan-300 flex items-center gap-1.5">
                    <span>👤 HUMAN DECISION SUPPORT</span>
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">
                    OPERATIONAL CONTROL
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-snug">
                  "AI recommends the priority, but final operational decisions remain under human authority."
                </p>

                {/* Status indicator */}
                {selectedIncident.humanApproved ? (
                  <div className="py-1.5 px-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>✓ PRIORITY APPROVED — READY FOR RESOURCE MATCHING</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={handleApprovePriority}
                      className="flex-1 py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1 shadow"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>✓ APPROVE PRIORITY</span>
                    </button>

                    <button
                      onClick={() => {
                        setManualPriority(selectedIncident.priority);
                        setIsEditModalOpen(true);
                        soundFX.playClick();
                      }}
                      className="py-2 px-3 rounded-lg bg-[#0d172e] hover:bg-[#132347] text-slate-300 hover:text-white border border-[#1c315e] font-mono text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>EDIT PRIORITY</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* NEXT ACTION CTA BUTTON (Prompt Spec) */}
            <div className="mt-5 pt-3 border-t border-[#1c315e] space-y-2">
              <button
                onClick={handleNavigateToResourceMatching}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-2"
              >
                <span>FIND BEST RESOURCE (RESOURCE MATCHING)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-[10px] text-slate-400 font-mono text-center block">
                Proceeding will match {selectedIncident.title} with optimal rescue teams & gear.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* 5. PRIORITY COMPARISON (WHY IS THIS INCIDENT FIRST?) */}
      {/* ================================================== */}
      <section className="glass-panel p-6 rounded-2xl border-cyan-500/30 shadow-2xl bg-gradient-to-r from-[#071126] via-[#0b1a38] to-[#071126]">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-300 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            TRANSPARENT AI EXPLAINABILITY
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
            WHY IS THIS INCIDENT FIRST?
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            "ResQAI helps decision-makers understand why one emergency should receive attention before another."
          </p>
        </div>

        {/* Head-to-Head Comparative Table */}
        <div className="max-w-4xl mx-auto glass-panel rounded-2xl overflow-hidden border border-[#1c315e]/80 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#080e1d] text-slate-400 uppercase tracking-wider font-mono text-[10px] border-b border-[#1c315e]">
                <tr>
                  <th className="py-3 px-4 font-bold">Decision Metric</th>
                  <th className="py-3 px-4 font-bold text-red-300 bg-red-950/20 border-x border-red-500/20">
                    🚨 #1 VILLAGE A FLOOD
                  </th>
                  <th className="py-3 px-4 font-bold text-orange-300">
                    ⚠️ #3 MOUNTAIN ROAD LANDSLIDE
                  </th>
                  <th className="py-3 px-4 font-bold text-cyan-300">AI Priority Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1c315e]/40 font-mono text-[11px]">
                {/* Metric 1 */}
                <tr className="hover:bg-[#111f42]/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-300">People Affected</td>
                  <td className="py-3 px-4 font-extrabold text-red-300 bg-red-950/10 border-x border-red-500/20">
                    80 People Trapped
                  </td>
                  <td className="py-3 px-4 text-slate-300">15 People Stranded</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">
                    5.3x higher population at risk
                  </td>
                </tr>

                {/* Metric 2 */}
                <tr className="hover:bg-[#111f42]/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-300">Disaster Severity</td>
                  <td className="py-3 px-4 font-extrabold text-red-300 bg-red-950/10 border-x border-red-500/20">
                    Critical Flooding (Rising Water)
                  </td>
                  <td className="py-3 px-4 text-slate-300">High (Debris Obstruction)</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">
                    Active drowning danger vs static debris
                  </td>
                </tr>

                {/* Metric 3 */}
                <tr className="hover:bg-[#111f42]/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-300">Medical Risk</td>
                  <td className="py-3 px-4 font-extrabold text-red-300 bg-red-950/10 border-x border-red-500/20">
                    High (Triage Boat Needed)
                  </td>
                  <td className="py-3 px-4 text-slate-300">Low (Minor Scratches)</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">
                    Immediate casualty evacuation urgency
                  </td>
                </tr>

                {/* Metric 4 */}
                <tr className="hover:bg-[#111f42]/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-300">Access Difficulty</td>
                  <td className="py-3 px-4 font-extrabold text-red-300 bg-red-950/10 border-x border-red-500/20">
                    High (1.8m Submerged Road)
                  </td>
                  <td className="py-3 px-4 text-slate-300">Medium (Single Lane Clearing)</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">
                    Requires motorized marine boats
                  </td>
                </tr>

                {/* Final Priority */}
                <tr className="bg-[#0b162f] font-bold">
                  <td className="py-3.5 px-4 text-white">FINAL PRIORITY</td>
                  <td className="py-3.5 px-4 text-red-400 bg-red-950/30 border-x border-red-500/30 text-xs">
                    🔴 P1 — CRITICAL (Score: 94)
                  </td>
                  <td className="py-3.5 px-4 text-orange-400 text-xs">
                    🟠 P2 — HIGH (Score: 76)
                  </td>
                  <td className="py-3.5 px-4 text-cyan-300 font-bold">
                    ✓ Village A dispatched first
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 6. EDIT PRIORITY OVERRIDE MODAL                    */}
      {/* ================================================== */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-2xl border-cyan-500/40 p-6 shadow-2xl animate-in zoom-in-95 duration-200 bg-[#0c162e]">
            <div className="flex items-center justify-between pb-3 border-b border-[#1c315e]">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-cyan-300 block">
                  HUMAN OVERRIDE
                </span>
                <h3 className="text-base font-extrabold text-white mt-0.5">
                  Adjust Incident Priority
                </h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-[#080e1d] border border-[#1c315e] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-xs text-slate-300">
                Select an operational priority level for <strong className="text-white">{selectedIncident.title}</strong>:
              </p>

              <div className="space-y-2">
                {[
                  { value: 'P1 — Critical', badge: '🔴 P1 — Critical (Immediate < 10 mins)', desc: 'Immediate threat to human life or trapped victims.' },
                  { value: 'P2 — High', badge: '🟠 P2 — High (Urgent < 30 mins)', desc: 'Evacuation required or major arterial blockage.' },
                  { value: 'P3 — Moderate', badge: '🟡 P3 — Moderate (Continuous Monitoring)', desc: 'Low urgency, property monitoring.' }
                ].map((opt) => (
                  <label
                    key={opt.value}
                    onClick={() => setManualPriority(opt.value)}
                    className={`p-3 rounded-xl border flex flex-col gap-1 cursor-pointer transition-all ${
                      manualPriority === opt.value
                        ? 'bg-[#102042] border-cyan-400 ring-1 ring-cyan-500/40 shadow'
                        : 'bg-[#080e1d] border-[#1c315e] hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white font-mono">
                        {opt.badge}
                      </span>
                      {manualPriority === opt.value && (
                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {opt.desc}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#1c315e] flex items-center justify-end gap-2">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#080e1d] text-slate-300 hover:text-white text-xs font-semibold border border-[#1c315e] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEditedPriority}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs uppercase tracking-wider shadow cursor-pointer"
              >
                Save Priority Override
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* 7. FOOTER TAGLINE BANNER                           */}
      {/* ================================================== */}
      <footer className="p-4 rounded-2xl bg-[#060b17]/90 border border-[#1c315e]/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <HelpCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span className="italic">
            "Demo / Prototype — Priority scoring weights are calibrated for disaster response triage."
          </span>
        </div>

        <div className="font-mono text-cyan-300 font-bold text-xs tracking-tight">
          "Verified incidents. Intelligent priorities. Faster decisions."
        </div>
      </footer>
    </div>
  );
};
