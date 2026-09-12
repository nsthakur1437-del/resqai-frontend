import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ToastContainer } from './components/ToastContainer';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { EmergencyReports } from './pages/EmergencyReports';
import { Incidents } from './pages/Incidents';
import { LiveMapPage } from './pages/LiveMapPage';
import { LiveCommandMap } from './pages/LiveCommandMap';
import { RescueCoordination } from './pages/RescueCoordination';
import { Resources } from './pages/Resources';
import { AiVision } from './pages/AiVision';
import { LiveMonitoring } from './pages/LiveMonitoring';
import { AiIncidentFusion } from './pages/AiIncidentFusion';
import { PriorityQueue } from './pages/PriorityQueue';
import { ResourceMatching } from './pages/ResourceMatching';
import { DispatchCenter } from './pages/DispatchCenter';
import { Settings } from './pages/Settings';

// Layout wrapper for all Command Center operational pages
const CommandCenterLayout = ({ children }) => {
  return (
    <div className="command-center-shell min-h-screen text-slate-100">
      <Sidebar />

      <div className="ml-72 flex min-h-screen flex-col min-w-0">
        <Header />

        <main className="flex-1 px-6 py-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1600px]">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#020b17] text-slate-100">
      <Routes>
        {/* Full-Screen Landing & Public Portals */}
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Disaster Command Center Operational Pages */}
        <Route
          path="/dashboard"
          element={
            <CommandCenterLayout>
              <Dashboard />
            </CommandCenterLayout>
          }
        />
        <Route path="/analytics" element={<CommandCenterLayout><Dashboard /></CommandCenterLayout>} />
        <Route
          path="/fusion"
          element={
            <CommandCenterLayout>
              <AiIncidentFusion />
            </CommandCenterLayout>
          }
        />
        <Route
          path="/incident-fusion"
          element={
            <CommandCenterLayout>
              <AiIncidentFusion />
            </CommandCenterLayout>
          }
        />
        <Route
          path="/reports"
          element={
            <CommandCenterLayout>
              <EmergencyReports />
            </CommandCenterLayout>
          }
        />
        <Route path="/alerts" element={<CommandCenterLayout><EmergencyReports /></CommandCenterLayout>} />
        <Route
          path="/priority"
          element={
            <CommandCenterLayout>
              <PriorityQueue />
            </CommandCenterLayout>
          }
        />
        <Route
          path="/priority-queue"
          element={
            <CommandCenterLayout>
              <PriorityQueue />
            </CommandCenterLayout>
          }
        />
        <Route
          path="/resource-matching"
          element={
            <CommandCenterLayout>
              <ResourceMatching />
            </CommandCenterLayout>
          }
        />
        <Route
          path="/matching"
          element={
            <CommandCenterLayout>
              <ResourceMatching />
            </CommandCenterLayout>
          }
        />
        <Route
          path="/incidents"
          element={
            <CommandCenterLayout>
              <Incidents />
            </CommandCenterLayout>
          }
        />
        <Route
          path="/map"
          element={
            <CommandCenterLayout>
              <LiveCommandMap />
            </CommandCenterLayout>
          }
        />
        <Route path="/live-map" element={<CommandCenterLayout><LiveCommandMap /></CommandCenterLayout>} />
        <Route
          path="/command-map"
          element={
            <CommandCenterLayout>
              <LiveCommandMap />
            </CommandCenterLayout>
          }
        />
        <Route
          path="/live-command-map"
          element={
            <CommandCenterLayout>
              <LiveCommandMap />
            </CommandCenterLayout>
          }
        />
        <Route
          path="/coordination"
          element={
            <CommandCenterLayout>
              <DispatchCenter />
            </CommandCenterLayout>
          }
        />
        <Route path="/rescue-coordination" element={<CommandCenterLayout><RescueCoordination /></CommandCenterLayout>} />
        <Route
          path="/dispatch"
          element={
            <CommandCenterLayout>
              <DispatchCenter />
            </CommandCenterLayout>
          }
        />
        <Route
          path="/dispatch-center"
          element={
            <CommandCenterLayout>
              <DispatchCenter />
            </CommandCenterLayout>
          }
        />
        <Route
          path="/resources"
          element={
            <CommandCenterLayout>
              <Resources />
            </CommandCenterLayout>
          }
        />
        <Route
          path="/vision"
          element={
            <CommandCenterLayout>
              <AiVision />
            </CommandCenterLayout>
          }
        />
        <Route path="/ai-analysis" element={<CommandCenterLayout><AiVision /></CommandCenterLayout>} />
        <Route
          path="/monitoring"
          element={
            <CommandCenterLayout>
              <LiveMonitoring />
            </CommandCenterLayout>
          }
        />
        <Route path="/risk-monitoring" element={<CommandCenterLayout><LiveMonitoring /></CommandCenterLayout>} />
        <Route
          path="/live-monitoring"
          element={
            <CommandCenterLayout>
              <LiveMonitoring />
            </CommandCenterLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <CommandCenterLayout>
              <Settings />
            </CommandCenterLayout>
          }
        />

        {/* Catch-all redirect to Landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Toast Notification System */}
      <ToastContainer />
    </div>
  );
}
