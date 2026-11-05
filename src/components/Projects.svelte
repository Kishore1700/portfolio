<script>
  import { ExternalLink, Github, Layers, Cpu, Server, Terminal, ArrowUpRight } from "lucide-svelte";
  import { sound } from "../utils/sound.js";

  // Active layer in the 7-Layer Constitutional Stack
  let activeLayer = $state(0);

  const flagshipLayers = [
    { id: "L1", name: "L1: Inventory Core", title: "Real-Time Stock & Material Registry", desc: "Atomic transaction handling for enterprise warehouse goods, continuous ledger verification, and zero-loss stock tracking.", tech: "MySQL • Relational Schemas • Acid Compliance" },
    { id: "L2", name: "L2: Auto-PO Engine", title: "Automated Purchase Order Dispatch", desc: "Algorithmic supplier quotation routing and automated purchase requisition triggering when threshold stocks deplete.", tech: "Python • Event Loops • Webhooks" },
    { id: "L3", name: "L3: Vendor Analytics", title: "Supplier Reliability Scoring", desc: "Data pipelines assessing vendor fulfillment speed, historical defect ratios, and pricing variance over multi-year datasets.", tech: "Data Analysis • Statistical Modeling" },
    { id: "L4", name: "L4: Multi-Role Auth", title: "Zero-Trust Enterprise Access Control", desc: "Strict role-based authorization separating department requisition, managerial approvals, and financial disbursement gates.", tech: "JWT • Session Integrity • RBAC" },
    { id: "L5", name: "L5: Audit Trails", title: "Tamper-Evident System Journaling", desc: "Immutable logging of every stock alteration, requisition approval, and price modification with precise timestamps.", tech: "Structured Event Streams • Cryptographic Hashes" },
    { id: "L6", name: "L6: Reconciliation", title: "Three-Way Invoice Matching", desc: "Automated validation comparing Purchase Order, Goods Receipt Note, and Supplier Invoices to eliminate discrepancies.", tech: "Batch Validation • Regex Automation" },
    { id: "L7", name: "L7: Decision Logic", title: "Heuristic Procurement Optimization", desc: "Predictive demand forecasting and bulk re-order planning based on seasonal consumption telemetry.", tech: "Heuristic Optimization • System Architecture" },
  ];

  const deployments = [
    {
      id: "upscaler",
      category: "COMPUTER VISION // AI",
      name: "Image Upscaler",
      subtitle: "Neural Super-Resolution & Enhancement Engine",
      desc: "Deep learning image reconstruction pipeline utilizing deep neural networks to restore degraded textures, enhance high-frequency spatial details, and upscale low-resolution image inputs.",
      tags: ["Python", "PyTorch", "ESRGAN", "OpenCV", "FastAPI"],
      github: "https://github.com/Kishore1700/image-upscaler",
      metrics: { latency: "1.2s", accuracy: "98.4%", type: "Deep Learning" }
    },
    {
      id: "campus-repo",
      category: "DISTRIBUTED // ACADEMIC",
      name: "Campus Repo",
      subtitle: "Academic Knowledge & Collaboration Hub",
      desc: "Centralized repository platform for university engineering departments. Supports multi-format study material sharing, verified course structures, peer discussions, and cloud storage indexing.",
      tags: ["PHP", "MySQL", "Cloud Storage", "REST APIs", "Bootstrap"],
      github: "https://github.com/lawrancewilliam/Campus-repo",
      metrics: { latency: "45ms", users: "Enterprise", type: "Full-Stack" }
    },
    {
      id: "learnify",
      category: "FULL-STACK // EDTECH",
      name: "Learnify",
      subtitle: "Interactive Student Learning & Coursework Engine",
      desc: "Interactive educational portal offering structured learning tracks, interactive coding exercises, module completion progress tracking, and student performance metrics.",
      tags: ["JavaScript", "HTML5/CSS3", "State Management", "Responsive UI"],
      github: "https://github.com/Kishore1700/Learnify",
      metrics: { latency: "12ms", ui: "100% Responsive", type: "Frontend" }
    },
    {
      id: "portfolio-engine",
      category: "CYBER-OPERATOR // ARCHITECTURE",
      name: "Autonomous Portfolio Core",
      subtitle: "Multi-Agent Reactive Telemetry Platform",
      desc: "This very portfolio! Engineered in Svelte 5 and Web Audio API, featuring an autonomous 18-agent cursor swarm, real-time CAD bounding measurement engines, and OLED true-black aesthetic.",
      tags: ["Svelte 5", "Tailwind CSS", "Canvas Swarm", "Web Audio API"],
      github: "https://github.com/Kishore1700/portfolio",
      metrics: { fps: "60 FPS", build: "860ms", type: "Reactive Web" }
    }
  ];
</script>

<section id="projects" class="relative py-20 border-t border-[#14151e] bg-[#000000] overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    
    <!-- Section Technical Index Heading -->
    <div class="mb-10 sm:mb-12">
      <div class="font-mono text-xs text-slate-500 mb-1 flex items-center gap-2">
        <span class="text-[#FF2A2A] font-bold">// 02.00</span>
        <span>ARCHITECTURAL SHOWCASE [02/05]</span>
      </div>
      <div class="font-mono text-[10px] text-[#FF2A2A] tracking-wider uppercase font-bold mb-1">
        DEPLOYMENT SYSTEMS
      </div>
      <h2 class="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
        Flagship Deployments
      </h2>
      <p class="font-mono text-xs text-slate-400 mt-2 max-w-2xl">
        Production-grade systems running across local workstations, cloud endpoints, and enterprise environments.
      </p>
      <div class="h-[2px] w-24 bg-[#FF2A2A] mt-3 shadow-[0_0_12px_#FF2A2A]"></div>
    </div>

    <!-- FEATURED FLAGSHIP: Smart Procurement System with 7-Layer Stack (From Video!) -->
    <div class="bg-[#050608] border border-[#222432] p-6 sm:p-8 mb-10 relative group hover:border-[#FF2A2A] transition-colors shadow-[0_0_30px_rgba(0,0,0,0.8)]">
      
      <!-- Top Badges -->
      <div class="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#181a24]">
        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 bg-[#FF2A2A] text-black font-mono font-bold text-[10px]">
            CORE ECOSYSTEM
          </span>
          <span class="font-mono text-xs text-slate-400">
            ENTERPRISE SUPPLY CHAIN &bull; AUTOMATION
          </span>
        </div>

        <a
          href="https://github.com/Kishore1700/Smart-Procurement-System"
          target="_blank"
          rel="noopener noreferrer"
          class="font-mono text-xs text-cyan-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <Github class="w-4 h-4" />
          <span>VIEW REPOSITORY &rarr;</span>
        </a>
      </div>

      <!-- Title & Narrative -->
      <div class="max-w-4xl space-y-2 mb-6">
        <h3 class="font-display font-extrabold text-2xl sm:text-3xl text-white">
          Smart Procurement System &mdash; 7-Layer Enterprise Engine
        </h3>
        <p class="font-sans text-sm text-slate-300 leading-relaxed">
          An end-to-end multi-tier procurement and inventory management ecosystem. Designed to automate purchase orders, evaluate supplier performance, verify three-way invoice matching, and enforce zero-trust role-based authorization.
        </p>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div class="p-3 bg-[#08090f] border border-[#1a1b26]">
          <span class="font-mono text-base sm:text-lg font-bold text-white block">40+</span>
          <span class="font-mono text-[10px] text-slate-500">REST Endpoints</span>
        </div>
        <div class="p-3 bg-[#08090f] border border-[#1a1b26]">
          <span class="font-mono text-base sm:text-lg font-bold text-[#FF2A2A] block">&lt; 50ms</span>
          <span class="font-mono text-[10px] text-slate-500">Transaction Latency</span>
        </div>
        <div class="p-3 bg-[#08090f] border border-[#1a1b26]">
          <span class="font-mono text-base sm:text-lg font-bold text-cyan-400 block">Multi-Role</span>
          <span class="font-mono text-[10px] text-slate-500">Zero-Trust RBAC</span>
        </div>
        <div class="p-3 bg-[#08090f] border border-[#1a1b26]">
          <span class="font-mono text-base sm:text-lg font-bold text-[#00FF66] block">100%</span>
          <span class="font-mono text-[10px] text-slate-500">Audit Trail Precision</span>
        </div>
      </div>

      <!-- 7-LAYER CONSTITUTIONAL STACK INTERACTION (From Video!) -->
      <div class="space-y-3 pt-4 border-t border-[#181a24]">
        <div class="flex items-center justify-between">
          <span class="font-mono text-[11px] font-bold text-slate-400">
            7-LAYER CONSTITUTIONAL STACK (CLICK LAYER TO INSPECT)
          </span>
          <span class="font-mono text-[10px] text-cyan-400">
            LAYER 0{activeLayer + 1} ACTIVE
          </span>
        </div>

        <!-- Horizontal Layer Buttons Row -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
          {#each flagshipLayers as layer, idx}
            <button
              type="button"
              onclick={() => { sound.playClick(); activeLayer = idx; }}
              class="px-3 py-1.5 font-mono text-[11px] whitespace-nowrap border transition-all cursor-pointer {activeLayer === idx
                ? 'bg-[#FF2A2A] text-black font-bold border-[#FF2A2A] shadow-[0_0_12px_rgba(255,42,42,0.4)]'
                : 'bg-[#090a10] text-slate-400 border-[#1f212d] hover:border-slate-500 hover:text-white'}"
            >
              {layer.name}
            </button>
          {/each}
        </div>

        <!-- Active Layer Telemetry Readout -->
        {#if flagshipLayers[activeLayer]}
          {@const lyr = flagshipLayers[activeLayer]}
          <div class="p-4 bg-[#080a10] border border-cyan-500/40 relative animate-fade-in space-y-1.5">
            <div class="flex items-center justify-between font-mono text-xs">
              <span class="text-cyan-400 font-bold">{lyr.title}</span>
              <span class="text-slate-500 text-[10px]">{lyr.tech}</span>
            </div>
            <p class="font-sans text-xs text-slate-300 leading-relaxed">
              {lyr.desc}
            </p>
          </div>
        {/if}
      </div>

    </div>

    <!-- OTHER FLAGSHIP DEPLOYMENT CARDS (Grid from Video) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each deployments as item}
        <div class="bg-[#050608] border border-[#1b1c28] p-6 hover:border-[#FF2A2A] transition-all duration-200 flex flex-col justify-between group shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
          
          <div>
            <!-- Category Tag -->
            <div class="flex items-center justify-between pb-3 mb-3 border-b border-[#181924]">
              <span class="font-mono text-[10px] text-[#FF2A2A] font-bold tracking-wider">
                {item.category}
              </span>

              <a
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
                class="text-slate-500 hover:text-white transition-colors"
                title="View on GitHub"
                aria-label="View on GitHub"
              >
                <ArrowUpRight class="w-4 h-4" />
              </a>
            </div>

            <!-- Title & Subtitle -->
            <h4 class="font-display font-bold text-xl text-white group-hover:text-cyan-400 transition-colors">
              {item.name}
            </h4>
            <div class="font-mono text-xs text-slate-400 mt-0.5 mb-3">
              {item.subtitle}
            </div>

            <p class="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
              {item.desc}
            </p>
          </div>

          <!-- Bottom: Tech Stack Tags & Metrics -->
          <div class="mt-6 pt-4 border-t border-[#181924] space-y-3">
            <div class="flex flex-wrap gap-1.5">
              {#each item.tags as t}
                <span class="font-mono text-[9px] px-2 py-0.5 bg-[#0a0c12] text-slate-300 border border-[#222432]">
                  {t}
                </span>
              {/each}
            </div>

            <div class="flex items-center justify-between font-mono text-[10px] text-slate-500 pt-1">
              <span>METRIC: <strong class="text-white">{item.metrics.latency || item.metrics.fps}</strong></span>
              <a
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
                class="text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Code Repository</span>
                <Github class="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>
      {/each}
    </div>

  </div>
</section>
