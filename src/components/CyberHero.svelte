<script>
  import { ArrowRight, Terminal, Cpu, Database, Layers } from "lucide-svelte";
</script>

<section id="hero" class="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
  
  <!-- Giant Wireframe Outline PORTFOLIO Typography in Background -->
  <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 w-full text-center overflow-hidden">
    <span class="text-outline-cyber font-display font-extrabold text-[18vw] leading-none opacity-40 uppercase block">
      PORTFOLIO
    </span>
  </div>

  <div class="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
    
    <!-- LEFT 7 COLUMNS: Headline, Bio & Telemetry -->
    <div class="lg:col-span-7 space-y-6">
      
      <!-- Operator Status Pill -->
      <div class="inline-flex items-center gap-2 px-2.5 py-1 bg-[#0A0B0E] border border-[#1F222E]">
        <span class="w-1.5 h-1.5 rounded-full bg-[#FF2A2A] shadow-[0_0_8px_#FF2A2A]"></span>
        <span class="font-mono-cyber text-[10px] text-slate-300 uppercase tracking-widest">
          SYSTEM ARCHITECT & AUTONOMOUS OPERATOR
        </span>
      </div>

      <!-- Identity & Bold Title -->
      <div class="space-y-2">
        <div class="flex items-baseline gap-2">
          <span class="font-body italic text-slate-400 text-lg sm:text-xl">Hello, I'm</span>
        </div>
        <div class="flex items-center gap-3">
          <h1 class="cyber-badge-red text-3xl sm:text-5xl md:text-6xl px-3 py-1 font-display font-black tracking-tighter uppercase inline-block">
            KISHORE.
          </h1>
        </div>
      </div>

      <!-- High-impact Operator Narrative -->
      <p class="font-sans-cyber text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
        Architecting high-concurrency backend ecosystems, reactive client architectures, and autonomous multi-agent pipelines from first principles — zero bloat, total performance.
      </p>

      <!-- Primary Action Buttons -->
      <div class="flex flex-wrap items-center gap-3 pt-2">
        <a href="#contact" class="cyber-btn-primary">
          <span>INITIATE DISPATCH</span>
          <ArrowRight class="w-3.5 h-3.5" />
        </a>

        <a href="#flagships" class="cyber-btn-secondary">
          <span>EXPLORE ARCHITECTURE</span>
        </a>
      </div>

      <!-- Technical Telemetry Counters -->
      <div class="grid grid-cols-3 gap-3 pt-6 border-t border-[#1A1C23] max-w-lg">
        <div class="space-y-1">
          <span class="font-mono-cyber text-xs sm:text-sm font-bold text-[#FF2A2A] block">6+ Repos</span>
          <span class="font-mono-cyber text-[9px] text-slate-400 uppercase tracking-wider block">Production Code</span>
        </div>
        <div class="space-y-1">
          <span class="font-mono-cyber text-xs sm:text-sm font-bold text-[#00E5FF] block">7-Layer Core</span>
          <span class="font-mono-cyber text-[9px] text-slate-400 uppercase tracking-wider block">Full-Stack Stack</span>
        </div>
        <div class="space-y-1">
          <span class="font-mono-cyber text-xs sm:text-sm font-bold text-[#00FF66] block">MCA Candidate</span>
          <span class="font-mono-cyber text-[9px] text-slate-400 uppercase tracking-wider block">Sona College</span>
        </div>
      </div>

    </div>

    <!-- RIGHT 5 COLUMNS: Sovereign Silicon Profile & Live Specs -->
    <div class="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
      <div class="w-full max-w-[340px] space-y-4">
        
        <!-- Red-Framed Operator Portrait Box -->
        <div class="relative bg-[#070709] border-2 border-[#FF2A2A] p-2 shadow-[0_0_35px_rgba(255,42,42,0.18)]">
          
          <!-- Portrait Avatar Container -->
          <div class="w-full aspect-[4/5] bg-gradient-to-b from-[#1C0606] via-[#0B0C10] to-[#000000] flex flex-col items-center justify-center relative overflow-hidden">
            <!-- Cyber scanline backdrop -->
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,42,42,0.12)_0%,transparent_70%)]"></div>
            
            <!-- Graphic Silhouette Representation -->
            <div class="relative z-10 flex flex-col items-center">
              <div class="w-24 h-24 rounded-full border-2 border-[#FF2A2A] flex items-center justify-center bg-black/60 shadow-[0_0_20px_#FF2A2A]/40 mb-3">
                <span class="font-display font-black text-3xl text-white tracking-tighter">KP</span>
              </div>
              <span class="font-mono-cyber text-xs text-white font-bold tracking-widest uppercase">KISHORE P M</span>
              <span class="font-mono-cyber text-[9px] text-[#00E5FF] mt-0.5">MCA Scholar & Engineer</span>
            </div>

            <!-- Red Corner Markers -->
            <div class="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-[#FF2A2A]"></div>
            <div class="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-[#FF2A2A]"></div>
            <div class="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-[#FF2A2A]"></div>
            <div class="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-[#FF2A2A]"></div>
          </div>

          <!-- Sovereign Silicon Active Badge -->
          <div class="mt-2 text-center py-1.5 bg-[#000000] border border-[#2B0B0B]">
            <span class="font-mono-cyber text-[9px] text-[#FF2A2A] font-bold tracking-widest flex items-center justify-center gap-1.5 uppercase">
              <span class="w-1.5 h-1.5 rounded-full bg-[#FF2A2A] animate-ping"></span>
              // SOVEREIGN SILICON ACTIVE
            </span>
          </div>

        </div>

        <!-- Mini Telemetry Tags -->
        <div class="cyber-card p-3 font-mono-cyber text-[10px] space-y-2">
          <div class="flex justify-between text-slate-400">
            <span>CORE PROTOCOL:</span>
            <span class="text-white font-bold">FastAPI + Svelte + Java</span>
          </div>
          <div class="flex justify-between text-slate-400">
            <span>EXECUTION LATENCY:</span>
            <span class="text-[#00FF66] font-bold">&lt; 15ms Local</span>
          </div>
          <div class="flex justify-between text-slate-400">
            <span>OFFLINE FIRST:</span>
            <span class="text-[#00E5FF] font-bold">100% Native Silicon</span>
          </div>
        </div>

      </div>
    </div>

  </div>
</section>
