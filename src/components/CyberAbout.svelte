<script>
  // Exact 3 numbered architecture items as in video frame_006/frame_007
  const pillars = [
    {
      num: "01",
      title: "Sovereign Silicon",
      desc: "Zero reliance on third-party cloud wrappers or hosted black-box APIs. Models and execution loops execute natively on dedicated local hardware."
    },
    {
      num: "02",
      title: "First-Principles Architecture",
      desc: "Every layer built with deliberate necessity. No unnecessary dependency bloat or framework scaffolding."
    },
    {
      num: "03",
      title: "Axiomatic Verification",
      desc: "Autonomous systems must verify actions against deterministic ground-truth states before token generation or state mutation."
    }
  ];
</script>

<section id="about" class="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#14161F] select-none">
  
  <div class="max-w-7xl mx-auto space-y-8">
    
    <!-- Section Header (Exact as Video Frame_006) -->
    <div class="space-y-1">
      <div class="font-mono-cyber text-[10px] text-[#FF2A2A] tracking-widest uppercase font-bold">
        ENGINEER PROFILE
      </div>
      <h2 class="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
        Background & Philosophy
      </h2>
    </div>

    <!-- 2-Column Split (Exact Text & Layout from Video) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <!-- LEFT 7 COLUMNS: Narrative & Quote Block -->
      <div class="lg:col-span-7 space-y-4 font-sans-cyber text-xs sm:text-sm text-slate-300 leading-relaxed">
        <p>
          I am <strong class="text-white">Kishore P M</strong> — an independent system architect and full-stack engineer operating between Tamil Nadu and global developer ecosystems. My formal education began with a <strong class="text-white">Master of Computer Applications (MCA)</strong> from <strong class="text-white">Sona College of Technology</strong>.
        </p>

        <p>
          However, my defining capabilities were forged in the terminal: completely self-taught in machine learning architectures, Solidity smart contracts, Python microservices, and high-performance reactive web applications. I view software engineering not as framework assembly, but as the orchestration of physics, memory hierarchies, and game-theoretic incentives.
        </p>

        <!-- Red Quotation Callout (Word-for-Word from Video) -->
        <blockquote class="p-4 bg-[#08090C] border-l-2 border-[#FF2A2A] text-slate-200 text-xs sm:text-sm font-sans-cyber leading-relaxed italic my-4">
          "I design and deploy autonomous AI systems that operate 24/7 with persistent memory, multi-agent orchestration, and continuous self-evolution — built from first principles, not frameworks."
        </blockquote>
      </div>

      <!-- RIGHT 5 COLUMNS: 3 Numbered Silicon Items (Matching Video Frame_006) -->
      <div class="lg:col-span-5 space-y-3 font-mono-cyber">
        {#each pillars as p}
          <div class="cyber-card p-3.5 space-y-1 group hover:border-[#FF2A2A] transition-colors">
            <div class="flex items-center gap-2">
              <span class="text-[#FF2A2A] font-bold text-xs">{p.num}</span>
              <h3 class="text-xs font-bold text-white group-hover:text-[#FF2A2A] transition-colors">
                {p.title}
              </h3>
            </div>
            <p class="text-[10px] text-slate-400 font-sans-cyber leading-relaxed pl-5">
              {p.desc}
            </p>
          </div>
        {/each}
      </div>

    </div>

  </div>
</section>
