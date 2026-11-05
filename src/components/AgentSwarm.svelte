<script>
  import { onMount } from "svelte";
  import { operatorEngine } from "../utils/operatorEngine.svelte.js";
  import { buildEngine } from "../utils/buildEngine.svelte.js";

  const agentNames = [
    { name: "ClaudeCode", color: "#FF2A2A" },
    { name: "Hermes-70B", color: "#00E5FF" },
    { name: "GPT-4o", color: "#00FF66" },
    { name: "DeepSeek-V3", color: "#FFD600" },
    { name: "Qwen-2.5", color: "#FF3399" },
    { name: "Codestral", color: "#9933FF" },
    { name: "Mistral-Large", color: "#FF6600" },
    { name: "Llama-3.3", color: "#33CCFF" },
    { name: "Architect", color: "#FF2A2A" },
    { name: "Quant-Prime", color: "#00E5FF" },
    { name: "Solidity-Op", color: "#FFD600" },
    { name: "UI-Synthesizer", color: "#00FF66" },
    { name: "FastAPI-Core", color: "#FF3399" },
    { name: "Sovereign-1", color: "#FF2A2A" },
    { name: "Agent-7", color: "#33CCFF" },
    { name: "Agent-12", color: "#FFD600" },
    { name: "Agent-18", color: "#00FF66" },
    { name: "Agent-24", color: "#00E5FF" },
    { name: "Agent-26", color: "#FF3399" },
    { name: "Agent-28", color: "#FF2A2A" }
  ];

  let agents = $state([]);

  function setupAgents() {
    agents = agentNames.map((a, i) => ({
      id: i,
      name: a.name,
      color: a.color,
      x: 100 + Math.random() * (typeof window !== "undefined" ? window.innerWidth - 200 : 1000),
      y: 100 + Math.random() * (typeof window !== "undefined" ? window.innerHeight - 200 : 700),
      targetX: Math.random() * 1000,
      targetY: Math.random() * 700,
      speed: 0.03 + Math.random() * 0.04,
      hasBox: Math.random() > 0.65,
      boxW: 36 + Math.floor(Math.random() * 85),
      boxH: 16 + Math.floor(Math.random() * 24)
    }));
  }

  onMount(() => {
    setupAgents();

    const checkScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      operatorEngine.isSwarmVortex = maxScroll > 0 && scrollY > maxScroll - 380;
    };
    window.addEventListener("scroll", checkScroll, { passive: true });

    let animId;
    let angle = 0;

    const tick = () => {
      angle += 0.025;
      const w = window.innerWidth;
      const h = window.innerHeight;

      agents.forEach((agent, i) => {
        // If this agent is the active builder for the target element
        if (buildEngine.activeTarget && (agent.name === buildEngine.activeTarget.agent || i === 0)) {
          const targetScreenX = buildEngine.activeTarget.x - window.scrollX;
          const targetScreenY = buildEngine.activeTarget.y - window.scrollY;
          agent.x += (targetScreenX - agent.x) * 0.12;
          agent.y += (targetScreenY - agent.y) * 0.12;
          return;
        }

        if (buildEngine.isScanning) {
          // Circular scanning orbit around center (Matching intro_002.jpg)
          const cx = w * 0.5;
          const cy = h * 0.5;
          const r = 90;
          const a = angle * 1.5 + (i * (Math.PI * 2 / agents.length));
          agent.x += ((cx + Math.cos(a) * r) - agent.x) * 0.1;
          agent.y += ((cy + Math.sin(a) * r) - agent.y) * 0.1;
        } else if (operatorEngine.isSwarmVortex) {
          // Synchronized flocking spiral vortex at the right of contact (Matching frame_027/028)
          const centerX = w - 160;
          const centerY = h * 0.5;
          const r = 45 + (i * 6);
          const a = angle + (i * (Math.PI * 2 / agents.length));
          agent.x += ((centerX + Math.cos(a) * r) - agent.x) * 0.07;
          agent.y += ((centerY + Math.sin(a) * r) - agent.y) * 0.07;
        } else {
          // Autonomous inspection & roving
          const dx = agent.targetX - agent.x;
          const dy = agent.targetY - agent.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 40 || Math.random() < 0.007) {
            agent.targetX = Math.max(50, Math.min(w - 60, Math.random() * w));
            agent.targetY = Math.max(70, Math.min(h - 70, Math.random() * h));
            agent.hasBox = Math.random() > 0.6;
            agent.boxW = 35 + Math.floor(Math.random() * 95);
            agent.boxH = 16 + Math.floor(Math.random() * 24);
          } else {
            agent.x += dx * agent.speed;
            agent.y += dy * agent.speed;
          }
        }
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", checkScroll);
    };
  });
</script>

<!-- SCANNING PHASE OVERLAY (Matches intro_002.jpg) -->
{#if buildEngine.isScanning}
  <div class="fixed inset-0 z-[9998] bg-[#000000] flex flex-col items-center justify-center pointer-events-none select-none animate-fade-in">
    <div class="w-14 h-14 rounded-full border border-[#1F222E] flex items-center justify-center bg-[#070709] shadow-[0_0_20px_rgba(255,42,42,0.2)]">
      <span class="font-display font-black text-xs text-white tracking-widest">KP</span>
    </div>
    <div class="font-mono-cyber text-[10px] text-slate-400 mt-4 tracking-widest uppercase flex items-center gap-2">
      <span class="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping"></span>
      <span>Scanning page... 0/252 layers</span>
    </div>
  </div>
{/if}

<!-- PLACEMENT CROSSHAIRS SCATTERED BY AGENTS (As seen in build_004) -->
{#each buildEngine.crosshairs as ch (ch.id)}
  <div
    class="fixed text-[9px] text-[#00E5FF]/60 font-mono-cyber pointer-events-none z-[9989]"
    style="left: {ch.x}px; top: {ch.y}px;"
  >
    +
  </div>
{/each}

<!-- AUTONOMOUS AGENT CURSOR LAYER -->
<div class="fixed inset-0 pointer-events-none z-[9990] overflow-hidden select-none">
  {#each agents as agent (agent.id)}
    <div
      class="absolute will-change-transform"
      style="transform: translate3d({agent.x}px, {agent.y}px, 0);"
    >
      <!-- CAD Wireframe Bounding Box when roving -->
      {#if agent.hasBox && !operatorEngine.isSwarmVortex && !buildEngine.isScanning}
        <div
          class="absolute -top-3 -left-3 border border-[#00E5FF]/80 bg-[#00E5FF]/10 pointer-events-none"
          style="width: {agent.boxW}px; height: {agent.boxH}px;"
        >
          <div class="absolute -top-1 -left-1 w-1.5 h-1.5 bg-[#00E5FF] border border-black"></div>
          <div class="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#00E5FF] border border-black"></div>
          <div class="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-[#00E5FF] border border-black"></div>
          <div class="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-[#00E5FF] border border-black"></div>
          
          <div class="absolute -bottom-3.5 left-0 font-mono-cyber text-[8px] text-[#00E5FF] bg-black/95 px-1 border border-[#00E5FF]/50 whitespace-nowrap">
            {agent.boxW} &times; {agent.boxH}
          </div>
        </div>
      {/if}

      <!-- Arrow Cursor -->
      <svg
        class="w-4 h-4 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
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

      <!-- Agent Label Badge -->
      <div
        class="absolute left-3.5 top-2.5 px-1.5 py-0.5 font-mono-cyber text-[8px] font-bold text-white whitespace-nowrap border border-black shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
        style="background-color: {agent.color};"
      >
        {agent.name}
      </div>
    </div>
  {/each}
</div>
