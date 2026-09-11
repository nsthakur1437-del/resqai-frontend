import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Map,
  Palette,
  Cpu,
  ShieldCheck,
  Radio,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Sliders,
  Volume2,
  VolumeX,
  Lock,
  Mail,
  Eye,
  Check,
  X,
  Edit3,
  Layers,
  Info
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { soundFX } from '../utils/audio';

export const Settings = () => {
  const { soundEnabled, setSoundEnabled, resetDemoData } = useDisaster();

  // 1. Profile State
  const [profile, setProfile] = useState({
    name: 'Rescue Coordinator',
    role: 'Emergency Operations',
    email: 'coordinator@resqai.demo'
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...profile });

  // 2. Notification Toggles
  const [notifications, setNotifications] = useState({
    emergencyAlerts: true,
    criticalIncidents: true,
    rescueTeamUpdates: true,
    resourceAvailability: false
  });

  // 3. Map Preferences Toggles
  const [mapPrefs, setMapPrefs] = useState({
    defaultMapView: 'CartoDB Dark Matter',
    showRescueTeams: true,
    showHospitals: true,
    showShelters: true,
    showBlockedRoads: true
  });

  // 4. Appearance Controls
  const [appearance, setAppearance] = useState({
    darkMode: true,
    systemTheme: 'Command Center Dark',
    uiAnimations: true
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Toggle helpers
  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    soundFX.playClick();
  };

  const toggleMapPref = (key) => {
    setMapPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
    soundFX.playClick();
  };

  const toggleAppearance = (key) => {
    setAppearance((prev) => ({ ...prev, [key]: !prev[key] }));
    soundFX.playClick();
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile({ ...tempProfile });
    setIsEditingProfile(false);
    soundFX.playSuccess();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-7 pb-12 max-w-[1100px] mx-auto">
      {/* ================================================== */}
      {/* 1. PAGE HEADER                                     */}
      {/* ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1c315e]/60">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <SettingsIcon className="w-6 h-6 text-cyan-400" />
            <span>Settings</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            "Manage your ResQAI dashboard preferences."
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold font-mono animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Preferences Saved</span>
          </div>
        )}
      </div>

      {/* ================================================== */}
      {/* 2. 👤 PROFILE SECTION                              */}
      {/* ================================================== */}
      <section className="glass-panel p-6 rounded-2xl border-[#1c315e]/80 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1c315e]">
          <h2 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" />
            <span>PROFILE</span>
          </h2>
          <button
            onClick={() => {
              setTempProfile({ ...profile });
              setIsEditingProfile(!isEditingProfile);
              soundFX.playClick();
            }}
            className="px-3 py-1.5 rounded-xl bg-[#0d152a] hover:bg-cyan-500/20 text-cyan-300 hover:text-white text-xs font-bold border border-cyan-500/30 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditingProfile ? 'CANCEL' : 'EDIT PROFILE'}</span>
          </button>
        </div>

        {isEditingProfile ? (
          <form onSubmit={handleSaveProfile} className="space-y-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-slate-400 text-[11px] font-bold block mb-1">Name</label>
                <input
                  type="text"
                  value={tempProfile.name}
                  onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                  className="w-full bg-[#080e1d] border border-[#1c315e] rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-slate-400 text-[11px] font-bold block mb-1">Role</label>
                <input
                  type="text"
                  value={tempProfile.role}
                  onChange={(e) => setTempProfile({ ...tempProfile, role: e.target.value })}
                  className="w-full bg-[#080e1d] border border-[#1c315e] rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-slate-400 text-[11px] font-bold block mb-1">Email</label>
                <input
                  type="email"
                  value={tempProfile.email}
                  onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                  className="w-full bg-[#080e1d] border border-[#1c315e] rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-xs uppercase tracking-wider shadow cursor-pointer"
            >
              SAVE CHANGES
            </button>
          </form>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-1">
            {/* Profile Photo / Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-950 flex-shrink-0">
              <div className="w-full h-full bg-[#080e1d] rounded-[14px] flex items-center justify-center text-cyan-300 font-extrabold text-xl">
                RC
              </div>
            </div>

            {/* Profile Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                <span className="text-[10px] text-slate-400 block">Name</span>
                <strong className="text-white text-sm mt-0.5 block">{profile.name}</strong>
              </div>

              <div className="p-3 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                <span className="text-[10px] text-slate-400 block">Role</span>
                <strong className="text-cyan-300 text-sm mt-0.5 block">{profile.role}</strong>
              </div>

              <div className="p-3 rounded-xl bg-[#080e1d] border border-[#1c315e]">
                <span className="text-[10px] text-slate-400 block">Email</span>
                <strong className="text-slate-200 text-sm mt-0.5 block">{profile.email}</strong>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ================================================== */}
      {/* 3. 🔔 NOTIFICATIONS                                */}
      {/* ================================================== */}
      <section className="glass-panel p-6 rounded-2xl border-[#1c315e]/80 shadow-xl space-y-4">
        <div className="pb-3 border-b border-[#1c315e]">
          <h2 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-2">
            <Bell className="w-4 h-4 text-cyan-400" />
            <span>NOTIFICATIONS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Emergency Alerts */}
          <div className="p-3.5 rounded-xl bg-[#080e1d] border border-[#1c315e] flex items-center justify-between">
            <div>
              <span className="font-bold text-white block">Emergency Alerts</span>
              <span className="text-[11px] text-slate-400">Broadcast immediate citizen SOS signals</span>
            </div>
            <button
              onClick={() => toggleNotification('emergencyAlerts')}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                notifications.emergencyAlerts ? 'bg-cyan-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                  notifications.emergencyAlerts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Critical Incident Notifications */}
          <div className="p-3.5 rounded-xl bg-[#080e1d] border border-[#1c315e] flex items-center justify-between">
            <div>
              <span className="font-bold text-white block">Critical Incident Notifications</span>
              <span className="text-[11px] text-slate-400">High-priority audio and popup banners</span>
            </div>
            <button
              onClick={() => toggleNotification('criticalIncidents')}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                notifications.criticalIncidents ? 'bg-cyan-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                  notifications.criticalIncidents ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Rescue Team Updates */}
          <div className="p-3.5 rounded-xl bg-[#080e1d] border border-[#1c315e] flex items-center justify-between">
            <div>
              <span className="font-bold text-white block">Rescue Team Updates</span>
              <span className="text-[11px] text-slate-400">Dispatch, arrival, and mission status pings</span>
            </div>
            <button
              onClick={() => toggleNotification('rescueTeamUpdates')}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                notifications.rescueTeamUpdates ? 'bg-cyan-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                  notifications.rescueTeamUpdates ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Resource Availability Alerts */}
          <div className="p-3.5 rounded-xl bg-[#080e1d] border border-[#1c315e] flex items-center justify-between">
            <div>
              <span className="font-bold text-white block">Resource Availability Alerts</span>
              <span className="text-[11px] text-slate-400">Hospital ICU and shelter capacity warnings</span>
            </div>
            <button
              onClick={() => toggleNotification('resourceAvailability')}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                notifications.resourceAvailability ? 'bg-cyan-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                  notifications.resourceAvailability ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 4. 🗺️ MAP PREFERENCES                             */}
      {/* ================================================== */}
      <section className="glass-panel p-6 rounded-2xl border-[#1c315e]/80 shadow-xl space-y-4">
        <div className="pb-3 border-b border-[#1c315e]">
          <h2 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-2">
            <Map className="w-4 h-4 text-cyan-400" />
            <span>MAP PREFERENCES</span>
          </h2>
        </div>

        <div className="space-y-3 text-xs">
          {/* Default Map View */}
          <div className="p-3.5 rounded-xl bg-[#080e1d] border border-[#1c315e] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-bold text-white block">Default Map View</span>
              <span className="text-[11px] text-slate-400">Select GIS satellite / base vector raster</span>
            </div>
            <select
              value={mapPrefs.defaultMapView}
              onChange={(e) => setMapPrefs({ ...mapPrefs, defaultMapView: e.target.value })}
              className="bg-[#0d152a] border border-[#1c315e] rounded-lg px-3 py-1.5 text-cyan-300 font-mono text-xs outline-none"
            >
              <option>CartoDB Dark Matter (Default)</option>
              <option>Sentinel-2 Multispectral Satellite</option>
              <option>Topographic Hazard Contour</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Show Rescue Teams */}
            <div className="p-3 rounded-xl bg-[#080e1d] border border-[#1c315e] flex items-center justify-between">
              <span className="font-bold text-white">Show Rescue Teams</span>
              <button
                onClick={() => toggleMapPref('showRescueTeams')}
                className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                  mapPrefs.showRescueTeams ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full bg-white transition-transform transform ${
                    mapPrefs.showRescueTeams ? 'translate-x-4' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Show Hospitals */}
            <div className="p-3 rounded-xl bg-[#080e1d] border border-[#1c315e] flex items-center justify-between">
              <span className="font-bold text-white">Show Hospitals</span>
              <button
                onClick={() => toggleMapPref('showHospitals')}
                className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                  mapPrefs.showHospitals ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full bg-white transition-transform transform ${
                    mapPrefs.showHospitals ? 'translate-x-4' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Show Shelters */}
            <div className="p-3 rounded-xl bg-[#080e1d] border border-[#1c315e] flex items-center justify-between">
              <span className="font-bold text-white">Show Shelters</span>
              <button
                onClick={() => toggleMapPref('showShelters')}
                className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                  mapPrefs.showShelters ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full bg-white transition-transform transform ${
                    mapPrefs.showShelters ? 'translate-x-4' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Show Blocked Roads */}
            <div className="p-3 rounded-xl bg-[#080e1d] border border-[#1c315e] flex items-center justify-between">
              <span className="font-bold text-white">Show Blocked Roads</span>
              <button
                onClick={() => toggleMapPref('showBlockedRoads')}
                className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                  mapPrefs.showBlockedRoads ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full bg-white transition-transform transform ${
                    mapPrefs.showBlockedRoads ? 'translate-x-4' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 5. 🎨 APPEARANCE                                  */}
      {/* ================================================== */}
      <section className="glass-panel p-6 rounded-2xl border-[#1c315e]/80 shadow-xl space-y-4">
        <div className="pb-3 border-b border-[#1c315e]">
          <h2 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-2">
            <Palette className="w-4 h-4 text-cyan-400" />
            <span>APPEARANCE</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Dark Mode */}
          <div className="p-3.5 rounded-xl bg-[#080e1d] border border-[#1c315e] flex items-center justify-between">
            <div>
              <span className="font-bold text-white block">Dark Mode</span>
              <span className="text-[11px] text-slate-400">High-contrast disaster UI</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              ACTIVE
            </span>
          </div>

          {/* System Theme */}
          <div className="p-3.5 rounded-xl bg-[#080e1d] border border-[#1c315e] flex items-center justify-between">
            <div>
              <span className="font-bold text-white block">System Theme</span>
              <span className="text-[11px] text-slate-400">{appearance.systemTheme}</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#162547] text-slate-300 border border-[#1c315e]">
              DEFAULT
            </span>
          </div>

          {/* UI Animations */}
          <div className="p-3.5 rounded-xl bg-[#080e1d] border border-[#1c315e] flex items-center justify-between">
            <div>
              <span className="font-bold text-white block">UI Animations</span>
              <span className="text-[11px] text-slate-400">Smooth state transitions</span>
            </div>
            <button
              onClick={() => toggleAppearance('uiAnimations')}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                appearance.uiAnimations ? 'bg-cyan-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                  appearance.uiAnimations ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 6. ⚙️ SYSTEM & DEMO TRANSPARENCY                   */}
      {/* ================================================== */}
      <section className="glass-panel p-6 rounded-2xl border-cyan-500/30 shadow-xl space-y-4 bg-gradient-to-r from-[#091326] via-[#0d1c38] to-[#091326]">
        <div className="flex items-center justify-between pb-3 border-b border-[#1c315e]">
          <h2 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>SYSTEM STATUS & DEMO MODE</span>
          </h2>
          <button
            onClick={resetDemoData}
            className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          {/* System Status */}
          <div className="p-3.5 rounded-xl bg-[#080e1d] border border-[#1c315e] space-y-1">
            <span className="text-slate-400 text-[10px] block">System Status:</span>
            <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>● All Systems Operational</span>
            </div>
          </div>

          {/* Demo Data Mode */}
          <div className="p-3.5 rounded-xl bg-[#080e1d] border border-[#1c315e] space-y-1">
            <span className="text-slate-400 text-[10px] block">Demo Data Mode:</span>
            <div className="text-sm font-bold text-cyan-300">
              Enabled (Interactive)
            </div>
          </div>

          {/* AI Features */}
          <div className="p-3.5 rounded-xl bg-[#080e1d] border border-[#1c315e] space-y-1">
            <span className="text-slate-400 text-[10px] block">AI Features:</span>
            <div className="text-sm font-bold text-indigo-300">
              Prototype Mode
            </div>
          </div>
        </div>

        {/* Mandatory Transparency Note */}
        <div className="p-4 rounded-xl bg-[#080e1d] border border-cyan-500/30 text-xs text-slate-300 leading-relaxed italic flex items-start gap-2.5">
          <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
          <p>
            "This hackathon prototype currently uses demo data and simulated AI interactions where backend services are not connected."
          </p>
        </div>
      </section>
    </div>
  );
};
