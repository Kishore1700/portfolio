"use client";

import React from "react";
import { ArrowUpRight, ArrowRight, ShieldCheck, Terminal, Layers, Cpu, Sparkles } from "lucide-react";
import { BuilderTarget } from "./BuilderTarget";
import { CursorTypewriter } from "./CursorTypewriter";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 select-none">
      
      {/* Top Backdrop: Full-Width Giant Outlined Text PORTFOLIO built by cursor movement */}
      <BuilderTarget id="hero-backdrop" label="BACKDROP_BANNER">
        <div className="w-full text-center pb-2 overflow-hidden select-none relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#DC2626]/5 to-transparent blur-3xl pointer-events-none"></div>
          <h1 className="text-stroke-crimson font-display font-black text-[13vw] leading-none tracking-tight block uppercase select-none relative z-10">
            <CursorTypewriter id="hero-backdrop-text" text="PORTFOLIO" duration={700} />
          </h1>
        </div>
      </BuilderTarget>

      {/* 3-Column Grid below/overlapping */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
        
        {/* LEFT COLUMN (5 Cols): Script Greeting + Name Block + Bio + CTAs + Metrics */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="space-y-1.5">
            <div className="font-script text-[#FAFAFA] text-2xl sm:text-3xl tracking-wide select-none drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
              <CursorTypewriter id="hero-greet" text="Hello, I'm" duration={400} />
            </div>

            {/* Massive White Name inside Solid #DC2626 Rectangular Block */}
            <BuilderTarget id="hero-name" label="IDENTITY_BLOCK">
              <div className="relative inline-block group">
                <div className="bg-[#DC2626] text-white font-display font-black text-4xl sm:text-5xl md:text-6xl px-4 py-1 tracking-tight uppercase shadow-[0_0_35px_rgba(220,38,38,0.45)] relative overflow-hidden">
                  <CursorTypewriter id="hero-name-text" text="KISHORE." duration={500} />
                  
                  {/* Diagonal Subtle Sheen Highlight */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
                </div>

                {/* 4 Corner White Resize Squares */}
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-black shadow-sm"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-black shadow-sm"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-black shadow-sm"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-black shadow-sm"></div>

                {/* Sub-Tag */}
                <div className="absolute -bottom-4 right-0 font-mono text-[8px] text-neutral-400 bg-black/80 px-1 border border-neutral-800">
                  // 0xKP_SYS_OPERATOR
                </div>
              </div>
            </BuilderTarget>
          </div>

          {/* Monospace Role Badge */}
          <BuilderTarget id="hero-role" label="SYS_ROLE_BADGE">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0C0C0C]/90 backdrop-blur border border-white/10 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#DC2626] shadow-[0_0_10px_#DC2626] animate-pulse"></span>
              <span className="font-mono text-[10px] text-neutral-200 font-bold uppercase tracking-wider">
                • FULL-STACK ARCHITECT &amp; MCA SCHOLAR
              </span>
            </div>
          </BuilderTarget>

          {/* 3-Line Summary typed out live by cursor */}
          <BuilderTarget id="hero-summary" label="BIO_SUMMARY">
            <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md font-sans min-h-[4rem]">
              <CursorTypewriter
                id="hero-summary-text"
                text="Master of Computer Applications candidate at Sona College of Technology. Engineering high-concurrency backend services, asynchronous pipelines, and reactive client interfaces from first principles — zero bloat, total performance."
                duration={900}
                highlightWords={["Sona College of Technology", "first principles", "total performance"]}
              />
            </div>
          </BuilderTarget>

          {/* 2 Buttons */}
          <BuilderTarget id="hero-actions" label="ACTION_CTAS">
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#contact"
                className="px-5 py-2.5 bg-[#DC2626] text-white font-mono text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.45)] hover:bg-[#B91C1C] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all cursor-pointer"
              >
                <span>INITIATE BRIEFING</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#flagships"
                className="px-5 py-2.5 bg-[#0C0C0C]/80 backdrop-blur border border-neutral-700 text-neutral-300 hover:text-white hover:border-[#DC2626] transition-all font-mono text-xs font-bold flex items-center gap-2 cursor-pointer"
              >
                <span>EXPLORE ARCHITECTURE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </BuilderTarget>

          {/* 3 Metric Counters */}
          <BuilderTarget id="hero-metrics" label="SYSTEM_METRICS">
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 font-mono">
              <div className="p-2 bg-black/40 border border-white/5">
                <span className="text-lg font-black text-[#DC2626] block leading-none">6+ Repos</span>
                <span className="text-[9px] text-neutral-500 block mt-1 uppercase">Production Code</span>
              </div>
              <div className="p-2 bg-black/40 border border-white/5">
                <span className="text-lg font-black text-[#FAFAFA] block leading-none">4-Layer</span>
                <span className="text-[9px] text-neutral-500 block mt-1 uppercase">Architecture</span>
              </div>
              <div className="p-2 bg-black/40 border border-white/5">
                <span className="text-lg font-black text-[#10B981] block leading-none">100%</span>
                <span className="text-[9px] text-neutral-500 block mt-1 uppercase">Verifiable Code</span>
              </div>
            </div>
          </BuilderTarget>

        </div>

        {/* CENTER COLUMN (3 Cols): Brutalist Holographic Portrait Card */}
        <div className="lg:col-span-3 flex justify-center">
          <BuilderTarget id="hero-portrait" label="SOVEREIGN_PORTRAIT" className="w-full max-w-[270px]">
            <div className="bg-gradient-to-b from-[#DC2626] to-[#991B1B] p-2 relative shadow-[0_0_45px_rgba(220,38,38,0.35)] border border-[#EF4444]">
              {/* Portrait Silhouette Box with Scanlines */}
              <div className="w-full aspect-square bg-[#080808] flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.35)_0%,transparent_75%)]"></div>

                {/* Scanlines layer */}
                <div className="absolute inset-0 scanlines pointer-events-none opacity-40"></div>

                <div className="relative z-10 flex flex-col items-center text-center p-4">
                  {/* Reticle Target Avatar */}
                  <div className="w-20 h-20 rounded-full border-2 border-[#DC2626] flex items-center justify-center bg-black/85 shadow-[0_0_25px_#DC2626]/60 mb-3 relative">
                    <span className="font-display font-black text-2xl text-white tracking-tighter">KP</span>
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
                  </div>
                  <span className="font-mono text-xs text-white font-bold tracking-wider uppercase">KISHORE P M</span>
                  <span className="font-mono text-[9px] text-[#3B82F6] mt-0.5 font-semibold">MCA Scholar &bull; Sona College</span>
                </div>

                {/* 4 Corner Crosshairs */}
                <div className="absolute top-1.5 left-1.5 text-[9px] text-[#DC2626] font-mono font-bold">+</div>
                <div className="absolute top-1.5 right-1.5 text-[9px] text-[#DC2626] font-mono font-bold">+</div>
                <div className="absolute bottom-1.5 left-1.5 text-[9px] text-[#DC2626] font-mono font-bold">+</div>
                <div className="absolute bottom-1.5 right-1.5 text-[9px] text-[#DC2626] font-mono font-bold">+</div>
              </div>

              {/* Bottom Monospace Status Bar */}
              <div className="mt-1.5 bg-[#050505] border border-black text-center py-1.5 font-mono text-[8px] text-[#DC2626] font-bold tracking-widest flex items-center justify-center gap-1.5 uppercase shadow-inner">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse shadow-[0_0_6px_#DC2626]"></span>
                <span>SOVEREIGN SILICON ACTIVE</span>
              </div>
            </div>
          </BuilderTarget>
        </div>

        {/* RIGHT COLUMN (4 Cols): 3 Stacked Dark Cards (01, 02, 03) */}
        <div className="lg:col-span-4 space-y-3 font-mono">
          <BuilderTarget id="hero-runtimes" label="SPECIALIZATION_STACK">
            <div className="space-y-3">
              
              {/* Card 01 */}
              <div className="brutalist-card p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="text-[#DC2626]">01. &#9654;</span>
                    <span>Autonomous Core</span>
                  </span>
                  <span className="text-[8px] text-[#10B981] bg-black px-1.5 py-0.5 border border-[#10B981]/40 font-bold">PRODUCTION</span>
                </div>
                <p className="text-[10px] text-neutral-300 font-sans leading-tight">
                  Python AsyncIO &bull; Enterprise Java &bull; Supabase PostgreSQL &bull; REST APIs.
                </p>
              </div>

              {/* Card 02 */}
              <div className="brutalist-card p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="text-[#DC2626]">02. &#9654;</span>
                    <span>Reactive Web Engine</span>
                  </span>
                  <span className="text-[8px] text-[#3B82F6] bg-black px-1.5 py-0.5 border border-[#3B82F6]/40 font-bold">PRODUCTION</span>
                </div>
                <p className="text-[10px] text-neutral-300 font-sans leading-tight">
                  Next.js App Router &bull; Svelte 5 &bull; Tailwind CSS &bull; Framer Motion &bull; WebGL.
                </p>
              </div>

              {/* Card 03 */}
              <div className="brutalist-card p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="text-[#DC2626]">03. &#9654;</span>
                    <span>AI &amp; Computer Vision</span>
                  </span>
                  <span className="text-[8px] text-[#F59E0B] bg-black px-1.5 py-0.5 border border-[#F59E0B]/40 font-bold">EXECUTION</span>
                </div>
                <p className="text-[10px] text-neutral-300 font-sans leading-tight">
                  PyTorch &bull; OpenCV &bull; ESRGAN 4x Super-Resolution &bull; Groq LLaMA 3.2.
                </p>
              </div>

              {/* Tech Tags Row */}
              <div className="pt-2 flex flex-wrap gap-1.5 text-[9px] text-neutral-300">
                <span className="px-2 py-0.5 bg-black/60 border border-white/10 text-[#DC2626] font-bold">Python</span>
                <span className="px-2 py-0.5 bg-black/60 border border-white/10 text-[#3B82F6] font-bold">Next.js</span>
                <span className="px-2 py-0.5 bg-black/60 border border-white/10 text-white font-bold">Java</span>
                <span className="px-2 py-0.5 bg-black/60 border border-white/10 text-[#10B981] font-bold">PostgreSQL</span>
                <span className="px-2 py-0.5 bg-black/60 border border-white/10 text-neutral-300">FastAPI</span>
                <span className="px-2 py-0.5 bg-black/60 border border-white/10 text-neutral-300">PHP</span>
                <span className="px-2 py-0.5 bg-black/60 border border-white/10 text-neutral-300">MySQL</span>
                <span className="px-2 py-0.5 bg-black/60 border border-white/10 text-neutral-300">Git</span>
              </div>

            </div>
          </BuilderTarget>
        </div>

      </div>

    </section>
  );
}
