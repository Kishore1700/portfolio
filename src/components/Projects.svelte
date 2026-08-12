<script>
  import { ExternalLink, Layers, X, Flame } from "lucide-svelte";
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

<section id="projects" class="relative py-24 px-4 overflow-hidden">
  <div class="max-w-7xl mx-auto z-10 relative text-left">
    <!-- Section Heading -->
    <div class="text-center mb-16">
      <h2
        class="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2"
      >
        FEATURED PROJECTS
      </h2>
      <div
        class="h-[3px] w-[80px] bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"
      ></div>
    </div>

    <!-- Projects Layout -->
    <div class="space-y-12">
      <!-- Featured Project Showcase -->
      {#each projectsData.filter((p) => p.featured) as project}
        <div
          class="group relative rounded-3xl overflow-hidden glassmorphism border border-white/10 p-6 sm:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 hover:border-cyan-500/30 transition-all duration-500"
        >
          <!-- Highlight background glow -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          ></div>

          <!-- Left Column: Visual Mockup of Application -->
          <div class="lg:col-span-5 flex flex-col justify-center relative">
            <div
              class="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full"
            ></div>
            {#if project.id === "nutrition-system"}
              <div
                class="relative glassmorphism-light rounded-2xl border border-white/10 p-6 font-mono text-xs text-slate-300 space-y-4 shadow-xl"
              >
                <div
                  class="flex items-center justify-between border-b border-white/5 pb-2"
                >
                  <span class="text-cyan-400 font-bold flex items-center gap-1">
                    <Flame class="w-3.5 h-3.5 animate-bounce" /> NUTRITION_ENGINE
                  </span>
                  <span class="text-slate-500 text-[10px]">v1.0.2</span>
                </div>
                <div class="space-y-1">
                  <p class="text-slate-500"># Input: food_image.jpg</p>
                  <p class="text-green-400">&gt; Loading TensorFlow Model...</p>
                  <p class="text-green-400">
                    &gt; Object Detected: [Banana, Oats, Milk]
                  </p>
                  <p class="text-green-400">
                    &gt; Portions: 1x Medium, 50g, 200ml
                  </p>
                </div>
                <div
                  class="border-t border-white/5 pt-3 mt-2 grid grid-cols-2 gap-2 text-slate-400"
                >
                  <div>
                    <p class="text-[10px] text-slate-500">CALORIES</p>
                    <p class="text-sm font-bold text-white">420 kcal</p>
                  </div>
                  <div>
                    <p class="text-[10px] text-slate-500">PROTEIN</p>
                    <p class="text-sm font-bold text-cyan-300">14.5 g</p>
                  </div>
                  <div>
                    <p class="text-[10px] text-slate-500">CARBS</p>
                    <p class="text-sm font-bold text-yellow-300">68 g</p>
                  </div>
                  <div>
                    <p class="text-[10px] text-slate-500">FATS</p>
                    <p class="text-sm font-bold text-purple-300">8.2 g</p>
                  </div>
                </div>
              </div>
            {:else}
              <div
                class="relative glassmorphism-light rounded-2xl border border-white/10 p-6 font-mono text-xs text-slate-300 space-y-4 shadow-xl"
              >
                <div
                  class="flex items-center justify-between border-b border-white/5 pb-2"
                >
                  <span
                    class="text-purple-400 font-bold flex items-center gap-1"
                  >
                    <Layers class="w-3.5 h-3.5" /> CAMPUS_REPO
                  </span>
                  <span class="text-slate-500 text-[10px]">v5.0.0</span>
                </div>
                <div class="space-y-1">
                  <p class="text-slate-500"># Session: JWT encrypted</p>
                  <p class="text-green-400">&gt; Authenticating user...</p>
                  <p class="text-green-400">&gt; HTTP-only cookies: Set</p>
                  <p class="text-green-400">&gt; Firebase Storage: Connected</p>
                </div>
                <div
                  class="border-t border-white/5 pt-3 mt-2 grid grid-cols-2 gap-2 text-slate-400"
                >
                  <div>
                    <p class="text-[10px] text-slate-500">DATABASE</p>
                    <p class="text-sm font-bold text-white">Firestore</p>
                  </div>
                  <div>
                    <p class="text-[10px] text-slate-500">CSS FRAMEWORK</p>
                    <p class="text-sm font-bold text-cyan-300">Tailwind</p>
                  </div>
                  <div>
                    <p class="text-[10px] text-slate-500">ROUTING</p>
                    <p class="text-sm font-bold text-yellow-300">SvelteKit</p>
                  </div>
                  <div>
                    <p class="text-[10px] text-slate-500">SECURITY</p>
                    <p class="text-sm font-bold text-purple-300">
                      HTTP-only / Rules
                    </p>
                  </div>
                </div>
              </div>
            {/if}
          </div>

          <!-- Right Column: Project Details -->
          <div class="lg:col-span-7 flex flex-col justify-between text-left">
            <div>
              <div
                class="inline-block px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-4 uppercase tracking-wider"
              >
                Featured Project
              </div>
              <h3
                class="font-display font-extrabold text-2xl sm:text-3xl text-white mb-4 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300 transition-all duration-300"
              >
                {project.title}
              </h3>
              <p class="text-slate-300 text-base leading-relaxed mb-6">
                {project.description}
              </p>

              <div class="flex flex-wrap gap-2 mb-8">
                {#each project.tags as tag}
                  <span
                    class="px-3 py-1 rounded-lg bg-slate-900 border border-white/5 text-slate-400 text-xs font-mono"
                  >
                    {tag}
                  </span>
                {/each}
              </div>
            </div>

            <div class="flex items-center gap-4">
              <button
                onclick={() => (selectedProject = project)}
                class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-medium text-sm transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                View Details & Architecture
              </button>
              {#if project.github}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <Icons type="github" class="w-5 h-5" />
                </a>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Project Details Modal -->
    {#if selectedProject}
      <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300"
      >
        <div
          class="w-full max-w-2xl rounded-2xl glassmorphism border border-white/10 p-6 sm:p-8 relative overflow-y-auto max-h-[90vh] shadow-2xl"
        >
          <!-- Close Button -->
          <button
            onclick={() => (selectedProject = null)}
            class="absolute top-4 right-4 p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors focus:outline-none cursor-pointer"
          >
            <X class="w-5 h-5" />
          </button>

          <!-- Modal Content -->
          <div class="text-left space-y-6">
            <div>
              <span
                class="text-xs font-mono text-cyan-400 tracking-widest uppercase"
              >
                {selectedProject.category}
              </span>
              <h3
                class="font-display font-bold text-2xl sm:text-3xl text-white mt-1"
              >
                {selectedProject.title}
              </h3>
            </div>

            <div class="border-t border-white/5 pt-4">
              <h4
                class="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-2"
              >
                Project Overview
              </h4>
              <p class="text-slate-400 text-sm leading-relaxed">
                {selectedProject.longDesc}
              </p>
            </div>

            <div class="border-t border-white/5 pt-4">
              <h4
                class="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3"
              >
                Key Features & Metrics
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {#each selectedProject.metrics as metric}
                  <div
                    class="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5"
                  >
                    <span
                      class="mt-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"
                    ></span>
                    <span
                      class="text-xs sm:text-sm text-slate-300 leading-relaxed"
                      >{metric}</span
                    >
                  </div>
                {/each}
              </div>
            </div>

            <!-- Footer links in modal -->
            <div
              class="border-t border-white/5 pt-6 mt-6 flex justify-end gap-3"
            >
              {#if selectedProject.github}
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="px-5 py-2.5 rounded-xl border border-white/10 hover:border-cyan-500/40 bg-white/5 hover:bg-cyan-500/10 text-slate-300 hover:text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Icons type="github" class="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              {/if}
              <button
                onclick={() => (selectedProject = null)}
                class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium text-xs sm:text-sm hover:scale-[1.02] transition-transform cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>
