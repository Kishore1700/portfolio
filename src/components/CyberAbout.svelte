<script>
  const pillars = [
    {
      num: "01",
      title: "First-Principles Architecture",
      desc: "Every component, API route, and database schema is crafted with deliberate necessity. Eliminating unnecessary framework bloat results in ultra-lean, verifiable codebases that execute reliably."
    },
    {
      num: "02",
      title: "Algorithmic Precision & DSA",
      desc: "Rigorous study in data structures, time and space complexity (Big-O), recursion, and relational database query optimization acquired through computer science coursework and continuous coding practice."
    },
    {
      num: "03",
      title: "High-Performance Full-Stack",
      desc: "Bridging asynchronous Python and enterprise Java microservices with compile-time reactive client interfaces in Svelte 5 and modern CSS, prioritizing sub-50ms user event loops."
    }
  ];
</script>

<section id="about" class="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#14161F] select-none">
  
  <div class="max-w-7xl mx-auto space-y-8">
    
    <!-- Section Header (Exact as Video Frame_006) -->
    <div class="space-y-1">
      <div class="font-mono-cyber text-[10px] text-[#FF2A2A] tracking-widest uppercase font-bold">
        ENGINEER PROFILE
      </div>
      <h2 class="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
        Background & Philosophy
      </h2>
    </div>

    <!-- 2-Column Split (Exact Text & Layout from Video with Kishore's Real Education) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <!-- LEFT 7 COLUMNS: Narrative & Quote Block -->
      <div class="lg:col-span-7 space-y-4 font-sans-cyber text-xs sm:text-sm text-slate-300 leading-relaxed">
        <p>
          I am <strong class="text-white">Kishore P M</strong> — an independent full-stack engineer and software architect based in Salem, Tamil Nadu, India. My formal education began with a <strong class="text-white">Bachelor of Computer Applications (BCA)</strong> from Sona College of Arts & Science, followed by pursuing my <strong class="text-[#00E5FF]">Master of Computer Applications (MCA)</strong> at <strong class="text-[#00E5FF]">Sona College of Technology</strong>.
        </p>

        <p>
          My defining capabilities were forged in the terminal: developing scalable backend services in <strong class="text-[#FF2A2A]">Python</strong> and <strong class="text-white">Java</strong>, architecting relational database models in <strong class="text-[#00FF66]">PostgreSQL & MySQL</strong>, and building responsive, reactive web applications with <strong class="text-[#00E5FF]">Svelte 5</strong>. I view software engineering not as framework assembly, but as the deliberate orchestration of memory hierarchies, clean APIs, and mathematical state machines.
        </p>

        <!-- Red Quotation Callout (Kishore's Real Philosophy from before) -->
        <blockquote class="p-4 bg-[#08090C] border-l-2 border-[#FF2A2A] text-slate-200 text-xs sm:text-sm font-sans-cyber leading-relaxed italic my-4">
          "Like building enduring structures from first principles, software engineering requires a sturdy bedrock, efficient logic circuits, and a passion for crafting engaging experiences."
        </blockquote>

        <!-- Quick Education Metrics -->
        <div class="grid grid-cols-2 gap-3 pt-2 font-mono-cyber text-[10px]">
          <div class="p-2.5 bg-[#050608] border border-[#1A1C23]">
            <span class="text-slate-500 uppercase block">MASTER'S DEGREE:</span>
            <span class="text-white font-bold block mt-0.5">MCA @ Sona College of Tech</span>
            <span class="text-[#00FF66]">CGPA: 7.6 / 10 &bull; 2025–2027</span>
          </div>
          <div class="p-2.5 bg-[#050608] border border-[#1A1C23]">
            <span class="text-slate-500 uppercase block">BACHELOR'S DEGREE:</span>
            <span class="text-white font-bold block mt-0.5">BCA @ Sona College of Arts</span>
            <span class="text-[#00E5FF]">CGPA: 6.9 / 10 &bull; 2022–2025</span>
          </div>
        </div>
      </div>

      <!-- RIGHT 5 COLUMNS: 3 Numbered Architecture Items -->
      <div class="lg:col-span-5 space-y-3 font-mono-cyber">
        {#each pillars as p}
          <div class="cyber-card p-3.5 space-y-1 group hover:border-[#FF2A2A] transition-colors">
            <div class="flex items-center gap-2">
              <span class="text-[#FF2A2A] font-bold text-xs">{p.num}</span>
              <h3 class="text-xs font-bold text-white group-hover:text-[#FF2A2A] transition-colors">
                {p.title}
              </h3>
            </div>
            <p class="text-[10px] text-slate-400 font-sans-cyber leading-relaxed pl-5">
              {p.desc}
            </p>
          </div>
        {/each}
      </div>

    </div>

  </div>
</section>
