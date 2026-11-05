<script>
  import { Cpu, CheckCircle2, Zap, GraduationCap, Calendar, MapPin } from "lucide-svelte";

  const internResponsibilities = [
    "Completed intensive engineering internship focused on Internet of Things (IoT) applications.",
    "Programmed device functions, input mapping, and board routines using Arduino microcontroller boards.",
    "Integrated hardware sensors and analog signals to coordinate reliable hardware-software connectivity.",
    "Tested communication protocols and real-time data retrieval frameworks in embedded environments."
  ];

  const educationTimeline = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Sona College of Technology",
      period: "2025 — 2027",
      location: "Salem, Tamil Nadu",
      score: "CGPA: 7.6 / 10",
      desc: "Pursuing master level software engineering education. Specializing in advanced data structures & algorithms, distributed systems, relational database modeling, and software architecture."
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Sona College of Arts & Science",
      period: "2022 — 2025",
      location: "Salem, Tamil Nadu",
      score: "CGPA: 6.9 / 10",
      desc: "Acquired core competencies in computer science fundamentals, programming logic, database management systems, and modern web application development."
    },
    {
      degree: "Higher Secondary Certificate (HSC - Class 12)",
      institution: "Sarada Balamandir Higher Secondary School",
      period: "2021 — 2022",
      location: "Salem, Tamil Nadu",
      score: "Score: 69%",
      desc: "Focused on scientific and mathematical coursework, developing strong analytical thinking and quantitative reasoning foundations."
    },
    {
      degree: "Secondary School Leaving Certificate (SSLC - Class 10)",
      institution: "Sarada Balamandir Higher Secondary School",
      period: "2019 — 2020",
      location: "Salem, Tamil Nadu",
      score: "Score: 52%",
      desc: "General secondary education laying mathematical and scientific fundamentals."
    }
  ];
</script>

<!-- EXPERIENCE & INTERNSHIP SECTION -->
<section id="experience" class="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#14161F] select-none">
  <div class="max-w-7xl mx-auto space-y-8">
    
    <div class="space-y-1">
      <div class="font-mono-cyber text-[10px] text-[#FF2A2A] font-bold tracking-widest uppercase">
        FIELD EXPERIENCE
      </div>
      <h2 class="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
        Engineering Internship
      </h2>
      <p class="font-sans-cyber text-xs text-slate-400 max-w-xl">
        Embedded hardware integration, sensor protocols, and edge telemetry execution.
      </p>
    </div>

    <!-- Odugaa Tech Card -->
    <div class="cyber-card p-6 sm:p-8 space-y-6 !border-[#1F222E]">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1C23] pb-5">
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-12 bg-[#050608] border border-[#FF2A2A]/40 flex items-center justify-center text-[#FF2A2A]">
            <Cpu class="w-6 h-6" />
          </div>
          <div>
            <h3 class="font-display font-bold text-xl text-white">
              ODUGAA TECH
            </h3>
            <div class="font-mono-cyber text-xs text-[#00E5FF] font-bold tracking-wider uppercase mt-0.5">
              IoT ENGINEERING INTERN
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:items-end font-mono-cyber text-[10px]">
          <span class="px-2.5 py-1 bg-black border border-[#1A1C23] text-[#FFD600] font-bold">
            JUN 2025 — AUG 2025
          </span>
          <span class="text-[#00FF66] flex items-center gap-1 mt-1 text-[9px]">
            <Zap class="w-3 h-3" />
            <span>EMBEDDED HARDWARE CERTIFIED</span>
          </span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <!-- Responsibilities -->
        <div class="lg:col-span-7 space-y-4 font-sans-cyber text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            During my tenure at Odugaa Tech, I was actively immersed in embedded hardware integration and data communication schemas, coding functional routines for local and cloud environments.
          </p>

          <div class="space-y-2.5 font-mono-cyber text-xs text-slate-300">
            {#each internResponsibilities as resp}
              <div class="flex items-start gap-2.5 p-2 bg-[#050608] border border-[#14161F]">
                <CheckCircle2 class="w-4 h-4 text-[#00FF66] shrink-0 mt-0.5" />
                <span>{resp}</span>
              </div>
            {/each}
          </div>
        </div>

        <!-- Telemetry Diagnostics Readout -->
        <div class="lg:col-span-5 flex justify-center">
          <div class="w-full max-w-[300px] cyber-card p-4 font-mono-cyber text-[10px] space-y-3 bg-[#050608]">
            <div class="flex justify-between items-center text-[#FFD600] border-b border-[#1A1C23] pb-2 text-[9px]">
              <span>HARDWARE_DIAGNOSTICS</span>
              <span class="text-[#00FF66] flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-ping"></span>
                ACTIVE
              </span>
            </div>

            <div class="space-y-1.5 py-1">
              <div class="flex justify-between text-slate-400">
                <span>VOLTAGE_RAIL:</span>
                <span class="text-white font-bold">5.0V [STABLE]</span>
              </div>
              <div class="flex justify-between text-slate-400">
                <span>SIGNAL_ANALOG_A0:</span>
                <span class="text-[#00E5FF] font-bold">1023 [MAX_INT]</span>
              </div>
              <div class="flex justify-between text-slate-400">
                <span>SERIAL_STREAM:</span>
                <span class="text-[#00FF66] font-bold">9600 BAUD [OK]</span>
              </div>
              <div class="flex justify-between text-slate-400">
                <span>MCU_CORE:</span>
                <span class="text-white font-bold">ATmega328P</span>
              </div>
            </div>

            <div class="pt-2 border-t border-[#1A1C23] text-slate-500 text-[8px] flex justify-between">
              <span>BOARD: ARDUINO UNO</span>
              <span>PROTOCOL: UART</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>

<!-- ACADEMIC EDUCATION SECTION -->
<section id="education" class="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#14161F] select-none">
  <div class="max-w-7xl mx-auto space-y-8">
    
    <div class="space-y-1">
      <div class="font-mono-cyber text-[10px] text-[#FF2A2A] font-bold tracking-widest uppercase">
        ACADEMIC RECORDS
      </div>
      <h2 class="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
        Education Timeline
      </h2>
      <p class="font-sans-cyber text-xs text-slate-400 max-w-xl">
        Curriculum milestones in computer applications, system methodologies, and software science.
      </p>
    </div>

    <!-- Education Timeline Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      {#each educationTimeline as edu}
        <div class="cyber-card p-5 flex flex-col justify-between group space-y-3">
          <div class="space-y-2">
            <div class="flex items-center justify-between font-mono-cyber text-[10px]">
              <span class="px-2 py-0.5 bg-black border border-[#1A1C23] text-[#FFD600] flex items-center gap-1">
                <Calendar class="w-3 h-3 text-slate-400" />
                {edu.period}
              </span>
              <span class="text-[#00FF66] font-bold">{edu.score}</span>
            </div>

            <h3 class="font-display font-bold text-base text-white group-hover:text-[#FF2A2A] transition-colors">
              {edu.degree}
            </h3>

            <div class="font-mono-cyber text-xs text-[#00E5FF] flex items-center gap-1.5">
              <GraduationCap class="w-3.5 h-3.5" />
              <span>{edu.institution}</span>
              <span class="text-slate-500">&bull; {edu.location}</span>
            </div>

            <p class="font-sans-cyber text-xs text-slate-300 leading-relaxed pt-1">
              {edu.desc}
            </p>
          </div>
        </div>
      {/each}
    </div>

  </div>
</section>
