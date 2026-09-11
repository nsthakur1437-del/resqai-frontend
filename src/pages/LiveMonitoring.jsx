import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Video,
  VideoOff,
  Radio,
  Cpu,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  Activity,
  Zap,
  Clock,
  MapPin,
  Sparkles,
  RefreshCw,
  Sliders,
  Maximize2,
  Volume2,
  VolumeX,
  Layers,
  ArrowRight,
  Eye,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { soundFX } from '../utils/audio';

export const LiveMonitoring = () => {
  const navigate = useNavigate();
  const { addToast, addIncidentFromVision } = useDisaster();

  // Stream & Monitoring State
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [streamMode, setStreamMode] = useState('webcam'); // 'webcam' | 'backend'
  const [cameraStatus, setCameraStatus] = useState('OFFLINE'); // 'OFFLINE' | 'STARTING' | 'LIVE' | 'ERROR'
  const [modelStatus, setModelStatus] = useState('ACTIVE');
  const [backendConnected, setBackendConnected] = useState(false);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.25);
  const [audioAlertsEnabled, setAudioAlertsEnabled] = useState(true);

  // Live Telemetry
  const [detectionStatus, setDetectionStatus] = useState('NO LANDSLIDE DETECTED');
  const [isLandslideDetected, setIsLandslideDetected] = useState(false);
  const [currentConfidence, setCurrentConfidence] = useState(0);
  const [riskLevel, setRiskLevel] = useState('LOW'); // 'LOW' | 'MEDIUM' | 'HIGH'
  const [totalDetections, setTotalDetections] = useState(0);
  const [detectionsList, setDetectionsList] = useState([]);
  const [fps, setFps] = useState(0);
  const [latencyMs, setLatencyMs] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isAddedToMap, setIsAddedToMap] = useState(false);

  // Refs for video & canvas
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);
  const intervalRef = useRef(null);
  const timerRef = useRef(null);
  const lastAlertTimeRef = useRef(0);
  const fpsTrackerRef = useRef({ frames: 0, lastTime: performance.now() });

  const BACKEND_URL = 'http://127.0.0.1:8000';

  // Check Backend Connection & Model Status on Mount
  const checkBackendHealth = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/health`, { method: 'GET' });
      if (response.ok) {
        const data = await response.json();
        setBackendConnected(true);
        setModelStatus(
          data.model === 'loaded' || data.model_status === 'ACTIVE' || data.model_loaded
            ? 'ACTIVE (YOLO11)'
            : 'MODEL LOADING'
        );
      } else {
        setBackendConnected(false);
        setModelStatus('BACKEND OFFLINE');
      }
    } catch {
      setBackendConnected(false);
      setModelStatus('BACKEND OFFLINE');
    }
  }, []);

  useEffect(() => {
    checkBackendHealth();
    const interval = setInterval(checkBackendHealth, 5000);
    return () => clearInterval(interval);
  }, [checkBackendHealth]);

  // Session Duration Timer
  useEffect(() => {
    if (isMonitoring) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setElapsedSeconds(0);
    }
    return () => clearInterval(timerRef.current);
  }, [isMonitoring]);

  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Draw Bounding Boxes on Overlay Canvas
  const drawBoundingBoxes = (detections, imgWidth, imgHeight) => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

      const isHigh = confidence >= 0.75;
      const boxColor = isHigh ? '#ef4444' : '#f59e0b';
      const glowColor = isHigh ? 'rgba(239, 68, 68, 0.4)' : 'rgba(245, 158, 11, 0.4)';

      // Outer glow
      ctx.shadowColor = boxColor;
      ctx.shadowBlur = 12;

      // Draw bounding box
      ctx.strokeStyle = boxColor;
      ctx.lineWidth = 2.5;
      ctx.strokeRect(x1, y1, w, h);

      // Semi-transparent highlight fill
      ctx.fillStyle = glowColor;
      ctx.fillRect(x1, y1, w, h);

      // Corner accent brackets for futuristic HUD look
      const bracketLen = Math.min(16, w / 4, h / 4);
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#ffffff';

      // Top-left
      ctx.beginPath();
      ctx.moveTo(x1, y1 + bracketLen);
      ctx.lineTo(x1, y1);
      ctx.lineTo(x1 + bracketLen, y1);
      ctx.stroke();

      // Top-right
      ctx.beginPath();
      ctx.moveTo(x2 - bracketLen, y1);
      ctx.lineTo(x2, y1);
      ctx.lineTo(x2, y1 + bracketLen);
      ctx.stroke();

      // Bottom-left
      ctx.beginPath();
      ctx.moveTo(x1, y2 - bracketLen);
      ctx.lineTo(x1, y2);
      ctx.lineTo(x1 + bracketLen, y2);
      ctx.stroke();

      // Bottom-right
      ctx.beginPath();
      ctx.moveTo(x2 - bracketLen, y2);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x2, y2 - bracketLen);
      ctx.stroke();

      // Label background & text
      ctx.shadowBlur = 0;
      const labelText = `⚠ ${(clsName || 'LANDSLIDE').toUpperCase()} ${(confidence * 100).toFixed(1)}%`;
      ctx.font = 'bold 12px "Courier New", monospace';
      const textMetrics = ctx.measureText(labelText);
      const tagWidth = textMetrics.width + 12;
      const tagHeight = 22;

      const tagY = y1 >= 24 ? y1 - 24 : y1;
      ctx.fillStyle = isHigh ? '#dc2626' : '#d97706';
      ctx.fillRect(x1, tagY, tagWidth, tagHeight);

      ctx.fillStyle = '#ffffff';
      ctx.fillText(labelText, x1 + 6, tagY + 15);
    });
  };

  // Process a Single Frame from Webcam
  const processFrame = async () => {
    if (!videoRef.current || !canvasRef.current || !isMonitoring) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video.readyState !== 4) return; // HAVE_ENOUGH_DATA

    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);

    // Update overlay canvas size to match video display
    if (overlayCanvasRef.current) {
      overlayCanvasRef.current.width = video.clientWidth || 640;
      overlayCanvasRef.current.height = video.clientHeight || 480;
    }

    // Convert frame to blob and send to FastAPI /predict_frame
    canvas.toBlob(
      async (blob) => {
        if (!blob || !isMonitoring) return;

        const formData = new FormData();
        formData.append('file', blob, 'frame.jpg');

        const startTime = performance.now();
        try {
          const res = await fetch(`${BACKEND_URL}/predict_frame`, {
            method: 'POST',
            body: formData
          });

          if (res.ok) {
            const data = await res.json();
            const latency = Math.round(performance.now() - startTime);
            setLatencyMs(latency);

            // FPS Calculation
            const now = performance.now();
            fpsTrackerRef.current.frames += 1;
            if (now - fpsTrackerRef.current.lastTime >= 1000) {
              setFps(fpsTrackerRef.current.frames);
              fpsTrackerRef.current.frames = 0;
              fpsTrackerRef.current.lastTime = now;
            }

            // Update telemetry
            if (data.success) {
              const detected = (data.total_detections || 0) > 0;
              setIsLandslideDetected(detected);
              setTotalDetections(data.total_detections || 0);
              setDetectionsList(data.detections || []);
              setCurrentConfidence(Math.round((data.max_confidence || 0) * 100));
              setRiskLevel(data.risk_level || (detected ? 'HIGH' : 'LOW'));

              if (detected) {
                setDetectionStatus('⚠ LANDSLIDE DETECTED');
                // Play sound alert max once every 4 seconds
                if (audioAlertsEnabled && Date.now() - lastAlertTimeRef.current > 4000) {
                  soundFX.playEmergencyAlert();
                  lastAlertTimeRef.current = Date.now();
                }
              } else {
                setDetectionStatus('NO LANDSLIDE DETECTED');
              }

              // Draw bounding boxes on client overlay
              drawBoundingBoxes(data.detections, width, height);
            }
          }
        } catch (err) {
          // Backend communication error
          console.warn('Real-time frame analysis failed:', err);
        }
      },
      'image/jpeg',
      0.7
    );
  };

  // Start Real-Time Monitoring
  const handleStartMonitoring = async () => {
    soundFX.playClick();
    setCameraStatus('STARTING');
    setIsAddedToMap(false);

    if (streamMode === 'backend') {
      setIsMonitoring(true);
      setCameraStatus('LIVE');
      addToast('Live Monitoring Active', 'Connected to backend OpenCV YOLO11 video stream.', 'success');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'environment'
        },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setIsMonitoring(true);
          setCameraStatus('LIVE');
          soundFX.playSuccess();
          addToast('Live Camera Active', 'Real-time YOLO11 landslide monitoring initialized.', 'success');

          // Frame processing interval (~5 FPS for responsive detection with low latency)
          intervalRef.current = setInterval(processFrame, 220);
        };
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraStatus('ERROR');
      setIsMonitoring(false);
      addToast('Camera Permission Denied', 'Please allow webcam access or switch to Backend Video Stream mode.', 'critical');
    }
  };

  // Stop Real-Time Monitoring
  const handleStopMonitoring = () => {
    soundFX.playClick();
    setIsMonitoring(false);
    setCameraStatus('OFFLINE');

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (overlayCanvasRef.current) {
      const ctx = overlayCanvasRef.current.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, overlayCanvasRef.current.width, overlayCanvasRef.current.height);
    }

    setDetectionStatus('NO LANDSLIDE DETECTED');
    setIsLandslideDetected(false);
    setCurrentConfidence(0);
    setTotalDetections(0);
    setDetectionsList([]);
    setRiskLevel('LOW');
    setFps(0);
    setLatencyMs(0);

    addToast('Monitoring Terminated', 'Live camera stream stopped. System offline.', 'info');
  };

  // Cleanup on Unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Add Detected Incident to Command Center Live Map
  const handleAddToMap = () => {
    setIsAddedToMap(true);
    addIncidentFromVision({
      zone: 'Live Camera Sector 7 Landslide Zone',
      floodedArea: '35% Slope Area',
      blockedRoads: 2,
      buildings: 5
    });
    soundFX.playSuccess();
  };

  return (
    <div className="space-y-6 pb-12 max-w-[1440px] mx-auto">
      {/* Hidden processing canvas for frame capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* ================================================== */}
      {/* 1. PAGE HEADER                                     */}
      {/* ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#1c315e]/70">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 text-black shadow-lg shadow-cyan-500/20">
                <Video className="w-6 h-6" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-300">
                LIVE LANDSLIDE MONITORING
              </span>
            </h1>

            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              YOLO11 REAL-TIME ENGINE
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Continuous optical & drone feed analysis for real-time slope failure and landslide threat detection.
          </p>
        </div>

        {/* System Health Indicators */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold ${
            backendConnected ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-red-500/10 border-red-500/40 text-red-400'
          }`}>
            <span className={`w-2 h-2 rounded-full ${backendConnected ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
            <span>{backendConnected ? 'API :8000 CONNECTED' : 'BACKEND OFFLINE'}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>{modelStatus}</span>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* 2. TOP TELEMETRY STATUS BAR (4 High-Impact Cards)   */}
      {/* ================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Camera Status */}
        <div className="glass-panel p-4 rounded-2xl border-[#1c315e]/80 bg-[#081226]/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
              CAMERA STATUS
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2.5 h-2.5 rounded-full ${
                cameraStatus === 'LIVE' ? 'bg-emerald-400 animate-ping' : cameraStatus === 'STARTING' ? 'bg-amber-400' : 'bg-slate-500'
              }`} />
              <strong className={`text-base font-extrabold ${
                cameraStatus === 'LIVE' ? 'text-emerald-300' : 'text-slate-400'
              }`}>
                {cameraStatus === 'LIVE' ? '● LIVE' : 'OFFLINE'}
              </strong>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            {cameraStatus === 'LIVE' ? <Video className="w-5 h-5 text-emerald-400" /> : <VideoOff className="w-5 h-5 text-slate-400" />}
          </div>
        </div>

        {/* Card 2: Detection Status */}
        <div className={`glass-panel p-4 rounded-2xl border transition-all ${
          isLandslideDetected ? 'border-red-500/60 bg-red-950/30 ring-1 ring-red-500/40 animate-pulse' : 'border-[#1c315e]/80 bg-[#081226]/80'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
                DETECTION STATUS
              </span>
              <strong className={`text-sm sm:text-base font-extrabold mt-1 block tracking-tight ${
                isLandslideDetected ? 'text-red-300' : 'text-emerald-400'
              }`}>
                {isMonitoring ? detectionStatus : 'STANDBY'}
              </strong>
            </div>
            <div className={`p-2.5 rounded-xl border ${
              isLandslideDetected ? 'bg-red-500/20 text-red-300 border-red-500/40' : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
            }`}>
              {isLandslideDetected ? <ShieldAlert className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
            </div>
          </div>
        </div>

        {/* Card 3: Real-Time Confidence */}
        <div className="glass-panel p-4 rounded-2xl border-[#1c315e]/80 bg-[#081226]/80">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
                REAL-TIME CONFIDENCE
              </span>
              <strong className="text-xl font-extrabold text-cyan-300 mt-1 block font-mono">
                {isMonitoring ? `${currentConfidence}%` : '0%'}
              </strong>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              YOLO11
            </span>
          </div>
          {/* Mini progress bar */}
          <div className="w-full bg-[#0d172e] h-1.5 rounded-full mt-2 overflow-hidden border border-[#1c315e]">
            <div
              className={`h-full transition-all duration-300 ${
                currentConfidence >= 75 ? 'bg-red-500' : currentConfidence >= 25 ? 'bg-amber-400' : 'bg-emerald-400'
              }`}
              style={{ width: `${currentConfidence}%` }}
            />
          </div>
        </div>

        {/* Card 4: Risk Level */}
        <div className={`glass-panel p-4 rounded-2xl border transition-all ${
          riskLevel === 'HIGH' ? 'border-red-500/50 bg-red-950/20 text-red-300' : riskLevel === 'MEDIUM' ? 'border-amber-500/50 bg-amber-950/20 text-amber-300' : 'border-emerald-500/40 bg-[#081226]/80 text-emerald-300'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
                RISK LEVEL
              </span>
              <strong className="text-xl font-extrabold mt-1 block font-mono">
                {isMonitoring ? riskLevel : 'LOW'}
              </strong>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-current">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-1 block">
            {totalDetections} Threat Zone{totalDetections === 1 ? '' : 's'} Active
          </span>
        </div>
      </div>

      {/* ================================================== */}
      {/* 3. MAIN MONITORING VIEWPORT & SIDEBAR PANEL        */}
      {/* ================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Live Video Feed Screen (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="glass-panel p-4 sm:p-5 rounded-3xl border-cyan-500/40 shadow-2xl bg-[#060c18] relative overflow-hidden">
            {/* Viewport Top Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1c315e]">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    isMonitoring ? 'bg-red-500 animate-ping' : 'bg-slate-600'
                  }`} />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    {streamMode === 'webcam' ? 'OPTICAL CAMERA SENSOR 01' : 'BACKEND VIDEO STREAM FEED'}
                  </span>
                </div>
              </div>

              {/* HUD Telemetry Badges */}
              <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                <span>FPS: <strong className="text-cyan-300">{fps}</strong></span>
                <span>LATENCY: <strong className="text-cyan-300">{latencyMs}ms</strong></span>
                <span>TIME: <strong className="text-white">{formatDuration(elapsedSeconds)}</strong></span>
              </div>
            </div>

            {/* VIDEO DISPLAY CONTAINER */}
            <div className="relative mt-3 w-full aspect-video rounded-2xl overflow-hidden bg-black border border-[#1c315e] flex items-center justify-center group shadow-2xl">
              {streamMode === 'backend' && isMonitoring ? (
                /* Backend MJPEG Stream Feed */
                <img
                  src={`${BACKEND_URL}/video_feed`}
                  alt="Live YOLO11 Landslide Stream"
                  className="w-full h-full object-cover"
                />
              ) : (
                /* Client Browser Webcam Feed with Overlay Canvas */
                <>
                  <video
                    ref={videoRef}
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${cameraStatus === 'LIVE' ? 'block' : 'hidden'}`}
                  />
                  <canvas
                    ref={overlayCanvasRef}
                    className={`absolute inset-0 w-full h-full pointer-events-none ${cameraStatus === 'LIVE' ? 'block' : 'hidden'}`}
                  />
                </>
              )}

              {/* OFFLINE / STANDBY PLACEHOLDER */}
              {!isMonitoring && (
                <div className="flex flex-col items-center justify-center text-center p-6 space-y-3 z-10">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shadow-inner">
                    <Video className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Live Camera Standby</h3>
                    <p className="text-xs text-slate-400 max-w-sm mt-1">
                      Click "Start Monitoring" to activate the real-time YOLO11 landslide detection pipeline.
                    </p>
                  </div>
                </div>
              )}

              {/* HUD HUD Crosshairs & Grid Lines */}
              {isMonitoring && (
                <>
                  {/* Holographic Laser Scanner Line */}
                  <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#06b6d4] animate-pulse pointer-events-none"
                       style={{ animation: 'bounce 3s infinite ease-in-out' }} />

                  {/* Corner Targets */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400/70 pointer-events-none" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400/70 pointer-events-none" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400/70 pointer-events-none" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400/70 pointer-events-none" />

                  {/* Center Crosshair */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
                    <div className="w-12 h-12 border border-cyan-400/40 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    </div>
                  </div>

                  {/* Top-Right Threat Badge */}
                  {isLandslideDetected && (
                    <div className="absolute top-4 right-4 bg-red-600/90 text-white font-mono font-bold text-xs px-3 py-1.5 rounded-lg border border-red-400 shadow-xl flex items-center gap-2 animate-bounce">
                      <AlertTriangle className="w-4 h-4" />
                      <span>LANDSLIDE DETECTED ({totalDetections})</span>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* ACTION CONTROLS BAR */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1c315e]">
              <div className="flex items-center gap-3">
                {!isMonitoring ? (
                  <button
                    onClick={handleStartMonitoring}
                    className="py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                  >
                    <Video className="w-4 h-4 fill-black" />
                    <span>START MONITORING</span>
                  </button>
                ) : (
                  <button
                    onClick={handleStopMonitoring}
                    className="py-3 px-6 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-500/25 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                  >
                    <VideoOff className="w-4 h-4" />
                    <span>STOP MONITORING</span>
                  </button>
                )}

                {/* Sound alert toggle */}
                <button
                  onClick={() => setAudioAlertsEnabled(!audioAlertsEnabled)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    audioAlertsEnabled ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' : 'bg-[#080e1d] border-[#1c315e] text-slate-500'
                  }`}
                  title={audioAlertsEnabled ? 'Audio Alerts Enabled' : 'Audio Alerts Muted'}
                >
                  {audioAlertsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>

              {/* Stream Mode Selection */}
              <div className="flex items-center gap-2 bg-[#080e1d] p-1 rounded-xl border border-[#1c315e]">
                <button
                  onClick={() => {
                    if (isMonitoring) handleStopMonitoring();
                    setStreamMode('webcam');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    streamMode === 'webcam' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Webcam Feed
                </button>
                <button
                  onClick={() => {
                    if (isMonitoring) handleStopMonitoring();
                    setStreamMode('backend');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    streamMode === 'backend' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  OpenCV Stream
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Live Threat Analytics & Map Trigger (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Detections List Card */}
          <div className="glass-panel p-5 rounded-3xl border-indigo-500/30 shadow-xl bg-gradient-to-b from-[#0e1633] via-[#091224] to-[#070e1c] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1c315e]">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white">Detection Telemetry</h3>
                  <span className="text-[10px] text-cyan-300 font-mono">Real-time bbox parser</span>
                </div>
              </div>

              <span className="text-xs font-mono font-bold text-slate-300">
                {detectionsList.length} Box{detectionsList.length === 1 ? '' : 'es'}
              </span>
            </div>

            {/* Detections List */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {detectionsList.length > 0 ? (
                detectionsList.map((det, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-xl bg-[#081226] border border-red-500/30 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                        <span className="text-xs font-bold text-white uppercase">{det.class || 'Landslide Zone'}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                        Coords: [{det.bbox.x1}, {det.bbox.y1}] → [{det.bbox.x2}, {det.bbox.y2}]
                      </span>
                    </div>

                    <span className="text-xs font-mono font-extrabold px-2 py-1 rounded bg-red-500/20 text-red-300 border border-red-500/40">
                      {Math.round(det.confidence * 100)}%
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-xl bg-[#080e1d] border border-[#1c315e] text-center text-xs text-slate-400">
                  {isMonitoring ? 'Scanning video frames for slope hazards...' : 'Start monitoring to view live detection telemetry.'}
                </div>
              )}
            </div>

            {/* Confidence Threshold Slider */}
            <div className="pt-2 border-t border-[#1c315e] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span>Confidence Cutoff:</span>
                <strong className="text-cyan-300">{Math.round(confidenceThreshold * 100)}%</strong>
              </div>
              <input
                type="range"
                min="0.10"
                max="0.90"
                step="0.05"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#0d172e] rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>

          {/* Action Trigger Card: Plot on Disaster Map */}
          <div className="glass-panel p-5 rounded-3xl border-cyan-500/40 shadow-2xl bg-gradient-to-br from-[#0c1b3d] to-[#071124] space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-white">GIS Integration</h3>
            </div>

            <p className="text-xs text-slate-300">
              Directly synchronize verified real-time detections with ResQAI's Live GIS Disaster Grid.
            </p>

            {isAddedToMap ? (
              <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="font-extrabold text-xs">LOGGED TO LIVE COMMAND MAP</span>
              </div>
            ) : (
              <button
                onClick={handleAddToMap}
                disabled={!isLandslideDetected}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <MapPin className="w-4 h-4 fill-black" />
                <span>PLOT ALERT ON LIVE MAP</span>
              </button>
            )}

            <button
              onClick={() => navigate('/vision')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#081226] hover:bg-[#0c1836] text-cyan-300 border border-[#1c315e] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Switch to Image Upload Analysis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
