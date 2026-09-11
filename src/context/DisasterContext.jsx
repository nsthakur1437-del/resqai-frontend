import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audio';
import {
  initialIncidents,
  initialEmergencyReports,
  initialRescueTeams,
  initialResources,
  initialRoadBlocks,
  initialActivityLog
} from '../data/mockData';

const DisasterContext = createContext();

export const DisasterProvider = ({ children }) => {
  const [incidents, setIncidents] = useState(initialIncidents);
  const [reports, setReports] = useState(initialEmergencyReports);
  const [rescueTeams, setRescueTeams] = useState(initialRescueTeams);
  const [resources, setResources] = useState(initialResources);
  const [roadBlocks, setRoadBlocks] = useState(initialRoadBlocks);
  const [activityLog, setActivityLog] = useState(initialActivityLog);
  const [selectedIncidentId, setSelectedIncidentId] = useState('INC-101');
  const [selectedReportId, setSelectedReportId] = useState('REP-001');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [isSimulatingAi, setIsSimulatingAi] = useState(false);
  
  // Authentication state for hackathon demo
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('resqai_auth') === 'true';
  });
  const [user, setUser] = useState({
    name: 'Rescue Coordinator',
    role: 'Emergency Operations Lead',
    email: 'coordinator@resqai.demo',
    badge: 'OP-CHIEF-01',
    organization: 'National Disaster Response Force (NDRF)'
  });

  const login = (email = 'coordinator@resqai.demo', name = 'Rescue Coordinator') => {
    setIsAuthenticated(true);
    localStorage.setItem('resqai_auth', 'true');
    setUser(prev => ({
      ...prev,
      email: email || prev.email,
      name: name || prev.name
    }));
    soundFX.playSuccess();
    addToast('Authentication Verified', `Welcome back, ${name || 'Commander'}. Command terminal synchronized.`, 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('resqai_auth');
    soundFX.playClick();
    addToast('Session Ended', 'Logged out of Disaster Command Center.', 'info');
  };

  // Sync soundFX enable state
  useEffect(() => {
    soundFX.enabled = soundEnabled;
  }, [soundEnabled]);

  const addToast = (title, message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [{ id, title, message, type }, ...prev.slice(0, 4)]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Assign a rescue team to an incident
  const assignRescueTeam = (incidentId, teamId) => {
    const targetIncident = incidents.find(i => i.id === incidentId);
    const targetTeam = rescueTeams.find(t => t.id === teamId);

    if (!targetIncident || !targetTeam) return;

    soundFX.playSuccess();

    // Trigger celebratory particle effect for rescue dispatch
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#06b6d4', '#10b981', '#38bdf8', '#fbbf24']
      });
    } catch (e) {
      console.log('Confetti trigger', e);
    }

    // Update Incidents
    setIncidents(prev =>
      prev.map(inc => {
        if (inc.id === incidentId) {
          return {
            ...inc,
            assignedTeam: teamId,
            status: 'Rescue In Progress',
            timeline: [
              ...inc.timeline,
              {
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                text: `${targetTeam.name} dispatched. ETA ${targetTeam.etaMinutes || inc.etaMinutes} mins.`
              }
            ]
          };
        }
        return inc;
      })
    );

    // Update Rescue Teams
    setRescueTeams(prev =>
      prev.map(team => {
        if (team.id === teamId) {
          return {
            ...team,
            status: 'Dispatched',
            assignedIncidentId: incidentId
          };
        }
        return team;
      })
    );

    // Add to live activity log
    const newLog = {
      id: 'ACT-' + Date.now(),
      type: 'dispatch',
      icon: 'CheckCircle2',
      text: `${targetTeam.name} assigned to ${targetIncident.location} (${targetIncident.title})`,
      time: 'Just now',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    };
    setActivityLog(prev => [newLog, ...prev]);

    addToast(
      '✓ Rescue Team Dispatched',
      `${targetTeam.name} is en route to ${targetIncident.location}. Estimated ETA: ${incidents.find(i => i.id === incidentId)?.etaMinutes || 8} mins.`,
      'success'
    );
  };

  // Simulate an incoming live emergency report to wow judges during live presentations
  const simulateIncomingEmergency = (customReportText) => {
    soundFX.playEmergencyAlert();
    setIsSimulatingAi(true);

    const reportId = `REP-${String(reports.length + 1).padStart(3, '0')}`;
    const rawText = customReportText || 'URGENT: Flash mudslide reported near West Gorge Road. 6 trekkers cut off without shelter. Water rising fast!';
    
    const newReport = {
      id: reportId,
      rawText: rawText,
      source: 'Citizen SOS Network (Live Feed)',
      sender: '+91 94111 ' + Math.floor(10000 + Math.random() * 90000),
      timestamp: 'Just now',
      status: 'AI PROCESSED',
      confidence: 98.4,
      extracted: {
        location: 'West Gorge Ridge (Sector 9)',
        peopleAffected: 6,
        disaster: 'Flash Mudslide & Isolation',
        priority: 'P1 Critical',
        medicalHelp: 'Required (Cold Exposure)',
        resourcesNeeded: 'Rescue Team 6 (Helo-Drop) + Trauma Blankets',
        keyEntities: ['West Gorge', '6 trekkers cut off', 'Water rising', 'Mudslide']
      }
    };

    setTimeout(() => {
      soundFX.playAiChime();
      setReports(prev => [newReport, ...prev]);
      setSelectedReportId(reportId);

      // Create new incident
      const newIncId = `INC-${100 + incidents.length + 1}`;
      const newIncident = {
        id: newIncId,
        title: 'West Gorge Mudslide & Trekker Isolation',
        disaster: 'Landslide',
        location: 'West Gorge Ridge (Sector 9)',
        coordinates: [28.7600, 77.1500],
        peopleAffected: 6,
        injured: 1,
        priority: 'P1 Critical',
        severity: 'Critical',
        status: 'Active',
        reportedAt: 'Just now',
        medicalHelp: 'Required',
        description: rawText,
        recommendedTeamId: 'TEAM-06',
        recommendedTeamName: 'Rescue Team 6 (Air Recon & Heli-Drop)',
        etaMinutes: 10,
        distanceKm: 5.2,
        requiredEquipment: ['ALH Winch Chopper', 'Thermal Imaging', 'Airdrop Survival Packs'],
        aiRationale: [
          'High elevation & washed-out road prevents ground vehicles',
          'Fastest aerial response (10 min flight time)',
          'Equipped with heavy-weather rescue hoist'
        ],
        assignedTeam: null,
        timeline: [
          { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), text: 'SOS Distress signal picked up by radio telemetry' },
          { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), text: 'AI parsed incident entities & flagged P1 Critical' }
        ]
      };

      setIncidents(prev => [newIncident, ...prev]);
      setSelectedIncidentId(newIncId);

      setActivityLog(prev => [
        {
          id: 'ACT-' + Date.now(),
          type: 'report',
          icon: 'AlertCircle',
          text: `🚨 Live Emergency: 6 trekkers trapped at West Gorge Ridge`,
          time: 'Just now',
          badgeColor: 'text-red-400 bg-red-500/10 border-red-500/30'
        },
        ...prev
      ]);

      setIsSimulatingAi(false);

      addToast(
        '🚨 New Emergency Identified',
        'AI classified incoming report as P1 Critical. Incident mapped & Rescue Team 6 recommended.',
        'critical'
      );
    }, 1200);
  };

  // Add Incident directly from AI Vision page
  const addIncidentFromVision = (visionData) => {
    soundFX.playAiChime();
    const newIncId = `INC-${100 + incidents.length + 1}`;
    const newIncident = {
      id: newIncId,
      title: 'Satellite Detected Sector 4 Inundation Zone',
      disaster: 'Flood',
      location: 'Sector 4 River Basin Sub-division',
      coordinates: [28.6920, 77.0850],
      peopleAffected: 32,
      injured: 0,
      priority: 'P1 Critical',
      severity: 'Critical',
      status: 'Active',
      reportedAt: 'Just now',
      medicalHelp: 'Required',
      description: 'AI Satellite Vision detected 42% flood inundation over 18 residential structures with 3 arterial roads cut off.',
      recommendedTeamId: 'TEAM-03',
      recommendedTeamName: 'Rescue Team 3 (Water Rescue & Marine)',
      etaMinutes: 9,
      distanceKm: 2.4,
      requiredEquipment: ['Rescue Boats', 'Dewatering Pumps', 'Inflatable Levees'],
      aiRationale: [
        'Large contiguous water body detected by SAR satellite radar',
        '3 arterial evacuation corridors completely severed',
        'Water-based rescue units required immediately'
      ],
      assignedTeam: null,
      timeline: [
        { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), text: 'Sentinel-2 radar change detection triggered anomaly' },
        { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), text: 'Flood segmentation mask generated (42% water surface)' }
      ]
    };

    setIncidents(prev => [newIncident, ...prev]);
    setSelectedIncidentId(newIncId);

    setActivityLog(prev => [
      {
        id: 'ACT-' + Date.now(),
        type: 'ai',
        icon: 'Eye',
        text: 'AI Vision analysis added new inundation zone to Live Disaster Map',
        time: 'Just now',
        badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
      },
      ...prev
    ]);

    addToast(
      '🛰️ AI Vision Layer Mapped',
      'Sector 4 flood boundary added to live disaster command center.',
      'success'
    );
  };

  const resetDemoData = () => {
    setIncidents(initialIncidents);
    setReports(initialEmergencyReports);
    setRescueTeams(initialRescueTeams);
    setResources(initialResources);
    setRoadBlocks(initialRoadBlocks);
    setActivityLog(initialActivityLog);
    setSelectedIncidentId('INC-101');
    setSelectedReportId('REP-001');
    soundFX.playSuccess();
    addToast('System Reset', 'All demo data & rescue assignments restored to baseline.', 'info');
  };

  const selectedIncident = incidents.find(i => i.id === selectedIncidentId) || incidents[0];
  const selectedReport = reports.find(r => r.id === selectedReportId) || reports[0];

  // Global counts for live status badges
  const totalActiveIncidents = incidents.filter(i => i.status !== 'Resolved').length;
  const criticalCasesCount = incidents.filter(i => i.priority.includes('Critical') && i.status !== 'Resolved').length;
  const totalPeopleAffected = incidents.filter(i => i.status !== 'Resolved').reduce((acc, curr) => acc + (curr.peopleAffected || 0), 0);
  const availableRescueTeamsCount = rescueTeams.filter(t => t.status === 'Available').length;

  return (
    <DisasterContext.Provider
      value={{
        incidents,
        setIncidents,
        reports,
        setReports,
        rescueTeams,
        setRescueTeams,
        resources,
        roadBlocks,
        activityLog,
        selectedIncidentId,
        setSelectedIncidentId,
        selectedIncident,
        selectedReportId,
        setSelectedReportId,
        selectedReport,
        soundEnabled,
        setSoundEnabled,
        assignRescueTeam,
        simulateIncomingEmergency,
        addIncidentFromVision,
        resetDemoData,
        toasts,
        addToast,
        removeToast,
        isSimulatingAi,
        isAuthenticated,
        user,
        login,
        logout,
        stats: {
          totalActiveIncidents,
          criticalCasesCount,
          totalPeopleAffected,
          availableRescueTeamsCount
        }
      }}
    >
      {children}
    </DisasterContext.Provider>
  );
};

export const useDisaster = () => {
  const context = useContext(DisasterContext);
  if (!context) {
    throw new Error('useDisaster must be used within a DisasterProvider');
  }
  return context;
};
