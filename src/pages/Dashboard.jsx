import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  AlertTriangle,
  Users,
  Ambulance,
  ShieldAlert,
  CheckCircle2,
  Clock,
  MapPin,
  Activity,
  Zap,
  ArrowRight,
  ArrowDown,
  Cpu,
  Layers,
  Play,
  LifeBuoy,
  Flame,
  Send,
  GitMerge,
  Radio,
  Compass,
  Check,
  RotateCcw,
  HelpCircle,
  X,
  PhoneCall,
  Smartphone,
  User,
  Satellite,
  HardHat,
  Eye,
  Building2,
  Home,
  Hospital,
  AlertOctagon
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { DemoProgressBar } from '../components/DemoProgressBar';
import { MultiSourceInputs } from '../components/MultiSourceInputs';
import { AiProcessingWorkflow } from '../components/AiProcessingWorkflow';
import { VerifiedIncidentRecords } from '../components/VerifiedIncidentRecords';
import { PriorityRankedMap } from '../components/PriorityRankedMap';
import { AiResourceRecommendation } from '../components/AiResourceRecommendation';
import { ResponderNotifications } from '../components/ResponderNotifications';
import { soundFX } from '../utils/audio';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { setSelectedIncidentId, addToast } = useDisaster();

  // Current Date/Time State
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [selectedVerifiedIncidentId, setSelectedVerifiedIncidentId] = useState('Incident #1042');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentDateTime(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }) +
          ' • ' +
          now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStartDemo = () => {
    soundFX.playClick();
    setIsDemoModalOpen(true);
  };

  const handleLaunchStep = (path) => {
    soundFX.playClick();
    setIsDemoModalOpen(false);
    setSelectedIncidentId('INC-01');
    navigate(path);
  };

  return (
    <div className="space-y-7 pb-16 max-w-[1450px] mx-auto">
      {/* Demo Progress Bar */}
      <DemoProgressBar currentStep={1} />

      {/* ================================================== */}
      {/* 1. PAGE HEADER                                     */}
      {/* ================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1c315e]/70">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 via-teal-500 to-blue-600 text-black shadow-lg shadow-cyan-500/20">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-300">
                AI DISASTER COMMAND CENTER
              </span>
            </h1>

            <span className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase shadow">
              UNIFIED RESPONSE PLATFORM
            </span>
          </div>

          <p className="text-xs sm:text-sm text-cyan-200/90 mt-2 font-medium">
            Unifying fragmented disaster information into one verified and prioritized response system.
          </p>
        </div>

        {/* Live System Status & Start Demo Button */}
        <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
          <div className="flex flex-col items-end text-right font-mono hidden sm:flex">
            <span className="text-xs text-slate-300 font-bold">{currentDateTime}</span>
            <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ● ALL SYSTEMS OPERATIONAL
            </span>
          </div>

          <button
            onClick={handleStartDemo}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 active:scale-95 cursor-pointer flex-shrink-0"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>▶ START DEMO WORKFLOW</span>
          </button>
        </div>
      </div>

      {/* ================================================== */}
      {/* 2. TOP SYSTEM SUMMARY (4 Cards)                    */}
      {/* ================================================== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: 📡 INCOMING REPORTS */}
        <div className="glass-panel p-5 rounded-2xl border-cyan-500/30 bg-gradient-to-b from-[#0c1833] to-[#070e1c] hover:border-cyan-500/50 transition-all shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-cyan-300">
              📡 INCOMING REPORTS
            </span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-4xl font-extrabold text-white tracking-tight font-display">
              24
            </div>
            <p className="text-xs text-cyan-200/90 mt-1 font-medium font-mono">
              +8 in the last hour
            </p>
          </div>
        </div>

        {/* Card 2: 🤖 VERIFIED INCIDENTS */}
        <div className="glass-panel p-5 rounded-2xl border-emerald-500/30 bg-gradient-to-b from-[#0a1818] to-[#070e1c] hover:border-emerald-500/50 transition-all shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-emerald-400">
              🤖 VERIFIED INCIDENTS
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-4xl font-extrabold text-white tracking-tight font-display">
              12
            </div>
            <p className="text-xs text-emerald-200/90 mt-1 font-medium font-mono">
              Multi-source verified
            </p>
          </div>
        </div>

        {/* Card 3: 🔴 CRITICAL PRIORITY */}
        <div className="glass-panel p-5 rounded-2xl border-red-500/40 bg-gradient-to-b from-[#1b0a13] to-[#070e1c] hover:border-red-500/60 transition-all shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-red-400">
              🔴 CRITICAL PRIORITY
            </span>
            <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center animate-pulse">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-4xl font-extrabold text-white tracking-tight font-display">
              3
            </div>
            <p className="text-xs text-red-200/90 mt-1 font-medium font-mono">
              Immediate response required
            </p>
          </div>
        </div>

        {/* Card 4: 🚤 ACTIVE RESPONSES */}
        <div className="glass-panel p-5 rounded-2xl border-blue-500/30 bg-gradient-to-b from-[#0a142c] to-[#070e1c] hover:border-blue-500/50 transition-all shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-blue-400">
              🚤 ACTIVE RESPONSES
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center">
              <LifeBuoy className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-4xl font-extrabold text-white tracking-tight font-display">
              5
            </div>
            <p className="text-xs text-blue-200/90 mt-1 font-medium font-mono">
              Resources currently deployed
            </p>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 3. MULTI-SOURCE DISASTER INPUTS                   */}
      {/* ================================================== */}
      <MultiSourceInputs selectedIncidentId={selectedVerifiedIncidentId} />

      {/* Step 1 → Step 2 Connector */}
      <div className="flex items-center justify-center my-[-8px]">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#060e22] border border-cyan-500/30 text-[10px] sm:text-xs font-mono font-bold text-cyan-300 shadow-md">
          <span>1. MULTI-SOURCE INPUTS</span>
          <ArrowDown className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
          <span>2. AI PROCESSING</span>
        </div>
      </div>

      {/* ================================================== */}
      {/* 4. AI PROCESSING WORKFLOW                          */}
      {/* ================================================== */}
      <AiProcessingWorkflow selectedIncidentId={selectedVerifiedIncidentId} />

      {/* Step 2 → Step 3 Connector */}
      <div className="flex items-center justify-center my-[-8px]">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#060e22] border border-emerald-500/30 text-[10px] sm:text-xs font-mono font-bold text-emerald-300 shadow-md">
          <span>2. AI PROCESSING</span>
          <ArrowDown className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
          <span>3. VERIFIED INCIDENT RECORD</span>
        </div>
      </div>

      {/* ================================================== */}
      {/* 5. VERIFIED INCIDENT RECORDS                       */}
      {/* ================================================== */}
      <VerifiedIncidentRecords
        selectedIncidentId={selectedVerifiedIncidentId}
        onSelectIncident={setSelectedVerifiedIncidentId}
      />

      {/* Step 3 → Step 4 Connector */}
      <div className="flex items-center justify-center my-[-8px]">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#060e22] border border-red-500/30 text-[10px] sm:text-xs font-mono font-bold text-red-300 shadow-md">
          <span>3. VERIFIED INCIDENT</span>
          <ArrowDown className="w-3.5 h-3.5 text-red-400 animate-bounce" />
          <span>4. PRIORITY-RANKED MAP</span>
        </div>
      </div>

      {/* ================================================== */}
      {/* 6. PRIORITY-RANKED MAP                             */}
      {/* ================================================== */}
      <PriorityRankedMap
        selectedIncidentId={selectedVerifiedIncidentId}
        onSelectIncident={setSelectedVerifiedIncidentId}
      />

      {/* Step 4 → Step 5 Connector */}
      <div className="flex items-center justify-center my-[-8px]">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#060e22] border border-cyan-500/30 text-[10px] sm:text-xs font-mono font-bold text-cyan-300 shadow-md">
          <span>4. PRIORITY MAP</span>
          <ArrowDown className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
          <span>5. RESOURCE RECOMMENDATION</span>
        </div>
      </div>

      {/* ================================================== */}
      {/* 7. AI RESOURCE RECOMMENDATION                      */}
      {/* ================================================== */}
      <AiResourceRecommendation
        selectedIncidentId={selectedVerifiedIncidentId}
      />

      {/* Step 5 → Step 6 Connector */}
      <div className="flex items-center justify-center my-[-8px]">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#060e22] border border-emerald-500/30 text-[10px] sm:text-xs font-mono font-bold text-emerald-300 shadow-md">
          <span>5. RESOURCE MATCH</span>
          <ArrowDown className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
          <span>6. RESPONDER NOTIFICATION</span>
        </div>
      </div>

      {/* ================================================== */}
      {/* 8. RESPONDER NOTIFICATIONS                         */}
      {/* ================================================== */}
      <ResponderNotifications
        selectedIncidentId={selectedVerifiedIncidentId}
      />

      {/* ================================================== */}
      {/* 9. COMPLETE SYSTEM FLOW (At Bottom)                */}
      {/* ================================================== */}
      <section className="glass-panel p-5 rounded-2xl border-cyan-500/30 shadow-2xl bg-gradient-to-r from-[#071126] via-[#091a38] to-[#071126]">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-300 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            UNIFIED DISASTER RESPONSE USER JOURNEY
          </span>
          <h3 className="text-base font-extrabold text-white mt-1.5">
            "Multiple Sources → AI Verification → Priority Map → Resource Match → Dispatch"
          </h3>
        </div>

        {/* 6-Node Flow Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-[10px] font-mono">
          <div
            onClick={() => handleLaunchStep('/reports')}
            className="p-2.5 rounded-xl bg-[#060c1a] border border-[#1c315e] hover:border-cyan-400 cursor-pointer transition-all flex flex-col justify-between"
          >
            <span className="text-slate-400 block text-xs">📡 MULTI-SOURCE</span>
            <span className="text-white font-bold block mt-1">1. INFO SOURCES</span>
            <span className="text-[9px] text-slate-500 mt-0.5">Helpline, SOS, Satellites</span>
          </div>
          <div
            onClick={() => handleLaunchStep('/fusion')}
            className="p-2.5 rounded-xl bg-[#060c1a] border border-cyan-500/40 hover:border-cyan-300 cursor-pointer transition-all shadow flex flex-col justify-between"
          >
            <span className="text-cyan-400 block text-xs">🤖 AI ENGINE</span>
            <span className="text-cyan-300 font-bold block mt-1">2. AI PROCESSING</span>
            <span className="text-[9px] text-cyan-400/70 mt-0.5">NLP & Deduplication</span>
          </div>
          <div
            onClick={() => handleLaunchStep('/fusion')}
            className="p-2.5 rounded-xl bg-[#060c1a] border border-emerald-500/40 hover:border-emerald-300 cursor-pointer transition-all flex flex-col justify-between"
          >
            <span className="text-emerald-400 block text-xs">🔍 VERIFICATION</span>
            <span className="text-emerald-300 font-bold block mt-1">3. VERIFIED INCIDENT</span>
            <span className="text-[9px] text-emerald-400/70 mt-0.5">Confidence & Location Lock</span>
          </div>
          <div
            onClick={() => handleLaunchStep('/priority')}
            className="p-2.5 rounded-xl bg-[#060c1a] border border-red-500/40 hover:border-red-400 cursor-pointer transition-all flex flex-col justify-between"
          >
            <span className="text-red-400 block text-xs">🚨 TRIAGE & GIS</span>
            <span className="text-red-300 font-bold block mt-1">4. PRIORITY-RANKED MAP</span>
            <span className="text-[9px] text-red-400/70 mt-0.5">P1/P2 Urgency + Map</span>
          </div>
          <div
            onClick={() => handleLaunchStep('/resource-matching')}
            className="p-2.5 rounded-xl bg-[#060c1a] border border-cyan-500/40 hover:border-cyan-400 cursor-pointer transition-all flex flex-col justify-between"
          >
            <span className="text-cyan-400 block text-xs">🚤 BEST MATCH</span>
            <span className="text-cyan-300 font-bold block mt-1">5. RESOURCE RECOMMENDATION</span>
            <span className="text-[9px] text-cyan-400/70 mt-0.5">Proximity & Equipment</span>
          </div>
          <div
            onClick={() => handleLaunchStep('/dispatch')}
            className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-400 font-extrabold text-emerald-300 hover:border-emerald-300 cursor-pointer transition-all flex flex-col justify-between"
          >
            <span className="text-emerald-400 block text-xs">📢 1-CLICK DISPATCH</span>
            <span className="text-white font-bold block mt-1">6. RESPONDER NOTIFICATION</span>
            <span className="text-[9px] text-emerald-300/80 mt-0.5">Live Tracking Active</span>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 7. START DEMO GUIDED FLOW MODAL                    */}
      {/* ================================================== */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-xl rounded-3xl border-cyan-500/50 p-6 shadow-2xl animate-in zoom-in-95 duration-200 bg-[#0c162e]">
            <div className="flex items-center justify-between pb-3 border-b border-[#1c315e]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-black">
                  <Play className="w-5 h-5 fill-black" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-cyan-300 block">
                    AI DISASTER COMMAND CENTER
                  </span>
                  <h3 className="text-lg font-extrabold text-white">
                    End-to-End User Journey Demo
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-[#080e1d] border border-[#1c315e] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              <p className="text-xs text-slate-300 font-medium">
                Execute the standard disaster response lifecycle from multiple raw inputs to verified responder dispatch:
              </p>

              <div className="space-y-2 font-mono text-xs">
                {/* Step 1 */}
                <div
                  onClick={() => handleLaunchStep('/reports')}
                  className="p-3 rounded-xl bg-[#081226] border border-blue-500/30 hover:border-blue-400 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <span className="text-blue-300 font-bold block">STEP 1: MULTIPLE DISASTER INFO SOURCES</span>
                    <span className="text-[11px] text-slate-400">Incoming feeds from emergency calls, citizen alerts, and satellite images.</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                </div>

                {/* Step 2 */}
                <div
                  onClick={() => handleLaunchStep('/fusion')}
                  className="p-3 rounded-xl bg-[#081226] border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <span className="text-cyan-300 font-bold block">STEP 2: AI PROCESSING</span>
                    <span className="text-[11px] text-slate-400">AI parses raw data, clusters duplicates, and extracts location & casualty details.</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </div>

                {/* Step 3 */}
                <div
                  onClick={() => handleLaunchStep('/fusion')}
                  className="p-3 rounded-xl bg-[#081226] border border-emerald-500/30 hover:border-emerald-400 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <span className="text-emerald-300 font-bold block">STEP 3: VERIFIED INCIDENT</span>
                    <span className="text-[11px] text-slate-400">Generates 1 high-confidence verified incident with trapped count & geo-bounds.</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </div>

                {/* Step 4 */}
                <div
                  onClick={() => handleLaunchStep('/priority')}
                  className="p-3 rounded-xl bg-[#081226] border border-red-500/30 hover:border-red-400 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <span className="text-red-300 font-bold block">STEP 4: PRIORITY-RANKED MAP</span>
                    <span className="text-[11px] text-slate-400">Triaged as P1 Critical and geo-located on the live situational map.</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-red-400" />
                </div>

                {/* Step 5 */}
                <div
                  onClick={() => handleLaunchStep('/resource-matching')}
                  className="p-3 rounded-xl bg-[#081226] border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <span className="text-cyan-300 font-bold block">STEP 5: RESOURCE RECOMMENDATION</span>
                    <span className="text-[11px] text-slate-400">AI recommends Boat #07 (98% match) with alternative safe levee route.</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </div>

                {/* Step 6 */}
                <div
                  onClick={() => handleLaunchStep('/dispatch')}
                  className="p-3 rounded-xl bg-[#081226] border border-emerald-500/30 hover:border-emerald-400 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <span className="text-emerald-300 font-bold block">STEP 6: RESPONDER NOTIFICATION</span>
                    <span className="text-[11px] text-slate-400">Human commander authorizes 1-click dispatch and initiates live GPS tracking.</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#1c315e] flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono italic">
                * Click any step above or start from beginning.
              </span>
              <button
                onClick={() => handleLaunchStep('/reports')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg cursor-pointer flex items-center gap-1.5"
              >
                <span>LAUNCH STEP 1: INFO SOURCES</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* 8. FOOTER TRANSPARENCY NOTICE                      */}
      {/* ================================================== */}
      <footer className="p-4 rounded-2xl bg-[#060b17]/90 border border-[#1c315e]/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <HelpCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span className="italic">
            "Demo / Prototype Mode — AI insights, incident data, and operational status may use simulated data."
          </span>
        </div>

        <div className="font-mono text-cyan-300 font-bold text-xs tracking-tight">
          "Many sources. One intelligent response."
        </div>
      </footer>
    </div>
  );
};
