<script>
  import { Terminal, Shield, Cpu, BookOpen, ChevronRight } from "lucide-svelte";

  let activePillar = $state(0);

  const pillars = [
    {
      index: "01",
      title: "First-Principles Architecture",
      subtitle: "Zero framework bloat. Total system clarity.",
      desc: "Every component, API route, and database schema is crafted with deliberate necessity. Eliminating unnecessary dependencies results in ultra-lean, verifiable codebases that execute reliably."
    },
    {
      index: "02",
      title: "Algorithmic Precision & DSA",
      subtitle: "Mathematical complexity and low-latency bounds.",
      desc: "Rigorous study in data structures, time and space complexity (Big-O), recursive state models, and database query optimization acquired throughout academic and competitive computer science practice."
    },
    {
      index: "03",
      title: "High-Performance Full-Stack",
      subtitle: "Reactive frontends seamlessly bound to robust backends.",
      desc: "Bridging asynchronous Python (FastAPI/Flask) and enterprise Java microservices with compile-time reactive client interfaces (Svelte 5 & modern CSS), prioritizing sub-50ms user event loops."
    }
  ];
</script>

<section id="about" class="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#14161F]">
  
  <div class="max-w-7xl mx-auto space-y-10">
    
    <!-- Section Technical Index Header -->
    <div class="space-y-2">
      <div class="font-mono-cyber text-[10px] text-[#FF2A2A] tracking-widest uppercase">
        // 01.00 SEC_ABOUT INDEX [01/05]
      </div>
      <div class="text-[11px] font-mono-cyber text-slate-400 uppercase tracking-wider">
        ENGINEER PROFILE
      </div>
      <h2 class="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
        Background & Philosophy
      </h2>
    </div>

    <!-- 2-Column Grid: Narrative vs Architecture Pillars -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      
      <!-- LEFT 7 COLUMNS: Bio & Education Narrative -->
      <div class="lg:col-span-7 space-y-5 font-sans-cyber text-sm sm:text-base text-slate-300 leading-relaxed">
        <p>
          I am <strong class="text-white">Kishore P M</strong> — an independent full-stack engineer and system architect based in Salem, Tamil Nadu, India. My formal computer science education is anchored in the <strong class="text-[#00E5FF]">Master of Computer Applications (MCA)</strong> program at <strong class="text-[#00E5FF]">Sona College of Technology</strong>.
        </p>

        <p>
          My defining capabilities were forged in the terminal: developing scalable backend services in <strong class="text-[#FFD600]">Python</strong> and <strong class="text-[#FF2A2A]">Java</strong>, architecting relational database models, and designing reactive web interfaces in <strong class="text-[#00FF66]">Svelte 5</strong>. I view software engineering not as framework assembly, but as the deliberate orchestration of memory hierarchies, clean APIs, and mathematical state machines.
        </p>

        <!-- Red Quotation Block -->
        <blockquote class="p-4 sm:p-5 bg-[#090A0D] border-l-2 border-[#FF2A2A] text-slate-200 text-xs sm:text-sm font-mono-cyber leading-relaxed italic my-6">
          "I build high-performance systems and full-stack software that operate with persistent reliability, modular microservice orchestration, and continuous responsiveness — built from first principles, not frameworks."
        </blockquote>

        <!-- Education Credentials Strip -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div class="cyber-card p-3 font-mono-cyber">
            <span class="text-[9px] text-slate-400 block uppercase">DEGREE PROGRAM</span>
            <span class="text-xs text-[#00E5FF] font-bold block mt-0.5">Master of Computer Applications (MCA)</span>
            <span class="text-[10px] text-slate-400 block mt-1">Sona College of Technology &bull; Salem</span>
          </div>

          <div class="cyber-card p-3 font-mono-cyber">
            <span class="text-[9px] text-slate-400 block uppercase">PRIMARY FOCUS</span>
            <span class="text-xs text-[#00FF66] font-bold block mt-0.5">Full-Stack & System Design</span>
            <span class="text-[10px] text-slate-400 block mt-1">Python &bull; Java &bull; Svelte &bull; SQL</span>
          </div>
        </div>

      </div>

      <!-- RIGHT 5 COLUMNS: Numbered Interactive Architecture Pillars -->
      <div class="lg:col-span-5 space-y-3">
        {#each pillars as pillar, idx}
          <div
            role="button"
            tabindex="0"
            class="cyber-card p-4 transition-all duration-200 cursor-pointer {activePillar === idx ? '!border-[#00E5FF] bg-[#0A0D14]' : 'hover:border-slate-700'}"
            onclick={() => (activePillar = idx)}
            onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') activePillar = idx; }}
          >
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-center gap-3">
                <span class="font-mono-cyber text-xs font-bold px-1.5 py-0.5 bg-black border border-[#1F222E] {activePillar === idx ? 'text-[#00E5FF] border-[#00E5FF]' : 'text-slate-500'}">
                  {pillar.index}
                </span>
                <h3 class="font-mono-cyber text-xs sm:text-sm font-bold text-white">
                  {pillar.title}
                </h3>
              </div>
              <ChevronRight class="w-4 h-4 text-slate-500 transition-transform {activePillar === idx ? 'rotate-90 text-[#00E5FF]' : ''}" />
            </div>

            <div class="text-[11px] font-mono-cyber text-slate-400 mt-1 pl-8">
              {pillar.subtitle}
            </div>

            {#if activePillar === idx}
              <div class="mt-3 pt-3 border-t border-[#1C2130] pl-8 text-xs font-sans-cyber text-slate-300 leading-relaxed">
                {pillar.desc}
              </div>
            {/if}
          </div>
        {/each}
      </div>

    </div>

  </div>
</section>
