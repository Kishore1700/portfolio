<script>
  import { onMount } from "svelte";
  import { Menu, X, FileText, Pickaxe } from "lucide-svelte";
  import resumeUrl from "../../Kishore_Resume.pdf";
  import { sound } from "../utils/sound.js";

  const navItems = [
    { name: "HOME", href: "#home", slot: 1 },
    { name: "ABOUT", href: "#about", slot: 2 },
    { name: "SKILLS", href: "#skills", slot: 3 },
    { name: "PROJECTS", href: "#projects", slot: 4 },
    { name: "INTERNSHIP", href: "#internship", slot: 5 },
    { name: "EDUCATION", href: "#education", slot: 6 },
    { name: "CERTIFICATIONS", href: "#certifications", slot: 7 },
  ];

  let isOpen = $state(false);
  let activeSection = $state("home");
  let scrolled = $state(false);

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 15;

      const scrollPos = window.scrollY + 140;
      let current = "home";

      for (const item of navItems) {
        const id = item.href.substring(1);
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (top <= scrollPos) {
            current = id;
          }
        }
      }
      activeSection = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleNavClick = (e, href) => {
    e.preventDefault();
    sound.playClick();
    const id = href.substring(1);
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
      isOpen = false;
    }
  };
</script>

<!-- The Navbar: Permanently fixed at the top across all sections and scrolling locations -->
<nav
  style="position: fixed !important; top: 0; left: 0; right: 0; z-index: 9999 !important;"
  class="bg-[#000000]/95 border-b-4 border-black shadow-[0_6px_24px_rgba(0,0,0,1)] transition-all duration-200 {scrolled
    ? 'py-2'
    : 'py-2.5 sm:py-3'}"
>
  <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-12 sm:h-14">
      
      <!-- Logo: Minecraft Title -->
      <button
        type="button"
        class="flex items-center gap-2 cursor-pointer border-none bg-transparent group shrink-0"
        onclick={() => {
          sound.playClick();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <div class="w-8 h-8 mc-slot flex items-center justify-center bg-[#0c0d12] text-[#55FF55] group-hover:scale-105 transition-transform">
          <Pickaxe class="w-4 h-4 text-[#55FF55]" />
        </div>
        <span class="font-pixel text-[11px] sm:text-xs md:text-sm text-[#FFFF55] mc-text-shadow-gold tracking-tight">
          KISHORE <span class="text-[#55FF55]">P M</span>
        </span>
      </button>

      <!-- Desktop & Tablet Minecraft Hotbar Navigation -->
      <div class="hidden md:flex items-center gap-1 lg:gap-1.5 bg-[#000000] p-1 lg:p-1.5 mc-slot border border-black">
        {#each navItems as item}
          {@const isActive = activeSection === item.href.substring(1)}
          <a
            href={item.href}
            onclick={(e) => handleNavClick(e, item.href)}
            class="relative px-2 lg:px-3 py-1.5 text-[10px] lg:text-[11px] font-silkscreen transition-all duration-150 flex items-center gap-1.5 {isActive
              ? 'mc-slot active bg-[#0e1017] text-[#55FF55] mc-text-shadow-green font-bold scale-105 z-10 shadow-[0_0_12px_#55FF55]/50'
              : 'text-slate-300 hover:text-white hover:bg-[#0c0d12]'}"
          >
            <span class="text-[9px] text-[#FFFF55]/80 font-mono">{item.slot}</span>
            <span>{item.name}</span>
          </a>
        {/each}

        <!-- Resume Button styled as Minecraft Stone Button -->
        <a
          href={resumeUrl}
          download="Kishore_Resume.pdf"
          onclick={() => sound.playClick()}
          class="mc-button text-[10px] px-2.5 lg:px-3 py-1.5 ml-1 text-[#FFFF55]"
          title="Download Kishore's Resume (PDF)"
        >
          <FileText class="w-3.5 h-3.5 mr-1 text-[#55FFFF]" />
          <span>Resume</span>
        </a>
      </div>

      <!-- Mobile Active Section Pill + Menu Toggle -->
      <div class="flex items-center gap-2 md:hidden">
        <!-- Shows active section on mobile header -->
        <span class="text-[9px] font-pixel px-2 py-1 bg-[#0c0d12] text-[#55FF55] mc-slot border border-black">
          {activeSection.toUpperCase()}
        </span>

        <button
          type="button"
          onclick={() => {
            sound.playClick();
            isOpen = !isOpen;
          }}
          class="mc-button p-2 text-slate-200 cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {#if isOpen}
            <X class="h-5 w-5" />
          {:else}
            <Menu class="h-5 w-5" />
          {/if}
        </button>
      </div>

    </div>
  </div>

  <!-- Mobile Menu Panel styled as Minecraft Inventory GUI -->
  {#if isOpen}
    <div
      class="md:hidden mc-container border-t-2 border-black mt-2 p-3 space-y-2 bg-[#0c0d12]/98 backdrop-blur-md"
    >
      <div class="grid grid-cols-2 gap-2">
        {#each navItems as item}
          {@const isActive = activeSection === item.href.substring(1)}
          <a
            href={item.href}
            onclick={(e) => handleNavClick(e, item.href)}
            class="mc-slot p-2.5 text-xs font-silkscreen flex items-center gap-2 {isActive
              ? 'bg-[#14161f] text-[#55FF55] border-2 border-[#55FF55] font-bold shadow-[0_0_10px_#55FF55]/40'
              : 'text-slate-300 hover:bg-[#0a0b0f]'}"
          >
            <span class="text-[10px] text-[#FFFF55] font-mono">[{item.slot}]</span>
            <span>{item.name}</span>
          </a>
        {/each}
      </div>

      <a
        href={resumeUrl}
        download="Kishore_Resume.pdf"
        onclick={() => sound.playClick()}
        class="mc-button w-full text-xs py-2 text-[#FFFF55] mt-2 flex items-center justify-center gap-2"
      >
        <FileText class="w-4 h-4 text-[#55FFFF]" />
        <span>Download Resume (.pdf)</span>
      </a>
    </div>
  {/if}
</nav>
