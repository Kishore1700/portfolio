<script>
  import { Mail, Copy, Check, Github, Linkedin, ArrowUpRight, Terminal } from "lucide-svelte";

  let copied = $state(false);
  const email = "kishorekishorei170@gmail.com";

  function copyEmail() {
    navigator.clipboard.writeText(email);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 2500);
  }
</script>

<section id="contact" class="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-[#14161F]">
  
  <div class="max-w-4xl mx-auto text-center space-y-8 relative z-10">
    
    <!-- Red Pill -->
    <div class="inline-block">
      <span class="font-mono-cyber text-[10px] text-[#FF2A2A] tracking-widest uppercase px-2.5 py-1 bg-[#120404] border border-[#3B0E0E]">
        DIRECT CONNECT
      </span>
    </div>

    <!-- Main Headline as in video -->
    <h2 class="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight">
      Let's Architect Something Extraordinary.
    </h2>

    <p class="font-sans-cyber text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
      Available for production-grade full-stack engineering roles, high-concurrency backend system design, and software architecture.
    </p>

    <!-- Email Dispatch Box -->
    <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
      <div class="font-mono-cyber text-xs sm:text-sm text-white px-4 py-3 bg-[#08090D] border border-[#232635] w-full sm:w-auto text-center">
        {email}
      </div>

      <button
        type="button"
        onclick={copyEmail}
        class="cyber-btn-primary w-full sm:w-auto justify-center !py-3 !px-5"
      >
        {#if copied}
          <Check class="w-4 h-4 text-white" />
          <span>EMAIL COPIED</span>
        {:else}
          <Copy class="w-4 h-4" />
          <span>COPY EMAIL ADDRESS</span>
        {/if}
      </button>
    </div>

    <!-- Social Terminal Links -->
    <div class="pt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono-cyber">
      <a
        href="https://github.com/Kishore1700"
        target="_blank"
        rel="noopener noreferrer"
        class="cyber-btn-secondary !py-2 !px-3.5 flex items-center gap-2"
      >
        <Github class="w-3.5 h-3.5" />
        <span>github.com/Kishore1700</span>
        <ArrowUpRight class="w-3 h-3 text-slate-500" />
      </a>

      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        class="cyber-btn-secondary !py-2 !px-3.5 flex items-center gap-2"
      >
        <Linkedin class="w-3.5 h-3.5" />
        <span>linkedin.com/in/kishore</span>
        <ArrowUpRight class="w-3 h-3 text-slate-500" />
      </a>
    </div>

    <!-- Clean Terminal Signature -->
    <div class="pt-16 border-t border-[#14161F] text-slate-400 font-mono-cyber text-[10px] space-y-1">
      <div>&copy; 2026 Kishore P M &bull; System Architect & Full-Stack Operator</div>
      <div class="text-slate-400">Master of Computer Applications @ Sona College of Technology</div>
    </div>

  </div>
</section>
