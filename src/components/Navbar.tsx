"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, FileText } from "lucide-react";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Flagships", href: "#flagships" },
    { label: "Matrix", href: "#matrix" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      const sections = ["contact", "matrix", "flagships", "about", "home"];
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sec);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-5xl select-none">
      <div className="bg-[#0C0C0C]/85 backdrop-blur-xl border border-white/10 px-4 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.85)] flex items-center justify-between gap-4 font-mono text-[11px] rounded-sm">
        
        {/* Left: Red Square Icon with Initial + Bold Uppercase Name */}
        <a href="#home" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-6 h-6 bg-[#DC2626] flex items-center justify-center font-display font-black text-white text-xs shadow-[0_0_15px_rgba(220,38,38,0.6)]">
            K
          </div>
          <span className="font-display font-extrabold text-sm text-white tracking-tight uppercase group-hover:text-[#DC2626] transition-colors">
            KISHORE.
          </span>
        </a>

        {/* Center: Dark Glass Pill with Nav Links & Solid #DC2626 Active Background Pill */}
        <nav className="hidden md:flex items-center gap-1 bg-black/60 backdrop-blur border border-white/5 px-1.5 py-1 rounded-full">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-1 rounded-full text-xs font-sans transition-all duration-200 ${
                  isActive
                    ? "bg-[#DC2626] text-white font-bold shadow-[0_0_14px_rgba(220,38,38,0.5)]"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Monospace Status Indicator + Resume PDF */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/Kishore_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-black/60 border border-white/10 text-neutral-300 hover:text-white hover:border-[#DC2626] transition-colors text-[10px]"
            title="Download Kishore's Resume PDF"
          >
            <FileText className="w-3 h-3 text-[#DC2626]" />
            <span>RESUME</span>
          </a>

          <a
            href="#contact"
            className="flex items-center gap-2 px-2.5 py-1 bg-black/80 border border-white/10 text-neutral-200 hover:border-[#DC2626] transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
            </span>
            <span className="text-[10px] text-neutral-200 font-bold uppercase tracking-wider">
              AVAILABLE DISPATCH
            </span>
            <ArrowUpRight className="w-3 h-3 text-neutral-400" />
          </a>
        </div>

      </div>
    </header>
  );
}
