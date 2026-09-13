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

  const resolveIncident = (incidentId) => {
    const targetIncident = incidents.find(i => i.id === incidentId);
    if (!targetIncident || targetIncident.status === 'Resolved') return;

    setIncidents(prev => prev.map(incident => (
      incident.id === incidentId
        ? {
            ...incident,
            status: 'Resolved',
            priority: 'Resolved',
            severity: 'Resolved',
            timeline: [
              ...incident.timeline,
              {
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                text: 'Incident marked resolved by operations command'
              }
            ]
          }
        : incident
    )));

    if (targetIncident.assignedTeam) {
      setRescueTeams(prev => prev.map(team => (
        team.id === targetIncident.assignedTeam
          ? { ...team, status: 'Available', assignedIncidentId: null }
          : team
      )));
    }

    setActivityLog(prev => [{
      id: 'ACT-' + Date.now(),
      type: 'resolved',
      icon: 'CheckCircle2',
      text: `${targetIncident.title} marked resolved`,
      time: 'Just now',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    }, ...prev]);
    soundFX.playSuccess();
    addToast('Incident Resolved', `${targetIncident.title} has been closed and returned to the incident log.`, 'success');
  };

  const deployResource = (resourceId, incidentId) => {
    const resource = resources.find(item => item.id === resourceId);
    const incident = incidents.find(item => item.id === incidentId);
    if (!resource || !incident || resource.status === 'Deployed') return;

    setResources(prev => prev.map(item => (
      item.id === resourceId
        ? { ...item, status: 'Deployed', assignedIncidentId: incidentId }
        : item
    )));
    setActivityLog(prev => [{
      id: 'ACT-' + Date.now(),
      type: 'resource',
      icon: 'Send',
      text: `${resource.name} deployed to ${incident.location}`,
      time: 'Just now',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
    }, ...prev]);
    addToast('Resource Deployed', `${resource.name} is now assigned to ${incident.title}.`, 'success');
  };

   // Send an emergency report to the real FastAPI + ML pipeline
  const simulateIncomingEmergency = async (customReportText) => {
    soundFX.playEmergencyAlert();
    setIsSimulatingAi(true);

 const demoReports = [
  'Heavy rainfall has caused severe flooding in the village. Around 40 people are trapped inside their houses. Flood water has entered several homes and one person is seriously injured and needs immediate medical help.',

  'A major landslide has blocked the mountain road near the village. Several houses are damaged and around 18 people are trapped. Rescue teams with heavy equipment are urgently needed.',

  'A strong earthquake has struck the area. Several buildings have collapsed and around 30 people may be trapped under the debris. Multiple people are injured and require immediate medical assistance.',

  'Extreme rainfall has caused a sudden cloudburst near the village. Roads are flooded and around 12 people are stranded on rooftops. Emergency rescue teams are required immediately.'
];

const demoIndex = incidents.length % demoReports.length;

const rawText =
  customReportText || demoReports[demoIndex];
    try {
      // Your FastAPI backend
     const response = await fetch('https://resqai-backend-029v.onrender.com/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: rawText,
          latitude: 26.1445,
          longitude: 91.7362
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || `Backend error: ${response.status}`
        );
      }

      const data = await response.json();

      console.log('REAL AI ANALYSIS:', data);

      const reportId = `REP-${String(reports.length + 1).padStart(3, '0')}`;
      const newIncId = `INC-${100 + incidents.length + 1}`;

      // Create report using REAL ML output
      const newReport = {
        id: reportId,
        rawText: rawText,
        source: 'Citizen SOS Network (Live Feed)',
        sender: 'Emergency Report',
        timestamp: 'Just now',
        status: 'AI PROCESSED',
        confidence: 100,

        extracted: {
          location: `${data.incident.latitude}, ${data.incident.longitude}`,
          peopleAffected: data.ai_analysis.people_affected,
          disaster: data.ai_analysis.disaster_type,
          priority: data.priority.level,
          medicalHelp: data.ai_analysis.medical_required
            ? 'Required'
            : 'Not Required',
          resourcesNeeded: data.resources.join(', '),
          keyEntities: [
            data.ai_analysis.disaster_type,
            `${data.ai_analysis.people_affected} people affected`,
            data.ai_analysis.people_trapped ? 'People trapped' : 'No people trapped',
            data.ai_analysis.medical_required ? 'Medical help required' : 'No medical help required'
          ]
        }
      };

      // Create incident using REAL ML output
      const newIncident = {
        id: newIncId,
        title: `${data.ai_analysis.disaster_type.toUpperCase()} Emergency`,
        disaster: data.ai_analysis.disaster_type,
        location: `${data.incident.latitude.toFixed(4)}, ${data.incident.longitude.toFixed(4)}`,
        coordinates: [
          data.incident.latitude,
          data.incident.longitude
        ],

        peopleAffected: data.ai_analysis.people_affected,
        injured: data.ai_analysis.medical_required ? 1 : 0,

        priority: data.priority.level,
        severity:
          data.ai_analysis.severity.charAt(0).toUpperCase() +
          data.ai_analysis.severity.slice(1),

        status: 'Active',
        reportedAt: 'Just now',

        medicalHelp: data.ai_analysis.medical_required
          ? 'Required'
          : 'Not Required',

        description: rawText,

        recommendedTeamId:
          data.rescue_assignment?.team_id || null,

        recommendedTeamName:
          data.rescue_assignment?.team_id
            ? `AI Recommended ${data.rescue_assignment.team_id}`
            : 'No team recommended',

        etaMinutes: null,

        distanceKm:
          data.rescue_assignment?.distance_km ?? null,

        requiredEquipment: data.resources,

        aiRationale: [
          `AI classified disaster as ${data.ai_analysis.disaster_type}`,
          `AI classified severity as ${data.ai_analysis.severity}`,
          `Priority score: ${data.priority.score}`,
          `Required resources: ${data.resources.join(', ')}`,
          data.rescue_assignment
            ? `Best rescue team: ${data.rescue_assignment.team_id}`
            : 'No rescue team available'
        ],

        assignedTeam: null,

        timeline: [
          {
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            }),
            text: 'Emergency report received by ResQAI'
          },
          {
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            }),
            text: `AI classified ${data.ai_analysis.disaster_type} / ${data.ai_analysis.severity}`
          },
          {
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            }),
            text: `Priority calculated as ${data.priority.level} with score ${data.priority.score}`
          }
        ]
      };

      // Update frontend state
      setReports(prev => [newReport, ...prev]);
      setSelectedReportId(reportId);

      setIncidents(prev => [newIncident, ...prev]);
      setSelectedIncidentId(newIncId);

      // Activity feed
      setActivityLog(prev => [
        {
          id: 'ACT-' + Date.now(),
          type: 'report',
          icon: 'AlertCircle',
          text: `🚨 AI Emergency: ${data.ai_analysis.disaster_type.toUpperCase()} — ${data.priority.level}`,
          time: 'Just now',
          badgeColor: 'text-red-400 bg-red-500/10 border-red-500/30'
        },
        ...prev
      ]);

      soundFX.playAiChime();

      addToast(
        '🚨 AI Emergency Identified',
        `${data.ai_analysis.disaster_type.toUpperCase()} classified as ${data.priority.level}. ${data.rescue_assignment?.team_id || 'No team'} recommended.`,
        'critical'
      );

      console.log('AI PIPELINE RESULT:', data);

    } catch (error) {
      console.error('AI backend error:', error);

      addToast(
        '❌ AI Analysis Failed',
        error.message || 'Could not connect to the FastAPI backend.',
        'critical'
      );
    } finally {
      setIsSimulatingAi(false);
    }
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
        setResources,
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
        resolveIncident,
        deployResource,
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
