<script>
  import { GraduationCap, Briefcase, Award, Calendar, MapPin, CheckCircle2 } from "lucide-svelte";
</script>

<section id="experience" class="relative py-20 border-t border-[#14151e] bg-[#000000] overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    
    <!-- Section Technical Index Heading -->
    <div class="mb-10 sm:mb-12">
      <div class="font-mono text-xs text-slate-500 mb-1 flex items-center gap-2">
        <span class="text-[#FF2A2A] font-bold">// 04.00</span>
        <span>OPERATIONAL TIMELINE & CREDENTIALS [04/05]</span>
      </div>
      <div class="font-mono text-[10px] text-[#FF2A2A] tracking-wider uppercase font-bold mb-1">
        CAREER PROGRESSION
      </div>
      <h2 class="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
        Education & Experience
      </h2>
      <p class="font-mono text-xs text-slate-400 mt-2 max-w-2xl">
        Academic rigor at Sona College of Technology, verified software engineering experience, and technical milestones.
      </p>
      <div class="h-[2px] w-24 bg-[#FF2A2A] mt-3 shadow-[0_0_12px_#FF2A2A]"></div>
    </div>

    <!-- Timeline Grid: 2 Columns (Education & Experience) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      <!-- COLUMN 1: Academic Credentials -->
      <div class="space-y-6">
        <div class="flex items-center gap-2 pb-3 border-b border-[#1a1b24] font-mono text-xs text-cyan-400 font-bold">
          <GraduationCap class="w-4 h-4 text-cyan-400" />
          <span>ACADEMIC FOUNDATION</span>
        </div>

        <!-- MCA Card -->
        <div class="bg-[#050608] border border-[#1b1c28] p-6 hover:border-cyan-400 transition-colors group">
          <div class="flex items-center justify-between font-mono text-[10px] text-slate-500 pb-2 mb-2 border-b border-[#161722]">
            <span class="text-[#00FF66] font-bold">IN PROGRESS &bull; MASTER LEVEL</span>
            <span>2024 &ndash; PRESENT</span>
          </div>

          <h3 class="font-display font-bold text-xl text-white group-hover:text-cyan-400 transition-colors">
            Master of Computer Applications (MCA)
          </h3>
          <div class="font-mono text-xs text-[#FF2A2A] mt-0.5 mb-3">
            Sona College of Technology, Salem, Tamil Nadu
          </div>

          <p class="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            Master's level software engineering curriculum focusing on enterprise computing, distributed systems, structural database modeling, and algorithmic design patterns.
          </p>

          <div class="flex flex-wrap gap-1.5 pt-2 border-t border-[#161722]">
            <span class="font-mono text-[9px] px-2 py-0.5 bg-[#0a0c14] text-cyan-400 border border-[#1d2130]">Data Structures</span>
            <span class="font-mono text-[9px] px-2 py-0.5 bg-[#0a0c14] text-cyan-400 border border-[#1d2130]">System Design</span>
            <span class="font-mono text-[9px] px-2 py-0.5 bg-[#0a0c14] text-cyan-400 border border-[#1d2130]">Advanced DBMS</span>
            <span class="font-mono text-[9px] px-2 py-0.5 bg-[#0a0c14] text-cyan-400 border border-[#1d2130]">Software Engineering</span>
          </div>
        </div>

        <!-- Undergraduate Card -->
        <div class="bg-[#050608] border border-[#1b1c28] p-6 hover:border-slate-500 transition-colors">
          <div class="flex items-center justify-between font-mono text-[10px] text-slate-500 pb-2 mb-2 border-b border-[#161722]">
            <span class="text-slate-400">BACHELOR DEGREE</span>
            <span>GRADUATED</span>
          </div>

          <h3 class="font-display font-bold text-lg text-white">
            Bachelor of Computer Applications (BCA)
          </h3>
          <div class="font-mono text-xs text-slate-400 mt-0.5 mb-2">
            Foundations of Computing & Software Design
          </div>

          <p class="font-sans text-xs text-slate-300 leading-relaxed">
            Rigorous grounding in object-oriented programming, relational databases, web development, and mathematical logic.
          </p>
        </div>
      </div>

      <!-- COLUMN 2: Experience & Certifications -->
      <div class="space-y-6">
        <div class="flex items-center gap-2 pb-3 border-b border-[#1a1b24] font-mono text-xs text-[#FF2A2A] font-bold">
          <Briefcase class="w-4 h-4 text-[#FF2A2A]" />
          <span>EXPERIENCE & CERTIFICATIONS</span>
        </div>

        <!-- Professional Internship Card -->
        <div class="bg-[#050608] border border-[#1b1c28] p-6 hover:border-[#FF2A2A] transition-colors group">
          <div class="flex items-center justify-between font-mono text-[10px] text-slate-500 pb-2 mb-2 border-b border-[#161722]">
            <span class="text-[#FF2A2A] font-bold">PROFESSIONAL INTERNSHIP</span>
            <span>VERIFIED</span>
          </div>

          <h3 class="font-display font-bold text-xl text-white group-hover:text-cyan-400 transition-colors">
            Software Development Intern
          </h3>
          <div class="font-mono text-xs text-slate-400 mt-0.5 mb-3">
            Full-Stack Engineering & System Workflows
          </div>

          <p class="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            Hands-on software development involving REST API endpoint construction, database query optimization, UI integration, and collaborative version control using Git.
          </p>

          <div class="flex flex-wrap gap-1.5 pt-2 border-t border-[#161722]">
            <span class="font-mono text-[9px] px-2 py-0.5 bg-[#0a0c14] text-white border border-[#1d2130]">Full-Stack Web</span>
            <span class="font-mono text-[9px] px-2 py-0.5 bg-[#0a0c14] text-white border border-[#1d2130]">API Integration</span>
            <span class="font-mono text-[9px] px-2 py-0.5 bg-[#0a0c14] text-white border border-[#1d2130]">Git Collaboration</span>
          </div>
        </div>

        <!-- Certifications Matrix -->
        <div class="bg-[#050608] border border-[#1b1c28] p-6 hover:border-[#00FF66] transition-colors">
          <div class="flex items-center gap-2 pb-2 mb-3 border-b border-[#161722] font-mono text-xs text-[#00FF66] font-bold">
            <Award class="w-4 h-4" />
            <span>TECHNICAL PROFICIENCY & CERTIFICATIONS</span>
          </div>

          <div class="space-y-3 font-mono text-xs">
            <div class="flex items-center justify-between p-2.5 bg-[#08090e] border border-[#181a24]">
              <span class="text-white">Python Backend & Scripting</span>
              <span class="text-[#00FF66] text-[10px]">VERIFIED</span>
            </div>
            <div class="flex items-center justify-between p-2.5 bg-[#08090e] border border-[#181a24]">
              <span class="text-white">Java Object-Oriented Programming</span>
              <span class="text-[#00FF66] text-[10px]">VERIFIED</span>
            </div>
            <div class="flex items-center justify-between p-2.5 bg-[#08090e] border border-[#181a24]">
              <span class="text-white">Data Structures & Problem Solving</span>
              <span class="text-cyan-400 text-[10px]">CORE MASTERY</span>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
</section>
