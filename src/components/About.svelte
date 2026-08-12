<script>
  import { GraduationCap, Code, BookOpen, Heart } from "lucide-svelte";

  const highlights = [
    {
      icon: GraduationCap,
      colorClass: "text-cyan-400",
      title: "MCA Student",
      desc: "Sona College of Technology, pursuing master level software engineering education.",
    },
    {
      icon: Code,
      colorClass: "text-blue-400",
      title: "Developer & Programmer",
      desc: "Skilled in writing clean, efficient backend logic using Python and Java.",
    },
    {
      icon: BookOpen,
      colorClass: "text-purple-400",
      title: "Problem Solver",
      desc: "Passionate about structural data concepts, algorithm modeling, and DSA.",
    },
  ];
</script>

<section id="about" class="relative py-24 px-4 overflow-hidden">
  <div class="max-w-7xl mx-auto z-10 relative">
    <!-- Section Heading -->
    <div class="text-center mb-16">
      <h2
        class="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2"
      >
        ABOUT ME
      </h2>
      <div
        class="h-[3px] w-[80px] bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"
      ></div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <!-- Detailed Narrative -->
      <div class="lg:col-span-6 text-left">
        <h3
          class="font-display font-semibold text-2xl text-slate-100 mb-6 flex items-center gap-2"
        >
          Discovering My Technology Journey <Heart
            class="w-5 h-5 text-red-500 animate-pulse"
          />
        </h3>
        <p class="text-slate-400 text-lg leading-relaxed mb-6">
          I am a passionate MCA student deeply interested in software
          development, web technologies, and solving complex algorithmic
          challenges. My academic journey has equipped me with strong
          foundations in computing principles, logic, and core coding standards.
        </p>
        <p class="text-slate-400 text-lg leading-relaxed mb-6">
          Skilled in Python, Java, frontend development, and designing database
          solutions, I thrive on crafting user-friendly interfaces backed by
          solid architecture. I enjoy bridging the gap between design and
          functionality, creating applications that are both visually appealing
          and highly performant.
        </p>
        <p class="text-slate-400 text-lg leading-relaxed">
          When I'm not coding, I'm exploring new technologies, participating in
          functional challenges, or learning about system configurations and
          architectures.
        </p>

        <!-- Key Strengths & Areas of Interest -->
        <div
          class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/5 pt-6"
        >
          <div>
            <h4
              class="font-display font-bold text-sm text-cyan-400 uppercase tracking-wider mb-3"
            >
              Key Strengths
            </h4>
            <ul class="space-y-2 text-slate-300 text-sm font-sans">
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Teamwork
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Adaptability
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Active Listening
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Critical Thinking
              </li>
            </ul>
          </div>
          <div>
            <h4
              class="font-display font-bold text-sm text-purple-400 uppercase tracking-wider mb-3"
            >
              Areas of Interest
            </h4>
            <ul class="space-y-2 text-slate-300 text-sm font-sans">
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                Web Designing
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                Exploring New Technologies
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Cards & Info Grid -->
      <div class="lg:col-span-6 grid grid-cols-1 sm:grid-cols-1 gap-6">
        {#each highlights as highlight}
          {@const Icon = highlight.icon}
          <div
            class="p-6 rounded-2xl glassmorphism border border-white/5 hover:border-cyan-500/30 flex items-start gap-4 text-left group transition-all duration-300 hover:translate-x-1"
          >
            <div
              class="p-3 rounded-xl bg-white/5 group-hover:bg-cyan-500/10 transition-colors"
            >
              <Icon class="w-6 h-6 {highlight.colorClass}" />
            </div>
            <div>
              <h4
                class="font-display font-bold text-lg text-white mb-2 group-hover:text-cyan-300 transition-colors"
              >
                {highlight.title}
              </h4>
              <p class="text-slate-400 text-sm leading-relaxed">
                {highlight.desc}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
