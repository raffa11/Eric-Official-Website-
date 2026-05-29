/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Competition, Registration } from '../types';

export const OFFICIAL_COMPETITIONS: Competition[] = [
  {
    id: 'SUMO500',
    name: 'Sumobot 500G',
    tagline: 'Speed, traction & autonomic push torque calibration',
    shortDesc: 'Design lightweight, high-traction mobile robots to locate and push opponents out of the circular Ring Dohyo completely autonomously.',
    longDesc: 'The Sumobot 500G challenge tests structural grip, wheel motor torque, infrared opponent tracking algorithms, and edge sensor latency. Robots must weigh less than 500 grams and execute fully autonomous tactics within the designated Dohyo circle.',
    iconName: 'ShieldAlert',
    status: 'Open',
    teamSize: { min: 1, max: 3 },
    feeUSD: 15,
    feeIDR: 225000,
    feeIDRText: 'Rp225.000',
    targetAudience: 'Public / Umum',
    techRequirements: [
      'Strict weight limit of 500 grams including batteries',
      'Autonomous search-and-push sensor algorithms',
      'Cannot damage or stick to the Dohyo floor surface'
    ],
    schedule: 'September 22, 2026 - Main Arena Kampus A UNJ',
    timeline: [
      { step: 'Registration Window', date: 'Jul 1 – Aug 31, 2026' },
      { step: 'Technical Meeting (TM)', date: 'Sep 15, 2026' },
      { step: 'Main Arena Phase', date: 'Sep 22–24, 2026' }
    ]
  },
  {
    id: 'SUMO3KG',
    name: 'Sumobot 3KG',
    tagline: 'Heavy-metal kinetic combat & maximum mechanical grip',
    shortDesc: 'Deploy heavy, ultra-grip autonomous steel machines to engage in high-torque combat and conquer the arena Dohyo.',
    longDesc: 'Our premier heavy class. Robots weighing up to 3000 grams engage in powerful pushes. This track tests advanced mechanical engineering, motor controller sizing, chassis protection, and magnetic/friction optimization.',
    iconName: 'Trophy',
    status: 'Open',
    teamSize: { min: 2, max: 4 },
    feeUSD: 17,
    feeIDR: 250000,
    feeIDRText: 'Rp250.000',
    targetAudience: 'Public / Umum',
    techRequirements: [
      'Weight limit strictly under 3000 grams',
      'Supports immediate safety remote power deactivation',
      'Magnetic force amplification parameters allowed within size bounds'
    ],
    schedule: 'September 22, 2026 - Heavy Arena Kampus A UNJ',
    timeline: [
      { step: 'Registration Window', date: 'Jul 1 – Aug 31, 2026' },
      { step: 'Technical Meeting (TM)', date: 'Sep 15, 2026' },
      { step: 'Main Arena Phase', date: 'Sep 22–24, 2026' }
    ]
  },
  {
    id: 'LINE_MICRO',
    name: 'Line Follower Micro',
    tagline: 'PID high-speed trajectory line tracking & sharp corner calibration',
    shortDesc: 'Program high-speed micro-mice to follow highly intricate path lines using customized sensor grids and extreme motor controls.',
    longDesc: 'A fast-paced competition testing precision PID controller loops, sensor grid integration, and curve navigation. Participants build small wheeled robots that must read reflective tracks and traverse them in the minimum possible duration.',
    iconName: 'Shuffle',
    status: 'Open',
    teamSize: { min: 1, max: 3 },
    feeUSD: 17,
    feeIDR: 250000,
    feeIDRText: 'Rp250.000',
    targetAudience: 'Students / Siswa',
    techRequirements: [
      'Micro form factors strictly under 20cm x 20cm',
      'Onboard real-time calculations without external computing aid',
      'IR light reflection grid with minimum 8 sensor channels'
    ],
    schedule: 'September 23, 2026 - Laboratory Zone Kampus A UNJ',
    timeline: [
      { step: 'Registration Window', date: 'Jul 1 – Aug 31, 2026' },
      { step: 'Technical Meeting (TM)', date: 'Sep 15, 2026' },
      { step: 'Main Arena Phase', date: 'Sep 22–24, 2026' }
    ]
  },
  {
    id: 'SOCCER',
    name: 'Mini Soccerbot',
    tagline: 'Tactical remote field goal mechanics & rapid omnidirectional physics',
    shortDesc: 'Engineer mobile soccer robots to out-dribble, pass, and shoot goals in an intense tournament field against rival machines.',
    longDesc: 'The Mini Soccerbot challenge brings competitive sports to remote-operated and semi-autonomous robotics. Teams optimize speed, steering, ball grabbing, and kicking mechanism logic, coordinating under fast-paced tournament pressure.',
    iconName: 'Dribbble',
    status: 'Open',
    teamSize: { min: 2, max: 4 },
    feeUSD: 17,
    feeIDR: 250000,
    feeIDRText: 'Rp250.000',
    targetAudience: 'Public / Umum',
    techRequirements: [
      'Safe encrypted wireless teleoperation controls',
      'Optimized active kickers/grippers and omnidirectional wheels',
      'Maximum robot dimensions must meet standard soccer container bounds'
    ],
    schedule: 'September 23, 2026 - Astro Arena X Kampus A UNJ',
    timeline: [
      { step: 'Registration Window', date: 'Jul 1 – Aug 31, 2026' },
      { step: 'Technical Meeting (TM)', date: 'Sep 15, 2026' },
      { step: 'Main Arena Phase', date: 'Sep 22–24, 2026' }
    ]
  },
  {
    id: 'PLC_IND',
    name: 'PLC Industrial',
    tagline: 'Ladder logic, sequence automation & real-world cyber-physical grids',
    shortDesc: 'Program industrial PLC controllers to perform complex automation tasks, belt sortings, and actuator sequences.',
    longDesc: 'Tests industrial automation skills on PLCs. Participants program standard ladder logic, functional codes, or sequential maps to handle sorting bins, predictive emergency overrides, pneumatic arm feeds, and live manufacturing simulations.',
    iconName: 'Layers',
    status: 'Filling Fast',
    teamSize: { min: 2, max: 3 },
    feeUSD: 19,
    feeIDR: 280000,
    feeIDRText: 'Rp280.000',
    targetAudience: 'University / Mahasiswa',
    techRequirements: [
      'Hardware controller compatibilities (e.g. Siemens, Omron, Schneider)',
      'Zero pre-programmed templates; code must be written on-site during challenge',
      'Must adhere to ISO standard industrial functional safety protocols'
    ],
    schedule: 'September 24, 2026 - Industrial Lab FT UNJ',
    timeline: [
      { step: 'Registration Window', date: 'Jul 1 – Aug 31, 2026' },
      { step: 'Technical Meeting (TM)', date: 'Sep 15, 2026' },
      { step: 'Main Arena Phase', date: 'Sep 22–24, 2026' }
    ]
  },
  {
    id: 'CREATIVE',
    name: 'Creative Innovation',
    tagline: 'Open-ended technology solutions for Smart Cities & Society 5.0',
    shortDesc: 'Structure applicable IoT systems, custom automation products, or green tech models that solve immediate community needs.',
    longDesc: 'An open-category prototype exhibition where junior and senior high school students display creative electronics projects. Submissions are judged on practical societal impact, engineering feasibility, presentation quality, and creative coding.',
    iconName: 'Cpu',
    status: 'Open',
    teamSize: { min: 2, max: 5 },
    feeUSD: 8,
    feeIDR: 120000,
    feeIDRText: 'Rp120.000',
    targetAudience: 'Junior & Senior HS / Siswa',
    techRequirements: [
      'Functional physical prototype must be demonstrated to the jury',
      'No pre-assembled commercial toys allowed; original CAD/wiring must be shown',
      'Include a 3-page project synopsis document explaining problem statement'
    ],
    schedule: 'September 24, 2026 - Exhibition Hall Kampus A UNJ',
    timeline: [
      { step: 'Registration Window', date: 'Jul 1 – Aug 31, 2026' },
      { step: 'Technical Meeting (TM)', date: 'Sep 15, 2026' },
      { step: 'Exhibition & Award Gala', date: 'Sep 22–24, 2026' }
    ]
  },
  {
    id: 'RIC',
    name: 'Research Innovation Challenge (RIC)',
    tagline: 'Scientific analysis, AI model linkages & deep IoT research reviews',
    shortDesc: 'Submit and defend highly advanced robotics research papers and cloud-integrated solutions before academic juries.',
    longDesc: 'RIC is a prestigious scientific sandbox for university students to share original studies in AI, deep machine learning models, cloud industrial networks, biomechatronics, or advanced sensor telemetry. It requires high-quality research papers and rigorous peer-defense before regional and international professors.',
    iconName: 'Compass',
    status: 'Open',
    teamSize: { min: 2, max: 5 },
    feeUSD: 8,
    feeIDR: 120000,
    feeIDRText: 'Rp120.000',
    targetAudience: 'University / Mahasiswa',
    techRequirements: [
      'Submit full PDF scientific paper adhering to official IEEE format templates',
      'Provide working software simulation code or active physical hardware models',
      'Live 15-minute presentation followed by continuous Q&A peer review session'
    ],
    schedule: 'September 22, 2026 - Conference Theater Kampus A UNJ',
    timeline: [
      { step: 'Registration Window', date: 'Jul 1 – Aug 31, 2026' },
      { step: 'Technical Meeting (TM)', date: 'Sep 15, 2026' },
      { step: 'Main Arena Phase', date: 'Sep 22–24, 2026' }
    ]
  },
  {
    id: 'DRONE',
    name: 'Drone Innovation',
    tagline: 'Autonomous aerial flight, obstacle traversal & payload delivery',
    shortDesc: 'Program or guide aerial drones to autonomously navigate localized hoops, carry specific weight metrics, and map terrains safely.',
    longDesc: 'Drone Innovation features agile airframe dynamics navigating vertical grids. The challenge rewards stability, edge vision detection, smart throttle response, and precise landing in dynamic environments. Safeties and weight margins are evaluated rigorously.',
    iconName: 'Wind',
    status: 'Open',
    teamSize: { min: 2, max: 4 },
    feeUSD: 15,
    feeIDR: 220000,
    feeIDRText: 'Rp220.000',
    targetAudience: 'Public / Umum',
    techRequirements: [
      'Takeoff weight must be under standard physical thresholds',
      'Integrated active emergency visual safety indicators',
      'Onboard stabilization flight controller mandatory'
    ],
    schedule: 'September 23, 2026 - Outdoor Flight Dome Kampus A UNJ',
    timeline: [
      { step: 'Registration Window', date: 'Jul 1 – Aug 31, 2026' },
      { step: 'Technical Meeting (TM)', date: 'Sep 15, 2026' },
      { step: 'Main Arena Phase', date: 'Sep 22–24, 2026' }
    ]
  },
  {
    id: 'COLLAB',
    name: 'Collaborative Robots',
    tagline: 'Machine-human safety configurations & multi-hand precision arrays',
    shortDesc: 'Program collaborative robotic manipulators (Cobots) to safely perform sorting, assembly, and synchronized operational workflows.',
    longDesc: 'A specialized track for vocational high school students focusing on factory manipulator automation, inverse kinematics coordination, safe speed control parameters, and dynamic coordinate sensors. Develop clean solutions mirroring next-generation manufacturing workspaces.',
    iconName: 'Cpu',
    status: 'Open',
    teamSize: { min: 2, max: 3 },
    feeUSD: 12,
    feeIDR: 180000,
    feeIDRText: 'Rp180.000',
    targetAudience: 'Vocational High School / SMK',
    techRequirements: [
      'Cobot arms must use force-limiter fail-safe bounds',
      'Safe manual and automatic override controls configuration',
      'High accuracy sorting under tight tolerances'
    ],
    schedule: 'September 24, 2026 - Vocational Pavilion Kampus A UNJ',
    timeline: [
      { step: 'Registration Window', date: 'Jul 1 – Aug 31, 2026' },
      { step: 'Technical Meeting (TM)', date: 'Sep 15, 2026' },
      { step: 'Main Arena Phase', date: 'Sep 22–24, 2026' }
    ]
  }
];

export const MOCK_INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: 'REG-90812',
    competitionId: 'SUMO500',
    teamName: 'NanoNav Express',
    institution: 'Zurich Institute of Robotics',
    teamLeader: 'Dr. Sarah Jenkins',
    whatsapp: '+41 79 123 4567',
    members: ['Alex Rivers', 'Elena Rostova'],
    regDate: '2026-05-10T14:32:00Z',
    paymentStatus: 'Approved',
    paymentMethod: 'Card',
    transactionId: 'TXN-SUMO500-8820981'
  },
  {
    id: 'REG-56291',
    competitionId: 'SUMO3KG',
    teamName: 'Kinetic Grips',
    institution: 'Tokyo University of Science',
    teamLeader: 'Kenji Takahashi',
    whatsapp: '+81 90 9876 5432',
    members: ['Yuki Sato', 'Hiroshi Tanaka', 'Sora Watanabe'],
    regDate: '2026-05-15T09:12:00Z',
    paymentStatus: 'Technical Review',
    paymentMethod: 'Card',
    transactionId: 'TXN-SUMO3KG-7719623'
  },
  {
    id: 'REG-88219',
    competitionId: 'DRONE',
    teamName: 'HexaGlide Autonomy',
    institution: 'MIT Robotics lab',
    teamLeader: 'Marcus Sterling',
    whatsapp: '+1 (617) 555-0143',
    members: ['Janelle Ortiz', 'Chloe Vance', 'Nate Peterson'],
    regDate: '2026-05-20T17:40:00Z',
    paymentStatus: 'Pending',
    paymentMethod: null,
    transactionId: null
  },
  {
    id: 'REG-12490',
    competitionId: 'LINE_MICRO',
    teamName: 'Abyssal Voyager',
    institution: 'National University of Singapore',
    teamLeader: 'Lim Wei Xian',
    whatsapp: '+65 9123 4567',
    members: ['Aaron Tan', 'Clara Lim', 'Zackary Ng', 'Siddharth Nair'],
    regDate: '2026-05-22T03:55:00Z',
    paymentStatus: 'Approved',
    paymentMethod: 'QRIS',
    transactionId: 'TXN-LINE_MICRO-1144211'
  },
  {
    id: 'REG-43180',
    competitionId: 'SOCCER',
    teamName: 'Titanium Bash',
    institution: 'Munich Applied Sciences',
    teamLeader: 'Fabian Meyer',
    whatsapp: '+49 89 223344',
    members: ['Lukas Weber', 'Julia Scholz'],
    regDate: '2026-05-24T12:00:00Z',
    paymentStatus: 'Rejected',
    paymentMethod: 'Card',
    transactionId: 'TXN-SOCCER-9900827'
  },
  {
    id: 'REG-75482',
    competitionId: 'PLC_IND',
    teamName: 'Striker Bipeds',
    institution: 'Stanford University AI Lab',
    teamLeader: 'Ananya Roy',
    whatsapp: '+1 (650) 555-0925',
    members: ['Liam O\'Connor', 'Mikaela Sjöberg'],
    regDate: '2026-05-25T11:24:00Z',
    paymentStatus: 'Technical Review',
    paymentMethod: 'Card',
    transactionId: 'TXN-PLC_IND-3569874'
  },
  {
    id: 'REG-22108',
    competitionId: 'CREATIVE',
    teamName: 'Vector Swifte',
    institution: 'IIT Powai',
    teamLeader: 'Arjun Mehta',
    whatsapp: '+91 98220 12345',
    members: ['Riya Sharma'],
    regDate: '2026-05-26T08:14:00Z',
    paymentStatus: 'Approved',
    paymentMethod: 'QRIS',
    transactionId: 'TXN-CREATIVE-4589211'
  },
  {
    id: 'REG-63412',
    competitionId: 'RIC',
    teamName: 'IIoT Orchestrate',
    institution: 'Seoul National University',
    teamLeader: 'Park Sung-young',
    whatsapp: '+82 10 1234 5678',
    members: ['Kim Min-ji', 'Lee Tae-jun', 'Choi Ji-woo'],
    regDate: '2026-05-27T16:45:00Z',
    paymentStatus: 'Pending',
    paymentMethod: null,
    transactionId: null
  }
];
