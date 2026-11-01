<script>
  import { ExternalLink, Layers, X, Flame, Shield, Box, Sparkles } from "lucide-svelte";
  import Icons from "./Icons.svelte";

  const projectsData = [
    {
      id: "nutrition-system",
      title: "Food Recognition and Nutritional Measurement",
      category: "Computer Vision & Health Tech",
      description:
        "Built a system that estimates calories, proteins, fats, carbs, and vitamins based on recognized food and its portion size.",
      tags: [
        "Python",
        "OpenCV",
        "TensorFlow",
        "Flask",
        "React",
        "Tailwind CSS",
      ],
      github: "https://github.com/Kishore1700",
      featured: true,
      longDesc:
        "A smart computer vision application designed to simplify nutritional monitoring. Using deep learning object detection, it recognizes food items, analyzes volumes to estimate portion sizes, and outputs precise calorie, macro, and micro-nutrient profiles.",
      metrics: [
        "94% Food Recognition Accuracy",
        "Portion Estimation using OpenCV Depth Map",
        "Vitamins & Minerals Tracker Dashboard",
        "Instant Macro-Nutrient Breakdown",
      ],
    },
    {
      id: "campus-repository",
      title: "Campus Repository",
      category: "Full-Stack Web Application",
      description:
        "Built a Svelte 5 and SvelteKit project platform with Tailwind CSS for student showcases and admin management.",
      tags: [
        "Svelte 5",
        "SvelteKit",
        "Tailwind CSS",
        "Firebase",
        "Firestore",
        "JWT",
        "bcryptjs",
      ],
      github: "https://github.com/Kishore1700",
      featured: true,
      longDesc:
        "Campus Repository is a Svelte 5 and SvelteKit project platform styled with Tailwind CSS, designed for student project showcases and administrative oversight. User sessions and database access are secured using JWTs, bcryptjs, and HTTP-only cookies combined with Firebase security rules. The system integrates Firestore and Cloud Storage to handle real-time data, file uploads, and tag-based project search.",
      metrics: [
        "Secured with JWT, bcryptjs, HTTP-only cookies",
        "Firestore & Cloud Storage real-time integration",
        "Tag-based project search & cataloging",
        "Interactive student showcase & admin panels",
      ],
    },
  ];

  let selectedProject = $state(null);
</script>

<section id="projects" class="relative py-20 px-4 overflow-hidden">
  <div class="max-w-7xl mx-auto z-10 relative text-left">
    <!-- Section Heading -->
    <div class="text-center mb-14">
      <h2
        class="font-pixel text-2xl sm:text-3xl text-[#FFFF55] mc-text-shadow-gold mb-3"
      >
        FEATURED PROJECTS
      </h2>
      <div
        class="h-1 w-24 bg-[#55FF55] mx-auto border border-black shadow-[0_0_8px_#55FF55]"
      ></div>
    </div>

    <!-- Projects Layout -->
    <div class="space-y-10">
      {#each projectsData.filter((p) => p.featured) as project}
        <div
          class="mc-container p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0c0d12] transition-transform duration-150 hover:scale-[1.01]"
        >
          <!-- Left Column: Minecraft Command Block Terminal Mockup -->
          <div class="lg:col-span-5 flex flex-col justify-center relative">
            {#if project.id === "nutrition-system"}
              <div
                class="mc-slot p-5 font-mono text-xs text-slate-300 space-y-4 bg-[#040507] border-2 border-black"
              >
                <div
                  class="flex items-center justify-between border-b-2 border-black pb-2"
                >
                  <span class="text-[#FF5555] font-pixel text-[10px] flex items-center gap-1">
                    <Flame class="w-3.5 h-3.5 text-[#FF5555]" /> NUTRITION_BLOCK
                  </span>
                  <span class="text-[#FFFF55] text-[9px] font-silkscreen">RECIPE v1.0</span>
                </div>
                <div class="space-y-1 font-silkscreen text-[11px]">
                  <p class="text-slate-500"># Input: food_image.png</p>
                  <p class="text-[#55FF55]">&gt; Model: TensorFlow Loaded</p>
                  <p class="text-[#55FF55]">
                    &gt; Item: [Banana, Oats, Milk]
                  </p>
                  <p class="text-[#55FF55]">
                    &gt; Portion: 1x Med, 50g, 200ml
                  </p>
                </div>
                <div
                  class="border-t-2 border-black pt-3 mt-2 grid grid-cols-2 gap-2 font-mono text-[11px]"
                >
                  <div class="mc-slot p-2 bg-[#090a0f]">
                    <p class="text-[9px] text-[#FFFF55] font-silkscreen">CALORIES</p>
                    <p class="font-bold text-white">420 kcal</p>
                  </div>
                  <div class="mc-slot p-2 bg-[#090a0f]">
                    <p class="text-[9px] text-[#55FFFF] font-silkscreen">PROTEIN</p>
                    <p class="font-bold text-[#55FFFF]">14.5 g</p>
                  </div>
                  <div class="mc-slot p-2 bg-[#090a0f]">
                    <p class="text-[9px] text-[#FFFF55] font-silkscreen">CARBS</p>
                    <p class="font-bold text-[#FFFF55]">68 g</p>
                  </div>
                  <div class="mc-slot p-2 bg-[#090a0f]">
                    <p class="text-[9px] text-[#AA00AA] font-silkscreen">FATS</p>
                    <p class="font-bold text-[#AA00AA]">8.2 g</p>
                  </div>
                </div>
              </div>
            {:else}
              <div
                class="mc-slot p-5 font-mono text-xs text-slate-300 space-y-4 bg-[#040507] border-2 border-black"
              >
                <div
                  class="flex items-center justify-between border-b-2 border-black pb-2"
                >
                  <span
                    class="text-[#55FFFF] font-pixel text-[10px] flex items-center gap-1"
                  >
                    <Layers class="w-3.5 h-3.5 text-[#55FFFF]" /> CAMPUS_CHEST
                  </span>
                  <span class="text-[#FFFF55] text-[9px] font-silkscreen">SVELTE v5.0</span>
                </div>
                <div class="space-y-1 font-silkscreen text-[11px]">
                  <p class="text-slate-500"># Session: JWT Encrypted</p>
                  <p class="text-[#55FF55]">&gt; Auth: User Verified</p>
                  <p class="text-[#55FF55]">&gt; Cookie: HTTP-Only Active</p>
                  <p class="text-[#55FF55]">&gt; Firestore: Online</p>
                </div>
                <div
                  class="border-t-2 border-black pt-3 mt-2 grid grid-cols-2 gap-2 font-mono text-[11px]"
                >
                  <div class="mc-slot p-2 bg-[#090a0f]">
                    <p class="text-[9px] text-[#FFFF55] font-silkscreen">DATABASE</p>
                    <p class="font-bold text-white">Firestore</p>
                  </div>
                  <div class="mc-slot p-2 bg-[#090a0f]">
                    <p class="text-[9px] text-[#55FFFF] font-silkscreen">STYLES</p>
                    <p class="font-bold text-[#55FFFF]">Tailwind</p>
                  </div>
                  <div class="mc-slot p-2 bg-[#090a0f]">
                    <p class="text-[9px] text-[#FFFF55] font-silkscreen">FRAMEWORK</p>
                    <p class="font-bold text-[#FFFF55]">SvelteKit</p>
                  </div>
                  <div class="mc-slot p-2 bg-[#090a0f]">
                    <p class="text-[9px] text-[#FF5555] font-silkscreen">SECURITY</p>
                    <p class="font-bold text-[#FF5555]">JWT Rules</p>
                  </div>
                </div>
              </div>
            {/if}
          </div>

          <!-- Right Column: Project Details -->
          <div class="lg:col-span-7 flex flex-col justify-between text-left">
            <div>
              <div
                class="inline-block px-2.5 py-1 mc-slot bg-[#000000] text-[#FFFF55] font-pixel text-[9px] mb-3 border-2 border-black"
              >
                EPIC ITEM QUEST
              </div>
              <h3
                class="font-pixel text-lg sm:text-xl text-white mb-3 mc-text-shadow"
              >
                {project.title}
              </h3>
              <p class="text-slate-300 text-sm leading-relaxed mb-5 font-sans">
                {project.description}
              </p>

              <!-- Tags as Inventory Slot Badges -->
              <div class="flex flex-wrap gap-2 mb-6">
                {#each project.tags as tag}
                  <span
                    class="px-2.5 py-1 mc-slot bg-[#040507] text-[#55FF55] text-[11px] font-silkscreen border border-black/80"
                  >
                    {tag}
                  </span>
                {/each}
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-3">
              <button
                onclick={() => (selectedProject = project)}
                class="mc-button text-xs px-5 py-3 text-white"
              >
                INSPECT RECIPE & ARCHITECTURE
              </button>
              {#if project.github}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View Source on GitHub"
                  class="w-10 h-10 mc-slot flex items-center justify-center text-[#55FFFF] hover:scale-105"
                >
                  <Icons type="github" class="w-5 h-5" />
                </a>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Project Details Modal styled as Minecraft Recipe Scroll -->
    {#if selectedProject}
      <div class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
        <!-- Backdrop Button -->
        <button
          type="button"
          class="fixed inset-0 bg-black/85 backdrop-blur-sm border-none cursor-pointer w-full h-full p-0"
          aria-label="Close project modal backdrop"
          onclick={() => (selectedProject = null)}
        ></button>

        <!-- Modal Dialog Content -->
        <div
          role="dialog"
          aria-modal="true"
          tabindex="-1"
          class="w-full max-w-2xl mc-container bg-[#0c0d12] p-6 sm:p-8 relative z-10 overflow-y-auto max-h-[90vh]"
        >
          <!-- Close Button -->
          <button
            onclick={() => (selectedProject = null)}
            class="absolute top-4 right-4 mc-button p-1.5 text-[#FF5555]"
          >
            <X class="w-4 h-4" />
          </button>

          <!-- Modal Content -->
          <div class="text-left space-y-5">
            <div>
              <span
                class="text-[10px] font-pixel text-[#FFFF55] uppercase tracking-wider mc-text-shadow-gold"
              >
                {selectedProject.category}
              </span>
              <h3
                class="font-pixel text-base sm:text-xl text-white mt-1 mc-text-shadow"
              >
                {selectedProject.title}
              </h3>
            </div>

            <div class="border-t-2 border-black pt-4">
              <h4
                class="text-xs font-pixel text-[#55FF55] uppercase mb-2 mc-text-shadow-green"
              >
                PROJECT QUEST OVERVIEW
              </h4>
              <p class="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                {selectedProject.longDesc}
              </p>
            </div>

            <div class="border-t-2 border-black pt-4">
              <h4
                class="text-xs font-pixel text-[#55FFFF] uppercase mb-3 mc-text-shadow-diamond"
              >
                STATISTICS & STAT BUFFS
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {#each selectedProject.metrics as metric}
                  <div
                    class="p-3 mc-slot bg-[#040507] flex items-start gap-2.5"
                  >
                    <span
                      class="mt-1 w-2 h-2 bg-[#55FF55] shrink-0"
                    ></span>
                    <span
                      class="text-xs text-slate-200 font-silkscreen leading-relaxed"
                      >{metric}</span
                    >
                  </div>
                {/each}
              </div>
            </div>

            <!-- Footer links in modal -->
            <div
              class="border-t-2 border-black pt-5 mt-5 flex justify-end gap-3"
            >
              {#if selectedProject.github}
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mc-button mc-button-gold text-xs px-4 py-2.5 flex items-center gap-2"
                >
                  <Icons type="github" class="w-4 h-4 text-[#55FFFF]" />
                  <span>GITHUB CHEST</span>
                </a>
              {/if}
              <button
                onclick={() => (selectedProject = null)}
                class="mc-button text-xs px-4 py-2.5 text-white"
              >
                CLOSE SCROLL
              </button>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>
