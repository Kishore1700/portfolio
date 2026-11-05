<script>
  import { onMount } from "svelte";
  import { Menu, X, FileText, Terminal, ArrowUpRight } from "lucide-svelte";
  import resumeUrl from "../../Kishore_Resume.pdf";
  import { sound } from "../utils/sound.js";

  const navItems = [
    { name: "ABOUT", href: "#about", code: "// 01" },
    { name: "FLAGSHIPS", href: "#projects", code: "// 02" },
    { name: "SYSTEMS", href: "#skills", code: "// 03" },
    { name: "EXPERIENCE", href: "#experience", code: "// 04" },
    { name: "CONTACT", href: "#contact", code: "// 05" },
  ];

  let isOpen = $state(false);
  let activeSection = $state("about");
  let scrolled = $state(false);

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 20;

      const scrollPos = window.scrollY + 180;
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

<header
  class="fixed top-0 left-0 right-0 z-[9990] transition-all duration-200 {scrolled
    ? 'bg-[#000000]/95 backdrop-blur-md border-b border-[#181a24] py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
    : 'bg-transparent py-4'}"
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
    
    <!-- Left: Brand Logo & Title -->
    <a
      href="#home"
      onclick={(e) => {
        e.preventDefault();
        sound.playClick();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      class="flex items-center gap-3 group cursor-pointer"
    >
      <!-- Red Brand Block -->
      <div class="bg-[#FF2A2A] text-black font-display font-extrabold text-sm sm:text-base px-2.5 py-1 tracking-tight flex items-center gap-1 group-hover:bg-white transition-colors">
        <span>KISHORE.</span>
      </div>

      <div class="hidden sm:flex flex-col">
        <span class="font-mono text-[10px] text-slate-400 tracking-wider">
          SYSTEM ARCHITECT &bull; FULL-STACK
        </span>
      </div>
    </a>

    <!-- Center: Desktop Terminal Index Nav -->
    <nav class="hidden lg:flex items-center gap-1 bg-[#050608]/80 p-1 border border-[#1b1c24]">
      {#each navItems as item}
        {@const isActive = activeSection === item.href.substring(1)}
        <a
          href={item.href}
          onclick={(e) => handleNavClick(e, item.href)}
          class="px-3 py-1.5 font-mono text-xs transition-all flex items-center gap-1.5 cursor-pointer {isActive
            ? 'bg-[#FF2A2A] text-black font-bold shadow-[0_0_12px_rgba(255,42,42,0.4)]'
            : 'text-slate-400 hover:text-white hover:bg-[#12141c]'}"
        >
          <span class="opacity-60 text-[10px]">{item.code}</span>
          <span>{item.name}</span>
        </a>
      {/each}
    </nav>

    <!-- Right: Status Badge & Dispatch CTA -->
    <div class="hidden sm:flex items-center gap-3">
      <a
        href={resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="font-mono text-xs px-3 py-1.5 border border-[#232533] text-slate-300 hover:text-white hover:border-slate-500 flex items-center gap-1.5 transition-colors"
      >
        <FileText class="w-3.5 h-3.5 text-cyan-400" />
        <span>RESUME</span>
      </a>

      <!-- Dispatch Button -->
      <a
        href="#contact"
        onclick={(e) => handleNavClick(e, "#contact")}
        class="font-mono text-xs px-3 py-1.5 bg-[#FF2A2A]/10 border border-[#FF2A2A] text-[#FF2A2A] hover:bg-[#FF2A2A] hover:text-black font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_14px_rgba(255,42,42,0.25)]"
      >
        <span class="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse"></span>
        <span>DISPATCH &rarr;</span>
      </a>
    </div>

    <!-- Mobile Menu Button -->
    <button
      type="button"
      onclick={() => { sound.playClick(); isOpen = !isOpen; }}
      class="lg:hidden p-2 text-slate-300 hover:text-white bg-[#0a0b10] border border-[#232533]"
      aria-label="Toggle Navigation Menu"
    >
      {#if isOpen}
        <X class="w-5 h-5 text-[#FF2A2A]" />
      {:else}
        <Menu class="w-5 h-5" />
      {/if}
    </button>
  </div>

  <!-- Mobile Drawer -->
  {#if isOpen}
    <div class="lg:hidden bg-[#050608] border-b border-[#1f212a] px-4 py-4 animate-fade-in font-mono">
      <div class="flex flex-col gap-2">
        {#each navItems as item}
          <a
            href={item.href}
            onclick={(e) => handleNavClick(e, item.href)}
            class="p-2.5 text-xs text-slate-300 hover:text-[#FF2A2A] hover:bg-[#10121a] flex items-center justify-between border-b border-[#151722]"
          >
            <span>{item.name}</span>
            <span class="text-slate-500">{item.code}</span>
          </a>
        {/each}
        <div class="pt-3 flex items-center gap-2">
          <a
            href="#contact"
            onclick={(e) => handleNavClick(e, "#contact")}
            class="flex-1 py-2 text-center text-xs font-bold bg-[#FF2A2A] text-black"
          >
            DISPATCH OPERATOR &rarr;
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            class="px-3 py-2 text-xs border border-[#2a2c3a] text-slate-300 text-center"
          >
            RESUME
          </a>
        </div>
      </div>
    </div>
  {/if}
</header>
