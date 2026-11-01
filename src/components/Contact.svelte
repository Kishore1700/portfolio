<script>
  import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-svelte";
  import confetti from "canvas-confetti";

  let formData = $state({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  let status = $state("idle"); // 'idle' | 'submitting' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      status = "error";
      return;
    }

    status = "submitting";

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    status = "success";

    // Trigger confetti!
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#55FF55', '#55FFFF', '#FFFF55', '#AA00AA']
    });
  };

  const handleReset = () => {
    formData = { name: "", email: "", subject: "", message: "" };
    status = "idle";
  };
</script>

<section id="contact" class="relative py-20 px-4 overflow-hidden">
  <div class="max-w-7xl mx-auto z-10 relative">
    <!-- Section Heading -->
    <div class="text-center mb-14">
      <h2
        class="font-pixel text-2xl sm:text-3xl text-[#FFFF55] mc-text-shadow-gold mb-3"
      >
        CRAFT A MESSAGE
      </h2>
      <div
        class="h-1 w-24 bg-[#55FF55] mx-auto border border-black shadow-[0_0_8px_#55FF55]"
      ></div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
      <!-- Contact Details Column -->
      <div class="lg:col-span-5 flex flex-col justify-between gap-6 text-left">
        <div class="space-y-6">
          <h3 class="font-pixel text-lg text-white mc-text-shadow">
            LET'S CONNECT
          </h3>
          <p class="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
            Whether you have a project idea, a job opportunity, or just want to
            chat about Python, IoT, or Web Development, feel free to drop me a
            message!
          </p>

          <div class="space-y-4 pt-2">
            <!-- Email Card -->
            <div
              class="flex items-center gap-4 p-4 mc-container bg-[#0c0d12]"
            >
              <div
                class="p-3 mc-slot bg-[#040507] text-[#55FFFF]"
              >
                <Mail class="w-5 h-5" />
              </div>
              <div>
                <p class="text-[10px] text-[#FFFF55] font-silkscreen">EMAIL ADDRESS</p>
                <a
                  href="mailto:kishorekishorei170@gmail.com"
                  class="text-xs font-mono text-slate-200 hover:text-[#55FF55] transition-colors"
                >
                  kishorekishorei170@gmail.com
                </a>
              </div>
            </div>

            <!-- Location Card -->
            <div
              class="flex items-center gap-4 p-4 mc-container bg-[#0c0d12]"
            >
              <div
                class="p-3 mc-slot bg-[#040507] text-[#AA00AA]"
              >
                <MapPin class="w-5 h-5" />
              </div>
              <div>
                <p class="text-[10px] text-[#FFFF55] font-silkscreen">WORLD LOCATION</p>
                <p class="text-xs font-mono text-slate-200">
                  Salem, Tamil Nadu, India
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Micro Minecraft terminal box -->
        <div
          class="hidden lg:block p-4 mc-slot bg-[#040507] text-[10px] font-mono text-slate-400 space-y-1.5 border-2 border-black"
        >
          <div class="flex justify-between items-center text-[#55FF55] font-silkscreen">
            <span>SERVER_PING</span>
            <span>● 20ms [OK]</span>
          </div>
          <p class="text-slate-500">&gt; ping -c 2 github.com/Kishore1700</p>
          <p class="text-[#55FF55]">
            64 bytes from Kishore: bytes=64 time=0.04ms
          </p>
        </div>
      </div>

      <!-- Form Column -->
      <div class="lg:col-span-7">
        <div
          class="p-6 sm:p-8 mc-container bg-[#0c0d12] relative overflow-hidden"
        >
          {#if status === "success"}
            <div
              class="flex flex-col items-center justify-center text-center py-10 space-y-4"
            >
              <CheckCircle2 class="w-16 h-16 text-[#55FF55] animate-bounce" />
              <h3 class="font-pixel text-xl text-[#FFFF55] mc-text-shadow-gold">
                MESSAGE DELIVERED!
              </h3>
              <p class="text-slate-300 text-xs sm:text-sm max-w-sm font-sans">
                Thank you for reaching out, {formData.name}! I will get back to
                you as soon as possible.
              </p>
              <button
                onclick={handleReset}
                class="mc-button text-xs px-5 py-3 text-white mt-4"
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          {:else}
            <form onsubmit={handleSubmit} class="space-y-4 text-left">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Name -->
                <div class="space-y-1.5">
                  <label
                    for="name"
                    class="text-[10px] text-[#FFFF55] font-silkscreen uppercase"
                  >
                    PLAYER NAME <span class="text-[#FF5555]">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    bind:value={formData.name}
                    class="w-full px-3 py-2.5 mc-slot bg-[#040507] text-white placeholder-slate-500 text-xs focus:border-[#55FF55] focus:outline-none transition-all font-sans"
                  />
                </div>

                <!-- Email -->
                <div class="space-y-1.5">
                  <label
                    for="email"
                    class="text-[10px] text-[#FFFF55] font-silkscreen uppercase"
                  >
                    EMAIL ADDRESS <span class="text-[#FF5555]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="your.email@gmail.com"
                    bind:value={formData.email}
                    class="w-full px-3 py-2.5 mc-slot bg-[#040507] text-white placeholder-slate-500 text-xs focus:border-[#55FF55] focus:outline-none transition-all font-sans"
                  />
                </div>
              </div>

              <!-- Subject -->
              <div class="space-y-1.5">
                <label
                  for="subject"
                  class="text-[10px] text-[#FFFF55] font-silkscreen uppercase"
                >
                  MESSAGE SUBJECT
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Collaboration, project query, etc."
                  bind:value={formData.subject}
                  class="w-full px-3 py-2.5 mc-slot bg-[#040507] text-white placeholder-slate-500 text-xs focus:border-[#55FF55] focus:outline-none transition-all font-sans"
                />
              </div>

              <!-- Message -->
              <div class="space-y-1.5">
                <label
                  for="message"
                  class="text-[10px] text-[#FFFF55] font-silkscreen uppercase"
                >
                  MESSAGE CONTENT <span class="text-[#FF5555]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  placeholder="Hi Kishore, I'd love to connect regarding..."
                  bind:value={formData.message}
                  class="w-full px-3 py-2.5 mc-slot bg-[#040507] text-white placeholder-slate-500 text-xs focus:border-[#55FF55] focus:outline-none transition-all resize-none font-sans"
                ></textarea>
              </div>

              {#if status === "error"}
                <div
                  class="flex items-center gap-2 text-xs text-[#FF5555] font-silkscreen"
                >
                  <AlertCircle class="w-4 h-4 shrink-0" />
                  <span>PLEASE FILL OUT ALL REQUIRED SLOTS.</span>
                </div>
              {/if}

              <!-- Submit Button -->
              <button
                type="submit"
                disabled={status === "submitting"}
                class="mc-button mc-button-gold w-full py-3.5 text-xs text-[#FFFF55] flex items-center justify-center gap-2 mt-2"
              >
                {#if status === "submitting"}
                  <div
                    class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                  ></div>
                {:else}
                  <span>DISPATCH MESSAGE</span>
                  <Send class="w-4 h-4 text-[#55FFFF]" />
                {/if}
              </button>
            </form>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>
