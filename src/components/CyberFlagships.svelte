<script>
  import { ArrowUpRight, Github } from "lucide-svelte";

  // Primary Flagship: Smart Procurement System 4-Layer Constitutional Stack
  const layers = [
    {
      id: "L1",
      chip: "L1: Vendor Engine",
      heading: "LAYER 01 // VENDOR ONBOARDING & VALIDATION",
      title: "Supplier Verification & Automated Ingestion",
      desc: "Automated vendor catalog ingestion, GST credentialing, tax compliance verification, and multi-tenant supplier profile state machine.",
      tags: ["Supabase Auth", "GST Heuristics", "Zod Validation"]
    },
    {
      id: "L2",
      chip: "L2: Dynamic Bidding",
      heading: "LAYER 02 // AUCTION & SCORING PIPELINE",
      title: "Real-Time RFQ Reverse Auction & Scoring",
      desc: "Real-time quote ingestion and automated supplier ranking based on unit economics, SLA reliability, historical delivery ratings, and lead-time constraints.",
      tags: ["Chart.js Telemetry", "Scoring Algorithm", "WebSocket Updates"]
    },
    {
      id: "L3",
      chip: "L3: Approval Matrix",
      heading: "LAYER 03 // AUTHORIZATION & DOCS",
      title: "Hierarchical Multi-Sig Approval & Auto-Invoicing",
      desc: "Role-based purchase authorization enforcing spending thresholds, dual-party approval workflows, and automated PDF purchase order generation.",
      tags: ["jsPDF Engine", "Role-Based Auth", "Audit Logging"]
    },
    {
      id: "L4",
      chip: "L4: Data Persistence",
      heading: "LAYER 04 // RELATIONAL STORAGE",
      title: "Supabase PostgreSQL & ACID Transactional Safety",
      desc: "Strict relational database persistence with Row Level Security (RLS) policies, foreign-key constraints, index optimization, and zero concurrency race conditions.",
      tags: ["PostgreSQL 16", "Supabase RLS", "ACID Guaranteed"]
    }
  ];

  let activeLayerIndex = $state(0);

  // Kishore's real repositories from before
  const secondaryProjects = [
    {
      category: "CYBER SECURITY // AI AUDIT",
      title: "SecureGuard — Sensitive Data Leakage Detection",
      desc: "AI-assisted cyber security suite that unpacks codebase ZIP archives in-browser with JSZip, scanning for exposed API keys and secrets with Groq LLaMA 3.2 filtering and Three.js 3D threat mapping.",
      bullets: [
        "In-Browser ZIP Parsing & Entropy Scanning (JSZip)",
        "Groq SDK & LLaMA 3.2 False-Positive Elimination",
        "Interactive 3D Threat Node Mapping with Three.js"
      ],
      pills: ["SvelteKit 2", "Groq AI", "Three.js", "Playwright"],
      link: "https://github.com/lawrancewilliam/Mini-project"
    },
    {
      category: "COMPUTER VISION // DEEP LEARNING",
      title: "Image Super-Resolution & Neural Upscaler",
      desc: "Deep learning computer vision application utilizing convolutional neural networks and ESRGAN to upscale low-resolution images 4x with sharp high-frequency edge reconstruction.",
      bullets: [
        "PyTorch Convolutional Neural Architecture",
        "4x Bicubic & ESRGAN High-Frequency Super-Resolution",
        "OpenCV Tensor Processing on Local GPU Hardware"
      ],
      pills: ["Python", "PyTorch", "OpenCV", "PIL"],
      link: "https://github.com/Kishore1700/image-upscaler"
    },
    {
      category: "FULL-STACK // LMS ARCHITECTURE",
      title: "Learnify — Interactive E-Learning System",
      desc: "Full-scale Learning Management System engineered with native PHP and relational MySQL, featuring asynchronous progress tracking, automated quizzes, and dynamic certificate issuance.",
      bullets: [
        "Relational Schema Design for Courses & Students",
        "Asynchronous AJAX Progress & Quiz Telemetry",
        "Dynamic Completion Certificate Generation"
      ],
      pills: ["PHP OOP", "MySQL", "JavaScript", "Apache"],
      link: "https://github.com/Kishore1700/Learnify"
    },
    {
      category: "ACADEMIC CLOUD // COLLABORATIVE HUB",
      title: "Campus Repo — Notes & Resource Platform",
      desc: "Distributed academic repository facilitating peer-to-peer educational resource sharing, semester curriculum indexing, and structured PDF notes querying across student cohorts.",
      bullets: [
        "Modular Multi-User Role Authentication",
        "Direct PDF & File Upload Processing Engine",
        "Relational Subject & Semester Search Querying"
      ],
      pills: ["PHP", "MySQL", "Bootstrap", "File API"],
      link: "https://github.com/lawrancewilliam/Campus-repo"
    },
    {
      category: "WEBGL // 3D GRAPHICS ENGINE",
      title: "Personal Portfolio & WebGL 3D Voxel Engine",
      desc: "High-performance developer portfolio built with Svelte 5 and raw WebGL shaders. Features hardware-accelerated 3D voxel rendering, perspective projection, and 8-bit Web Audio synthesis.",
      bullets: [
        "Custom Perspective Projection & WebGL Shaders",
        "8-Bit Web Audio API Sound Synthesizer",
        "Svelte 5 Runes ($state, $derived) Reactivity"
      ],
      pills: ["Svelte 5", "WebGL", "Web Audio API", "Tailwind CSS"],
      link: "https://github.com/Kishore1700/portfolio"
    }
  ];
</script>

<section id="flagships" class="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#14161F] select-none">
  
  <div class="max-w-7xl mx-auto space-y-10">
    
    <!-- Section Header (Exact as Video Frame_012) -->
    <div class="space-y-1">
      <div class="font-mono-cyber text-[10px] text-[#FF2A2A] font-bold tracking-widest uppercase">
        ARCHITECTURAL SHOWCASE
      </div>
      <h2 class="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
        Flagship Deployments
      </h2>
      <p class="font-sans-cyber text-xs text-slate-400 max-w-xl leading-relaxed">
        Production-grade systems running across full-stack silicon, distributed backends, and responsive client endpoints.
      </p>
    </div>

    <!-- PRIMARY FLAGSHIP CARD: Smart Procurement System (Matching Video Frame_012 and 014) -->
    <div class="cyber-card p-6 sm:p-7 space-y-5 !border-[#1F222E]">
      
      <!-- Top Pill & Title -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div class="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#FF2A2A]/10 text-[#FF2A2A] border border-[#FF2A2A]/40 font-mono-cyber text-[9px] font-bold uppercase tracking-wider mb-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[#FF2A2A]"></span>
            <span>CORE ENTERPRISE ECOSYSTEM</span>
          </div>
          <h3 class="font-display font-bold text-xl sm:text-2xl text-white">
            Smart Procurement System — Enterprise ERP
          </h3>
          <p class="font-sans-cyber text-xs text-slate-300 leading-relaxed mt-1 max-w-3xl">
            A full-lifecycle smart procurement system streamlining vendor purchasing, purchase order approvals, and invoice reconciliation. Built with Svelte 5 runes and SvelteKit, integrating Supabase PostgreSQL persistence, automated PDF generation, and real-time Chart.js telemetry.
          </p>
        </div>

        <a
          href="https://github.com/Kishore1700/Smart-Procurement-System"
          target="_blank"
          rel="noopener noreferrer"
          class="cyber-btn-secondary !py-2 !px-3 shrink-0 self-start sm:self-center flex items-center gap-1.5 text-[10px]"
          title="View source on GitHub"
        >
          <Github class="w-3.5 h-3.5" />
          <span>VIEW REPO</span>
          <ArrowUpRight class="w-3 h-3 text-slate-400" />
        </a>
      </div>

      <!-- Telemetry Stats Row (Matching video metrics) -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 border-y border-[#1A1C23]">
        <div>
          <span class="font-mono-cyber text-sm sm:text-base font-bold text-[#FF2A2A] block">Supabase PG</span>
          <span class="font-mono-cyber text-[9px] text-slate-400 block">Row Level Security</span>
        </div>
        <div>
          <span class="font-mono-cyber text-sm sm:text-base font-bold text-white block">Auto-PDF</span>
          <span class="font-mono-cyber text-[9px] text-slate-400 block">jsPDF Engine</span>
        </div>
        <div>
          <span class="font-mono-cyber text-sm sm:text-base font-bold text-white block">Chart.js</span>
          <span class="font-mono-cyber text-[9px] text-slate-400 block">Telemetry Analytics</span>
        </div>
        <div>
          <span class="font-mono-cyber text-sm sm:text-base font-bold text-[#00FF66] block">Zod Safe</span>
          <span class="font-mono-cyber text-[9px] text-slate-400 block">Schema Validation</span>
        </div>
      </div>

      <!-- 4-LAYER CONSTITUTIONAL STACK -->
      <div class="space-y-3 pt-1">
        <div class="font-mono-cyber text-[10px] text-white font-bold tracking-wider uppercase">
          4-LAYER SYSTEM ARCHITECTURE
        </div>
        <div class="font-sans-cyber text-[10px] text-slate-400">
          Click a layer to inspect subsystem telemetry
        </div>

        <!-- Layer Chips -->
        <div class="flex flex-wrap items-center gap-2">
          {#each layers as layer, idx}
            <button
              type="button"
              onclick={() => (activeLayerIndex = idx)}
              class="px-3 py-1 font-mono-cyber text-[10px] transition-all cursor-pointer whitespace-nowrap {activeLayerIndex === idx
                ? 'bg-[#FF2A2A] text-white font-bold border border-[#FF2A2A] shadow-[0_0_12px_rgba(255,42,42,0.5)]'
                : 'bg-[#0A0B0E] text-slate-400 border border-[#1A1C23] hover:text-white'}"
            >
              {layer.chip}
            </button>
          {/each}
        </div>

        <!-- Active Layer Details Box -->
        {#if layers[activeLayerIndex]}
          {@const active = layers[activeLayerIndex]}
          <div class="p-4 bg-[#050608] border border-[#1F222E] space-y-2 animate-fade-in">
            <div class="font-mono-cyber text-[9px] text-[#FF2A2A] font-bold tracking-wider">
              {active.heading}
            </div>
            <div class="font-mono-cyber text-xs font-bold text-white">
              {active.title}
            </div>
            <p class="font-sans-cyber text-xs text-slate-300 leading-relaxed max-w-3xl">
              {active.desc}
            </p>
            <div class="flex flex-wrap gap-1.5 pt-1">
              {#each active.tags as tag}
                <span class="px-2 py-0.5 bg-black border border-[#1A1C23] text-[#00E5FF] font-mono-cyber text-[9px]">
                  {tag}
                </span>
              {/each}
            </div>
          </div>
        {/if}
      </div>

    </div>

    <!-- SECONDARY FLAGSHIPS (Grid of Kishore's Real Projects) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each secondaryProjects as proj}
        <div class="cyber-card p-5 flex flex-col justify-between group space-y-4">
          
          <div class="space-y-2.5">
            <div class="font-mono-cyber text-[9px] text-[#FF2A2A] font-bold tracking-widest uppercase">
              {proj.category}
            </div>
            <h4 class="font-display font-bold text-base text-white group-hover:text-[#FF2A2A] transition-colors leading-snug">
              {proj.title}
            </h4>
            <p class="font-sans-cyber text-xs text-slate-300 leading-relaxed">
              {proj.desc}
            </p>

            <!-- Bullet Specs List -->
            <ul class="space-y-1 font-mono-cyber text-[10px] text-slate-400 pt-1">
              {#each proj.bullets as bullet}
                <li class="flex items-start gap-1.5">
                  <span class="text-[#FF2A2A]">&bull;</span>
                  <span>{bullet}</span>
                </li>
              {/each}
            </ul>
          </div>

          <div class="pt-3 border-t border-[#1A1C23] flex items-center justify-between">
            <div class="flex flex-wrap gap-1">
              {#each proj.pills as pill}
                <span class="px-2 py-0.5 bg-black border border-[#1A1C23] text-slate-300 font-mono-cyber text-[9px]">
                  {pill}
                </span>
              {/each}
            </div>

            <a
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              class="text-[#00E5FF] hover:text-white transition-colors"
              title="Inspect repository on GitHub"
            >
              <ArrowUpRight class="w-4 h-4" />
            </a>
          </div>

        </div>
      {/each}
    </div>

  </div>
</section>
