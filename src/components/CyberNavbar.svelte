<script>
  import { onMount } from "svelte";
  import { ArrowRight, FileText } from "lucide-svelte";

  let scrolled = $state(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#flagships" },
    { label: "Skills", href: "#matrix" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Certs", href: "#certifications" },
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

<!-- CENTERED FLOATING ISLAND NAVBAR MATCHING VIDEO THEME -->
<header class="fixed top-3 left-1/2 -translate-x-1/2 z-[9992] w-[95%] max-w-5xl select-none">
  <div class="bg-[#070709]/90 backdrop-blur-md border border-[#1A1C23] px-3.5 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.85)] flex items-center justify-between gap-3 font-mono-cyber text-[11px]">
    
    <!-- Left: Red Brand Badge -->
    <a href="#hero" class="flex items-center gap-2 group shrink-0">
      <span class="cyber-badge-red px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-tight">
        KISHORE.
      </span>
      <span class="hidden lg:inline text-[9px] text-slate-400">
        // MCA SCHOLAR
      </span>
    </a>

    <!-- Center: Minimalist Nav Links -->
    <nav class="hidden md:flex items-center gap-4 text-slate-300">
      {#each navLinks as link}
        <a
          href={link.href}
          class="hover:text-white transition-colors relative py-0.5"
        >
          {link.label}
        </a>
      {/each}
    </nav>

    <!-- Right: Resume Download & Dispatch Pill -->
    <div class="flex items-center gap-2 shrink-0">
      <a
        href="/Kishore_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        class="hidden sm:flex items-center gap-1 px-2 py-1 bg-[#0F1015] border border-[#232635] text-slate-300 hover:text-white hover:border-[#00E5FF] transition-colors text-[10px]"
        title="Download Kishore's Resume PDF"
      >
        <FileText class="w-3 h-3 text-[#00E5FF]" />
        <span>Resume</span>
      </a>

      <a
        href="#contact"
        class="flex items-center gap-1.5 px-2.5 py-1 bg-[#12141C] border border-[#232635] text-white hover:border-[#FF2A2A] transition-colors text-[10px] group"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse"></span>
        <span class="text-slate-400 group-hover:text-slate-200 hidden sm:inline">Available</span>
        <span class="text-[#FF2A2A] font-bold">DISPATCH &rarr;</span>
      </a>
    </div>

  </div>
</header>
