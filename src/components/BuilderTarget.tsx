"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSwarmBuilder } from "@/context/SwarmBuilderContext";

interface BuilderTargetProps {
  id: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
}

export function BuilderTarget({ id, label = "CAD // LAYER", className = "", children }: BuilderTargetProps) {
  const {
    registerElement,
    requestBuild,
    isElementBuilt,
    isElementBuilding,
    isElementUnbuilt,
    getTypeProgress,
  } = useSwarmBuilder();

  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const built = isElementBuilt(id);
  const building = isElementBuilding(id);
  const unbuilt = isElementUnbuilt(id);
  const progress = Math.max(0, Math.min(1, getTypeProgress(id) || getTypeProgress(`${id}-text`) || 0));

  useEffect(() => {
    registerElement(id);
  }, [id, registerElement]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && isElementUnbuilt(id)) {
            const rect = entry.target.getBoundingClientRect();
            setDimensions({ width: Math.round(rect.width), height: Math.round(rect.height) });
            requestBuild(id);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [id, requestBuild, isElementUnbuilt]);

  return (
    <div ref={ref} id={id} className={`relative transition-all duration-300 ${className}`}>
      
      {/* BUILDING PHASE: Figma Blue (#3B82F6) wireframe border, 4 corner 6x6px resize squares, scanning laser, streaming typing effect, and live progress bar */}
      {building && (
        <div className="absolute -inset-1 border border-[#3B82F6] bg-[#3B82F6]/[0.08] z-30 pointer-events-none shadow-[0_0_25px_rgba(59,130,246,0.35)] overflow-hidden">
          
          {/* Animated Scanning Laser Sweep */}
          <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent animate-laser-sweep opacity-75 shadow-[0_0_8px_#3B82F6]"></div>

          {/* 4 Corner 6x6px Resize Squares */}
          <div className="absolute -top-[3px] -left-[3px] w-[6px] h-[6px] bg-[#3B82F6] border border-black shadow-sm"></div>
          <div className="absolute -top-[3px] -right-[3px] w-[6px] h-[6px] bg-[#3B82F6] border border-black shadow-sm"></div>
          <div className="absolute -bottom-[3px] -left-[3px] w-[6px] h-[6px] bg-[#3B82F6] border border-black shadow-sm"></div>
          <div className="absolute -bottom-[3px] -right-[3px] w-[6px] h-[6px] bg-[#3B82F6] border border-black shadow-sm"></div>

          {/* Dimension & CAD Layer Tag */}
          <div className="absolute -bottom-5 left-0 font-mono text-[9px] text-[#3B82F6] bg-black/95 px-2 py-0.5 border border-[#3B82F6]/70 whitespace-nowrap shadow-md flex items-center gap-1.5 select-none">
            <span className="font-bold">{label}</span>
            <span className="text-neutral-500">
              {dimensions.width || 140} &times; {dimensions.height || 40}px
            </span>
          </div>

          {/* Simulated Streaming Bytes & Typing Caret */}
          <div className="absolute top-2 right-2 flex items-center gap-1.5 font-mono text-[9px] text-[#3B82F6] bg-black/95 px-2 py-0.5 border border-[#3B82F6]/60 shadow-sm animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></span>
            <span>STREAMING_BYTES</span>
            <span className="font-bold text-white">|</span>
          </div>

          {/* Live Synchronized Progress Bar along Bottom */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black/60">
            <div
              className="h-full bg-gradient-to-r from-[#3B82F6] to-cyan-400 transition-all duration-75 shadow-[0_0_8px_#3B82F6]"
              style={{ width: `${Math.round(progress * 100)}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* BUILT PHASE: Snaps into final styled component; UNBUILT: completely hidden placeholder */}
      <div
        className={`transition-all duration-300 ${
          built
            ? "opacity-100 scale-100"
            : building
            ? "opacity-90 blur-[0.2px]"
            : "opacity-0 scale-[0.99] pointer-events-none"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
