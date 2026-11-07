"use client";

import React, { useState } from "react";
import { BuilderTarget } from "./BuilderTarget";
import { CursorTypewriter } from "./CursorTypewriter";

export function Matrix() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const filterTabs = [
    { id: "ALL", label: "All Systems (6)" },
    { id: "LANG", label: "Languages & Core" },
    { id: "FRONTEND", label: "Frontend & 3D" },
    { id: "DB", label: "Databases & Cloud" },
    { id: "AI", label: "AI & Security" },
  ];

  const systems = [
    {
      id: "SYS.01",
      category: "LANG",
      categoryPill: "Core Programming",
      title: "Python, Java & Web Languages",
      desc: "Primary development stack with extensive hands-on proficiency in Python (90%), JavaScript & TypeScript (90%), PHP OOP (85%), and Java & C (80%) for building robust algorithms and microservice endpoints.",
      tags: ["Python 3", "Java OOP", "TypeScript", "JavaScript", "PHP"],
    },
    {
      id: "SYS.02",
      category: "FRONTEND",
      categoryPill: "Reactive Client Engine",
      title: "Next.js, Svelte 5 & 3D WebGL",
      desc: "Compile-time reactive frontend engineering utilizing Next.js App Router, Svelte 5 runes ($state, $derived), Tailwind CSS, and raw WebGL/Three.js shaders for high-fps graphics.",
      tags: ["Next.js", "Svelte 5", "TypeScript", "WebGL", "Tailwind CSS"],
    },
    {
      id: "SYS.03",
      category: "DB",
      categoryPill: "Data Persistence",
      title: "PostgreSQL, Supabase & MySQL",
      desc: "Relational database schema modeling, index optimization, Row Level Security (RLS) policies, stored procedures, and ACID transactional guarantees across Supabase and MySQL.",
      tags: ["PostgreSQL", "Supabase RLS", "MySQL Schema", "REST APIs"],
    },
    {
      id: "SYS.04",
      category: "AI",
      categoryPill: "Computer Vision & ML",
      title: "PyTorch, OpenCV & Groq LLaMA 3.2",
      desc: "Applied deep learning pipelines: 4x image super-resolution via ESRGAN and PyTorch, image filtering via OpenCV, and AI text classification via Groq SDK & LLaMA 3.2 for automated code auditing.",
      tags: ["PyTorch", "OpenCV", "Groq LLaMA 3.2", "ESRGAN"],
    },
    {
      id: "SYS.05",
      category: "AI",
      categoryPill: "Cyber Security & Auditing",
      title: "Sensitive Data Audit & Validation",
      desc: "Security audit suites for detecting leaked credentials, entropy analysis on codebases, JWT/bcrypt authentication, and strict end-to-end schema validation via Zod and Playwright tests.",
      tags: ["Secret Scanning", "Zod", "Playwright", "JWT Auth"],
    },
    {
      id: "SYS.06",
      category: "LANG",
      categoryPill: "Engineering Tooling",
      title: "Git, Vite, jsPDF & Build Pipeline",
      desc: "Production software delivery tooling: Git version control, Vite/Next.js build pipeline, automated client-side PDF document generation via jsPDF, Docker containerization, and Apache environments.",
      tags: ["Git & GitHub", "Vite", "jsPDF", "Docker", "Apache"],
    },
  ];

  const filteredSystems = activeFilter === "ALL" ? systems : systems.filter((s) => s.category === activeFilter);

  return (
    <section id="matrix" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1E1E1E] select-none">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Filter Pills */}
        <BuilderTarget id="matrix-header" label="SYSTEMS_INDEX">
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="font-mono text-[10px] text-[#DC2626] font-bold tracking-widest uppercase">
                ENGINEERING INDEX
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                <CursorTypewriter id="matrix-title" text="The Systems Matrix" duration={500} />
              </h2>
              <p className="font-sans text-xs text-neutral-400 max-w-xl leading-relaxed">
                Specialized engineering capabilities across programming languages, reactive frontends, database persistence, and AI/security auditing.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3 py-1 transition-all cursor-pointer border ${
                    activeFilter === tab.id
                      ? "bg-[#DC2626] text-white font-bold border-[#DC2626] shadow-[0_0_12px_rgba(220,38,38,0.4)]"
                      : "bg-[#0C0C0C] text-neutral-400 border-[#1E1E1E] hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </BuilderTarget>

        {/* 4-Column Bento Grid */}
        <BuilderTarget id="matrix-grid" label="BENTO_MATRIX">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredSystems.map((sys) => (
              <div key={sys.id} className="brutalist-card p-4 flex flex-col justify-between group space-y-3">
                <div className="space-y-2">
                  {/* Top-Left Category Badge + Top-Right System Code */}
                  <div className="flex items-center justify-between font-mono text-[9px] pb-1.5 border-b border-[#1E1E1E]">
                    <span className="text-[#DC2626] font-bold">{sys.categoryPill}</span>
                    <span className="text-neutral-500 font-bold">{sys.id}</span>
                  </div>

                  <h3 className="font-display font-bold text-sm text-white group-hover:text-[#DC2626] transition-colors leading-snug">
                    {sys.title}
                  </h3>

                  <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                    {sys.desc}
                  </p>
                </div>

                {/* Bottom Monospace Tech Stack Tags */}
                <div className="pt-2.5 border-t border-[#1E1E1E] flex flex-wrap gap-1">
                  {sys.tags.map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 bg-black border border-[#1E1E1E] text-neutral-400 font-mono text-[8px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </BuilderTarget>

      </div>
    </section>
  );
}

