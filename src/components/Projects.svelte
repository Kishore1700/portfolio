<script>
  import { ExternalLink, Layers, X, Flame, Shield, Box, Sparkles } from "lucide-svelte";
  import Icons from "./Icons.svelte";

  const projectsData = [
    {
      id: "smart-procurement",
      title: "Smart Procurement System",
      category: "Enterprise Full-Stack & Cloud Architecture",
      description:
        "Enterprise-grade procurement and vendor workflow platform featuring Supabase PostgreSQL backend, SvelteKit 2, automated PDF purchase orders, and real-time Chart.js telemetry.",
      tags: [
        "Svelte 5",
        "SvelteKit",
        "Supabase",
        "PostgreSQL",
        "Tailwind CSS v4",
        "Chart.js",
        "jsPDF",
        "Zod",
      ],
      github: "https://github.com/Kishore1700/Smart-Procurement-System",
      featured: true,
      longDesc:
        "A full-lifecycle smart procurement system streamlining vendor purchasing, purchase order approvals, and invoice reconciliation. Built with Svelte 5 runes and SvelteKit, it integrates Supabase for PostgreSQL database persistence, Row Level Security (RLS), and schema triggers. Features automated PDF purchase order & invoice generation via jsPDF, interactive financial telemetry with Chart.js, and strict type-safe schema verification with Zod.",
      metrics: [
        "Supabase PostgreSQL with Row Level Security (RLS) & Triggers",
        "Automated Purchase Order & Invoice PDF Generation via jsPDF",
        "Interactive Real-Time Financial Telemetry Charts via Chart.js",
        "Strict End-to-End Type Safety & Data Validation with Zod",
      ],
      terminal: {
        header: "PROCUREMENT_CORE",
        version: "POSTGRESQL v16",
        logs: [
          "# Workflow: Purchase Order Stream",
          "> Auth: Supabase RLS Protected",
          "> PDF Engine: Auto-Invoicing Active",
          "> Analytics: Chart.js Telemetry",
        ],
        stats: [
          { label: "DATABASE", value: "Supabase PG", color: "text-[#FFFF55]" },
          { label: "VALIDATION", value: "Zod Schema", color: "text-[#55FFFF]" },
          { label: "ANALYTICS", value: "Chart.js", color: "text-[#55FF55]" },
          { label: "DOCS", value: "Auto-PDF", color: "text-[#FF5555]" },
        ],
      },
    },
    {
      id: "secure-guard",
      title: "SecureGuard — Sensitive Data Leakage Detection",
      category: "Cyber Security & AI Vulnerability Audit",
      description:
        "AI-assisted security auditing tool that scans codebase ZIP archives for exposed API keys, secrets, credentials, and PII, utilizing Groq & LLaMA 3.2 to eliminate false positives.",
      tags: [
        "Svelte 5",
        "SvelteKit",
        "AI / Groq SDK",
        "Three.js",
        "Ollama LLM",
        "Tailwind CSS",
        "JSZip",
        "Playwright",
      ],
      github: "https://github.com/lawrancewilliam/Mini-project",
      featured: true,
      longDesc:
        "SecureGuard is an automated cyber security auditing suite engineered with SvelteKit 2 and Svelte 5 runes. Developers upload codebase ZIP archives, which are unpacked in-browser with JSZip and evaluated using pattern heuristics and entropy analysis. Findings are processed by a multi-layered AI engine using Groq SDK and LLaMA 3.2 to distinguish authentic secrets from false positives, paired with interactive 3D threat mapping in Three.js and automated PDF audit report generation.",
      metrics: [
        "Multi-Layered AI Classifier (Groq / LLaMA 3.2) for False Positive Filtering",
        "In-Browser ZIP Parsing & Entropy-Based Secret Scanning via JSZip",
        "Interactive 3D Threat Graph & Node Mapping with Three.js",
        "Comprehensive Security Audit PDF Export & Playwright Regression Tests",
      ],
      terminal: {
        header: "SECURE_GUARD_AI",
        version: "GROQ LLM v1.6",
        logs: [
          "# Scanning: Codebase ZIP Archive",
          "> Heuristics: Regex & Entropy Scan",
          "> AI Classifier: Groq LLaMA-3.2",
          "> Report: Audit PDF Generated",
        ],
        stats: [
          { label: "AI MODEL", value: "LLaMA 3.2", color: "text-[#55FF55]" },
          { label: "3D NODES", value: "Three.js", color: "text-[#55FFFF]" },
          { label: "AUDIT", value: "Zero False Pos", color: "text-[#FFFF55]" },
          { label: "TESTING", value: "Playwright", color: "text-[#FF5555]" },
        ],
      },
    },
    {
      id: "learnify",
      title: "Learnify — Interactive E-Learning & LMS",
      category: "Full-Stack Educational Platform",
      description:
        "Full-featured Learning Management System built with native PHP and relational MySQL, featuring asynchronous progress tracking, automated quizzes, and dynamic certificate issuance.",
      tags: [
        "PHP",
        "MySQL",
        "JavaScript",
        "AJAX",
        "HTML5",
        "CSS3",
        "Apache",
      ],
      github: "https://github.com/Kishore1700/Learnify",
      featured: true,
      longDesc:
        "Learnify is a full-featured e-learning management platform engineered with native object-oriented PHP and MySQL (eduspring_db). Students navigate structured learning pathways in Python, Java, and Full-Stack Development. The platform leverages asynchronous AJAX APIs for instantaneous progress saving without page reloads, an automated quiz assessment system with pass/fail evaluation, and dynamic personalized completion certificate generation.",
      metrics: [
        "Relational Database Architecture (eduspring_db) with Cascading Integrity",
        "Asynchronous Module Progress Tracking via JavaScript AJAX APIs",
        "Automated Assessment Grading Engine with Pass/Fail Algorithms",
        "Dynamic Personalized Completion Certificate Generation & PDF Export",
      ],
      terminal: {
        header: "LEARNIFY_LMS",
        version: "PHP 8.2 / MYSQL",
        logs: [
          "# User: Session Authenticated",
          "> Track: Python, Java & Web Dev",
          "> Assessment: Automated Quiz Engine",
          "> Certificate: Dynamic SVG/PDF",
        ],
        stats: [
          { label: "BACKEND", value: "PHP 8.2 OOP", color: "text-[#AA00AA]" },
          { label: "DATABASE", value: "MySQL RDBMS", color: "text-[#FFFF55]" },
          { label: "ASYNC", value: "AJAX APIs", color: "text-[#55FFFF]" },
          { label: "OUTCOME", value: "Certificates", color: "text-[#55FF55]" },
        ],
      },
    },
    {
      id: "image-upscaler",
      title: "Super-Resolution AI Image Upscaler",
      category: "Computer Vision & Deep Learning",
      description:
        "Deep learning computer vision system that upscales low-resolution imagery up to 4x, reconstructing lost high-frequency textures, sharpening edges, and reducing compression artifacts.",
      tags: [
        "Python",
        "OpenCV",
        "Deep Learning",
        "TensorFlow / PyTorch",
        "CNNs",
        "NumPy",
      ],
      github: "https://github.com/Kishore1700/image-upscaler",
      featured: true,
      longDesc:
        "A super-resolution neural network application designed to enhance degraded or low-resolution images without blur. Powered by deep convolutional neural networks and OpenCV image tensor pipelines, the model performs feature extraction, sub-pixel convolution upsampling, and perceptual loss minimization to produce sharp, photorealistic 4K outputs suitable for gaming, archival restoration, and web performance.",
      metrics: [
        "4x Neural Super-Resolution Upscaling with Texture Reconstruction",
        "Perceptual Loss Optimization for Sharp Edge Preservation",
        "High-Throughput OpenCV Batch Image Tensor Preprocessing",
        "Multi-Format Support (PNG, JPEG, WebP) with Lossless Export",
      ],
      terminal: {
        header: "AI_UPSCALER_CV",
        version: "NEURAL NET v4.0",
        logs: [
          "# Input: low_res_input.png",
          "> Preprocessing: Bilinear Normalized",
          "> Inference: Super-Resolution Net",
          "> Output: 4X Enhanced 4K Texture",
        ],
        stats: [
          { label: "SCALE", value: "4X Upscale", color: "text-[#55FFFF]" },
          { label: "VISION", value: "OpenCV Core", color: "text-[#55FF55]" },
          { label: "PRECISION", value: "High PSNR", color: "text-[#FFFF55]" },
          { label: "ACCEL", value: "GPU Accelerated", color: "text-[#FF5555]" },
        ],
      },
    },
    {
      id: "campus-repository",
      title: "CampusRepo — Academic Project Hub",
      category: "Academic Management & Cloud Platform",
      description:
        "Academic project management and showcase repository designed with Svelte 5, SvelteKit, and Firebase, featuring secure bcryptjs/JWT authentication and real-time Firestore synchronization.",
      tags: [
        "Svelte 5",
        "SvelteKit",
        "Firebase",
        "Firestore",
        "Tailwind CSS",
        "JWT",
        "bcryptjs",
      ],
      github: "https://github.com/lawrancewilliam/Campus-repo",
      featured: true,
      longDesc:
        "CampusRepo is a modern, responsive web application designed for students and administrators to manage, showcase, and explore academic projects. Built with Svelte 5 runes, SvelteKit SSR, and Tailwind CSS v4, it features secure login handling with bcryptjs password hashing and JWTs in HTTP-only cookies, combined with Firebase Firestore and Cloud Storage for real-time submission indexing and asset storage.",
      metrics: [
        "Secure Authentication with bcryptjs Hashing & HTTP-Only JWT Cookies",
        "Real-Time Cloud Firestore Project Indexing & Tag Filtering",
        "Cloud Storage Asset Upload Pipeline with Size & MIME Verification",
        "Comprehensive Student Workspace & Administrative Review Panels",
      ],
      terminal: {
        header: "CAMPUS_REPO",
        version: "SVELTE v5.0",
        logs: [
          "# Auth: HTTP-Only Cookie Verified",
          "> Database: Cloud Firestore Online",
          "> Storage: Project Files Synced",
          "> Role: Student / Admin Access",
        ],
        stats: [
          { label: "DATABASE", value: "Firestore", color: "text-[#FFFF55]" },
          { label: "AUTH", value: "JWT + bcrypt", color: "text-[#55FF55]" },
          { label: "ROUTING", value: "SvelteKit SSR", color: "text-[#55FFFF]" },
          { label: "STORAGE", value: "Cloud Storage", color: "text-[#FF5555]" },
        ],
      },
    },
    {
      id: "minecraft-portfolio",
      title: "Retro 3D WebGL Minecraft Portfolio",
      category: "Interactive WebGL & Creative Engineering",
      description:
        "Hardware-accelerated WebGL 3D voxel portfolio showcasing authentic perspective projection, 8-bit Web Audio synthesizer, procedural multi-biome backgrounds, and an OLED deep-black theme.",
      tags: [
        "Svelte 5",
        "WebGL",
        "GLSL Shaders",
        "Tailwind CSS v4",
        "Web Audio API",
        "Vite",
      ],
      github: "https://github.com/Kishore1700/portfolio",
      featured: true,
      longDesc:
        "A gamified developer portfolio engineered with Svelte 5 and raw WebGL shaders. Features an interactive 3D voxel block with true perspective projection, backface culling, 3-tier Minecraft isometric lighting, and interactive spin controls. Powered by an 8-bit audio synthesizer built with the Web Audio API, procedural canvas backgrounds reacting to scroll velocity, and an OLED true-black aesthetic.",
      metrics: [
        "Native WebGL 3D Hardware-Accelerated Shaders (38° Perspective FOV)",
        "Procedural Multi-Biome Canvas Backgrounds (Overworld, Nether, The End)",
        "Zero-Asset Web Audio API 8-Bit Retro Sound Synthesizer",
        "Zero-Warning Vite 8 & Oxlint Production Performance Architecture",
      ],
      terminal: {
        header: "VOXEL_RENDERER",
        version: "GLSL 3D ENGINE",
        logs: [
          "# Viewport: Hardware WebGL 60FPS",
          "> Shaders: Perspective FOV 38deg",
          "> Lighting: Minecraft 3-Tier Isometric",
          "> Sound: Synthesizer Active",
        ],
        stats: [
          { label: "3D ENGINE", value: "Pure WebGL", color: "text-[#55FF55]" },
          { label: "FRAMEWORK", value: "Svelte 5 Runes", color: "text-[#55FFFF]" },
          { label: "THEME", value: "OLED Pitch Black", color: "text-[#FFFF55]" },
          { label: "AUDIO", value: "Web Audio Synth", color: "text-[#FF5555]" },
        ],
      },
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
            <div
              class="mc-slot p-5 font-mono text-xs text-slate-300 space-y-4 bg-[#040507] border-2 border-black"
            >
              <div
                class="flex items-center justify-between border-b-2 border-black pb-2"
              >
                <span class="text-[#FF5555] font-pixel text-[10px] flex items-center gap-1.5">
                  <Flame class="w-3.5 h-3.5 text-[#FF5555]" /> {project.terminal.header}
                </span>
                <span class="text-[#FFFF55] text-[9px] font-silkscreen">{project.terminal.version}</span>
              </div>
              <div class="space-y-1 font-silkscreen text-[11px]">
                {#each project.terminal.logs as log}
                  <p class={log.startsWith('#') ? 'text-slate-500' : 'text-[#55FF55]'}>
                    {log}
                  </p>
                {/each}
              </div>
              <div
                class="border-t-2 border-black pt-3 mt-2 grid grid-cols-2 gap-2 font-mono text-[11px]"
              >
                {#each project.terminal.stats as st}
                  <div class="mc-slot p-2 bg-[#090a0f]">
                    <p class="text-[9px] text-slate-400 font-silkscreen">{st.label}</p>
                    <p class="font-bold {st.color}">{st.value}</p>
                  </div>
                {/each}
              </div>
            </div>
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
