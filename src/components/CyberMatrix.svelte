<script>
  import { Cpu, Terminal, Database, Globe, Layers, ArrowUpRight } from "lucide-svelte";

  let activeFilter = $state("ALL");

  const filterOptions = [
    { id: "ALL", label: "All Systems (6)" },
    { id: "BACKEND", label: "Backend Core" },
    { id: "FRONTEND", label: "Frontend & UI" },
    { id: "AI", label: "AI & CV" }
  ];

  const systems = [
    {
      id: "#SYS-01",
      category: "BACKEND",
      categoryLabel: "Asynchronous Backend",
      title: "Python Microservice & API Engine",
      desc: "High-throughput asynchronous web architecture built with FastAPI/Flask. Implements stateless JWT authentication, Pydantic data validation, and automated OpenAPI documentation.",
      tags: ["Python 3.12", "FastAPI", "AsyncIO", "REST APIs", "Pydantic"]
    },
    {
      id: "#SYS-02",
      category: "BACKEND",
      categoryLabel: "Enterprise Core",
      title: "Java OOP Enterprise Architecture",
      desc: "Robust enterprise service models engineered with strict object-oriented paradigms, concurrency management, and modular service-repository patterns.",
      tags: ["Java", "OOP", "Multithreading", "Design Patterns", "Clean Code"]
    },
    {
      id: "#SYS-03",
      category: "FRONTEND",
      categoryLabel: "Reactive Frontend",
      title: "Svelte 5 Reactive Client Architecture",
      desc: "Next-generation compile-time reactive interfaces utilizing Svelte 5 runes ($state, $derived). Zero virtual DOM overhead for 60fps telemetry and sub-1ms state transitions.",
      tags: ["Svelte 5", "Runes", "Tailwind CSS", "Vite", "TypeScript"]
    },
    {
      id: "#SYS-04",
      category: "BACKEND",
      categoryLabel: "Data Persistence",
      title: "Relational Schema & SQL Engineering",
      desc: "Normalized database structures with foreign-key constraints, index optimization, query profiling, and ACID transactional guarantees.",
      tags: ["SQL", "PostgreSQL / MySQL", "Indexing", "ACID", "Schema Design"]
    },
    {
      id: "#SYS-05",
      category: "AI",
      categoryLabel: "Computer Vision",
      title: "Neural Super-Resolution & Processing",
      desc: "Deep learning convolutional models for image reconstruction, bicubic fallbacks, and real-time tensor computation on GPU silicon.",
      tags: ["PyTorch", "OpenCV", "Convolutional Networks", "Image Processing"]
    },
    {
      id: "#SYS-06",
      category: "FRONTEND",
      categoryLabel: "Full-Stack Protocol",
      title: "Full-Stack Web Application Architecture",
      desc: "End-to-end web deployment tying responsive client views to authenticated server endpoints and relational storage backends.",
      tags: ["Full-Stack", "JavaScript", "HTML5", "CSS3", "Git"]
    }
  ];

  let filteredSystems = $derived(
    activeFilter === "ALL" ? systems : systems.filter((s) => s.category === activeFilter)
  );
</script>

<section id="matrix" class="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#14161F]">
  
  <div class="max-w-7xl mx-auto space-y-10">
    
    <!-- Section Header -->
    <div class="space-y-2">
      <div class="font-mono-cyber text-[10px] text-[#FF2A2A] tracking-widest uppercase">
        ENGINEERING INDEX
      </div>
      <h2 class="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
        The Systems Matrix
      </h2>
      <p class="font-mono-cyber text-xs text-slate-400 max-w-xl">
        Specialized system components spanning distributed backend execution, compile-time reactive UIs, and deep learning algorithms.
      </p>
    </div>

    <!-- Filter Pills (As in the video) -->
    <div class="flex flex-wrap items-center gap-2">
      {#each filterOptions as opt}
        <button
          type="button"
          onclick={() => (activeFilter = opt.id)}
          class="px-3 py-1.5 font-mono-cyber text-[10px] uppercase tracking-wider transition-all border cursor-pointer {activeFilter === opt.id
            ? 'cyber-badge-red border-[#FF2A2A]'
            : 'bg-[#0A0B0E] text-slate-400 border-[#1F222E] hover:text-white hover:border-slate-500'}"
        >
          {opt.label}
        </button>
      {/each}
    </div>

    <!-- Systems Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredSystems as sys (sys.id)}
        <div class="cyber-card p-5 flex flex-col justify-between group space-y-4">
          
          <div class="space-y-2.5">
            <div class="flex items-center justify-between border-b border-[#1A1C23] pb-2">
              <span class="font-mono-cyber text-[10px] text-[#FF2A2A] font-bold">
                {sys.id}
              </span>
              <span class="font-mono-cyber text-[9px] text-[#00E5FF] px-1.5 py-0.5 bg-black border border-[#14161F]">
                {sys.categoryLabel}
              </span>
            </div>

            <h3 class="font-display font-bold text-base text-white group-hover:text-[#00E5FF] transition-colors">
              {sys.title}
            </h3>

            <p class="font-sans-cyber text-xs text-slate-300 leading-relaxed">
              {sys.desc}
            </p>
          </div>

          <div class="pt-3 border-t border-[#1A1C23] flex flex-wrap gap-1.5">
            {#each sys.tags as tag}
              <span class="font-mono-cyber text-[9px] px-1.5 py-0.5 bg-black border border-[#1F222E] text-slate-400">
                {tag}
              </span>
            {/each}
          </div>

        </div>
      {/each}
    </div>

  </div>
</section>
