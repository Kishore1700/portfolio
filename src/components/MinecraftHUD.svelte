<script>
  import { onMount } from "svelte";
  import {
    Heart,
    Utensils,
    Volume2,
    VolumeX,
    FileText,
    Terminal,
    Sparkles,
    Shield,
    X,
    HelpCircle,
    Info,
    Settings,
    Award
  } from "lucide-svelte";
  import resumeUrl from "../../Kishore_Resume.pdf";
  import { sound } from "../utils/sound.js";

  // Navigation Hotbar items (9 slots)
  const hotbarSlots = [
    { slot: 1, id: "home", name: "Grass Block (Home)", icon: "🌱", key: "1" },
    { slot: 2, id: "about", name: "Book & Quill (About Me)", icon: "📖", key: "2" },
    { slot: 3, id: "skills", name: "Diamond Sword (Skills)", icon: "⚔️", key: "3" },
    { slot: 4, id: "projects", name: "Nether Star (Projects)", icon: "⭐", key: "4" },
    { slot: 5, id: "internship", name: "Redstone Clock (Internship)", icon: "⚙️", key: "5" },
    { slot: 6, id: "education", name: "Enchanted Scroll (Education)", icon: "📜", key: "6" },
    { slot: 7, id: "certifications", name: "Golden Trophy (Certificates)", icon: "🏆", key: "7" },
    { slot: 8, id: "resume", name: "Explorer Map (Resume PDF)", icon: "🗺️", key: "8", isDownload: true },
    { slot: 9, id: "audio", name: "Note Block (Audio SFX)", icon: "🎵", key: "9", isAudioToggle: true }
  ];

  let activeSlot = $state(1);
  let activeItemName = $state("Grass Block (Home)");
  let showItemName = $state(false);
  let itemNameTimer = null;

  // Health and Hunger
  let hearts = $state(10);
  let hunger = $state(10);
  let isMuted = $state(sound.getMuted());

  // F3 Debug Screen
  let showF3 = $state(false);

  // ESC Pause Menu
  let isGamePaused = $state(false);
  let showStatsModal = $state(false);

  // In-Game Chat System
  let isChatOpen = $state(false);
  let chatInput = $state("");
  let chatMessages = $state([
    { sender: "Server", text: "Kishore P M joined the world [Production]", color: "#FFFF55" },
    { sender: "Server", text: "Press keys 1-9 to switch hotbar slots", color: "#55FF55" },
    { sender: "Kishore", text: "Welcome to my portfolio! Explore around.", color: "#55FFFF" },
    { sender: "Tip", text: "Press F3 for debug coordinates or ESC for game menu", color: "#FFAA00" }
  ]);

  function triggerItemTooltip(name) {
    activeItemName = name;
    showItemName = true;
    if (itemNameTimer) clearTimeout(itemNameTimer);
    itemNameTimer = setTimeout(() => {
      showItemName = false;
    }, 2200);
  }

  function selectSlot(slotNum) {
    const item = hotbarSlots.find((s) => s.slot === slotNum);
    if (!item) return;

    activeSlot = slotNum;
    triggerItemTooltip(item.name);
    sound.playClick();

    if (item.isDownload) {
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.download = "Kishore_Resume.pdf";
      link.click();
      return;
    }

    if (item.isAudioToggle) {
      isMuted = sound.toggleMute();
      triggerItemTooltip(isMuted ? "Note Block (SFX: MUTED)" : "Note Block (SFX: ACTIVE)");
      return;
    }

    const targetEl = document.getElementById(item.id);
    if (targetEl) {
      const offset = 80;
      const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  }

  function handleKeyDown(e) {
    // If user is typing in chat input or any form input, don't trigger hotbar numbers
    const tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA") {
      if (e.key === "Escape" && isChatOpen) {
        isChatOpen = false;
      }
      return;
    }

    // Hotbar keys 1-9
    if (e.key >= "1" && e.key <= "9") {
      e.preventDefault();
      selectSlot(parseInt(e.key, 10));
      return;
    }

    // F3 Debug
    if (e.key === "F3" || (e.key === "d" && (e.ctrlKey || e.altKey))) {
      e.preventDefault();
      showF3 = !showF3;
      sound.playClick();
      return;
    }

    // T or Enter to open Chat
    if (e.key === "t" || e.key === "T" || e.key === "/") {
      e.preventDefault();
      isChatOpen = true;
      if (e.key === "/") chatInput = "/";
      return;
    }

    // ESC to open/close game pause menu
    if (e.key === "Escape") {
      if (isChatOpen) {
        isChatOpen = false;
        return;
      }
      if (showStatsModal) {
        showStatsModal = false;
        return;
      }
      isGamePaused = !isGamePaused;
      sound.playClick();
    }
  }

  function handleHeartClick() {
    sound.playPop();
    hearts = hearts <= 1 ? 10 : hearts - 1;
    if (hearts === 10) sound.playLevelUp();
  }

  function handleHungerClick() {
    sound.playEat();
    hunger = hunger <= 1 ? 10 : hunger - 1;
  }

  function sendChatMessage() {
    const raw = chatInput.trim();
    if (!raw) return;

    sound.playClick();
    chatMessages.push({ sender: "Player", text: raw, color: "#FFFFFF" });

    const lower = raw.toLowerCase();
    if (lower === "/help") {
      chatMessages.push({ sender: "Server", text: "Commands: /skills, /projects, /resume, /clear, /time set day, /biome", color: "#55FF55" });
    } else if (lower.startsWith("/skills")) {
      selectSlot(3);
      chatMessages.push({ sender: "Server", text: "Navigated to Skills enchantment room", color: "#55FFFF" });
    } else if (lower.startsWith("/projects")) {
      selectSlot(4);
      chatMessages.push({ sender: "Server", text: "Navigated to Projects forge", color: "#55FFFF" });
    } else if (lower.startsWith("/resume")) {
      selectSlot(8);
      chatMessages.push({ sender: "Server", text: "Crafted Kishore's Resume (PDF)", color: "#FFFF55" });
    } else if (lower.startsWith("/clear")) {
      chatMessages = [];
    } else if (lower.startsWith("/time set")) {
      chatMessages.push({ sender: "Server", text: "Set time to 1000 (Daylight Overworld)", color: "#FFFF55" });
    } else {
      setTimeout(() => {
        chatMessages.push({ sender: "Kishore Bot", text: `Got your signal: "${raw}"! Welcome to my craft!`, color: "#55FF55" });
      }, 400);
    }

    chatInput = "";
    if (chatMessages.length > 20) {
      chatMessages = chatMessages.slice(-20);
    }
  }

  onMount(() => {
    // Dynamic active slot based on scroll position
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const item of hotbarSlots) {
        if (item.isDownload || item.isAudioToggle) continue;
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            if (activeSlot !== item.slot) {
              activeSlot = item.slot;
              triggerItemTooltip(item.name);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      if (itemNameTimer) clearTimeout(itemNameTimer);
    };
  });
</script>

<!-- ========================================== -->
<!-- 1. AUTHENTIC MINECRAFT F3 DEBUG SCREEN -->
<!-- ========================================== -->
{#if showF3}
  <div class="fixed inset-0 z-[10001] pointer-events-none p-3 sm:p-5 font-mono text-[10px] sm:text-xs leading-relaxed select-none text-white drop-shadow-[1px_1px_0_#000000]">
    <div class="flex justify-between items-start">
      
      <!-- Left Debug Column -->
      <div class="bg-black/60 p-2 border border-black/80 max-w-sm">
        <p class="text-[#FFFF55] font-bold">Minecraft 1.21.4 (Java Edition - Portfolio Custom Build)</p>
        <p>60 fps, T: 60, B: 0</p>
        <p class="text-[#55FF55]">XYZ: 1700.450 / 64.000 / -42.820</p>
        <p>Block: 1700 64 -43 [12, 0, 5]</p>
        <p>Chunk: 14 4 2 in 106 0 -3</p>
        <p class="text-[#55FFFF]">Facing: south (Towards Production)</p>
        <p>Client Light: 15 (15 sky, 0 block)</p>
        <p class="text-[#FFAA00]">Biome: minecraft:overworld_night</p>
        <p>Difficulty: Hardcore Fullstack Developer</p>
      </div>

      <!-- Right Debug Column -->
      <div class="bg-black/60 p-2 border border-black/80 max-w-sm text-right hidden sm:block">
        <p class="text-[#55FF55]">Node.js 24.16.0 64bit</p>
        <p>Mem: 48% 384/800MB</p>
        <p>Allocated: 100% 800MB</p>
        <p class="text-[#55FFFF]">Display: 1920x1080 (OLED Optimized)</p>
        <p>Engine: Svelte 5 (Runes) + Tailwind v4</p>
        <p>Renderer: WebGL 3D Voxel Engine</p>
        <p class="text-[#FFFF55]">Selected Slot: [{activeSlot}] {activeItemName}</p>
        <p class="text-slate-400 mt-1">[Press F3 to close debug view]</p>
      </div>

    </div>
  </div>
{/if}

<!-- ========================================== -->
<!-- 2. GAME HUD: TOP STATUS & BUTTON BAR -->
<!-- ========================================== -->
<div class="fixed top-2 left-2 z-[9999] flex items-center gap-2 select-none">
  <!-- F3 Toggle Pill -->
  <button
    type="button"
    onclick={() => { sound.playClick(); showF3 = !showF3; }}
    class="mc-slot px-2 py-1 text-[9px] font-pixel transition-all cursor-pointer {showF3 ? 'bg-[#55FF55] text-black font-bold' : 'bg-[#000000]/90 text-slate-300 hover:text-white'}"
    title="Toggle Minecraft F3 Debug Screen"
  >
    F3 DEBUG
  </button>

  <!-- Chat Toggle Pill -->
  <button
    type="button"
    onclick={() => { sound.playClick(); isChatOpen = !isChatOpen; }}
    class="mc-slot px-2 py-1 text-[9px] font-pixel transition-all cursor-pointer {isChatOpen ? 'bg-[#55FFFF] text-black font-bold' : 'bg-[#000000]/90 text-slate-300 hover:text-white'}"
    title="Toggle In-Game Chat (Key: T)"
  >
    CHAT [T]
  </button>
</div>

<div class="fixed top-2 right-2 z-[9999] flex items-center gap-2 select-none">
  <!-- Pause Game Menu Button -->
  <button
    type="button"
    onclick={() => { sound.playClick(); isGamePaused = true; }}
    class="mc-button px-2.5 py-1 text-[9px] font-pixel text-[#FFFF55] flex items-center gap-1 cursor-pointer"
    title="Open Minecraft Pause Menu (ESC)"
  >
    <span>[ESC] MENU</span>
  </button>
</div>

<!-- ========================================== -->
<!-- 3. AUTHENTIC IN-GAME CHAT LOG (Bottom-Left) -->
<!-- ========================================== -->
{#if isChatOpen}
  <div class="fixed bottom-20 left-4 z-[9999] w-80 sm:w-96 flex flex-col justify-end select-none">
    <div class="mc-container p-3 bg-black/85 border-2 border-black max-h-56 overflow-y-auto space-y-1.5 font-mono text-[11px] no-scrollbar">
      {#each chatMessages as msg}
        <div>
          <span style="color: {msg.color};" class="font-bold">&lt;{msg.sender}&gt;</span>
          <span class="text-white ml-1">{msg.text}</span>
        </div>
      {/each}
    </div>

    <!-- Chat Prompt Input -->
    <form
      onsubmit={(e) => { e.preventDefault(); sendChatMessage(); }}
      class="mt-1 flex items-center gap-1"
    >
      <input
        type="text"
        bind:value={chatInput}
        placeholder="Type command (/help, /skills) or message..."
        class="w-full px-2.5 py-1.5 mc-slot bg-black/95 text-white font-mono text-xs focus:border-[#55FF55] focus:outline-none"
      />
      <button
        type="submit"
        class="mc-button px-3 py-1.5 text-[9px] text-[#55FF55]"
      >
        SEND
      </button>
    </form>
  </div>
{/if}

<!-- ========================================== -->
<!-- 4. FLOATING ITEM NAME BANNER (Above Hotbar) -->
<!-- ========================================== -->
{#if showItemName}
  <div class="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9998] pointer-events-none transition-opacity duration-300 animate-fade-in">
    <div class="mc-slot px-3 py-1 bg-black/90 text-center border-2 border-black/80 shadow-2xl">
      <span class="font-pixel text-[11px] text-[#FFFF55] mc-text-shadow-gold">
        {activeItemName}
      </span>
    </div>
  </div>
{/if}

<!-- ========================================== -->
<!-- 5. ICONIC MINECRAFT 9-SLOT BOTTOM HUD -->
<!-- ========================================== -->
<div class="fixed bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-[9998] flex flex-col items-center select-none pointer-events-auto">
  
  <!-- Health, Hunger, and XP Level Meters -->
  <div class="w-full max-w-[340px] sm:max-w-[420px] px-1 mb-1 flex items-center justify-between text-xs">
    
    <!-- 10 Red Hearts (Health) -->
    <div
      class="flex items-center gap-0.5 cursor-pointer"
      onclick={handleHeartClick}
      title="Click hearts to test damage / health regeneration!"
      role="button"
      tabindex="0"
      onkeydown={(e) => { if (e.key === 'Enter') handleHeartClick(); }}
    >
      {#each Array(10) as _, i}
        <Heart
          class="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform hover:scale-125 {i < hearts ? 'fill-[#FF2222] text-[#660000] drop-shadow-[0_0_4px_#FF2222]' : 'fill-[#222222] text-[#000000]'}"
        />
      {/each}
    </div>

    <!-- Center Green XP Level (e.g. 99) -->
    <div class="font-pixel text-xs sm:text-sm text-[#55FF55] font-bold mc-text-shadow-green px-1">
      99
    </div>

    <!-- 10 Hunger Points (Drumsticks) -->
    <div
      class="flex items-center gap-0.5 cursor-pointer"
      onclick={handleHungerClick}
      title="Click drumsticks to eat food!"
      role="button"
      tabindex="0"
      onkeydown={(e) => { if (e.key === 'Enter') handleHungerClick(); }}
    >
      {#each Array(10) as _, i}
        <Utensils
          class="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform hover:scale-125 {i < hunger ? 'text-[#FF9900] drop-shadow-[0_0_4px_#FF9900]' : 'text-[#333333]'}"
        />
      {/each}
    </div>

  </div>

  <!-- Segmented Experience Bar -->
  <div class="w-full max-w-[340px] sm:max-w-[420px] h-2 bg-black border border-black mb-1.5 overflow-hidden mc-slot">
    <div class="h-full bg-gradient-to-r from-[#55FF55] via-[#80FF00] to-[#55FF55] w-[95%] shadow-[0_0_8px_#55FF55]"></div>
  </div>

  <!-- 9-Slot Hotbar Frame -->
  <div class="flex items-center bg-[#000000]/95 p-1 mc-hud-box border-4 border-black shadow-[0_10px_30px_rgba(0,0,0,1)]">
    {#each hotbarSlots as item}
      {@const isSelected = activeSlot === item.slot}
      <button
        type="button"
        onclick={() => selectSlot(item.slot)}
        class="relative w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center cursor-pointer transition-transform {isSelected
          ? 'mc-hud-active-slot scale-110 z-10'
          : 'mc-hud-slot hover:bg-[#1c1e28]'}"
        title="[Key {item.key}] {item.name}"
      >
        <!-- Slot Number in top-left -->
        <span class="absolute top-0.5 left-1 text-[8px] sm:text-[9px] font-mono text-slate-400 select-none">
          {item.key}
        </span>

        <!-- Slot Pixel Icon -->
        <span class="text-base sm:text-lg select-none">
          {item.icon}
        </span>

        <!-- Active selector highlight glow -->
        {#if isSelected}
          <div class="absolute inset-0 border-2 border-[#55FF55] pointer-events-none shadow-[inset_0_0_6px_rgba(85,255,85,0.4)]"></div>
        {/if}
      </button>
    {/each}
  </div>

</div>

<!-- ========================================== -->
<!-- 6. AUTHENTIC MINECRAFT PAUSE MENU (ESC) -->
<!-- ========================================== -->
{#if isGamePaused}
  <div class="fixed inset-0 z-[10002] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in select-none">
    
    <div class="max-w-md w-full mc-container p-6 sm:p-8 bg-[#0c0d12] border-4 border-black text-center shadow-2xl space-y-4">
      
      <!-- Pause Title -->
      <h2 class="font-pixel text-xl sm:text-2xl text-white mc-text-shadow mb-6">
        GAME PAUSED
      </h2>

      <!-- Pause Menu Buttons -->
      <div class="space-y-3">
        
        <!-- Back to Game -->
        <button
          type="button"
          onclick={() => { sound.playClick(); isGamePaused = false; }}
          class="w-full mc-button py-3 text-xs sm:text-sm text-white hover:text-[#FFFF55] cursor-pointer"
        >
          BACK TO GAME
        </button>

        <!-- Advancements -->
        <button
          type="button"
          onclick={() => {
            sound.playClick();
            isGamePaused = false;
            selectSlot(2);
          }}
          class="w-full mc-button py-3 text-xs sm:text-sm text-white hover:text-[#FFFF55] cursor-pointer flex items-center justify-center gap-2"
        >
          <Award class="w-4 h-4 text-[#FFFF55]" />
          <span>ADVANCEMENTS & LORE</span>
        </button>

        <!-- Statistics -->
        <button
          type="button"
          onclick={() => { sound.playClick(); showStatsModal = true; }}
          class="w-full mc-button py-3 text-xs sm:text-sm text-white hover:text-[#FFFF55] cursor-pointer flex items-center justify-center gap-2"
        >
          <Info class="w-4 h-4 text-[#55FFFF]" />
          <span>STATISTICS</span>
        </button>

        <!-- Download Resume -->
        <a
          href={resumeUrl}
          download="Kishore_Resume.pdf"
          onclick={() => sound.playClick()}
          class="w-full mc-button mc-button-gold py-3 text-xs sm:text-sm text-[#FFFF55] flex items-center justify-center gap-2 cursor-pointer"
        >
          <FileText class="w-4 h-4 text-[#55FFFF]" />
          <span>SAVE & CRAFT RESUME (.PDF)</span>
        </a>

        <!-- Audio Toggle -->
        <button
          type="button"
          onclick={() => {
            isMuted = sound.toggleMute();
          }}
          class="w-full mc-slot py-2.5 text-xs font-pixel text-slate-300 hover:text-white flex items-center justify-center gap-2 cursor-pointer"
        >
          {#if isMuted}
            <VolumeX class="w-4 h-4 text-[#FF5555]" />
            <span>SOUND FX: OFF</span>
          {:else}
            <Volume2 class="w-4 h-4 text-[#55FF55]" />
            <span>SOUND FX: ON</span>
          {/if}
        </button>

      </div>

    </div>

  </div>
{/if}

<!-- ========================================== -->
<!-- 7. STATISTICS MODAL -->
<!-- ========================================== -->
{#if showStatsModal}
  <div class="fixed inset-0 z-[10003] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
    <div class="max-w-lg w-full mc-container p-6 bg-[#0c0d12] border-4 border-black relative">
      <button
        type="button"
        onclick={() => { sound.playClick(); showStatsModal = false; }}
        class="absolute top-4 right-4 mc-button p-1 text-[#FF5555]"
      >
        <X class="w-4 h-4" />
      </button>

      <h3 class="font-pixel text-base text-[#FFFF55] mc-text-shadow-gold mb-4 text-center">
        WORLD STATISTICS
      </h3>

      <div class="space-y-2 font-mono text-xs text-slate-300 mc-slot p-4 bg-black/80 max-h-72 overflow-y-auto">
        <div class="flex justify-between py-1 border-b border-white/10">
          <span>Times Opened World:</span>
          <span class="text-[#55FF55] font-bold">17 times</span>
        </div>
        <div class="flex justify-between py-1 border-b border-white/10">
          <span>Lines of Code Crafted:</span>
          <span class="text-[#55FFFF] font-bold">45,000+</span>
        </div>
        <div class="flex justify-between py-1 border-b border-white/10">
          <span>Fullstack Projects Deployed:</span>
          <span class="text-[#FFFF55] font-bold">12 Quests</span>
        </div>
        <div class="flex justify-between py-1 border-b border-white/10">
          <span>Coffee Cups Consumed:</span>
          <span class="text-[#FFAA00] font-bold">342 ☕</span>
        </div>
        <div class="flex justify-between py-1 border-b border-white/10">
          <span>Bugs Smashed with Sword:</span>
          <span class="text-[#FF5555] font-bold">99.8%</span>
        </div>
        <div class="flex justify-between py-1 border-b border-white/10">
          <span>Degree Progress:</span>
          <span class="text-[#55FF55] font-bold">MCA Master Level</span>
        </div>
      </div>

      <button
        type="button"
        onclick={() => { sound.playClick(); showStatsModal = false; }}
        class="w-full mc-button py-2.5 mt-4 text-xs text-white"
      >
        DONE
      </button>
    </div>
  </div>
{/if}

<style>
  .mc-hud-box {
    box-shadow: 
      inset -3px -3px 0px 0px #08090d, 
      inset 3px 3px 0px 0px #222530, 
      0 0 0 3px #000000;
  }

  .mc-hud-slot {
    background-color: #06070a;
    box-shadow: 
      inset 2px 2px 0px 0px #000000, 
      inset -2px -2px 0px 0px #1a1c26, 
      0 0 0 1px #000000;
    margin: 1px;
  }

  .mc-hud-active-slot {
    background-color: #12141c;
    box-shadow: 
      inset 3px 3px 0px 0px #ffffff, 
      inset -3px -3px 0px 0px #555555, 
      0 0 0 2px #000000;
    margin: 1px;
  }
</style>
