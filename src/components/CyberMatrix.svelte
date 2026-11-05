<script>
  import CadTarget from "./CadTarget.svelte";

  let activeFilter = $state("ALL");

  const filterTabs = [
    { id: "ALL", label: "All Systems (6)" },
    { id: "LANG", label: "Languages & Core" },
    { id: "FRONTEND", label: "Frontend & 3D" },
    { id: "DB", label: "Databases & Cloud" },
    { id: "AI", label: "AI & Security" }
  ];

  // Kishore's real skills mapped to the Systems Matrix format
  const systems = [
    {
      id: "#SYS-01",
      category: "LANG",
      categoryPill: "Core Programming",
      title: "Python, Java & Web Languages",
      desc: "Primary development stack with extensive hands-on proficiency in Python (90%), JavaScript & TypeScript (90%), PHP OOP (85%), and Java & C (80%) for building robust algorithms and microservice endpoints.",
      pills: ["Python 3", "Java OOP", "JavaScript", "TypeScript", "PHP"]
    },
    {
      id: "#SYS-02",
      category: "FRONTEND",
      categoryPill: "Reactive Client Engine",
      title: "Svelte 5, SvelteKit & 3D WebGL",
      desc: "Compile-time reactive frontend engineering utilizing Svelte 5 runes ($state, $derived), Tailwind CSS v4, and raw WebGL/Three.js shaders for high-fps graphics and zero virtual DOM overhead.",
      pills: ["Svelte 5 (92%)", "Tailwind v4 (90%)", "WebGL (85%)", "HTML5/CSS3"]
    },
    {
      id: "#SYS-03",
      category: "DB",
      categoryPill: "Data Persistence",
      title: "PostgreSQL, Supabase & MySQL",
      desc: "Relational database schema modeling, index optimization, Row Level Security (RLS) policies, stored procedures, and ACID transactional guarantees across Supabase (88%) and MySQL (85%).",
      pills: ["PostgreSQL", "Supabase RLS", "MySQL Schema", "REST APIs"]
    },
    {
      id: "#SYS-04",
      category: "AI",
      categoryPill: "Computer Vision & ML",
      title: "PyTorch, OpenCV & Groq LLaMA 3.2",
      desc: "Applied deep learning pipelines: 4x image super-resolution via ESRGAN and PyTorch, image filtering via OpenCV, and AI text classification via Groq SDK & LLaMA 3.2 for automated code auditing.",
      pills: ["PyTorch (86%)", "OpenCV", "Groq LLaMA 3.2", "ESRGAN"]
    },
    {
      id: "#SYS-05",
      category: "AI",
      categoryPill: "Cyber Security & Auditing",
      title: "Sensitive Data Audit & Validation",
      desc: "Security audit suites for detecting leaked credentials, entropy analysis on codebases, JWT/bcrypt authentication, and strict end-to-end schema validation via Zod and Playwright tests.",
      pills: ["Secret Scanning (85%)", "Zod", "Playwright (82%)", "JWT Auth"]
    },
    {
      id: "#SYS-06",
      category: "LANG",
      categoryPill: "Engineering Tooling",
      title: "Git, Vite, jsPDF & Build Pipeline",
      desc: "Production software delivery tooling: Git version control (88%), Vite build pipeline, automated client-side PDF document generation via jsPDF, Docker containerization, and Apache environments.",
      pills: ["Git & GitHub (88%)", "Vite", "jsPDF", "Docker", "Apache"]
    }
  ];

  let filtered = $derived(
    activeFilter === "ALL" ? systems : systems.filter((s) => s.category === activeFilter)
  );
</script>

<section id="matrix" class="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#14161F] select-none">
  
  <div class="max-w-7xl mx-auto space-y-8">
    
    <!-- Section Header (Exact as Video Frame_020) -->
    <CadTarget id="matrix-header" label="260 × 28">
      <div class="space-y-4">
        <div class="space-y-1">
          <div class="font-mono-cyber text-[10px] text-[#FF2A2A] font-bold tracking-widest uppercase">
            ENGINEERING INDEX
          </div>
          <h2 class="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            The Systems Matrix
          </h2>
          <p class="font-sans-cyber text-xs text-slate-400 max-w-xl leading-relaxed">
            Specialized engineering capabilities across programming languages, reactive frontends, database persistence, and AI/security auditing.
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
      </div>
    </CadTarget>

    <!-- Systems Grid with Kishore's Real Skills -->
    <CadTarget id="matrix-cards" label="720 × 240">
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
    </CadTarget>

  </div>
</section>
