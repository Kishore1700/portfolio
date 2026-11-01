<script>
  import {
    Award,
    CheckCircle,
    ShieldCheck,
    ExternalLink,
    Code,
    Sparkles,
  } from "lucide-svelte";

  const certificationsList = [
    {
      title: "Robotic Process Automation",
      issuer: "UiPath",
      icon: ShieldCheck,
      iconColor: "text-[#55FFFF]",
      id: "Issued by UiPath",
    },
    {
      title: "Oracle Cloud Infrastructure Architecture",
      issuer: "Oracle",
      icon: Award,
      iconColor: "text-[#FFFF55]",
      id: "Issued by Oracle",
    },
    {
      title: "Employability Skills and Life Skills, UNNATI Foundations",
      issuer: "Infosys",
      icon: CheckCircle,
      iconColor: "text-[#55FF55]",
      id: "Issued by Infosys",
    },
    {
      title: "Web Application Development Using AI",
      issuer: "Symphozen Labs",
      icon: Code,
      iconColor: "text-[#AA00AA]",
      id: "Issued by Symphozen Labs",
    },
    {
      title: "Programming in Java",
      issuer: "NPTEL",
      icon: Award,
      iconColor: "text-[#55FFFF]",
      id: "Issued by NPTEL",
    },
  ];
</script>

<section id="certifications" class="relative py-20 px-4 overflow-hidden">
  <div class="max-w-7xl mx-auto z-10 relative">
    <!-- Section Heading -->
    <div class="text-center mb-14">
      <h2
        class="font-pixel text-2xl sm:text-3xl text-[#FFFF55] mc-text-shadow-gold mb-3"
      >
        ENCHANTED CERTIFICATES
      </h2>
      <div
        class="h-1 w-24 bg-[#55FF55] mx-auto border border-black shadow-[0_0_8px_#55FF55]"
      ></div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
      {#each certificationsList as cert}
        {@const Icon = cert.icon}
        <div
          class="mc-container p-6 bg-[#0c0d12] transition-transform duration-150 hover:scale-[1.02] flex flex-col justify-between mc-enchanted"
        >
          <div>
            <div
              class="mb-5 w-12 h-12 mc-slot bg-[#040507] flex items-center justify-center border-2 border-black"
            >
              <Icon class="w-6 h-6 {cert.iconColor}" />
            </div>
            <h3
              class="font-pixel text-xs sm:text-sm text-white mb-2 leading-relaxed mc-text-shadow"
            >
              {cert.title}
            </h3>
            <p class="text-slate-300 text-xs font-silkscreen mb-1">
              ISSUER: <span class="text-[#55FF55]">{cert.issuer}</span>
            </p>
          </div>

          <div
            class="mt-6 pt-3 border-t-2 border-black flex justify-between items-center text-[10px] font-silkscreen text-slate-400"
          >
            <span>{cert.id}</span>
            <span
              class="flex items-center gap-1 text-[#FFFF55] hover:underline cursor-pointer"
            >
              VERIFIED <ExternalLink class="w-3 h-3 text-[#55FFFF]" />
            </span>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
