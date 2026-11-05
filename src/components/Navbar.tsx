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
      const scrollPos = window.scrollY + 200;
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
      <div className="bg-[#0C0C0C]/90 backdrop-blur-md border border-[#1E1E1E] px-4 py-2 shadow-[0_10px_35px_rgba(0,0,0,0.9)] flex items-center justify-between gap-4 font-mono text-[11px]">
        
        {/* Left: Red Square Icon with Initial + Bold Uppercase Name */}
        <a href="#home" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-6 h-6 bg-[#DC2626] flex items-center justify-center font-display font-black text-white text-xs shadow-[0_0_12px_rgba(220,38,38,0.5)]">
            K
          </div>
          <span className="font-display font-extrabold text-sm text-white tracking-tight uppercase group-hover:text-[#DC2626] transition-colors">
            KISHORE.
          </span>
        </a>

        {/* Center: Dark Glass Pill with Nav Links & Solid #DC2626 Active Background Pill */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-900/80 backdrop-blur border border-neutral-800 px-1.5 py-1 rounded-full">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-1 rounded-full text-xs font-sans transition-all duration-200 ${
                  isActive
                    ? "bg-[#DC2626] text-white font-bold shadow-[0_0_12px_rgba(220,38,38,0.4)]"
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
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#141414] border border-[#262626] text-neutral-300 hover:text-white hover:border-[#DC2626] transition-colors text-[10px]"
            title="Download Kishore's Resume PDF"
          >
            <FileText className="w-3 h-3 text-[#DC2626]" />
            <span>RESUME</span>
          </a>

          <a
            href="#contact"
            className="flex items-center gap-1.5 px-2.5 py-1 bg-black border border-[#1E1E1E] text-neutral-300 hover:border-[#DC2626] transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
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

