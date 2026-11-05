<script>
  import { ArrowRight, Terminal, Cpu, Database, Layers, ShieldCheck, ExternalLink } from "lucide-svelte";
  import { sound } from "../utils/sound.js";
  import Minecraft3DBlock from "./Minecraft3DBlock.svelte";

  const metrics = [
    { value: "6+ Systems", label: "Core Deployments", icon: Cpu },
    { value: "7-Layer", label: "Architectural Stack", icon: Layers },
    { value: "MCA Candidate", label: "Sona College of Tech", icon: ShieldCheck },
    { value: "100% Offline-First", label: "Autonomous Ready", icon: Database },
  ];

  function scrollToSection(id) {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  }
</script>

<section id="home" class="relative min-h-[92vh] pt-24 pb-16 flex flex-col justify-center overflow-hidden">
  
  <!-- GIANT RED WIREFRAME BACKGROUND TYPOGRAPHY (From Video) -->
  <div class="absolute inset-x-0 top-12 flex justify-center pointer-events-none select-none overflow-hidden opacity-35 z-0">
    <span class="font-display font-extrabold text-[15vw] tracking-tighter text-wireframe-red whitespace-nowrap">
      PORTFOLIO
    </span>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      
      <!-- LEFT 7 COLUMNS: Headline & Positioning -->
      <div class="lg:col-span-7 space-y-6">
        
        <!-- Status indicator badge -->
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-[#090a0f] border border-[#222433] font-mono text-xs text-slate-300">
          <span class="w-2 h-2 rounded-full bg-[#FF2A2A] animate-ping"></span>
          <span class="text-[#FF2A2A] font-bold">SYSTEM ARCHITECT</span>
          <span class="text-slate-500">&bull;</span>
          <span>AUTONOMOUS OPERATOR</span>
        </div>

        <!-- Identity Block -->
        <div class="space-y-2">
          <div class="font-sans italic text-slate-400 text-xl sm:text-2xl font-light">
            Hello, I'm
          </div>
          
          <div class="flex items-center gap-3 flex-wrap">
            <h1 class="bg-[#FF2A2A] text-black font-display font-black text-4xl sm:text-6xl md:text-7xl px-3 sm:px-4 py-1 tracking-tight inline-block shadow-[0_0_30px_rgba(255,42,42,0.4)]">
              KISHORE.
            </h1>
          </div>
        </div>

        <!-- Role Subtitle & Positioning Narrative -->
        <div class="space-y-4 max-w-2xl">
          <p class="font-mono text-xs sm:text-sm text-cyan-400 font-semibold tracking-wide">
            MCA SCHOLAR @ SONA COLLEGE &bull; FULL-STACK SYSTEMS ARCHITECT
          </p>

          <p class="font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
            Architecting high-performance backend pipelines, responsive reactive client frontends, and applied computer vision systems from first principles — zero frameworks assembly, total architectural precision.
          </p>
        </div>

        <!-- Action CTAs -->
        <div class="flex flex-wrap items-center gap-4 pt-2">
          <button
            type="button"
            onclick={() => scrollToSection("contact")}
            class="px-6 py-3 bg-[#FF2A2A] hover:bg-white text-black font-mono font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 shadow-[0_0_24px_rgba(255,42,42,0.4)] cursor-pointer group"
          >
            <span>INITIATE DISPATCH</span>
            <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            onclick={() => scrollToSection("projects")}
            class="px-6 py-3 bg-[#0a0b12] hover:bg-[#161824] text-slate-200 hover:text-white border border-[#262838] hover:border-cyan-400 font-mono text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer"
          >
            <Terminal class="w-4 h-4 text-cyan-400" />
            <span>EXPLORE ARCHITECTURE</span>
          </button>
        </div>

        <!-- Telemetry Metrics Bar (From Video) -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#181a24]">
          {#each metrics as m}
            <div class="p-3 bg-[#06070a] border border-[#181922] relative group hover:border-[#FF2A2A] transition-colors">
              <span class="font-mono text-sm sm:text-base font-extrabold text-white block group-hover:text-[#FF2A2A] transition-colors">
                {m.value}
              </span>
              <span class="font-mono text-[10px] text-slate-400 block mt-0.5">
                {m.label}
              </span>
              <!-- Corner Crosshair Accent -->
              <span class="absolute top-1 right-1 text-[8px] text-slate-600 font-mono">+</span>
            </div>
          {/each}
        </div>

      </div>

      <!-- RIGHT 5 COLUMNS: Red-Framed Sovereign Silicon Portrait / 3D Voxel Node -->
      <div class="lg:col-span-5 relative flex justify-center">
        
        <!-- Red Outer Frame (From Video) -->
        <div class="w-full max-w-[420px] bg-[#0c0d12] border-2 border-[#FF2A2A] p-4 relative shadow-[0_0_40px_rgba(255,42,42,0.18)]">
          
          <!-- Corner Crosshairs -->
          <span class="absolute -top-2 -left-2 text-sm text-[#FF2A2A] font-mono font-bold">+</span>
          <span class="absolute -top-2 -right-2 text-sm text-[#FF2A2A] font-mono font-bold">+</span>
          <span class="absolute -bottom-2 -left-2 text-sm text-[#FF2A2A] font-mono font-bold">+</span>
          <span class="absolute -bottom-2 -right-2 text-sm text-[#FF2A2A] font-mono font-bold">+</span>

          <!-- Top Status Tag -->
          <div class="flex items-center justify-between pb-2 mb-2 border-b border-[#222433] font-mono text-[10px]">
            <span class="text-slate-400 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse"></span>
              CORE NODE: ONLINE
            </span>
            <span class="text-cyan-400">SALEM // TAMIL NADU</span>
          </div>

          <!-- Interactive 3D Voxel Terminal Viewport -->
          <div class="bg-[#000000] border border-[#1f212a] p-2 relative min-h-[300px] flex flex-col justify-center items-center overflow-hidden">
            <Minecraft3DBlock />

            <!-- Cybernetic Scanline Overlay -->
            <div class="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent h-16 w-full animate-pulse"></div>
          </div>

          <!-- Bottom Sovereign Silicon Badge (Directly from video!) -->
          <div class="mt-3 p-2 bg-[#050608] border border-[#222432] flex items-center justify-between font-mono text-[10px]">
            <span class="text-[#FF2A2A] font-bold tracking-wider">
              // SOVEREIGN SILICON ACTIVE
            </span>
            <span class="text-slate-400">
              PY &bull; JAVA &bull; SVELTE
            </span>
          </div>

          <!-- Mini Side Telemetry Notes -->
          <div class="mt-2 space-y-1 text-[9px] font-mono text-slate-400">
            <div class="flex justify-between">
              <span>01. Autonomous Core:</span>
              <span class="text-emerald-400">Svelte 5 + Python FastAPIs</span>
            </div>
            <div class="flex justify-between">
              <span>02. Sub-50ms Event Loops:</span>
              <span class="text-cyan-400">Low-Latency Processing</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
</section>
