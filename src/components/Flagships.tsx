"use client";

import React, { useState } from "react";
import { ArrowUpRight, Github, ExternalLink, ShieldCheck } from "lucide-react";
import { BuilderTarget } from "./BuilderTarget";
import { CursorTypewriter } from "./CursorTypewriter";

export function Flagships() {
  const [activeLayer, setActiveLayer] = useState<number>(0);

  // 7 Interactive Constitutional Architecture Stack Layers (L1 - L7)
  const layers = [
    {
      id: "L1",
      chip: "L1: Vendor Engine",
      heading: "LAYER 01 // VENDOR ONBOARDING & VALIDATION",
      title: "Supplier Verification & Automated Ingestion",
      desc: "Automated vendor catalog ingestion, GST credentialing, tax compliance verification, and multi-tenant supplier profile state machine.",
      tags: ["Supabase Auth", "GST Heuristics", "Zod Validation"],
    },
    {
      id: "L2",
      chip: "L2: Dynamic Bidding",
      heading: "LAYER 02 // AUCTION & SCORING PIPELINE",
      title: "Real-Time RFQ Reverse Auction & Scoring",
      desc: "Real-time quote ingestion and automated supplier ranking based on unit economics, SLA reliability, historical delivery ratings, and lead-time constraints.",
      tags: ["Chart.js Telemetry", "Scoring Algorithm", "WebSocket Updates"],
    },
    {
      id: "L3",
      chip: "L3: Approval Matrix",
      heading: "LAYER 03 // AUTHORIZATION & WORKFLOW",
      title: "Hierarchical Multi-Sig Approval Engine",
      desc: "Role-based purchase authorization enforcing spending thresholds, dual-party approval workflows, and automated approval routing.",
      tags: ["Role-Based Auth", "Multi-Sig", "Threshold Rules"],
    },
    {
      id: "L4",
      chip: "L4: Data Persistence",
      heading: "LAYER 04 // RELATIONAL STORAGE & ACID",
      title: "Supabase PostgreSQL & ACID Transactional Safety",
      desc: "Strict relational database persistence with Row Level Security (RLS) policies, foreign-key constraints, index optimization, and zero concurrency race conditions.",
      tags: ["PostgreSQL 16", "Supabase RLS", "ACID Guaranteed"],
    },
    {
      id: "L5",
      chip: "L5: Audit Telemetry",
      heading: "LAYER 05 // OBSERVABILITY & AUDIT TRAIL",
      title: "Cryptographic Action Logging & System Telemetry",
      desc: "Immutable timestamped audit logs for every vendor quotation change, purchase requisition, and procurement event with automated fraud heuristics.",
      tags: ["Audit Logging", "Hash Integrity", "System Telemetry"],
    },
    {
      id: "L6",
      chip: "L6: Invoicing Subsystem",
      heading: "LAYER 06 // AUTO-INVOICING & PDF ENGINE",
      title: "Dynamic Purchase Order & Invoicing Generation",
      desc: "Client-side and server-side PDF generation pipeline using jsPDF, formatting verified purchase orders with itemized tax breakdowns and automated distribution.",
      tags: ["jsPDF Engine", "Automated Invoicing", "Tax Calculations"],
    },
    {
      id: "L7",
      chip: "L7: Security Perimeter",
      heading: "LAYER 07 // AUTH & INPUT SANITIZATION",
      title: "Zero-Trust Perimeter & Session Security",
      desc: "JWT-based session authentication, encrypted cookies, SQL injection prevention via parameterized queries, and strict input schema parsing with Zod.",
      tags: ["JWT Authentication", "Zod Schemas", "Zero-Trust"],
    },
  ];

  const secondaryProjects = [
    {
      tier: "TIER 01 // CYBER SECURITY",
      title: "SecureGuard — Sensitive Data Leakage Detection",
      desc: "AI-assisted cyber security audit suite that unpacks codebase ZIP archives in-browser with JSZip, scanning for exposed API keys and secrets with Groq LLaMA 3.2 filtering and Three.js 3D threat mapping.",
      bullets: [
        "In-Browser ZIP Parsing & Entropy Scanning (JSZip)",
        "Groq SDK & LLaMA 3.2 False-Positive Elimination",
        "Interactive 3D Threat Node Mapping with Three.js",
      ],
      tags: ["Next.js", "Groq AI", "Three.js", "Playwright"],
      link: "https://github.com/lawrancewilliam/Mini-project",
    },
    {
      tier: "TIER 01 // COMPUTER VISION",
      title: "Image Super-Resolution & Neural Upscaler",
      desc: "Deep learning computer vision application utilizing convolutional neural networks and ESRGAN to upscale low-resolution images 4x with sharp high-frequency edge reconstruction.",
      bullets: [
        "PyTorch Convolutional Neural Architecture",
        "4x Bicubic & ESRGAN High-Frequency Super-Resolution",
        "OpenCV Tensor Processing on Local GPU Hardware",
      ],
      tags: ["Python", "PyTorch", "OpenCV", "PIL"],
      link: "https://github.com/Kishore1700/image-upscaler",
    },
    {
      tier: "TIER 02 // LMS ARCHITECTURE",
      title: "Learnify — Interactive E-Learning System",
      desc: "Full-scale Learning Management System engineered with native PHP OOP and relational MySQL, featuring asynchronous progress tracking, automated quizzes, and dynamic certificate issuance.",
      bullets: [
        "Relational Schema Design for Courses & Students",
        "Asynchronous AJAX Progress & Quiz Telemetry",
        "Dynamic Completion Certificate Generation",
      ],
      tags: ["PHP OOP", "MySQL", "JavaScript", "Apache"],
      link: "https://github.com/Kishore1700/Learnify",
    },
    {
      tier: "TIER 02 // COLLABORATIVE CLOUD",
      title: "Campus Repo — Academic Resource Platform",
      desc: "Distributed academic repository facilitating peer-to-peer educational resource sharing, semester curriculum indexing, and structured PDF notes querying across student cohorts.",
      bullets: [
        "Modular Multi-User Role Authentication",
        "Direct PDF & File Upload Processing Engine",
        "Relational Subject & Semester Search Querying",
      ],
      tags: ["PHP", "MySQL", "Bootstrap", "File API"],
      link: "https://github.com/lawrancewilliam/Campus-repo",
    },
    {
      tier: "TIER 03 // WEBGL & 3D GRAPHICS",
      title: "Personal Portfolio & WebGL 3D Voxel Engine",
      desc: "High-performance developer portfolio built with Svelte 5 runes and raw WebGL shaders. Features hardware-accelerated 3D voxel rendering, perspective projection, and 8-bit Web Audio synthesis.",
      bullets: [
        "Custom Perspective Projection & WebGL Shaders",
        "8-Bit Web Audio API Sound Synthesizer",
        "Svelte 5 Runes Reactive State Architecture",
      ],
      tags: ["Svelte 5", "WebGL", "Web Audio API", "Tailwind CSS"],
      link: "https://github.com/Kishore1700/portfolio",
    },
  ];

  return (
    <section id="flagships" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1E1E1E] select-none">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <BuilderTarget id="flagship-header" label="ARCHITECTURAL_SHOWCASE">
          <div className="space-y-1">
            <div className="font-mono text-[10px] text-[#DC2626] font-bold tracking-widest uppercase">
              ARCHITECTURAL SHOWCASE
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              <CursorTypewriter id="flagship-title" text="Flagship Deployments" duration={500} />
            </h2>
            <p className="font-sans text-xs text-neutral-400 max-w-xl leading-relaxed">
              Production-grade systems running across full-stack silicon, distributed backends, and responsive client endpoints.
            </p>
          </div>
        </BuilderTarget>

        {/* PRIMARY FEATURED SYSTEM CARD (Full Width) */}
        <BuilderTarget id="flagship-primary" label="CORE_ENTERPRISE_SYSTEM">
          <div className="brutalist-card p-6 sm:p-8 space-y-6 !border-[#262626]">
            
            {/* Top Badge, Title & Overview */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/40 font-mono text-[9px] font-bold uppercase tracking-wider mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse"></span>
                  <span>LIVE ARCHITECTURE</span>
                </div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                  Smart Procurement System &mdash; Enterprise ERP
                </h3>
                <p className="font-sans text-xs text-neutral-300 leading-relaxed mt-1 max-w-3xl">
                  A full-lifecycle smart procurement system streamlining vendor purchasing, purchase order approvals, and invoice reconciliation. Built with reactive architecture, integrating Supabase PostgreSQL persistence, automated PDF generation, and real-time telemetry.
                </p>
              </div>

              <a
                href="https://github.com/Kishore1700/Smart-Procurement-System"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-[#141414] border border-[#262626] text-neutral-200 hover:text-white hover:border-[#DC2626] transition-colors shrink-0 self-start sm:self-center flex items-center gap-2 font-mono text-xs font-bold"
                title="View source on GitHub"
              >
                <Github className="w-3.5 h-3.5" />
                <span>VIEW REPO</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-400" />
              </a>
            </div>

            {/* 4-Column Metric Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-[#1E1E1E] font-mono">
              <div>
                <span className="text-base sm:text-lg font-bold text-[#DC2626] block">Supabase PG</span>
                <span className="text-[9px] text-neutral-500 uppercase block">Row Level Security</span>
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold text-white block">Auto-PDF</span>
                <span className="text-[9px] text-neutral-500 uppercase block">jsPDF Engine</span>
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold text-[#3B82F6] block">Chart.js</span>
                <span className="text-[9px] text-neutral-500 uppercase block">Real-Time Telemetry</span>
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold text-[#10B981] block">Zod Safe</span>
                <span className="text-[9px] text-neutral-500 uppercase block">Schema Validation</span>
              </div>
            </div>

            {/* INTERACTIVE ARCHITECTURE STACK (L1 to L7) */}
            <div className="space-y-3 pt-1">
              <div className="font-mono text-[10px] text-white font-bold tracking-wider uppercase flex items-center justify-between">
                <span>7-LAYER CONSTITUTIONAL STACK</span>
                <span className="text-neutral-500 text-[9px]">CLICK LAYER TAB TO INSPECT SUBSYSTEM</span>
              </div>

              {/* Layer Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                {layers.map((layer, idx) => (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => setActiveLayer(idx)}
                    className={`px-3 py-1 font-mono text-[10px] transition-all whitespace-nowrap cursor-pointer ${
                      activeLayer === idx
                        ? "bg-[#DC2626] text-white font-bold border border-[#DC2626] shadow-[0_0_12px_rgba(220,38,38,0.5)]"
                        : "bg-[#050505] text-neutral-400 border border-[#1E1E1E] hover:text-white"
                    }`}
                  >
                    {layer.chip}
                  </button>
                ))}
              </div>

              {/* Bordered Inspection Panel */}
              {layers[activeLayer] && (
                <div className="p-4 bg-[#050505] border border-[#262626] space-y-2">
                  <div className="font-mono text-[9px] text-[#DC2626] font-bold tracking-wider">
                    {layers[activeLayer].heading}
                  </div>
                  <div className="font-mono text-xs font-bold text-white">
                    {layers[activeLayer].title}
                  </div>
                  <p className="font-sans text-xs text-neutral-300 leading-relaxed max-w-3xl">
                    {layers[activeLayer].desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {layers[activeLayer].tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-black border border-[#1E1E1E] text-[#3B82F6] font-mono text-[9px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </BuilderTarget>

        {/* SECONDARY FLAGSHIPS ROW (3-Column Grid) */}
        <BuilderTarget id="flagship-secondary" label="SECONDARY_GRID">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {secondaryProjects.map((proj) => (
              <div key={proj.title} className="brutalist-card p-5 flex flex-col justify-between group space-y-4">
                <div className="space-y-2.5">
                  <div className="font-mono text-[9px] text-[#DC2626] font-bold tracking-widest uppercase">
                    {proj.tier}
                  </div>
                  <h4 className="font-display font-bold text-base text-white group-hover:text-[#DC2626] transition-colors leading-snug">
                    {proj.title}
                  </h4>
                  <p className="font-sans text-xs text-neutral-300 leading-relaxed">
                    {proj.desc}
                  </p>

                  <ul className="space-y-1 font-mono text-[10px] text-neutral-400 pt-1">
                    {proj.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-1.5">
                        <span className="text-[#DC2626]">&bull;</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-[#1E1E1E] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-black border border-[#1E1E1E] text-neutral-400 font-mono text-[9px]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3B82F6] hover:text-white transition-colors"
                    title="Inspect repository on GitHub"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </BuilderTarget>

      </div>
    </section>
  );
}

