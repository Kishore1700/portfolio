"use client";

import React, { useState } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import { BuilderTarget } from "./BuilderTarget";
import { CursorTypewriter } from "./CursorTypewriter";

export function About() {
  const [activePhilosophy, setActivePhilosophy] = useState<number>(0);
  const [selectedBuff, setSelectedBuff] = useState<string | null>(null);

  const philosophies = [
    {
      num: "01",
      title: "First-Principles Architecture",
      desc: "Every component, API route, and database schema is crafted with deliberate necessity. Eliminating framework bloat results in ultra-lean, verifiable codebases that execute with deterministic reliability.",
      tags: ["System Design", "Microservices", "Clean Code"],
    },
    {
      num: "02",
      title: "Algorithmic Precision & DSA",
      desc: "Rigorous study in data structures, time/space complexity (Big-O), recursion, and relational database query optimization acquired through computer applications coursework and deliberate practice.",
      tags: ["Big-O Optimization", "Data Structures", "Algorithms"],
    },
    {
      num: "03",
      title: "High-Performance Full-Stack",
      desc: "Bridging asynchronous Python and enterprise Java microservices with reactive client interfaces in Next.js, TypeScript, and modern CSS, prioritizing sub-50ms user event loops.",
      tags: ["Asynchronous I/O", "TypeScript", "Event Loops"],
    },
  ];

  const attributes = [
    { name: "Teamwork", buff: "+20 Team Synergy", desc: "Collaborative sprint alignment & peer code reviews" },
    { name: "Adaptability", buff: "+25 Agility", desc: "Rapid adoption of emerging frameworks & protocols" },
    { name: "Active Listening", buff: "+18 Empathy", desc: "User-centric problem breakdown & requirement clarity" },
    { name: "Critical Thinking", buff: "+30 Logic", desc: "First-principles root cause analysis & debugging" },
    { name: "Web Designing", buff: "+22 UI Mastery", desc: "Pixel-perfect reactive interfaces & brutalist aesthetics" },
    { name: "Exploring Tech", buff: "+28 Innovation", desc: "Continuous benchmarking of cutting-edge tooling" },
  ];

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1E1E1E] select-none">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Index & Header */}
        <BuilderTarget id="about-header" label="SEC_ABOUT_HEADER">
          <div className="space-y-4">
            <div className="flex items-center justify-between font-mono text-[10px] text-neutral-500 border-b border-[#1E1E1E] pb-2">
              <span className="text-[#DC2626] font-bold tracking-wider">// 01.00 SEC_ABOUT.MD</span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                <span>AUTONOMOUS_OPERATOR: VERIFIED</span>
              </span>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-[10px] text-[#DC2626] tracking-widest uppercase font-bold flex items-center gap-2">
                <span>ENGINEER PROFILE</span>
                <span className="text-neutral-700">//</span>
                <span className="text-neutral-400">LVL 99 MCA SCHOLAR &amp; FULLSTACK CRAFTER</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                <CursorTypewriter id="about-heading" text="Background &amp; Philosophy" duration={500} />
              </h2>
            </div>
          </div>
        </BuilderTarget>

        {/* 2-Column Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLUMNS: Narrative, Quote Block, Academic Cards & Attributes */}
          <div className="lg:col-span-7 space-y-6">
            
            <BuilderTarget id="about-narrative" label="BIOGRAPHICAL_NARRATIVE">
              <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans brutalist-card p-6">
                <p>
                  I am <strong className="text-white font-bold border-b border-[#DC2626] pb-0.5">Kishore P M</strong> &mdash; an independent full-stack engineer and software architect based in Salem, Tamil Nadu, India. My formal engineering education began with a <strong className="text-white">Bachelor of Computer Applications (BCA)</strong> from Sona College of Arts &amp; Science, followed by pursuing my <strong className="text-[#3B82F6]">Master of Computer Applications (MCA)</strong> at <strong className="text-[#3B82F6]">Sona College of Technology</strong>.
                </p>

                <p>
                  My defining capabilities were forged in the terminal: developing scalable backend services in <strong className="text-[#DC2626]">Python</strong> and <strong className="text-white">Java</strong>, architecting relational database models in <strong className="text-[#10B981]">PostgreSQL &amp; MySQL</strong>, and building responsive, reactive web applications with <strong className="text-[#3B82F6]">Next.js &amp; TypeScript</strong>. I view software engineering not as framework assembly, but as the deliberate orchestration of memory hierarchies, clean APIs, and mathematical state machines.
                </p>

                {/* Dark Blockquote with 3px solid #DC2626 Left Border */}
                <blockquote className="p-4 bg-[#050505] border-l-[3px] border-[#DC2626] text-neutral-200 text-xs sm:text-sm italic my-2">
                  &ldquo;Like building enduring structures in Minecraft, software engineering requires a sturdy bedrock, efficient logic circuits, and a passion for crafting engaging experiences.&rdquo;
                  <footer className="text-[10px] text-neutral-400 font-mono not-italic mt-1.5 text-right">&mdash; Kishore P M</footer>
                </blockquote>

                {/* Quick Academic Credentials Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-[10px]">
                  <div className="p-3 bg-[#050505] border border-[#1E1E1E]">
                    <span className="text-neutral-500 uppercase block text-[9px]">MASTER&apos;S DEGREE:</span>
                    <span className="text-white font-bold block mt-0.5">MCA @ Sona College of Tech</span>
                    <span className="text-[#10B981]">CGPA: 7.6 / 10 &bull; 2025–2027</span>
                  </div>
                  <div className="p-3 bg-[#050505] border border-[#1E1E1E]">
                    <span className="text-neutral-500 uppercase block text-[9px]">BACHELOR&apos;S DEGREE:</span>
                    <span className="text-white font-bold block mt-0.5">BCA @ Sona College of Arts</span>
                    <span className="text-[#3B82F6]">CGPA: 6.9 / 10 &bull; 2022–2025</span>
                  </div>
                </div>
              </div>
            </BuilderTarget>

            {/* Core Attributes Matrix */}
            <BuilderTarget id="about-attributes" label="ATTRIBUTE_BUFFS">
              <div className="p-4 brutalist-card space-y-3 font-mono">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#DC2626]" />
                    <span>CORE ATTRIBUTES &amp; RPG BUFFS</span>
                  </span>
                  <span className="text-[9px] text-neutral-500">CLICK TO INSPECT BUFF</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {attributes.map((attr) => (
                    <button
                      key={attr.name}
                      type="button"
                      onClick={() => setSelectedBuff(selectedBuff === attr.name ? null : attr.name)}
                      className={`p-2 text-left bg-black border transition-all duration-200 cursor-pointer ${
                        selectedBuff === attr.name
                          ? "border-[#3B82F6] bg-[#3B82F6]/10"
                          : "border-[#1E1E1E] hover:border-[#DC2626]/70"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-white truncate">{attr.name}</span>
                        <span className="text-[8px] text-[#10B981] font-bold">{attr.buff}</span>
                      </div>
                      <div className="text-[8px] text-neutral-400 line-clamp-1 mt-0.5">{attr.desc}</div>
                    </button>
                  ))}
                </div>

                {selectedBuff && (
                  <div className="text-[9px] text-[#3B82F6] bg-black p-2 border border-[#3B82F6]/40 flex items-center justify-between animate-fade-in">
                    <span>
                      ACTIVE BUFF: {attributes.find((a) => a.name === selectedBuff)?.buff} &mdash;{" "}
                      {attributes.find((a) => a.name === selectedBuff)?.desc}
                    </span>
                    <button type="button" onClick={() => setSelectedBuff(null)} className="text-neutral-400 hover:text-white ml-2">
                      [X]
                    </button>
                  </div>
                )}
              </div>
            </BuilderTarget>

          </div>

          {/* RIGHT 5 COLUMNS: 3 Stacked Philosophy Cards with Title, Chevron & Description */}
          <div className="lg:col-span-5 space-y-3">
            <BuilderTarget id="about-philosophies" label="PHILOSOPHY_PILLARS">
              <div className="space-y-3 font-mono">
                {philosophies.map((phil, i) => (
                  <div
                    key={phil.num}
                    onClick={() => setActivePhilosophy(i)}
                    className={`brutalist-card p-4 space-y-2 cursor-pointer transition-all duration-300 ${
                      activePhilosophy === i ? "border-[#DC2626] bg-[#DC2626]/5 shadow-[0_0_15px_rgba(220,38,38,0.2)]" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[#DC2626] font-bold text-xs">{phil.num}.</span>
                        <h3 className="text-xs font-bold text-white">{phil.title}</h3>
                      </div>
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          activePhilosophy === i ? "rotate-90 text-[#DC2626]" : "text-neutral-500"
                        }`}
                      />
                    </div>

                    <p className="text-[10px] text-neutral-300 font-sans leading-relaxed pl-5">
                      {phil.desc}
                    </p>

                    <div className="pl-5 pt-1 flex flex-wrap gap-1 text-[8px]">
                      {phil.tags.map((tag) => (
                        <span key={tag} className="px-1.5 py-0.5 bg-black border border-[#1E1E1E] text-neutral-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </BuilderTarget>
          </div>

        </div>

      </div>
    </section>
  );
}
