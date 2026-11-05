<script>
  import { ArrowRight } from "lucide-svelte";
</script>

<section id="hero" class="relative min-h-screen flex flex-col justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
  
  <!-- Giant Wireframe Outline PORTFOLIO Typography in Background (As in Video) -->
  <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 w-full text-center overflow-hidden">
    <span class="text-outline-cyber font-display font-extrabold text-[19vw] leading-none opacity-45 uppercase block tracking-tighter">
      PORTFOLIO
    </span>
  </div>

  <div class="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
    
    <!-- LEFT 5 COLUMNS: Headline, Bio & Primary Telemetry -->
    <div class="lg:col-span-5 space-y-4">
      
      <!-- Script Greeting + Red Brand Badge -->
      <div class="space-y-1">
        <div class="font-body italic text-white text-base sm:text-lg">
          Hello, I'm
        </div>
        <div class="inline-block">
          <h1 class="cyber-badge-red text-4xl sm:text-5xl md:text-6xl px-3.5 py-1 font-display font-black tracking-tight uppercase">
            KISHORE.
          </h1>
        </div>
      </div>

      <!-- Black Pill with Red Dot -->
      <div class="inline-flex items-center gap-2 px-2 py-0.5 bg-[#050608] border border-[#1A1C23]">
        <span class="w-1.5 h-1.5 rounded-full bg-[#FF2A2A] shadow-[0_0_8px_#FF2A2A]"></span>
        <span class="font-mono-cyber text-[9px] text-slate-300 font-bold uppercase tracking-wider">
          SYSTEM ARCHITECT & AUTONOMOUS OPERATOR
        </span>
      </div>

      <!-- High-impact Narrative Paragraph -->
      <p class="font-sans-cyber text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
        Architecting 24/7 autonomous cognitive ecosystems, multi-agent swarms, and quantitative execution models from first principles — zero frameworks, total autonomy.
      </p>

      <!-- Primary Action Buttons -->
      <div class="flex flex-wrap items-center gap-2.5 pt-1">
        <a
          href="#contact"
          class="cyber-btn-primary !py-2 !px-4 text-[11px] flex items-center gap-2"
        >
          <span>INITIATE DISPATCH</span>
          <ArrowRight class="w-3.5 h-3.5" />
        </a>

        <a
          href="#flagships"
          class="cyber-btn-secondary !py-2 !px-4 text-[11px]"
        >
          <span>EXPLORE ARCHITECTURE</span>
        </a>
      </div>

      <!-- Telemetry Numbers -->
      <div class="grid grid-cols-3 gap-2 pt-4 border-t border-[#1A1C23] max-w-sm">
        <div>
          <span class="font-mono-cyber text-xs sm:text-sm font-bold text-[#FF2A2A] block">478</span>
          <span class="font-mono-cyber text-[9px] text-slate-400 block">MCP Tools</span>
        </div>
        <div>
          <span class="font-mono-cyber text-xs sm:text-sm font-bold text-white block">7-Layer</span>
          <span class="font-mono-cyber text-[9px] text-slate-400 block">core Stack</span>
        </div>
        <div>
          <span class="font-mono-cyber text-xs sm:text-sm font-bold text-white block">100%</span>
          <span class="font-mono-cyber text-[9px] text-slate-400 block">Offline-First</span>
        </div>
      </div>

    </div>

    <!-- CENTER 3 COLUMNS: Red Solid Square Portrait Frame with Sovereign Silicon Badge -->
    <div class="lg:col-span-3 flex justify-center">
      <div class="relative w-full max-w-[260px]">
        
        <!-- Red Solid Square Frame (Matching Video Frame_003) -->
        <div class="bg-[#FF2A2A] p-2 relative shadow-[0_0_40px_rgba(255,42,42,0.25)] border border-[#FF4444]">
          
          <!-- Silhouette / Portrait -->
          <div class="w-full aspect-square bg-[#050608] flex flex-col items-center justify-center relative overflow-hidden">
            <!-- Scanlines / radial glow -->
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,42,42,0.25)_0%,transparent_75%)]"></div>

            <div class="relative z-10 flex flex-col items-center text-center p-3">
              <div class="w-20 h-20 rounded-full border-2 border-[#FF2A2A] flex items-center justify-center bg-black/80 shadow-[0_0_20px_#FF2A2A]/50 mb-2">
                <span class="font-display font-black text-2xl text-white tracking-tighter">KP</span>
              </div>
              <span class="font-mono-cyber text-xs text-white font-bold tracking-wider uppercase">KISHORE P M</span>
              <span class="font-mono-cyber text-[8px] text-[#00E5FF] mt-0.5">Sona College of Tech</span>
            </div>

            <!-- Corner Measurement Crosshairs -->
            <div class="absolute top-1 left-1 text-[8px] text-[#FF2A2A] font-mono-cyber">+</div>
            <div class="absolute top-1 right-1 text-[8px] text-[#FF2A2A] font-mono-cyber">+</div>
            <div class="absolute bottom-1 left-1 text-[8px] text-[#FF2A2A] font-mono-cyber">+</div>
            <div class="absolute bottom-1 right-1 text-[8px] text-[#FF2A2A] font-mono-cyber">+</div>
          </div>

          <!-- Bottom Sovereign Silicon Active Badge -->
          <div class="mt-1.5 bg-[#000000] border border-black text-center py-1">
            <span class="font-mono-cyber text-[8px] text-[#FF2A2A] font-bold tracking-widest flex items-center justify-center gap-1 uppercase">
              <span class="w-1.5 h-1.5 rounded-full bg-[#FF2A2A] animate-ping"></span>
              // SOVEREIGN SILICON ACTIVE
            </span>
          </div>

        </div>

      </div>
    </div>

    <!-- RIGHT 4 COLUMNS: 3 Runtime Modules & Tech Tags (Matching Video Frame_003) -->
    <div class="lg:col-span-4 space-y-4">
      
      <!-- Module 01 -->
      <div class="cyber-card p-3 font-mono-cyber space-y-1">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-white flex items-center gap-1.5">
            <span class="text-[#FF2A2A]">01.</span>
            <span>Autonomous Core</span>
          </span>
          <span class="text-[8px] text-[#00FF66] bg-black px-1.5 py-0.5 border border-[#1A1C23]">RUNTIME</span>
        </div>
        <p class="text-[10px] text-slate-400 leading-tight">
          Hermes Agent • Claude-Code • Local Mistral-Zero cloud-lock-in.
        </p>
      </div>

      <!-- Module 02 -->
      <div class="cyber-card p-3 font-mono-cyber space-y-1">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-white flex items-center gap-1.5">
            <span class="text-[#FF2A2A]">02.</span>
            <span>SAAI Labs Takeover</span>
          </span>
          <span class="text-[8px] text-[#00E5FF] bg-black px-1.5 py-0.5 border border-[#1A1C23]">PRODUCTION</span>
        </div>
        <p class="text-[10px] text-slate-400 leading-tight">
          Primebuzz / Medibizz enterprise takeover: 7 client repos live.
        </p>
      </div>

      <!-- Module 03 -->
      <div class="cyber-card p-3 font-mono-cyber space-y-1">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-white flex items-center gap-1.5">
            <span class="text-[#FF2A2A]">03.</span>
            <span>Sub-50ms Event Loops</span>
          </span>
          <span class="text-[8px] text-[#FFD600] bg-black px-1.5 py-0.5 border border-[#1A1C23]">EXECUTION</span>
        </div>
        <p class="text-[10px] text-slate-400 leading-tight">
          Quantitative execution models & 4-canonical persistent memory.
        </p>
      </div>

      <!-- Tech Tags Row (Exact tags from video) -->
      <div class="pt-2 flex flex-wrap gap-1.5 font-mono-cyber text-[9px] text-slate-400">
        <span class="px-2 py-0.5 bg-black border border-[#1A1C23]">Solidity</span>
        <span class="px-2 py-0.5 bg-black border border-[#1A1C23]">EVM</span>
        <span class="px-2 py-0.5 bg-black border border-[#1A1C23]">FastAPI</span>
        <span class="px-2 py-0.5 bg-black border border-[#1A1C23]">Next.js</span>
        <span class="px-2 py-0.5 bg-black border border-[#1A1C23]">Docker</span>
        <span class="px-2 py-0.5 bg-black border border-[#1A1C23]">Rust</span>
      </div>

    </div>

  </div>
</section>
