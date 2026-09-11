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
    <div className="command-center-shell min-h-screen text-slate-900 flex">
      {/* Fixed Left Sidebar (Width 64 / 16rem) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-w-0">
        {/* Sticky Command Header */}
        <Header />

        {/* Page Content Body */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
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
        <Route
          path="/monitoring"
          element={
            <CommandCenterLayout>
              <LiveMonitoring />
            </CommandCenterLayout>
          }
        />
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
