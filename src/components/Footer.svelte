<script>
  import { Mail, ArrowUp, Pickaxe } from "lucide-svelte";
  import Icons from "./Icons.svelte";
  import { sound } from "../utils/sound.js";

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
</script>

<footer class="relative border-t-4 border-black bg-[#000000] pt-10 pb-28 px-4">
  <div
    class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 z-10 relative"
  >
    <!-- Branding & Info -->
    <div class="text-center md:text-left flex items-center gap-3">
      <div class="w-8 h-8 mc-slot flex items-center justify-center bg-[#0c0d12]">
        <Pickaxe class="w-5 h-5 text-[#55FF55]" />
      </div>
      <div>
        <p class="font-pixel text-xs text-[#FFFF55] mc-text-shadow-gold">
          KISHORE P M
        </p>
        <p class="text-slate-400 text-[10px] mt-0.5 font-silkscreen">
          CRAFTED IN SURVIVAL MODE | MCA DEVELOPER
        </p>
      </div>
    </div>

    <!-- Copyright -->
    <p class="text-slate-400 text-xs font-silkscreen order-3 md:order-2">
      &copy; {new Date().getFullYear()} KISHORE P M. ALL BLOCKS RESERVED.
    </p>

    <!-- Social Link Dock & Back to Top -->
    <div class="flex items-center gap-4 order-2 md:order-3">
      <div class="flex items-center gap-2">
        <a
          href="https://github.com/Kishore1700"
          target="_blank"
          rel="noopener noreferrer"
          class="w-8 h-8 mc-slot flex items-center justify-center text-[#55FF55] hover:scale-110"
          title="GitHub"
        >
          <Icons type="github" class="w-4 h-4" />
        </a>
        <a
          href="https://linkedin.com/in/kishore-p-m-"
          target="_blank"
          rel="noopener noreferrer"
          class="w-8 h-8 mc-slot flex items-center justify-center text-[#55FFFF] hover:scale-110"
          title="LinkedIn"
        >
          <Icons type="linkedin" class="w-4 h-4" />
        </a>
        <a
          href="mailto:kishorekishorei170@gmail.com"
          class="w-8 h-8 mc-slot flex items-center justify-center text-[#FF5555] hover:scale-110"
          title="Email"
        >
          <Mail class="w-4 h-4" />
        </a>
      </div>

      <div class="w-[2px] h-6 bg-black"></div>

      <button
        type="button"
        onclick={() => {
          sound.playClick();
          handleScrollTop();
        }}
        class="mc-button p-2 text-[#FFFF55] cursor-pointer"
        title="Back to Top"
        aria-label="Scroll to top"
      >
        <ArrowUp class="w-4 h-4" />
      </button>
    </div>
  </div>
</footer>
