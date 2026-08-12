<script>
  import { Mail, ArrowUp } from "lucide-svelte";
  import Icons from "./Icons.svelte";

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
</script>

<footer class="relative border-t border-white/5 bg-slate-950/60 py-12 px-4">
  <div
    class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 z-10 relative"
  >
    <!-- Branding & Info -->
    <div class="text-center md:text-left">
      <p class="font-display font-bold text-base tracking-wider text-white">
        KISHORE P M
      </p>
      <p class="text-slate-500 text-xs mt-1 font-mono">
        MCA Student | Developer | Designer
      </p>
    </div>

    <!-- Copyright -->
    <p class="text-slate-500 text-xs sm:text-sm font-sans order-3 md:order-2">
      &copy; {new Date().getFullYear()} Kishore P M. All rights reserved.
    </p>

    <!-- Social Link Dock & Back to Top -->
    <div class="flex items-center gap-6 order-2 md:order-3">
      <div class="flex items-center gap-3">
        <a
          href="https://github.com/Kishore1700"
          target="_blank"
          rel="noopener noreferrer"
          class="text-slate-500 hover:text-white transition-colors"
          title="GitHub"
        >
          <Icons type="github" class="w-5 h-5" />
        </a>
        <a
          href="https://linkedin.com/in/kishore-p-m-"
          target="_blank"
          rel="noopener noreferrer"
          class="text-slate-500 hover:text-white transition-colors"
          title="LinkedIn"
        >
          <Icons type="linkedin" class="w-5 h-5" />
        </a>
        <a
          href="mailto:kishorekishorei170@gmail.com"
          class="text-slate-500 hover:text-white transition-colors"
          title="Email"
        >
          <Mail class="w-5 h-5" />
        </a>
      </div>

      <div class="w-[1px] h-6 bg-white/10"></div>

      <button
        onclick={handleScrollTop}
        class="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none cursor-pointer"
        title="Back to Top"
      >
        <ArrowUp class="w-4 h-4" />
      </button>
    </div>
  </div>
</footer>
