<script>
  import { ArrowRight, FileText } from "lucide-svelte";
  import CadTarget from "./CadTarget.svelte";
  import { buildEngine } from "../utils/buildEngine.svelte.js";
</script>

<section id="hero" class="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 select-none">
  
  <div class="max-w-7xl mx-auto w-full space-y-6">
    
    <!-- Giant Wireframe Outline PORTFOLIO Typography across Top (Matching Video intro_005/006) -->
    <CadTarget id="port-wireframe" label="1021 × 336" class="w-full text-center select-none overflow-hidden pb-2">
      <h1 class="text-outline-cyber font-display font-black text-[15vw] sm:text-[13vw] leading-none tracking-tight block uppercase">
        PORTFOLIO
      </h1>
    </CadTarget>

    <!-- 3-Column Cyber Grid: Left Specs | Center Sovereign Portrait | Right Runtimes -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      
      <!-- LEFT 5 COLUMNS: Bio, Role, Actions & Metrics -->
      <div class="lg:col-span-5 space-y-4">
        
        <!-- Script Greeting + Red Brand Badge (Matching Video intro_005/006 & build_004) -->
        <div class="space-y-1">
          <CadTarget id="hero-greet" label="84 × 22">
            <div class="font-cursive text-white text-2xl sm:text-3xl tracking-wide select-none">
              {buildEngine.typedTexts["hero-greet"] || "Hello, I'm"}
            </div>
          </CadTarget>

          <CadTarget id="hero-name" label="128 × 48" class="inline-block relative">
            <div class="relative inline-block">
              <h2 class="bg-[#FF2A2A] text-white font-display font-black text-4xl sm:text-5xl md:text-6xl px-4 py-1 tracking-tight uppercase shadow-[0_0_25px_rgba(255,42,42,0.4)]">
                {buildEngine.typedTexts["hero-name"] || "KISHORE."}
              </h2>
              <!-- 4 Corner White Brackets as seen in Video -->
              <div class="absolute -top-1 -left-1 w-1.5 h-1.5 bg-white border border-black"></div>
              <div class="absolute -top-1 -right-1 w-1.5 h-1.5 bg-white border border-black"></div>
              <div class="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white border border-black"></div>
              <div class="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-white border border-black"></div>
            </div>
          </CadTarget>
        </div>

        <!-- Role Pill with Glowing Red Dot -->
        <CadTarget id="hero-role" label="316 × 16" class="inline-block">
          <div class="inline-flex items-center gap-2 px-2.5 py-1 bg-[#050608] border border-[#1A1C23]">
            <span class="w-1.5 h-1.5 rounded-full bg-[#FF2A2A] shadow-[0_0_8px_#FF2A2A]"></span>
            <span class="font-mono-cyber text-[10px] text-slate-200 font-bold uppercase tracking-wider">
              {buildEngine.typedTexts["hero-role"] || "• FULL-STACK ARCHITECT & MCA SCHOLAR"}
            </span>
          </div>
        </CadTarget>

        <!-- Bio Paragraph Typed out Live by Agent GPT-4o -->
        <CadTarget id="hero-bio" label="425 × 71">
          <p class="font-sans-cyber text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md min-h-[4rem]">
            {buildEngine.typedTexts["hero-bio"] || "Master of Computer Applications candidate at Sona College of Technology. Architecting high-concurrency backend services, asynchronous pipelines, and reactive client interfaces from first principles — zero frameworks, total autonomy."}
          </p>
        </CadTarget>

        <!-- Action Buttons -->
        <CadTarget id="hero-buttons" label="260 × 40">
          <div class="flex flex-wrap items-center gap-2.5 pt-1">
            <a
              href="#contact"
              class="cyber-btn-primary !py-2 !px-4 text-[11px] flex items-center gap-2 cursor-pointer"
            >
              <span>INITIATE DISPATCH</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </a>

            <a
              href="#flagships"
              class="cyber-btn-secondary !py-2 !px-4 text-[11px] cursor-pointer"
            >
              <span>{buildEngine.typedTexts["hero-btn2"] || "EXPLORE ARCHITECTURE"}</span>
            </a>

            <a
              href="/Kishore_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="cyber-btn-secondary !py-2 !px-3 text-[11px] flex items-center gap-1.5 cursor-pointer"
              title="Inspect Kishore's verified resume PDF"
            >
              <FileText class="w-3.5 h-3.5 text-[#FF2A2A]" />
              <span>RESUME</span>
            </a>
          </div>
        </CadTarget>

        <!-- Telemetry Numbers matching Video Layout -->
        <CadTarget id="hero-metrics" label="340 × 44">
          <div class="grid grid-cols-3 gap-3 pt-4 border-t border-[#1A1C23] max-w-md font-mono-cyber text-[10px]">
            <div>
              <span class="text-base sm:text-lg font-bold text-[#FF2A2A] block leading-none">6+ Repos</span>
              <span class="text-[9px] text-slate-400 block mt-1">Production Code</span>
            </div>
            <div>
              <span class="text-base sm:text-lg font-bold text-white block leading-none">4-Layer</span>
              <span class="text-[9px] text-slate-400 block mt-1">Architecture</span>
            </div>
            <div>
              <span class="text-base sm:text-lg font-bold text-[#00FF66] block leading-none">100%</span>
              <span class="text-[9px] text-slate-400 block mt-1">Verifiable Code</span>
            </div>
          </div>
        </CadTarget>

      </div>

      <!-- CENTER 3 COLUMNS: Crimson Red Portrait Frame (Matching Video Frame_004) -->
      <div class="lg:col-span-3 flex justify-center">
        <CadTarget id="hero-portrait" label="240 × 250" class="w-full max-w-[260px]">
          <div class="bg-[#FF2A2A] p-2 relative shadow-[0_0_40px_rgba(255,42,42,0.3)] border border-[#FF4444]">
            <!-- Red Square Interior with Kishore Silhouette/Monogram -->
            <div class="w-full aspect-square bg-[#08090C] flex flex-col items-center justify-center relative overflow-hidden">
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,42,42,0.35)_0%,transparent_75%)]"></div>

              <div class="relative z-10 flex flex-col items-center text-center p-3">
                <div class="w-20 h-20 rounded-full border-2 border-[#FF2A2A] flex items-center justify-center bg-black/80 shadow-[0_0_20px_#FF2A2A]/50 mb-2">
                  <span class="font-display font-black text-2xl text-white tracking-tighter">KP</span>
                </div>
                <span class="font-mono-cyber text-xs text-white font-bold tracking-wider uppercase">KISHORE P M</span>
                <span class="font-mono-cyber text-[8px] text-[#00E5FF] mt-0.5">MCA Scholar &bull; Sona College</span>
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
        </CadTarget>
      </div>

      <!-- RIGHT 4 COLUMNS: 3 Runtime Modules (Matching Video Frame_004) -->
      <div class="lg:col-span-4 space-y-3 font-mono-cyber">
        <CadTarget id="hero-runtimes" label="280 × 160" class="space-y-2.5">
          
          <!-- Module 01 -->
          <div class="cyber-card p-3 space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-white flex items-center gap-1.5">
                <span class="text-[#FF2A2A]">01. &#9654;</span>
                <span>{buildEngine.typedTexts["hero-runtime1"] || "Autonomous Core"}</span>
              </span>
              <span class="text-[8px] text-[#00FF66] bg-black px-1.5 py-0.5 border border-[#1A1C23]">PRODUCTION</span>
            </div>
            <p class="text-[10px] text-slate-400 font-sans-cyber leading-tight">
              Python AsyncIO &bull; Enterprise Java &bull; Supabase PostgreSQL &bull; REST APIs.
            </p>
          </div>

          <!-- Module 02 -->
          <div class="cyber-card p-3 space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-white flex items-center gap-1.5">
                <span class="text-[#FF2A2A]">02. &#9654;</span>
                <span>{buildEngine.typedTexts["hero-runtime2"] || "Reactive Web Engine"}</span>
              </span>
              <span class="text-[8px] text-[#00E5FF] bg-black px-1.5 py-0.5 border border-[#1A1C23]">PRODUCTION</span>
            </div>
            <p class="text-[10px] text-slate-400 font-sans-cyber leading-tight">
              Svelte 5 Runes &bull; SvelteKit 2 &bull; Tailwind CSS v4 &bull; WebGL Shaders.
            </p>
          </div>

          <!-- Module 03 -->
          <div class="cyber-card p-3 space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-white flex items-center gap-1.5">
                <span class="text-[#FF2A2A]">03. &#9654;</span>
                <span>{buildEngine.typedTexts["hero-runtime3"] || "AI & Computer Vision"}</span>
              </span>
              <span class="text-[8px] text-[#FFD600] bg-black px-1.5 py-0.5 border border-[#1A1C23]">EXECUTION</span>
            </div>
            <p class="text-[10px] text-slate-400 font-sans-cyber leading-tight">
              PyTorch &bull; OpenCV &bull; ESRGAN 4x Super-Resolution &bull; Groq LLaMA 3.2.
            </p>
          </div>
        </CadTarget>

        <!-- Tech Tags Row with Kishore's Real Stack -->
        <CadTarget id="hero-tags" label="260 × 30">
          <div class="pt-2 flex flex-wrap gap-1.5 text-[9px] text-slate-400">
            <span class="px-2 py-0.5 bg-black border border-[#1A1C23] text-[#FF2A2A]">Python</span>
            <span class="px-2 py-0.5 bg-black border border-[#1A1C23] text-[#00E5FF]">Svelte 5</span>
            <span class="px-2 py-0.5 bg-black border border-[#1A1C23] text-white">Java</span>
            <span class="px-2 py-0.5 bg-black border border-[#1A1C23] text-[#00FF66]">PostgreSQL</span>
            <span class="px-2 py-0.5 bg-black border border-[#1A1C23]">FastAPI</span>
            <span class="px-2 py-0.5 bg-black border border-[#1A1C23]">PHP</span>
            <span class="px-2 py-0.5 bg-black border border-[#1A1C23]">MySQL</span>
            <span class="px-2 py-0.5 bg-black border border-[#1A1C23]">Git</span>
          </div>
        </CadTarget>

      </div>

    </div>

  </div>
</section>
