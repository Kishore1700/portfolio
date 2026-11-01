<script>
  import Navbar from './components/Navbar.svelte';
  import MinecraftHUD from './components/MinecraftHUD.svelte';
  import SpotlightBg from './components/SpotlightBg.svelte';
  import Hero from './components/Hero.svelte';
  import About from './components/About.svelte';
  import Skills from './components/Skills.svelte';
  import Projects from './components/Projects.svelte';
  import Internship from './components/Internship.svelte';
  import Education from './components/Education.svelte';
  import Certifications from './components/Certifications.svelte';
  import ThankYou from './components/ThankYou.svelte';
  import Footer from './components/Footer.svelte';
</script>

<div class="relative min-h-screen text-slate-100 font-sans selection:bg-[#55FF55]/30 selection:text-[#55FF55]">
  <SpotlightBg />
  <Navbar />
  <MinecraftHUD />

  <div class="relative z-10">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-32 pt-6">
    <Hero />

    <!-- Minecraft Pixel Divider Line -->
    <div class="h-[4px] bg-black border-y border-[#181a24] relative flex items-center justify-center my-6">
      <div class="w-8 h-8 bg-[#0c0d12] border-2 border-black rotate-45 absolute flex items-center justify-center">
        <div class="w-3 h-3 bg-[#55FF55] rotate-45 shadow-[0_0_8px_#55FF55]"></div>
      </div>
    </div>
    
    <About />

    <div class="h-[4px] bg-black border-y border-[#181a24] relative flex items-center justify-center my-6">
      <div class="w-8 h-8 bg-[#0c0d12] border-2 border-black rotate-45 absolute flex items-center justify-center">
        <div class="w-3 h-3 bg-[#55FFFF] rotate-45 shadow-[0_0_8px_#55FFFF]"></div>
      </div>
    </div>

    <Skills />

    <div class="h-[4px] bg-black border-y border-[#181a24] relative flex items-center justify-center my-6">
      <div class="w-8 h-8 bg-[#0c0d12] border-2 border-black rotate-45 absolute flex items-center justify-center">
        <div class="w-3 h-3 bg-[#FFFF55] rotate-45 shadow-[0_0_8px_#FFFF55]"></div>
      </div>
    </div>

    <Projects />

    <div class="h-[4px] bg-black border-y border-[#181a24] relative flex items-center justify-center my-6">
      <div class="w-8 h-8 bg-[#0c0d12] border-2 border-black rotate-45 absolute flex items-center justify-center">
        <div class="w-3 h-3 bg-[#FF5555] rotate-45 shadow-[0_0_8px_#FF5555]"></div>
      </div>
    </div>

    <Internship />

    <div class="h-[4px] bg-black border-y border-[#181a24] relative flex items-center justify-center my-6">
      <div class="w-8 h-8 bg-[#0c0d12] border-2 border-black rotate-45 absolute flex items-center justify-center">
        <div class="w-3 h-3 bg-[#AA00AA] rotate-45 shadow-[0_0_8px_#AA00AA]"></div>
      </div>
    </div>

    <Education />

    <div class="h-[4px] bg-black border-y border-[#181a24] relative flex items-center justify-center my-6">
      <div class="w-8 h-8 bg-[#0c0d12] border-2 border-black rotate-45 absolute flex items-center justify-center">
        <div class="w-3 h-3 bg-[#55FF55] rotate-45 shadow-[0_0_8px_#55FF55]"></div>
      </div>
    </div>

    <Certifications />

    <div class="h-[4px] bg-black border-y border-[#181a24] relative flex items-center justify-center my-6">
      <div class="w-8 h-8 bg-[#0c0d12] border-2 border-black rotate-45 absolute flex items-center justify-center">
        <div class="w-3 h-3 bg-[#55FFFF] rotate-45 shadow-[0_0_8px_#55FFFF]"></div>
      </div>
    </div>

    <ThankYou />
  </main>

    <Footer />
  </div>
</div>
