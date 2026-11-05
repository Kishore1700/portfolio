<script>
  import { buildEngine } from "../utils/buildEngine.svelte.js";

  let {
    id,
    label = "CAD // LAYER",
    class: className = "",
    children
  } = $props();

  let isTargetBuilt = $derived(buildEngine.isBuilt(id));
  let isCurrentlyBuilding = $derived(buildEngine.isBuilding(id));
</script>

<div
  {id}
  class="relative transition-all duration-300 {className} {isTargetBuilt ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}"
>
  <!-- Active CAD Wireframe Bounding Box while being placed by an Agent -->
  {#if isCurrentlyBuilding}
    <div class="absolute -inset-1 border border-[#00E5FF] bg-[#00E5FF]/10 z-30 pointer-events-none animate-pulse">
      <!-- 4 Corner Measurement Handles -->
      <div class="absolute -top-1 -left-1 w-1.5 h-1.5 bg-[#00E5FF] border border-black"></div>
      <div class="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#00E5FF] border border-black"></div>
      <div class="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-[#00E5FF] border border-black"></div>
      <div class="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-[#00E5FF] border border-black"></div>

      <!-- Live Dimension Badge as seen in Video -->
      <div class="absolute -bottom-4 left-0 font-mono-cyber text-[8px] text-[#00E5FF] bg-black px-1 border border-[#00E5FF]/60 whitespace-nowrap shadow-md">
        {buildEngine.activeTarget?.label || label}
      </div>

      <!-- Text Typing Caret Cursor (Matching Video build_004) -->
      {#if buildEngine.activeTarget?.isTyping}
        <div class="absolute -right-1 bottom-1 text-[#00E5FF] font-mono-cyber text-xs font-bold animate-ping">
          |
        </div>
      {/if}
    </div>
  {/if}

  {@render children?.()}
</div>
