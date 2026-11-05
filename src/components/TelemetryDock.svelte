<script>
  import { onMount } from "svelte";
  import { RotateCcw } from "lucide-svelte";

  let scrollPercent = $state(0);
  let totalLayers = 252;
  // Dynamic calculation matching video numbers (from 24 to 252)
  let builtLayers = $derived(Math.min(totalLayers, Math.max(24, Math.round(24 + (scrollPercent / 100) * 228))));
  let agentCount = $derived(scrollPercent > 80 ? 28 : scrollPercent > 40 ? 22 : 18);
  let isTouring = $state(true);

  onMount(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollPercent = max > 0 ? (scrollY / max) * 100 : 0;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  });

  function toggleTour() {
    isTouring = !isTouring;
  }

  function handleReplay() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
</script>

<!-- BOTTOM TELEMETRY DOCK (Exact Match to Video Frame_004, 007, 014, 021, 028) -->
<div class="fixed bottom-3.5 left-1/2 -translate-x-1/2 z-[9995] w-[92%] max-w-2xl select-none">
  <div class="bg-[#050608]/95 backdrop-blur-md border border-[#1A1C23] px-3.5 py-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.95)] flex items-center justify-between gap-3 font-mono-cyber text-[9px]">
    
    <!-- Left: Agent Swarm Dots + Count -->
    <div class="flex items-center gap-1.5 shrink-0">
      <div class="flex -space-x-1 items-center">
        <span class="w-2 h-2 rounded-full bg-[#FF2A2A] border border-black"></span>
        <span class="w-2 h-2 rounded-full bg-[#00E5FF] border border-black"></span>
        <span class="w-2 h-2 rounded-full bg-[#00FF66] border border-black"></span>
        <span class="w-2 h-2 rounded-full bg-[#FFD600] border border-black"></span>
      </div>
      <span class="text-white font-bold">{agentCount} agents</span>
    </div>

    <!-- Center: Layer Assembly Progress -->
    <div class="flex-1 flex items-center gap-2.5 max-w-xs hidden sm:flex">
      <span class="text-slate-400 shrink-0">{builtLayers} / {totalLayers} layers</span>
      <div class="flex-1 h-1 bg-[#14161F] overflow-hidden relative border border-[#1E212B]">
        <div
          class="h-full bg-gradient-to-r from-[#FF2A2A] via-[#00E5FF] to-[#00FF66] transition-all duration-100"
          style="width: {(builtLayers / totalLayers) * 100}%;"
        ></div>
      </div>
    </div>

    <!-- Right: Mode & Replay Controls (Exact from Video) -->
    <div class="flex items-center gap-1.5 shrink-0">
      <button
        type="button"
        onclick={toggleTour}
        class="px-2 py-0.5 bg-[#0F1015] border border-[#1F222E] text-slate-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
        title="Toggle autonomous touring"
      >
        <span class="w-1.5 h-1.5 rounded-full {isTouring ? 'bg-[#00FF66]' : 'bg-slate-500'}"></span>
        <span>{isTouring ? 'Touring' : 'Manual'}</span>
        <span class="text-slate-500 font-bold">1x</span>
      </button>

      <button
        type="button"
        onclick={handleReplay}
        class="px-2 py-0.5 bg-[#0F1015] border border-[#1F222E] text-slate-300 hover:text-[#00E5FF] flex items-center gap-1 transition-colors cursor-pointer"
        title="Replay layer assembly from top"
      >
        <RotateCcw class="w-2.5 h-2.5" />
        <span class="hidden md:inline">Replay</span>
      </button>

      {#if scrollPercent > 90}
        <span class="text-slate-400 pl-1 border-l border-[#1A1C23] hidden lg:inline animate-fade-in">
          Rebuilt by 28 agents in 48.6s
        </span>
      {/if}
    </div>

  </div>
</div>
