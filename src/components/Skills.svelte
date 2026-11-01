<script>
  import { ShieldAlert, Cpu, Database, Wrench } from "lucide-svelte";

  const skillCategories = [
    {
      categoryName: 'ENCHANTMENTS: LANGUAGES',
      icon: Wrench,
      accentColor: 'text-[#55FF55]',
      skills: [
        { name: 'Python', percentage: 90, tier: 'Lvl 90' },
        { name: 'Java', percentage: 80, tier: 'Lvl 80' },
        { name: 'C', percentage: 75, tier: 'Lvl 75' },
        { name: 'JavaScript', percentage: 80, tier: 'Lvl 80' },
      ],
    },
    {
      categoryName: 'CRAFTING: FRONTEND / WEB',
      icon: Cpu,
      accentColor: 'text-[#55FFFF]',
      skills: [
        { name: 'HTML', percentage: 90, tier: 'Lvl 90' },
        { name: 'CSS', percentage: 85, tier: 'Lvl 85' },
        { name: 'Svelte', percentage: 85, tier: 'Lvl 85' },
      ],
    },
    {
      categoryName: 'REDSTONE: DATABASES',
      icon: Database,
      accentColor: 'text-[#FF5555]',
      skills: [
        { name: 'SQL', percentage: 85, tier: 'Lvl 85' },
        { name: 'MongoDB', percentage: 75, tier: 'Lvl 75' },
      ],
    },
    {
      categoryName: 'BEDROCK: CORE CS',
      icon: ShieldAlert,
      accentColor: 'text-[#FFFF55]',
      skills: [
        { name: 'DSA', percentage: 80, tier: 'Lvl 80' },
        { name: 'OOPS Concepts', percentage: 85, tier: 'Lvl 85' },
        { name: 'OS Concepts', percentage: 80, tier: 'Lvl 80' },
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
