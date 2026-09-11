// Initial Realistic Mock Data for ResQAI Command Center

export const initialIncidents = [
  {
    id: 'INC-101',
    title: 'Bridge A Flash Flood',
    disaster: 'Flood',
    location: 'Bridge A (North Valley Road)',
    coordinates: [28.7041, 77.1025],
    peopleAffected: 20,
    injured: 1,
    priority: 'P1 Critical',
    severity: 'Critical',
    status: 'Active',
    reportedAt: '12 mins ago',
    medicalHelp: 'Required',
    description: '20 people are trapped on the north abutment of Bridge A due to sudden surge in river levels. 1 person reported seriously injured by floating debris.',
    recommendedTeamId: 'TEAM-03',
    recommendedTeamName: 'Rescue Team 3 (Water Rescue & Marine)',
    etaMinutes: 8,
    distanceKm: 2.1,
    requiredEquipment: ['Rescue Boat', 'Paramedic Trauma Kit', 'Life Vests', 'Inflatable Raft'],
    aiRationale: [
      'Closest available response team (2.1 km)',
      'Equipped with 2 motorized rescue boats',
      'Rapid ETA of 8 minutes vs 22 minutes for Team 1',
      'Certified swift-water rescue personnel on board'
    ],
    assignedTeam: null, // will update to TEAM-03 when assigned
    timeline: [
      { time: '10:41 AM', text: 'First distress call logged via citizen SMS feed' },
      { time: '10:42 AM', text: 'ResQAI NLP engine classified as P1 Critical Flood' },
      { time: '10:43 AM', text: 'Automated satellite flood boundary overlay matched' },
      { time: '10:45 AM', text: 'Rescue Team 3 recommended with 98% compatibility' }
    ]
  },
  {
    id: 'INC-102',
    title: 'Mountain Road Landslide & Bus Blockade',
    disaster: 'Landslide',
    location: 'Mountain Road km 14, Sector 7',
    coordinates: [28.7450, 77.1350],
    peopleAffected: 14,
    injured: 3,
    priority: 'P1 Critical',
    severity: 'Critical',
    status: 'Active',
    reportedAt: '18 mins ago',
    medicalHelp: 'Required',
    description: 'Massive debris flow buried 120m of highway, trapping a tourist shuttle with 14 passengers. Rocks still unstable on the upper slope.',
    recommendedTeamId: 'TEAM-01',
    recommendedTeamName: 'Rescue Team 1 (Heavy Extrication)',
    etaMinutes: 14,
    distanceKm: 4.5,
    requiredEquipment: ['Heavy Cutting Tools', 'Ambulance', 'Shoring Kit', 'Drone Recon'],
    aiRationale: [
      'Equipped with hydraulic spreaders & heavy winches',
      'Includes trauma physician & mobile field stretcher',
      'Equipped with thermal drone for rock stability inspection'
    ],
    assignedTeam: null,
    timeline: [
      { time: '10:35 AM', text: 'Police radio report received' },
      { time: '10:36 AM', text: 'Road blockage registered in GIS network' },
      { time: '10:38 AM', text: 'AI flagged critical structural danger' }
    ]
  },
  {
    id: 'INC-103',
    title: 'Village B Sudden Cloudburst',
    disaster: 'Cloudburst',
    location: 'Village B Lowlands',
    coordinates: [28.6650, 77.0600],
    peopleAffected: 8,
    injured: 0,
    priority: 'P2 High',
    severity: 'High',
    status: 'Active',
    reportedAt: '24 mins ago',
    medicalHelp: 'Standby',
    description: 'Intense cloudburst flooded 6 homes. Elderly residents need evacuation to higher ground.',
    recommendedTeamId: 'TEAM-05',
    recommendedTeamName: 'Rescue Team 5 (Rapid Evacuation)',
    etaMinutes: 11,
    distanceKm: 3.4,
    requiredEquipment: ['4x4 High-Clearance Troop Carrier', 'Emergency Rations', 'Blankets'],
    aiRationale: [
      'High ground clearance vehicle suited for mud tracks',
      'Experienced in elder care evacuation'
    ],
    assignedTeam: null,
    timeline: [
      { time: '10:29 AM', text: 'Panchayat emergency dispatch report' },
      { time: '10:31 AM', text: 'AI categorized as High Evacuation Priority' }
    ]
  },
  {
    id: 'INC-104',
    title: 'River Valley Flash Flood Watch',
    disaster: 'Flood',
    location: 'River Valley Settlement',
    coordinates: [28.6900, 77.1650],
    peopleAffected: 5,
    injured: 0,
    priority: 'P3 Moderate',
    severity: 'Moderate',
    status: 'Active',
    reportedAt: '35 mins ago',
    medicalHelp: 'Not Needed',
    description: 'Water level reached warning mark 2. Grazing herds and 2 farm families moving to upper levee.',
    recommendedTeamId: 'TEAM-04',
    recommendedTeamName: 'Rescue Team 4 (Community Logistics)',
    etaMinutes: 20,
    distanceKm: 6.8,
    requiredEquipment: ['Loudspeaker Warning Rig', 'Sandbag Deployment Unit'],
    aiRationale: [
      'Pre-emptive barrier reinforcement recommended',
      'Low urgency allows local volunteer coordination'
    ],
    assignedTeam: null,
    timeline: [
      { time: '10:18 AM', text: 'Water level sensor threshold alarm' }
    ]
  },
  {
    id: 'INC-105',
    title: 'Sector C Power Substation Inundation',
    disaster: 'Infrastructure',
    location: 'Sector C Utility Substation',
    coordinates: [28.7200, 77.0900],
    peopleAffected: 0,
    injured: 0,
    priority: 'Resolved',
    severity: 'Resolved',
    status: 'Resolved',
    reportedAt: '1 hr ago',
    medicalHelp: 'Not Needed',
    description: 'Basement drainage pumps restored. Power restored to 1,200 households.',
    recommendedTeamId: 'TEAM-02',
    recommendedTeamName: 'Rescue Team 2 (Hazmat & Power)',
    etaMinutes: 0,
    distanceKm: 1.5,
    requiredEquipment: ['High-volume De-watering Pumps'],
    aiRationale: ['Operation completed successfully.'],
    assignedTeam: 'TEAM-02',
    timeline: [
      { time: '09:45 AM', text: 'Substation flood alert received' },
      { time: '09:55 AM', text: 'Team 2 dispatched' },
      { time: '10:30 AM', text: 'Water drained and grid stabilized' }
    ]
  }
];

export const initialEmergencyReports = [
  {
    id: 'REP-001',
    rawText: '20 people are trapped near Bridge A. The road is flooded and one person is seriously injured.',
    source: 'Citizen Emergency SOS (Mobile App)',
    sender: '+91 98765 43210',
    timestamp: '2 mins ago',
    status: 'AI PROCESSED',
    confidence: 97.8,
    extracted: {
      location: 'Bridge A (North Valley Road)',
      peopleAffected: 20,
      disaster: 'Flood',
      priority: 'P1 Critical',
      medicalHelp: 'Required (1 Severe)',
      resourcesNeeded: 'Rescue Boat + ALS Ambulance',
      keyEntities: ['Bridge A', '20 people trapped', 'Road flooded', '1 serious injury']
    }
  },
  {
    id: 'REP-002',
    rawText: 'Huge rocks and mud slid down Mountain Road km 14. A tourist bus with about 14 people is stuck. Need ambulance fast, driver is bleeding.',
    source: 'Highway Patrol Radio Transcription',
    sender: 'Patrol Unit Alpha-4',
    timestamp: '8 mins ago',
    status: 'AI PROCESSED',
    confidence: 96.4,
    extracted: {
      location: 'Mountain Road km 14, Sector 7',
      peopleAffected: 14,
      disaster: 'Landslide',
      priority: 'P1 Critical',
      medicalHelp: 'Required (Head Trauma)',
      resourcesNeeded: 'Heavy Cutter + Ambulance + Shoring Rig',
      keyEntities: ['Mountain Road km 14', 'Tourist bus stuck', '14 passengers', 'Debris flow']
    }
  },
  {
    id: 'REP-003',
    rawText: 'Water entering ground floor houses in Village B after sudden heavy cloudburst. Need boats or trucks to shift elderly villagers.',
    source: 'Local Volunteer Dispatch',
    sender: 'Village B Youth Committee',
    timestamp: '15 mins ago',
    status: 'AI PROCESSED',
    confidence: 94.2,
    extracted: {
      location: 'Village B Lowlands',
      peopleAffected: 8,
      disaster: 'Cloudburst / Inundation',
      priority: 'P2 High',
      medicalHelp: 'Standby / Elder Assistance',
      resourcesNeeded: '4x4 High-Clearance Troop Carrier + Blankets',
      keyEntities: ['Village B', 'Cloudburst', '6 homes submerged', '8 elderly citizens']
    }
  },
  {
    id: 'REP-004',
    rawText: 'River water touching the edge of the embankment at River Valley Settlement. No immediate casualties but current is very strong.',
    source: 'Automated Gauge Sensor #R-4',
    sender: 'River Authority Telemetry',
    timestamp: '22 mins ago',
    status: 'AI PROCESSED',
    confidence: 99.1,
    extracted: {
      location: 'River Valley Settlement',
      peopleAffected: 5,
      disaster: 'River Swell',
      priority: 'P3 Moderate',
      medicalHelp: 'Not Needed',
      resourcesNeeded: 'Sandbag Reinforcement + Monitoring Drone',
      keyEntities: ['River Valley', 'Level 2 Warning', '5 farmers in buffer zone']
    }
  },
  {
    id: 'REP-005',
    rawText: 'Blocked drain water pumped out at Sector C substation, transformer secured and tested fine.',
    source: 'Municipal Electricity Board',
    sender: 'Grid Operator 9',
    timestamp: '40 mins ago',
    status: 'RESOLVED',
    confidence: 98.9,
    extracted: {
      location: 'Sector C Utility Substation',
      peopleAffected: 0,
      disaster: 'Infrastructure Failure',
      priority: 'P4 Low / Resolved',
      medicalHelp: 'Not Needed',
      resourcesNeeded: 'De-watering Pumps (Completed)',
      keyEntities: ['Sector C', 'Pump complete', 'Grid online']
    }
  }
];

export const initialRescueTeams = [
  {
    id: 'TEAM-03',
    name: 'Rescue Team 3 (Water Rescue & Marine)',
    status: 'Available',
    assignedIncidentId: null,
    distanceKm: 2.1,
    etaMinutes: 8,
    lead: 'Capt. R. Sharma',
    crewSize: 6,
    equipment: ['Motorized Rescue Boat x2', 'Inflatable Raft x3', 'Paramedic Trauma Kit', 'Life Vests x25'],
    specialization: 'Swift-Water & Flood Extraction',
    aiMatchScore: 98,
    matchRationale: [
      'Closest available unit (2.1 km vs 4.5 km next closest)',
      'Equipped with high-torque watercraft for turbulent floodwaters',
      'Fastest response time (8 mins)',
      'Includes emergency life support paramedic'
    ],
    coordinates: [28.7090, 77.0980]
  },
  {
    id: 'TEAM-01',
    name: 'Rescue Team 1 (Heavy Extrication)',
    status: 'Available',
    assignedIncidentId: null,
    distanceKm: 4.5,
    etaMinutes: 14,
    lead: 'Cmdr. Vikram Singhania',
    crewSize: 8,
    equipment: ['Hydraulic Jaws of Life', 'Ambulance + ICU Bed', 'Shoring Rig', 'Thermal Recon Drone'],
    specialization: 'Structural Collapse & Landslide Clearing',
    aiMatchScore: 92,
    matchRationale: [
      'Heavy cutting & hydraulic tools for crushed vehicles',
      'Includes trauma doctor and mobile triage kit'
    ],
    coordinates: [28.7350, 77.1250]
  },
  {
    id: 'TEAM-05',
    name: 'Rescue Team 5 (Rapid Evacuation)',
    status: 'Available',
    assignedIncidentId: null,
    distanceKm: 3.4,
    etaMinutes: 11,
    lead: 'Lt. Sunita Roy',
    crewSize: 5,
    equipment: ['4x4 High-Clearance Troop Carrier', 'Emergency Rations', 'Foldable Stretchers x4'],
    specialization: 'Elder & Vulnerable Evacuation',
    aiMatchScore: 89,
    matchRationale: [
      'Suited for impassable waterlogged rural terrain',
      'Equipped for rapid mass transport'
    ],
    coordinates: [28.6750, 77.0750]
  },
  {
    id: 'TEAM-02',
    name: 'Rescue Team 2 (Hazmat & Power)',
    status: 'Available',
    assignedIncidentId: null,
    distanceKm: 1.5,
    etaMinutes: 6,
    lead: 'Eng. Amit Verma',
    crewSize: 4,
    equipment: ['High-Volume Diesel Pumps', 'Hazmat Suits', 'Thermal Imager'],
    specialization: 'Utility Drainage & Hazardous Material',
    aiMatchScore: 78,
    matchRationale: ['Specialized in industrial & infrastructure dewatering'],
    coordinates: [28.7180, 77.0930]
  },
  {
    id: 'TEAM-04',
    name: 'Rescue Team 4 (Community Logistics)',
    status: 'Available',
    assignedIncidentId: null,
    distanceKm: 6.8,
    etaMinutes: 20,
    lead: 'Off. Deepak Mehta',
    crewSize: 6,
    equipment: ['PA Sound Vehicle', 'Sandbag Dispenser', 'Portable Lighting Towers'],
    specialization: 'Perimeter Warning & Flood Walls',
    aiMatchScore: 74,
    matchRationale: ['Ideal for levee reinforcement and early warning delivery'],
    coordinates: [28.6850, 77.1550]
  },
  {
    id: 'TEAM-06',
    name: 'Rescue Team 6 (Air Recon & Heli-Drop)',
    status: 'Standby',
    assignedIncidentId: null,
    distanceKm: 9.2,
    etaMinutes: 15,
    lead: 'Wing Cmdr. K. Joshi',
    crewSize: 4,
    equipment: ['ALH Dhruv Chopper Standby', 'Winch System', 'Airdrop Survival Packs'],
    specialization: 'Aerial Winch & Inaccessible Terrain',
    aiMatchScore: 85,
    matchRationale: ['Available for vertical winch extraction if bridges submerge'],
    coordinates: [28.6500, 77.1200]
  },
  {
    id: 'TEAM-07',
    name: 'Rescue Team 7 (K9 Search & Detection)',
    status: 'Available',
    assignedIncidentId: null,
    distanceKm: 5.1,
    etaMinutes: 16,
    lead: 'Handler Priya Sen',
    crewSize: 4,
    equipment: ['3 Trained Disaster Search Canines', 'Acoustic Listening Probes'],
    specialization: 'Victim Detection under Rubble & Silt',
    aiMatchScore: 70,
    matchRationale: ['Specialized scent & audio probes for buried survivors'],
    coordinates: [28.7300, 77.0800]
  },
  {
    id: 'TEAM-08',
    name: 'Rescue Team 8 (Mobile Surgical Unit)',
    status: 'Available',
    assignedIncidentId: null,
    distanceKm: 3.8,
    etaMinutes: 12,
    lead: 'Dr. Anita Desai',
    crewSize: 6,
    equipment: ['Mobile Surgery Bus', 'Blood Bank Reserves', 'Oxygen Cylinders x12'],
    specialization: 'On-Site Critical Stabilization',
    aiMatchScore: 91,
    matchRationale: ['Immediate surgical intervention for multi-trauma casualties'],
    coordinates: [28.7120, 77.1150]
  }
];

export const initialResources = [
  {
    id: 'RES-01',
    name: 'North District Government Hospital',
    type: 'Hospital',
    icon: 'Hospital',
    distanceKm: 3.2,
    status: 'Available',
    capacityStatus: 'High Capacity',
    totalBeds: 250,
    availableBeds: 68,
    icuBedsAvailable: 14,
    oxygenSupply: '98% Full',
    bloodUnits: '142 Units',
    contact: '+91 11 2789 0001',
    coordinates: [28.7100, 77.1100]
  },
  {
    id: 'RES-02',
    name: 'Valley Trauma & Emergency Center',
    type: 'Hospital',
    icon: 'Hospital',
    distanceKm: 4.8,
    status: 'Available',
    capacityStatus: 'Moderate',
    totalBeds: 120,
    availableBeds: 22,
    icuBedsAvailable: 5,
    oxygenSupply: '92% Full',
    bloodUnits: '64 Units',
    contact: '+91 11 2789 4455',
    coordinates: [28.6980, 77.1350]
  },
  {
    id: 'RES-03',
    name: 'Community Center Shelter Alpha',
    type: 'Shelter',
    icon: 'Home',
    distanceKm: 2.8,
    status: 'Available',
    capacityStatus: 'Ready for Intake',
    totalBeds: 350,
    availableBeds: 240,
    foodSuppliesDays: 7,
    potableWaterLitres: '15,000L',
    contact: '+91 11 2789 8899',
    coordinates: [28.7150, 77.0850]
  },
  {
    id: 'RES-04',
    name: 'Govt High School Relief Shelter',
    type: 'Shelter',
    icon: 'Home',
    distanceKm: 5.4,
    status: 'Available',
    capacityStatus: 'Ready for Intake',
    totalBeds: 500,
    availableBeds: 420,
    foodSuppliesDays: 10,
    potableWaterLitres: '25,000L',
    contact: '+91 11 2789 2211',
    coordinates: [28.6720, 77.0900]
  },
  {
    id: 'RES-05',
    name: 'Central Fire & Disaster Station 4',
    type: 'Fire Station',
    icon: 'Flame',
    distanceKm: 3.5,
    status: 'Operational',
    capacityStatus: '5 Tenders Ready',
    crewOnDuty: 24,
    contact: '101 / +91 11 2789 1010',
    coordinates: [28.7050, 77.0950]
  },
  {
    id: 'RES-06',
    name: 'North Sector Police HQ',
    type: 'Police Station',
    icon: 'Shield',
    distanceKm: 2.9,
    status: 'Operational',
    capacityStatus: 'Traffic Cordon Active',
    crewOnDuty: 40,
    contact: '112 / +91 11 2789 1122',
    coordinates: [28.7190, 77.1080]
  },
  {
    id: 'RES-07',
    name: 'Helipad Alpha (Sports Complex Ground)',
    type: 'Helipad',
    icon: 'Plane',
    distanceKm: 4.1,
    status: 'Clear for Landing',
    capacityStatus: '2 Helipads Clear',
    coordinates: [28.7250, 77.1200]
  }
];

export const initialRoadBlocks = [
  {
    id: 'BLK-01',
    name: 'Bridge A North Approach Submerged',
    reason: 'River Flood Water (1.2m deep)',
    coordinates: [
      [28.7030, 77.1010],
      [28.7060, 77.1040]
    ],
    status: 'Closed'
  },
  {
    id: 'BLK-02',
    name: 'Mountain Road km 14 Landslide Barrier',
    reason: 'Debris Flow & Boulder Blockade',
    coordinates: [
      [28.7420, 77.1320],
      [28.7480, 77.1380]
    ],
    status: 'Closed'
  }
];

export const initialActivityLog = [
  {
    id: 'ACT-1',
    type: 'report',
    icon: 'AlertCircle',
    text: 'New emergency report received from Bridge A via SOS app',
    time: '2 minutes ago',
    badgeColor: 'text-red-400 bg-red-500/10 border-red-500/30'
  },
  {
    id: 'ACT-2',
    type: 'ai',
    icon: 'Cpu',
    text: 'AI identified a critical flood incident & estimated 20 victims trapped',
    time: '4 minutes ago',
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
  },
  {
    id: 'ACT-3',
    type: 'merge',
    icon: 'GitMerge',
    text: '3 duplicate citizen calls merged into Bridge A incident record',
    time: '6 minutes ago',
    badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
  },
  {
    id: 'ACT-4',
    type: 'recommend',
    icon: 'Zap',
    text: 'AI generated Rescue Team 3 deployment plan (98% match)',
    time: '7 minutes ago',
    badgeColor: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
  },
  {
    id: 'ACT-5',
    type: 'hospital',
    icon: 'Hospital',
    text: 'District Hospital alerted for 1 serious trauma patient reception',
    time: '10 minutes ago',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
  }
];
