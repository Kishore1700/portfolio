<script>
  import { Shield, Cpu, Code2, Sparkles, ChevronRight, GraduationCap, MapPin, Terminal } from "lucide-svelte";
  import { sound } from "../utils/sound.js";

  // Selected architectural pillar
  let activePillar = $state(0);

  const pillars = [
    {
      index: "01",
      title: "First-Principles Architecture",
      subtitle: "Full-Stack & Systems",
      desc: "Every system layer is built with deliberate necessity and clean separation of concerns. From low-level SQL database schemas to asynchronous Python and Java API handlers, avoiding unnecessary bloated dependencies.",
      tags: ["Python", "Java", "RESTful APIs", "SQL Schemas"]
    },
    {
      index: "02",
      title: "Algorithmic Precision & DSA",
      subtitle: "Complexity & Efficiency",
      desc: "Deep theoretical grounding in structural computing from Sona College of Technology MCA. Optimizing for Big-O runtime, robust edge-case handling, recursion, graph traversals, and dynamic memory efficiency.",
      tags: ["Data Structures", "Big-O Analysis", "Optimization", "OOP"]
    },
    {
      index: "03",
      title: "Reactive Client Engineering",
      subtitle: "High-Performance Interfaces",
      desc: "Creating lightning-fast client interfaces with Svelte 5 and modern CSS. Sub-millisecond reactive state updates, accessible design patterns, and authentic retro cybernetic aesthetics.",
      tags: ["Svelte 5", "Tailwind CSS", "JavaScript", "Micro-Interactions"]
    }
  ];
</script>

<section id="about" class="relative py-20 border-t border-[#14151e] bg-[#030305]/60 overflow-hidden">
  
  <!-- Red Laser Vertical Guide Line on Left (From Video!) -->
  <div class="laser-line-red left-4 sm:left-12 hidden md:block"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    
    <!-- Section Technical Index Heading -->
    <div class="mb-10 sm:mb-12">
      <div class="font-mono text-xs text-slate-500 mb-1 flex items-center gap-2">
        <span class="text-[#FF2A2A] font-bold">// 01.00</span>
        <span>SEC_ABOUT INDEX [01/05]</span>
      </div>
      <div class="font-mono text-[10px] text-[#FF2A2A] tracking-wider uppercase font-bold mb-1">
        ENGINEER PROFILE
      </div>
      <h2 class="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
        Background & Philosophy
      </h2>
      <div class="h-[2px] w-24 bg-[#FF2A2A] mt-3 shadow-[0_0_12px_#FF2A2A]"></div>
    </div>

    <!-- Two-Column Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      
      <!-- LEFT 7 COLUMNS: Bio Narrative & Callout Quote -->
      <div class="lg:col-span-7 space-y-6">
        
        <div class="space-y-4 text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
          <p>
            I am <strong class="text-white font-semibold">Kishore P M</strong> &mdash; a system architect and full-stack software engineer based in Salem, Tamil Nadu. My formal engineering education began with foundational computer applications, culminating in my current enrollment in the <strong class="text-cyan-400 font-medium">Master of Computer Applications (MCA)</strong> at <strong class="text-[#FF2A2A] font-medium">Sona College of Technology</strong>.
          </p>

          <p>
            My defining capabilities were forged in the terminal: developing scalable backend microservices, crafting modular object-oriented architectures in <strong class="text-white">Python</strong> and <strong class="text-white">Java</strong>, and building reactive frontend applications in <strong class="text-[#00FF66]">Svelte</strong>. I view software engineering not as framework assembly, but as the orchestration of data structures, clean API contracts, and performant state mechanics.
          </p>
        </div>

        <!-- Featured Red-Bordered Quote Block (Directly from Video!) -->
        <div class="p-5 sm:p-6 bg-[#06070a] border-l-4 border-[#FF2A2A] border-y border-r border-[#1a1b24] relative shadow-[0_0_24px_rgba(255,42,42,0.08)]">
          <p class="font-sans italic text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
            "I design and deploy resilient software architectures that operate 24/7 with clean separation of concerns, algorithmic efficiency, and delightful user experiences &mdash; built from first principles, not frameworks."
          </p>
          <div class="mt-3 flex items-center justify-between font-mono text-xs">
            <span class="text-[#FF2A2A] font-bold">&mdash; Kishore P M</span>
            <span class="text-slate-500 text-[10px]">PHILOSOPHY PROTOCOL</span>
          </div>
        </div>

        <!-- Academic & Base Quick Spec -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
          <div class="p-3 bg-[#08090e] border border-[#1b1d28]">
            <span class="text-[10px] text-slate-500 block">EDUCATION</span>
            <span class="text-cyan-400 font-bold mt-0.5 block">MCA Candidate</span>
            <span class="text-[9px] text-slate-400">Sona College of Tech</span>
          </div>

          <div class="p-3 bg-[#08090e] border border-[#1b1d28]">
            <span class="text-[10px] text-slate-500 block">CORE ENGINES</span>
            <span class="text-[#00FF66] font-bold mt-0.5 block">Python &bull; Java &bull; Svelte</span>
            <span class="text-[9px] text-slate-400">Full-Stack Core</span>
          </div>

          <div class="p-3 bg-[#08090e] border border-[#1b1d28] col-span-2 sm:col-span-1">
            <span class="text-[10px] text-slate-500 block">LOCATION</span>
            <span class="text-white font-bold mt-0.5 block">Salem, India</span>
            <span class="text-[9px] text-slate-400">Available Worldwide</span>
          </div>
        </div>

      </div>

      <!-- RIGHT 5 COLUMNS: Numbered Architectural Pillars (Directly from Video!) -->
      <div class="lg:col-span-5 space-y-4">
        
        <div class="font-mono text-xs text-slate-400 flex items-center justify-between pb-2 border-b border-[#1b1c26]">
          <span>ARCHITECTURAL PILLARS</span>
          <span class="text-[#FF2A2A]">SELECT TO INSPECT</span>
        </div>

        <div class="space-y-3">
          {#each pillars as pillar, idx}
            <button
              type="button"
              onclick={() => { sound.playClick(); activePillar = idx; }}
              class="w-full text-left p-4 bg-[#07080c] border transition-all duration-200 cursor-pointer group {activePillar === idx
                ? 'border-[#FF2A2A] shadow-[0_0_20px_rgba(255,42,42,0.15)] bg-[#0c0d14]'
                : 'border-[#1b1d28] hover:border-slate-600'}"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span class="font-mono text-xs font-extrabold px-1.5 py-0.5 bg-[#FF2A2A]/10 text-[#FF2A2A] border border-[#FF2A2A]/40">
                    {pillar.index}
                  </span>
                  <div>
                    <h4 class="font-display font-bold text-sm text-white group-hover:text-cyan-400 transition-colors">
                      {pillar.title}
                    </h4>
                    <span class="font-mono text-[10px] text-slate-500">
                      {pillar.subtitle}
                    </span>
                  </div>
                </div>

                <ChevronRight class="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-transform" />
              </div>

              <!-- Expanded Details inside active pillar -->
              {#if activePillar === idx}
                <div class="mt-3 pt-3 border-t border-[#1b1d28] space-y-2 animate-fade-in">
                  <p class="font-sans text-xs text-slate-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                  <div class="flex flex-wrap gap-1.5 pt-1">
                    {#each pillar.tags as tag}
                      <span class="font-mono text-[9px] px-2 py-0.5 bg-black text-cyan-400 border border-[#222533]">
                        {tag}
                      </span>
                    {/each}
                  </div>
                </div>
              {/if}
            </button>
          {/each}
        </div>

      </div>

    </div>

  </div>
</section>
