import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  ShieldCheck,
  Upload,
  Image as ImageIcon,
  Check,
  RefreshCw,
  Zap,
  Info,
  Video,
  X,
  AlertCircle
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { soundFX } from '../utils/audio';

export const AiVision = () => {
  const navigate = useNavigate();
  const { addIncidentFromVision, addToast } = useDisaster();

  // State for File & Preview
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // State for Inference & Telemetry
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isAddedToMap, setIsAddedToMap] = useState(false);

  // Backend Connection Health State
  const [backendStatus, setBackendStatus] = useState('CHECKING'); // 'ONLINE' | 'OFFLINE' | 'CHECKING'
  const [modelStatus, setModelStatus] = useState('CHECKING'); // 'ACTIVE' | 'UNAVAILABLE' | 'CHECKING'

  // Canvas ref for Bounding Box rendering
  const imageElementRef = useRef(null);
  const canvasOverlayRef = useRef(null);

  const BACKEND_API = (import.meta.env.VITE_API_BASE_URL || 'https://resqai-backend-029v.onrender.com').replace(/\/$/, '');

  // -------------------------------------------------------------
  // Backend Connection Check (/health)
  // -------------------------------------------------------------
  const checkConnection = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_API}/health`, { method: 'GET' });
      if (response.ok) {
        const data = await response.json();
        setBackendStatus('ONLINE');
        setModelStatus(data.model === 'loaded' || data.model_status === 'ACTIVE' ? 'ACTIVE' : 'UNAVAILABLE');
      } else {
        setBackendStatus('OFFLINE');
        setModelStatus('UNAVAILABLE');
      }
    } catch {
      setBackendStatus('OFFLINE');
      setModelStatus('UNAVAILABLE');
    }
  }, []);

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 4000);
    return () => clearInterval(interval);
  }, [checkConnection]);

  // -------------------------------------------------------------
  // File Selection & Drag & Drop Handling
  // -------------------------------------------------------------
  const handleFileSelect = (file) => {
    if (!file) return;
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setImagePreviewUrl(objectUrl);
    setAnalysisResult(null);
    setErrorMessage(null);
    setIsAddedToMap(false);
    soundFX.playClick();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setImagePreviewUrl(null);
    setAnalysisResult(null);
    setErrorMessage(null);
    setIsAddedToMap(false);
  };

  // -------------------------------------------------------------
  // Draw Real Bounding Boxes on Overlay Canvas
  // -------------------------------------------------------------
  const renderBoundingBoxes = (detections, imgWidth, imgHeight) => {
    const canvas = canvasOverlayRef.current;
    const img = imageElementRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = img.clientWidth;
    canvas.height = img.clientHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!detections || detections.length === 0) return;

    const scaleX = canvas.width / imgWidth;
    const scaleY = canvas.height / imgHeight;

    detections.forEach((det) => {
      const { bbox, confidence, class: clsName } = det;
      const x1 = bbox.x1 * scaleX;
      const y1 = bbox.y1 * scaleY;
      const x2 = bbox.x2 * scaleX;
      const y2 = bbox.y2 * scaleY;
      const w = x2 - x1;
      const h = y2 - y1;

      const isHighRisk = confidence >= 0.75;
      const boxColor = isHighRisk ? '#ef4444' : '#f59e0b';

      // Draw bounding box
      ctx.strokeStyle = boxColor;
      ctx.lineWidth = 3;
      ctx.strokeRect(x1, y1, w, h);

      // Semi-transparent fill
      ctx.fillStyle = isHighRisk ? 'rgba(239, 68, 68, 0.25)' : 'rgba(245, 158, 11, 0.25)';
      ctx.fillRect(x1, y1, w, h);

      // Label Tag
      const labelText = `${(clsName || 'LANDSLIDE').toUpperCase()} ${(confidence * 100).toFixed(1)}%`;
      ctx.font = 'bold 12px monospace';
      const textWidth = ctx.measureText(labelText).width;

      const tagY = y1 >= 22 ? y1 - 22 : y1;
      ctx.fillStyle = isHighRisk ? '#dc2626' : '#d97706';
      ctx.fillRect(x1, tagY, textWidth + 12, 22);

      ctx.fillStyle = '#ffffff';
      ctx.fillText(labelText, x1 + 6, tagY + 15);
    });
  };

  // Re-render bounding boxes on window resize or when result changes
  useEffect(() => {
    if (analysisResult && analysisResult.detections && imageElementRef.current) {
      const img = imageElementRef.current;
      const w = analysisResult.image_size?.width || img.naturalWidth || 640;
      const h = analysisResult.image_size?.height || img.naturalHeight || 480;
      renderBoundingBoxes(analysisResult.detections, w, h);
    }
  }, [analysisResult]);

  // -------------------------------------------------------------
  // Analyze Image (POST /predict with FormData)
  // -------------------------------------------------------------
  const handleAnalyzeImage = async () => {
    if (!selectedFile) {
      addToast('No Image Selected', 'Please choose or drag an image to analyze.', 'info');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setErrorMessage(null);
    setIsAddedToMap(false);
    soundFX.playEmergencyAlert();

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(`${BACKEND_API}/predict`, {
        method: 'POST',
        body: formData
        // Content-Type is set automatically by the browser with boundary
      });

      if (!response.ok) {
        let errDetail = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errData = await response.json();
          if (errData.detail) errDetail = errData.detail;
          else if (errData.error) errDetail = errData.error;
        } catch {
          // ignore
        }
        throw new Error(errDetail);
      }

      const data = await response.json();
      setAnalysisResult(data);
      soundFX.playAiChime();

      if (data.total_detections > 0) {
        addToast(
          'Landslide Hazard Detected',
          `YOLO11 identified ${data.total_detections} detection zone(s) with ${Math.round((data.max_confidence || 0) * 100)}% confidence.`,
          'critical'
        );
      } else {
        addToast('Analysis Complete', 'No landslide detected in uploaded image.', 'info');
      }
    } catch (err) {
      console.error('Inference error:', err);
      if (backendStatus === 'OFFLINE') {
        setErrorMessage('Backend server is not connected. Please start the AI prediction server.');
      } else {
        setErrorMessage(`Model inference error: ${err.message}`);
      }
      addToast('Prediction Failed', 'Could not obtain real prediction from YOLO11 backend.', 'critical');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // -------------------------------------------------------------
  // Add to Live Disaster Map
  // -------------------------------------------------------------
  const handleAddToMap = () => {
    if (!analysisResult) return;
    setIsAddedToMap(true);
    const count = analysisResult.total_detections || 1;
    addIncidentFromVision({
      zone: `Upload: ${selectedFile?.name || 'Image'} Landslide Zone`,
      floodedArea: analysisResult.risk_level === 'HIGH' ? '35% Slope Area' : '15% Slope Area',
      blockedRoads: count,
      buildings: count * 2
    });
    soundFX.playSuccess();
  };

  // Compute stats from real result
  const isDetectionPresent = analysisResult && analysisResult.total_detections > 0;
  const detectedClassName = analysisResult?.detections?.[0]?.class || (isDetectionPresent ? 'landslide' : 'None');
  const confidencePercent = analysisResult ? Math.round((analysisResult.max_confidence || 0) * 100) : 0;
  const numDetections = analysisResult ? analysisResult.total_detections : 0;
  const riskLevel = analysisResult ? analysisResult.risk_level : 'LOW';

  return (
    <div className="space-y-7 pb-12 max-w-[1400px] mx-auto">
      {/* ================================================== */}
      {/* 1. PAGE HEADER & CONNECTION INDICATORS              */}
      {/* ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#1c315e]/70">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 via-cyan-500 to-teal-500 text-black shadow-lg shadow-cyan-500/20">
                <Eye className="w-6 h-6" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-300">
                AI VISION ANALYSIS
              </span>
            </h1>

            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              YOLO11 best.pt
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real YOLO11 landslide inference on aerial, UAV, and satellite imagery.
          </p>
        </div>

        {/* Live Backend & Model Connection Telemetry */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold ${
            backendStatus === 'ONLINE' ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-red-500/10 border-red-500/40 text-red-400'
          }`}>
            <span className={`w-2 h-2 rounded-full ${backendStatus === 'ONLINE' ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
            <span>Backend: {backendStatus}</span>
          </div>

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold ${
            modelStatus === 'ACTIVE' ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300' : 'bg-slate-800 border-slate-700 text-slate-400'
          }`}>
            <Cpu className="w-3.5 h-3.5" />
            <span>Model: {modelStatus}</span>
          </div>

          <button
            onClick={() => navigate('/monitoring')}
            className="py-1.5 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Live Camera</span>
          </button>
        </div>
      </div>

      {/* ================================================== */}
      {/* 2. IMAGE UPLOAD & INFERENCE CONTROL               */}
      {/* ================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upload Dropzone (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-5 rounded-3xl border-[#1c315e]/80 shadow-xl space-y-4 bg-[#080e1d]/90">
            <div>
              <h2 className="text-sm font-extrabold text-white tracking-tight">
                Upload Disaster Image
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                "Upload a satellite, drone, or disaster image for YOLO11 analysis."
              </p>
            </div>

            {/* Drag and Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-6 bg-[#060c18] flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                isDragOver ? 'border-cyan-400 bg-cyan-500/10 scale-99' : 'border-cyan-500/40 hover:border-cyan-400'
              }`}
            >
              <input
                type="file"
                id="file-upload-input"
                onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                className="hidden"
                accept="image/*"
              />
              <label htmlFor="file-upload-input" className="cursor-pointer w-full flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-300 flex items-center justify-center mb-2 transition-all">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-white block">
                  {selectedFile ? selectedFile.name : 'Click to upload or drag and drop image'}
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Supports JPG, PNG, WEBP, TIFF (e.g. PIC 1.jpeg)
                </span>
                <span className="mt-3 px-3 py-1 rounded-lg bg-[#0d152a] text-cyan-300 text-[11px] font-bold border border-[#1c315e] hover:border-cyan-400">
                  [ CHOOSE IMAGE ]
                </span>
              </label>

              {selectedFile && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearSelection();
                  }}
                  className="mt-2 text-[10px] font-mono text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Remove image
                </button>
              )}
            </div>

            {/* ANALYZE IMAGE BUTTON */}
            <button
              onClick={handleAnalyzeImage}
              disabled={isAnalyzing || !selectedFile}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-500 via-cyan-500 to-teal-500 hover:from-indigo-400 hover:to-teal-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Cpu className={`w-4 h-4 fill-black ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'Analyzing image with AI model...' : 'ANALYZE IMAGE'}</span>
            </button>
          </div>
        </div>

        {/* Live Visual Preview & Bounding Box Viewport (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-5 rounded-3xl border-indigo-500/40 shadow-2xl h-full flex flex-col justify-between bg-gradient-to-b from-[#0e1733] via-[#091224] to-[#070e1c]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#1c315e]">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold text-white tracking-tight">
                      IMAGE PREVIEW & YOLO11 OVERLAY
                    </h2>
                    <span className="text-[11px] text-cyan-300 font-mono">
                      {selectedFile ? selectedFile.name : 'Awaiting image selection'}
                    </span>
                  </div>
                </div>

                {analysisResult && (
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    ✓ INFERENCE COMPLETE
                  </span>
                )}
              </div>

              {/* Viewport Preview Area */}
              <div className="relative mt-4 h-64 sm:h-72 rounded-2xl overflow-hidden bg-black border border-[#1c315e] flex items-center justify-center shadow-inner">
                {imagePreviewUrl ? (
                  <>
                    <img
                      ref={imageElementRef}
                      src={imagePreviewUrl}
                      alt="Selected target"
                      className="w-full h-full object-contain"
                    />
                    <canvas
                      ref={canvasOverlayRef}
                      className="absolute inset-0 w-full h-full pointer-events-none"
                    />
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-6 text-slate-500">
                    <ImageIcon className="w-10 h-10 mb-2 opacity-40" />
                    <span className="text-xs font-mono">No image loaded</span>
                    <span className="text-[10px] text-slate-600 mt-0.5">Select an image on the left to preview</span>
                  </div>
                )}

                {/* Loading state animation */}
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center text-center gap-3 z-20">
                    <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-spin">
                      <Cpu className="w-8 h-8" />
                    </div>
                    <span className="text-sm font-bold text-white font-mono animate-pulse">
                      Analyzing image with AI model...
                    </span>
                    <span className="text-xs text-cyan-300 font-mono">
                      Executing YOLO11 best.pt forward pass
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="mt-4 p-3.5 rounded-2xl bg-red-950/40 border border-red-500/60 text-red-300 flex items-center gap-3 text-xs">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                <div>
                  <strong className="block font-bold">Inference Error</strong>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* 3. REAL RESULT UI CARDS (Displayed After Inference) */}
      {/* ================================================== */}
      {analysisResult && (
        <section className="space-y-4 animate-in fade-in-50 duration-300">
          {/* Main Status Hero Card */}
          <div className={`glass-panel p-6 rounded-3xl border shadow-2xl transition-all ${
            isDetectionPresent
              ? 'border-red-500/60 bg-gradient-to-r from-red-950/40 via-[#0d162d] to-red-950/40'
              : 'border-emerald-500/60 bg-gradient-to-r from-emerald-950/40 via-[#0d162d] to-emerald-950/40'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className={`p-3.5 rounded-2xl border ${
                  isDetectionPresent ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                }`}>
                  {isDetectionPresent ? <ShieldAlert className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-slate-400 block">
                    DETECTION STATUS:
                  </span>
                  <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${
                    isDetectionPresent ? 'text-red-300' : 'text-emerald-300'
                  }`}>
                    {isDetectionPresent ? '⚠ LANDSLIDE DETECTED' : 'NO LANDSLIDE DETECTED'}
                  </h2>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {isDetectionPresent
                      ? `YOLO11 best.pt identified ${numDetections} landslide zone(s) with ${confidencePercent}% confidence.`
                      : 'The uploaded image does not contain a detected landslide.'}
                  </p>
                </div>
              </div>

              {/* Confidence & Risk Level Right Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Confidence</span>
                  <strong className="text-xl font-mono font-extrabold text-cyan-300">
                    {confidencePercent}%
                  </strong>
                </div>

                <div className="text-right border-l border-[#1c315e] pl-3">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Risk Level</span>
                  <strong className={`text-xl font-mono font-extrabold uppercase ${
                    riskLevel === 'HIGH' ? 'text-red-400' : riskLevel === 'MEDIUM' ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {riskLevel}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* 5 Distinct Spec Telemetry Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Card 1: Detection Status */}
            <div className="glass-panel p-4 rounded-2xl border-[#1c315e]/80 bg-[#081226]/80">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
                STATUS
              </span>
              <strong className={`text-sm font-extrabold mt-1 block ${
                isDetectionPresent ? 'text-red-400' : 'text-emerald-400'
              }`}>
                {isDetectionPresent ? 'LANDSLIDE DETECTED' : 'NO LANDSLIDE DETECTED'}
              </strong>
            </div>

            {/* Card 2: Detected Class */}
            <div className="glass-panel p-4 rounded-2xl border-[#1c315e]/80 bg-[#081226]/80">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
                DETECTED CLASS
              </span>
              <strong className="text-base font-extrabold text-white mt-1 block font-mono uppercase">
                {detectedClassName}
              </strong>
            </div>

            {/* Card 3: Confidence Percentage */}
            <div className="glass-panel p-4 rounded-2xl border-[#1c315e]/80 bg-[#081226]/80">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
                CONFIDENCE SCORE
              </span>
              <strong className="text-base font-extrabold text-cyan-300 mt-1 block font-mono">
                {confidencePercent}%
              </strong>
            </div>

            {/* Card 4: Number of Detections */}
            <div className="glass-panel p-4 rounded-2xl border-[#1c315e]/80 bg-[#081226]/80">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
                NUMBER OF DETECTIONS
              </span>
              <strong className="text-base font-extrabold text-amber-300 mt-1 block font-mono">
                {numDetections}
              </strong>
            </div>

            {/* Card 5: Risk Level */}
            <div className={`glass-panel p-4 rounded-2xl border ${
              riskLevel === 'HIGH' ? 'border-red-500/50 bg-red-950/20' : riskLevel === 'MEDIUM' ? 'border-amber-500/50 bg-amber-950/20' : 'border-emerald-500/50 bg-emerald-950/20'
            }`}>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
                RISK LEVEL
              </span>
              <strong className={`text-base font-extrabold mt-1 block font-mono uppercase ${
                riskLevel === 'HIGH' ? 'text-red-400' : riskLevel === 'MEDIUM' ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {riskLevel}
              </strong>
            </div>
          </div>

          {/* Detections Coordinates Breakdown */}
          {analysisResult.detections && analysisResult.detections.length > 0 && (
            <div className="glass-panel p-5 rounded-3xl border-[#1c315e]/80 bg-[#081226]/80 space-y-3">
              <span className="text-xs font-mono font-bold text-slate-300 block uppercase">
                Bounding Box Telemetry:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {analysisResult.detections.map((d, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#060c18] border border-cyan-500/20 flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-cyan-300 font-bold block">Zone #{i + 1}: {d.class.toUpperCase()}</span>
                      <span className="text-slate-400 text-[11px]">
                        [{d.bbox.x1}, {d.bbox.y1}] → [{d.bbox.x2}, {d.bbox.y2}]
                      </span>
                    </div>
                    <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                      {Math.round(d.confidence * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Trigger Card */}
          <div className="glass-panel p-6 rounded-3xl border-cyan-500/40 shadow-2xl bg-gradient-to-r from-[#0c1836] via-[#091326] to-[#0c1836] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-extrabold text-white">GIS Command Center Synchronization</h3>
              <p className="text-xs text-slate-300">
                Log the verified YOLO11 landslide coordinates to ResQAI's active disaster map.
              </p>
            </div>

            <div className="w-full sm:w-auto">
              {isAddedToMap ? (
                <div className="p-3 px-6 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 flex items-center gap-2 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>LOGGED TO LIVE MAP</span>
                </div>
              ) : (
                <button
                  onClick={handleAddToMap}
                  disabled={!isDetectionPresent}
                  className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <MapPin className="w-4 h-4 fill-black" />
                  <span>ADD TO DISASTER MAP</span>
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
