<script>
  import { onMount } from "svelte";
  import { Menu, X, Terminal, FileText } from "lucide-svelte";
  import resumeUrl from "../../Kishore_Resume.pdf";

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Internship", href: "#internship" },
    { name: "Education", href: "#education" },
    { name: "Certifications", href: "#certifications" },
  ];

  let isOpen = $state(false);
  let activeSection = $state("home");
  let scrolled = $state(false);

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 20;

      const sections = navItems.map((item) => item.href.substring(1));
      let currentSection = "home";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            currentSection = section;
          }
        }
      }
      activeSection = currentSection;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
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

<nav
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled
    ? 'glassmorphism py-3 shadow-lg shadow-black/20'
    : 'bg-transparent py-5'}"
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <button
        class="flex items-center gap-2 cursor-pointer font-display font-bold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 border-none bg-transparent"
        onclick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <Terminal class="w-6 h-6 text-cyan-400 animate-pulse" />
        <span>KISHORE P M</span>
      </button>

      <!-- Desktop Nav Items -->
      <div class="hidden lg:flex items-center gap-1">
        {#each navItems as item}
          {@const isActive = activeSection === item.href.substring(1)}
          <a
            href={item.href}
            onclick={(e) => handleNavClick(e, item.href)}
            class="relative px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-colors duration-300 {isActive
              ? 'text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30'
              : 'text-slate-400 hover:text-white'}"
          >
            {item.name}
          </a>
        {/each}

        <a
          href={resumeUrl}
          download="Kishore_Resume.pdf"
          class="ml-2 px-4 py-2 rounded-full text-sm font-medium tracking-wide border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-cyan-500/10"
        >
          <FileText class="w-4 h-4 text-cyan-400" />
          <span>Resume</span>
        </a>
      </div>

      <!-- Mobile menu toggle -->
      <div class="flex lg:hidden">
        <button
          onclick={() => (isOpen = !isOpen)}
          class="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/40 focus:outline-none transition-colors"
        >
          {#if isOpen}
            <X class="h-6 w-6" />
          {:else}
            <Menu class="h-6 w-6" />
          {/if}
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Menu Panel -->
  {#if isOpen}
    <div
      class="lg:hidden glassmorphism border-t border-white/5 overflow-hidden transition-all duration-300"
    >
      <div class="px-2 pt-2 pb-4 space-y-1 sm:px-3">
        {#each navItems as item}
          {@const isActive = activeSection === item.href.substring(1)}
          <a
            href={item.href}
            onclick={(e) => handleNavClick(e, item.href)}
            class="block px-4 py-3 rounded-xl text-base font-medium transition-all {isActive
              ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-cyan-400 border-l-2 border-cyan-400 pl-3'
              : 'text-slate-400 hover:text-white hover:bg-white/5'}"
          >
            {item.name}
          </a>
        {/each}

        <a
          href={resumeUrl}
          download="Kishore_Resume.pdf"
          class="flex items-center gap-2 px-4 py-3 rounded-xl text-base font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 mt-2"
        >
          <FileText class="w-5 h-5 text-cyan-400" />
          <span>Download Resume</span>
        </a>
      </div>
    </div>
  {/if}
</nav>
