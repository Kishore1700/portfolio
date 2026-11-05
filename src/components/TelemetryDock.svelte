<script>
  import { onMount } from "svelte";
  import { RotateCcw } from "lucide-svelte";
  import { operatorEngine } from "../utils/operatorEngine.svelte.js";

  let autoScrollInterval;

  onMount(() => {
    // Autonomous Touring auto-scroll implementation
    autoScrollInterval = setInterval(() => {
      if (operatorEngine.isTouring && operatorEngine.phase === "assembled") {
        const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
        if (window.scrollY < scrollMax - 5) {
          const step = 1.2 * operatorEngine.tourSpeed;
          window.scrollBy({ top: step, behavior: "auto" });
        }
      }
    }, 20);

    return () => clearInterval(autoScrollInterval);
  });
</script>

<!-- BOTTOM TELEMETRY DOCK (Matches Video Dock) -->
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
      <span class="text-white font-bold">{operatorEngine.agentCount} agents</span>
    </div>

    <!-- Center: Layer Assembly Progress -->
    <div class="flex-1 flex items-center gap-2.5 max-w-xs hidden sm:flex">
      <span class="text-slate-400 shrink-0">
        {#if operatorEngine.phase === "scanning"}
          Scanning page...
        {:else}
          {operatorEngine.builtLayers} / {operatorEngine.totalLayers} layers
        {/if}
      </span>
      <div class="flex-1 h-1 bg-[#14161F] overflow-hidden relative border border-[#1E212B]">
        <div
          class="h-full bg-gradient-to-r from-[#FF2A2A] via-[#00E5FF] to-[#00FF66] transition-all duration-100"
          style="width: {(operatorEngine.builtLayers / operatorEngine.totalLayers) * 100}%;"
        ></div>
      </div>
    </div>

    <!-- Right: Mode & Replay Controls -->
    <div class="flex items-center gap-1.5 shrink-0">
      <!-- Touring / Manual Mode Toggle -->
      <button
        type="button"
        onclick={() => operatorEngine.toggleTour()}
        class="px-2 py-0.5 bg-[#0F1015] border border-[#1F222E] text-slate-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
        title={operatorEngine.isTouring ? "Pause auto-scroll tour" : "Resume auto-scroll tour"}
      >
        <span class="w-1.5 h-1.5 rounded-full {operatorEngine.isTouring ? 'bg-[#00FF66] animate-pulse' : 'bg-slate-500'}"></span>
        <span>{operatorEngine.isTouring ? 'Touring' : 'Manual'}</span>
      </button>

      <!-- Speed Multiplier (1x, 2x, 0.5x) -->
      <button
        type="button"
        onclick={() => operatorEngine.cycleSpeed()}
        class="px-1.5 py-0.5 bg-[#0F1015] border border-[#1F222E] text-slate-400 hover:text-white transition-colors cursor-pointer"
        title="Toggle speed multiplier"
      >
        <span class="font-bold">{operatorEngine.tourSpeed}x</span>
      </button>

      <!-- Replay Button -->
      <button
        type="button"
        onclick={() => operatorEngine.replay()}
        class="px-2 py-0.5 bg-[#0F1015] border border-[#1F222E] text-slate-300 hover:text-[#00E5FF] flex items-center gap-1 transition-colors cursor-pointer"
        title="Replay entire layer assembly from top"
      >
        <RotateCcw class="w-2.5 h-2.5" />
        <span class="hidden md:inline">Replay</span>
      </button>

      {#if operatorEngine.isSwarmVortex}
        <span class="text-slate-400 pl-1 border-l border-[#1A1C23] hidden lg:inline animate-fade-in">
          Rebuilt by 28 agents in 48.6s
        </span>
      {/if}
    </div>

  </div>
</div>
