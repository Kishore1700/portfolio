<script>
  import { onMount } from "svelte";
  import {
    GraduationCap,
    Code,
    BookOpen,
    Sparkles,
    Volume2,
    VolumeX,
    ChevronRight,
    Flame,
    Zap,
    X,
    MapPin,
    Briefcase,
    Sword,
    Shield,
    Heart,
    Pickaxe,
    Apple,
    Trophy,
    Award,
    CheckCircle2,
    Sliders
  } from "lucide-svelte";
  import confetti from "canvas-confetti";
  import { sound } from "../utils/sound.js";

  // Active Game Mode Tab: 'lore' | 'stats' | 'gear' | 'quests'
  let activeTab = $state("lore");

  // Chapter inside lore: 1 | 2 | 3
  let activeChapter = $state(1);

  // Sound Muted state
  let isMuted = $state(false);

  // Gamification Stats
  let xp = $state(9450);
  let maxXp = $state(10000);
  let level = $state(99);
  let hearts = $state(5);
  let hasGoldenAppleBuff = $state(false);

  // Floating text popups: array of { id, text, color, x, y }
  let floatTexts = $state([]);
  let floatIdCounter = 0;

  // Selected highlight card for expanded modal view
  let expandedHighlight = $state(null);

  // Selected hotbar slot (0-8)
  let activeHotbarIndex = $state(0);

  // Selected gear item
  let selectedGearIndex = $state(0);

  // Hotbar Inventory Items (1-9)
  const hotbarItems = [
    { slot: 1, name: "Python", icon: "🐍", type: "Backend Engine", power: "96%", desc: "Primary backend language for microservices, automation, and API engineering." },
    { slot: 2, name: "Java", icon: "☕", type: "Enterprise Core", power: "92%", desc: "Object-oriented software systems, robust multithreading, and strong architectural patterns." },
    { slot: 3, name: "Svelte 5", icon: "🎨", type: "Reactive UI", power: "95%", desc: "High-performance reactive frontend crafting with clean component state and zero runtime overhead." },
    { slot: 4, name: "SQL & DB", icon: "🗄️", type: "Data Storage", power: "90%", desc: "Relational database schema modeling, indexing, and performant query design." },
    { slot: 5, name: "REST APIs", icon: "⚡", type: "Connectivity", power: "94%", desc: "Stateless HTTP endpoints, authentication, rate-limiting, and microservice networking." },
    { slot: 6, name: "DSA Tome", icon: "🧠", type: "Algorithms", power: "98%", desc: "Data structures, Big-O efficiency analysis, graph traversals, and dynamic programming." },
    { slot: 7, name: "MCA Scroll", icon: "🎓", type: "Education", power: "Master", desc: "Master of Computer Applications candidate at Sona College of Technology." },
    { slot: 8, name: "Git Pickaxe", icon: "⛏️", type: "Version Control", power: "99%", desc: "Branching strategies, collaborative workflows, and disciplined repository hygiene." },
    { slot: 9, name: "Clean Code", icon: "💎", type: "Philosophy", power: "100%", desc: "Modular, self-documenting, and maintainable software architecture principles." },
  ];

  // RPG Attributes / Stat Matrix
  let rpgStats = $state([
    { id: "fullstack", name: "Full-Stack Development", icon: "💻", value: 96, max: 100, color: "#55FF55", desc: "End-to-end applications bridging Python/Java backends with reactive Svelte frontends." },
    { id: "backend", name: "Backend Architecture", icon: "⚙️", value: 94, max: 100, color: "#55FFFF", desc: "Microservices, RESTful endpoint modeling, asynchronous workers, and database schemas." },
    { id: "algorithms", name: "Algorithms & DSA", icon: "🧠", value: 98, max: 100, color: "#FFFF55", desc: "Algorithmic complexity (Big O), graph traversal, sorting algorithms, and mathematical logic." },
    { id: "ui", name: "UI/UX Reactivity", icon: "🎨", value: 95, max: 100, color: "#FF5555", desc: "Modern CSS, responsive layouts, accessible typography, and engaging retro interfaces." },
    { id: "team", name: "Team Collaboration", icon: "🤝", value: 92, max: 100, color: "#AA00AA", desc: "Agile sprints, peer code reviews, empathetic communication, and cross-functional synergy." },
    { id: "learning", name: "Rapid Adaptability", icon: "⚡", value: 97, max: 100, color: "#55FF55", desc: "Fast learning curve for emerging tech stacks, developer tools, and AI agent workflows." }
  ]);

  // RPG Equipment Items
  const gearItems = [
    {
      id: "sword",
      slot: "Main Hand",
      name: "Netherite Sword of Logic",
      icon: "🗡️",
      rarity: "LEGENDARY",
      enchantments: ["Sharpness V", "Unbreaking III", "Efficiency V"],
      lore: "Forged in rigorous algorithm practice. Slices through complex algorithmic challenges with optimal Big-O efficiency.",
      attributes: [
        { label: "Algorithmic Precision", value: "+99" },
        { label: "Code Cleanliness", value: "+95%" },
        { label: "Backend Throughput", value: "+92" }
      ]
    },
    {
      id: "chestplate",
      slot: "Chestplate",
      name: "Diamond Armor of Architecture",
      icon: "🛡️",
      rarity: "EPIC",
      enchantments: ["Protection IV", "Mending I"],
      lore: "Engineered using Python & Java patterns. Provides maximum stability against memory leaks and endpoint downtime.",
      attributes: [
        { label: "System Stability", value: "+96%" },
        { label: "Concurrency Handling", value: "+90" },
        { label: "Database Integrity", value: "+94%" }
      ]
    },
    {
      id: "book",
      slot: "Offhand",
      name: "Enchanted Tome of MCA",
      icon: "📖",
      rarity: "RARE",
      enchantments: ["Knowledge X", "Discipline V"],
      lore: "Master of Computer Applications compendium acquired at Sona College of Technology.",
      attributes: [
        { label: "Theoretical Grounding", value: "+95" },
        { label: "Academic Standing", value: "Distinction" },
        { label: "Software Engineering", value: "+96" }
      ]
    },
    {
      id: "torch",
      slot: "Utility",
      name: "Redstone Repeater of Svelte",
      icon: "⚡",
      rarity: "EPIC",
      enchantments: ["Zero Latency", "Signal Boost 15"],
      lore: "Emits ultra-fast reactive updates to the client interface. Never drops a single frame.",
      attributes: [
        { label: "Reactivity Speed", value: "<1ms" },
        { label: "UI Responsiveness", value: "100%" },
        { label: "Component Modularity", value: "+98" }
      ]
    },
    {
      id: "totem",
      slot: "Special",
      name: "Totem of Bug-Free Deploy",
      icon: "🏆",
      rarity: "MYTHIC",
      enchantments: ["Resilience IV", "Zero Crash"],
      lore: "Grants a second wind whenever facing an obscure edge-case or null pointer in production.",
      attributes: [
        { label: "Tenacity & Debugging", value: "+100" },
        { label: "Critical Thinking", value: "+97" },
        { label: "Problem Solving", value: "+99" }
      ]
    },
    {
      id: "apple",
      slot: "Consumable",
      name: "Golden Apple of Curiosity",
      icon: "🍎",
      rarity: "LEGENDARY",
      enchantments: ["Continuous Growth II", "Passion IV"],
      lore: "Brimming with continuous drive for mastering new programming languages and modern technologies.",
      attributes: [
        { label: "Passion for Learning", value: "Infinite" },
        { label: "Adaptability", value: "+99" },
        { label: "Team Synergy", value: "+94" }
      ]
    }
  ];

  // Minecraft Advancements / Quests
  let advancements = $state([
    {
      id: "inv",
      title: "Taking Inventory",
      desc: "Enrolled in MCA program at Sona College of Technology.",
      category: "Academic",
      icon: "📦",
      claimed: true,
      xp: 150
    },
    {
      id: "hardware",
      title: "Acquire Hardware",
      desc: "Engineered scalable backend solutions in Python and Java.",
      category: "Engineering",
      icon: "⛏️",
      claimed: false,
      xp: 250
    },
    {
      id: "diamonds",
      title: "Diamonds!",
      desc: "Mastered algorithmic complexity, data structures & modeling.",
      category: "Algorithms",
      icon: "💎",
      claimed: false,
      xp: 350
    },
    {
      id: "enchanter",
      title: "Enchanter",
      desc: "Crafted interactive, responsive web applications with modern frameworks.",
      category: "Frontend",
      icon: "🔮",
      claimed: false,
      xp: 300
    },
    {
      id: "overpowered",
      title: "Overpowered",
      desc: "Discovered all interactive game secrets in Kishore's portfolio.",
      category: "Mastery",
      icon: "🌟",
      claimed: false,
      xp: 500
    }
  ]);

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

  // Mine XP action
  function handleMineXp(e) {
    gainXp(75, "+75 XP ⛏️", e);
  }

  // Eat golden apple action
  function handleEatApple(e) {
    sound.playEat();
    hearts = 5;
    hasGoldenAppleBuff = true;
    addFloatingText("🍎 REGENERATION!", "#FFAA00", e);
    gainXp(120, "+120 XP 🌟", e);
    confetti({
      particleCount: 35,
      spread: 50,
      colors: ["#FFAA00", "#FFFF55", "#55FF55"],
      origin: { y: 0.6 }
    });
  }

  // Toggle hearts damage / heal fun interaction
  function handleHeartClick(e) {
    if (hearts > 1) {
      hearts -= 1;
      sound.playPop();
      addFloatingText("-1 Heart 💔", "#FF5555", e);
    } else {
      hearts = 5;
      sound.playEat();
      addFloatingText("FULL HEAL ❤️", "#55FF55", e);
    }
  }

  // Buff an RPG stat
  function boostStat(stat, e) {
    if (stat.value < 100) {
      stat.value = Math.min(100, stat.value + 1);
      sound.playCraft();
      gainXp(25, `+1 ${stat.name}!`, e);
    } else {
      sound.playPop();
      addFloatingText("MAXED OUT! 🌟", "#FFFF55", e);
    }
  }

  // Claim advancement
  function claimAdvancement(adv, e) {
    if (adv.claimed) return;
    adv.claimed = true;
    gainXp(adv.xp, `+${adv.xp} XP CLAIMED! 🏆`, e);
    confetti({
      particleCount: 40,
      spread: 55,
      origin: { y: 0.65 }
    });
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
    
    <!-- Gaming Section Heading -->
    <div class="text-center mb-8 sm:mb-10">
      <div class="inline-flex items-center gap-2 px-3 py-1 bg-[#1a1b22] mc-slot mb-3">
        <Sparkles class="w-4 h-4 text-[#FFFF55] animate-pulse" />
        <span class="text-[10px] font-pixel text-[#FFFF55] uppercase tracking-wider">RPG PLAYER PROFILE & ATTRIBUTES</span>
      </div>
      <h2 class="font-pixel text-2xl sm:text-3xl md:text-4xl text-[#FFFF55] mc-text-shadow-gold mb-3">
        ABOUT ME
      </h2>
      <div class="h-1.5 w-32 bg-[#55FF55] mx-auto border-2 border-black shadow-[0_0_12px_#55FF55]"></div>
      <p class="font-sans text-xs sm:text-sm text-slate-300 mt-3 max-w-2xl mx-auto leading-relaxed">
        MCA Candidate & Full-Stack Crafter. Explore my character sheet, lore, equipped gear, and interactive skill stats.
      </p>
    </div>

    <!-- TOP GAMING HUD (Player Health, Identity, Mini-actions & Sound) -->
    <div class="mc-container p-4 sm:p-5 bg-[#0c0d12] mb-6 border-2 border-black">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-4">
        
        <!-- Player Identity & Hearts Bar -->
        <div class="flex flex-wrap items-center justify-center sm:justify-start gap-4">
          <div class="flex items-center gap-3">
            <!-- Player Avatar Button (Interactive Wave) -->
            <button
              type="button"
              class="w-12 h-12 bg-[#161822] border-2 border-black mc-slot flex items-center justify-center font-pixel text-base text-[#FFFF55] relative group cursor-pointer hover:border-[#55FF55] transition-colors"
              onclick={(e) => gainXp(25, "+25 XP 👋", e)}
              title="Click avatar to wave!"
            >
              <span>KP</span>
              <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#55FF55] border border-black shadow-[0_0_8px_#55FF55]"></span>
            </button>
            
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="font-pixel text-sm sm:text-base text-[#FFFF55] mc-text-shadow-gold">KISHORE P M</span>
                <span class="text-[9px] font-pixel px-2 py-0.5 bg-[#040507] text-[#55FFFF] border border-black">
                  LVL {level}
                </span>
                <span class="text-[9px] font-silkscreen px-2 py-0.5 bg-[#0e2413] text-[#55FF55] border border-[#55FF55]/40 flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#55FF55] animate-ping"></span>
                  READY FOR HIRE
                </span>
              </div>
              <div class="flex items-center gap-3 mt-1 text-slate-300 text-xs font-sans flex-wrap">
                <span class="flex items-center gap-1">
                  <GraduationCap class="w-3.5 h-3.5 text-[#55FFFF]" />
                  MCA Scholar @ Sona College of Technology
                </span>
                <span class="text-slate-600 hidden sm:inline">&bull;</span>
                <span class="flex items-center gap-1 text-slate-400">
                  <MapPin class="w-3.5 h-3.5 text-[#FF5555]" />
                  Salem, India
                </span>
              </div>
            </div>
          </div>

          <!-- Interactive Hearts Bar -->
          <div
            class="flex items-center gap-1 bg-[#040507] px-3 py-1.5 mc-slot"
            title="Click hearts to test health interaction!"
          >
            {#each Array(5) as _, i}
              <button
                type="button"
                class="transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                onclick={(e) => handleHeartClick(e)}
                aria-label="Player heart"
              >
                <Heart
                  class="w-4 h-4 transition-colors {i < hearts
                    ? hasGoldenAppleBuff
                      ? 'fill-[#FFAA00] text-[#FF5555]'
                      : 'fill-[#FF5555] text-[#AA00AA]'
                    : 'fill-slate-700 text-slate-800'}"
                />
              </button>
            {/each}
            {#if hasGoldenAppleBuff}
              <span class="text-[9px] font-pixel text-[#FFAA00] ml-1.5 animate-pulse hidden sm:inline">BUFFED</span>
            {/if}
          </div>
        </div>

        <!-- Interactive Game Buttons & SFX Toggle -->
        <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <!-- Mine Code XP Button -->
          <button
            type="button"
            onclick={handleMineXp}
            class="mc-button px-3 py-2 text-[10px] sm:text-xs font-pixel flex items-center gap-2 active:scale-95 cursor-pointer"
            title="Mine Code for XP!"
          >
            <Pickaxe class="w-3.5 h-3.5 text-[#55FF55]" />
            <span>MINE XP</span>
          </button>

          <!-- Golden Apple Heal Button -->
          <button
            type="button"
            onclick={handleEatApple}
            class="mc-button mc-button-gold px-3 py-2 text-[10px] sm:text-xs font-pixel flex items-center gap-2 active:scale-95 cursor-pointer"
            title="Eat enchanted golden apple!"
          >
            <Apple class="w-3.5 h-3.5 text-[#FFFF55]" />
            <span>EAT APPLE</span>
          </button>

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
            EXPERIENCE PROGRESSION
          </span>
          <span class="font-silkscreen text-[#FFFF55]">{xp.toLocaleString()} / {maxXp.toLocaleString()} XP</span>
        </div>
        
        <button
          type="button"
          class="w-full text-left mc-xp-container cursor-pointer relative block p-0"
          onclick={(e) => gainXp(50, "+50 XP ⚡", e)}
          title="Click XP bar to gain bonus XP!"
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

    <!-- MAIN GAMING INTERFACE -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      <!-- LEFT 8 COLUMNS: Game Modes & Character Sheet -->
      <div class="lg:col-span-8 mc-container p-4 sm:p-6 bg-[#0c0d12]">
        
        <!-- Game Tabs Selector -->
        <div class="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b-2 border-black no-scrollbar">
          <button
            type="button"
            onclick={() => { sound.playClick(); activeTab = "lore"; }}
            class="px-3.5 py-2 text-xs font-pixel whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 {activeTab === 'lore'
              ? 'mc-container-gold bg-[#8c6708] text-white shadow-md'
              : 'mc-button bg-[#1c1e27] text-slate-300'}"
          >
            <BookOpen class="w-3.5 h-3.5" />
            <span>LORE & STORY</span>
          </button>

          <button
            type="button"
            onclick={() => { sound.playClick(); activeTab = "stats"; }}
            class="px-3.5 py-2 text-xs font-pixel whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 {activeTab === 'stats'
              ? 'mc-container bg-[#1c4d1c] text-white shadow-md'
              : 'mc-button bg-[#1c1e27] text-slate-300'}"
          >
            <Sliders class="w-3.5 h-3.5" />
            <span>RPG STAT MATRIX</span>
          </button>

          <button
            type="button"
            onclick={() => { sound.playClick(); activeTab = "gear"; }}
            class="px-3.5 py-2 text-xs font-pixel whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 {activeTab === 'gear'
              ? 'mc-container-diamond bg-[#080f14] text-white shadow-md'
              : 'mc-button bg-[#1c1e27] text-slate-300'}"
          >
            <Sword class="w-3.5 h-3.5" />
            <span>EQUIPPED GEAR</span>
          </button>

          <button
            type="button"
            onclick={() => { sound.playClick(); activeTab = "quests"; }}
            class="px-3.5 py-2 text-xs font-pixel whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 {activeTab === 'quests'
              ? 'mc-container-gold bg-[#523d06] text-[#FFFF55] shadow-md'
              : 'mc-button bg-[#1c1e27] text-slate-300'}"
          >
            <Trophy class="w-3.5 h-3.5" />
            <span>ADVANCEMENTS</span>
          </button>
        </div>

        <!-- TAB 1: LORE & STORY -->
        {#if activeTab === "lore"}
          <div>
            <!-- Chapter Selector -->
            <div class="flex items-center gap-2 mb-4">
              <span class="text-[10px] font-pixel text-slate-400 mr-1 hidden sm:inline">CHAPTERS:</span>
              {#each [1, 2, 3] as ch}
                <button
                  type="button"
                  onclick={() => { sound.playClick(); activeChapter = ch; }}
                  class="px-2.5 py-1 text-[10px] font-pixel transition-all cursor-pointer {activeChapter === ch
                    ? 'bg-[#55FF55] text-black font-bold border border-black shadow-[0_0_10px_#55FF55]'
                    : 'mc-slot bg-[#040507] text-slate-400 hover:text-white'}"
                >
                  {ch === 1 ? '1. SPAWN POINT' : ch === 2 ? '2. BACKEND FORGE' : '3. FULLSTACK OVERWORLD'}
                </button>
              {/each}
            </div>

            <!-- Chapter Narrative Text -->
            <div class="p-4 sm:p-5 mc-slot bg-[#12141c] mb-5">
              {#if activeChapter === 1}
                <div class="space-y-3">
                  <h4 class="font-pixel text-xs sm:text-sm text-[#FFFF55] flex items-center gap-2">
                    <span>CHAPTER 1: THE ACADEMIC SPAWN</span>
                    <span class="text-[10px] font-silkscreen text-slate-400">(Foundations)</span>
                  </h4>
                  <p class="text-slate-200 text-xs sm:text-sm leading-relaxed font-sans">
                    My coding adventure began at <strong class="text-[#55FFFF]">Sona College of Technology</strong>, where I enrolled in the Master of Computer Applications (MCA) program. Here, I immersed myself in structural computing principles, relational database management systems, and discrete mathematics.
                  </p>
                  <p class="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                    I developed a rigorous discipline for writing modular, efficient code and understanding the core architectural mechanics that power enterprise systems.
                  </p>
                </div>
              {:else if activeChapter === 2}
                <div class="space-y-3">
                  <h4 class="font-pixel text-xs sm:text-sm text-[#55FF55] flex items-center gap-2">
                    <span>CHAPTER 2: THE FORGE OF BACKEND CODE</span>
                    <span class="text-[10px] font-silkscreen text-slate-400">(Backend & Systems)</span>
                  </h4>
                  <p class="text-slate-200 text-xs sm:text-sm leading-relaxed font-sans">
                    In the forge, I mastered <strong class="text-[#FFFF55]">Python</strong> and <strong class="text-[#FF5555]">Java</strong>, building dependable backend microservices, asynchronous REST API endpoints, and clean SQL database schemas.
                  </p>
                  <p class="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                    Whether untangling algorithmic bottlenecks or constructing resilient data contracts, I enjoy solving complex logic puzzles under performance constraints.
                  </p>
                </div>
              {:else}
                <div class="space-y-3">
                  <h4 class="font-pixel text-xs sm:text-sm text-[#55FFFF] flex items-center gap-2">
                    <span>CHAPTER 3: THE FULLSTACK OVERWORLD</span>
                    <span class="text-[10px] font-silkscreen text-slate-400">(Frontend & Architecture)</span>
                  </h4>
                  <p class="text-slate-200 text-xs sm:text-sm leading-relaxed font-sans">
                    Bridging user experience and performance, I create responsive, engaging user interfaces using <strong class="text-[#55FF55]">Svelte</strong>, Tailwind CSS, and reactive state management.
                  </p>
                  <p class="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                    I believe great software should not only be mathematically fast and reliable, but also delightful, accessible, and intuitive to interact with.
                  </p>
                </div>
              {/if}
            </div>

            <!-- Quick Specs Row -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              <div class="mc-slot p-2.5 bg-[#040507]">
                <span class="text-[9px] font-silkscreen text-slate-400 block">EDUCATION</span>
                <span class="text-xs font-mono text-[#55FFFF] font-bold">MCA Candidate</span>
              </div>
              <div class="mc-slot p-2.5 bg-[#040507]">
                <span class="text-[9px] font-silkscreen text-slate-400 block">PRIMARY STACK</span>
                <span class="text-xs font-mono text-[#55FF55] font-bold">Python &bull; Svelte</span>
              </div>
              <div class="mc-slot p-2.5 bg-[#040507]">
                <span class="text-[9px] font-silkscreen text-slate-400 block">ENTERPRISE</span>
                <span class="text-xs font-mono text-[#FFFF55] font-bold">Java &bull; APIs</span>
              </div>
              <div class="mc-slot p-2.5 bg-[#040507]">
                <span class="text-[9px] font-silkscreen text-slate-400 block">BASE LOCATION</span>
                <span class="text-xs font-mono text-[#FF5555] font-bold">Salem, India</span>
              </div>
            </div>
          </div>
        {/if}

        <!-- TAB 2: RPG STAT MATRIX -->
        {#if activeTab === "stats"}
          <div>
            <div class="flex items-center justify-between mb-4">
              <div>
                <h4 class="font-pixel text-xs sm:text-sm text-[#55FF55] flex items-center gap-2">
                  <Sliders class="w-4 h-4 text-[#55FF55]" />
                  <span>CHARACTER ATTRIBUTE MATRIX</span>
                </h4>
                <p class="text-[11px] text-slate-400 font-sans mt-0.5">Click any stat's "+ BUFF" button to level it up!</p>
              </div>
              <span class="text-[10px] font-pixel text-[#FFFF55] bg-[#050608] px-2 py-1 mc-slot border border-black">
                TOTAL: 572 / 600
              </span>
            </div>

            <div class="space-y-3">
              {#each rpgStats as stat}
                <div class="mc-slot p-3.5 bg-[#08090d] hover:bg-[#12141c] transition-all flex flex-col gap-2 group">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2.5">
                      <span class="text-xl">{stat.icon}</span>
                      <div>
                        <span class="font-mono text-xs font-bold text-white group-hover:text-[#55FF55] transition-colors">
                          {stat.name}
                        </span>
                        <div class="text-[10px] text-slate-400 font-sans mt-0.5 line-clamp-1">
                          {stat.desc}
                        </div>
                      </div>
                    </div>

                    <div class="flex items-center gap-3 shrink-0">
                      <span class="font-pixel text-xs" style="color: {stat.color};">
                        {stat.value} / {stat.max}
                      </span>
                      <button
                        type="button"
                        onclick={(e) => boostStat(stat, e)}
                        class="mc-button px-2 py-1 text-[9px] font-pixel flex items-center gap-1 active:scale-95 cursor-pointer"
                        title="Boost this attribute!"
                      >
                        + BUFF
                      </button>
                    </div>
                  </div>

                  <!-- Visual Progress Bar -->
                  <div class="w-full h-2.5 bg-[#040507] border border-black overflow-hidden relative">
                    <div
                      class="h-full transition-all duration-300"
                      style="width: {(stat.value / stat.max) * 100}%; background-color: {stat.color}; box-shadow: 0 0 8px {stat.color};"
                    ></div>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- TAB 3: EQUIPPED GEAR & INSPECT -->
        {#if activeTab === "gear"}
          <div>
            <div class="flex items-center justify-between mb-4">
              <h4 class="font-pixel text-xs sm:text-sm text-[#55FFFF] flex items-center gap-2">
                <Sword class="w-4 h-4 text-[#55FFFF]" />
                <span>KISHORE'S EQUIPPED RPG GEAR</span>
              </h4>
              <span class="text-[10px] font-silkscreen text-slate-400">SELECT ITEM TO INSPECT</span>
            </div>

            <!-- Gear Grid (2 x 3) -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
              {#each gearItems as item, idx}
                <button
                  type="button"
                  class="mc-slot p-3 bg-[#0a0c12] hover:bg-[#141724] transition-all cursor-pointer flex flex-col items-center text-center group {selectedGearIndex === idx ? 'border-[#55FFFF] ring-2 ring-[#55FFFF]/60' : ''}"
                  onclick={(e) => {
                    sound.playPop();
                    selectedGearIndex = idx;
                    gainXp(15, "+15 XP ⚔️", e);
                  }}
                >
                  <span class="text-[9px] font-silkscreen text-slate-400 mb-1">{item.slot}</span>
                  <div class="w-12 h-12 mc-slot bg-[#040507] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform mc-enchanted mb-2">
                    <span>{item.icon}</span>
                  </div>
                  <span class="text-xs font-mono text-slate-200 group-hover:text-[#55FFFF] font-bold line-clamp-1">
                    {item.name}
                  </span>
                  <span class="text-[9px] font-pixel text-[#FFFF55] mt-1">{item.rarity}</span>
                </button>
              {/each}
            </div>

            <!-- Authentic Minecraft Dark-Purple Lore Tooltip -->
            {#if gearItems[selectedGearIndex]}
              {@const selected = gearItems[selectedGearIndex]}
              <div class="mc-tooltip p-4 sm:p-5 text-left rounded-none relative">
                <div class="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h5 class="font-pixel text-xs sm:text-sm text-[#55FFFF] mc-text-shadow-diamond mb-1">
                      {selected.name}
                    </h5>
                    <div class="text-[10px] font-silkscreen text-[#AA00AA]">
                      Slot: {selected.slot} &bull; Rarity: {selected.rarity}
                    </div>
                  </div>
                  <div class="text-3xl">{selected.icon}</div>
                </div>

                <!-- Enchantments List in soft cyan -->
                <div class="space-y-0.5 my-2">
                  {#each selected.enchantments as ench}
                    <div class="font-pixel text-[10px] text-[#55FFFF]">
                      {ench}
                    </div>
                  {/each}
                </div>

                <!-- Lore text in italics grey -->
                <p class="text-slate-300 text-xs font-sans italic leading-relaxed my-2 border-y border-[#3d0075] py-2">
                  "{selected.lore}"
                </p>

                <!-- Attribute Modifiers -->
                <div class="mt-2 space-y-1">
                  <div class="text-[10px] font-pixel text-[#5555FF]">When equipped:</div>
                  {#each selected.attributes as attr}
                    <div class="text-xs font-mono text-[#55FFFF] flex items-center gap-1.5 pl-2">
                      <span class="text-[#55FF55]">&bull;</span>
                      <span>{attr.label}: {attr.value}</span>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        {/if}

        <!-- TAB 4: ADVANCEMENTS & ACHIEVEMENTS -->
        {#if activeTab === "quests"}
          <div>
            <div class="flex items-center justify-between mb-4">
              <h4 class="font-pixel text-xs sm:text-sm text-[#FFFF55] flex items-center gap-2">
                <Trophy class="w-4 h-4 text-[#FFFF55]" />
                <span>MINECRAFT ADVANCEMENTS & QUESTS</span>
              </h4>
              <span class="text-[10px] font-silkscreen text-[#55FF55]">CLAIM REWARDS FOR XP</span>
            </div>

            <div class="space-y-3">
              {#each advancements as adv}
                <div
                  class="mc-slot p-3 sm:p-4 bg-[#0a0b10] hover:bg-[#12141c] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div class="flex items-start sm:items-center gap-3">
                    <div class="w-10 h-10 mc-slot bg-[#040507] flex items-center justify-center text-xl shrink-0 border-[#55FF55]">
                      <span>{adv.icon}</span>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="font-pixel text-xs text-[#FFFF55] mc-text-shadow-gold">
                          {adv.title}
                        </span>
                        <span class="text-[9px] font-silkscreen px-1.5 py-0.5 bg-[#000000] text-[#55FFFF] border border-black">
                          {adv.category}
                        </span>
                      </div>
                      <p class="text-xs text-slate-300 font-sans mt-0.5">
                        {adv.desc}
                      </p>
                    </div>
                  </div>

                  <!-- Claim Action Button -->
                  <div class="shrink-0 self-end sm:self-center">
                    {#if adv.claimed}
                      <span class="text-[10px] font-pixel text-[#55FF55] flex items-center gap-1">
                        <span>COMPLETED</span>
                        <span>✔</span>
                      </span>
                    {:else}
                      <button
                        type="button"
                        onclick={(e) => claimAdvancement(adv, e)}
                        class="mc-button mc-button-gold px-3 py-1.5 text-[10px] font-pixel flex items-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <Award class="w-3.5 h-3.5" />
                        <span>CLAIM +{adv.xp} XP</span>
                      </button>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- INTERACTIVE MINECRAFT HOTBAR (Always Interactive at Bottom) -->
        <div class="mt-6 pt-5 border-t-2 border-black">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[10px] font-pixel text-[#FFFF55]">QUICK INVENTORY HOTBAR</span>
            <span class="text-[9px] font-silkscreen text-slate-400">CLICK ANY SLOT [1-9] TO EQUIP</span>
          </div>

          <!-- 9 Hotbar Slots Grid -->
          <div class="grid grid-cols-9 gap-1 sm:gap-1.5 bg-[#000000] p-1.5 mc-slot border-2 border-black">
            {#each hotbarItems as item, idx}
              <button
                type="button"
                onclick={(e) => {
                  sound.playPop();
                  activeHotbarIndex = idx;
                  gainXp(10, `+10 XP: ${item.name}`, e);
                }}
                class="w-full aspect-square mc-slot flex flex-col items-center justify-center p-1 cursor-pointer transition-all relative {activeHotbarIndex === idx ? 'bg-[#222533] border-[#55FF55] ring-2 ring-[#55FF55]' : 'bg-[#0a0b10] hover:bg-[#141620]'}"
                title={`[Slot ${item.slot}] ${item.name}`}
              >
                <span class="text-base sm:text-lg">{item.icon}</span>
                <span class="text-[8px] font-pixel text-[#FFFF55] absolute bottom-0.5 right-1 hidden sm:inline">
                  {item.slot}
                </span>
              </button>
            {/each}
          </div>

          <!-- Active Hotbar Item Readout Banner -->
          {#if hotbarItems[activeHotbarIndex]}
            {@const activeItem = hotbarItems[activeHotbarIndex]}
            <div class="mt-3 p-3 mc-slot bg-[#050609] border border-[#55FF55]/60 flex items-center justify-between gap-3 animate-fade-in">
              <div class="flex items-center gap-2.5">
                <span class="text-2xl">{activeItem.icon}</span>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-pixel text-[11px] text-[#55FF55]">{activeItem.name}</span>
                    <span class="text-[9px] font-silkscreen px-1.5 py-0.5 bg-[#000000] text-[#55FFFF] border border-black">
                      {activeItem.type}
                    </span>
                  </div>
                  <p class="text-[11px] text-slate-300 font-sans mt-0.5">
                    {activeItem.desc}
                  </p>
                </div>
              </div>
              <span class="font-pixel text-xs text-[#FFFF55] shrink-0">{activeItem.power}</span>
            </div>
          {/if}
        </div>

      </div>

      <!-- RIGHT 4 COLUMNS: Highlights Cards & Philosophy -->
      <div class="lg:col-span-4 space-y-4">
        
        <div class="flex items-center justify-between mb-1">
          <span class="font-pixel text-xs text-[#FFFF55]">HIGHLIGHTS</span>
          <span class="text-[10px] font-silkscreen text-slate-400">CLICK CARD TO EXPAND</span>
        </div>

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

              <!-- Tags / Skill pills -->
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

        <!-- Interactive Developer Philosophy -->
        <div class="mc-container p-4 bg-[#0a0b0f] border-2 border-black">
          <div class="flex items-center gap-2 mb-2 text-[#FFFF55]">
            <Flame class="w-4 h-4 text-[#FF5555] animate-pulse" />
            <span class="font-pixel text-[10px] uppercase">DEVELOPER PHILOSOPHY</span>
          </div>
          <p class="text-xs text-slate-300 font-sans italic leading-relaxed">
            "Like building enduring structures in Minecraft, software engineering requires a sturdy bedrock, efficient logic circuits, and a passion for crafting engaging experiences."
          </p>
          <div class="mt-2 text-right">
            <span class="font-pixel text-[9px] text-[#55FFFF]">— Kishore P M</span>
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
