"use client";

import React from "react";
import { ArrowUpRight, ArrowRight, FileText, Cpu, Layers, CheckCircle2 } from "lucide-react";
import { BuilderTarget } from "./BuilderTarget";
import { CursorTypewriter } from "./CursorTypewriter";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 select-none">
      
      {/* Top Backdrop: Full-Width Giant Outlined Text PORTFOLIO built by cursor movement */}
      <BuilderTarget id="hero-backdrop" label="BACKDROP_BANNER">
        <div className="w-full text-center pb-2 overflow-hidden select-none">
          <h1 className="text-stroke-crimson font-display font-black text-[13vw] leading-none tracking-tight block uppercase select-none">
            <CursorTypewriter id="hero-backdrop-text" text="PORTFOLIO" duration={700} />
          </h1>
        </div>
      </BuilderTarget>

      {/* 3-Column Grid below/overlapping */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
        
        {/* LEFT COLUMN (5 Cols): Script Greeting + Name Block + Bio + CTAs + Metrics */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="space-y-1.5">
            <div className="font-script text-[#FAFAFA] text-2xl sm:text-3xl tracking-wide select-none">
              <CursorTypewriter id="hero-greet" text="Hello, I'm" duration={400} />
            </div>

            {/* Massive White Name inside Solid #DC2626 Rectangular Block */}
            <BuilderTarget id="hero-name" label="IDENTITY_BLOCK">
              <div className="relative inline-block">
                <h2 className="bg-[#DC2626] text-white font-display font-black text-4xl sm:text-5xl md:text-6xl px-4 py-1 tracking-tight uppercase shadow-[0_0_30px_rgba(220,38,38,0.35)]">
                  <CursorTypewriter id="hero-name-text" text="KISHORE." duration={500} />
                </h2>
                {/* 4 Corner White Resize Squares */}
                <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-white border border-black"></div>
                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-white border border-black"></div>
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white border border-black"></div>
                <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-white border border-black"></div>
              </div>
            </BuilderTarget>
          </div>

          {/* Monospace Role Badge */}
          <BuilderTarget id="hero-role" label="SYS_ROLE_BADGE">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0C0C0C] border border-[#1E1E1E]">
              <span className="w-2 h-2 rounded-full bg-[#DC2626] shadow-[0_0_8px_#DC2626]"></span>
              <span className="font-mono text-[10px] text-neutral-300 font-bold uppercase tracking-wider">
                • FULL-STACK ARCHITECT &amp; MCA SCHOLAR
              </span>
            </div>
          </BuilderTarget>

          {/* 3-Line Summary typed out live by cursor */}
          <BuilderTarget id="hero-summary" label="BIO_SUMMARY">
            <div className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md font-sans min-h-[4rem]">
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
                className="px-4 py-2.5 bg-[#DC2626] text-white font-mono text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:bg-[#B91C1C] transition-colors"
              >
                <span>INITIATE BRIEFING</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#flagships"
                className="px-4 py-2.5 bg-[#0C0C0C] border border-[#1E1E1E] text-neutral-300 hover:text-white hover:border-[#DC2626] transition-colors font-mono text-xs font-bold flex items-center gap-2"
              >
                <span>EXPLORE ARCHITECTURE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </BuilderTarget>

          {/* 3 Metric Counters */}
          <BuilderTarget id="hero-metrics" label="SYSTEM_METRICS">
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#1E1E1E] font-mono">
              <div>
                <span className="text-base sm:text-lg font-bold text-[#DC2626] block leading-none">6+ Repos</span>
                <span className="text-[9px] text-neutral-500 block mt-1 uppercase">Production Code</span>
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold text-[#FAFAFA] block leading-none">4-Layer</span>
                <span className="text-[9px] text-neutral-500 block mt-1 uppercase">Architecture</span>
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold text-[#10B981] block leading-none">100%</span>
                <span className="text-[9px] text-neutral-500 block mt-1 uppercase">Verifiable Code</span>
              </div>
            </div>
          </BuilderTarget>

        </div>

        {/* CENTER COLUMN (3 Cols): Brutalist Portrait Card with #DC2626 Background */}
        <div className="lg:col-span-3 flex justify-center">
          <BuilderTarget id="hero-portrait" label="SOVEREIGN_PORTRAIT" className="w-full max-w-[260px]">
            <div className="bg-[#DC2626] p-2 relative shadow-[0_0_40px_rgba(220,38,38,0.3)] border border-[#EF4444]">
              {/* Portrait Silhouette Box */}
              <div className="w-full aspect-square bg-[#0C0C0C] flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.3)_0%,transparent_75%)]"></div>

                <div className="relative z-10 flex flex-col items-center text-center p-4">
                  <div className="w-20 h-20 rounded-full border-2 border-[#DC2626] flex items-center justify-center bg-black/80 shadow-[0_0_20px_#DC2626]/50 mb-3">
                    <span className="font-display font-black text-2xl text-white tracking-tighter">KP</span>
                  </div>
                  <span className="font-mono text-xs text-white font-bold tracking-wider uppercase">KISHORE P M</span>
                  <span className="font-mono text-[9px] text-[#3B82F6] mt-0.5">MCA Scholar &bull; Sona College</span>
                </div>

                {/* 4 Corner Crosshairs */}
                <div className="absolute top-1 left-1 text-[8px] text-[#DC2626] font-mono">+</div>
                <div className="absolute top-1 right-1 text-[8px] text-[#DC2626] font-mono">+</div>
                <div className="absolute bottom-1 left-1 text-[8px] text-[#DC2626] font-mono">+</div>
                <div className="absolute bottom-1 right-1 text-[8px] text-[#DC2626] font-mono">+</div>
              </div>

              {/* Bottom Monospace Status Bar */}
              <div className="mt-1.5 bg-[#050505] border border-black text-center py-1.5 font-mono text-[8px] text-[#DC2626] font-bold tracking-widest flex items-center justify-center gap-1.5 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse"></span>
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
              <div className="brutalist-card p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="text-[#DC2626]">01. &#9654;</span>
                    <span>Autonomous Core</span>
                  </span>
                  <span className="text-[8px] text-[#10B981] bg-black px-1.5 py-0.5 border border-[#1E1E1E]">PRODUCTION</span>
                </div>
                <p className="text-[10px] text-neutral-400 font-sans leading-tight">
                  Python AsyncIO &bull; Enterprise Java &bull; Supabase PostgreSQL &bull; REST APIs.
                </p>
              </div>

              {/* Card 02 */}
              <div className="brutalist-card p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="text-[#DC2626]">02. &#9654;</span>
                    <span>Reactive Web Engine</span>
                  </span>
                  <span className="text-[8px] text-[#3B82F6] bg-black px-1.5 py-0.5 border border-[#1E1E1E]">PRODUCTION</span>
                </div>
                <p className="text-[10px] text-neutral-400 font-sans leading-tight">
                  Next.js App Router &bull; Svelte 5 &bull; Tailwind CSS &bull; Framer Motion &bull; WebGL.
                </p>
              </div>

              {/* Card 03 */}
              <div className="brutalist-card p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="text-[#DC2626]">03. &#9654;</span>
                    <span>AI &amp; Computer Vision</span>
                  </span>
                  <span className="text-[8px] text-[#F59E0B] bg-black px-1.5 py-0.5 border border-[#1E1E1E]">EXECUTION</span>
                </div>
                <p className="text-[10px] text-neutral-400 font-sans leading-tight">
                  PyTorch &bull; OpenCV &bull; ESRGAN 4x Super-Resolution &bull; Groq LLaMA 3.2.
                </p>
              </div>

              {/* Tech Tags Row */}
              <div className="pt-2 flex flex-wrap gap-1.5 text-[9px] text-neutral-400">
                <span className="px-2 py-0.5 bg-black border border-[#1E1E1E] text-[#DC2626]">Python</span>
                <span className="px-2 py-0.5 bg-black border border-[#1E1E1E] text-[#3B82F6]">Next.js</span>
                <span className="px-2 py-0.5 bg-black border border-[#1E1E1E] text-white">Java</span>
                <span className="px-2 py-0.5 bg-black border border-[#1E1E1E] text-[#10B981]">PostgreSQL</span>
                <span className="px-2 py-0.5 bg-black border border-[#1E1E1E]">FastAPI</span>
                <span className="px-2 py-0.5 bg-black border border-[#1E1E1E]">PHP</span>
                <span className="px-2 py-0.5 bg-black border border-[#1E1E1E]">MySQL</span>
                <span className="px-2 py-0.5 bg-black border border-[#1E1E1E]">Git</span>
              </div>

            </div>
          </BuilderTarget>
        </div>

      </div>

    </section>
  );
}
