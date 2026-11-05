<script>
  import CyberNavbar from './components/CyberNavbar.svelte';
  import CyberHero from './components/CyberHero.svelte';
  import CyberAbout from './components/CyberAbout.svelte';
  import CyberFlagships from './components/CyberFlagships.svelte';
  import CyberMatrix from './components/CyberMatrix.svelte';
  import CyberContact from './components/CyberContact.svelte';
  import AgentSwarm from './components/AgentSwarm.svelte';
  import TelemetryDock from './components/TelemetryDock.svelte';
</script>

<div class="relative min-h-screen bg-[#000000] text-[#E0E0E0] font-sans-cyber cyber-grid-bg selection:bg-[#FF2A2A] selection:text-white">
  
  <!-- Left Laser Red Guide-line -->
  <div class="cyber-vertical-laser hidden md:block"></div>

  <!-- Live Autonomous Multi-Agent Swarm (Top Layer) -->
  <AgentSwarm />

  <!-- Fixed Cyber Operator Navbar -->
  <CyberNavbar />

  <!-- Main Cyber-Operator Architecture View -->
  <main class="relative z-10 space-y-4">
    <CyberHero />
    <CyberAbout />
    <CyberFlagships />
    <CyberMatrix />
    <CyberContact />
  </main>

  <!-- Bottom Interactive Telemetry Dock -->
  <TelemetryDock />

</div>
