<script>
  import { Cpu, CheckCircle2, Zap, Sparkles } from "lucide-svelte";

  const responsibilities = [
    "Completed intensive internship focused on Internet of Things (IoT) applications.",
    "Programmed device functions, input mapping, and board routines using Arduino boards.",
    "Integrated sensors and analog signals to coordinate hardware-software connectivity.",
    "Tested communication protocols and data retrieval frameworks in real-time environments.",
  ];
</script>

<section id="internship" class="relative py-20 px-4 overflow-hidden">
  <div class="max-w-7xl mx-auto z-10 relative">
    <!-- Section Heading -->
    <div class="text-center mb-14">
      <h2
        class="font-pixel text-2xl sm:text-3xl text-[#FFFF55] mc-text-shadow-gold mb-3"
      >
        INTERNSHIP ADVANCEMENT
      </h2>
      <div
        class="h-1 w-24 bg-[#55FF55] mx-auto border border-black shadow-[0_0_8px_#55FF55]"
      ></div>
    </div>

    <div
      class="max-w-4xl mx-auto mc-container p-6 sm:p-10 bg-[#0c0d12] relative overflow-hidden"
    >
      <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-black pb-6 mb-8 text-left"
      >
        <div class="flex items-center gap-4">
          <div
            class="p-3.5 mc-slot bg-[#040507] text-[#AA00AA]"
          >
            <Cpu class="w-6 h-6 text-[#AA00AA]" />
          </div>
          <div>
            <h3
              class="font-pixel text-lg sm:text-xl text-white mc-text-shadow"
            >
              ODUGAA TECH
            </h3>
            <p
              class="text-[#AA00AA] text-xs font-silkscreen font-bold tracking-wider uppercase"
            >
              IoT ENGINEERING INTERN
            </p>
          </div>
        </div>
        <div
          class="flex flex-col items-start md:items-end text-xs font-silkscreen"
        >
          <span
            class="text-[#FFFF55] font-bold px-3 py-1.5 mc-slot bg-[#000000] border border-black/80"
          >
            JUN 2025 — AUG 2025
          </span>
          <span class="mt-2 flex items-center gap-1 text-[#55FF55] text-[10px]">
            <Zap class="w-3.5 h-3.5" /> ADVANCEMENT UNLOCKED!
          </span>
        </div>
      </div>

      <div
        class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left"
      >
        <!-- Responsibilities Details -->
        <div class="lg:col-span-7 space-y-4">
          <p class="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
            During my tenure at Odugaa Tech, I was actively immersed in embedded
            hardware integration and data communication schemas. I focused on
            building interface components and coding functional routines for
            local and cloud environments.
          </p>
          <div class="space-y-3">
            {#each responsibilities as resp}
              <div
                class="flex items-start gap-3 text-slate-300 text-xs sm:text-sm leading-relaxed mc-slot p-2 bg-[#07080b]"
              >
                <CheckCircle2 class="w-4 h-4 text-[#55FF55] shrink-0 mt-0.5" />
                <span>{resp}</span>
              </div>
            {/each}
          </div>
        </div>

        <!-- Hardware Representation Graphic -->
        <div class="lg:col-span-5 relative flex justify-center">
          <div
            class="w-full max-w-[280px] mc-slot bg-[#040507] p-4 flex flex-col justify-between font-mono text-[10px] text-slate-400 select-none border-2 border-black"
          >
            <div class="flex justify-between items-center text-[#FFFF55] font-silkscreen text-[9px] border-b border-black pb-2">
              <span>REDSTONE_BOARD_SDK</span>
              <span class="text-[#55FF55]">● ACTIVE</span>
            </div>

            <!-- Visual hardware nodes -->
            <div class="flex flex-col gap-2 my-2 py-2 border-y border-black font-silkscreen">
              <div class="flex justify-between items-center text-[10px]">
                <span class="text-[#AA00AA]">POWER:</span>
                <span class="text-white">5.0V [STABLE]</span>
              </div>
              <div class="flex justify-between items-center text-[10px]">
                <span class="text-[#AA00AA]">SIGNAL_A0:</span>
                <span class="text-[#55FFFF]">1023 [MAX]</span>
              </div>
              <div class="flex justify-between items-center text-[10px]">
                <span class="text-[#AA00AA]">SERIAL:</span>
                <span class="text-[#55FF55]">STREAMING_OK</span>
              </div>
            </div>

            <div
              class="flex justify-between items-center text-[9px] text-slate-500 font-mono"
            >
              <span>BOARD: ARDUINO UNO</span>
              <span>BAUD: 9600</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
