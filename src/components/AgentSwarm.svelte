<script>
  import { onMount } from "svelte";

  // List of autonomous agents building the interface
  const agentNames = [
    { name: "ClaudeCode", color: "#FF5555" },
    { name: "Hermes-70B", color: "#00E5FF" },
    { name: "Qwen-Coder", color: "#00FF66" },
    { name: "Agent-Python", color: "#FFD600" },
    { name: "Agent-Svelte", color: "#FF3366" },
    { name: "Architect", color: "#A855F7" },
    { name: "DB-Worker", color: "#3B82F6" },
    { name: "Security-Scan", color: "#10B981" },
    { name: "Quant-Loop", color: "#F97316" },
    { name: "Voxel-Engine", color: "#06B6D4" },
    { name: "Test-Runner", color: "#EC4899" },
    { name: "API-Gateway", color: "#8B5CF6" },
    { name: "Audit-Trail", color: "#EAB308" },
    { name: "Memory-L5", color: "#14B8A6" },
    { name: "Core-Daemon", color: "#EF4444" },
    { name: "Sub-50ms", color: "#6366F1" },
  ];

  // Number of active swarm agents
  let agents = $state([]);
  let isContactVisible = $state(false);
  let scrollProgress = $state(0);
  let windowWidth = $state(1200);
  let windowHeight = $state(800);

  onMount(() => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    const handleResize = () => {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;
    };

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = docHeight > 0 ? window.scrollY / docHeight : 0;
      
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        isContactVisible = rect.top < window.innerHeight * 0.75;
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Initialize 16 agents with physics
    agents = agentNames.map((a, i) => {
      const angle = (i / agentNames.length) * Math.PI * 2;
      return {
        id: i,
        name: a.name,
        color: a.color,
        x: windowWidth * 0.2 + Math.cos(angle) * (windowWidth * 0.25) + (Math.random() * 100 - 50),
        y: windowHeight * 0.3 + Math.sin(angle) * (windowHeight * 0.2) + (Math.random() * 100 - 50),
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        targetX: Math.random() * windowWidth,
        targetY: Math.random() * windowHeight,
        hasBox: i % 4 === 0,
        boxW: 40 + Math.floor(Math.random() * 80),
        boxH: 18 + Math.floor(Math.random() * 30),
        timer: Math.random() * 100,
      };
    });

    let animationFrame;
    let clock = 0;

    const loop = () => {
      clock += 0.03;

      agents = agents.map((agent, i) => {
        let { x, y, vx, vy, targetX, targetY, timer, boxW, boxH, hasBox } = agent;
        timer += 1;

        if (isContactVisible) {
          // Flock into circular spiral formation on right side of viewport (like end of video!)
          const centerX = windowWidth > 1024 ? windowWidth * 0.78 : windowWidth * 0.5;
          const centerY = windowHeight * 0.5;
          const spiralAngle = clock * 1.5 + (i / agents.length) * Math.PI * 2;
          const spiralRadius = 90 + Math.sin(clock + i) * 35;
          targetX = centerX + Math.cos(spiralAngle) * spiralRadius;
          targetY = centerY + Math.sin(spiralAngle) * spiralRadius;
        } else {
          // Change wander targets periodically
          if (timer > 140) {
            timer = 0;
            targetX = Math.max(50, Math.min(windowWidth - 100, x + (Math.random() - 0.5) * 400));
            targetY = Math.max(80, Math.min(windowHeight - 80, y + (Math.random() - 0.5) * 350));
          }
        }

        // Smooth steering physics
        const dx = targetX - x;
        const dy = targetY - y;
        vx += dx * 0.003;
        vy += dy * 0.003;
        vx *= 0.94;
        vy *= 0.94;

        x += vx;
        y += vy;

        return { ...agent, x, y, vx, vy, timer, boxW, boxH, hasBox };
      });

      animationFrame = requestAnimationFrame(loop);
    };

    animationFrame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  });
</script>

<!-- AUTONOMOUS AGENT SWARM OVERLAY -->
<div class="fixed inset-0 pointer-events-none z-[90] overflow-hidden hidden md:block">
  {#each agents as agent (agent.id)}
    <div
      class="absolute transition-transform duration-75 ease-out select-none"
      style="transform: translate3d({agent.x}px, {agent.y}px, 0);"
    >
      <!-- CAD Selection Bounding Box (drawn by some agents) -->
      {#if agent.hasBox && !isContactVisible}
        <div
          class="absolute -top-1 -left-1 pointer-events-none border border-cyan-400/80 bg-cyan-400/5 shadow-[0_0_10px_rgba(0,229,255,0.2)] animate-pulse"
          style="width: {agent.boxW}px; height: {agent.boxH}px;"
        >
          <!-- Corner handles -->
          <span class="absolute -top-1 -left-1 w-2 h-2 bg-cyan-400 border border-black"></span>
          <span class="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 border border-black"></span>
          <span class="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-400 border border-black"></span>
          <span class="absolute -bottom-1 -right-1 w-2 h-2 bg-cyan-400 border border-black"></span>
          
          <!-- Dimension tag -->
          <span class="absolute -bottom-5 left-0 font-mono text-[8px] bg-black/90 text-cyan-400 px-1 py-0.5 border border-cyan-500/40 whitespace-nowrap">
            {agent.boxW} &times; {agent.boxH}
          </span>
        </div>
      {/if}

      <!-- Cursor Arrow -->
      <svg
        class="w-4 h-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] -rotate-12"
        viewBox="0 0 24 24"
        fill={agent.color}
        stroke="#000000"
        stroke-width="1.5"
      >
        <path d="M3 3l7 18 3-7 7-3L3 3z" />
      </svg>

      <!-- Agent Name Badge -->
      <div
        class="absolute left-3 top-2.5 px-1.5 py-0.5 rounded-sm text-[9px] font-mono tracking-tight text-white border whitespace-nowrap shadow-[0_2px_10px_rgba(0,0,0,0.9)] flex items-center gap-1"
        style="background-color: #07080c; border-color: {agent.color};"
      >
        <span class="w-1.5 h-1.5 rounded-full" style="background-color: {agent.color};"></span>
        <span>{agent.name}</span>
      </div>
    </div>
  {/each}
</div>
