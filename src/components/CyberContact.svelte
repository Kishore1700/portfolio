<script>
  import { Github, Linkedin, Mail, MapPin, Copy, Check, Send, AlertCircle, ArrowUpRight } from "lucide-svelte";
  import confetti from "canvas-confetti";

  let copied = $state(false);
  const email = "kishorekishorei170@gmail.com";

  let formData = $state({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  let status = $state("idle"); // 'idle' | 'submitting' | 'success' | 'error'

  function handleCopy() {
    navigator.clipboard.writeText(email);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 2500);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      status = "error";
      return;
    }

    status = "submitting";
    await new Promise((resolve) => setTimeout(resolve, 1200));
    status = "success";

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FF2A2A", "#00E5FF", "#00FF66", "#FFD600"]
    });
  }

  function handleReset() {
    formData = { name: "", email: "", subject: "", message: "" };
    status = "idle";
  }
</script>

<section id="contact" class="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-[#14161F] select-none">
  
  <div class="max-w-4xl mx-auto space-y-10 relative z-10">
    
    <!-- Red Small Tag (Exact as Video Frame_024) -->
    <div class="text-center space-y-2">
      <div class="inline-block font-mono-cyber text-[10px] text-[#FF2A2A] font-bold tracking-widest uppercase px-2.5 py-1 bg-[#120404] border border-[#3B0E0E]">
        DIRECT CONNECT
      </div>

      <!-- Main Headline (Word-for-Word as Video Frame_024) -->
      <h2 class="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
        Let's Architect Something Extraordinary.
      </h2>

      <!-- Subtitle with Kishore's Real Availability -->
      <p class="font-sans-cyber text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
        Available for full-stack software engineering roles, high-concurrency backend system design, and software architecture.
      </p>
    </div>

    <!-- Quick Email Dispatch Strip with Copy Button (Exact Layout as Video Frame_028) -->
    <div class="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
      <div class="font-mono-cyber text-xs text-white px-4 py-2.5 bg-[#08090C] border border-[#1A1C23] w-full sm:w-auto flex-1 text-center sm:text-left select-all">
        {email}
      </div>

      <button
        type="button"
        onclick={handleCopy}
        class="cyber-badge-red px-4 py-2.5 font-mono-cyber text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto shrink-0 active:scale-95 transition-transform"
      >
        {#if copied}
          <Check class="w-3.5 h-3.5" />
          <span>COPIED</span>
        {:else}
          <Copy class="w-3.5 h-3.5" />
          <span>Copy Email Address</span>
        {/if}
      </button>
    </div>

    <!-- FULL INTERACTIVE DISPATCH FORM (Preserving Kishore's form from before) -->
    <div class="cyber-card p-6 sm:p-8 max-w-2xl mx-auto !border-[#1F222E]">
      <div class="border-b border-[#1A1C23] pb-3 mb-5 flex items-center justify-between">
        <span class="font-mono-cyber text-xs font-bold text-white uppercase tracking-wider">
          DISPATCH TRANSMISSION
        </span>
        <span class="font-mono-cyber text-[9px] text-[#00E5FF]">ENCRYPTED SSL</span>
      </div>

      {#if status === "success"}
        <div class="p-6 bg-[#050608] border border-[#00FF66]/50 text-center space-y-3 font-mono-cyber animate-fade-in">
          <div class="w-10 h-10 rounded-full bg-[#00FF66]/10 border border-[#00FF66] flex items-center justify-center text-[#00FF66] mx-auto">
            <Check class="w-5 h-5" />
          </div>
          <h3 class="text-white text-sm font-bold">TRANSMISSION DELIVERED!</h3>
          <p class="text-xs text-slate-300 font-sans-cyber">
            Thank you, {formData.name}! Your message has been dispatched to Kishore's primary inbox.
          </p>
          <button
            type="button"
            onclick={handleReset}
            class="cyber-btn-secondary !py-1.5 !px-3 text-[10px] mt-2 cursor-pointer"
          >
            SEND ANOTHER MESSAGE
          </button>
        </div>
      {:else}
        <form onsubmit={handleSubmit} class="space-y-4 font-mono-cyber text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1">
              <label for="name" class="text-[10px] text-slate-400 block uppercase">
                YOUR NAME *
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="Alex Mercer"
                bind:value={formData.name}
                class="w-full px-3 py-2 bg-[#050608] border border-[#1A1C23] text-white placeholder-slate-600 focus:border-[#FF2A2A] focus:outline-none transition-colors"
              />
            </div>

            <div class="space-y-1">
              <label for="email" class="text-[10px] text-slate-400 block uppercase">
                EMAIL ADDRESS *
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="alex@enterprise.com"
                bind:value={formData.email}
                class="w-full px-3 py-2 bg-[#050608] border border-[#1A1C23] text-white placeholder-slate-600 focus:border-[#FF2A2A] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div class="space-y-1">
            <label for="subject" class="text-[10px] text-slate-400 block uppercase">
              SUBJECT
            </label>
            <input
              id="subject"
              type="text"
              placeholder="Full-Stack Opportunity / Project Collaboration"
              bind:value={formData.subject}
              class="w-full px-3 py-2 bg-[#050608] border border-[#1A1C23] text-white placeholder-slate-600 focus:border-[#FF2A2A] focus:outline-none transition-colors"
            />
          </div>

          <div class="space-y-1">
            <label for="message" class="text-[10px] text-slate-400 block uppercase">
              MESSAGE CONTENT *
            </label>
            <textarea
              id="message"
              rows="4"
              required
              placeholder="Hi Kishore, I'd like to discuss a software engineering opportunity..."
              bind:value={formData.message}
              class="w-full px-3 py-2 bg-[#050608] border border-[#1A1C23] text-white placeholder-slate-600 focus:border-[#FF2A2A] focus:outline-none transition-colors resize-none"
            ></textarea>
          </div>

          {#if status === "error"}
            <div class="flex items-center gap-2 text-[10px] text-[#FF2A2A]">
              <AlertCircle class="w-3.5 h-3.5" />
              <span>Please fill in all required fields.</span>
            </div>
          {/if}

          <button
            type="submit"
            disabled={status === "submitting"}
            class="cyber-btn-primary w-full justify-center !py-2.5 cursor-pointer active:scale-95"
          >
            {#if status === "submitting"}
              <div class="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>DISPATCHING...</span>
            {:else}
              <span>TRANSMIT MESSAGE</span>
              <Send class="w-3.5 h-3.5" />
            {/if}
          </button>
        </form>
      {/if}
    </div>

    <!-- Location & Social Terminal Links -->
    <div class="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono-cyber">
      <div class="flex items-center gap-1.5 text-slate-400">
        <MapPin class="w-3.5 h-3.5 text-[#FF2A2A]" />
        <span>Salem, Tamil Nadu, India</span>
      </div>

      <a
        href="https://github.com/Kishore1700"
        target="_blank"
        rel="noopener noreferrer"
        class="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
      >
        <Github class="w-3.5 h-3.5" />
        <span>github.com/Kishore1700</span>
      </a>

      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        class="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
      >
        <Linkedin class="w-3.5 h-3.5" />
        <span>linkedin.com/in/kishore</span>
      </a>
    </div>

    <!-- Footer Signature (Matching Video Frame_028) -->
    <div class="pt-10 text-[10px] font-mono-cyber text-slate-400 text-center space-y-1">
      <div>&copy; 2026 Kishore P M &bull; System Architect & Full-Stack Operator</div>
      <div>Master of Computer Applications @ Sona College of Technology</div>
    </div>

  </div>
</section>
