<script>
  import { Heart, Sparkles } from "lucide-svelte";
</script>

<section
  class="relative py-16 px-4 overflow-hidden text-center flex flex-col items-center justify-center"
>
  <div class="max-w-2xl mx-auto space-y-4 mc-container p-8 bg-[#0c0d12]">
    <div
      class="inline-flex p-3 mc-slot bg-[#040507] text-[#FF5555] mb-1 border-2 border-black"
    >
      <Heart class="w-6 h-6 animate-pulse fill-[#FF5555] text-[#FF5555]" />
    </div>
    <h2
      class="font-pixel text-xl sm:text-2xl text-[#FFFF55] mc-text-shadow-gold"
    >
      THANK YOU FOR VISITING!
    </h2>
    <p
      class="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-sans"
    >
      I appreciate you taking the time to explore my portfolio. Feel free to
      reach out via email or connect with me on social media!
    </p>
    <div class="pt-2 text-[10px] font-silkscreen text-[#55FF55] animate-pulse">
      ★ MINECRAFT PORTFOLIO ACHIEVED ★
    </div>
  </div>
</section>
