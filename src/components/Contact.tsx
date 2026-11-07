"use client";

import React, { useState } from "react";
import { Copy, Check, Send, Github, Linkedin, MapPin, ArrowUpRight, Terminal } from "lucide-react";
import confetti from "canvas-confetti";
import { BuilderTarget } from "./BuilderTarget";
import { CursorTypewriter } from "./CursorTypewriter";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "kishorekishorei170@gmail.com";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("success");

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#DC2626", "#3B82F6", "#10B981", "#F59E0B"],
    });
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-[#1E1E1E] select-none">
      <div className="max-w-4xl mx-auto space-y-10 relative z-10">
        
        {/* Centered Container with Red Micro-label, Heading & Availability Subtext */}
        <BuilderTarget id="contact-header" label="DIRECT_CHANNEL_HEADER">
          <div className="text-center space-y-3">
            <div className="inline-block font-mono text-[10px] text-[#DC2626] font-bold tracking-widest uppercase px-3 py-1 bg-[#1A0505] border border-[#DC2626]/40 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
              DIRECT CHANNEL
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
              <CursorTypewriter id="contact-title" text="Let's Architect Something Extraordinary." duration={700} />
            </h2>

            <p className="font-sans text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
              Available for full-stack software engineering roles, high-concurrency backend system design, and software architecture worldwide.
            </p>
          </div>
        </BuilderTarget>

        {/* Interactive Action Row: Monospace Email Copy Button + Solid #DC2626 Primary CTA Button */}
        <BuilderTarget id="contact-action-row" label="INTERACTION_DISPATCH">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <div className="font-mono text-xs text-white px-4 py-2.5 bg-[#0C0C0C]/90 backdrop-blur border border-white/10 w-full sm:w-auto flex-1 text-center sm:text-left select-all">
              {email}
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2.5 bg-[#DC2626] text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto shrink-0 shadow-[0_0_20px_rgba(220,38,38,0.45)] hover:bg-[#B91C1C] transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>COPIED TO CLIPBOARD</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Email Address</span>
                </>
              )}
            </button>
          </div>
        </BuilderTarget>

        {/* TRANSMISSION FORM */}
        <BuilderTarget id="contact-form" label="TRANSMISSION_FORM">
          <div className="brutalist-card p-6 sm:p-8 max-w-2xl mx-auto !border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
            <div className="border-b border-white/10 pb-3 mb-5 flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>INITIATE TRANSMISSION</span>
              </span>
              <span className="font-mono text-[9px] text-[#3B82F6] font-bold">ENCRYPTED PROTOCOL</span>
            </div>

            {status === "success" ? (
              <div className="p-6 bg-black/80 border border-[#10B981]/50 text-center space-y-3">
                <span className="font-mono text-xs text-[#10B981] font-bold block uppercase tracking-wider">
                  TRANSMISSION RECEIVED // DISPATCH QUEUED
                </span>
                <p className="font-sans text-xs text-neutral-300">
                  Thank you, Kishore has received your transmission and will review it shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ name: "", email: "", subject: "", message: "" });
                    setStatus("idle");
                  }}
                  className="font-mono text-[10px] text-neutral-400 hover:text-white underline cursor-pointer"
                >
                  [Send Another Transmission]
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-neutral-400 uppercase block font-bold">IDENTIFIER (NAME)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Satoshi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#080808] border border-white/10 px-3 py-2 text-white placeholder-neutral-700 focus:border-[#DC2626] focus:shadow-[0_0_15px_rgba(220,38,38,0.25)] focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-neutral-400 uppercase block font-bold">COMM CHANNEL (EMAIL)</label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#080808] border border-white/10 px-3 py-2 text-white placeholder-neutral-700 focus:border-[#DC2626] focus:shadow-[0_0_15px_rgba(220,38,38,0.25)] focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 uppercase block font-bold">TRANSMISSION SUBJECT</label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Engineering Role"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#080808] border border-white/10 px-3 py-2 text-white placeholder-neutral-700 focus:border-[#DC2626] focus:shadow-[0_0_15px_rgba(220,38,38,0.25)] focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 uppercase block font-bold">PAYLOAD (MESSAGE)</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe system parameters, architecture objectives, or role specifications..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#080808] border border-white/10 px-3 py-2 text-white placeholder-neutral-700 focus:border-[#DC2626] focus:shadow-[0_0_15px_rgba(220,38,38,0.25)] focus:outline-none transition-all font-sans text-xs"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-2.5 bg-[#DC2626] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#B91C1C] transition-all disabled:opacity-50 cursor-pointer shadow-[0_0_20px_rgba(220,38,38,0.4)] active:scale-98"
                >
                  {status === "submitting" ? (
                    <span>ENCRYPTING &amp; DISPATCHING...</span>
                  ) : (
                    <>
                      <span>TRANSMIT BRIEFING</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </BuilderTarget>

        {/* Location & Social Links Row with External Arrows */}
        <BuilderTarget id="contact-socials" label="SOCIAL_GRID">
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-neutral-300">
              <MapPin className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Salem, Tamil Nadu, India</span>
            </div>

            <a
              href="https://github.com/Kishore1700"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 hover:text-white flex items-center gap-1 transition-colors hover:underline"
            >
              <Github className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-500" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 hover:text-white flex items-center gap-1 transition-colors hover:underline"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-500" />
            </a>
          </div>
        </BuilderTarget>

        {/* Footer Signature */}
        <div className="pt-12 text-[10px] font-mono text-neutral-500 text-center space-y-1">
          <div>&copy; 2026 Kishore P M &bull; Dark Brutalist Autonomous Systems &amp; Multi-Agent Canvas</div>
          <div>Master of Computer Applications @ Sona College of Technology</div>
        </div>

      </div>
    </section>
  );
}
