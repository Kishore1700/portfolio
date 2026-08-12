<script>
  import { GraduationCap, Calendar, MapPin } from "lucide-svelte";

  const educationData = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Sona College of Technology",
      period: "2025 — 2027",
      location: "Salem, Tamil Nadu",
      description:
        "Pursuing Master level software engineering education. Focus on advanced computer systems, database design, and software methodologies. Current CGPA: 7.6 / 10.",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Sona College of Arts & Science",
      period: "2022 — 2025",
      location: "Salem, Tamil Nadu",
      description:
        "Acquired core competencies in computer fundamentals, programming concepts, database management systems, and web designing. Completed with CGPA: 6.9 / 10.",
    },
    {
      degree: "Higher Secondary Certificate (HSC - Class 12)",
      institution: "Sarada Balamandir Higher Secondary School",
      period: "2021 — 2022",
      location: "Salem, Tamil Nadu",
      description:
        "Focused on core scientific and mathematical coursework, developing strong analytical and logical reasoning skills. Completed with 69%.",
    },
    {
      degree: "Secondary School Leaving Certificate (SSLC - Class 10)",
      institution: "Sarada Balamandir Higher Secondary School",
      period: "2019 — 2020",
      location: "Salem, Tamil Nadu",
      description: "General secondary education. Completed with 52%.",
    },
  ];
</script>

<section id="education" class="relative py-24 px-4 overflow-hidden">
  <div class="max-w-5xl mx-auto z-10 relative">
    <!-- Section Heading -->
    <div class="text-center mb-20">
      <h2
        class="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2"
      >
        EDUCATION TIMELINE
      </h2>
      <div
        class="h-[3px] w-[80px] bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"
      ></div>
    </div>

    <!-- Timeline container -->
    <div
      class="relative border-l-2 border-white/5 md:border-l-0 pl-6 md:pl-0 text-left"
    >
      <!-- Vertical connecting line for desktop -->
      <div
        class="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 hidden md:block"
      ></div>

      <div class="space-y-16">
        {#each educationData as item, idx}
          {@const isEven = idx % 2 === 0}
          <div
            class="relative flex flex-col md:flex-row items-start {isEven
              ? 'md:flex-row-reverse'
              : ''}"
          >
            <!-- Timeline Glow Dot -->
            <div
              class="absolute -left-[33px] md:left-1/2 md:-translate-x-1/2 top-1.5 w-6 h-6 rounded-full bg-slate-950 border-4 border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.5)] z-25 flex items-center justify-center"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-white animate-ping"
              ></span>
            </div>

            <!-- Empty space filler for desktop alignment -->
            <div class="w-full md:w-1/2"></div>

            <!-- Actual Timeline Card -->
            <div
              class="w-full md:w-[45%] rounded-2xl glassmorphism border border-white/5 hover:border-cyan-500/20 p-6 sm:p-8 hover:scale-[1.01] transition-all duration-300 relative overflow-hidden group shadow-xl"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              ></div>

              <div
                class="flex flex-wrap gap-2 items-center text-xs font-mono text-cyan-400 mb-3"
              >
                <span class="flex items-center gap-1">
                  <Calendar class="w-3.5 h-3.5" />
                  {item.period}
                </span>
                <span class="text-slate-600">|</span>
                <span class="flex items-center gap-1 text-slate-400">
                  <MapPin class="w-3.5 h-3.5" />
                  {item.location}
                </span>
              </div>

              <h3
                class="font-display font-extrabold text-lg sm:text-xl text-white mb-2 group-hover:text-cyan-300 transition-colors"
              >
                {item.degree}
              </h3>
              <h4
                class="text-slate-300 text-sm font-semibold mb-4 flex items-center gap-1.5"
              >
                <GraduationCap class="w-4 h-4 text-purple-400" />
                {item.institution}
              </h4>

              <p class="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
