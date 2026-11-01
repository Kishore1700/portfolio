<script>
  import { onMount } from "svelte";
  import {
    GraduationCap,
    Code,
    BookOpen,
    Heart,
    CheckSquare,
    Sparkles,
    Sword,
    Hammer,
    Trophy,
    Volume2,
    VolumeX,
    Pickaxe,
    Apple,
    ChevronRight,
    Flame,
    Zap,
    X,
    Award
  } from "lucide-svelte";
  import confetti from "canvas-confetti";
  import { sound } from "../utils/sound.js";

  // Active Tab: 'lore' | 'gear' | 'craft' | 'advancements'
  let activeTab = $state("lore");

  // Chapter in Lore tab: 1 | 2 | 3
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

  // Selected gear item for tooltip/inspect
  let selectedGear = $state(null);

  // Selected strength item for detail inspection
  let selectedStrength = $state(null);

  // Highlight card expanded modal/drawer
  let expandedHighlight = $state(null);

  // Crafting state
  let craftingSlots = $state([null, null, null, null, null, null, null, null, null]);
  let craftedOutput = $state(null);
  let craftingSuccessMessage = $state("");

  // Advancements tracking
  let advancements = $state([
    {
      id: "inv",
      title: "Taking Inventory",
      desc: "Enrolled in MCA at Sona College of Technology.",
      category: "Academic",
      icon: "📦",
      unlocked: true,
      claimed: false,
      xp: 150
    },
    {
      id: "hardware",
      title: "Acquire Hardware",
      desc: "Engineered scalable backend solutions in Python and Java.",
      category: "Engineering",
      icon: "⛏️",
      unlocked: true,
      claimed: false,
      xp: 250
    },
    {
      id: "diamonds",
      title: "Diamonds!",
      desc: "Mastered algorithmic complexity, data structures & modeling.",
      category: "Algorithms",
      icon: "💎",
      unlocked: true,
      claimed: false,
      xp: 350
    },
    {
      id: "enchanter",
      title: "Enchanter",
      desc: "Crafted interactive, responsive web applications with modern frameworks.",
      category: "Frontend",
      icon: "🔮",
      unlocked: true,
      claimed: false,
      xp: 300
    },
    {
      id: "overpowered",
      title: "Overpowered",
      desc: "Discovered all interactive secrets and crafted a masterpiece portfolio.",
      category: "Mastery",
      icon: "🌟",
      unlocked: false,
      claimed: false,
      xp: 500
    }
  ]);

  // Crafting Recipes
  const recipes = [
    {
      id: "backend",
      name: "Scalable Backend Engine",
      icon: "🚀",
      inputs: ["Python", "Java", "REST APIs", "SQL", "Logic", "System Architecture"],
      grid: ["🐍 Python", "☕ Java", "⚡ Logic", "🗄️ SQL", "🔒 Security", "⚡ Async", "⚙️ APIs", "📡 Socket", "📦 Docker"],
      output: {
        name: "Robust Backend API",
        icon: "🚀",
        rarity: "EPIC",
        lore: "An unyielding microservice architecture forged in Java and Python."
      }
    },
    {
      id: "ui",
      name: "Minecraft Web Portfolio",
      icon: "✨",
      inputs: ["Svelte", "Tailwind", "Voxel Art", "Web Audio", "Pixel CSS"],
      grid: ["🎨 Svelte 5", "📱 Tailwind", "🟩 Pixels", "🔊 WebAudio", "⚡ Vite", "💎 Confetti", "🖱️ Mouse FX", "✨ Shaders", "📦 Bundler"],
      output: {
        name: "Interactive Portfolio UI",
        icon: "✨",
        rarity: "LEGENDARY",
        lore: "Crafted with pixel precision, interactive physics, and authentic retro SFX."
      }
    },
    {
      id: "mca",
      name: "Master of Computer Applications",
      icon: "🎓",
      inputs: ["Sona College", "Algorithms", "DSA", "Hard Work", "Clean Code"],
      grid: ["🏫 Sona College", "🧠 DSA", "📚 Computer Science", "💻 Projects", "🎓 MCA", "🔬 Research", "🌟 Teamwork", "⚡ Dedication", "🏆 Degree"],
      output: {
        name: "MCA Graduation Trophy",
        icon: "🎓",
        rarity: "RARE",
        lore: "Master level education from Sona College of Technology."
      }
    }
  ];

  // RPG Equipment Items
  const gearItems = [
    {
      id: "sword",
      slot: "Main Hand",
      name: "Netherite Sword of Logic",
      icon: "🗡️",
      rarity: "LEGENDARY",
      enchantments: ["Sharpness V", "Unbreaking III", "Looting III"],
      lore: "Forged in the depths of algorithm practice. Slices through complex time-complexity challenges with ease.",
      attributes: [
        { label: "Algorithmic Precision", value: "+99" },
        { label: "Backend Throughput", value: "+85" },
        { label: "Code Cleanliness", value: "+92%" }
      ]
    },
    {
      id: "chestplate",
      slot: "Chestplate",
      name: "Diamond Armor of Architecture",
      icon: "🛡️",
      rarity: "EPIC",
      enchantments: ["Protection IV", "Mending I"],
      lore: "Engineered using Python & Java architectural patterns. Provides full immunity against server crashes and memory leaks.",
      attributes: [
        { label: "System Stability", value: "+95%" },
        { label: "Concurrency Handling", value: "+88" },
        { label: "Database Optimization", value: "+90" }
      ]
    },
    {
      id: "book",
      slot: "Offhand",
      name: "Enchanted Tome of MCA",
      icon: "📖",
      rarity: "RARE",
      enchantments: ["Knowledge X", "Efficiency V"],
      lore: "A compendium of software engineering principles acquired at Sona College of Technology.",
      attributes: [
        { label: "Theoretical Mastery", value: "+94" },
        { label: "Academic Standing", value: "Distinction" },
        { label: "Problem Solving", value: "+96" }
      ]
    },
    {
      id: "torch",
      slot: "Utility",
      name: "Redstone Repeater of Svelte",
      icon: "⚡",
      rarity: "EPIC",
      enchantments: ["Swiftness III", "Signal Power 15"],
      lore: "Emits ultra-fast reactive updates to the user interface. Never drops a single frame.",
      attributes: [
        { label: "Reactivity Latency", value: "<1ms" },
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
      enchantments: ["Resilience IV", "Zero Downtime"],
      lore: "Grants a second wind whenever facing an obscure edge-case or null pointer exception in production.",
      attributes: [
        { label: "Tenacity & Debugging", value: "+100" },
        { label: "Critical Thinking", value: "+95" },
        { label: "Adaptability", value: "+92" }
      ]
    },
    {
      id: "apple",
      slot: "Consumable",
      name: "Enchanted Golden Apple of Curiosity",
      icon: "🍎",
      rarity: "LEGENDARY",
      enchantments: ["Regeneration II", "Absorption IV", "Resistance II"],
      lore: "Brimming with continuous passion for discovering new programming languages and modern tech stacks.",
      attributes: [
        { label: "Passion for Learning", value: "Infinite" },
        { label: "Adaptability", value: "+99" },
        { label: "Team Synergy", value: "+90" }
      ]
    }
  ];

  // Key Strengths
  const keyStrengths = [
    {
      name: "Teamwork",
      desc: "Thrives in collaborative sprints, pair-programming, and cross-functional teams.",
      buff: "+20 Team Synergy",
      icon: "🤝",
      tag: "Soft Skill"
    },
    {
      name: "Adaptability",
      desc: "Swiftly adapts to new tools, libraries, frameworks, and architecture patterns.",
      buff: "+25 Agility",
      icon: "🔄",
      tag: "Soft Skill"
    },
    {
      name: "Active Listening",
      desc: "Deeply absorbs stakeholder feedback and user requirements to craft targeted solutions.",
      buff: "+18 Empathy",
      icon: "🎧",
      tag: "Communication"
    },
    {
      name: "Critical Thinking",
      desc: "Breaks intricate architectural problems into clean, testable algorithmic components.",
      buff: "+30 Logic",
      icon: "🧠",
      tag: "Problem Solving"
    }
  ];

  // Areas of Interest
  const areasOfInterest = [
    {
      name: "Web Designing",
      desc: "Building intuitive, high-speed, and accessible frontends with retro aesthetic polish.",
      buff: "+22 UI Mastery",
      icon: "🎨"
    },
    {
      name: "Exploring Tech",
      desc: "Constantly experimenting with emerging tools, agentic AI, APIs, and modern runtime engines.",
      buff: "+28 Innovation",
      icon: "🚀"
    }
  ];

  // Highlights
  const highlights = [
    {
      id: "mca",
      icon: GraduationCap,
      colorClass: "text-[#55FFFF]",
      bgSlot: "bg-[#182329]",
      title: "MCA Student",
      shortDesc: "Sona College of Technology, pursuing master level software engineering education.",
      detailedDesc:
        "Pursuing Master of Computer Applications (MCA) at Sona College of Technology. Deeply studying computer systems, relational database modeling, software architecture principles, distributed computing, and advanced data structures.",
      skills: ["Data Structures", "System Design", "Database Modeling", "Software Engineering"],
      badge: "Degree in Progress"
    },
    {
      id: "dev",
      icon: Code,
      colorClass: "text-[#55FF55]",
      bgSlot: "bg-[#182618]",
      title: "Developer & Programmer",
      shortDesc: "Skilled in writing clean, efficient backend logic using Python and Java.",
      detailedDesc:
        "Hands-on expertise constructing clean, performant backends, microservices, and REST APIs. Proficient in Python, Java, asynchronous programming, modern database integration, and writing modular, maintainable code with strict type-safety and error handling.",
      skills: ["Python", "Java", "RESTful APIs", "OOP", "Database Design"],
      badge: "Backend & Fullstack"
    },
    {
      id: "solver",
      icon: BookOpen,
      colorClass: "text-[#FFFF55]",
      bgSlot: "bg-[#272618]",
      title: "Problem Solver",
      shortDesc: "Passionate about structural data concepts, algorithm modeling, and DSA.",
      detailedDesc:
        "Passionate competitive and pragmatic problem solver. Constantly sharpening skills in algorithmic complexity analysis, graph traversals, dynamic programming, sorting optimization, and structural data patterns.",
      skills: ["Algorithms", "Complexity (Big O)", "Problem Solving", "Mathematical Logic"],
      badge: "Algorithm Crafter"
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
  function handleHeartClick(index, e) {
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

  // Apply crafting recipe
  function applyRecipe(recipe) {
    sound.playClick();
    craftingSlots = [...recipe.grid];
    craftedOutput = recipe.output;
    craftingSuccessMessage = `Ready to craft: ${recipe.name}! Click the result slot.`;
  }

  // Collect crafted item
  function collectCraftedItem(e) {
    if (!craftedOutput) return;
    sound.playCraft();
    gainXp(200, `+200 XP Crafted!`, e);
    craftingSuccessMessage = `✨ Crafted [${craftedOutput.name}]! Added to Kishore's Inventory.`;

    confetti({
      particleCount: 60,
      spread: 70,
      colors: ["#55FFFF", "#FFFF55", "#55FF55"],
      origin: { y: 0.7 }
    });

    // Check overpowered advancement
    const opAdv = advancements.find((a) => a.id === "overpowered");
    if (opAdv && !opAdv.unlocked) {
      opAdv.unlocked = true;
      setTimeout(() => {
        sound.playLevelUp();
        addFloatingText("🏆 ADVANCEMENT UNLOCKED!", "#FFFF55");
      }, 500);
    }
  }

  // Claim advancement
  function claimAdvancement(adv, e) {
    if (!adv.unlocked || adv.claimed) return;
    adv.claimed = true;
    sound.playLevelUp();
    gainXp(adv.xp, `+${adv.xp} XP!`, e);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.6 }
    });
  }

  // Toggle Sound
  function toggleSound() {
    isMuted = sound.toggleMute();
  }

  onMount(() => {
    isMuted = sound.getMuted();
    selectedGear = gearItems[0];
  });
</script>

<section id="about" class="relative py-16 sm:py-20 px-3 sm:px-6 lg:px-8 overflow-hidden select-none">
  <div class="max-w-7xl mx-auto z-10 relative">
    
    <!-- Minecraft Section Heading -->
    <div class="text-center mb-10 sm:mb-12">
      <div class="inline-flex items-center gap-2 px-3 py-1 bg-[#1a1b22] mc-slot mb-3">
        <Pickaxe class="w-4 h-4 text-[#FFFF55] animate-bounce" />
        <span class="text-[10px] font-pixel text-[#FFFF55] uppercase tracking-wider">PLAYER PROFILE & STATS</span>
      </div>
      <h2 class="font-pixel text-2xl sm:text-3xl md:text-4xl text-[#FFFF55] mc-text-shadow-gold mb-3">
        ABOUT ME
      </h2>
      <div class="h-1.5 w-32 bg-[#55FF55] mx-auto border-2 border-black shadow-[0_0_12px_#55FF55]"></div>
      <p class="font-sans text-xs sm:text-sm text-slate-300 mt-3 max-w-xl mx-auto">
        Explore my software development journey, RPG attributes, crafting recipes, and academic achievements.
      </p>
    </div>

    <!-- TOP INTERACTIVE HUD (Player Status Bar) -->
    <div class="mc-container p-4 sm:p-5 bg-[#0c0d12] mb-8 border-2 border-black">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        
        <!-- Player Identity & Hearts -->
        <div class="flex flex-wrap items-center justify-center sm:justify-start gap-4">
          <div class="flex items-center gap-2">
            <!-- Player Head Avatar Button -->
            <button
              type="button"
              class="w-10 h-10 bg-[#161822] border-2 border-black mc-slot flex items-center justify-center font-pixel text-base text-[#FFFF55] relative group cursor-pointer hover:border-[#55FF55]"
              onclick={(e) => gainXp(25, "+25 XP 👋", e)}
              title="Click player avatar to wave!"
            >
              <span>KP</span>
              <span class="absolute -top-1 -right-1 w-3 h-3 bg-[#55FF55] border border-black animate-ping shadow-[0_0_6px_#55FF55]"></span>
            </button>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-pixel text-xs sm:text-sm text-[#FFFF55] mc-text-shadow-gold">KISHORE P M</span>
                <span class="text-[9px] font-pixel px-1.5 py-0.5 bg-[#040507] text-[#55FFFF] border border-black">
                  LVL {level}
                </span>
              </div>
              <span class="text-[11px] font-silkscreen text-slate-400">MCA Scholar & Fullstack Crafter</span>
            </div>
          </div>

          <!-- Interactive Hearts Bar -->
          <div class="flex items-center gap-1 bg-[#040507] px-3 py-1.5 mc-slot"
            title="Click hearts to test health interaction!"
          >
            {#each Array(5) as _, i}
              <button
                type="button"
                class="transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                onclick={(e) => handleHeartClick(i, e)}
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
              <span class="text-[9px] font-pixel text-[#FFAA00] ml-1.5 animate-pulse hidden sm:inline">ABSORPTION</span>
            {/if}
          </div>
        </div>

        <!-- Interactive Action Buttons & Sound Toggle -->
        <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <!-- Mine Code XP Button -->
          <button
            type="button"
            onclick={handleMineXp}
            class="mc-button px-3 py-2 text-[10px] sm:text-xs font-pixel flex items-center gap-2 active:scale-95"
            title="Click to mine code for XP!"
          >
            <Pickaxe class="w-3.5 h-3.5 text-[#55FF55]" />
            <span>MINE XP</span>
          </button>

          <!-- Golden Apple Heal Button -->
          <button
            type="button"
            onclick={handleEatApple}
            class="mc-button mc-button-gold px-3 py-2 text-[10px] sm:text-xs font-pixel flex items-center gap-2 active:scale-95"
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
          >
            {#if isMuted}
              <VolumeX class="w-4 h-4 text-[#FF5555]" />
            {:else}
              <Volume2 class="w-4 h-4 text-[#55FF55]" />
            {/if}
          </button>
        </div>
      </div>

      <!-- Live Minecraft XP Bar -->
      <div class="mt-4 pt-3 border-t border-black/60 relative">
        <div class="flex justify-between items-center text-[10px] sm:text-[11px] font-pixel text-[#55FF55] mb-1.5">
          <span class="flex items-center gap-1.5">
            <Zap class="w-3 h-3 text-[#FFFF55]" />
            EXPERIENCE PROGRESS
          </span>
          <span class="font-silkscreen text-[#FFFF55]">{xp.toLocaleString()} / {maxXp.toLocaleString()} XP</span>
        </div>
        
        <button
          type="button"
          class="w-full text-left mc-xp-container cursor-pointer relative block p-0"
          onclick={(e) => gainXp(50, "+50 XP ⚡", e)}
          title="Click XP bar to gain bonus XP!"
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

    <!-- MAIN INTERACTIVE GUI WITH MINECRAFT TABS -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <!-- LEFT 8 COLUMNS: Tabbed Minecraft Workbench/Book -->
      <div class="lg:col-span-8 mc-container p-4 sm:p-6 bg-[#0c0d12]">
        
        <!-- Tab Navigation Bar (Scrollable on small mobile screens) -->
        <div class="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b-2 border-black no-scrollbar">
          <button
            type="button"
            onclick={() => { sound.playClick(); activeTab = "lore"; }}
            class="px-3.5 py-2 text-xs font-pixel whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 {activeTab === 'lore'
              ? 'mc-container-gold bg-[#8c6708] text-white shadow-md'
              : 'mc-button bg-[#1c1e27] text-slate-300'}"
          >
            <BookOpen class="w-3.5 h-3.5" />
            <span>QUEST LORE</span>
          </button>

          <button
            type="button"
            onclick={() => { sound.playClick(); activeTab = "gear"; }}
            class="px-3.5 py-2 text-xs font-pixel whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 {activeTab === 'gear'
              ? 'mc-container-diamond bg-[#080f14] text-white shadow-md'
              : 'mc-button bg-[#1c1e27] text-slate-300'}"
          >
            <Sword class="w-3.5 h-3.5" />
            <span>RPG GEAR</span>
          </button>

          <button
            type="button"
            onclick={() => { sound.playClick(); activeTab = "craft"; }}
            class="px-3.5 py-2 text-xs font-pixel whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 {activeTab === 'craft'
              ? 'mc-container bg-[#1c4d1c] text-white shadow-md'
              : 'mc-button bg-[#1c1e27] text-slate-300'}"
          >
            <Hammer class="w-3.5 h-3.5" />
            <span>CRAFTING 3x3</span>
          </button>

          <button
            type="button"
            onclick={() => { sound.playClick(); activeTab = "advancements"; }}
            class="px-3.5 py-2 text-xs font-pixel whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 {activeTab === 'advancements'
              ? 'mc-container-gold bg-[#523d06] text-[#FFFF55] shadow-md'
              : 'mc-button bg-[#1c1e27] text-slate-300'}"
          >
            <Trophy class="w-3.5 h-3.5" />
            <span>ADVANCEMENTS</span>
          </button>
        </div>

        <!-- TAB 1: QUEST LORE & CHAPTERS -->
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
                  {ch === 1 ? '1. SPAWN POINT' : ch === 2 ? '2. THE FORGE' : '3. THE OVERWORLD'}
                </button>
              {/each}
            </div>

            <!-- Chapter Narrative Text -->
            <div class="p-4 sm:p-5 mc-slot bg-[#15161c] mb-6">
              {#if activeChapter === 1}
                <div class="space-y-3">
                  <h4 class="font-pixel text-xs sm:text-sm text-[#FFFF55] flex items-center gap-2">
                    <span>CHAPTER 1: THE SPAWN POINT</span>
                    <span class="text-[10px] font-silkscreen text-slate-400">(Academic Foundations)</span>
                  </h4>
                  <p class="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                    My coding adventure began at <strong class="text-[#55FFFF]">Sona College of Technology</strong>, where I enrolled in the Master of Computer Applications (MCA) program. Here, I immersed myself in structural computing principles, database management systems, and discrete mathematics.
                  </p>
                  <p class="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                    I developed a rigorous discipline for writing modular, efficient code and understanding the core mechanics that power enterprise systems.
                  </p>
                </div>
              {:else if activeChapter === 2}
                <div class="space-y-3">
                  <h4 class="font-pixel text-xs sm:text-sm text-[#55FF55] flex items-center gap-2">
                    <span>CHAPTER 2: THE FORGE OF CODE</span>
                    <span class="text-[10px] font-silkscreen text-slate-400">(Backend & Systems)</span>
                  </h4>
                  <p class="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                    In the forge, I mastered <strong class="text-[#FFFF55]">Python</strong> and <strong class="text-[#FF5555]">Java</strong>, building robust backend pipelines, asynchronous API services, and relational database schemas.
                  </p>
                  <p class="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                    Whether untangling algorithmic bottlenecks or crafting bulletproof endpoint architectures, I enjoy solving complex logic puzzles under high-performance constraints.
                  </p>
                </div>
              {:else}
                <div class="space-y-3">
                  <h4 class="font-pixel text-xs sm:text-sm text-[#55FFFF] flex items-center gap-2">
                    <span>CHAPTER 3: THE OVERWORLD</span>
                    <span class="text-[10px] font-silkscreen text-slate-400">(Frontend & Fullstack Craft)</span>
                  </h4>
                  <p class="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                    Bridging design and technology, I fell in love with creating playful, responsive user interfaces using <strong class="text-[#55FF55]">Svelte</strong>, Tailwind CSS, and reactive state management.
                  </p>
                  <p class="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                    I believe great software should not only be mathematically fast, but also engaging, accessible, and delightful to interact with.
                  </p>
                </div>
              {/if}
            </div>

            <!-- Interactive Key Strengths & Areas of Interest -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              
              <!-- Key Strengths -->
              <div>
                <h4 class="font-silkscreen font-bold text-xs text-[#55FFFF] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Sparkles class="w-3.5 h-3.5 text-[#55FFFF]" />
                  <span>KEY STRENGTHS (CLICK TO INSPECT)</span>
                </h4>
                <div class="grid grid-cols-1 gap-2">
                  {#each keyStrengths as item}
                    <button
                      type="button"
                      class="w-full text-left mc-slot p-2.5 bg-[#040507] hover:bg-[#0c0d12] transition-all cursor-pointer flex items-center justify-between group {selectedStrength?.name === item.name ? 'border-[#55FF55] ring-1 ring-[#55FF55]' : ''}"
                      onclick={(e) => {
                        sound.playPop();
                        selectedStrength = item;
                        gainXp(15, "+15 XP 💡", e);
                      }}
                    >
                      <div class="flex items-center gap-2.5">
                        <span class="text-base">{item.icon}</span>
                        <div>
                          <div class="text-xs font-mono text-slate-200 group-hover:text-[#55FF55] font-semibold">
                            {item.name}
                          </div>
                          <div class="text-[10px] font-pixel text-[#55FF55]">{item.buff}</div>
                        </div>
                      </div>
                      <ChevronRight class="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  {/each}
                </div>
              </div>

              <!-- Areas of Interest & Inspection Card -->
              <div>
                <h4 class="font-silkscreen font-bold text-xs text-[#AA00AA] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <CheckSquare class="w-3.5 h-3.5 text-[#AA00AA]" />
                  <span>AREAS OF INTEREST</span>
                </h4>
                <div class="grid grid-cols-1 gap-2 mb-4">
                  {#each areasOfInterest as item}
                    <button
                      type="button"
                      class="w-full text-left mc-slot p-2.5 bg-[#040507] hover:bg-[#0c0d12] transition-all cursor-pointer flex items-center justify-between group {selectedStrength?.name === item.name ? 'border-[#AA00AA] ring-1 ring-[#AA00AA]' : ''}"
                      onclick={(e) => {
                        sound.playPop();
                        selectedStrength = item;
                        gainXp(15, "+15 XP 💡", e);
                      }}
                    >
                      <div class="flex items-center gap-2.5">
                        <span class="text-base">{item.icon}</span>
                        <div>
                          <div class="text-xs font-mono text-slate-200 group-hover:text-[#AA00AA] font-semibold">
                            {item.name}
                          </div>
                          <div class="text-[10px] font-pixel text-[#AA00AA]">{item.buff}</div>
                        </div>
                      </div>
                      <ChevronRight class="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  {/each}
                </div>

                <!-- Inspected Stat Detail Box -->
                {#if selectedStrength}
                  <div class="mc-container p-3 bg-[#111216] border border-[#55FF55] relative animate-fade-in">
                    <div class="flex items-center justify-between mb-1.5">
                      <span class="font-pixel text-[10px] text-[#FFFF55] flex items-center gap-1.5">
                        <span>{selectedStrength.icon}</span>
                        <span>{selectedStrength.name}</span>
                      </span>
                      <span class="text-[9px] font-pixel text-[#55FF55]">{selectedStrength.buff}</span>
                    </div>
                    <p class="text-slate-300 text-xs font-sans leading-relaxed">
                      {selectedStrength.desc}
                    </p>
                  </div>
                {:else}
                  <div class="p-3 border border-dashed border-slate-700 text-center text-slate-500 text-xs font-pixel">
                    Click any strength to view its RPG attribute buff!
                  </div>
                {/if}
              </div>
            </div>
          </div>
        {/if}

        <!-- TAB 2: RPG GEAR & EQUIPMENT -->
        {#if activeTab === "gear"}
          <div>
            <div class="flex items-center justify-between mb-4">
              <h4 class="font-pixel text-xs sm:text-sm text-[#55FFFF] flex items-center gap-2">
                <Sword class="w-4 h-4 text-[#55FFFF]" />
                <span>KISHORE'S EQUIPPED GEAR</span>
              </h4>
              <span class="text-[10px] font-pixel text-slate-400">SELECT TO VIEW LORE</span>
            </div>

            <!-- Gear Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {#each gearItems as item}
                <button
                  type="button"
                  class="mc-slot p-3 bg-[#16171f] hover:bg-[#1f212d] transition-all cursor-pointer flex flex-col items-center text-center group {selectedGear?.id === item.id ? 'border-[#55FFFF] ring-2 ring-[#55FFFF]/60' : ''}"
                  onclick={(e) => {
                    sound.playPop();
                    selectedGear = item;
                    gainXp(20, "+20 XP ⚔️", e);
                  }}
                >
                  <span class="text-[9px] font-silkscreen text-slate-400 mb-1">{item.slot}</span>
                  <div class="w-12 h-12 mc-slot bg-[#101116] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform mc-enchanted mb-2">
                    <span>{item.icon}</span>
                  </div>
                  <span class="text-xs font-mono text-slate-200 group-hover:text-[#55FFFF] font-bold line-clamp-1">
                    {item.name}
                  </span>
                  <span class="text-[9px] font-pixel text-[#FFFF55] mt-1">{item.rarity}</span>
                </button>
              {/each}
            </div>

            <!-- Authentic Minecraft Dark-Purple Lore Tooltip / Inspection Box -->
            {#if selectedGear}
              <div class="mc-tooltip p-4 sm:p-5 text-left rounded-none relative">
                <div class="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h5 class="font-pixel text-xs sm:text-sm text-[#55FFFF] mc-text-shadow-diamond mb-1">
                      {selectedGear.name}
                    </h5>
                    <div class="text-[10px] font-silkscreen text-[#AA00AA]">
                      Slot: {selectedGear.slot} &bull; Rarity: {selectedGear.rarity}
                    </div>
                  </div>
                  <div class="text-2xl">{selectedGear.icon}</div>
                </div>

                <!-- Enchantments List in soft cyan -->
                <div class="space-y-0.5 my-2.5">
                  {#each selectedGear.enchantments as ench}
                    <div class="font-pixel text-[10px] text-[#55FFFF]">
                      {ench}
                    </div>
                  {/each}
                </div>

                <!-- Lore text in italics grey -->
                <p class="text-slate-300 text-xs font-sans italic leading-relaxed my-2 border-y border-[#3d0075] py-2">
                  "{selectedGear.lore}"
                </p>

                <!-- Attribute Modifiers in dark blue/cyan -->
                <div class="mt-2 space-y-1">
                  <div class="text-[10px] font-pixel text-[#5555FF]">When equipped:</div>
                  {#each selectedGear.attributes as attr}
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

        <!-- TAB 3: 3x3 CRAFTING MINI-GAME -->
        {#if activeTab === "craft"}
          <div>
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <h4 class="font-pixel text-xs sm:text-sm text-[#FFFF55] flex items-center gap-2">
                <Hammer class="w-4 h-4 text-[#FFFF55]" />
                <span>3x3 CRAFTING WORKBENCH</span>
              </h4>
              <span class="text-[10px] font-silkscreen text-[#55FF55]">SELECT RECIPE BELOW TO AUTO-POPULATE</span>
            </div>

            <!-- Quick Recipe Pills -->
            <div class="flex flex-wrap items-center gap-2 mb-6">
              {#each recipes as r}
                <button
                  type="button"
                  onclick={() => applyRecipe(r)}
                  class="px-2.5 py-1.5 mc-button text-[10px] font-pixel flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{r.icon}</span>
                  <span>{r.name}</span>
                </button>
              {/each}
            </div>

            <!-- 3x3 Crafting Grid + Arrow + Output Box -->
            <div class="mc-container p-4 sm:p-6 bg-[#2b2c37] flex flex-col md:flex-row items-center justify-center gap-6">
              
              <!-- The 3x3 Grid -->
              <div>
                <div class="text-[10px] font-pixel text-slate-300 mb-2 text-center">INGREDIENTS GRID</div>
                <div class="mc-crafting-grid w-48 sm:w-56 h-48 sm:h-56">
                  {#each craftingSlots as slot}
                    <button
                      type="button"
                      class="mc-crafting-slot text-center p-1"
                      onclick={(e) => {
                        sound.playPop();
                        gainXp(10, "+10 XP", e);
                      }}
                      title={slot || "Empty slot"}
                    >
                      {#if slot}
                        <span class="text-[9px] sm:text-[10px] font-pixel text-black font-bold leading-tight break-words">
                          {slot}
                        </span>
                      {/if}
                    </button>
                  {/each}
                </div>
              </div>

              <!-- Crafting Arrow -->
              <div class="flex flex-col items-center justify-center text-[#55FF55]">
                <div class="font-pixel text-2xl hidden md:block">&rarr;</div>
                <div class="font-pixel text-2xl md:hidden">&darr;</div>
                <span class="text-[9px] font-pixel text-slate-400 mt-1">CRAFT</span>
              </div>

              <!-- Result Output Slot -->
              <div class="flex flex-col items-center">
                <div class="text-[10px] font-pixel text-[#FFFF55] mb-2">RESULT SLOT</div>
                <button
                  type="button"
                  class="mc-crafting-output w-20 sm:w-24 h-20 sm:h-24 mc-enchanted {craftedOutput ? 'cursor-pointer hover:border-[#55FF55]' : 'opacity-60'}"
                  onclick={collectCraftedItem}
                  title={craftedOutput ? "Click to collect your crafted item!" : "Select a recipe first!"}
                >
                  {#if craftedOutput}
                    <div class="flex flex-col items-center justify-center text-center p-2">
                      <span class="text-3xl animate-bounce">{craftedOutput.icon}</span>
                      <span class="text-[9px] font-pixel text-black font-extrabold mt-1 line-clamp-1">
                        {craftedOutput.name}
                      </span>
                    </div>
                  {:else}
                    <span class="text-slate-500 font-pixel text-xs">?</span>
                  {/if}
                </button>
              </div>
            </div>

            <!-- Feedback Message -->
            {#if craftingSuccessMessage}
              <div class="mt-4 p-3 mc-slot bg-[#040507] border border-[#55FF55] text-xs font-mono text-[#55FF55] text-center shadow-[0_0_10px_rgba(85,255,85,0.3)]">
                {craftingSuccessMessage}
              </div>
            {/if}
          </div>
        {/if}

        <!-- TAB 4: ADVANCEMENTS & ACHIEVEMENTS -->
        {#if activeTab === "advancements"}
          <div>
            <div class="flex items-center justify-between mb-4">
              <h4 class="font-pixel text-xs sm:text-sm text-[#FFFF55] flex items-center gap-2">
                <Trophy class="w-4 h-4 text-[#FFFF55]" />
                <span>MINECRAFT ADVANCEMENTS</span>
              </h4>
              <span class="text-[10px] font-silkscreen text-[#55FF55]">CLICK TO CLAIM XP REWARDS</span>
            </div>

            <div class="space-y-3">
              {#each advancements as adv}
                <div
                  class="mc-slot p-3 sm:p-4 bg-[#0a0b10] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group {adv.unlocked ? 'hover:bg-[#12141c]' : 'opacity-60'}"
                >
                  <div class="flex items-start sm:items-center gap-3">
                    <div class="w-10 h-10 mc-slot bg-[#040507] flex items-center justify-center text-xl shrink-0 {adv.unlocked ? 'border-[#55FF55]' : 'border-slate-700'}">
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
                    {:else if adv.unlocked}
                      <button
                        type="button"
                        onclick={(e) => claimAdvancement(adv, e)}
                        class="mc-button mc-button-gold px-3 py-1.5 text-[10px] font-pixel flex items-center gap-1.5 cursor-pointer"
                      >
                        <Award class="w-3.5 h-3.5" />
                        <span>CLAIM +{adv.xp} XP</span>
                      </button>
                    {:else}
                      <span class="text-[10px] font-pixel text-slate-500">LOCKED 🔒</span>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}

      </div>

      <!-- RIGHT 4 COLUMNS: Interactive Highlights Cards & Character Lore -->
      <div class="lg:col-span-4 space-y-4">
        
        <div class="flex items-center justify-between mb-1">
          <span class="font-pixel text-xs text-[#FFFF55]">HIGHLIGHTS</span>
          <span class="text-[10px] font-silkscreen text-slate-400">CLICK CARD TO EXPAND</span>
        </div>

        {#each highlights as highlight}
          {@const Icon = highlight.icon}
          <button
            type="button"
            class="w-full text-left mc-container p-4 bg-[#0c0d12] flex items-start gap-3 group transition-all duration-150 hover:scale-[1.02] cursor-pointer hover:border-[#55FF55] {expandedHighlight?.id === highlight.id ? 'ring-2 ring-[#55FF55]' : ''}"
            onclick={(e) => {
              sound.playClick();
              gainXp(30, "+30 XP 🌟", e);
              expandedHighlight = expandedHighlight?.id === highlight.id ? null : highlight;
            }}
          >
            <div class="p-2.5 mc-slot {highlight.bgSlot} shrink-0 flex items-center justify-center group-hover:border-[#55FF55]">
              <Icon class="w-5 h-5 {highlight.colorClass}" />
            </div>
            
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <h4 class="font-pixel text-xs text-[#FFFF55] mc-text-shadow-gold">
                  {highlight.title}
                </h4>
                <span class="text-[9px] font-pixel px-1.5 py-0.5 bg-[#040507] text-slate-400 border border-black/80">
                  {highlight.badge}
                </span>
              </div>
              <p class="text-slate-300 text-xs leading-relaxed font-sans mt-1.5">
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
            </div>
          </button>
        {/each}

        <!-- Interactive Lore Quote Box -->
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
              <span class="text-[10px] font-pixel text-[#55FFFF]">{expandedHighlight.badge}</span>
            </div>
          </div>

          <div class="mc-slot p-4 bg-[#040507] mb-5 text-slate-200 text-xs sm:text-sm leading-relaxed font-sans">
            {expandedHighlight.detailedDesc}
          </div>

          <div class="mb-5">
            <h5 class="font-silkscreen text-xs text-[#55FF55] mb-2 uppercase">CORE CAPABILITIES & TOOLS</h5>
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
