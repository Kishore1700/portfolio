<script>
  const skillCategories = [
    {
      categoryName: 'Languages',
      skills: [
        { name: 'Python', percentage: 90 },
        { name: 'Java', percentage: 80 },
        { name: 'C', percentage: 75 },
        { name: 'JavaScript', percentage: 80 },
      ],
    },
    {
      categoryName: 'Frontend / Web',
      skills: [
        { name: 'HTML', percentage: 90 },
        { name: 'CSS', percentage: 85 },
        { name: 'Svelte', percentage: 85 },
      ],
    },
    {
      categoryName: 'Databases',
      skills: [
        { name: 'SQL', percentage: 85 },
        { name: 'MongoDB', percentage: 75 },
      ],
    },
    {
      categoryName: 'Core Computer Science',
      skills: [
        { name: 'DSA', percentage: 80 },
        { name: 'OOPS Concepts', percentage: 85 },
        { name: 'OS Concepts', percentage: 80 },
      ],
    },
  ];
</script>

<section id="skills" class="relative py-24 px-4 overflow-hidden">
  <div class="max-w-7xl mx-auto z-10 relative">
    
    <!-- Section Heading -->
    <div class="text-center mb-16">
      <h2 class="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2">
        SKILLS & ABILITIES
      </h2>
      <div class="h-[3px] w-[80px] bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
    </div>

    <!-- Skills Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {#each skillCategories as cat}
        <div
          class="p-6 sm:p-8 rounded-2xl glassmorphism border border-white/5 hover:border-blue-500/20 transition-all flex flex-col justify-between"
        >
          <h3 class="font-display font-bold text-xl text-cyan-400 mb-6 text-left border-b border-white/5 pb-3">
            {cat.categoryName}
          </h3>

          <div class="space-y-6">
            {#each cat.skills as skill}
              <div class="space-y-2">
                <div class="flex justify-between items-center text-sm">
                  <span class="font-sans font-medium text-slate-200">{skill.name}</span>
                  <span class="font-mono text-cyan-400">{skill.percentage}%</span>
                </div>

                <!-- Progress Bar Container -->
                <div class="h-2 w-full bg-slate-950/80 rounded-full overflow-hidden border border-white/5 relative">
                  <div
                    class="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
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
