import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Shield,
  Mountain,
  Lock,
  Mail,
  Zap,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Eye,
  EyeOff,
  Radio,
  ArrowLeft
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { soundFX } from '../utils/audio';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useDisaster();

  const [email, setEmail] = useState('coordinator@resqai.demo');
  const [password, setPassword] = useState('resqai-command-2026');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both your email address and security passcode.');
      soundFX.playEmergencyAlert();
      return;
    }

    setIsLoading(true);
    soundFX.playAiChime();

    // Smooth demo authentication loading sequence
    setTimeout(() => {
      login(email, 'Rescue Coordinator');
      setIsLoading(false);
      navigate('/dashboard');
    }, 900);
  };

  const handleQuickDemoLogin = () => {
    setEmail('coordinator@resqai.demo');
    setPassword('resqai-command-2026');
    setIsLoading(true);
    soundFX.playAiChime();

    setTimeout(() => {
      login('coordinator@resqai.demo', 'Rescue Coordinator');
      setIsLoading(false);
      navigate('/dashboard');
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#050914] text-slate-100 flex flex-col justify-between relative overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Atmosphere & High-Tech Radar Grids */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[180px]" />
        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-red-500/08 rounded-full blur-[140px]" />
      </div>

      {/* Top Header / Back Link */}
      <header className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <Link
          to="/"
          onClick={() => soundFX.playClick()}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-cyan-300 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Public Portal</span>
        </Link>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>AUTH GATEWAY ACTIVE</span>
        </div>
      </header>

      {/* Main Login Card Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-md">
          {/* Glassmorphism Card */}
          <div className="glass-panel p-7 sm:p-9 rounded-3xl border-cyan-500/30 shadow-2xl bg-gradient-to-b from-[#0a152d]/95 via-[#071022]/95 to-[#050914]/95 relative overflow-hidden backdrop-blur-2xl">
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Brand Logo & Header */}
            <div className="text-center space-y-3 pb-6 border-b border-[#1c315e]/60">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 shadow-xl shadow-cyan-500/25 ring-2 ring-cyan-400/40 mx-auto">
                <Shield className="w-7 h-7 text-white drop-shadow" />
                <Mountain className="w-4 h-4 text-cyan-200 absolute bottom-3 left-4 drop-shadow" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
                  Welcome to ResQ<span className="text-cyan-400">AI</span>
                </h1>
                <p className="text-xs text-slate-300 mt-1 font-medium leading-relaxed">
                  "AI-Powered Disaster Response & Rescue Coordination"
                </p>
              </div>

              <div className="inline-block text-[11px] font-mono text-cyan-300/90 italic">
                "Nature Warns. We Act."
              </div>
            </div>

            {/* Quick 1-Click Demo Login Banner */}
            <div className="mt-5 p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Hackathon Demo Access</span>
              </div>

              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-extrabold tracking-wide uppercase shadow-md transition-all active:scale-95 cursor-pointer"
              >
                1-Click Sign In
              </button>
            </div>

            {/* Error Message if any */}
            {errorMessage && (
              <div className="mt-4 p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Email Address */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4 text-cyan-400/80" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="coordinator@resqai.demo"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#060c1c] border border-[#1c315e] focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500 text-xs font-mono transition-colors outline-none"
                  />
                </div>
              </div>

              {/* Security Passcode */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      soundFX.playClick();
                      alert('Demo Credentials:\nEmail: coordinator@resqai.demo\nPassword: resqai-command-2026');
                    }}
                    className="text-[11px] font-mono text-cyan-400 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4 text-cyan-400/80" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#060c1c] border border-[#1c315e] focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500 text-xs font-mono transition-colors outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#060c1c] border-[#1c315e] text-cyan-500 focus:ring-cyan-400 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="font-medium">Remember Me</span>
                </label>

                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Demo Mode Ready
                </span>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-75 text-black font-black text-xs tracking-wider uppercase shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 cursor-pointer ring-2 ring-cyan-400/40"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>SYNCHRONIZING TERMINAL...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-black" />
                      <span>ENTER COMMAND CENTER</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Direct Guest Bypass Link */}
            <div className="mt-5 pt-4 border-t border-[#1c315e]/50 text-center">
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  navigate('/dashboard');
                }}
                className="text-xs text-slate-400 hover:text-cyan-300 font-mono transition-colors cursor-pointer"
              >
                ▶ Bypass Login (Direct Command Center Access)
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer info */}
      <footer className="relative z-10 py-6 text-center text-xs text-slate-500 font-mono">
        ResQAI Disaster Response & Rescue Coordinator • Prototype v2.4
      </footer>
    </div>
  );
};
