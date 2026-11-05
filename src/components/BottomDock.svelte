<script>
  import { onMount } from "svelte";
  import { Volume2, VolumeX, Play, RotateCcw, Activity } from "lucide-svelte";
  import { sound } from "../utils/sound.js";

  let scrollProgress = $state(0);
  let isMuted = $state(false);
  let layerCount = $derived(Math.min(252, Math.max(18, Math.round(18 + scrollProgress * 234))));
  let agentCount = $derived(Math.min(28, Math.max(16, Math.round(16 + scrollProgress * 12))));

  function toggleSound() {
    isMuted = sound.toggleMute();
  }

  function replayTop() {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  onMount(() => {
    isMuted = sound.getMuted();

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = docHeight > 0 ? window.scrollY / docHeight : 0;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<!-- BOTTOM TELEMETRY DOCK (Cyber-Operator Assembly HUD) -->
<div class="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-[999] max-w-[94vw] sm:max-w-none select-none">
  <div class="bg-[#050608]/90 backdrop-blur-md border border-[#1f212a] px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.9)] text-xs font-mono text-slate-300">
    
    <!-- Multi-Agent Swarm Status Indicator -->
    <div class="flex items-center gap-2 pr-2 sm:pr-3 border-r border-[#1a1b24]">
      <!-- Agent Color Avatars -->
      <div class="flex items-center -space-x-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-[#FF2A2A] border border-black animate-pulse"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-[#00E5FF] border border-black"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-[#00FF66] border border-black"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-[#FFD600] border border-black"></span>
      </div>
      <span class="text-[11px] font-bold text-white whitespace-nowrap">
        {agentCount} <span class="text-slate-400 font-normal hidden sm:inline">agents</span>
      </span>
    </div>

    <!-- Assembly Layer Counter & Progress -->
    <div class="flex items-center gap-2 sm:gap-3">
      <div class="text-[10px] sm:text-[11px] whitespace-nowrap">
        <span class="text-cyan-400 font-bold">{layerCount}</span>
        <span class="text-slate-500">/ 252 layers</span>
      </div>

      <!-- Mini glowing progress line -->
      <div class="w-16 sm:w-28 h-1 bg-[#14151c] overflow-hidden rounded-none relative hidden xs:block">
        <div
          class="h-full bg-gradient-to-r from-[#00E5FF] via-[#FF2A2A] to-[#00FF66] transition-all duration-150"
          style="width: {(layerCount / 252) * 100}%; box-shadow: 0 0 8px #FF2A2A;"
        ></div>
      </div>
    </div>

    <!-- Active Tour / Mode Chip -->
    <div class="hidden md:flex items-center gap-1.5 px-2 py-0.5 bg-[#0e1017] border border-[#222533] text-[10px] text-emerald-400">
      <Activity class="w-3 h-3 text-emerald-400 animate-spin" />
      <span>AUTONOMOUS SWARM</span>
    </div>

    <!-- Actions: Replay & Sound -->
    <div class="flex items-center gap-1 pl-1 sm:pl-2 border-l border-[#1a1b24]">
      <button
        type="button"
        onclick={replayTop}
        class="p-1.5 text-slate-400 hover:text-white hover:bg-[#161824] transition-colors cursor-pointer"
        title="Scroll to Top / Replay"
        aria-label="Replay to Top"
      >
        <RotateCcw class="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onclick={toggleSound}
        class="p-1.5 text-slate-400 hover:text-white hover:bg-[#161824] transition-colors cursor-pointer"
        title={isMuted ? "Unmute Audio" : "Mute Audio"}
        aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
      >
        {#if isMuted}
          <VolumeX class="w-3.5 h-3.5 text-red-400" />
        {:else}
          <Volume2 class="w-3.5 h-3.5 text-cyan-400" />
        {/if}
      </button>
    </div>

  </div>
</div>
