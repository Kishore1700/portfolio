"use client";

import React, { useState, useEffect } from "react";
import { Cpu, CheckCircle2, Zap, GraduationCap, Calendar, Award, ShieldCheck, Code } from "lucide-react";
import { BuilderTarget } from "./BuilderTarget";

export function ExperienceEducation() {
  const [analogSignal, setAnalogSignal] = useState(1023);

  // Live telemetry pulse simulation for IoT diagnostic readout
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalogSignal(1018 + Math.floor(Math.random() * 6));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const internResponsibilities = [
    "Completed intensive engineering internship focused on Internet of Things (IoT) applications.",
    "Programmed device functions, input mapping, and board routines using Arduino microcontroller boards.",
    "Integrated hardware sensors and analog signals to coordinate reliable hardware-software connectivity.",
    "Tested communication protocols and real-time data retrieval frameworks in embedded environments.",
  ];

  const educationTimeline = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Sona College of Technology",
      period: "2025 — 2027",
      location: "Salem, Tamil Nadu",
      score: "CGPA: 7.6 / 10",
      desc: "Pursuing master level software engineering education. Specializing in advanced data structures & algorithms, distributed systems, relational database modeling, and software architecture.",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Sona College of Arts & Science",
      period: "2022 — 2025",
      location: "Salem, Tamil Nadu",
      score: "CGPA: 6.9 / 10",
      desc: "Acquired core competencies in computer science fundamentals, programming logic, database management systems, and modern web application development.",
    },
    {
      degree: "Higher Secondary Certificate (HSC - Class 12)",
      institution: "Sarada Balamandir Higher Secondary School",
      period: "2021 — 2022",
      location: "Salem, Tamil Nadu",
      score: "Score: 69%",
      desc: "Focused on scientific and mathematical coursework, developing strong analytical thinking and quantitative reasoning foundations.",
    },
    {
      degree: "Secondary School Leaving Certificate (SSLC - Class 10)",
      institution: "Sarada Balamandir Higher Secondary School",
      period: "2019 — 2020",
      location: "Salem, Tamil Nadu",
      score: "Score: 52%",
      desc: "General secondary education laying mathematical and scientific fundamentals.",
    },
  ];

  const certs = [
    {
      id: "#CERT-01",
      title: "Robotic Process Automation",
      issuer: "UiPath",
      icon: ShieldCheck,
      color: "#3B82F6",
      desc: "Enterprise workflow automation, process mining, and software robot architecture.",
    },
    {
      id: "#CERT-02",
      title: "Oracle Cloud Infrastructure Architecture",
      issuer: "Oracle",
      icon: Award,
      color: "#F59E0B",
      desc: "Cloud infrastructure fundamentals, compute instances, VCN networking, and storage.",
    },
    {
      id: "#CERT-03",
      title: "Employability & Life Skills",
      issuer: "Infosys UNNATI",
      icon: CheckCircle2,
      color: "#10B981",
      desc: "Professional teamwork, collaborative communication, and workplace agility.",
    },
    {
      id: "#CERT-04",
      title: "Web Application Development Using AI",
      issuer: "Symphozen Labs",
      icon: Code,
      color: "#EC4899",
      desc: "Full-stack web application development accelerated with modern AI tooling.",
    },
    {
      id: "#CERT-05",
      title: "Programming in Java",
      issuer: "NPTEL",
      icon: Award,
      color: "#DC2626",
      desc: "Object-oriented programming, multithreading, collections framework, and JVM execution.",
    },
  ];

  return (
    <div className="space-y-16">
      
      {/* FIELD EXPERIENCE SECTION */}
      <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#1E1E1E] select-none">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <BuilderTarget id="exp-header" label="EXPERIENCE_INDEX">
            <div className="space-y-1">
              <div className="font-mono text-[10px] text-[#DC2626] font-bold tracking-widest uppercase">
                FIELD EXPERIENCE
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                Engineering Internship
              </h2>
              <p className="font-sans text-xs text-neutral-400 max-w-xl">
                Embedded hardware integration, sensor protocols, and edge telemetry execution.
              </p>
            </div>
          </BuilderTarget>

          {/* Odugaa Tech Card */}
          <BuilderTarget id="exp-card" label="ODUGAA_TELEMETRY">
            <div className="brutalist-card p-6 sm:p-8 space-y-6 !border-[#262626]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E1E1E] pb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 bg-[#050505] border border-[#DC2626]/40 flex items-center justify-center text-[#DC2626]">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-xl text-white">ODUGAA TECH</h3>
                    <div className="font-mono text-xs text-[#3B82F6] font-bold tracking-wider uppercase mt-0.5">
                      IoT ENGINEERING INTERN
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end font-mono text-[10px]">
                  <span className="px-2.5 py-1 bg-black border border-[#1E1E1E] text-[#F59E0B] font-bold">
                    JUN 2025 — AUG 2025
                  </span>
                  <span className="text-[#10B981] flex items-center gap-1 mt-1 text-[9px]">
                    <Zap className="w-3 h-3" />
                    <span>EMBEDDED HARDWARE CERTIFIED</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4 font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  <p>
                    During my tenure at Odugaa Tech, I was actively immersed in embedded hardware integration and data communication schemas, coding functional routines for local and cloud environments.
                  </p>

                  <div className="space-y-2.5 font-mono text-xs text-neutral-300">
                    {internResponsibilities.map((resp) => (
                      <div key={resp} className="flex items-start gap-2.5 p-2 bg-[#050505] border border-[#141414]">
                        <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Diagnostics Readout */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="w-full max-w-[320px] brutalist-card p-4 font-mono text-[10px] space-y-3 bg-[#050505]">
                    <div className="flex justify-between items-center text-[#F59E0B] border-b border-[#1E1E1E] pb-2 text-[9px]">
                      <span>HARDWARE_DIAGNOSTICS</span>
                      <span className="text-[#10B981] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping"></span>
                        ACTIVE
                      </span>
                    </div>

                    <div className="space-y-1.5 py-1">
                      <div className="flex justify-between text-neutral-400">
                        <span>VOLTAGE_RAIL:</span>
                        <span className="text-white font-bold">5.0V [STABLE]</span>
                      </div>
                      <div className="flex justify-between text-neutral-400">
                        <span>SIGNAL_ANALOG_A0:</span>
                        <span className="text-[#3B82F6] font-bold">{analogSignal} [MAX_INT]</span>
                      </div>
                      <div className="flex justify-between text-neutral-400">
                        <span>SERIAL_STREAM:</span>
                        <span className="text-[#10B981] font-bold">9600 BAUD [OK]</span>
                      </div>
                      <div className="flex justify-between text-neutral-400">
                        <span>MCU_CORE:</span>
                        <span className="text-white font-bold">ATmega328P</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#1E1E1E] text-neutral-500 text-[8px] flex justify-between">
                      <span>BOARD: ARDUINO UNO</span>
                      <span>PROTOCOL: UART</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BuilderTarget>

        </div>
      </section>

      {/* ACADEMIC EDUCATION SECTION */}
      <section id="education" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#1E1E1E] select-none">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <BuilderTarget id="edu-header" label="EDUCATION_INDEX">
            <div className="space-y-1">
              <div className="font-mono text-[10px] text-[#DC2626] font-bold tracking-widest uppercase">
                ACADEMIC RECORDS
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                Education Timeline
              </h2>
              <p className="font-sans text-xs text-neutral-400 max-w-xl">
                Curriculum milestones in computer applications, system methodologies, and software science.
              </p>
            </div>
          </BuilderTarget>

          {/* Education Timeline Cards */}
          <BuilderTarget id="edu-timeline" label="TIMELINE_GRID">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {educationTimeline.map((edu) => (
                <div key={edu.degree} className="brutalist-card p-5 flex flex-col justify-between group space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="px-2 py-0.5 bg-black border border-[#1E1E1E] text-[#F59E0B] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-neutral-400" />
                        {edu.period}
                      </span>
                      <span className="text-[#10B981] font-bold">{edu.score}</span>
                    </div>

                    <h3 className="font-display font-bold text-base text-white group-hover:text-[#DC2626] transition-colors">
                      {edu.degree}
                    </h3>

                    <div className="font-mono text-xs text-[#3B82F6] flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>{edu.institution}</span>
                      <span className="text-neutral-500">&bull; {edu.location}</span>
                    </div>

                    <p className="font-sans text-xs text-neutral-400 leading-relaxed pt-1">
                      {edu.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </BuilderTarget>

        </div>
      </section>

      {/* VERIFIED CREDENTIALS / CERTIFICATIONS SECTION */}
      <section id="certifications" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#1E1E1E] select-none">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <BuilderTarget id="cert-header" label="CREDENTIALS_INDEX">
            <div className="space-y-1">
              <div className="font-mono text-[10px] text-[#DC2626] font-bold tracking-widest uppercase">
                VERIFIED CREDENTIALS
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                Industry Certifications
              </h2>
              <p className="font-sans text-xs text-neutral-400 max-w-xl">
                Accredited specializations in cloud architectures, Java programming, RPA, and applied AI.
              </p>
            </div>
          </BuilderTarget>

          {/* Certifications Grid */}
          <BuilderTarget id="cert-grid" label="CERTS_GRID">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {certs.map((cert) => {
                const Icon = cert.icon;
                return (
                  <div key={cert.id} className="brutalist-card p-5 flex flex-col justify-between group space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between font-mono text-[9px] pb-2 border-b border-[#1E1E1E]">
                        <span className="text-[#DC2626] font-bold">{cert.id}</span>
                        <span className="text-neutral-400">ISSUED BY {cert.issuer}</span>
                      </div>

                      <div className="w-10 h-10 bg-[#050505] border border-[#1E1E1E] flex items-center justify-center">
                        <Icon className="w-5 h-5" style={{ color: cert.color }} />
                      </div>

                      <h3 className="font-display font-bold text-base text-white group-hover:text-[#DC2626] transition-colors leading-snug">
                        {cert.title}
                      </h3>

                      <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                        {cert.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#1E1E1E] flex items-center justify-between font-mono text-[9px]">
                      <span className="text-[#10B981] flex items-center gap-1 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                        VERIFIED STATUS
                      </span>
                      <span className="text-neutral-500 uppercase">OFFICIAL BADGE</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </BuilderTarget>

        </div>
      </section>

    </div>
  );
}
