<script>
  import { onMount } from "svelte";
  import { ArrowRight, Terminal } from "lucide-svelte";

  let scrolled = $state(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Flagships", href: "#flagships" },
    { label: "Matrix", href: "#matrix" },
    { label: "Contact", href: "#contact" }
  ];

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 20;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<header
  class="fixed top-0 left-0 right-0 z-[9992] transition-all duration-200 {scrolled
    ? 'bg-[#000000]/95 backdrop-blur-md border-b border-[#1A1C23] py-2.5'
    : 'bg-transparent py-4'}"
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
    
    <!-- Left: Brand Block Tag -->
    <a href="#hero" class="flex items-center gap-3 group">
      <span class="cyber-badge-red px-2 py-0.5 text-xs font-mono-cyber font-extrabold uppercase tracking-tight">
        KISHORE.
      </span>
      <span class="hidden sm:inline font-mono-cyber text-[10px] text-slate-400 tracking-wider">
        // SYSTEM ARCHITECT & FULL-STACK OPERATOR
      </span>
    </a>

    <!-- Center: Minimalist Monospace Nav Links -->
    <nav class="hidden md:flex items-center gap-6 font-mono-cyber text-[11px] text-slate-300">
      {#each navLinks as link}
        <a
          href={link.href}
          class="hover:text-white hover:text-[#00E5FF] transition-colors relative py-1"
        >
          {link.label}
        </a>
      {/each}
    </nav>

    <!-- Right: Live Availability Button -->
    <div class="flex items-center gap-3">
      <a
        href="#contact"
        class="cyber-btn-primary !py-1.5 !px-3 !text-[10px] flex items-center gap-2"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
        <span class="font-bold">DISPATCH &rarr;</span>
      </a>
    </div>

  </div>
</header>
