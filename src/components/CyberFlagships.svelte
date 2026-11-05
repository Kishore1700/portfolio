<script>
  import { ArrowUpRight } from "lucide-svelte";

  // Exact 7 layers from video frame_012 and frame_014
  const layers = [
    {
      id: "L1",
      chip: "L1: Uncensored Core",
      heading: "LAYER 01 // COGNITIVE CORE",
      title: "Uncensored Base Cognitive Foundation",
      desc: "Raw unfiltered local model inference running natively on an RTX 4070 GPU workstation. Completely sovereign execution free from vendor-imposed guardrail distortion or arbitrary refusal degradation.",
      tags: ["Local 9B Quantized", "RTX 4070 12GB"]
    },
    {
      id: "L2",
      chip: "L2: Dynamic Tone",
      heading: "LAYER 02 // STYLISTIC ADAPTATION",
      title: "Dynamic Personality & Context Sharding",
      desc: "Runtime prompt interpolation adapting tone, formality, and domain expertise according to incoming execution parameters.",
      tags: ["Latent Sharding", "Zero-Shot Context"]
    },
    {
      id: "L3",
      chip: "L3: Voice Synthesis",
      heading: "LAYER 03 // AUDIO EXECUTION",
      title: "Real-Time Neural Speech & Synthesis",
      desc: "Low-latency sub-100ms voice synthesis pipeline transforming token streams into natural acoustic waveforms.",
      tags: ["Edge-TTS", "Neural Audio Engine"]
    },
    {
      id: "L4",
      chip: "L4: Autonomous Loop",
      heading: "LAYER 04 // TASK RECURSION",
      title: "Self-Directed Reasoning & Action Loop",
      desc: "Continuous autonomous execution cycle triggering tools, reflecting on outputs, and correcting failures without human supervision.",
      tags: ["ReAct Agent", "Autonomous Cron"]
    },
    {
      id: "L5",
      chip: "L5: 4-Tier Memory",
      heading: "LAYER 05 // PERSISTENT STATE",
      title: "4-Canonical Hierarchical Memory",
      desc: "Episodic, working, semantic, and vector embeddings structured in local SQLite and ChromaDB for cross-session recall.",
      tags: ["SQLite WAL", "ChromaDB Vectors"]
    },
    {
      id: "L6",
      chip: "L6: Proactive Brain",
      heading: "LAYER 06 // ANTICIPATORY DISPATCH",
      title: "Proactive Task Identification",
      desc: "Autonomous background agents scanning git commits, system health, and market signals to dispatch preemptive tasks.",
      tags: ["Multi-Agent Orchestrator", "Asyncio"]
    },
    {
      id: "L7",
      chip: "L7: Self-Evolution",
      heading: "LAYER 07 // META-LEARNING",
      title: "Continuous Codebase Self-Modification",
      desc: "Automated test synthesis, algorithmic benchmarking, and local code refactoring applied automatically after execution milestones.",
      tags: ["Self-Correction", "Test Harness"]
    }
  ];

  let activeLayerIndex = $state(0);

  // Secondary project cards (Exact from video frame_014)
  const secondaryProjects = [
    {
      category: "DEFI // HIGH-FREQUENCY",
      title: "Flash_Lab — Arbitrage & Liquidation Engine",
      desc: "Production flash loan arbitrage and Aave V3 liquidation engine deployed on Polygon mainnet. Custom Solidity contract with asynchronous multi-hop routing.",
      bullets: [
        "Polygon Mainnet (Aave V3 Flash Loans)",
        "Uniswap V3, QuickSwap & Curve Liquidity",
        "2,969 LOC Async WebSockets Engine"
      ],
      pills: ["Solidity", "Aave V3"],
      link: "https://github.com/Kishore1700/Smart-Procurement-System"
    },
    {
      category: "MOBILE // COMMERCIAL PRODUCT",
      title: "Biller — Offline-First Invoicing System",
      desc: "Commercial mobile billing and inventory application deployed for active retail enterprises. Operates in zero-connectivity environments with instant thermal printing.",
      bullets: [
        "Offline SQLite with Repository Pattern",
        "ESC/POS Bluetooth Thermal Printing",
        "GST-Compliant Invoicing & Realtime P&L"
      ],
      pills: ["Flutter", "Offline SQLite"],
      link: "https://github.com/lawrancewilliam/Campus-repo"
    },
    {
      category: "QUANTITATIVE // ML SYSTEM",
      title: "Quantitative XAUUSD & Forex Engine",
      desc: "High-frequency quantitative execution model parsing order-book imbalances and microstructure volume flow for institutional gold and forex pairs.",
      bullets: [
        "Sub-15ms Event Loop Execution",
        "FastAPI Asynchronous Market Gateway",
        "Risk-Bounded Convex Position Sizing"
      ],
      pills: ["Python", "FastAPI"],
      link: "https://github.com/Kishore1700/image-upscaler"
    }
  ];
</script>

<section id="flagships" class="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#14161F] select-none">
  
  <div class="max-w-7xl mx-auto space-y-10">
    
    <!-- Section Header (Exact as Video Frame_012) -->
    <div class="space-y-1">
      <h2 class="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
        Flagship Deployments
      </h2>
      <p class="font-sans-cyber text-xs text-slate-400 max-w-xl leading-relaxed">
        Production-grade systems running 24/7 across local silicon, blockchain mainnets, and commercial endpoints.
      </p>
    </div>

    <!-- PRIMARY FLAGSHIP CARD (Matching Video Frame_012 and 014) -->
    <div class="cyber-card p-6 sm:p-7 space-y-5 !border-[#1F222E]">
      
      <!-- Top Pill & Title -->
      <div>
        <div class="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#FF2A2A]/10 text-[#FF2A2A] border border-[#FF2A2A]/40 font-mono-cyber text-[9px] font-bold uppercase tracking-wider mb-2">
          <span class="w-1.5 h-1.5 rounded-full bg-[#FF2A2A]"></span>
          <span>CORE ECOSYSTEM</span>
        </div>
        <h3 class="font-display font-bold text-xl sm:text-2xl text-white">
          SAAI — 7-Layer Autonomous AI Ecosystem
        </h3>
        <p class="font-sans-cyber text-xs text-slate-300 leading-relaxed mt-1 max-w-3xl">
          A persistent, self-evolving autonomous intelligence operating 24/7 on local silicon. Engineered without external startup frameworks, featuring 478 custom tools across 14 MCP servers, 4-tier redundant memory, and a continuous reflection loop.
        </p>
      </div>

      <!-- Telemetry Stats Row (4 metrics as in video) -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 border-y border-[#1A1C23]">
        <div>
          <span class="font-mono-cyber text-base font-bold text-[#FF2A2A] block">478</span>
          <span class="font-mono-cyber text-[9px] text-slate-400 block">MCP Tools</span>
        </div>
        <div>
          <span class="font-mono-cyber text-base font-bold text-white block">14</span>
          <span class="font-mono-cyber text-[9px] text-slate-400 block">MCP Servers</span>
        </div>
        <div>
          <span class="font-mono-cyber text-base font-bold text-white block">15m</span>
          <span class="font-mono-cyber text-[9px] text-slate-400 block">Cycle time</span>
        </div>
        <div>
          <span class="font-mono-cyber text-base font-bold text-[#FF2A2A] block">Router</span>
          <span class="font-mono-cyber text-[9px] text-slate-400 block">Dispatch</span>
        </div>
      </div>

      <!-- 7-LAYER CONSTITUTIONAL STACK (Exact from Video) -->
      <div class="space-y-3 pt-1">
        <div class="font-mono-cyber text-[10px] text-white font-bold tracking-wider uppercase">
          7-LAYER CONSTITUTIONAL STACK
        </div>
        <div class="font-sans-cyber text-[10px] text-slate-400">
          Click a layer to inspect implementation
        </div>

        <!-- 7 Layer Horizontal Chips -->
        <div class="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
          {#each layers as layer, idx}
            <button
              type="button"
              onclick={() => (activeLayerIndex = idx)}
              class="px-2.5 py-1 font-mono-cyber text-[9px] transition-all cursor-pointer whitespace-nowrap {activeLayerIndex === idx
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
                <span class="px-2 py-0.5 bg-black border border-[#1A1C23] text-slate-300 font-mono-cyber text-[9px]">
                  {tag}
                </span>
              {/each}
            </div>
          </div>
        {/if}
      </div>

    </div>

    <!-- 3 SECONDARY FLAGSHIPS (Exact Cards from Video Frame_014) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
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
              title="Inspect repository"
            >
              <ArrowUpRight class="w-4 h-4" />
            </a>
          </div>

        </div>
      {/each}
    </div>

  </div>
</section>
