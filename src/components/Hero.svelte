<script>
  import { onMount } from "svelte";
  import { FileText, ArrowRight, Mail } from "lucide-svelte";
  import Icons from "./Icons.svelte";
  import resumeUrl from "../../Kishore_Resume.pdf";

  const roles = ["MCA Student", "Software Developer", "Web Designer"];

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
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs sm:text-sm font-mono mb-6 w-fit animate-pulse"
      >
        <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        Ready for Opportunities
      </div>

      <h1
        class="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-4 text-white"
      >
        Hi, I'm 
        <span
          class="inline-block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
        >
          Kishore P M
        </span>
      </h1>

      <h2 class="text-xl sm:text-2xl md:text-3xl text-slate-300 mb-6 font-sans">
        I am a <span class="text-cyan-400 font-mono font-semibold">
          {currentText}
          <span
            class="animate-[pulse_1s_infinite] ml-1 text-cyan-400 font-normal"
            >|</span
          >
        </span>
      </h2>

      <p
        class="text-slate-400 text-base sm:text-lg max-w-xl mb-8 leading-relaxed font-sans"
      >
        Driven professional with expertise in communication and software
        development. Skilled in collaborating across teams to deliver
        high-quality software solutions. Proficient in programming, system
        analysis, and agile methodologies.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 mb-12">
        <button
          onclick={() => handleScroll("projects")}
          class="group px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        >
          <span>View Projects</span>
          <ArrowRight
            class="w-4 h-4 group-hover:translate-x-1 transition-transform"
          />
        </button>

        <a
          href={resumeUrl}
          download="Kishore_Resume.pdf"
          class="px-6 py-3.5 rounded-xl border border-white/10 hover:border-cyan-500/40 bg-white/5 hover:bg-cyan-500/10 text-slate-300 hover:text-white font-medium flex items-center justify-center gap-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        >
          <FileText class="w-4 h-4 text-cyan-400" />
          <span>Download Resume</span>
        </a>
      </div>

      <!-- Social Links Dock -->
      <div class="flex items-center gap-4">
        <a
          href="https://github.com/Kishore1700"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          class="w-10 h-10 rounded-xl glassmorphism flex items-center justify-center text-slate-400 hover:text-cyan-400 border border-white/5 hover:border-cyan-500/30 transition-all hover:-translate-y-1 hover:scale-110"
        >
          <Icons type="github" class="w-5 h-5" />
        </a>
        <a
          href="https://linkedin.com/in/kishore-p-m-"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          class="w-10 h-10 rounded-xl glassmorphism flex items-center justify-center text-slate-400 hover:text-cyan-400 border border-white/5 hover:border-cyan-500/30 transition-all hover:-translate-y-1 hover:scale-110"
        >
          <Icons type="linkedin" class="w-5 h-5" />
        </a>
        <a
          href="mailto:kishorekishorei170@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          title="Email"
          class="w-10 h-10 rounded-xl glassmorphism flex items-center justify-center text-slate-400 hover:text-cyan-400 border border-white/5 hover:border-cyan-500/30 transition-all hover:-translate-y-1 hover:scale-110"
        >
          <Mail class="w-5 h-5" />
        </a>
      </div>
    </div>

    <!-- Visual Element: Futuristic Glow Card or Mock Terminal -->
    <div class="lg:col-span-5 relative flex justify-center">
      <!-- Main Glow Ring -->
      <div
        class="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 blur-xl pointer-events-none"
      ></div>

      <!-- Holographic Dev Card -->
      <div
        class="w-full max-w-[380px] aspect-square rounded-3xl glassmorphism border border-white/10 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group"
      >
        <!-- Spotlight shimmer -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-50 pointer-events-none"
        ></div>

        <div
          class="flex justify-between items-center border-b border-white/5 pb-4 mb-4"
        >
          <div class="flex gap-2">
            <span class="w-3 h-3 rounded-full bg-red-500/70 animate-pulse"></span>
            <span
              class="w-3 h-3 rounded-full bg-yellow-500/70 animate-pulse [animation-delay:0.2s]"
            ></span>
            <span
              class="w-3 h-3 rounded-full bg-green-500/70 animate-pulse [animation-delay:0.4s]"
            ></span>
          </div>
          <span class="text-xs font-mono text-slate-500">Kishore.svelte</span>
        </div>

        <!-- Svelte Animated Component -->
        <div
          class="flex-1 flex flex-col items-center justify-center relative min-h-[180px] my-2 select-none"
        >
          <!-- Glowing Aura -->
          <div
            class="absolute w-24 h-24 rounded-full bg-orange-500/20 blur-2xl animate-pulse -z-10"
          ></div>

          <!-- Svelte Logo Orbits Container -->
          <div
            class="relative w-36 h-36 flex items-center justify-center animate-spin [animation-duration:20s]"
          >
            <svg
              viewBox="0 0 100 100"
              class="w-24 h-24 text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.7)]"
              fill="currentColor"
            >
              <path
                d="M72.9,29.9c-4-6.4-11-10.2-18.7-10.2c-5.7,0-11,2.1-15.1,5.8l6.8,11.2c2.4-1.8,5.3-2.8,8.3-2.8c6.1,0,10.6,4.5,10.6,10.6c0,2.1-0.6,4-1.7,5.6L36.3,64.2C32.3,57.8,30.3,50,30.3,42.1c0-7.8,2-15.6,6-22L63.1,3.8c4-6.4,11-10.2,18.7-10.2c5.7,0,11,2.1,15.1,5.8l-6.8,11.2C87.7,8.8,84.8,7.8,81.8,7.8c-6.1,0-10.6,4.5-10.6,10.6c0,2.1,0.6,4,1.7,5.6L99.7,8.2C103.7,14.6,105.7,22.4,105.7,30.3C105.7,38.1,103.7,45.9,99.7,52.3L72.9,29.9z"
                transform="scale(0.8) translate(12, 12)"
              />
            </svg>
          </div>

          <!-- Floating Svelte badges (Svelte 5 Runes!) -->
          <div
            class="absolute top-2 left-0 px-2 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-300 text-[10px] font-mono shadow-sm animate-bounce"
          >
            $state
          </div>

          <div
            class="absolute top-6 right-2 px-2 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-300 text-[10px] font-mono shadow-sm animate-bounce [animation-delay:0.3s]"
          >
            $derived
          </div>

          <div
            class="absolute bottom-2 left-6 px-2 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-300 text-[10px] font-mono shadow-sm animate-bounce [animation-delay:0.6s]"
          >
            $effect
          </div>
        </div>

        <div
          class="border-t border-white/5 pt-4 mt-4 flex justify-between items-center text-xs text-slate-500 font-mono"
        >
          <span>LOC: 104</span>
          <span class="text-cyan-400 animate-pulse">● READY</span>
        </div>
      </div>
    </div>
  </div>
</section>
