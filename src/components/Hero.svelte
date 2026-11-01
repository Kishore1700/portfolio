<script>
  import { onMount } from "svelte";
  import { FileText, ArrowRight, Mail, Sparkles, Heart, Shield, Sword } from "lucide-svelte";
  import Icons from "./Icons.svelte";
  import Minecraft3DBlock from "./Minecraft3DBlock.svelte";
  import resumeUrl from "../../Kishore_Resume.pdf";
  import { sound } from "../utils/sound.js";

  const roles = ["MCA Student", "Software Developer", "Web Designer", "Svelte Craftsman"];

  let currentWordIndex = $state(0);
  let currentText = $state("");
  let isDeleting = $state(false);

  onMount(() => {
    let timer;
    const type = () => {
      const currentWord = roles[currentWordIndex];

      if (isDeleting) {
        currentText = currentWord.slice(0, currentText.length - 1);
        timer = setTimeout(type, 50);
      } else {
        currentText = currentWord.slice(0, currentText.length + 1);
        timer = setTimeout(type, 100);
      }

      if (!isDeleting && currentText === currentWord) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          isDeleting = true;
          type();
        }, 1500);
      } else if (isDeleting && currentText === "") {
        isDeleting = false;
        currentWordIndex = (currentWordIndex + 1) % roles.length;
        clearTimeout(timer);
        timer = setTimeout(type, 500);
      }
    };

    type();

    return () => clearTimeout(timer);
  });

  const handleScroll = (id) => {
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
    }
  };
</script>

<section
  id="home"
  class="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden px-4"
>
  <div
    class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10"
  >
    <!-- Intro Text -->
    <div class="lg:col-span-7 text-left flex flex-col justify-center">
      <!-- Minecraft HUD Status Bar -->
      <div class="flex flex-wrap items-center gap-3 mb-6">
        <div class="mc-slot px-3 py-1.5 flex items-center gap-2 text-xs font-pixel text-[#FFFF55] bg-[#1a1b22]">
          <span class="w-2.5 h-2.5 bg-[#55FF55] border border-black animate-pulse"></span>
          <span>LEVEL 99 DEVELOPER</span>
        </div>

        <!-- Minecraft Hearts Container -->
        <div class="flex items-center gap-1 bg-[#121318] px-2.5 py-1.5 mc-slot">
          {#each Array(5) as _}
            <Heart class="w-3.5 h-3.5 fill-[#FF5555] text-[#AA00AA]" />
          {/each}
          <Shield class="w-3.5 h-3.5 text-[#55FFFF] ml-1" />
        </div>
      </div>

      <h1
        class="font-pixel text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 text-[#FFFFFF] mc-text-shadow"
      >
        HI, I'M <br class="hidden sm:inline" />
        <span class="text-[#FFFF55] mc-text-shadow-gold font-pixel">
          KISHORE P M
        </span>
      </h1>

      <!-- Minecraft XP Bar -->
      <div class="max-w-md my-3">
        <div class="flex justify-between text-[11px] font-silkscreen text-[#55FF55] mb-1">
          <span>XP PROGRESS</span>
          <span>9,999 / 10,000 XP</span>
        </div>
        <div class="mc-xp-container">
          <div class="mc-xp-fill w-[95%]"></div>
        </div>
      </div>

      <h2 class="text-lg sm:text-xl md:text-2xl text-slate-200 mb-6 font-vt tracking-wide">
        CLASS: <span class="text-[#55FF55] font-pixel text-base sm:text-lg underline underline-offset-4 decoration-[#55FF55]">
          {currentText}
          <span class="animate-pulse ml-1 text-[#55FF55]">_</span>
        </span>
      </h2>

      <!-- Minecraft Description Box -->
      <div class="mc-container p-4 sm:p-5 mb-8 max-w-2xl bg-[#0c0d12]">
        <p class="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
          Driven professional with expertise in communication and software
          development. Skilled in collaborating across teams to deliver
          high-quality software solutions. Proficient in programming, system
          analysis, and agile methodologies.
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 mb-10">
        <button
          onclick={() => { sound.playClick(); handleScroll("projects"); }}
          class="mc-button px-6 py-3.5 text-xs text-[#FFFFFF] flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sword class="w-4 h-4 text-[#FFFF55]" />
          <span>EQUIP PROJECTS</span>
          <ArrowRight class="w-4 h-4" />
        </button>

        <a
          href={resumeUrl}
          download="Kishore_Resume.pdf"
          onclick={() => sound.playClick()}
          class="mc-button mc-button-gold px-6 py-3.5 text-xs text-[#FFFF55] flex items-center justify-center gap-2 cursor-pointer"
        >
          <FileText class="w-4 h-4 text-[#55FFFF]" />
          <span>CRAFT RESUME (.PDF)</span>
        </a>
      </div>

      <!-- Social Links Dock as Inventory Slots -->
      <div class="flex items-center gap-3">
        <span class="text-xs font-silkscreen text-slate-400 mr-1">QUICK SLOTS:</span>
        <a
          href="https://github.com/Kishore1700"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          class="w-10 h-10 mc-slot flex items-center justify-center text-[#55FF55] hover:scale-110 transition-transform"
        >
          <Icons type="github" class="w-5 h-5" />
        </a>
        <a
          href="https://linkedin.com/in/kishore-p-m-"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          class="w-10 h-10 mc-slot flex items-center justify-center text-[#55FFFF] hover:scale-110 transition-transform"
        >
          <Icons type="linkedin" class="w-5 h-5" />
        </a>
        <a
          href="mailto:kishorekishorei170@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          title="Email"
          class="w-10 h-10 mc-slot flex items-center justify-center text-[#FF5555] hover:scale-110 transition-transform"
        >
          <Mail class="w-5 h-5" />
        </a>
      </div>
    </div>

    <!-- Visual Element: Interactive 3D Minecraft Voxel Block -->
    <div class="lg:col-span-5 relative flex justify-center">
      <div
        class="w-full max-w-[380px] mc-container p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden bg-[#0c0d12]"
      >
        <!-- Header -->
        <div
          class="flex justify-between items-center border-b-2 border-black pb-3 mb-3 font-pixel text-[11px]"
        >
          <span class="text-[#FFFF55] mc-text-shadow-gold">3D VOXEL FORGE</span>
          <span class="text-[9px] text-[#55FF55] font-silkscreen bg-[#050608] px-2 py-0.5 mc-slot border border-black shadow-[0_0_6px_#55FF55]/30">SURVIVAL MODE</span>
        </div>

        <!-- 3D Minecraft Block Viewport -->
        <div
          class="flex-1 flex flex-col items-center justify-center relative min-h-[260px] my-1 mc-slot bg-[#040507] p-3 border border-black/80"
        >
          <Minecraft3DBlock />
        </div>

        <div
          class="border-t-2 border-black pt-3 mt-3 flex justify-between items-center text-[10px] font-silkscreen text-slate-400"
        >
          <span>ENGINE: WEBGL 3D VOXEL</span>
          <span class="text-[#55FF55] font-bold drop-shadow-[0_0_8px_rgba(85,255,85,0.6)]">INTERACTIVE ●</span>
        </div>
      </div>
    </div>
  </div>
</section>
