<script>
  import { Github, Twitter, Instagram, Copy, Check, ArrowUpRight } from "lucide-svelte";

  let copied = $state(false);
  const email = "kishorekishorei170@gmail.com";

  function handleCopy() {
    navigator.clipboard.writeText(email);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 2500);
  }
</script>

<section id="contact" class="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-[#14161F] select-none">
  
  <div class="max-w-3xl mx-auto text-center space-y-6 relative z-10">
    
    <!-- Red Small Tag (Exact as Video Frame_024) -->
    <div class="font-mono-cyber text-[10px] text-[#FF2A2A] font-bold tracking-widest uppercase">
      DIRECT CONNECT
    </div>

    <!-- Main Headline (Word-for-Word as Video Frame_024) -->
    <h2 class="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
      Let's Architect Something Extraordinary.
    </h2>

    <!-- Subtitle (Word-for-Word as Video Frame_024) -->
    <p class="font-sans-cyber text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
      Available for production autonomous AI system design, institutional trading infrastructure, and sovereign technical advisory worldwide.
    </p>

    <!-- Email Box + Red Copy Button (Exact Layout as Video Frame_028) -->
    <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
      <div class="font-mono-cyber text-xs text-white px-4 py-2.5 bg-[#08090C] border border-[#1A1C23] w-full sm:w-auto flex-1 text-center sm:text-left select-all">
        {email}
      </div>

      <button
        type="button"
        onclick={handleCopy}
        class="cyber-badge-red px-4 py-2.5 font-mono-cyber text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto shrink-0 active:scale-95 transition-transform"
      >
        {#if copied}
          <Check class="w-3.5 h-3.5" />
          <span>COPIED</span>
        {:else}
          <Copy class="w-3.5 h-3.5" />
          <span>Copy Email Address</span>
        {/if}
      </button>
    </div>

    <!-- Social Terminal Links (Exact from Video Frame_028) -->
    <div class="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono-cyber">
      <a
        href="https://github.com/Kishore1700"
        target="_blank"
        rel="noopener noreferrer"
        class="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
      >
        <Github class="w-3.5 h-3.5" />
        <span>github.com/Kishore1700</span>
      </a>

      <a
        href="https://x.com"
        target="_blank"
        rel="noopener noreferrer"
        class="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
      >
        <Twitter class="w-3.5 h-3.5" />
        <span>x.com/kishore_pm</span>
      </a>

      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        class="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
      >
        <Instagram class="w-3.5 h-3.5" />
        <span>@kishore_pm</span>
      </a>
    </div>

    <!-- Small Footer Note (Exact from Video Frame_028) -->
    <div class="pt-12 text-[10px] font-mono-cyber text-slate-400 space-y-1">
      <div>&copy; 2026 Kishore P M. Designed with First & Critical AI.</div>
      <div>Built from first principles. Zero cloud wrappers.</div>
    </div>

  </div>
</section>
