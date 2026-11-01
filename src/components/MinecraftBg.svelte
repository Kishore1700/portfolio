<script>
  import { onMount } from "svelte";

  let canvas = $state();
  let ctx = null;
  let animationFrameId;
  let width = 0;
  let height = 0;
  let scrollY = 0;
  let lastScrollY = 0;
  let scrollVelocity = 0;

  // Biome: 'overworld' | 'nether' | 'the_end'
  let currentBiome = $state("overworld");

  // Mouse interaction state
  let mouse = { x: -100, y: -100 };

  // Particle systems
  let ambientParticles = [];
  let burstParticles = [];
  let stars = [];

  // Tiled Minecraft bedrock/deepslate pattern
  let patternCanvas = null;
  let bgPattern = null;

  const biomes = {
    overworld: {
      name: "Overworld Night",
      skyTop: "#000000",
      skyBottom: "#030408",
      particleColors: ["#55FF55", "#55FFFF", "#FFFF55", "#a6ffa6", "#00ff66"],
      particleType: "xp",
      hasStars: true
    },
    nether: {
      name: "The Nether",
      skyTop: "#000000",
      skyBottom: "#140204",
      particleColors: ["#FF3333", "#FF8800", "#FFAA00", "#660000", "#ffcc00"],
      particleType: "ember",
      hasStars: false
    },
    the_end: {
      name: "The End",
      skyTop: "#000000",
      skyBottom: "#090212",
      particleColors: ["#B829FF", "#DF55FF", "#55FFFF", "#7700cc", "#ff55ff"],
      particleType: "portal",
      hasStars: true
    }
  };

  // Generate authentic 32x32 Minecraft Deepslate/Bedrock block tile for OLED true blacks
  function createBedrockPattern() {
    patternCanvas = document.createElement("canvas");
    patternCanvas.width = 32;
    patternCanvas.height = 32;
    const pCtx = patternCanvas.getContext("2d");

    // Pure pitch-black base for OLED
    pCtx.fillStyle = "#000000";
    pCtx.fillRect(0, 0, 32, 32);

    // Subtle bedrock pixel grain (true dark obsidian/bedrock)
    const shades = ["#000000", "#05060a", "#08090e", "#0b0d14", "#000000"];
    for (let x = 0; x < 32; x += 4) {
      for (let y = 0; y < 32; y += 4) {
        const seed = (x * 13 + y * 29) % shades.length;
        pCtx.fillStyle = shades[seed];
        pCtx.fillRect(x, y, 4, 4);

        if ((x + y) % 8 === 0) {
          pCtx.fillStyle = "#121520";
          pCtx.fillRect(x + 1, y + 1, 2, 2);
        }
      }
    }

    // 1px block boundary border
    pCtx.strokeStyle = "rgba(0, 0, 0, 0.75)";
    pCtx.lineWidth = 1;
    pCtx.strokeRect(0, 0, 32, 32);

    if (ctx) {
      bgPattern = ctx.createPattern(patternCanvas, "repeat");
    }
  }

  function initStars() {
    stars = [];
    const count = Math.min(Math.floor((width * height) / 6000), 160);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() > 0.8 ? 3 : 2,
        baseAlpha: 0.4 + Math.random() * 0.55,
        twinkleSpeed: 0.015 + Math.random() * 0.035,
        twinklePhase: Math.random() * Math.PI * 2,
        parallax: 0.04 + Math.random() * 0.06,
        isCyan: Math.random() > 0.85
      });
    }
  }

  function spawnAmbientParticle(initialSpread = false) {
    const config = biomes[currentBiome];
    const colors = config.particleColors;
    const color = colors[Math.floor(Math.random() * colors.length)];

    return {
      x: Math.random() * width,
      y: initialSpread ? Math.random() * height : height + 15,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -(0.5 + Math.random() * 1.2),
      size: Math.random() > 0.7 ? 4 : 3,
      color: color,
      alpha: 0.7 + Math.random() * 0.3,
      life: 0,
      maxLife: 240 + Math.random() * 180,
      phase: Math.random() * Math.PI * 2,
      oscillation: 0.4 + Math.random() * 0.5
    };
  }

  function createClickBurst(x, y) {
    const config = biomes[currentBiome];
    const colors = config.particleColors;
    const count = 20;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const speed = 2.5 + Math.random() * 5;
      burstParticles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        size: Math.random() > 0.5 ? 4 : 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        gravity: 0.16,
        bounce: 0.45,
        decay: 0.016 + Math.random() * 0.016
      });
    }
  }

  function createCursorDust(x, y) {
    if (Math.random() > 0.35) return;
    const config = biomes[currentBiome];
    burstParticles.push({
      x: x + (Math.random() - 0.5) * 14,
      y: y + (Math.random() - 0.5) * 14,
      vx: (Math.random() - 0.5) * 1.5,
      vy: Math.random() * -1.6,
      size: 3,
      color: config.particleColors[Math.floor(Math.random() * config.particleColors.length)],
      alpha: 0.85,
      gravity: 0.07,
      bounce: 0,
      decay: 0.035
    });
  }

  function handleResize() {
    if (!canvas) return;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    if (patternCanvas) {
      bgPattern = ctx.createPattern(patternCanvas, "repeat");
    } else {
      createBedrockPattern();
    }

    initStars();

    ambientParticles = [];
    const maxAmbient = Math.min(Math.floor(width / 32), 48);
    for (let i = 0; i < maxAmbient; i++) {
      ambientParticles.push(spawnAmbientParticle(true));
    }
  }

  function handleScroll() {
    scrollY = window.scrollY || window.pageYOffset || 0;
    scrollVelocity = scrollY - lastScrollY;
    lastScrollY = scrollY;
  }

  function handleMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    createCursorDust(e.clientX, e.clientY);
  }

  function handleWindowClick(e) {
    createClickBurst(e.clientX, e.clientY);
  }

  function render(time) {
    if (!ctx) return;
    const config = biomes[currentBiome];

    scrollVelocity *= 0.9;

    // 1. Draw Deep Sky Background Gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
    skyGrad.addColorStop(0, config.skyTop);
    skyGrad.addColorStop(1, config.skyBottom);
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Draw Tiled Minecraft Bedrock Texture with Parallax & Clean Opacity
    if (bgPattern) {
      ctx.save();
      ctx.globalAlpha = 0.38;
      const patternY = (scrollY * 0.12) % 32;
      ctx.translate(0, -patternY);
      ctx.fillStyle = bgPattern;
      ctx.fillRect(0, 0, width, height + 32);
      ctx.restore();
    }

    // 3. Draw Crisp Pixel Stars
    if (config.hasStars) {
      for (let s of stars) {
        s.twinklePhase += s.twinkleSpeed;
        const currentAlpha = s.baseAlpha + Math.sin(s.twinklePhase) * 0.28;
        
        let sy = (s.y - scrollY * s.parallax) % height;
        if (sy < 0) sy += height;

        ctx.fillStyle = s.isCyan
          ? `rgba(85, 255, 255, ${Math.max(0.15, currentAlpha)})`
          : `rgba(255, 255, 255, ${Math.max(0.15, currentAlpha)})`;
        ctx.fillRect(Math.floor(s.x), Math.floor(sy), s.size, s.size);
      }
    }

    // 4. Draw Ambient Floating XP Orbs / Portal Sparks
    const maxAmbient = Math.min(Math.floor(width / 32), 48);
    while (ambientParticles.length < maxAmbient) {
      ambientParticles.push(spawnAmbientParticle(false));
    }

    for (let i = ambientParticles.length - 1; i >= 0; i--) {
      const p = ambientParticles[i];
      p.life++;
      p.phase += 0.04;
      p.x += p.vx + Math.sin(p.phase) * p.oscillation;
      p.y += p.vy - scrollVelocity * 0.04;

      // Mouse repulsion
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100 && dist > 1) {
        p.x -= (dx / dist) * 1.6;
        p.y -= (dy / dist) * 1.6;
      }

      // Do not draw particles if they reach behind the navbar (upper 65px)
      if (p.y < 65) {
        p.alpha -= 0.05;
      }

      if (p.y < 0 || p.life > p.maxLife || p.alpha <= 0) {
        ambientParticles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;

      if (config.particleType === "xp") {
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
      }

      ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
      ctx.restore();
    }

    // 5. Draw Interactive Click / Cursor Burst Particles
    for (let i = burstParticles.length - 1; i >= 0; i--) {
      const b = burstParticles[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vy += b.gravity;
      b.alpha -= b.decay;

      // Ground bounce
      if (b.y > height - 10) {
        b.y = height - 10;
        b.vy = -b.vy * b.bounce;
        b.vx *= 0.8;
      }

      if (b.alpha <= 0) {
        burstParticles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, b.alpha);
      ctx.fillStyle = b.color;
      ctx.fillRect(Math.floor(b.x), Math.floor(b.y), b.size, b.size);
      ctx.restore();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  function setBiome(biomeKey) {
    currentBiome = biomeKey;
    ambientParticles = [];
  }

  onMount(() => {
    ctx = canvas.getContext("2d", { alpha: false });
    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleWindowClick);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleWindowClick);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  });
</script>

<!-- The Fixed Full-Screen Canvas (covers all scrolling place) -->
<div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
  <canvas bind:this={canvas} class="absolute inset-0 w-full h-full block" style="image-rendering: pixelated;"></canvas>

  <!-- Minecraft 32px Grid Lines Overlay across entire background -->
  <div
    class="absolute inset-0 bg-[linear-gradient(to_right,rgba(85,255,85,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(85,255,85,0.025)_1px,transparent_1px)] bg-[size:32px_32px]"
  ></div>

  <!-- Subtle Vignette for Depth -->
  <div
    class="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_50%,rgba(0,0,0,0.6)_100%)]"
  ></div>
</div>

<!-- Floating Biome Quick Selector -->
<div
  class="fixed bottom-4 right-4 z-50 hidden sm:flex items-center gap-1.5 p-1.5 mc-container bg-[#0c0d12] border-2 border-black shadow-xl"
>
  <span class="text-[9px] font-pixel text-slate-400 px-1 hidden md:inline">BIOME:</span>
  {#each Object.entries(biomes) as [key, b]}
    <button
      type="button"
      onclick={(e) => {
        e.stopPropagation();
        setBiome(key);
      }}
      class="px-2 py-1 text-[9px] font-pixel transition-all cursor-pointer {currentBiome === key
        ? 'bg-[#55FF55] text-black font-bold border border-black shadow-[0_0_10px_#55FF55]'
        : 'text-slate-300 hover:text-white hover:bg-[#161822]'}"
    >
      {key === 'overworld' ? '🌙 OVERWORLD' : key === 'nether' ? '🔥 NETHER' : '🔮 THE END'}
    </button>
  {/each}
</div>
