<script>
  import { ShieldAlert, Cpu, Database, Wrench } from "lucide-svelte";

  const skillCategories = [
    {
      categoryName: 'ENCHANTMENTS: LANGUAGES',
      icon: Wrench,
      accentColor: 'text-[#55FF55]',
      skills: [
        { name: 'Python', percentage: 90, tier: 'Lvl 90' },
        { name: 'JavaScript & TypeScript', percentage: 90, tier: 'Lvl 90' },
        { name: 'PHP (Object-Oriented)', percentage: 85, tier: 'Lvl 85' },
        { name: 'Java & C', percentage: 80, tier: 'Lvl 80' },
      ],
    },
    {
      categoryName: 'CRAFTING: FRONTEND & 3D WEB',
      icon: Cpu,
      accentColor: 'text-[#55FFFF]',
      skills: [
        { name: 'Svelte 5 & SvelteKit', percentage: 92, tier: 'Lvl 92' },
        { name: 'Tailwind CSS v4 & DaisyUI', percentage: 90, tier: 'Lvl 90' },
        { name: 'WebGL & Three.js (3D)', percentage: 85, tier: 'Lvl 85' },
        { name: 'HTML5, CSS3 & AJAX APIs', percentage: 92, tier: 'Lvl 92' },
      ],
    },
    {
      categoryName: 'REDSTONE: DATABASES & CLOUD',
      icon: Database,
      accentColor: 'text-[#FF5555]',
      skills: [
        { name: 'PostgreSQL & Supabase (RLS)', percentage: 88, tier: 'Lvl 88' },
        { name: 'MySQL (Relational Schema)', percentage: 85, tier: 'Lvl 85' },
        { name: 'Firebase Firestore & Storage', percentage: 84, tier: 'Lvl 84' },
        { name: 'Serverless DB & REST APIs', percentage: 82, tier: 'Lvl 82' },
      ],
    },
    {
      categoryName: 'ANVIL: AI, SECURITY & TOOLING',
      icon: ShieldAlert,
      accentColor: 'text-[#FFFF55]',
      skills: [
        { name: 'AI & LLMs / OpenCV (Vision)', percentage: 86, tier: 'Lvl 86' },
        { name: 'Cyber Security (Secrets, JWT, bcrypt)', percentage: 85, tier: 'Lvl 85' },
        { name: 'Playwright & Zod Validation', percentage: 82, tier: 'Lvl 82' },
        { name: 'Git, GitHub, Vite & jsPDF', percentage: 88, tier: 'Lvl 88' },
      ],
    },
  ];
</script>

<section id="skills" class="relative py-20 px-4 overflow-hidden">
  <div class="max-w-7xl mx-auto z-10 relative">
    
    <!-- Section Heading -->
    <div class="text-center mb-14">
      <h2 class="font-pixel text-2xl sm:text-3xl text-[#FFFF55] mc-text-shadow-gold mb-3">
        SKILLS & ABILITIES
      </h2>
      <div class="h-1 w-24 bg-[#55FF55] mx-auto border border-black shadow-[0_0_8px_#55FF55]"></div>
    </div>

    <!-- Skills Minecraft Chest Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {#each skillCategories as cat}
        {@const CategoryIcon = cat.icon}
        <div
          class="mc-container p-6 bg-[#0c0d12] flex flex-col justify-between"
        >
          <h3 class="font-pixel text-xs sm:text-sm text-[#FFFF55] mc-text-shadow-gold mb-6 text-left border-b-2 border-black pb-3 flex items-center gap-2">
            <CategoryIcon class="w-4 h-4 {cat.accentColor}" />
            <span>{cat.categoryName}</span>
          </h3>

          <div class="space-y-5">
            {#each cat.skills as skill}
              <div class="mc-slot p-3 bg-[#040507] hover:border-[#55FF55] transition-all mc-enchanted">
                <div class="flex justify-between items-center text-xs font-silkscreen mb-2">
                  <span class="text-slate-100 flex items-center gap-2">
                    <span class="w-2 h-2 bg-[#55FF55] shadow-[0_0_6px_#55FF55]"></span>
                    {skill.name}
                  </span>
                  <span class="text-[#FFFF55] font-mono bg-[#000000] px-1.5 py-0.5 border border-black shadow-inner">
                    {skill.tier} ({skill.percentage}%)
                  </span>
                </div>

                <!-- Minecraft XP Level Bar -->
                <div class="mc-xp-container h-3">
                  <div
                    class="mc-xp-fill"
                    style="width: {skill.percentage}%"
                  ></div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
