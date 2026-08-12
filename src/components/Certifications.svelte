<script>
  import {
    Award,
    CheckCircle,
    ShieldCheck,
    ExternalLink,
    Code,
  } from "lucide-svelte";

  const certificationsList = [
    {
      title: "Robotic Process Automation",
      issuer: "UiPath",
      icon: ShieldCheck,
      iconColor: "text-blue-400",
      id: "Issued by UiPath",
      color: "from-blue-500/20 to-cyan-500/20 hover:border-blue-500/30",
    },
    {
      title: "Oracle Cloud Infrastructure Architecture",
      issuer: "Oracle",
      icon: Award,
      iconColor: "text-orange-400",
      id: "Issued by Oracle",
      color: "from-orange-500/20 to-red-500/20 hover:border-orange-500/30",
    },
    {
      title: "Employability Skills and Life Skills, UNNATI Foundations",
      issuer: "Infosys",
      icon: CheckCircle,
      iconColor: "text-emerald-400",
      id: "Issued by Infosys",
      color: "from-emerald-500/20 to-teal-500/20 hover:border-emerald-500/30",
    },
    {
      title: "Web Application Development Using AI",
      issuer: "Symphozen Labs",
      icon: Code,
      iconColor: "text-purple-400",
      id: "Issued by Symphozen Labs",
      color: "from-purple-500/20 to-pink-500/20 hover:border-purple-500/30",
    },
    {
      title: "Programming in Java",
      issuer: "NPTEL",
      icon: Award,
      iconColor: "text-cyan-400",
      id: "Issued by NPTEL",
      color: "from-cyan-500/20 to-blue-500/20 hover:border-cyan-500/30",
    },
  ];
</script>

<section id="certifications" class="relative py-24 px-4 overflow-hidden">
  <div class="max-w-7xl mx-auto z-10 relative">
    <!-- Section Heading -->
    <div class="text-center mb-16">
      <h2
        class="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2"
      >
        CERTIFICATIONS
      </h2>
      <div
        class="h-[3px] w-[80px] bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"
      ></div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
      {#each certificationsList as cert}
        {@const Icon = cert.icon}
        <div
          class="p-6 rounded-2xl glassmorphism border border-white/5 bg-gradient-to-br {cert.color} transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:scale-[1.02]"
        >
          <div>
            <div
              class="mb-6 w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center border border-white/5"
            >
              <Icon class="w-8 h-8 {cert.iconColor}" />
            </div>
            <h3
              class="font-display font-bold text-lg text-white mb-2 tracking-wide leading-snug"
            >
              {cert.title}
            </h3>
            <p class="text-slate-400 text-sm font-medium mb-1">
              Issued by: <span class="text-cyan-400">{cert.issuer}</span>
            </p>
          </div>

          <div
            class="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-xs font-mono text-slate-500"
          >
            <span>{cert.id}</span>
            <span
              class="flex items-center gap-1 text-slate-400 hover:text-cyan-400 cursor-pointer"
            >
              Verify <ExternalLink class="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
