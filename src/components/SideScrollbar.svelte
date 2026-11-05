<script>
  import { onMount } from "svelte";
  import {
    ChevronUp,
    ChevronDown,
    Home,
    User,
    Sparkles,
    FolderGit2,
    GraduationCap,
    Mail
  } from "lucide-svelte";
  import { sound } from "../utils/sound.js";

  const sections = [
    { id: "home", name: "HOME", slot: 1, icon: Home, color: "#FF2A2A", label: "Core Node" },
    { id: "about", name: "ABOUT", slot: 2, icon: User, color: "#00E5FF", label: "Philosophy & Bio" },
    { id: "projects", name: "FLAGSHIPS", slot: 3, icon: FolderGit2, color: "#FF2A2A", label: "Deployments" },
    { id: "skills", name: "MATRIX", slot: 4, icon: Sparkles, color: "#00FF66", label: "Systems Matrix" },
    { id: "experience", name: "TIMELINE", slot: 5, icon: GraduationCap, color: "#FFD600", label: "MCA & Credentials" },
    { id: "contact", name: "CONNECT", slot: 6, icon: Mail, color: "#FF2A2A", label: "Dispatch Terminal" },
  ];

  let scrollPercent = $state(0);
  let activeSection = $state("home");
  let hoveredSection = $state(null);
  let isDragging = $state(false);
  let trackRef = $state(null);

  function updateScroll() {
    if (typeof window === "undefined") return;
    
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
    scrollPercent = percent;

    const scrollPos = scrollTop + 160;
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
      // Ignored
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

<!-- CYBER-OPERATOR SIDE ELEVATOR SCROLLBAR -->
<aside
  class="fixed right-2.5 sm:right-3.5 top-1/2 -translate-y-1/2 z-[9980] hidden lg:flex flex-col items-center select-none"
  aria-label="Navigation Elevator"
>
  <div class="p-1 bg-[#06070a]/90 backdrop-blur-md border border-[#1b1c28] flex flex-col items-center gap-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
    
    <!-- Top Stepper -->
    <button
      type="button"
      onclick={scrollToTop}
      class="w-6 h-6 bg-[#0c0e14] hover:bg-[#1a1c26] text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer group relative"
      title="Scroll to Top"
      aria-label="Scroll to top"
    >
      <ChevronUp class="w-3.5 h-3.5" />
    </button>

    <!-- Vertical Rail Track -->
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
      class="w-4 h-56 bg-[#040507] border border-[#14151c] relative cursor-pointer flex flex-col items-center justify-between py-1 group/track hover:border-[#FF2A2A]/60 transition-colors"
      title="Drag to scroll page"
    >
      <!-- Center Laser Line -->
      <div class="absolute top-1 bottom-1 w-[1px] bg-[#1a1c28] pointer-events-none"></div>

      <!-- Glowing Red Fill -->
      <div
        class="absolute top-1 w-[2px] bg-gradient-to-b from-[#00E5FF] to-[#FF2A2A] pointer-events-none transition-all duration-75 shadow-[0_0_8px_#FF2A2A]"
        style="height: calc({scrollPercent}% - 6px);"
      ></div>

      <!-- Section Waypoint Dots -->
      {#each sections as sec}
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
          class="relative z-10 w-2.5 h-2.5 flex items-center justify-center cursor-pointer p-0 bg-transparent border-none transition-transform hover:scale-125 focus:outline-none"
          title={`${sec.name} - ${sec.label}`}
          aria-label={`Navigate to ${sec.name}`}
        >
          <div
            class="w-1.5 h-1.5 transition-all duration-150 {isActive
              ? 'scale-150 shadow-[0_0_8px_currentColor]'
              : 'bg-[#222533] hover:bg-slate-300'}"
            style={isActive ? `background-color: ${sec.color}; color: ${sec.color};` : ""}
          ></div>

          {#if isHovered}
            <div
              class="absolute right-6 px-2 py-1 bg-[#090b10] border border-[#232536] flex items-center gap-1.5 pointer-events-none whitespace-nowrap shadow-[0_0_12px_rgba(0,0,0,0.9)] z-50 text-[10px] font-mono text-white"
            >
              <SecIcon class="w-3 h-3 text-cyan-400" />
              <span>{sec.name}</span>
            </div>
          {/if}
        </button>
      {/each}

      <!-- Slider Thumb Carriage -->
      <div
        class="absolute left-1/2 -translate-x-1/2 w-3.5 h-2.5 bg-[#FF2A2A] pointer-events-none shadow-[0_0_8px_#FF2A2A]"
        style="top: calc({scrollPercent}% * (100% - 10px) / 100);"
      ></div>
    </div>

    <!-- Bottom Stepper -->
    <button
      type="button"
      onclick={scrollToBottom}
      class="w-6 h-6 bg-[#0c0e14] hover:bg-[#1a1c26] text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer group relative"
      title="Scroll to Bottom"
      aria-label="Scroll to bottom"
    >
      <ChevronDown class="w-3.5 h-3.5" />
    </button>

    <div class="text-[8px] font-mono text-slate-500 text-center">
      {Math.round(scrollPercent)}%
    </div>

  </div>
</aside>
