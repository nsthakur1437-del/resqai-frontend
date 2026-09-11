import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Eye,
  Sparkles,
  Layers,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Radio,
  Sliders,
  Scan,
  Compass,
  ArrowRight,
  ShieldAlert,
  Upload,
  Image as ImageIcon,
  Check,
  RefreshCw,
  Zap,
  Info,
  Layers as LayersIcon
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { soundFX } from '../utils/audio';

// Sample scenarios matching exact prompt specifications
const scenarios = [
  {
    id: 'flood',
    title: '🌊 Flood Detection',
    inputType: 'Satellite Image',
    disaster: 'Flood',
    affectedArea: '42%',
    blockedRoads: 3,
    buildings: 18,
    risk: 'HIGH',
    riskColor: 'text-red-400 bg-red-500/20 border-red-500/40',
    insightText: 'Large-scale flooding detected near River Valley.',
    maskColor: '#06b6d4',
    maskLabel: 'AI-IDENTIFIED FLOODED AREA',
    svgWaterPath: 'M-50,260 Q180,90 420,200 T900,140'
  },
  {
    id: 'landslide',
    title: '⛰️ Landslide Detection',
    inputType: 'Drone Image',
    disaster: 'Landslide',
    affectedArea: '28%',
    blockedRoads: 1,
    buildings: 4,
    risk: 'CRITICAL',
    riskColor: 'text-red-400 bg-red-500/20 border-red-500/40',
    insightText: 'Massive slope collapse blocking Mountain Road sector.',
    maskColor: '#f97316',
    maskLabel: 'AI-IDENTIFIED DEBRIS FLOW ZONE',
    svgWaterPath: 'M100,0 Q300,200 450,450 T700,500'
  },
  {
    id: 'storm',
    title: '🌧️ Storm Damage',
    inputType: 'Aerial Image',
    disaster: 'Storm Damage',
    affectedArea: '19%',
    blockedRoads: 2,
    buildings: 12,
    risk: 'MODERATE',
    riskColor: 'text-amber-400 bg-amber-500/20 border-amber-500/40',
    insightText: 'High wind structural damage and roof displacement.',
    maskColor: '#eab308',
    maskLabel: 'AI-IDENTIFIED STRUCTURAL DAMAGE',
    svgWaterPath: 'M0,150 Q250,300 500,180 T900,280'
  }
];

export const AiVision = () => {
  const navigate = useNavigate();
  const { addIncidentFromVision } = useDisaster();

  const [selectedScenarioId, setSelectedScenarioId] = useState('flood');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(true);
  const [isAddedToMap, setIsAddedToMap] = useState(false);
  const [customUploadedFileName, setCustomUploadedFileName] = useState(null);

  const activeScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  // ANALYZE IMAGE INTERACTION
  const handleAnalyzeImage = () => {
    setIsAnalyzing(true);
    setIsAnalysisComplete(false);
    setIsAddedToMap(false);
    setAnalysisStep(1);
    soundFX.playEmergencyAlert();

    setTimeout(() => setAnalysisStep(2), 500);
    setTimeout(() => setAnalysisStep(3), 1000);
    setTimeout(() => setAnalysisStep(4), 1400);

    setTimeout(() => {
      setIsAnalyzing(false);
      setIsAnalysisComplete(true);
      soundFX.playAiChime();
    }, 1800);
  };

  // ADD TO MAP INTERACTION
  const handleAddToMap = () => {
    setIsAddedToMap(true);
    addIncidentFromVision({
      zone: activeScenario.disaster + ' Impact Zone',
      floodedArea: activeScenario.affectedArea,
      blockedRoads: activeScenario.blockedRoads,
      buildings: activeScenario.buildings
    });
    soundFX.playSuccess();
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCustomUploadedFileName(e.target.files[0].name);
      soundFX.playClick();
    }
  };

  return (
    <div className="space-y-7 pb-12 max-w-[1400px] mx-auto">
      {/* ================================================== */}
      {/* 1. PAGE HEADER                                     */}
      {/* ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1c315e]/60">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <Eye className="w-6 h-6 text-indigo-400" />
              <span>AI Vision Analysis</span>
            </h1>

            {/* AI Vision Prototype Badge */}
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              AI VISION PROTOTYPE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            "AI-powered disaster assessment using satellite and drone imagery."
          </p>
        </div>

        {/* Prototype Notice Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono self-start sm:self-auto">
          <Info className="w-3.5 h-3.5" />
          <span>Demo AI analysis using simulated results</span>
        </div>
      </div>

      {/* ================================================== */}
      {/* 2. THREE-STEP WORKFLOW CARDS (Step 1 -> 2 -> 3)    */}
      {/* ================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* STEP 1: IMAGE INPUT */}
        <div className="glass-panel p-4 rounded-2xl border-cyan-500/30 flex items-center gap-3 bg-[#081226]/80">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center font-bold text-sm">
            01
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
              STEP 1
            </span>
            <strong className="text-white text-xs block">IMAGE INPUT</strong>
            <span className="text-[10px] text-slate-400">Satellite & drone feed</span>
          </div>
        </div>

        {/* STEP 2: AI ANALYSIS */}
        <div className="glass-panel p-4 rounded-2xl border-indigo-500/30 flex items-center gap-3 bg-[#0c132e]/80">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-bold text-sm">
            02
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
              STEP 2
            </span>
            <strong className="text-indigo-300 text-xs block">AI ANALYSIS</strong>
            <span className="text-[10px] text-slate-400">Segmentation & detection</span>
          </div>
        </div>

        {/* STEP 3: DISASTER INSIGHT */}
        <div className="glass-panel p-4 rounded-2xl border-emerald-500/30 flex items-center gap-3 bg-[#081822]/80">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center font-bold text-sm">
            03
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
              STEP 3
            </span>
            <strong className="text-emerald-300 text-xs block">DISASTER INSIGHT</strong>
            <span className="text-[10px] text-slate-400">Add to Disaster Map</span>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* 3. STEP 1 & 2: IMAGE INPUT & AI PROCESSING         */}
      {/* ================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* STEP 1: Upload & Scenario Selection (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border-[#1c315e]/80 shadow-xl space-y-4">
            <div>
              <h2 className="text-sm font-extrabold text-white tracking-tight">
                Upload Disaster Image
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                "Upload a satellite, drone, or disaster image."
              </p>
            </div>

            {/* Drag and Drop Area */}
            <label className="border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 rounded-2xl p-6 bg-[#080e1d] flex flex-col items-center justify-center text-center cursor-pointer transition-all group">
              <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*" />
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 group-hover:bg-cyan-500/20 text-cyan-300 flex items-center justify-center mb-2 transition-all">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-white block">
                {customUploadedFileName || 'Drop image here or browse'}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Supports Sentinel GeoTIFF, JPG, PNG from UAVs
              </span>
              <span className="mt-3 px-3 py-1 rounded-lg bg-[#0d152a] text-cyan-300 text-[11px] font-bold border border-[#1c315e] group-hover:border-cyan-400">
                [ CHOOSE IMAGE ]
              </span>
            </label>

            {/* Sample Image Options */}
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                OR SELECT SAMPLE SCENARIO:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {scenarios.map((sc) => {
                  const isSelected = sc.id === selectedScenarioId;
                  return (
                    <button
                      key={sc.id}
                      onClick={() => {
                        setSelectedScenarioId(sc.id);
                        setCustomUploadedFileName(null);
                        setIsAddedToMap(false);
                        soundFX.playClick();
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-400 ring-1 ring-cyan-500/50 shadow-md'
                          : 'bg-[#080e1d] border-[#1c315e] text-slate-300 hover:text-white'
                      }`}
                    >
                      <span className="text-xs font-bold block">{sc.title}</span>
                      <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                        {sc.inputType}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ANALYZE BUTTON */}
            <button
              onClick={handleAnalyzeImage}
              disabled={isAnalyzing}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-500 via-cyan-500 to-teal-500 hover:from-indigo-400 hover:to-teal-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
            >
              <Cpu className={`w-4 h-4 fill-black ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'AI ANALYZING IMAGE...' : 'ANALYZE IMAGE'}</span>
            </button>
          </div>
        </div>

        {/* STEP 2: Realistic AI Analysis Pipeline Animation (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-5 rounded-2xl border-indigo-500/40 shadow-2xl h-full flex flex-col justify-between bg-gradient-to-b from-[#0e1733] via-[#091224] to-[#070e1c]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#1c315e]">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    <Cpu className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold text-white tracking-tight">
                      🤖 AI ANALYSIS
                    </h2>
                    <span className="text-[11px] text-cyan-300 font-mono">
                      Convolutional U-Net Segmentation Engine
                    </span>
                  </div>
                </div>

                {isAnalysisComplete && !isAnalyzing && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    ✓ ANALYSIS COMPLETE
                  </span>
                )}
              </div>

              {/* Live Processing Checkpoints */}
              <div className="mt-4 space-y-2 text-xs font-mono">
                <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                  analysisStep >= 1 || isAnalysisComplete
                    ? 'bg-[#081822] border-emerald-500/40 text-emerald-300'
                    : 'bg-[#080e1d] border-[#1c315e] text-slate-500'
                }`}>
                  <span className="font-bold">✓</span>
                  <span>Detecting disaster type ({activeScenario.disaster})</span>
                </div>

                <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                  analysisStep >= 2 || isAnalysisComplete
                    ? 'bg-[#081822] border-emerald-500/40 text-emerald-300'
                    : 'bg-[#080e1d] border-[#1c315e] text-slate-500'
                }`}>
                  <span className="font-bold">✓</span>
                  <span>Identifying affected areas ({activeScenario.affectedArea} surface coverage)</span>
                </div>

                <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                  analysisStep >= 3 || isAnalysisComplete
                    ? 'bg-[#081822] border-emerald-500/40 text-emerald-300'
                    : 'bg-[#080e1d] border-[#1c315e] text-slate-500'
                }`}>
                  <span className="font-bold">✓</span>
                  <span>Detecting damaged infrastructure ({activeScenario.blockedRoads} roads, {activeScenario.buildings} buildings)</span>
                </div>

                <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                  analysisStep >= 4 || isAnalysisComplete
                    ? 'bg-[#081822] border-emerald-500/40 text-emerald-300'
                    : 'bg-[#080e1d] border-[#1c315e] text-slate-500'
                }`}>
                  <span className="font-bold">✓</span>
                  <span>Estimating risk level ({activeScenario.risk})</span>
                </div>
              </div>
            </div>

            {/* Disclosure Notice */}
            <div className="mt-4 p-3 rounded-xl bg-[#080e1d] border border-[#1c315e] flex items-center gap-2 text-xs text-slate-400">
              <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span className="text-[11px] italic">
                "Demo AI analysis using simulated results."
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* 4. STEP 3: AI RESULTS (4 Clean Metric Cards)        */}
      {/* ================================================== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Card 1: 🌊 DISASTER DETECTED */}
        <div className="glass-panel p-4 rounded-2xl border-[#1c315e]/70">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
            🌊 DISASTER DETECTED
          </span>
          <strong className="text-base font-extrabold text-white mt-1 block">
            {activeScenario.disaster}
          </strong>
        </div>

        {/* Card 2: 📊 AFFECTED AREA */}
        <div className="glass-panel p-4 rounded-2xl border-[#1c315e]/70">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
            📊 AFFECTED AREA
          </span>
          <strong className="text-base font-extrabold text-cyan-300 mt-1 block font-mono">
            {activeScenario.affectedArea}
          </strong>
        </div>

        {/* Card 3: 🚧 BLOCKED ROADS */}
        <div className="glass-panel p-4 rounded-2xl border-[#1c315e]/70">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
            🚧 BLOCKED ROADS
          </span>
          <strong className="text-base font-extrabold text-amber-300 mt-1 block font-mono">
            {activeScenario.blockedRoads}
          </strong>
        </div>

        {/* Card 4: 🏠 AFFECTED BUILDINGS */}
        <div className="glass-panel p-4 rounded-2xl border-[#1c315e]/70">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
            🏠 AFFECTED BUILDINGS
          </span>
          <strong className="text-base font-extrabold text-red-300 mt-1 block font-mono">
            {activeScenario.buildings}
          </strong>
        </div>

        {/* Card 5: ⚠️ RISK LEVEL */}
        <div className="glass-panel p-4 rounded-2xl border-red-500/40">
          <span className="text-[10px] font-mono font-bold uppercase text-red-400 block">
            ⚠️ RISK LEVEL
          </span>
          <strong className="text-base font-extrabold text-red-300 mt-1 block font-mono uppercase">
            {activeScenario.risk}
          </strong>
        </div>
      </section>

      {/* ================================================== */}
      {/* 5. BEFORE AND AFTER ANALYSIS (Visual Comparison)   */}
      {/* ================================================== */}
      <section className="glass-panel p-6 rounded-3xl border-cyan-500/30 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#1c315e]">
          <div>
            <h2 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Before & After Visual Segmentation Analysis
            </h2>
            <p className="text-xs text-slate-400">
              Raw optical satellite capture vs AI-extracted damage mask
            </p>
          </div>
          <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
            Split Comparison
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* LEFT: ORIGINAL IMAGE */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 block">
              ORIGINAL IMAGE (Satellite / Drone Image)
            </span>
            <div className="relative h-64 rounded-2xl overflow-hidden border border-[#1c315e] bg-gradient-to-tr from-[#0a1628] to-[#122344] flex items-center justify-center shadow-inner">
              {/* Synthetic Terrain */}
              <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                <path d="M-20,200 Q200,80 400,180 T800,120" fill="none" stroke="#25426e" strokeWidth="35" />
                <path d="M250,100 Q350,220 500,280" fill="none" stroke="#1c3355" strokeWidth="20" />
              </svg>
              <div className="absolute top-3 left-3 bg-black/70 px-2.5 py-1 rounded text-[10px] font-mono text-slate-300 border border-[#1c315e]">
                RAW OPTICAL SATELLITE
              </div>
            </div>
          </div>

          {/* RIGHT: AI ANALYSIS RESULT */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-300 block">
              AI ANALYSIS RESULT ({activeScenario.maskLabel})
            </span>
            <div className="relative h-64 rounded-2xl overflow-hidden border border-cyan-500/40 bg-gradient-to-tr from-[#0a1628] to-[#122344] flex items-center justify-center shadow-inner">
              {/* Synthetic Terrain with Glowing AI Mask */}
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M-20,200 Q200,80 400,180 T800,120"
                  fill="none"
                  stroke={activeScenario.maskColor}
                  strokeWidth="50"
                  className="animate-pulse opacity-80"
                />
                <path
                  d="M250,100 Q350,220 500,280"
                  fill="none"
                  stroke={activeScenario.maskColor}
                  strokeWidth="30"
                  className="animate-pulse opacity-70"
                />
              </svg>

              {/* Overlay Pins */}
              <div className="absolute top-20 right-28 bg-red-500/40 border border-red-400 px-2 py-1 rounded text-[10px] font-mono text-red-100 animate-pulse">
                🔴 {activeScenario.buildings} Buildings Impacted
              </div>
              <div className="absolute bottom-16 left-24 bg-amber-500/40 border border-amber-400 px-2 py-1 rounded text-[10px] font-mono text-amber-100 animate-pulse">
                ⚠️ {activeScenario.blockedRoads} Roads Severed
              </div>

              <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 rounded text-[10px] font-mono text-cyan-300 border border-cyan-500/40">
                {activeScenario.maskLabel}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 6. AI INSIGHT & ADD TO MAP (Hero Callout)          */}
      {/* ================================================== */}
      <section className="glass-panel p-6 rounded-3xl border-cyan-500/40 shadow-2xl bg-gradient-to-r from-[#0c1836] via-[#091326] to-[#0c1836]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-white tracking-tight">
                🤖 AI INSIGHT
              </h3>
            </div>

            <p className="text-sm font-bold text-white leading-snug">
              "{activeScenario.insightText}"
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs font-mono text-slate-300">
              <div>Affected Area: <strong className="text-cyan-300">{activeScenario.affectedArea}</strong></div>
              <div>Road Blockages: <strong className="text-amber-300">{activeScenario.blockedRoads}</strong></div>
              <div>Buildings: <strong className="text-red-300">{activeScenario.buildings}</strong></div>
              <div>Risk: <strong className="text-red-400">🔴 {activeScenario.risk}</strong></div>
            </div>

            <p className="text-xs text-slate-400 pt-1">
              <strong>RECOMMENDED ACTION:</strong> "Add incident to Disaster Map and alert nearby rescue teams."
            </p>
          </div>

          {/* ADD TO MAP ACTION */}
          <div className="w-full lg:w-72 flex-shrink-0">
            {isAddedToMap ? (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 flex flex-col items-center text-center gap-1.5 shadow-xl animate-in zoom-in-95 duration-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                <span className="font-extrabold text-xs text-white">
                  ✓ INCIDENT ADDED TO LIVE MAP
                </span>
                <span className="text-[10px] text-emerald-300 font-mono">
                  Coordinates plotted on GIS Grid
                </span>
              </div>
            ) : (
              <button
                onClick={handleAddToMap}
                className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-2xl flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <MapPin className="w-4 h-4 fill-black" />
                <span>ADD TO DISASTER MAP</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 7. AI VISION WORKFLOW (Bottom Chain)               */}
      {/* ================================================== */}
      <section className="glass-panel p-4 rounded-2xl border-[#1c315e]/70 bg-gradient-to-r from-[#091224] via-[#0b162f] to-[#091224]">
        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
          AI VISION WORKFLOW:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
            <span className="font-bold text-white block">🖼️ IMAGE</span>
            <span className="text-[10px] text-slate-400">Satellite / Drone</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-cyan-500/30">
            <span className="font-bold text-cyan-300 block">🤖 AI VISION</span>
            <span className="text-[10px] text-slate-400">U-Net Segmentation</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
            <span className="font-bold text-white block">🔍 DISASTER DETECTED</span>
            <span className="text-[10px] text-slate-400">Flood / Landslide</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-[#1c315e]">
            <span className="font-bold text-white block">📊 DAMAGE ASSESSMENT</span>
            <span className="text-[10px] text-slate-400">Surface % & Roads</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-emerald-500/30">
            <span className="font-bold text-emerald-300 block">🗺️ ADD TO MAP</span>
            <span className="text-[10px] text-slate-400">GIS Layer Sync</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#080e1d] border border-teal-500/30">
            <span className="font-bold text-teal-300 block">🚑 RESCUE RESPONSE</span>
            <span className="text-[10px] text-slate-400">Field Dispatch</span>
          </div>
        </div>
      </section>
    </div>
  );
};
