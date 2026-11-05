<script>
  import CadTarget from "./CadTarget.svelte";

  const highlights = [
    {
      num: "01",
      role: "MCA Master Scholar",
      subtitle: "Degree in Progress &bull; Sona College of Technology",
      desc: "Pursuing master-level software engineering education. Rigorous foundation in structural computing principles, relational database design, and discrete mathematics.",
      tags: ["Data Structures", "System Design", "Database Modeling", "Software Engineering"]
    },
    {
      num: "02",
      role: "Backend & Systems Architect",
      subtitle: "Enterprise Logic &bull; Python & Java",
      desc: "Skilled in clean, efficient backend logic and asynchronous pipelines. Architecting modular microservices, RESTful APIs, and relational schemas that power enterprise systems.",
      tags: ["Python", "Java", "RESTful APIs", "OOP", "Database Design"]
    },
    {
      num: "03",
      role: "Algorithmic Precision & DSA",
      subtitle: "Problem Solver &bull; Algorithm Crafter",
      desc: "Passionate about structural data concepts, algorithm modeling, and Big-O computational complexity reduction to ensure predictable sub-50ms execution.",
      tags: ["Algorithms", "Complexity (Big O)", "Problem Solving", "Mathematical Logic"]
    }
  ];

  const strengths = [
    { name: "Teamwork", buff: "+20 Team Synergy", desc: "Collaborative sprint alignment & peer code reviews" },
    { name: "Adaptability", buff: "+25 Agility", desc: "Rapid adoption of emerging frameworks & protocols" },
    { name: "Active Listening", buff: "+18 Empathy", desc: "User-centric problem breakdown & requirement clarity" },
    { name: "Critical Thinking", buff: "+30 Logic", desc: "First-principles root cause analysis & debugging" },
    { name: "Web Designing", buff: "+22 UI Mastery", desc: "Pixel-perfect reactive interfaces in Svelte 5" },
    { name: "Exploring Tech", buff: "+28 Innovation", desc: "Continuous benchmarking of cutting-edge tooling" }
  ];

  let activeHighlight = $state(0);
  let selectedStrength = $state(null);
</script>

<section id="about" class="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#14161F] select-none">
  
  <div class="max-w-7xl mx-auto space-y-8">
    
    <!-- Section Top Telemetry Index (Matches Video frame_006: // 01.00 SEC_ABOUT INDEX) -->
    <div class="flex items-center justify-between font-mono-cyber text-[10px] text-slate-500 border-b border-[#14161F] pb-2">
      <span class="text-[#FF2A2A] font-bold tracking-wider">// 01.00 SEC_ABOUT INDEX [01/05]</span>
      <span class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse"></span>
        <span>STATUS: AUTONOMOUS_ACTIVE</span>
      </span>
    </div>

    <!-- Section Header Wrapped in CadTarget -->
    <CadTarget id="about-header" label="281 × 13">
      <div class="space-y-1">
        <div class="font-mono-cyber text-[10px] text-[#FF2A2A] tracking-widest uppercase font-bold flex items-center gap-2">
          <span>ENGINEER PROFILE</span>
          <span class="text-slate-600">//</span>
          <span class="text-slate-400">LVL 99 MCA SCHOLAR & FULLSTACK CRAFTER</span>
        </div>
        <h2 class="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
          Background & Philosophy
        </h2>
      </div>
    </CadTarget>

    <!-- 2-Column Split: Narrative on Left, 3 Architecture Highlights on Right -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <!-- LEFT 7 COLUMNS: Narrative, Quote Block, Strengths Matrix -->
      <div class="lg:col-span-7 space-y-5">
        
        <CadTarget id="about-bio" label="440 × 180">
          <div class="space-y-4 font-sans-cyber text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#050608] p-5 border border-[#161820]">
            <p>
              I am <strong class="text-white font-bold">Kishore P M</strong> &mdash; an independent full-stack engineer and software architect based in Salem, Tamil Nadu, India. My formal engineering education began with a <strong class="text-white">Bachelor of Computer Applications (BCA)</strong> from Sona College of Arts & Science, followed by pursuing my <strong class="text-[#00E5FF]">Master of Computer Applications (MCA)</strong> at <strong class="text-[#00E5FF]">Sona College of Technology</strong>.
            </p>

            <p>
              My defining capabilities were forged in the terminal: developing scalable backend services in <strong class="text-[#FF2A2A]">Python</strong> and <strong class="text-white">Java</strong>, architecting relational database models in <strong class="text-[#00FF66]">PostgreSQL & MySQL</strong>, and building responsive, reactive web applications with <strong class="text-[#00E5FF]">Svelte 5</strong>. I view software engineering not as framework assembly, but as the deliberate orchestration of memory hierarchies, clean APIs, and mathematical state machines.
            </p>

            <!-- Red Quotation Callout (Kishore's Exact Authentic Philosophy Quote) -->
            <blockquote class="p-3.5 bg-[#08090C] border-l-2 border-[#FF2A2A] text-slate-200 text-xs sm:text-sm font-sans-cyber leading-relaxed italic my-2">
              &ldquo;Like building enduring structures in Minecraft, software engineering requires a sturdy bedrock, efficient logic circuits, and a passion for crafting engaging experiences.&rdquo;
              <footer class="text-[10px] text-slate-400 font-mono-cyber not-italic mt-1 text-right">&mdash; Kishore P M</footer>
            </blockquote>

            <!-- Quick Academic Coordinates -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 font-mono-cyber text-[10px]">
              <div class="p-2.5 bg-[#08090C] border border-[#1F222E]">
                <span class="text-slate-500 uppercase block text-[9px]">MASTER'S DEGREE:</span>
                <span class="text-white font-bold block mt-0.5">MCA @ Sona College of Tech</span>
                <span class="text-[#00FF66]">CGPA: 7.6 / 10 &bull; 2025–2027</span>
              </div>
              <div class="p-2.5 bg-[#08090C] border border-[#1F222E]">
                <span class="text-slate-500 uppercase block text-[9px]">BACHELOR'S DEGREE:</span>
                <span class="text-white font-bold block mt-0.5">BCA @ Sona College of Arts</span>
                <span class="text-[#00E5FF]">CGPA: 6.9 / 10 &bull; 2022–2025</span>
              </div>
            </div>
          </div>
        </CadTarget>

        <!-- Strengths & RPG Telemetry Grid from Kishore's Old Portfolio -->
        <CadTarget id="about-strengths" label="440 × 140">
          <div class="p-4 bg-[#050608] border border-[#161820] space-y-3 font-mono-cyber">
            <div class="flex items-center justify-between text-[10px]">
              <span class="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span class="text-[#FF2A2A]">&bull;</span>
                <span>CORE ATTRIBUTES & CAPABILITIES</span>
              </span>
              <span class="text-[9px] text-slate-500">HOVER / CLICK TO INSPECT BUFF</span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {#each strengths as s}
                <button
                  type="button"
                  onclick={() => selectedStrength = (selectedStrength === s.name ? null : s.name)}
                  class="p-2 text-left bg-black border transition-all duration-200 {selectedStrength === s.name ? 'border-[#00E5FF] bg-[#00E5FF]/10' : 'border-[#1A1C23] hover:border-[#FF2A2A]/60'}"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-bold text-white truncate">{s.name}</span>
                    <span class="text-[8px] text-[#00FF66] font-bold">{s.buff}</span>
                  </div>
                  <div class="text-[8px] text-slate-400 line-clamp-1 mt-0.5">{s.desc}</div>
                </button>
              {/each}
            </div>

            {#if selectedStrength}
              <div class="text-[9px] text-[#00E5FF] bg-black p-2 border border-[#00E5FF]/40 animate-fade-in flex items-center justify-between">
                <span>ACTIVE BUFF: {strengths.find(s => s.name === selectedStrength)?.buff} &mdash; {strengths.find(s => s.name === selectedStrength)?.desc}</span>
                <button type="button" onclick={() => selectedStrength = null} class="text-slate-400 hover:text-white ml-2">[X]</button>
              </div>
            {/if}
          </div>
        </CadTarget>

      </div>

      <!-- RIGHT 5 COLUMNS: 3 Highlights Architecture Cards (Matches Video frame_006 Right Side) -->
      <div class="lg:col-span-5 space-y-3">
        
        <CadTarget id="about-pillars" label="360 × 260">
          <div class="space-y-3 font-mono-cyber">
            {#each highlights as h, i}
              <div
                class="cyber-card p-4 space-y-2 group transition-all duration-300 cursor-pointer {activeHighlight === i ? 'border-[#FF2A2A] bg-[#FF2A2A]/5' : 'hover:border-[#1F222E]'}"
                onclick={() => activeHighlight = i}
                onkeydown={(e) => { if (e.key === 'Enter') activeHighlight = i; }}
                tabindex="0"
                role="button"
              >
                <!-- Number & Title with Video's Exact Cyan Bounding Box Style on Hover/Active -->
                <div class="flex items-start justify-between">
                  <div class="flex items-center gap-2">
                    <span class="text-[#FF2A2A] font-bold text-xs">{h.num}.</span>
                    <div>
                      <h3 class="text-xs font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                        {h.role}
                      </h3>
                      <span class="text-[9px] text-slate-400 font-sans-cyber block">
                        {@html h.subtitle}
                      </span>
                    </div>
                  </div>
                  <span class="text-[8px] px-1.5 py-0.5 border {activeHighlight === i ? 'border-[#FF2A2A] text-[#FF2A2A]' : 'border-[#1A1C23] text-slate-500'}">
                    MODULE_{h.num}
                  </span>
                </div>

                <!-- Description -->
                <p class="text-[10px] text-slate-300 font-sans-cyber leading-relaxed pl-5">
                  {h.desc}
                </p>

                <!-- Tags Row -->
                <div class="pl-5 pt-1 flex flex-wrap gap-1 text-[8px]">
                  {#each h.tags as tag}
                    <span class="px-1.5 py-0.5 bg-black border border-[#1A1C23] text-slate-300 group-hover:border-[#00E5FF]/40 transition-colors">
                      {tag}
                    </span>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </CadTarget>

      </div>

    </div>

  </div>
</section>
