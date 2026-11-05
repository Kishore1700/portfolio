<script>
  import { onMount } from "svelte";
  import { Play, Pause, RotateCcw, Activity } from "lucide-svelte";

  let scrollPercent = $state(0);
  let totalLayers = 252;
  let builtLayers = $derived(Math.min(totalLayers, Math.max(18, Math.round((scrollPercent / 100) * totalLayers))));
  let agentCount = $state(20);
  let isTouring = $state(true);
  let elapsedSec = $state("48.6s");

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

<!-- FLOATING CYBER-OPERATOR TELEMETRY DOCK -->
<div class="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9995] w-[95%] max-w-3xl select-none">
  <div class="bg-[#070709]/95 backdrop-blur-md border border-[#1F222E] px-3 sm:px-4 py-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.9)] flex items-center justify-between gap-3 font-mono-cyber text-[10px]">
    
    <!-- Left: Agent Swarm Indicator -->
    <div class="flex items-center gap-2 shrink-0">
      <div class="flex -space-x-1.5 items-center">
        <span class="w-2.5 h-2.5 rounded-full bg-[#FF2A2A] border border-black animate-pulse"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-[#00E5FF] border border-black"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-[#00FF66] border border-black"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-[#FFD600] border border-black"></span>
      </div>
      <span class="text-white font-bold tracking-tight">{agentCount} agents</span>
    </div>

    <!-- Center: Layer Assembly Progress -->
    <div class="flex-1 flex items-center gap-3 max-w-md hidden sm:flex">
      <span class="text-slate-400 shrink-0 text-[9px]">{builtLayers} / {totalLayers} layers</span>
      <div class="flex-1 h-1.5 bg-[#14161F] overflow-hidden relative border border-[#232635]">
        <div
          class="h-full bg-gradient-to-r from-[#FF2A2A] via-[#00E5FF] to-[#00FF66] transition-all duration-150"
          style="width: {(builtLayers / totalLayers) * 100}%;"
        ></div>
      </div>
    </div>

    <!-- Right: Mode & Replay Controls -->
    <div class="flex items-center gap-2 shrink-0 text-[9px]">
      <button
        type="button"
        onclick={toggleTour}
        class="px-2 py-1 bg-[#12141C] border border-[#232635] text-slate-300 hover:text-white hover:border-[#FF2A2A] flex items-center gap-1 transition-colors cursor-pointer"
        title="Toggle autonomous touring state"
      >
        <span class="w-1.5 h-1.5 rounded-full {isTouring ? 'bg-[#00FF66]' : 'bg-slate-500'}"></span>
        <span>{isTouring ? 'Touring' : 'Manual'}</span>
        <span class="text-slate-500 font-bold">1x</span>
      </button>

      <button
        type="button"
        onclick={handleReplay}
        class="px-2 py-1 bg-[#12141C] border border-[#232635] text-slate-300 hover:text-[#00E5FF] hover:border-[#00E5FF] flex items-center gap-1 transition-colors cursor-pointer"
        title="Replay layer assembly from top"
      >
        <RotateCcw class="w-3 h-3" />
        <span class="hidden md:inline">Replay</span>
      </button>

      <span class="text-slate-500 hidden lg:inline pl-1 border-l border-[#1F222E]">
        Rebuilt in {elapsedSec}
      </span>
    </div>

  </div>
</div>
