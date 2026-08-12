<script>
  import { Cpu, CheckCircle2, Zap } from "lucide-svelte";

  const responsibilities = [
    "Completed intensive internship focused on Internet of Things (IoT) applications.",
    "Programmed device functions, input mapping, and board routines using Arduino boards.",
    "Integrated sensors and analog signals to coordinate hardware-software connectivity.",
    "Tested communication protocols and data retrieval frameworks in real-time environments.",
  ];
</script>

<section id="internship" class="relative py-24 px-4 overflow-hidden">
  <div class="max-w-7xl mx-auto z-10 relative">
    <!-- Section Heading -->
    <div class="text-center mb-16">
      <h2
        class="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2"
      >
        INTERNSHIP EXPERIENCE
      </h2>
      <div
        class="h-[3px] w-[80px] bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"
      ></div>
    </div>

    <div
      class="max-w-4xl mx-auto rounded-3xl glassmorphism border border-white/10 p-6 sm:p-10 hover:border-purple-500/20 transition-all duration-300 relative overflow-hidden group"
    >
      <!-- Subtle Ambient Background Gradient -->
      <div
        class="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none group-hover:bg-purple-500/20 transition-all"
      ></div>

      <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-6 mb-8 text-left"
      >
        <div class="flex items-center gap-4">
          <div
            class="p-3.5 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20"
          >
            <Cpu class="w-6 h-6 animate-[spin_8s_linear_infinite]" />
          </div>
          <div>
            <h3
              class="font-display font-extrabold text-xl sm:text-2xl text-white"
            >
              Odugaa Tech
            </h3>
            <p
              class="text-purple-400 text-sm font-semibold tracking-wider uppercase font-mono"
            >
              IoT Engineering Intern
            </p>
          </div>
        </div>
        <div
          class="flex flex-col items-start md:items-end text-xs font-mono text-slate-500"
        >
          <span
            class="text-slate-400 font-bold px-2.5 py-1 rounded bg-white/5 border border-white/5"
          >
            Jun 2025 — Aug 2025
          </span>
          <span class="mt-1 flex items-center gap-1 text-cyan-400">
            <Zap class="w-3.5 h-3.5" /> Completed
          </span>
        </div>
      </div>

      <div
        class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left"
      >
        <!-- Responsibilities Details -->
        <div class="lg:col-span-7 space-y-4">
          <p class="text-slate-300 font-sans text-base leading-relaxed">
            During my tenure at Odugaa Tech, I was actively immersed in embedded
            hardware integration and data communication schemas. I focused on
            building interface components and coding functional routines for
            local and cloud environments.
          </p>
          <div class="space-y-3">
            {#each responsibilities as resp}
              <div
                class="flex items-start gap-3 text-slate-400 text-sm leading-relaxed"
              >
                <CheckCircle2 class="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{resp}</span>
              </div>
            {/each}
          </div>
        </div>

        <!-- Hardware Representation Graphic -->
        <div class="lg:col-span-5 relative flex justify-center">
          <div
            class="w-full max-w-[280px] aspect-[4/3] rounded-2xl bg-slate-950 border border-white/5 p-4 flex flex-col justify-between font-mono text-[10px] text-slate-400 shadow-inner select-none"
          >
            <div class="flex justify-between items-center text-slate-500">
              <span>ARDUINO_UNO_SDK</span>
              <span class="text-green-400 animate-pulse">● CONNECTED</span>
            </div>

            <!-- Visual hardware nodes -->
            <div class="flex flex-col gap-2 my-2 py-2 border-y border-white/5">
              <div class="flex justify-between items-center text-[9px]">
                <span class="text-purple-400">SYS_VOLTAGE:</span>
                <span class="text-slate-300">5.0V [STABLE]</span>
              </div>
              <div class="flex justify-between items-center text-[9px]">
                <span class="text-purple-400">ADC_PIN_A0:</span>
                <span class="text-cyan-400 font-bold">1023 [MAX]</span>
              </div>
              <div class="flex justify-between items-center text-[9px]">
                <span class="text-purple-400">SERIAL_STATUS:</span>
                <span class="text-emerald-400">STREAMING_OK</span>
              </div>
            </div>

            <div
              class="flex justify-between items-center text-[8px] text-slate-600"
            >
              <span>BOARD: ARDUINO_UNO</span>
              <span>RATE: 9600 bps</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
