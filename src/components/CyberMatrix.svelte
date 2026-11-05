<script>
  // Exact filter pills from video frame_020
  let activeFilter = $state("ALL");

  const filterTabs = [
    { id: "ALL", label: "All Systems (6)" },
    { id: "AI", label: "Autonomous AI" },
    { id: "QUANT", label: "Quant & Markets" },
    { id: "CORE", label: "Core Engineering" }
  ];

  // Exact 6 systems from video frame_020, frame_021, frame_024
  const systems = [
    {
      id: "#SYS-01",
      category: "AI",
      categoryPill: "Autonomous AI",
      title: "Multi-LLM Parliament Architecture",
      desc: "Cognitive assembly model comprising 6 AI personality shards engaging in structured debate, cross-verification, and voting protocols to synthesize balanced decisions.",
      pills: ["Multi-Agent", "Consensus Protocol"]
    },
    {
      id: "#SYS-02",
      category: "AI",
      categoryPill: "Machine Learning",
      title: "AIT Kronos — ML Time Series Forecaster",
      desc: "Production-grade time-series forecasting service with FastAPI backend and React/TypeScript dashboard. Complete machine learning pipeline from raw stream ingestion to checkpointing.",
      pills: ["FastAPI", "PyTorch"]
    },
    {
      id: "#SYS-03",
      category: "AI",
      categoryPill: "Deep Learning",
      title: "DLFM — Dynamical Latent Field Model",
      desc: "Experimental PyTorch CUDA neural architecture modeling complex dynamical physical and mathematical systems in a 1024-dimensional latent field via discrete integration pipelines.",
      pills: ["PyTorch CUDA", "Latent Dynamics"]
    },
    {
      id: "#SYS-04",
      category: "QUANT",
      categoryPill: "Cryptographic Architecture",
      title: "GPU-Accelerated Cryptographic Search",
      desc: "High-performance parallel CUDA kernel pipelines executing non-linear search spaces and key collision checks with massive SIMD thread saturation.",
      pills: ["CUDA C++", "GPU Kernels"]
    },
    {
      id: "#SYS-05",
      category: "QUANT",
      categoryPill: "Financial Architecture",
      title: "Hedge Fund Structure & Institutional Design",
      desc: "End-to-end fund architecture design applying systems engineering to quantitative finance. LP/GP governance, 2/20 fee watermarking, KYC/AML compliance, and risk routing.",
      pills: ["LP/GP Architecture", "Risk Modeling"]
    },
    {
      id: "#SYS-06",
      category: "CORE",
      categoryPill: "AI Philosophy",
      title: "Axiom of Truth Cognitive Framework",
      desc: "Epistemological cognitive foundation designed to anchor AI agents against hallucination and sycophancy. Enforces strict factual truth verification before token generation.",
      pills: ["Epistemology", "Verification"]
    }
  ];

  let filtered = $derived(
    activeFilter === "ALL" ? systems : systems.filter((s) => s.category === activeFilter)
  );
</script>

<section id="matrix" class="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#14161F] select-none">
  
  <div class="max-w-7xl mx-auto space-y-8">
    
    <!-- Section Header (Exact as Video Frame_020) -->
    <div class="space-y-1">
      <div class="font-mono-cyber text-[10px] text-[#FF2A2A] font-bold tracking-widest uppercase">
        ENGINEERING INDEX
      </div>
      <h2 class="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
        The Systems Matrix
      </h2>
      <p class="font-sans-cyber text-xs text-slate-400 max-w-xl leading-relaxed">
        Specialized architectures spanning multi-LLM cognitive assemblies, deep learning latent models, and GPU cryptography.
      </p>
    </div>

    <!-- Filter Pills (Exact from Video Frame_020) -->
    <div class="flex flex-wrap items-center gap-2">
      {#each filterTabs as tab}
        <button
          type="button"
          onclick={() => (activeFilter = tab.id)}
          class="px-3 py-1 font-mono-cyber text-[10px] tracking-wider transition-all cursor-pointer border {activeFilter === tab.id
            ? 'cyber-badge-red border-[#FF2A2A]'
            : 'bg-[#0A0B0E] text-slate-400 border-[#1A1C23] hover:text-white'}"
        >
          {tab.label}
        </button>
      {/each}
    </div>

    <!-- Systems Grid (Exact Cards from Video Frame_020 and 021) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each filtered as sys (sys.id)}
        <div class="cyber-card p-5 flex flex-col justify-between group space-y-4">
          
          <div class="space-y-2">
            <!-- Category and ID -->
            <div class="flex items-center justify-between font-mono-cyber text-[9px] pb-1 border-b border-[#1A1C23]">
              <span class="text-[#FF2A2A] font-bold">{sys.categoryPill}</span>
              <span class="text-slate-500">{sys.id}</span>
            </div>

            <!-- Title -->
            <h3 class="font-display font-bold text-sm sm:text-base text-white group-hover:text-[#FF2A2A] transition-colors leading-snug">
              {sys.title}
            </h3>

            <!-- Description -->
            <p class="font-sans-cyber text-xs text-slate-300 leading-relaxed">
              {sys.desc}
            </p>
          </div>

          <!-- Bottom Pills -->
          <div class="pt-3 border-t border-[#1A1C23] flex flex-wrap gap-1">
            {#each sys.pills as pill}
              <span class="px-2 py-0.5 bg-black border border-[#1A1C23] text-slate-400 font-mono-cyber text-[9px]">
                {pill}
              </span>
            {/each}
          </div>

        </div>
      {/each}
    </div>

  </div>
</section>
