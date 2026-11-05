<script>
  import { Mail, Check, Copy, Github, Linkedin, ArrowUpRight, Terminal, Shield } from "lucide-svelte";
  import { sound } from "../utils/sound.js";

  let copied = $state(false);
  const email = "kishorekishorei170@gmail.com";

  function copyEmail() {
    sound.playClick();
    navigator.clipboard.writeText(email);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 2500);
  }
</script>

<section id="contact" class="relative py-28 border-t border-[#14151e] bg-[#000000] overflow-hidden min-h-[75vh] flex flex-col justify-center">
  
  <!-- Subtle Background Grid -->
  <div class="absolute inset-0 bg-cyber-dots opacity-30 pointer-events-none"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      
      <!-- LEFT 8 COLUMNS: Direct Connect Call to Action -->
      <div class="lg:col-span-8 space-y-6">
        
        <!-- Red Eyebrow Badge (Directly from Video!) -->
        <div class="font-mono text-xs text-[#FF2A2A] font-bold tracking-widest uppercase">
          DIRECT CONNECT
        </div>

        <h2 class="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
          Let's Architect Something Extraordinary.
        </h2>

        <p class="font-sans text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Available for software engineering roles, full-stack application development, enterprise database architecture, and technical consultation worldwide.
        </p>

        <!-- Email Dispatch Box (From Video!) -->
        <div class="pt-2 flex flex-wrap items-center gap-3">
          <div class="px-4 py-3 bg-[#08090f] border border-[#222432] font-mono text-xs sm:text-sm text-white select-all">
            {email}
          </div>

          <button
            type="button"
            onclick={copyEmail}
            class="px-5 py-3 bg-[#FF2A2A] hover:bg-white text-black font-mono font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,42,42,0.35)]"
          >
            {#if copied}
              <Check class="w-4 h-4 text-emerald-950" />
              <span>COPIED TO CLIPBOARD!</span>
            {:else}
              <Copy class="w-4 h-4" />
              <span>COPY EMAIL ADDRESS</span>
            {/if}
          </button>
        </div>

        <!-- Terminal Social Link Pills (From Video!) -->
        <div class="flex flex-wrap items-center gap-3 pt-4">
          <a
            href="https://github.com/Kishore1700"
            target="_blank"
            rel="noopener noreferrer"
            class="px-3.5 py-2 bg-[#06070a] border border-[#1b1c28] hover:border-cyan-400 font-mono text-xs text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
          >
            <Github class="w-4 h-4 text-cyan-400" />
            <span>github.com/Kishore1700</span>
            <ArrowUpRight class="w-3.5 h-3.5 text-slate-500" />
          </a>

          <a
            href="mailto:kishorekishorei170@gmail.com"
            class="px-3.5 py-2 bg-[#06070a] border border-[#1b1c28] hover:border-[#FF2A2A] font-mono text-xs text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
          >
            <Mail class="w-4 h-4 text-[#FF2A2A]" />
            <span>Direct Transmission</span>
            <ArrowUpRight class="w-3.5 h-3.5 text-slate-500" />
          </a>

          <div class="px-3.5 py-2 bg-[#06070a] border border-[#1b1c28] font-mono text-xs text-slate-400 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse"></span>
            <span>Salem, Tamil Nadu, India</span>
          </div>
        </div>

        <!-- Footer Copyright & Swarm Rebuild Note (Directly from Video!) -->
        <div class="pt-8 border-t border-[#161722] text-slate-500 font-mono text-[11px] space-y-1">
          <div>
            &copy; 2026 Kishore P M &bull; Designed & Architected with Svelte 5.
          </div>
          <div class="text-slate-600">
            Rebuilt by 28 autonomous agents in 48.6s &bull; Built from first principles &bull; Zero frameworks bloat.
          </div>
        </div>

      </div>

      <!-- RIGHT 4 COLUMNS: Swarm Vortex Landing Space (From Video!) -->
      <div class="lg:col-span-4 hidden lg:flex flex-col items-center justify-center relative min-h-[350px]">
        
        <!-- Swarm Vortex Orbit Ring Marker -->
        <div class="w-64 h-64 rounded-full border border-dashed border-[#1f212f] flex items-center justify-center relative animate-spin [animation-duration:40s]">
          <div class="w-48 h-48 rounded-full border border-[#2a2c3d]/40 flex items-center justify-center">
            <div class="w-32 h-32 rounded-full border border-cyan-500/20"></div>
          </div>
        </div>

        <!-- Center Terminal Node -->
        <div class="absolute inset-0 flex flex-col items-center justify-center text-center font-mono pointer-events-none">
          <span class="w-2.5 h-2.5 rounded-full bg-[#FF2A2A] animate-ping mb-2 shadow-[0_0_12px_#FF2A2A]"></span>
          <span class="text-xs font-bold text-white tracking-widest">SWARM VORTEX</span>
          <span class="text-[9px] text-cyan-400 mt-0.5">28 AGENTS SYNCHRONIZED</span>
        </div>

      </div>

    </div>
  </div>
</section>
