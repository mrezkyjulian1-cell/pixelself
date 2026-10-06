// Portfolio Data for JULIAN.EXE (16-Bit RPG Experience)

export const CHARACTER_DATA = {
  name: "REZKY",
  nickname: "Rez",
  title: "Creative Explorer & Student",
  level: 16,
  classType: "STUDENT / CREATIVE EXPLORER",
  currentQuest: "BUILDING MY FUTURE",
  status: "READY",
  education: "SMK / High School Student",
  major: "Rekayasa Perangkat Lunak (Software Engineering)",
  location: "Indonesia",
  personality: "Curious, Adaptable, Creative Thinker (INTP vibe)",
  bio: "Halo! I'm Rezky, a 16-year-old student passionate about building digital experiences, exploring creative technology, running under the night sky, and enjoying good music. Welcome to my personal game world!",
  quote: "“Life is an open-world RPG — choose your own quests, level up your curiosity, and enjoy every side quest.”",
  funFacts: [
    { icon: "☕", label: "Fuel", value: "Cold brew & midnight focus sessions" },
    { icon: "🏎️", label: "Weekend Ritual", value: "Formula 1 Grand Prix races" },
    { icon: "🏃", label: "Mind Reset", value: "Night runs with synthwave in ears" },
    { icon: "👾", label: "Aesthetic", value: "16-bit JRPGs & cozy pixel art" },
    { icon: "🎧", label: "Soundtrack", value: "A curated playlist for every mood" },
  ],
  currentlyLearning: [
    "Modern React component architecture & animation libraries",
    "AI agents & autonomous workflow integration",
    "Interactive Canvas / Web Audio synthesis",
    "System optimization & clean code architecture"
  ],
  stats: [
    { name: "CREATIVITY", value: 88, max: 100, bar: "█████████░" },
    { name: "CURIOSITY", value: 95, max: 100, bar: "█████████░" },
    { name: "PROBLEM SOLVING", value: 78, max: 100, bar: "████████░░" },
    { name: "LEARNING SPEED", value: 92, max: 100, bar: "█████████░" },
    { name: "STAMINA (RUNNING)", value: 82, max: 100, bar: "████████░░" },
    { name: "MUSIC SENSE", value: 99, max: 100, bar: "██████████" },
  ],
  equipment: [
    { slot: "HEAD", name: "Thinker's Headband", perk: "+15 Creative Focus" },
    { slot: "BODY", name: "Hoodie of Cozy Focus", perk: "+25 Late Night Stamina" },
    { slot: "MAIN HAND", name: "Mechanical Keyboard", perk: "+30 Typing Rhythm" },
    { slot: "OFF HAND", name: "Iced Cold Brew", perk: "+40 Alertness" },
    { slot: "FEET", name: "Cushioned Running Shoes", perk: "+50 Speed & Clear Mind" },
  ]
};

export const HOBBIES_DATA = [
  {
    id: "gaming",
    title: "GAMING",
    icon: "🎮",
    category: "Entertainment",
    tagline: "Exploring virtual worlds & retro classics",
    details: {
      favoriteGames: ["Chrono Trigger", "Pokémon Emerald", "Hades", "Valorant", "Minecraft"],
      favoriteGenres: ["JRPG", "Roguelike", "Tactical Strategy", "Indie Sandbox"],
      platforms: ["PC", "Nintendo Switch"],
      currentlyPlaying: "Hades II & Persona 5 Royal",
      story: "Games taught me how systems interconnect and the beauty of interactive storytelling. 16-bit pixel art JRPGs specifically inspired the aesthetic of this entire website!"
    }
  },
  {
    id: "running",
    title: "RUNNING",
    icon: "🏃",
    category: "Physical Activity",
    tagline: "Clearing the mind, one kilometer at a time",
    details: {
      activity: "Road Running & Night Pacing",
      milestones: ["Completed 10K road run", "Sub-28 minute 5K pace", "50+ total running sessions logged"],
      bestEnvironment: "Cool evening breeze under city streetlights",
      runningSoundtrack: "Synthwave, high-BPM phonk & upbeat chiptune",
      story: "Whenever a coding bug feels unsolvable, putting on running shoes and hitting the pavement is the ultimate mental defragmenter. Ideas flow naturally when the feet keep moving."
    }
  },
  {
    id: "f1",
    title: "FORMULA 1",
    icon: "🏎️",
    category: "Motorsport",
    tagline: "High-speed aerodynamics & telemetry madness",
    details: {
      passion: "The intersection of extreme mechanical engineering, aerodynamic data, and human nerve",
      favoriteTeams: ["Scuderia Ferrari", "McLaren F1 Team"],
      favoriteDrivers: ["Charles Leclerc", "Lando Norris"],
      whatAttractsMe: "Real-time telemetry, tire degradation strategies, split-second pit stops, and the relentless quest for milliseconds of lap time.",
      story: "Sundays are sacred for Grand Prix races. Analyzing pit stop strategies and race pace is just like debugging complex distributed systems under high pressure!"
    }
  },
  {
    id: "reading",
    title: "READING",
    icon: "📚",
    category: "Literature",
    tagline: "Immersing in stories, manga, and knowledge",
    details: {
      novelGenres: ["Sci-Fi", "Dystopian", "Psychological Mystery"],
      mangaManhwa: ["Omniscient Reader's Viewpoint", "Solo Leveling", "Monster", "20th Century Boys"],
      currentReadingList: "Atomic Habits & Clean Code",
      readingSpot: "Quiet desk corner with cat purring and lo-fi beats in headphones",
      story: "Books and stories are cheat codes for perspective. Whether it's the thrill of an action manhwa or non-fiction philosophy, reading shapes how I think and create."
    }
  },
  {
    id: "cooking",
    title: "COOKING",
    icon: "🍳",
    category: "Culinary",
    tagline: "Crafting comfort food with precise timing",
    details: {
      specialtyDishes: [
        "Signature Japanese Garlic Butter Fried Rice",
        "Creamy Carbonara & Tomato Pasta",
        "Golden Crispy Chicken Katsu",
        "Custom Spiced Shoyu Ramen"
      ],
      cookingPhilosophy: "Cooking is identical to programming: prepare your ingredients (imports), follow the steps (logic), and taste-test continuously (unit testing)!",
      favoriteTime: "Late evening culinary experiments for family and friends"
    }
  },
  {
    id: "creative",
    title: "CREATIVE TOOLS",
    icon: "🎨",
    category: "Digital Arts",
    tagline: "Designing pixels, interfaces, and visual assets",
    details: {
      tools: ["Figma", "Aseprite (Pixel Art)", "Canva Pro", "Premiere Pro"],
      interests: ["Retro UI design", "Pixel character sprites", "Micro-interactions", "Typography"],
      story: "Code brings things to life, but art gives them a soul. Designing pixel sprites and responsive game UIs allows me to merge both hemispheres of the brain."
    }
  },
  {
    id: "headphones",
    title: "AUDIO & GEAR",
    icon: "🎧",
    category: "Audio Obsession",
    tagline: "Lost in frequencies, chords, and synthesizers",
    details: {
      gear: ["Closed-Back Studio Headphones", "True Wireless ANC Buds", "Mechanical Clicky Switches"],
      favoriteGenres: ["Lo-Fi Hip Hop", "Japanese City Pop", "Midwest Emo", "Chiptune / Video Game OSTs"],
      curatorStatus: "Created 10+ custom Spotify mood playlists with over 500 hand-picked tracks"
    }
  }
];

export const JUKEBOX_PLAYLISTS = [
  {
    id: "late-night",
    name: "🌙 LATE NIGHT",
    icon: "🌙",
    description: "Midnight train station waiting, starry night thoughts, and low-light focus.",
    genre: "Chillhop & Lo-Fi Beats",
    tracksCount: "48 Tracks",
    spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DXc8kgYqQLMfH",
    color: "#6366f1"
  },
  {
    id: "rainy-day",
    name: "🌧️ RAINY DAY",
    icon: "🌧️",
    description: "Cyberpunk rain, neon reflections on wet asphalt, and soft piano chords.",
    genre: "Ambient & Rainy Beats",
    tracksCount: "35 Tracks",
    spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DXbvAB13k5ymF",
    color: "#38bdf8"
  },
  {
    id: "coding-session",
    name: "💻 CODING SESSION",
    icon: "💻",
    description: "Study desk with purring cat, keyboard rhythm, and zero-distraction flow state.",
    genre: "Lo-Fi Study & Focus",
    tracksCount: "54 Tracks",
    spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DXdLEN7aqioXM",
    color: "#10b981"
  },
  {
    id: "night-drive",
    name: "🚗 NIGHT DRIVE",
    icon: "🚗",
    description: "Tokyo city skyline overlooking Mt. Fuji, Japanese City Pop, and smooth retro basslines.",
    genre: "City Pop & Synthwave",
    tracksCount: "42 Tracks",
    spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DXdgnBRtx48Pp",
    color: "#f43f5e"
  },
  {
    id: "current-favorites",
    name: "❤️ CURRENT FAVORITES",
    icon: "❤️",
    description: "Overlooking the ocean port at sunset: indie gems, J-rock anthems, and nostalgia.",
    genre: "Indie Rock & J-Pop",
    tracksCount: "60 Tracks",
    spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6",
    color: "#facc15"
  }
];

export const SKILL_CATEGORIES = [
  {
    category: "WEB DEVELOPMENT",
    icon: "🌐",
    description: "Building interactive digital worlds and client applications",
    skills: [
      { name: "HTML5", status: "MASTERED", level: 98, xp: "980/1000", bar: "██████████", perk: "Semantic architecture & accessibility mastery" },
      { name: "CSS3 / Tailwind", status: "MASTERED", level: 95, xp: "950/1000", bar: "█████████░", perk: "Pixel-perfect responsive design & retro styling" },
      { name: "JavaScript (ES6+)", status: "UNLOCKED", level: 88, xp: "880/1000", bar: "████████░░", perk: "DOM manipulation, asynchronous fetch, interactive event loops" },
      { name: "React.js", status: "LEARNING", level: 75, xp: "750/1000", bar: "███████░░░", perk: "Hooks, component lifecycles, and reactive state trees" },
      { name: "PHP", status: "UNLOCKED", level: 80, xp: "800/1000", bar: "████████░░", perk: "Server-side scripting, OOP architecture, and CRUD modules" },
      { name: "Node.js", status: "LEARNING", level: 65, xp: "650/1000", bar: "██████░░░░", perk: "Backend routing, Express APIs, and file streams" },
    ]
  },
  {
    category: "DATABASE",
    icon: "🗄️",
    description: "Storing quest data, inventory, and analytics records",
    skills: [
      { name: "MySQL", status: "UNLOCKED", level: 82, xp: "820/1000", bar: "████████░░", perk: "Relational queries, joins, foreign keys, and indexing" },
      { name: "MongoDB", status: "LEARNING", level: 68, xp: "680/1000", bar: "██████░░░░", perk: "NoSQL document schemas and aggregation pipelines" },
      { name: "SQLite", status: "UNLOCKED", level: 78, xp: "780/1000", bar: "███████░░░", perk: "Lightweight embedded storage for rapid desktop & mobile apps" },
    ]
  },
  {
    category: "TOOLS & SYSTEM",
    icon: "⚙️",
    description: "Developer arsenal and modern productivity enchantments",
    skills: [
      { name: "Git & GitHub", status: "UNLOCKED", level: 85, xp: "850/1000", bar: "████████░░", perk: "Branching, merge conflict resolution, commit history navigation" },
      { name: "VS Code", status: "MASTERED", level: 96, xp: "960/1000", bar: "█████████░", perk: "Keyboard shortcut wizardry, custom extensions, snippets" },
      { name: "AI Tools & Prompting", status: "MASTERED", level: 92, xp: "920/1000", bar: "█████████░", perk: "Accelerating learning and autonomous coding workflows" },
      { name: "Vite & Build Tools", status: "UNLOCKED", level: 80, xp: "800/1000", bar: "████████░░", perk: "Lightning-fast HMR and bundling optimization" },
      { name: "Postman", status: "LEARNING", level: 70, xp: "700/1000", bar: "███████░░░", perk: "API endpoint testing, payloads, and mock servers" },
    ]
  },
  {
    category: "DESIGN & CREATIVE",
    icon: "🎨",
    description: "Visual aesthetics, user empathy, and retro game craft",
    skills: [
      { name: "UI/UX Design", status: "UNLOCKED", level: 82, xp: "820/1000", bar: "████████░░", perk: "User-centric layout flow, wireframing, and visual hierarchy" },
      { name: "Pixel Art Aesthetics", status: "UNLOCKED", level: 86, xp: "860/1000", bar: "████████░░", perk: "16-bit color palettes, tile layouts, and sprite shading" },
      { name: "Figma Prototyping", status: "UNLOCKED", level: 80, xp: "800/1000", bar: "████████░░", perk: "Interactive vector component systems and design tokens" },
      { name: "Graphic Design", status: "LEARNING", level: 70, xp: "700/1000", bar: "███████░░░", perk: "Poster composition, color theory, and branding assets" },
    ]
  }
];

export const QUESTS_DATA = [
  {
    id: "quest-001",
    questNumber: "QUEST #001",
    title: "POS INDONESIA - Delivery Analytics Dashboard",
    category: "LOGISTICS / WEB APP",
    status: "COMPLETED",
    badge: "✓ COMPLETED",
    difficulty: "HARD",
    xpReward: "+350 EXP",
    icon: "📦",
    summary: "Built an interactive shipping analysis and parcel dispatch tracking dashboard for logistics operations.",
    features: [
      "Real-time shipment status filters & regional dispatch breakdown",
      "Interactive data visualizations with dynamic sorting",
      "Responsive layout optimized for logistics monitoring screens",
      "Integrated with database schemas for high-volume package records"
    ],
    tech: ["React", "MongoDB", "JavaScript", "Tailwind CSS", "Node.js"],
    role: "Frontend & Data Visualization Developer",
    githubUrl: "https://github.com/",
    demoUrl: "https://posindonesia.co.id/"
  },
  {
    id: "quest-002",
    questNumber: "QUEST #002",
    title: "AI AGENT - Autonomous Code & Research Assistant",
    category: "ARTIFICIAL INTELLIGENCE",
    status: "COMPLETED",
    badge: "✓ COMPLETED",
    difficulty: "EXPERT",
    xpReward: "+500 EXP",
    icon: "🤖",
    summary: "Developed an autonomous conversational agent capable of codebase analysis, prompt chaining, and research synthesis.",
    features: [
      "Real-time token streaming with markdown formatting",
      "Context-aware codebase indexing and prompt management",
      "Dynamic model switching with custom system personas",
      "Exportable chat logs and scratchpad workspace"
    ],
    tech: ["Node.js", "AI API", "WebSockets", "React", "TypeScript"],
    role: "Lead Fullstack Developer",
    githubUrl: "https://github.com/",
    demoUrl: "#"
  },
  {
    id: "quest-003",
    questNumber: "QUEST #003",
    title: "JULIAN.EXE - 16-Bit RPG Personal Website",
    category: "INTERACTIVE EXPERIENCE",
    status: "IN PROGRESS",
    badge: "⚔ IN PROGRESS",
    difficulty: "LEGENDARY",
    xpReward: "+600 EXP",
    icon: "⚔️",
    summary: "Created a playable 16-bit RPG game world introducing life, personality, hobbies, music, and skills.",
    features: [
      "Authentic Title Screen with star atmosphere (bintang.gif)",
      "PixelTransition dissolve page-to-page navigation",
      "Pure Web Audio chiptune & lo-fi procedural music synthesizer",
      "Interactive town map, character house, and clickable hobby hotspots",
      "Functional game settings (CRT scanlines, sound sliders, themes)"
    ],
    tech: ["React", "Vite", "GSAP", "Tailwind CSS", "Web Audio API"],
    role: "Solo Game & Web Creator",
    githubUrl: "https://github.com/",
    demoUrl: "#"
  },
  {
    id: "quest-004",
    questNumber: "QUEST #004",
    title: "WEB DEVELOPER INTERNSHIP QUEST",
    category: "CAREER / EXPERIENCE",
    status: "COMPLETED",
    badge: "✓ COMPLETED",
    difficulty: "HARD",
    xpReward: "+450 EXP",
    icon: "🎓",
    summary: "Completed vocational internship program, collaborating in a professional developer sprint team.",
    features: [
      "Collaborated on production web modules using agile methodologies",
      "Handled bug tickets, cross-browser compatibility, and responsiveness",
      "Participated in daily standups and code review pipelines",
      "Enhanced understanding of production-ready architecture"
    ],
    tech: ["JavaScript", "PHP", "Git Workflow", "Team Collaboration"],
    role: "Web Developer Intern",
    githubUrl: "https://github.com/",
    demoUrl: "#"
  }
];

export const ADVENTURE_LOG = [
  {
    year: "2024",
    events: [
      {
        icon: "🗡️",
        title: "FIRST CODE",
        subtitle: "The Spark of Creation",
        description: "Wrote first lines of HTML and CSS. Watching code translate instantly into visual shapes on screen sparked a lifelong obsession with digital creation."
      },
      {
        icon: "⚙️",
        title: "FIRST PROJECT",
        subtitle: "Building the Foundation",
        description: "Created first responsive school project and small interactive calculators. Discovered the magic of JavaScript logic and algorithms."
      }
    ]
  },
  {
    year: "2025",
    events: [
      {
        icon: "🎓",
        title: "INTERNSHIP UNLOCKED",
        subtitle: "Real-World Experience",
        description: "Stepped outside the classroom to work alongside professional developers. Learned git branching, team communications, and production workflows."
      },
      {
        icon: "🤖",
        title: "AI & MODERN TECH",
        subtitle: "Expanding the Skill Tree",
        description: "Explored React component architecture, API integration, and AI-assisted engineering workflows. Started running 5K and 10K road runs."
      }
    ]
  },
  {
    year: "2026",
    events: [
      {
        icon: "🏆",
        title: "MAJOR MILESTONE (LEVEL 16)",
        subtitle: "A World of My Own",
        description: "Turned 16 and brought JULIAN.EXE into reality — a playable 16-bit RPG world marrying personal identity, music, hobbies, and coding."
      },
      {
        icon: "🚀",
        title: "NEW ADVENTURES",
        subtitle: "The Journey Continues",
        description: "Gearing up for high school graduation, deeper AI exploration, half-marathon running goals, and building impactful open-source tools."
      }
    ]
  }
];

export const ACHIEVEMENTS_DATA = [
  {
    id: "ach-1",
    icon: "🏆",
    title: "FIRST WEBSITE",
    description: "Built and deployed my first website online.",
    status: "UNLOCKED",
    xp: "+100 EXP",
    category: "Coding",
    lore: "Every master wizard once struggled to cast their first spark."
  },
  {
    id: "ach-2",
    icon: "🏃",
    title: "10K RUNNER",
    description: "Completed a full 10K road run without stopping.",
    status: "UNLOCKED",
    xp: "+250 EXP",
    category: "Life",
    lore: "Endurance is built step by step, breath by breath under the night sky."
  },
  {
    id: "ach-3",
    icon: "🎓",
    title: "INTERNSHIP UNLOCKED",
    description: "Successfully completed vocational developer internship.",
    status: "UNLOCKED",
    xp: "+300 EXP",
    category: "Career",
    lore: "Leveling up by collaborating with fellow guild members."
  },
  {
    id: "ach-4",
    icon: "🎮",
    title: "RETRO GAMER",
    description: "Completed endgame campaigns in 5+ classic RPGs.",
    status: "UNLOCKED",
    xp: "+150 EXP",
    category: "Hobbies",
    lore: "From Chrono Trigger to modern roguelikes, true heroes never give up."
  },
  {
    id: "ach-5",
    icon: "📚",
    title: "AVID READER",
    description: "Completed 10+ novel & manhwa reading targets.",
    status: "UNLOCKED",
    xp: "+150 EXP",
    category: "Hobbies",
    lore: "Accumulated knowledge to empower future quest solutions."
  },
  {
    id: "ach-6",
    icon: "💻",
    title: "CODE WARRIOR",
    description: "Built multiple full-stack applications with real users.",
    status: "UNLOCKED",
    xp: "+350 EXP",
    category: "Coding",
    lore: "Forged digital weapons and shipped functional solutions to the realm."
  },
  {
    id: "ach-7",
    icon: "🎵",
    title: "JUKEBOX MASTER",
    description: "Curated 5+ themed Spotify playlists with 100+ tracks.",
    status: "UNLOCKED",
    xp: "+100 EXP",
    category: "Music",
    lore: "The bard who keeps the tavern alive with impeccable rhythm."
  },
  {
    id: "ach-8",
    icon: "🏎️",
    title: "TELEMETRY GEEK",
    description: "Watched every Grand Prix of the Formula 1 season.",
    status: "UNLOCKED",
    xp: "+150 EXP",
    category: "Life",
    lore: "Understands tire wear strategies and the art of the perfect pit stop."
  },
  {
    id: "ach-9",
    icon: "🔒",
    title: "SPEED DEMON",
    description: "Run a 5K race in under 24 minutes.",
    status: "LOCKED",
    xp: "+400 EXP",
    category: "Life Goal",
    lore: "Currently training during cool midnight runs. Will unlock soon!"
  },
  {
    id: "ach-10",
    icon: "🔒",
    title: "POLYGLOT ARCHITECT",
    description: "Master 5 programming languages in production projects.",
    status: "LOCKED",
    xp: "+500 EXP",
    category: "Career Goal",
    lore: "The ultimate spellbook expansion. High-level knowledge awaits."
  }
];

export const SAVE_POINT_DATA = {
  title: "ANCIENT SAVE POINT & SHRINE",
  shrineMessage: "A sacred stone lantern and glowing crystal pulse with ancient cerulean light. You feel safe here.",
  savePrompt: "Save your journey records or connect with Rezky across digital dimensions.",
  socials: [
    { name: "GITHUB", icon: "💻", handle: "@rezky", url: "https://github.com/", desc: "Repositories, experiments & open source" },
    { name: "INSTAGRAM", icon: "📷", handle: "@rezky", url: "https://instagram.com/", desc: "Life snaps, running milestones & stories" },
    { name: "LINKEDIN", icon: "💼", handle: "Rezky", url: "https://linkedin.com/", desc: "Professional network & internship connections" },
    { name: "EMAIL", icon: "✉️", handle: "rezky@example.com", url: "mailto:rezky@example.com", desc: "Send an owl or direct quest invitation" },
  ]
};
