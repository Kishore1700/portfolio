<script>
  import Navbar from './components/Navbar.svelte';
  import AgentSwarm from './components/AgentSwarm.svelte';
  import BottomDock from './components/BottomDock.svelte';
  import SideScrollbar from './components/SideScrollbar.svelte';
  import Hero from './components/Hero.svelte';
  import About from './components/About.svelte';
  import Projects from './components/Projects.svelte';
  import Skills from './components/Skills.svelte';
  import ExperienceEducation from './components/ExperienceEducation.svelte';
  import Contact from './components/Contact.svelte';
</script>

<div class="relative min-h-screen bg-[#000000] text-slate-100 font-sans selection:bg-[#FF2A2A]/40 selection:text-white bg-cyber-grid">
  <!-- Autonomous Multi-Agent Swarm (16+ agents wander, inspect, and vortex at contact) -->
  <AgentSwarm />

  <!-- Fixed Top Cyber-Operator Navbar -->
  <Navbar />

  <!-- Side Navigation Elevator -->
  <SideScrollbar />

  <!-- Bottom Telemetry Dock -->
  <BottomDock />

  <!-- Main Architecture Canvas -->
  <main class="relative z-10 space-y-12 pb-24">
    <Hero />
    <About />
    <Projects />
    <Skills />
    <ExperienceEducation />
    <Contact />
  </main>
</div>
