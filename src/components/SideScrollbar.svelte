<script>
  import { onMount } from "svelte";
  import {
    ChevronUp,
    ChevronDown,
    Home,
    User,
    Sparkles,
    FolderGit2,
    Briefcase,
    GraduationCap,
    Award,
    Mail
  } from "lucide-svelte";
  import { sound } from "../utils/sound.js";

  // Section waypoints definition with authentic colors and icons
  const sections = [
    { id: "home", name: "HOME", slot: 1, icon: Home, color: "#55FF55", label: "Spawn Point" },
    { id: "about", name: "ABOUT", slot: 2, icon: User, color: "#55FFFF", label: "Developer Profile" },
    { id: "skills", name: "SKILLS", slot: 3, icon: Sparkles, color: "#FFFF55", label: "Inventory Chest" },
    { id: "projects", name: "PROJECTS", slot: 4, icon: FolderGit2, color: "#FF5555", label: "Redstone Forge" },
    { id: "internship", name: "INTERNSHIP", slot: 5, icon: Briefcase, color: "#AA00AA", label: "Experience" },
    { id: "education", name: "EDUCATION", slot: 6, icon: GraduationCap, color: "#55FFFF", label: "Academic Records" },
    { id: "certifications", name: "CERTS", slot: 7, icon: Award, color: "#FFFF55", label: "Trophy Room" },
    { id: "contact", name: "CONTACT", slot: 8, icon: Mail, color: "#55FF55", label: "Send Message" },
  ];

  let scrollPercent = $state(0);
  let activeSection = $state("home");
  let hoveredSection = $state(null);
  let isDragging = $state(false);
  let trackRef = $state(null);
  let showCoords = $state(false);

  // Minecraft altitude computation: Y = 320 (sky/spawn) down to Y = -64 (bedrock)
  let yLevel = $derived(Math.round(320 - (scrollPercent / 100) * 384));

  function updateScroll() {
    if (typeof window === "undefined") return;
    
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
    scrollPercent = percent;

    // Detect active section
    const scrollPos = scrollTop + 140;
    let current = "home";

    for (const sec of sections) {
      const el = document.getElementById(sec.id);
      if (el) {
        const top = el.offsetTop;
        if (top <= scrollPos) {
          current = sec.id;
        }
      }
    }
    activeSection = current;
  }

  function scrollToSection(id) {
    sound.playClick();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      activeSection = id;
    }
  }

  function scrollToTop() {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function scrollToBottom() {
    sound.playClick();
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  }

  // Interactive track click & drag handling
  function handleTrackPointerDown(e) {
    if (!trackRef) return;
    isDragging = true;
    trackRef.setPointerCapture(e.pointerId);
    handleTrackDrag(e);
  }

  function handleTrackPointerMove(e) {
    if (!isDragging) return;
    handleTrackDrag(e);
  }

  function handleTrackPointerUp(e) {
    if (!isDragging) return;
    isDragging = false;
    try {
      trackRef.releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if pointer was already released
    }
  }

  function handleTrackDrag(e) {
    if (!trackRef) return;
    const rect = trackRef.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const boundedY = Math.max(0, Math.min(rect.height, offsetY));
    const ratio = rect.height > 0 ? boundedY / rect.height : 0;
    
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScrollY = ratio * docHeight;

    window.scrollTo({
      top: targetScrollY,
      behavior: isDragging ? "auto" : "smooth"
    });
  }

  onMount(() => {
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  });
</script>

<!-- FLOATING INTERACTIVE MINECRAFT SIDE SCROLLBAR -->
<aside
  class="fixed right-2.5 sm:right-3.5 top-1/2 -translate-y-1/2 z-[9990] hidden md:flex flex-col items-center select-none"
  aria-label="Interactive Page Scrollbar and Waypoints"
>
  <!-- HUD Outer Bezel -->
  <div class="mc-container p-1 sm:p-1.5 bg-[#07080c]/90 backdrop-blur-md border-2 border-black flex flex-col items-center gap-1.5 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
    
    <!-- Top Stepper Button: Up to Spawn -->
    <button
      type="button"
      onclick={scrollToTop}
      class="w-7 h-7 mc-slot bg-[#12141c] hover:bg-[#1f2230] hover:border-[#55FF55] text-slate-400 hover:text-[#55FF55] flex items-center justify-center transition-all cursor-pointer group relative"
      title="Scroll to Top [Spawn]"
      aria-label="Scroll to top"
    >
      <ChevronUp class="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
      
      <!-- Hover Tooltip -->
      <span class="absolute right-9 px-2 py-1 bg-[#0c0d12] border border-black font-pixel text-[9px] text-[#55FF55] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-[0_0_10px_rgba(0,0,0,0.8)]">
        ▲ SPAWN POINT
      </span>
    </button>

    <!-- Altitude / Depth Coordinate Pill (Toggleable or Hover) -->
    <div
      role="region"
      class="px-1.5 py-0.5 bg-[#000000] border border-black/80 font-pixel text-[8px] text-[#FFFF55] tracking-tighter text-center cursor-default hover:text-[#55FF55] transition-colors"
      title="Minecraft World Altitude Coordinate (Build limit 320 to Bedrock -64)"
      onmouseenter={() => (showCoords = true)}
      onmouseleave={() => (showCoords = false)}
    >
      Y:{yLevel}
    </div>

    <!-- Vertical Interactive Rail Track -->
    <div
      role="scrollbar"
      aria-controls="main-content"
      aria-valuenow={Math.round(scrollPercent)}
      aria-valuemin="0"
      aria-valuemax="100"
      tabindex="0"
      bind:this={trackRef}
      onpointerdown={handleTrackPointerDown}
      onpointermove={handleTrackPointerMove}
      onpointerup={handleTrackPointerUp}
      onpointercancel={handleTrackPointerUp}
      class="w-5 h-56 sm:h-64 mc-slot bg-[#040507] relative cursor-pointer flex flex-col items-center justify-between py-1 group/track hover:border-[#55FF55]/60 transition-colors"
      title="Click or drag to scroll page"
    >
      <!-- Background Guide Line -->
      <div class="absolute top-1 bottom-1 w-[2px] bg-[#14161f] pointer-events-none"></div>

      <!-- Glowing Fill Progress Line (Redstone / Emerald Rail) -->
      <div
        class="absolute top-1 w-[2px] bg-gradient-to-b from-[#55FFFF] via-[#55FF55] to-[#FFFF55] pointer-events-none transition-all duration-75 shadow-[0_0_8px_#55FF55]"
        style="height: calc({scrollPercent}% - 8px);"
      ></div>

      <!-- Section Waypoints Dots Along the Rail -->
      {#each sections as sec, i}
        {@const isActive = activeSection === sec.id}
        {@const isHovered = hoveredSection === sec.id}
        {@const SecIcon = sec.icon}

        <button
          type="button"
          onclick={(e) => {
            e.stopPropagation();
            scrollToSection(sec.id);
          }}
          onmouseenter={() => (hoveredSection = sec.id)}
          onmouseleave={() => (hoveredSection = null)}
          class="relative z-10 w-3 h-3 flex items-center justify-center cursor-pointer p-0 bg-transparent border-none transition-transform hover:scale-125 focus:outline-none"
          title={`[Slot ${sec.slot}] ${sec.name} - ${sec.label}`}
          aria-label={`Navigate to ${sec.name}`}
        >
          <!-- Pixel Waypoint Dot -->
          <div
            class="w-2 h-2 border border-black transition-all duration-150 {isActive
              ? 'scale-125 shadow-[0_0_8px_currentColor]'
              : 'bg-[#181a24] hover:bg-slate-300'}"
            style={isActive ? `background-color: ${sec.color}; color: ${sec.color}; border-color: #000;` : ""}
          ></div>

          <!-- Waypoint Tooltip Flyout (Left) -->
          {#if isHovered}
            <div
              class="absolute right-7 px-2.5 py-1.5 bg-[#0c0d12] border-2 border-black flex items-center gap-2 pointer-events-none whitespace-nowrap shadow-[0_0_12px_rgba(0,0,0,0.9)] animate-fade-in z-50"
            >
              <div class="w-5 h-5 mc-slot bg-[#040507] flex items-center justify-center shrink-0">
                <SecIcon class="w-3 h-3" style="color: {sec.color};" />
              </div>
              <div class="text-left">
                <div class="font-pixel text-[9px] text-[#FFFF55] flex items-center gap-1.5">
                  <span class="text-[8px] text-slate-400 font-mono">[{sec.slot}]</span>
                  <span>{sec.name}</span>
                </div>
                <div class="font-silkscreen text-[8px] text-slate-300">
                  {sec.label}
                </div>
              </div>
            </div>
          {/if}
        </button>
      {/each}

      <!-- Interactive Voxel Thumb (Slider Carriage) -->
      <div
        class="absolute left-1/2 -translate-x-1/2 w-4 h-3.5 mc-slot bg-[#222530] border-2 border-black flex items-center justify-center transition-all duration-75 pointer-events-none {isDragging ? 'border-[#FFFF55] bg-[#3a3e52] scale-110 shadow-[0_0_10px_#FFFF55]' : 'group-hover/track:border-[#55FF55] group-hover/track:shadow-[0_0_8px_#55FF55]'}"
        style="top: calc({scrollPercent}% * (100% - 14px) / 100);"
      >
        <!-- Grip lines on thumb -->
        <div class="w-2 flex flex-col gap-[2px]">
          <div class="h-[1px] bg-[#55FF55]"></div>
          <div class="h-[1px] bg-slate-400"></div>
        </div>

        <!-- Coordinates Floating Tag When Dragging or Hovered -->
        {#if isDragging || showCoords}
          <div class="absolute right-6 px-1.5 py-0.5 bg-[#000000] border border-black font-pixel text-[8px] text-[#55FF55] whitespace-nowrap">
            {Math.round(scrollPercent)}% &bull; Y:{yLevel}
          </div>
        {/if}
      </div>
    </div>

    <!-- Bottom Stepper Button: Down to Contact / Bedrock -->
    <button
      type="button"
      onclick={scrollToBottom}
      class="w-7 h-7 mc-slot bg-[#12141c] hover:bg-[#1f2230] hover:border-[#55FF55] text-slate-400 hover:text-[#55FF55] flex items-center justify-center transition-all cursor-pointer group relative"
      title="Scroll to Bottom [Contact / Bedrock]"
      aria-label="Scroll to bottom"
    >
      <ChevronDown class="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
      
      <!-- Hover Tooltip -->
      <span class="absolute right-9 px-2 py-1 bg-[#0c0d12] border border-black font-pixel text-[9px] text-[#55FFFF] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-[0_0_10px_rgba(0,0,0,0.8)]">
        ▼ BEDROCK / CONTACT
      </span>
    </button>

    <!-- Percent Gauge -->
    <div class="text-[8px] font-pixel text-slate-400 text-center tracking-tighter">
      {Math.round(scrollPercent)}%
    </div>

  </div>
</aside>
