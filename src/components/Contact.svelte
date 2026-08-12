<script>
  import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-svelte";
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
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleReset = () => {
    formData = { name: "", email: "", subject: "", message: "" };
    status = "idle";
  };
</script>

<section id="contact" class="relative py-24 px-4 overflow-hidden">
  <!-- Background glow -->
  <div
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none -z-10"
  ></div>

  <div class="max-w-7xl mx-auto z-10 relative">
    <!-- Section Heading -->
    <div class="text-center mb-16">
      <h2
        class="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2"
      >
        GET IN TOUCH
      </h2>
      <div
        class="h-[3px] w-[80px] bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"
      ></div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
      <!-- Contact Details Column -->
      <div class="lg:col-span-5 flex flex-col justify-between gap-6 text-left">
        <div class="space-y-6">
          <h3 class="font-display font-bold text-2xl text-white">
            Let's Connect
          </h3>
          <p class="text-slate-400 text-sm sm:text-base leading-relaxed">
            Whether you have a project idea, a job opportunity, or just want to
            chat about Python, IoT, or Web Development, feel free to drop me a
            message!
          </p>

          <div class="space-y-4 pt-4">
            <!-- Email Card -->
            <div
              class="flex items-center gap-4 p-4 rounded-xl glassmorphism border border-white/5 hover:border-cyan-500/20 transition-all group"
            >
              <div
                class="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform"
              >
                <Mail class="w-5 h-5" />
              </div>
              <div>
                <p class="text-xs text-slate-500 font-mono">Email Address</p>
                <a
                  href="mailto:kishorekishorei170@gmail.com"
                  class="text-sm font-semibold text-slate-200 hover:text-cyan-400 transition-colors"
                >
                  kishorekishorei170@gmail.com
                </a>
              </div>
            </div>

            <!-- Location Card -->
            <div
              class="flex items-center gap-4 p-4 rounded-xl glassmorphism border border-white/5 hover:border-purple-500/20 transition-all group"
            >
              <div
                class="p-3 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform"
              >
                <MapPin class="w-5 h-5" />
              </div>
              <div>
                <p class="text-xs text-slate-500 font-mono">Location</p>
                <p class="text-sm font-semibold text-slate-200">
                  Salem, Tamil Nadu, India
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Micro mock layout to fill visual space and look premium -->
        <div
          class="hidden lg:block p-6 rounded-2xl glassmorphism border border-white/5 text-xs font-mono text-slate-500 space-y-2"
        >
          <div class="flex justify-between items-center text-slate-400">
            <span>CONNECTIVITY_STATUS</span>
            <span class="text-green-400 animate-pulse">● READY</span>
          </div>
          <p>&gt; ping -c 3 github.com/Kishore1700</p>
          <p class="text-slate-400">
            64 bytes from github.com/Kishore1700: icmp_seq=1 ttl=64 time=0.04 ms
          </p>
          <p class="text-slate-400">
            64 bytes from github.com/Kishore1700: icmp_seq=2 ttl=64 time=0.03 ms
          </p>
        </div>
      </div>

      <!-- Form Column -->
      <div class="lg:col-span-7">
        <div
          class="p-6 sm:p-8 rounded-2xl glassmorphism border border-white/10 relative overflow-hidden"
        >
          {#if status === "success"}
            <div
              class="flex flex-col items-center justify-center text-center py-12 space-y-4"
            >
              <CheckCircle2 class="w-16 h-16 text-emerald-400 animate-bounce" />
              <h3 class="font-display font-extrabold text-2xl text-white">
                Message Sent!
              </h3>
              <p class="text-slate-400 text-sm max-w-sm">
                Thank you for reaching out, {formData.name}! I will get back to
                you as soon as possible.
              </p>
              <button
                onclick={handleReset}
                class="mt-6 px-5 py-2.5 rounded-xl border border-white/10 hover:border-cyan-500/40 bg-white/5 hover:bg-cyan-500/10 text-slate-300 hover:text-white text-sm font-semibold transition-all cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          {:else}
            <form onsubmit={handleSubmit} class="space-y-4 text-left">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Name -->
                <div class="space-y-1.5">
                  <label
                    for="name"
                    class="text-xs text-slate-400 font-medium font-sans"
                  >
                    Full Name <span class="text-cyan-400">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    bind:value={formData.name}
                    class="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 focus:outline-none transition-all"
                  />
                </div>

                <!-- Email -->
                <div class="space-y-1.5">
                  <label
                    for="email"
                    class="text-xs text-slate-400 font-medium font-sans"
                  >
                    Email Address <span class="text-cyan-400">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="your.email@gmail.com"
                    bind:value={formData.email}
                    class="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <!-- Subject -->
              <div class="space-y-1.5">
                <label
                  for="subject"
                  class="text-xs text-slate-400 font-medium font-sans"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Collaboration opportunity, project query, etc."
                  bind:value={formData.subject}
                  class="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 focus:outline-none transition-all"
                />
              </div>

              <!-- Message -->
              <div class="space-y-1.5">
                <label
                  for="message"
                  class="text-xs text-slate-400 font-medium font-sans"
                >
                  Message <span class="text-cyan-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  placeholder="Hi Kishore, I'd love to connect regarding..."
                  bind:value={formData.message}
                  class="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 focus:outline-none transition-all resize-none"
                ></textarea>
              </div>

              {#if status === "error"}
                <div
                  class="flex items-center gap-2 text-xs text-red-400 font-sans"
                >
                  <AlertCircle class="w-4 h-4 shrink-0" />
                  <span>Please fill out all required fields.</span>
                </div>
              {/if}

              <!-- Submit Button -->
              <button
                type="submit"
                disabled={status === "submitting"}
                class="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-cyan-500/30 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
              >
                {#if status === "submitting"}
                  <div
                    class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                  ></div>
                {:else}
                  <span>Send Message</span>
                  <Send class="w-4 h-4" />
                {/if}
              </button>
            </form>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>
