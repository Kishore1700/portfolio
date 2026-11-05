<script>
  import { Award, ShieldCheck, CheckCircle, Code, ExternalLink } from "lucide-svelte";

  const certs = [
    {
      id: "#CERT-01",
      title: "Robotic Process Automation",
      issuer: "UiPath",
      icon: ShieldCheck,
      color: "#00E5FF",
      desc: "Enterprise workflow automation, process mining, and software robot architecture."
    },
    {
      id: "#CERT-02",
      title: "Oracle Cloud Infrastructure Architecture",
      issuer: "Oracle",
      icon: Award,
      color: "#FFD600",
      desc: "Cloud infrastructure fundamentals, compute instances, VCN networking, and storage."
    },
    {
      id: "#CERT-03",
      title: "Employability & Life Skills",
      issuer: "Infosys UNNATI",
      icon: CheckCircle,
      color: "#00FF66",
      desc: "Professional teamwork, collaborative communication, and workplace agility."
    },
    {
      id: "#CERT-04",
      title: "Web Application Development Using AI",
      issuer: "Symphozen Labs",
      icon: Code,
      color: "#FF3399",
      desc: "Full-stack web application development accelerated with modern AI tooling."
    },
    {
      id: "#CERT-05",
      title: "Programming in Java",
      issuer: "NPTEL",
      icon: Award,
      color: "#FF2A2A",
      desc: "Object-oriented programming, multithreading, collections framework, and JVM execution."
    }
  ];
</script>

<section id="certifications" class="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#14161F] select-none">
  <div class="max-w-7xl mx-auto space-y-8">
    
    <div class="space-y-1">
      <div class="font-mono-cyber text-[10px] text-[#FF2A2A] font-bold tracking-widest uppercase">
        VERIFIED CREDENTIALS
      </div>
      <h2 class="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
        Industry Certifications
      </h2>
      <p class="font-sans-cyber text-xs text-slate-400 max-w-xl">
        Accredited specializations in cloud architectures, Java programming, RPA, and applied AI.
      </p>
    </div>

    <!-- Certifications Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each certs as cert}
        {@const Icon = cert.icon}
        <div class="cyber-card p-5 flex flex-col justify-between group space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between font-mono-cyber text-[9px] pb-2 border-b border-[#1A1C23]">
              <span class="text-[#FF2A2A] font-bold">{cert.id}</span>
              <span class="text-slate-400">ISSUED BY {cert.issuer}</span>
            </div>

            <div class="w-10 h-10 bg-[#050608] border border-[#1F222E] flex items-center justify-center">
              <Icon class="w-5 h-5" style="color: {cert.color};" />
            </div>

            <h3 class="font-display font-bold text-base text-white group-hover:text-[#FF2A2A] transition-colors leading-snug">
              {cert.title}
            </h3>

            <p class="font-sans-cyber text-xs text-slate-300 leading-relaxed">
              {cert.desc}
            </p>
          </div>

          <div class="pt-3 border-t border-[#1A1C23] flex items-center justify-between font-mono-cyber text-[10px]">
            <span class="text-[#00FF66] flex items-center gap-1">
              <span>●</span>
              <span>VERIFIED ISSUER</span>
            </span>
            <span class="text-slate-500">{cert.issuer}</span>
          </div>
        </div>
      {/each}
    </div>

  </div>
</section>
