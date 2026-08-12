<script>
  import Navbar from './components/Navbar.svelte';
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

<div class="relative min-h-screen text-slate-100 bg-[#030014] font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
  <SpotlightBg />
  <Navbar />

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-12">
    <Hero />

    <div class="h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent my-4"></div>
    <About />

    <div class="h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent my-4"></div>
    <Skills />

    <div class="h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent my-4"></div>
    <Projects />

    <div class="h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent my-4"></div>
    <Internship />

    <div class="h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent my-4"></div>
    <Education />

    <div class="h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent my-4"></div>
    <Certifications />

    <div class="h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent my-4"></div>
    <ThankYou />
  </main>

  <Footer />
</div>
