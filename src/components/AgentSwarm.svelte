<script>
  import { onMount } from "svelte";

  // Configuration for 24 autonomous agent cursors
  const agentTemplates = [
    { name: "ClaudeCode", color: "#FF2A2A", role: "Architecture Core" },
    { name: "Hermes-70B", color: "#00E5FF", role: "Quant Execution" },
    { name: "GPT-4o", color: "#00FF66", role: "Full-Stack Synthesizer" },
    { name: "DeepSeek-V3", color: "#FFD600", role: "Algorithmic Logic" },
    { name: "Qwen-2.5", color: "#FF3399", role: "System Verification" },
    { name: "Codestral", color: "#9933FF", role: "FastAPI Engine" },
    { name: "Mistral-Large", color: "#FF6600", role: "Database Modeling" },
    { name: "Llama-3.3", color: "#33CCFF", role: "Autonomous Loop" },
    { name: "Sovereign-1", color: "#FF2A2A", role: "RTX 4070 Local" },
    { name: "Architect-Prime", color: "#00E5FF", role: "State Graph" },
    { name: "Solidity-Operator", color: "#FFD600", role: "Mainnet Dispatch" },
    { name: "UI-Renderer", color: "#00FF66", role: "Svelte DOM Synth" },
  ];

  let agents = $state([]);
  let isSwarmVortex = $state(false);
  let isTouring = $state(true);

  // Initialize 20 active agent cursors with dynamic targets and velocities
  function initAgents() {
    const list = [];
    for (let i = 0; i < 20; i++) {
      const template = agentTemplates[i % agentTemplates.length];
      list.push({
        id: i,
        name: template.name,
        color: template.color,
        role: template.role,
        x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
        y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
        targetX: Math.random() * 1200,
        targetY: Math.random() * 800,
        speed: 0.03 + Math.random() * 0.04,
        boxW: 30 + Math.floor(Math.random() * 80),
        boxH: 14 + Math.floor(Math.random() * 30),
        hasBox: Math.random() > 0.45,
        clickPulse: false
      });
    }
    agents = list;
  }

  onMount(() => {
    initAgents();

    // Check scroll for vortex formation near the bottom (Contact)
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      isSwarmVortex = maxScroll > 0 && scrollY > maxScroll - 400;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let animId;
    let angle = 0;

    const loop = () => {
      angle += 0.02;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Update positions
      agents.forEach((agent, i) => {
        if (isSwarmVortex) {
          // Vortex spiral mode at the right of contact section
          const centerX = width - 180;
          const centerY = height * 0.55;
          const radius = 60 + (i * 5);
          const currentAngle = angle + (i * (Math.PI * 2 / agents.length));
          agent.x += ((centerX + Math.cos(currentAngle) * radius) - agent.x) * 0.08;
          agent.y += ((centerY + Math.sin(currentAngle) * radius) - agent.y) * 0.08;
        } else {
          // Autonomous roving / inspection mode
          const dx = agent.targetX - agent.x;
          const dy = agent.targetY - agent.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 30 || Math.random() < 0.008) {
            agent.targetX = Math.max(40, Math.min(width - 80, Math.random() * width));
            agent.targetY = Math.max(60, Math.min(height - 80, Math.random() * height));
            agent.hasBox = Math.random() > 0.4;
            agent.boxW = 32 + Math.floor(Math.random() * 90);
            agent.boxH = 16 + Math.floor(Math.random() * 28);
          } else {
            agent.x += dx * agent.speed;
            agent.y += dy * agent.speed;
          }
        }
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

<!-- Swarm Layer: Fixed, Transparent, Non-blocking -->
<div class="fixed inset-0 pointer-events-none z-[9990] overflow-hidden select-none">
  {#each agents as agent (agent.id)}
    <!-- Autonomous Cursor -->
    <div
      class="absolute transition-transform duration-75 will-change-transform"
      style="transform: translate3d({agent.x}px, {agent.y}px, 0);"
    >
      <!-- CAD Selection Bounding Box if inspecting -->
      {#if agent.hasBox && !isSwarmVortex}
        <div
          class="absolute -top-3 -left-3 border border-cyan-400/80 bg-cyan-950/20 pointer-events-none transition-all duration-200"
          style="width: {agent.boxW}px; height: {agent.boxH}px;"
        >
          <!-- Corner handles -->
          <div class="absolute -top-1 -left-1 w-1.5 h-1.5 bg-cyan-400 border border-black"></div>
          <div class="absolute -top-1 -right-1 w-1.5 h-1.5 bg-cyan-400 border border-black"></div>
          <div class="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-cyan-400 border border-black"></div>
          <div class="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-cyan-400 border border-black"></div>
          
          <!-- Dimension Badge -->
          <div class="absolute -bottom-4 left-0 font-mono-cyber text-[8px] text-cyan-300 bg-black/90 px-1 border border-cyan-500/40 whitespace-nowrap">
            {agent.boxW} &times; {agent.boxH}
          </div>
        </div>
      {/if}

      <!-- Cursor Pointer SVG -->
      <svg
        class="w-4 h-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
          fill={agent.color}
          stroke="#000000"
          stroke-width="1.5"
        />
      </svg>

      <!-- Agent Name Badge -->
      <div
        class="absolute left-3.5 top-2.5 px-1.5 py-0.5 rounded-[2px] font-mono-cyber text-[9px] font-bold text-white whitespace-nowrap flex items-center gap-1 shadow-[0_2px_10px_rgba(0,0,0,0.85)] border border-black/80"
        style="background-color: {agent.color};"
      >
        <span>{agent.name}</span>
      </div>
    </div>
  {/each}
</div>
