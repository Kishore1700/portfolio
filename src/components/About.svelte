<script>
  import { onMount } from "svelte";
  import {
    GraduationCap,
    Code,
    BookOpen,
    Sparkles,
    Volume2,
    VolumeX,
    User,
    ChevronRight,
    Flame,
    Zap,
    X,
    MapPin,
    Briefcase,
    CheckCircle2
  } from "lucide-svelte";
  import confetti from "canvas-confetti";
  import { sound } from "../utils/sound.js";

  // Sound Muted state
  let isMuted = $state(false);

  // Gamification Stats (Clean, tasteful presentation)
  let xp = $state(9450);
  let maxXp = $state(10000);
  let level = $state(99);

  // Floating text popups: array of { id, text, color, x, y }
  let floatTexts = $state([]);
  let floatIdCounter = 0;

  // Selected highlight card for expanded modal view
  let expandedHighlight = $state(null);

  // Selected strength for focused view
  let activeStrengthIndex = $state(0);

  // Professional Core Strengths (Clear, real-world descriptions)
  const coreStrengths = [
    {
      title: "Full-Stack Development",
      category: "Engineering",
      icon: "💻",
      summary: "End-to-end application development with clean backend APIs and responsive modern frontends.",
      details: "Experienced in connecting robust server-side logic (Python, Java) to high-speed reactive client interfaces (Svelte, Tailwind). Focused on modular component hierarchy, type safety, and clean separation of concerns.",
      tags: ["Frontend & Backend", "RESTful APIs", "Database Design"]
    },
    {
      title: "Problem Solving & DSA",
      category: "Algorithms",
      icon: "🧠",
      summary: "Decomposing intricate computing challenges into clear, mathematically sound, and efficient algorithms.",
      details: "Practiced in time and space complexity (Big-O), recursion, tree and graph traversals, and dynamic programming. Always striving for clean, optimal implementations.",
      tags: ["Data Structures", "Algorithmic Logic", "Optimization"]
    },
    {
      title: "Team Collaboration",
      category: "Workplace",
      icon: "🤝",
      summary: "Thriving in agile sprints, pair programming, transparent communication, and team code reviews.",
      details: "Values clear technical documentation, empathetic feedback, and shared ownership of software quality across multi-disciplinary teams.",
      tags: ["Agile Sprints", "Git Workflows", "Code Reviews"]
    },
    {
      title: "Rapid Adaptability",
      category: "Growth",
      icon: "⚡",
      summary: "Swiftly absorbing emerging frameworks, libraries, APIs, and modern development tooling.",
      details: "Passionate self-starter who readily experiments with modern runtimes, developer SDKs, and AI tools to solve real-world problems effectively.",
      tags: ["Continuous Learning", "Tool Exploration", "Versatility"]
    }
  ];

  // Technical Areas of Interest
  const areasOfInterest = [
    {
      name: "Web Application Engineering",
      desc: "Creating high-performance, accessible, and reactive user interfaces with modern toolchains.",
      icon: "🌐",
      tech: "Svelte 5 • Tailwind • JavaScript"
    },
    {
      name: "Backend & Systems",
      desc: "Architecting modular microservices, REST APIs, and efficient database querying.",
      icon: "⚙️",
      tech: "Python • Java • MySQL • Node"
    },
    {
      name: "AI & Computer Vision",
      desc: "Integrating intelligent machine learning models, image processing, and automation pipelines.",
      icon: "🤖",
      tech: "Python • PyTorch / OpenCV • APIs"
    },
    {
      name: "Software Architecture",
      desc: "Designing resilient data flows, clean abstractions, and maintainable software patterns.",
      icon: "📐",
      tech: "OOP • MVC • System Design"
    }
  ];

  // Professional Highlights
  const highlights = [
    {
      id: "mca",
      icon: GraduationCap,
      colorClass: "text-[#55FFFF]",
      bgSlot: "bg-[#101b22]",
      badge: "Master's Degree",
      title: "MCA Candidate",
      subtitle: "Sona College of Technology",
      shortDesc: "Pursuing Master of Computer Applications with a focus on enterprise software engineering, database management, and advanced computing.",
      detailedDesc:
        "Currently pursuing the Master of Computer Applications (MCA) program at Sona College of Technology. Deeply studying data structures & algorithms, distributed systems, relational database modeling, and modern web application development.",
      skills: ["Data Structures & Algorithms", "System Design", "Database Modeling", "Software Engineering"]
    },
    {
      id: "dev",
      icon: Code,
      colorClass: "text-[#55FF55]",
      bgSlot: "bg-[#102214]",
      badge: "Software Engineering",
      title: "Full-Stack Developer",
      subtitle: "Python, Java & Web Tech",
      shortDesc: "Skilled in engineering dependable backend services, modular REST endpoints, and reactive web applications.",
      detailedDesc:
        "Hands-on expertise developing full-stack solutions. Experienced in architecting robust backend APIs in Python and Java, managing SQL schemas, and crafting reactive frontend experiences with Svelte and modern CSS.",
      skills: ["Python", "Java", "RESTful APIs", "OOP", "Database Design", "Svelte"]
    },
    {
      id: "solver",
      icon: BookOpen,
      colorClass: "text-[#FFFF55]",
      bgSlot: "bg-[#222110]",
      badge: "Computer Science",
      title: "Problem Solver",
      subtitle: "Algorithmic Focus",
      shortDesc: "Enthusiastic about structural data concepts, mathematical logic, and complexity optimization.",
      detailedDesc:
        "Dedicated to writing performant code with clean Big-O characteristics. Experienced in analyzing algorithmic bottlenecks, structuring complex datasets, and building reliable logic.",
      skills: ["Algorithms", "Complexity (Big O)", "Problem Solving", "Mathematical Logic"]
    }
  ];

  // Add floating XP text
  function addFloatingText(text, color = "#55FF55", e = null) {
    let x = 100;
    let y = 100;
    if (e && e.clientX) {
      const rect = e.currentTarget.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    } else {
      x = 50 + Math.random() * 100;
      y = 20 + Math.random() * 40;
    }

    const id = floatIdCounter++;
    floatTexts.push({ id, text, color, x, y });
    setTimeout(() => {
      floatTexts = floatTexts.filter((t) => t.id !== id);
    }, 1200);
  }

  // Trigger XP gain
  function gainXp(amount, label = null, e = null) {
    xp += amount;
    sound.playXp();
    addFloatingText(label || `+${amount} XP`, "#55FF55", e);

    if (xp >= maxXp) {
      level += 1;
      xp = xp - maxXp;
      maxXp = Math.floor(maxXp * 1.2);
      sound.playLevelUp();
      addFloatingText("🎉 LEVEL UP!", "#FFFF55", e);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  }

  // Toggle Sound
  function toggleSound() {
    isMuted = sound.toggleMute();
  }

  onMount(() => {
    isMuted = sound.getMuted();
  });
</script>

<section id="about" class="relative py-16 sm:py-20 px-3 sm:px-6 lg:px-8 overflow-hidden select-none">
  <div class="max-w-7xl mx-auto z-10 relative">
    
    <!-- Clean Section Heading -->
    <div class="text-center mb-10 sm:mb-12">
      <div class="inline-flex items-center gap-2 px-3 py-1 bg-[#1a1b22] mc-slot mb-3">
        <User class="w-4 h-4 text-[#55FF55]" />
        <span class="text-[10px] font-pixel text-[#55FF55] uppercase tracking-wider">DEVELOPER PROFILE</span>
      </div>
      <h2 class="font-pixel text-2xl sm:text-3xl md:text-4xl text-[#FFFF55] mc-text-shadow-gold mb-3">
        ABOUT ME
      </h2>
      <div class="h-1.5 w-32 bg-[#55FF55] mx-auto border-2 border-black shadow-[0_0_12px_#55FF55]"></div>
      <p class="font-sans text-xs sm:text-sm text-slate-300 mt-3 max-w-2xl mx-auto leading-relaxed">
        MCA Candidate & Full-Stack Software Engineer building scalable backend systems, responsive web interfaces, and efficient algorithmic solutions.
      </p>
    </div>

    <!-- TOP PROFILE HUD (Clear, Easily Understandable Developer Banner) -->
    <div class="mc-container p-4 sm:p-5 bg-[#0c0d12] mb-8 border-2 border-black">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        
        <!-- Player Identity & Real-world Info -->
        <div class="flex flex-wrap items-center justify-center sm:justify-start gap-4">
          <div class="flex items-center gap-3">
            <!-- Avatar Button -->
            <button
              type="button"
              class="w-12 h-12 bg-[#161822] border-2 border-black mc-slot flex items-center justify-center font-pixel text-base text-[#FFFF55] relative group cursor-pointer hover:border-[#55FF55] transition-colors"
              onclick={(e) => gainXp(25, "+25 XP 👋", e)}
              title="Click avatar to say hi!"
            >
              <span>KP</span>
              <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#55FF55] border border-black shadow-[0_0_8px_#55FF55]"></span>
            </button>
            
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="font-pixel text-sm sm:text-base text-[#FFFF55] mc-text-shadow-gold">KISHORE P M</span>
                <span class="text-[9px] font-pixel px-2 py-0.5 bg-[#040507] text-[#55FFFF] border border-black">
                  LVL {level} DEV
                </span>
                <span class="text-[10px] font-silkscreen px-2 py-0.5 bg-[#0e2413] text-[#55FF55] border border-[#55FF55]/40 flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#55FF55] animate-ping"></span>
                  OPEN TO OPPORTUNITIES
                </span>
              </div>
              <div class="flex items-center gap-3 mt-1 text-slate-300 text-xs font-sans flex-wrap">
                <span class="flex items-center gap-1">
                  <GraduationCap class="w-3.5 h-3.5 text-[#55FFFF]" />
                  MCA @ Sona College of Technology
                </span>
                <span class="text-slate-600 hidden sm:inline">&bull;</span>
                <span class="flex items-center gap-1 text-slate-400">
                  <MapPin class="w-3.5 h-3.5 text-[#FF5555]" />
                  Salem, Tamil Nadu, India
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side: Level Badge & Retro Audio Toggle -->
        <div class="flex items-center gap-3">
          <div class="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#050608] mc-slot border border-black">
            <Briefcase class="w-3.5 h-3.5 text-[#FFFF55]" />
            <span class="text-xs font-mono text-slate-300">Software Engineering</span>
          </div>

          <!-- Sound SFX Toggle -->
          <button
            type="button"
            onclick={toggleSound}
            class="mc-slot p-2 bg-[#040507] hover:bg-[#12141c] text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={isMuted ? "Unmute Retro SFX" : "Mute Retro SFX"}
            aria-label={isMuted ? "Unmute Retro SFX" : "Mute Retro SFX"}
          >
            {#if isMuted}
              <VolumeX class="w-4 h-4 text-[#FF5555]" />
            {:else}
              <Volume2 class="w-4 h-4 text-[#55FF55]" />
            {/if}
          </button>
        </div>
      </div>

      <!-- Live Experience Progress Bar -->
      <div class="mt-4 pt-3 border-t border-black/60 relative">
        <div class="flex justify-between items-center text-[10px] sm:text-[11px] font-pixel text-[#55FF55] mb-1.5">
          <span class="flex items-center gap-1.5">
            <Zap class="w-3 h-3 text-[#FFFF55]" />
            PROFESSIONAL MASTERY & READINESS
          </span>
          <span class="font-silkscreen text-[#FFFF55]">{xp.toLocaleString()} / {maxXp.toLocaleString()} XP</span>
        </div>
        
        <button
          type="button"
          class="w-full text-left mc-xp-container cursor-pointer relative block p-0"
          onclick={(e) => gainXp(50, "+50 XP ⚡", e)}
          title="Click to level up!"
          aria-label="Experience progress bar"
        >
          <div
            class="mc-xp-fill"
            style="width: {Math.min(100, Math.max(5, (xp / maxXp) * 100))}%"
          ></div>
        </button>

        <!-- Floating XP numbers container -->
        <div class="absolute inset-0 pointer-events-none overflow-visible">
          {#each floatTexts as ft (ft.id)}
            <div
              class="mc-float-text text-xs"
              style="left: {ft.x}px; top: {ft.y}px; color: {ft.color};"
            >
              {ft.text}
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- MAIN TWO-COLUMN CONTENT GRID -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <!-- LEFT 7 COLUMNS: Bio & Core Competencies -->
      <div class="lg:col-span-7 space-y-6">
        
        <!-- Story / About Me Narrative Card -->
        <div class="mc-container p-5 sm:p-6 bg-[#0c0d12]">
          <div class="flex items-center gap-2 mb-4 border-b-2 border-black pb-3">
            <User class="w-4 h-4 text-[#55FF55]" />
            <h3 class="font-pixel text-xs sm:text-sm text-[#FFFF55] mc-text-shadow-gold">
              WHO I AM & WHAT I DO
            </h3>
          </div>

          <div class="space-y-3.5 text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
            <p>
              Hello! I'm <strong class="text-white font-medium">Kishore P M</strong>, an MCA student at <strong class="text-[#55FFFF] font-medium">Sona College of Technology</strong> with a strong foundation in computer science, software design, and applied algorithms.
            </p>
            <p>
              I specialize in engineering full-stack software solutions. On the backend, I construct dependable services and APIs using <strong class="text-[#FFFF55] font-medium">Python</strong> and <strong class="text-[#FF5555] font-medium">Java</strong>, backed by structured database schemas. On the client side, I create responsive, engaging web interfaces using <strong class="text-[#55FF55] font-medium">Svelte</strong> and modern CSS.
            </p>
            <p>
              Whether I'm designing data models, optimizing algorithms for low runtime complexity, or refining interactive user experiences, my approach is centered around writing clean, maintainable, and production-ready code.
            </p>
          </div>

          <!-- Quick Specs Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5 pt-4 border-t border-black/80">
            <div class="mc-slot p-2.5 bg-[#040507]">
              <span class="text-[9px] font-silkscreen text-slate-400 block">EDUCATION</span>
              <span class="text-xs font-mono text-[#55FFFF] font-bold">MCA Candidate</span>
            </div>
            <div class="mc-slot p-2.5 bg-[#040507]">
              <span class="text-[9px] font-silkscreen text-slate-400 block">PRIMARY STACK</span>
              <span class="text-xs font-mono text-[#55FF55] font-bold">Python &bull; Svelte</span>
            </div>
            <div class="mc-slot p-2.5 bg-[#040507]">
              <span class="text-[9px] font-silkscreen text-slate-400 block">BACKEND</span>
              <span class="text-xs font-mono text-[#FFFF55] font-bold">Java &bull; APIs</span>
            </div>
            <div class="mc-slot p-2.5 bg-[#040507]">
              <span class="text-[9px] font-silkscreen text-slate-400 block">LOCATION</span>
              <span class="text-xs font-mono text-[#FF5555] font-bold">Salem, India</span>
            </div>
          </div>
        </div>

        <!-- Core Strengths & Working Style -->
        <div class="mc-container p-5 sm:p-6 bg-[#0c0d12]">
          <div class="flex items-center justify-between mb-4 border-b-2 border-black pb-3">
            <div class="flex items-center gap-2">
              <Sparkles class="w-4 h-4 text-[#55FFFF]" />
              <h3 class="font-pixel text-xs sm:text-sm text-[#FFFF55] mc-text-shadow-gold">
                CORE COMPETENCIES
              </h3>
            </div>
            <span class="text-[10px] font-silkscreen text-slate-400">SELECT TO VIEW</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {#each coreStrengths as strength, idx}
              <button
                type="button"
                class="w-full text-left mc-slot p-3 bg-[#08090d] hover:bg-[#12141c] transition-all cursor-pointer flex flex-col justify-between group {activeStrengthIndex === idx ? 'border-[#55FF55] ring-1 ring-[#55FF55] bg-[#0c120e]' : ''}"
                onclick={(e) => {
                  sound.playPop();
                  activeStrengthIndex = idx;
                  gainXp(15, "+15 XP 💡", e);
                }}
              >
                <div>
                  <div class="flex items-center justify-between gap-2 mb-1.5">
                    <span class="text-xl">{strength.icon}</span>
                    <span class="text-[9px] font-silkscreen px-1.5 py-0.5 bg-[#000000] text-[#55FFFF] border border-black/80">
                      {strength.category}
                    </span>
                  </div>
                  <h4 class="font-mono text-xs font-bold text-slate-100 group-hover:text-[#55FF55] transition-colors mb-1">
                    {strength.title}
                  </h4>
                  <p class="text-[11px] text-slate-300 font-sans leading-relaxed">
                    {strength.summary}
                  </p>
                </div>

                <div class="flex flex-wrap gap-1 mt-2.5 pt-2 border-t border-black/60">
                  {#each strength.tags as tag}
                    <span class="text-[9px] font-mono text-[#55FF55] bg-[#000000] px-1.5 py-0.5 border border-black">
                      {tag}
                    </span>
                  {/each}
                </div>
              </button>
            {/each}
          </div>

          <!-- Active Selected Strength Expanded Note -->
          {#if coreStrengths[activeStrengthIndex]}
            <div class="mt-4 p-3.5 mc-slot bg-[#040507] border border-[#55FF55]/60 flex items-start gap-3">
              <span class="text-2xl shrink-0 mt-0.5">{coreStrengths[activeStrengthIndex].icon}</span>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-mono text-xs font-bold text-[#55FF55]">
                    {coreStrengths[activeStrengthIndex].title}
                  </span>
                  <span class="text-[9px] font-silkscreen text-slate-400">
                    &bull; {coreStrengths[activeStrengthIndex].category}
                  </span>
                </div>
                <p class="text-xs text-slate-300 font-sans leading-relaxed">
                  {coreStrengths[activeStrengthIndex].details}
                </p>
              </div>
            </div>
          {/if}
        </div>

        <!-- Technical Areas of Interest -->
        <div class="mc-container p-5 sm:p-6 bg-[#0c0d12]">
          <div class="flex items-center gap-2 mb-4 border-b-2 border-black pb-3">
            <CheckCircle2 class="w-4 h-4 text-[#55FF55]" />
            <h3 class="font-pixel text-xs sm:text-sm text-[#FFFF55] mc-text-shadow-gold">
              TECHNICAL AREAS OF INTEREST
            </h3>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {#each areasOfInterest as area}
              <div class="mc-slot p-3 bg-[#06070a] flex items-start gap-3">
                <span class="text-xl shrink-0 mt-0.5">{area.icon}</span>
                <div>
                  <h4 class="font-mono text-xs font-bold text-slate-100 mb-1">{area.name}</h4>
                  <p class="text-[11px] text-slate-300 font-sans leading-relaxed mb-2">
                    {area.desc}
                  </p>
                  <span class="text-[9px] font-mono text-[#55FFFF] bg-[#000000] px-1.5 py-0.5 border border-black inline-block">
                    {area.tech}
                  </span>
                </div>
              </div>
            {/each}
          </div>
        </div>

      </div>

      <!-- RIGHT 5 COLUMNS: Academic Profile, Highlights & Philosophy -->
      <div class="lg:col-span-5 space-y-6">
        
        <div class="flex items-center justify-between mb-1">
          <span class="font-pixel text-xs text-[#FFFF55]">HIGHLIGHT CARDS</span>
          <span class="text-[10px] font-silkscreen text-slate-400">CLICK CARD TO EXPAND</span>
        </div>

        <!-- Highlight Cards (Education, Full-stack, Problem Solving) -->
        <div class="space-y-4">
          {#each highlights as highlight}
            {@const Icon = highlight.icon}
            <button
              type="button"
              class="w-full text-left mc-container p-4 bg-[#0c0d12] flex items-start gap-3 group transition-all duration-150 hover:scale-[1.01] cursor-pointer hover:border-[#55FF55] {expandedHighlight?.id === highlight.id ? 'ring-2 ring-[#55FF55]' : ''}"
              onclick={(e) => {
                sound.playClick();
                gainXp(30, "+30 XP 🌟", e);
                expandedHighlight = expandedHighlight?.id === highlight.id ? null : highlight;
              }}
            >
              <div class="p-2.5 mc-slot {highlight.bgSlot} shrink-0 flex items-center justify-center group-hover:border-[#55FF55] transition-colors">
                <Icon class="w-5 h-5 {highlight.colorClass}" />
              </div>
              
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2">
                  <h4 class="font-pixel text-xs text-[#FFFF55] mc-text-shadow-gold truncate">
                    {highlight.title}
                  </h4>
                  <span class="text-[9px] font-silkscreen px-1.5 py-0.5 bg-[#040507] text-[#55FFFF] border border-black/80 shrink-0">
                    {highlight.badge}
                  </span>
                </div>

                <div class="text-[11px] font-silkscreen text-slate-400 mt-0.5">
                  {highlight.subtitle}
                </div>

                <p class="text-slate-300 text-xs leading-relaxed font-sans mt-2">
                  {highlight.shortDesc}
                </p>

                <!-- Skill tags -->
                <div class="flex flex-wrap gap-1 mt-2.5">
                  {#each highlight.skills as s}
                    <span class="text-[9px] font-mono px-1.5 py-0.5 bg-[#000000] text-[#55FF55] border border-black/80">
                      {s}
                    </span>
                  {/each}
                </div>

                <div class="flex items-center gap-1 text-[10px] font-silkscreen text-[#55FFFF] mt-2 group-hover:translate-x-1 transition-transform">
                  <span>View Details</span>
                  <ChevronRight class="w-3.5 h-3.5" />
                </div>
              </div>
            </button>
          {/each}
        </div>

        <!-- Academic Credentials Card -->
        <div class="mc-container p-4 sm:p-5 bg-[#0c0d12]">
          <div class="flex items-center gap-2 mb-3 text-[#FFFF55]">
            <GraduationCap class="w-4 h-4 text-[#55FFFF]" />
            <h4 class="font-pixel text-xs uppercase">ACADEMIC CREDENTIALS</h4>
          </div>

          <div class="mc-slot p-3 bg-[#040507] mb-3">
            <div class="flex items-center justify-between">
              <span class="font-mono text-xs font-bold text-white">Master of Computer Applications</span>
              <span class="text-[9px] font-pixel text-[#55FF55]">MCA</span>
            </div>
            <div class="text-[11px] font-sans text-[#55FFFF] mt-0.5">
              Sona College of Technology, Salem
            </div>
            <p class="text-[11px] text-slate-300 font-sans mt-1.5 leading-relaxed">
              Master's curriculum covering advanced computing, software engineering methodologies, database modeling, and scalable architectures.
            </p>
          </div>

          <div class="flex items-center justify-between text-[10px] font-silkscreen text-slate-400 px-1">
            <span>Specialization: Software Development</span>
            <span class="text-[#55FF55]">Active Scholar</span>
          </div>
        </div>

        <!-- Developer Philosophy Card -->
        <div class="mc-container p-4 sm:p-5 bg-[#0a0b0f] border-2 border-black">
          <div class="flex items-center gap-2 mb-2 text-[#FFFF55]">
            <Flame class="w-4 h-4 text-[#FF5555] animate-pulse" />
            <span class="font-pixel text-[10px] uppercase">DEVELOPER PHILOSOPHY</span>
          </div>
          <p class="text-xs text-slate-300 font-sans italic leading-relaxed">
            "Like building enduring structures in Minecraft, software engineering requires a sturdy bedrock, efficient logic circuits, and a passion for crafting engaging experiences."
          </p>
          <div class="mt-3 text-right">
            <span class="font-pixel text-[10px] text-[#55FFFF]">— Kishore P M</span>
          </div>
        </div>

      </div>

    </div>

    <!-- EXPANDED HIGHLIGHT DETAIL MODAL (Overlay) -->
    {#if expandedHighlight}
      {@const ModalIcon = expandedHighlight.icon}
      <div class="fixed inset-0 z-[10000] flex items-center justify-center p-4 animate-fade-in">
        <!-- Backdrop Button -->
        <button
          type="button"
          class="fixed inset-0 bg-black/85 backdrop-blur-sm border-none cursor-pointer w-full h-full p-0"
          aria-label="Close highlight detail window"
          onclick={() => { sound.playClick(); expandedHighlight = null; }}
        ></button>

        <!-- Modal Content Dialog -->
        <div
          role="dialog"
          aria-modal="true"
          tabindex="-1"
          class="mc-container max-w-lg w-full p-6 bg-[#0c0d12] border-4 border-black relative z-10"
        >
          <!-- Close Button -->
          <button
            type="button"
            onclick={() => { sound.playClick(); expandedHighlight = null; }}
            class="absolute top-4 right-4 mc-slot p-1 bg-[#040507] hover:bg-[#FF5555] hover:text-black transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X class="w-4 h-4" />
          </button>

          <div class="flex items-center gap-3 mb-4">
            <div class="p-3 mc-slot {expandedHighlight.bgSlot}">
              <ModalIcon class="w-6 h-6 {expandedHighlight.colorClass}" />
            </div>
            <div>
              <h3 class="font-pixel text-sm sm:text-base text-[#FFFF55] mc-text-shadow-gold">
                {expandedHighlight.title}
              </h3>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-[10px] font-silkscreen text-[#55FFFF]">{expandedHighlight.subtitle}</span>
                <span class="text-[9px] font-pixel px-1.5 py-0.5 bg-[#000000] text-slate-300 border border-black">
                  {expandedHighlight.badge}
                </span>
              </div>
            </div>
          </div>

          <div class="mc-slot p-4 bg-[#040507] mb-5 text-slate-200 text-xs sm:text-sm leading-relaxed font-sans">
            {expandedHighlight.detailedDesc}
          </div>

          <div class="mb-5">
            <h5 class="font-silkscreen text-xs text-[#55FF55] mb-2 uppercase">CORE COMPETENCIES & TOPICS</h5>
            <div class="flex flex-wrap gap-2">
              {#each expandedHighlight.skills as sk}
                <span class="px-2.5 py-1 mc-slot bg-[#000000] text-xs font-mono text-[#55FFFF] border border-black/80">
                  {sk}
                </span>
              {/each}
            </div>
          </div>

          <button
            type="button"
            onclick={() => { sound.playClick(); expandedHighlight = null; }}
            class="w-full mc-button py-2 text-xs font-pixel cursor-pointer"
          >
            CLOSE WINDOW
          </button>
        </div>
      </div>
    {/if}

  </div>
</section>
