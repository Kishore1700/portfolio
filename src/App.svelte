<script>
  import CyberNavbar from './components/CyberNavbar.svelte';
  import CyberHero from './components/CyberHero.svelte';
  import CyberAbout from './components/CyberAbout.svelte';
  import CyberFlagships from './components/CyberFlagships.svelte';
  import CyberMatrix from './components/CyberMatrix.svelte';
  import CyberExperienceEducation from './components/CyberExperienceEducation.svelte';
  import CyberCertifications from './components/CyberCertifications.svelte';
  import CyberContact from './components/CyberContact.svelte';
  import AgentSwarm from './components/AgentSwarm.svelte';
  import TelemetryDock from './components/TelemetryDock.svelte';
</script>

<div class="relative min-h-screen bg-[#000000] text-[#E0E0E0] font-sans-cyber cyber-grid-bg selection:bg-[#FF2A2A] selection:text-white">
  
  <!-- Left Laser Red Guide-line (Matching Video) -->
  <div class="cyber-vertical-laser hidden md:block"></div>

  <!-- Live Autonomous Multi-Agent Swarm (Top Layer with CAD Box & Scanning Lifecycle) -->
  <AgentSwarm />

  <!-- Fixed Cyber Operator Floating Navbar -->
  <CyberNavbar />

  <!-- Main Cyber-Operator Architecture View with Kishore's Real Content -->
  <main class="relative z-10 space-y-4">
    <CyberHero />
    <CyberAbout />
    <CyberFlagships />
    <CyberMatrix />
    <CyberExperienceEducation />
    <CyberCertifications />
    <CyberContact />
  </main>

  <!-- Bottom Interactive Telemetry Dock (Touring Auto-Scroll & Replay Controls) -->
  <TelemetryDock />

</div>
