<script>
  import { ExternalLink, Github, Layers, Cpu, Terminal, ArrowUpRight } from "lucide-svelte";

  // Active architecture sub-layer for the primary flagship
  let activeLayer = $state(0);

  const flagship = {
    title: "Smart Procurement System",
    badge: "CORE ENTERPRISE ECOSYSTEM",
    tagline: "Multi-Tier Automated Vendor Sourcing & Supply Chain Protocol",
    desc: "A full-scale procurement and enterprise bidding pipeline engineered for high transactional throughput. Features automated RFQ generation, real-time supplier scoring algorithms, vendor compliance verification, and multi-tier purchase approval workflows.",
    metrics: [
      { label: "Architecture", val: "Multi-Tier ERP" },
      { label: "Core Backend", val: "Python / Java" },
      { label: "Latency", val: "< 45ms P99" },
      { label: "Integrity", val: "ACID Guaranteed" }
    ],
    layers: [
      {
        id: "L1",
        name: "L1: Vendor Engine",
        title: "Supplier Verification & Automated Ingestion",
        details: "Automated parsing of vendor catalogs, compliance credentialing, GST validation, and automated onboarding state machine."
      },
      {
        id: "L2",
        name: "L2: Dynamic Bidding",
        title: "Reverse Auction & Real-Time RFQ Pipeline",
        details: "Sub-50ms WebSocket bid updates with automated supplier ranking based on unit economics, delivery lead-time, and historical SLA performance."
      },
      {
        id: "L3",
        name: "L3: Approval Matrix",
        title: "Hierarchical Multi-Signature Authorization",
        details: "Role-based authorization engine enforcing corporate spending limits, dual-party approval thresholds, and automated audit logs."
      },
      {
        id: "L4",
        name: "L4: Data Persistence",
        title: "Relational Schema & Transactional Safety",
        details: "Strict relational database modeling with foreign-key constraints, index optimization, and zero concurrency race conditions."
      }
    ],
    github: "https://github.com/Kishore1700/Smart-Procurement-System"
  };

  const secondaryFlagships = [
    {
      category: "COMPUTER VISION // DEEP LEARNING",
      title: "Image Upscaler Neural Engine",
      desc: "Deep learning image super-resolution microservice leveraging convolutional neural networks to reconstruct high-frequency texture details and 4x upscaling on local GPU silicon.",
      tags: ["Python", "PyTorch", "OpenCV", "FastAPI"],
      github: "https://github.com/Kishore1700/image-upscaler"
    },
    {
      category: "ACADEMIC CLOUD // COLLABORATIVE HUB",
      title: "Campus Repo — Knowledge Protocol",
      desc: "Distributed academic resource sharing ecosystem supporting real-time curriculum indexing, structured PDF notes querying, and verified institutional collaboration.",
      tags: ["Web Architecture", "PHP", "MySQL", "JavaScript"],
      github: "https://github.com/lawrancewilliam/Campus-repo"
    },
    {
      category: "EDTECH // REACTIVE CLIENT",
      title: "Learnify — Interactive Learning System",
      desc: "Modular full-stack educational interface with real-time course telemetry, interactive quiz state machines, and synchronized progress tracking.",
      tags: ["JavaScript", "HTML5/CSS3", "REST APIs", "Modern UI"],
      github: "https://github.com/Kishore1700/Learnify"
    }
  ];
</script>

<section id="flagships" class="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#14161F]">
  
  <div class="max-w-7xl mx-auto space-y-12">
    
    <!-- Section Header -->
    <div class="space-y-2">
      <div class="font-mono-cyber text-[10px] text-[#FF2A2A] tracking-widest uppercase">
        ARCHITECTURAL SHOWCASE
      </div>
      <h2 class="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
        Flagship Deployments
      </h2>
      <p class="font-mono-cyber text-xs text-slate-400 max-w-xl">
        Production-grade systems running across full-stack silicon, distributed microservices, and high-concurrency client endpoints.
      </p>
    </div>

    <!-- PRIMARY FLAGSHIP: Interactive Layered Architecture Card -->
    <div class="cyber-card p-6 sm:p-8 space-y-6 !border-[#232738]">
      
      <!-- Top Pill & Title -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1A1C23] pb-5">
        <div>
          <span class="inline-block px-2 py-0.5 bg-[#FF2A2A]/10 text-[#FF2A2A] border border-[#FF2A2A]/40 font-mono-cyber text-[9px] font-bold uppercase tracking-widest mb-2">
            {flagship.badge}
          </span>
          <h3 class="font-display font-bold text-xl sm:text-2xl text-white">
            {flagship.title}
          </h3>
          <p class="font-mono-cyber text-xs text-[#00E5FF] mt-1">
            {flagship.tagline}
          </p>
        </div>

        <a
          href={flagship.github}
          target="_blank"
          rel="noopener noreferrer"
          class="cyber-btn-secondary !py-2 !px-3 shrink-0 self-start sm:self-center"
        >
          <Github class="w-3.5 h-3.5" />
          <span>VIEW REPO</span>
          <ArrowUpRight class="w-3 h-3 text-slate-400" />
        </a>
      </div>

      <p class="font-sans-cyber text-sm text-slate-300 leading-relaxed max-w-3xl">
        {flagship.desc}
      </p>

      <!-- Telemetry Metric Row -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 border-y border-[#1A1C23]">
        {#each flagship.metrics as m}
          <div class="font-mono-cyber">
            <span class="text-[9px] text-slate-400 uppercase block">{m.label}</span>
            <span class="text-xs sm:text-sm font-bold text-white block mt-0.5">{m.val}</span>
          </div>
        {/each}
      </div>

      <!-- 4-LAYER CONSTITUTIONAL STACK SELECTOR -->
      <div class="space-y-3 pt-2">
        <div class="flex items-center justify-between">
          <span class="font-mono-cyber text-[10px] text-slate-400 uppercase tracking-widest">
            4-LAYER SYSTEM STACK (CLICK LAYER TO INSPECT IMPLEMENTATION)
          </span>
        </div>

        <!-- Layer Chips -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {#each flagship.layers as layer, idx}
            <button
              type="button"
              onclick={() => (activeLayer = idx)}
              class="px-2.5 py-2 font-mono-cyber text-[10px] text-left transition-all border cursor-pointer {activeLayer === idx
                ? 'bg-[#FF2A2A] text-white border-[#FF2A2A] font-bold shadow-[0_0_15px_rgba(255,42,42,0.4)]'
                : 'bg-[#0B0C10] text-slate-400 border-[#1F222E] hover:border-slate-500'}"
            >
              {layer.name}
            </button>
          {/each}
        </div>

        <!-- Active Layer Deep Dive Box -->
        {#if flagship.layers[activeLayer]}
          <div class="p-4 bg-[#050608] border border-[#FF2A2A]/50 font-mono-cyber space-y-1.5 animate-fade-in">
            <div class="text-[9px] text-[#FF2A2A] uppercase tracking-widest">
              LAYER 0{activeLayer + 1} // SUBSYSTEM TELEMETRY
            </div>
            <div class="text-xs font-bold text-white">
              {flagship.layers[activeLayer].title}
            </div>
            <div class="text-xs text-slate-300 font-sans-cyber leading-relaxed">
              {flagship.layers[activeLayer].details}
            </div>
          </div>
        {/if}
      </div>

    </div>

    <!-- SECONDARY FLAGSHIPS GRID (3 Cards) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each secondaryFlagships as project}
        <div class="cyber-card p-5 flex flex-col justify-between group space-y-4">
          
          <div class="space-y-3">
            <div class="font-mono-cyber text-[9px] text-[#FF2A2A] tracking-widest uppercase">
              {project.category}
            </div>
            <h4 class="font-display font-bold text-base sm:text-lg text-white group-hover:text-[#00E5FF] transition-colors">
              {project.title}
            </h4>
            <p class="font-sans-cyber text-xs text-slate-300 leading-relaxed">
              {project.desc}
            </p>
          </div>

          <div class="space-y-3 pt-3 border-t border-[#1A1C23]">
            <div class="flex flex-wrap gap-1.5">
              {#each project.tags as tag}
                <span class="font-mono-cyber text-[9px] px-1.5 py-0.5 bg-black border border-[#1F222E] text-slate-300">
                  {tag}
                </span>
              {/each}
            </div>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              class="font-mono-cyber text-[10px] text-[#00E5FF] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
            >
              <span>SOURCE PROTOCOL</span>
              <ArrowUpRight class="w-3 h-3" />
            </a>
          </div>

        </div>
      {/each}
    </div>

  </div>
</section>
