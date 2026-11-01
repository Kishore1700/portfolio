<script>
  import { GraduationCap, Calendar, MapPin, Sparkles } from "lucide-svelte";

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

<section id="education" class="relative py-20 px-4 overflow-hidden">
  <div class="max-w-5xl mx-auto z-10 relative">
    <!-- Section Heading -->
    <div class="text-center mb-16">
      <h2
        class="font-pixel text-2xl sm:text-3xl text-[#FFFF55] mc-text-shadow-gold mb-3"
      >
        EDUCATION TIMELINE
      </h2>
      <div
        class="h-1 w-24 bg-[#55FF55] mx-auto border border-black shadow-[0_0_8px_#55FF55]"
      ></div>
    </div>

    <!-- Timeline container -->
    <div
      class="relative border-l-4 border-black md:border-l-0 pl-6 md:pl-0 text-left"
    >
      <!-- Vertical connecting line for desktop -->
      <div
        class="absolute left-1/2 top-0 bottom-0 w-1.5 bg-[#55FF55] border-x border-black hidden md:block"
      ></div>

      <div class="space-y-12">
        {#each educationData as item, idx}
          {@const isEven = idx % 2 === 0}
          <div
            class="relative flex flex-col md:flex-row items-start {isEven
              ? 'md:flex-row-reverse'
              : ''}"
          >
            <!-- Timeline Slot Node -->
            <div
              class="absolute -left-[37px] md:left-1/2 md:-translate-x-1/2 top-2 w-7 h-7 mc-slot bg-[#040507] border-2 border-[#55FF55] shadow-[0_0_8px_#55FF55] z-20 flex items-center justify-center"
            >
              <div class="w-2.5 h-2.5 bg-[#FFFF55] rotate-45 shadow-[0_0_4px_#FFFF55]"></div>
            </div>

            <!-- Empty space filler for desktop alignment -->
            <div class="w-full md:w-1/2"></div>

            <!-- Actual Timeline Card -->
            <div
              class="w-full md:w-[46%] mc-container p-6 bg-[#0c0d12] hover:scale-[1.01] transition-transform duration-150 relative"
            >
              <div
                class="flex flex-wrap gap-2 items-center text-[10px] font-silkscreen text-[#55FFFF] mb-3"
              >
                <span class="flex items-center gap-1 mc-slot px-2 py-0.5 bg-[#040507] border border-black/80">
                  <Calendar class="w-3 h-3 text-[#FFFF55]" />
                  {item.period}
                </span>
                <span class="flex items-center gap-1 text-slate-400 mc-slot px-2 py-0.5 bg-[#040507] border border-black/80">
                  <MapPin class="w-3 h-3 text-[#FF5555]" />
                  {item.location}
                </span>
              </div>

              <h3
                class="font-pixel text-sm sm:text-base text-white mb-2 mc-text-shadow"
              >
                {item.degree}
              </h3>
              <h4
                class="text-[#55FF55] text-xs font-silkscreen mb-4 flex items-center gap-1.5"
              >
                <GraduationCap class="w-4 h-4 text-[#AA00AA]" />
                {item.institution}
              </h4>

              <p class="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                {item.description}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
