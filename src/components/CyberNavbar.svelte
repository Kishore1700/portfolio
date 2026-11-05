<script>
  import { onMount } from "svelte";
  import { ArrowRight } from "lucide-svelte";

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

<!-- CENTERED FLOATING ISLAND NAVBAR AS SEEN IN VIDEO -->
<header class="fixed top-3 left-1/2 -translate-x-1/2 z-[9992] w-[95%] max-w-4xl select-none">
  <div class="bg-[#070709]/90 backdrop-blur-md border border-[#1A1C23] px-3.5 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.85)] flex items-center justify-between gap-4 font-mono-cyber text-[11px]">
    
    <!-- Left: Red Brand Badge -->
    <a href="#hero" class="flex items-center gap-2 group">
      <span class="cyber-badge-red px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-tight">
        KISHORE.
      </span>
    </a>

    <!-- Center: Minimalist Nav Links -->
    <nav class="flex items-center gap-5 text-slate-300">
      {#each navLinks as link}
        <a
          href={link.href}
          class="hover:text-white transition-colors relative py-0.5"
        >
          {link.label}
        </a>
      {/each}
    </nav>

    <!-- Right: Availability Pill -->
    <div class="flex items-center gap-2">
      <a
        href="#contact"
        class="flex items-center gap-1.5 px-2.5 py-1 bg-[#12141C] border border-[#232635] text-white hover:border-[#FF2A2A] transition-colors text-[10px] group"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse"></span>
        <span class="text-slate-400 group-hover:text-slate-200">Available</span>
        <span class="text-[#FF2A2A] font-bold">DISPATCH &rarr;</span>
      </a>
    </div>

  </div>
</header>
