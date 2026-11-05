<script>
  import { buildEngine } from "../utils/buildEngine.svelte.js";

  let {
    id,
    label = "CAD // LAYER",
    class: className = "",
    children
  } = $props();

  let isBuilt = $derived(buildEngine.isBuilt(id));
  let isBuilding = $derived(buildEngine.isBuilding(id));
  let activeTarget = $derived(buildEngine.getActiveTargetFor(id));
</script>

<div
  {id}
  class="relative transition-all duration-300 {className} {buildEngine.isScanning ? 'opacity-0 pointer-events-none' : ''}"
>
  <!-- Wireframe Blueprint Box (Shown during wireframe phase or while building) -->
  {#if (buildEngine.isWireframe && !isBuilt) || isBuilding}
    <div
      class="absolute -inset-1 border border-[#00E5FF] bg-[#00E5FF]/[0.08] z-30 pointer-events-none transition-all duration-200 {isBuilding ? 'border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'border-[#00E5FF]/50'}"
    >
      <!-- 4 Corner Measurement Handles -->
      <div class="absolute -top-1 -left-1 w-1.5 h-1.5 bg-[#00E5FF] border border-black"></div>
      <div class="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#00E5FF] border border-black"></div>
      <div class="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-[#00E5FF] border border-black"></div>
      <div class="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-[#00E5FF] border border-black"></div>

      <!-- Live Dimension Badge as seen in Video (e.g. 1021 × 336, 425 × 71) -->
      <div class="absolute -bottom-4 left-0 font-mono-cyber text-[8px] text-[#00E5FF] bg-black px-1 border border-[#00E5FF]/60 whitespace-nowrap shadow-md select-none">
        {activeTarget?.label || label}
      </div>

      <!-- Blinking Caret Indicator while Typing -->
      {#if activeTarget?.isTyping}
        <div class="absolute -right-1 bottom-1 text-[#00E5FF] font-mono-cyber text-sm font-bold animate-ping select-none">
          |
        </div>
      {/if}
    </div>
  {/if}

  <!-- Element Content -->
  <div class="{isBuilt ? 'opacity-100' : isBuilding ? 'opacity-90' : 'opacity-0'} transition-opacity duration-200">
    {@render children?.()}
  </div>
</div>
