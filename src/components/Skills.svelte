<script>
  import { sound } from "../utils/sound.js";
  import { Cpu, Database, Layout, Sparkles, GitBranch, ArrowUpRight } from "lucide-svelte";

  let selectedCategory = $state("all");

  const categories = [
    { id: "all", name: "All Systems (6)" },
    { id: "backend", name: "Backend & Core" },
    { id: "frontend", name: "Frontend & UI" },
    { id: "ai", name: "Algorithms & AI" },
    { id: "database", name: "Databases & Tools" },
  ];

  const systems = [
    {
      id: "#SYS-01",
      category: "backend",
      categoryLabel: "Backend Core",
      title: "Python Asynchronous Backend Core",
      desc: "Architecting modular backend pipelines, high-throughput REST APIs, asynchronous worker tasks, and automated data ingestion scripts with zero extraneous bloat.",
      tags: ["Python 3.12", "FastAPI / Flask", "AsyncIO", "REST APIs", "Microservices"],
      stats: "96% Reliability"
    },
    {
      id: "#SYS-02",
      category: "backend",
      categoryLabel: "Enterprise OOP",
      title: "Java Enterprise Architecture & Systems",
      desc: "Robust object-oriented system design incorporating design patterns, strict type-safety, modular package boundaries, and resilient multithreaded logic.",
      tags: ["Java", "OOP Principles", "Design Patterns", "Multithreading", "Enterprise"],
      stats: "92% Core Stability"
    },
    {
      id: "#SYS-03",
      category: "frontend",
      categoryLabel: "Reactive UI",
      title: "Svelte 5 Reactive Client Engine",
      desc: "Sub-millisecond reactive user interfaces crafted with Svelte 5 runes, responsive layout systems in Tailwind CSS, accessible DOM structures, and zero runtime overhead.",
      tags: ["Svelte 5", "Runes State", "Tailwind CSS", "JavaScript / ESNext", "HTML5 Canvas"],
      stats: "100% Responsive"
    },
    {
      id: "#SYS-04",
      category: "database",
      categoryLabel: "Data Persistence",
      title: "Relational Schema & SQL Engine",
      desc: "Normalized relational database design, indexing strategies, transaction isolation, complex JOIN aggregations, and high-concurrency schema modeling.",
      tags: ["MySQL", "PostgreSQL", "Query Optimization", "ACID", "Schema Modeling"],
      stats: "Sub-10ms Queries"
    },
    {
      id: "#SYS-05",
      category: "ai",
      categoryLabel: "Computer Science",
      title: "DSA & Complexity Modeling",
      desc: "Analytical approach to computation: Big-O asymptotic complexity analysis, tree and graph traversals, dynamic programming, sorting pipelines, and edge-case testing.",
      tags: ["Algorithms", "Data Structures", "Big-O Analysis", "Optimization", "Discrete Math"],
      stats: "98% Efficiency"
    },
    {
      id: "#SYS-06",
      category: "ai",
      categoryLabel: "Machine Learning",
      title: "Neural Vision & Inference Pipelines",
      desc: "Integrating deep learning model inference (ESRGAN, CNNs), digital image processing with OpenCV, and automated neural super-resolution for image restoration.",
      tags: ["PyTorch", "OpenCV", "ESRGAN", "Computer Vision", "Model Inference"],
      stats: "Neural Precision"
    }
  ];

  let filteredSystems = $derived(
    selectedCategory === "all"
      ? systems
      : systems.filter((s) => s.category === selectedCategory)
  );
</script>

<section id="skills" class="relative py-20 border-t border-[#14151e] bg-[#030305]/60 overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    
    <!-- Section Technical Index Heading -->
    <div class="mb-10 sm:mb-12">
      <div class="font-mono text-xs text-slate-500 mb-1 flex items-center gap-2">
        <span class="text-[#FF2A2A] font-bold">// 03.00</span>
        <span>ENGINEERING INDEX [03/05]</span>
      </div>
      <div class="font-mono text-[10px] text-[#FF2A2A] tracking-wider uppercase font-bold mb-1">
        TECHNICAL CAPABILITIES
      </div>
      <h2 class="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
        The Systems Matrix
      </h2>
      <p class="font-mono text-xs text-slate-400 mt-2 max-w-2xl">
        Specialized architectures spanning full-stack frameworks, asynchronous backend pipelines, databases, and applied AI.
      </p>
      <div class="h-[2px] w-24 bg-[#FF2A2A] mt-3 shadow-[0_0_12px_#FF2A2A]"></div>
    </div>

    <!-- Category Filter Pills (Directly from Video!) -->
    <div class="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
      {#each categories as cat}
        <button
          type="button"
          onclick={() => { sound.playClick(); selectedCategory = cat.id; }}
          class="px-4 py-2 font-mono text-xs whitespace-nowrap transition-all cursor-pointer border {selectedCategory === cat.id
            ? 'bg-[#FF2A2A] text-black font-bold border-[#FF2A2A] shadow-[0_0_14px_rgba(255,42,42,0.35)]'
            : 'bg-[#06070a] text-slate-400 border-[#1f212a] hover:border-slate-500 hover:text-white'}"
        >
          {cat.name}
        </button>
      {/each}
    </div>

    <!-- Systems Matrix Cards Grid (From Video!) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredSystems as sys}
        <div class="bg-[#050608] border border-[#1b1c26] p-6 hover:border-[#FF2A2A] transition-all duration-200 flex flex-col justify-between group shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          
          <div>
            <!-- Header Tag -->
            <div class="flex items-center justify-between pb-3 mb-3 border-b border-[#181924]">
              <span class="font-mono text-[10px] text-[#FF2A2A] px-1.5 py-0.5 bg-[#FF2A2A]/10 border border-[#FF2A2A]/30 font-bold">
                {sys.categoryLabel}
              </span>
              <span class="font-mono text-xs text-slate-500 group-hover:text-cyan-400 transition-colors">
                {sys.id}
              </span>
            </div>

            <!-- Title -->
            <h4 class="font-display font-bold text-lg text-white group-hover:text-cyan-400 transition-colors mb-2">
              {sys.title}
            </h4>

            <p class="font-sans text-xs text-slate-300 leading-relaxed mb-4">
              {sys.desc}
            </p>
          </div>

          <!-- Bottom Tags & Metric -->
          <div class="pt-4 border-t border-[#181924] space-y-3">
            <div class="flex flex-wrap gap-1.5">
              {#each sys.tags as tag}
                <span class="font-mono text-[9px] px-2 py-0.5 bg-[#0a0c12] text-slate-300 border border-[#222432]">
                  {tag}
                </span>
              {/each}
            </div>

            <div class="flex items-center justify-between font-mono text-[10px] pt-1">
              <span class="text-slate-500">BENCHMARK:</span>
              <span class="text-[#00FF66] font-bold">{sys.stats}</span>
            </div>
          </div>

        </div>
      {/each}
    </div>

  </div>
</section>
