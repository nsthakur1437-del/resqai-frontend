import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Mountain,
  Sparkles,
  ArrowRight,
  Play,
  Activity,
  AlertTriangle,
  Radio,
  MapPin,
  Ambulance,
  CheckCircle2,
  FileText,
  Cpu,
  Layers,
  ChevronRight,
  Zap,
  Clock,
  Eye,
  Building2,
  Users,
  LogIn,
  Check,
  X,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { soundFX } from '../utils/audio';

export const Landing = () => {
  const navigate = useNavigate();

  const handleNavigateCommandCenter = () => {
    soundFX.playClick();
    navigate('/dashboard');
  };

  const handleNavigateLogin = () => {
    soundFX.playClick();
    navigate('/login');
  };

  const handleNavigateDemo = () => {
    soundFX.playSuccess();
    navigate('/reports');
  };

  const scrollToWorkflow = () => {
    soundFX.playClick();
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050914] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      {/* Background Cinematic Gradients & Radar Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />
        {/* Ambient atmospheric glows */}
        <div className="absolute top-[-15%] left-[20%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-[35%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-red-500/08 rounded-full blur-[150px]" />
      </div>

      {/* ========================================================================= */}
      {/* 1. TOP NAVIGATION BAR                                                     */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#060b17]/85 border-b border-[#1c315e]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 shadow-lg shadow-cyan-500/25 ring-1 ring-cyan-400/40 group-hover:scale-105 transition-transform duration-200">
              <Shield className="w-6 h-6 text-white drop-shadow" />
              <Mountain className="w-3.5 h-3.5 text-cyan-200 absolute bottom-2 left-3 drop-shadow" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 ring-2 ring-[#060b17]" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-400 font-display">
                  ResQ<span className="text-cyan-400">AI</span>
                </span>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  v2.4
                </span>
              </div>
              <p className="text-xs text-cyan-300/80 font-medium tracking-tight italic">
                "Nature Warns. We Act."
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a
              href="#how-it-works"
              onClick={() => soundFX.playClick()}
              className="hover:text-cyan-300 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#why-resqai"
              onClick={() => soundFX.playClick()}
              className="hover:text-cyan-300 transition-colors"
            >
              Why ResQAI?
            </a>
            <a
              href="#demo-scenario"
              onClick={() => soundFX.playClick()}
              className="hover:text-cyan-300 transition-colors"
            >
              Bridge A Demo
            </a>
            <button
              onClick={() => {
                soundFX.playClick();
                navigate('/map');
              }}
              className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Live GIS</span>
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleNavigateLogin}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white bg-[#0d1730] border border-[#1c315e] hover:border-cyan-500/50 transition-all cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-cyan-400" />
              <span>Sign In</span>
            </button>

            <button
              onClick={handleNavigateCommandCenter}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-cyan-500/25 transition-all duration-200 active:scale-95 cursor-pointer ring-1 ring-cyan-300/40"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>ENTER COMMAND CENTER</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="relative z-10 pt-16 pb-20 lg:pt-24 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Top Operational Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold mb-8 shadow-inner animate-pulse">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>AI DISASTER COMMAND SYSTEM • ACTIVE PROTOTYPE</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-5xl mx-auto font-display">
          From Chaos to{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 drop-shadow-lg">
            Coordinated Rescue.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
          ResQAI uses AI to understand emergency reports, identify critical situations, and help authorities coordinate faster rescue responses.
        </p>

        {/* 10-Second Explainer Cards (Judge Clarity Strip) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 max-w-4xl mx-auto mt-10 text-left">
          <div className="glass-panel p-4 rounded-2xl border-cyan-500/25 bg-[#091224]/80">
            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
              WHAT IS RESQAI?
            </span>
            <p className="text-xs font-semibold text-white">
              An AI-powered disaster response & emergency coordination system.
            </p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border-orange-500/25 bg-[#091224]/80">
            <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-wider block mb-1">
              WHAT DOES IT DO?
            </span>
            <p className="text-xs font-semibold text-white">
              Converts chaotic emergency messages into prioritized rescue actions.
            </p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border-emerald-500/25 bg-[#091224]/80">
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              HOW DOES IT WORK?
            </span>
            <p className="text-xs font-semibold text-white">
              Report ➔ AI Analysis ➔ Priority ➔ Map ➔ Team ➔ Action.
            </p>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleNavigateCommandCenter}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 hover:from-red-400 hover:to-amber-400 text-white font-extrabold text-sm tracking-wider uppercase shadow-2xl shadow-red-500/30 flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-95 cursor-pointer ring-2 ring-red-400/50"
          >
            <AlertTriangle className="w-5 h-5 fill-white text-red-900" />
            <span>🚨 ENTER COMMAND CENTER</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={scrollToWorkflow}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#0d1933] hover:bg-[#132347] border border-[#243e75] hover:border-cyan-400/50 text-cyan-300 font-extrabold text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer shadow-lg"
          >
            <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            <span>▶ VIEW HOW IT WORKS</span>
          </button>
        </div>

        {/* Hero Interactive Radar Teaser */}
        <div className="mt-14 relative max-w-5xl mx-auto rounded-3xl p-1 bg-gradient-to-b from-cyan-500/30 via-[#1c315e]/40 to-transparent shadow-2xl">
          <div className="glass-panel rounded-[22px] p-6 sm:p-8 bg-[#091326]/95 border border-cyan-500/30 overflow-hidden relative">
            {/* Ambient radar sweep glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#1c315e]/70">
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <span className="text-xs font-mono font-extrabold text-red-400 uppercase tracking-widest">
                    LIVE FIELD SIMULATION
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  Active Emergency Scenario: Bridge A Inundation
                </h3>
              </div>

              <div className="flex items-center gap-3 self-start md:self-auto">
                <span className="text-xs font-mono px-3 py-1 rounded-lg bg-[#050914] text-cyan-300 border border-[#1c315e]">
                  GPS: 28.7041° N, 77.1025° E
                </span>
                <button
                  onClick={handleNavigateDemo}
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Launch Scenario</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 text-left">
              <div className="p-3.5 rounded-xl bg-[#060d1d] border border-[#16294f]">
                <span className="text-[10px] font-mono text-slate-400 block">AI Ingestion Speed</span>
                <div className="text-xl font-extrabold text-white mt-0.5 font-display">
                  &lt; 850 ms
                </div>
                <span className="text-[10px] text-cyan-400 font-mono">NLP Entity Extraction</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#060d1d] border border-[#16294f]">
                <span className="text-[10px] font-mono text-slate-400 block">AI Match Accuracy</span>
                <div className="text-xl font-extrabold text-emerald-400 mt-0.5 font-display">
                  98.4%
                </div>
                <span className="text-[10px] text-emerald-300/80 font-mono">Multi-factor Scoring</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#060d1d] border border-[#16294f]">
                <span className="text-[10px] font-mono text-slate-400 block">Avg Response Time</span>
                <div className="text-xl font-extrabold text-yellow-300 mt-0.5 font-display">
                  8 mins
                </div>
                <span className="text-[10px] text-yellow-300/80 font-mono">Fastest Route Calculation</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#060d1d] border border-[#16294f]">
                <span className="text-[10px] font-mono text-slate-400 block">Command Sync</span>
                <div className="text-xl font-extrabold text-cyan-300 mt-0.5 font-display">
                  100% Live
                </div>
                <span className="text-[10px] text-cyan-400 font-mono">GIS Telemetry</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PROJECT WORKFLOW ("How ResQAI Works")                                  */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1c315e]/50">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>SEAMLESS 6-STEP PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            How ResQAI Works
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            A clear, continuous workflow that transforms unstructured distress messages into life-saving rescue missions.
          </p>
        </div>

        {/* 6-Step Visual Chain Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* STEP 1: Multi-Source Inputs */}
          <div className="glass-panel p-5 rounded-2xl border-cyan-500/30 bg-[#091326] flex flex-col justify-between relative group hover:border-cyan-400 transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-2xl">
                📡
              </div>
              <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                STEP 01
              </div>
              <h3 className="text-sm font-bold text-white">Multi-Source Inputs</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Emergency calls, social media, citizen alerts, satellite/drones, field units & GPS data.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1c315e]/50 text-[10px] font-mono text-cyan-300">
              6 Disconnected Feeds
            </div>
          </div>

          {/* STEP 2: AI Processing */}
          <div className="glass-panel p-5 rounded-2xl border-blue-500/30 bg-[#091326] flex flex-col justify-between relative group hover:border-blue-400 transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-2xl">
                🤖
              </div>
              <div className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
                STEP 02
              </div>
              <h3 className="text-sm font-bold text-white">AI Processing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                INGEST → MERGE → VERIFY → PRIORITIZE → DISPATCH stages parse and deduplicate raw reports.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1c315e]/50 text-[10px] font-mono text-blue-300">
              5-Stage AI Engine
            </div>
          </div>

          {/* STEP 3: Verified Record */}
          <div className="glass-panel p-5 rounded-2xl border-emerald-500/30 bg-[#091326] flex flex-col justify-between relative group hover:border-emerald-400 transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-2xl">
                🔍
              </div>
              <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                STEP 03
              </div>
              <h3 className="text-sm font-bold text-white">Verified Record</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Creates 1 structured record with verified location, affected counts, and severity.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1c315e]/50 text-[10px] font-mono text-emerald-300">
              Structured & Verified
            </div>
          </div>

          {/* STEP 4: Priority Map */}
          <div className="glass-panel p-5 rounded-2xl border-red-500/30 bg-[#091326] flex flex-col justify-between relative group hover:border-red-400 transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-2xl">
                🚨
              </div>
              <div className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider">
                STEP 04
              </div>
              <h3 className="text-sm font-bold text-white">Priority Map</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Visualizes incidents ranked by priority (CRITICAL, HIGH, MEDIUM, LOW) on live GIS.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1c315e]/50 text-[10px] font-mono text-red-300">
              P1 Critical Urgency
            </div>
          </div>

          {/* STEP 5: Resource Match */}
          <div className="glass-panel p-5 rounded-2xl border-cyan-500/30 bg-[#091326] flex flex-col justify-between relative group hover:border-cyan-400 transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-2xl">
                🚤
              </div>
              <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                STEP 05
              </div>
              <h3 className="text-sm font-bold text-white">Resource Match</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                AI recommends nearest equipped unit (e.g. Boat #07, 1.2 km) with obstacle avoidance.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1c315e]/50 text-[10px] font-mono text-cyan-300">
              98% AI Match Score
            </div>
          </div>

          {/* STEP 6: Responder Alert */}
          <div className="glass-panel p-5 rounded-2xl border-teal-500/30 bg-[#091326] flex flex-col justify-between relative group hover:border-teal-400 transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-2xl">
                📢
              </div>
              <div className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-wider">
                STEP 06
              </div>
              <h3 className="text-sm font-bold text-white">Responder Alert</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Delivers immediate operational notifications to rescue units for rapid mobilization.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1c315e]/50 text-[10px] font-mono text-teal-300">
              Live Field Dispatch
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHY RESQAI? ("From Information to Action")                             */}
      {/* ========================================================================= */}
      <section id="why-resqai" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1c315e]/50">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SOLVING REAL-WORLD BOTTLENECKS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            From Information to Action
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            How ResQAI eliminates confusion during high-stress disaster response operations.
          </p>
        </div>

        {/* 4 Problem-Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Chaotic Reports -> AI Organization */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border-[#1c315e]/80 hover:border-cyan-500/40 transition-all bg-[#091326]/90 space-y-4">
            {/* Problem */}
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold flex-shrink-0">
                ❌
              </div>
              <div>
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-red-400 block">
                  CHAOTIC REPORTS
                </span>
                <p className="text-sm font-medium text-slate-200 mt-0.5">
                  Many emergency reports can create confusion and overwhelm dispatchers.
                </p>
              </div>
            </div>

            {/* Transition Indicator */}
            <div className="flex items-center justify-center">
              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1 font-bold">
                <span>↓ AI TRANSFORMATION</span>
              </span>
            </div>

            {/* Solution */}
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold flex-shrink-0">
                ✓
              </div>
              <div>
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-300 block">
                  AI ORGANIZATION
                </span>
                <p className="text-sm font-semibold text-white mt-0.5">
                  ResQAI extracts important information automatically into structured data.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Unclear Priorities -> Smart Prioritization */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border-[#1c315e]/80 hover:border-orange-500/40 transition-all bg-[#091326]/90 space-y-4">
            {/* Problem */}
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold flex-shrink-0">
                ❌
              </div>
              <div>
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-red-400 block">
                  UNCLEAR PRIORITIES
                </span>
                <p className="text-sm font-medium text-slate-200 mt-0.5">
                  Authorities may not know which emergency needs help first during peak distress.
                </p>
              </div>
            </div>

            {/* Transition Indicator */}
            <div className="flex items-center justify-center">
              <span className="text-xs font-mono text-orange-400 flex items-center gap-1 font-bold">
                <span>↓ SMART TRIAGE</span>
              </span>
            </div>

            {/* Solution */}
            <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-300 flex items-center justify-center font-bold flex-shrink-0">
                ✓
              </div>
              <div>
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-orange-300 block">
                  SMART PRIORITIZATION
                </span>
                <p className="text-sm font-semibold text-white mt-0.5">
                  AI identifies critical emergencies with trapped victims and severe injuries.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Scattered Resources -> One Intelligent Map */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border-[#1c315e]/80 hover:border-emerald-500/40 transition-all bg-[#091326]/90 space-y-4">
            {/* Problem */}
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold flex-shrink-0">
                ❌
              </div>
              <div>
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-red-400 block">
                  SCATTERED RESOURCES
                </span>
                <p className="text-sm font-medium text-slate-200 mt-0.5">
                  Rescue teams, shelters, and hospital capacities are difficult to coordinate.
                </p>
              </div>
            </div>

            {/* Transition Indicator */}
            <div className="flex items-center justify-center">
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-bold">
                <span>↓ GIS UNIFICATION</span>
              </span>
            </div>

            {/* Solution */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold flex-shrink-0">
                ✓
              </div>
              <div>
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-emerald-300 block">
                  ONE INTELLIGENT MAP
                </span>
                <p className="text-sm font-semibold text-white mt-0.5">
                  Incidents, road hazards, and available resources are visible together in real-time.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: Slow Decisions -> AI Recommendations */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border-[#1c315e]/80 hover:border-teal-500/40 transition-all bg-[#091326]/90 space-y-4">
            {/* Problem */}
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold flex-shrink-0">
                ❌
              </div>
              <div>
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-red-400 block">
                  SLOW DECISIONS
                </span>
                <p className="text-sm font-medium text-slate-200 mt-0.5">
                  Choosing the right rescue team with appropriate gear can take valuable time.
                </p>
              </div>
            </div>

            {/* Transition Indicator */}
            <div className="flex items-center justify-center">
              <span className="text-xs font-mono text-teal-400 flex items-center gap-1 font-bold">
                <span>↓ 1-CLICK MATCHING</span>
              </span>
            </div>

            {/* Solution */}
            <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold flex-shrink-0">
                ✓
              </div>
              <div>
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-teal-300 block">
                  AI RECOMMENDATIONS
                </span>
                <p className="text-sm font-semibold text-white mt-0.5">
                  ResQAI suggests the best available team using distance, readiness, and equipment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. DEMO INCIDENT SECTION ("See ResQAI in Action")                         */}
      {/* ========================================================================= */}
      <section id="demo-scenario" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1c315e]/50">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>CANONICAL HACKATHON DEMO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            See ResQAI in Action
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            Follow the exact Bridge A Flood scenario from initial SOS report to 8-minute team dispatch.
          </p>
        </div>

        {/* Interactive Scenario Card */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border-cyan-500/40 bg-gradient-to-br from-[#0c1833] via-[#091326] to-[#060b17] shadow-2xl relative overflow-hidden">
          {/* Subtle glow orb */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Scenario Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1c315e]/70">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono font-extrabold">
                  🔴 P1 CRITICAL
                </span>
                <span className="text-xs font-mono text-cyan-300 font-bold">
                  INCIDENT #101
                </span>
              </div>
              <h3 className="text-2xl font-black text-white mt-1">
                🚨 BRIDGE A FLOOD
              </h3>
              <p className="text-xs text-red-300 font-semibold mt-0.5">
                20 people trapped • 1 person seriously injured
              </p>
            </div>

            <button
              onClick={handleNavigateDemo}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-extrabold text-xs tracking-wider uppercase shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 cursor-pointer self-start sm:self-auto"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>START INTERACTIVE DEMO</span>
            </button>
          </div>

          {/* 3-Stage Live Simulation Walkthrough */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Stage 1: Incoming Emergency Report */}
            <div className="p-5 rounded-2xl bg-[#070e1d] border border-[#1c315e] flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                    <FileText className="w-3.5 h-3.5" />
                    INCOMING REPORT
                  </span>
                  <span>Citizen SOS</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#040813] border border-[#16294f] text-xs text-slate-200 italic leading-relaxed">
                  "20 people are trapped near Bridge A due to severe flooding. One person is seriously injured and requires immediate medical assistance."
                </div>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Source: Emergency Hotline Feed
              </div>
            </div>

            {/* Stage 2: AI Entity Extraction & Priority */}
            <div className="p-5 rounded-2xl bg-[#09152e] border border-cyan-500/40 flex flex-col justify-between space-y-4 shadow-lg">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-cyan-300 mb-2">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    🤖 AI DETECTS
                  </span>
                  <span className="text-emerald-400 font-bold">98.4% Confidence</span>
                </div>

                <div className="space-y-1.5 text-xs font-mono bg-[#040917] p-3.5 rounded-xl border border-cyan-500/20">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Disaster:</span>
                    <strong className="text-white">Flood</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Victims:</span>
                    <strong className="text-red-400 font-bold">20 People</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location:</span>
                    <strong className="text-cyan-300">Bridge A</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Priority:</span>
                    <strong className="text-red-400 font-bold">Critical (P1)</strong>
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-mono text-cyan-300 font-medium">
                ✓ Medical Help Flagged: Required
              </div>
            </div>

            {/* Stage 3: AI Rescue Recommendation */}
            <div className="p-5 rounded-2xl bg-[#071728] border border-emerald-500/40 flex flex-col justify-between space-y-4 shadow-lg">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-emerald-300 mb-2">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Ambulance className="w-3.5 h-3.5 text-emerald-400" />
                    🚑 AI RECOMMENDS
                  </span>
                  <span className="text-emerald-400 font-bold">Top Match</span>
                </div>

                <div className="space-y-1.5 text-xs font-mono bg-[#040c17] p-3.5 rounded-xl border border-emerald-500/20">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Assigned Team:</span>
                    <strong className="text-white">Rescue Team 3</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Distance:</span>
                    <strong className="text-cyan-300">2.1 km</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Required Gear:</span>
                    <strong className="text-emerald-300">Rescue Boat, First Aid</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Est. Response:</span>
                    <strong className="text-yellow-300 font-bold">8 minutes</strong>
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-mono text-emerald-300 font-medium">
                ✓ Match Score: 98% (Closest Available)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FINAL CALL TO ACTION                                                   */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center border-t border-[#1c315e]/50">
        <div className="glass-panel max-w-4xl mx-auto rounded-3xl p-8 sm:p-14 border-cyan-500/40 bg-gradient-to-b from-[#09152b] to-[#050914] shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
              Ready to Coordinate Faster Rescue?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Turn emergency information into intelligent action with ResQAI.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleNavigateCommandCenter}
                className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-sm tracking-wider uppercase shadow-2xl shadow-cyan-500/30 flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-95 cursor-pointer ring-2 ring-cyan-400/50"
              >
                <Zap className="w-5 h-5 fill-black" />
                <span>ENTER COMMAND CENTER</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={handleNavigateLogin}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#091224] hover:bg-[#0f1d3a] border border-[#1c315e] hover:border-cyan-400/50 text-slate-200 font-bold text-sm tracking-wide transition-all cursor-pointer"
              >
                <span>Sign In with Demo Credentials</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FOOTER                                                                 */}
      {/* ========================================================================= */}
      <footer className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1c315e]/40 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <Shield className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-white">ResQAI</span>
          <span>—</span>
          <span className="italic">"Nature Warns. We Act."</span>
        </div>

        <div className="flex items-center gap-6 font-mono text-[11px]">
          <span>AI DISASTER COMMAND CENTER</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            SYSTEMS OPERATIONAL
          </span>
        </div>
      </footer>
    </div>
  );
};
