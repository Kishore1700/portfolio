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
  const { registerElement, requestBuild, isElementBuilt, isElementBuilding, isElementUnbuilt } = useSwarmBuilder();
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const built = isElementBuilt(id);
  const building = isElementBuilding(id);
  const unbuilt = isElementUnbuilt(id);

  useEffect(() => {
    registerElement(id);
  }, [id, registerElement]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = entry.target.getBoundingClientRect();
            setDimensions({ width: Math.round(rect.width), height: Math.round(rect.height) });
            requestBuild(id, rect);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [id, requestBuild]);

  return (
    <div ref={ref} id={id} className={`relative transition-all duration-300 ${className}`}>
      
      {/* UNBUILT STATE: Lightweight wireframe blueprint placeholder */}
      {unbuilt && (
        <div className="absolute inset-0 border border-[#3B82F6]/25 bg-[#3B82F6]/[0.02] z-20 pointer-events-none">
          <div className="absolute -top-[3px] -left-[3px] w-[6px] h-[6px] bg-[#3B82F6]/40 border border-black"></div>
          <div className="absolute -top-[3px] -right-[3px] w-[6px] h-[6px] bg-[#3B82F6]/40 border border-black"></div>
          <div className="absolute -bottom-[3px] -left-[3px] w-[6px] h-[6px] bg-[#3B82F6]/40 border border-black"></div>
          <div className="absolute -bottom-[3px] -right-[3px] w-[6px] h-[6px] bg-[#3B82F6]/40 border border-black"></div>
        </div>
      )}

      {/* BUILDING PHASE: Figma Blue (#3B82F6) wireframe border, 4 corner 6x6px resize squares, streaming typing effect, and thin progress bar */}
      {building && (
        <div className="absolute -inset-1 border border-[#3B82F6] bg-[#3B82F6]/[0.08] z-30 pointer-events-none shadow-[0_0_20px_rgba(59,130,246,0.35)]">
          {/* 4 Corner 6x6px Resize Squares */}
          <div className="absolute -top-[3px] -left-[3px] w-[6px] h-[6px] bg-[#3B82F6] border border-black"></div>
          <div className="absolute -top-[3px] -right-[3px] w-[6px] h-[6px] bg-[#3B82F6] border border-black"></div>
          <div className="absolute -bottom-[3px] -left-[3px] w-[6px] h-[6px] bg-[#3B82F6] border border-black"></div>
          <div className="absolute -bottom-[3px] -right-[3px] w-[6px] h-[6px] bg-[#3B82F6] border border-black"></div>

          {/* Dimension Tag */}
          <div className="absolute -bottom-5 left-0 font-mono text-[9px] text-[#3B82F6] bg-black px-1.5 py-0.5 border border-[#3B82F6]/70 whitespace-nowrap shadow-md flex items-center gap-1.5 select-none">
            <span>{label}</span>
            <span className="text-neutral-500">
              {dimensions.width || 120} &times; {dimensions.height || 36}
            </span>
          </div>

          {/* Simulated Streaming Text Effect & Typing Caret */}
          <div className="absolute top-2 right-2 flex items-center gap-1 font-mono text-[9px] text-[#3B82F6] bg-black/90 px-1.5 py-0.5 border border-[#3B82F6]/50 animate-pulse">
            <span>STREAMING_BYTES</span>
            <span className="font-bold text-white">|</span>
          </div>

          {/* Thin Progress Bar along Bottom */}
          <div className="absolute bottom-0 left-0 h-[2px] bg-[#3B82F6] w-full animate-[progress_0.75s_linear]"></div>
        </div>
      )}

      {/* BUILT PHASE: Snaps into final styled component */}
      <div
        className={`transition-all duration-300 ${
          built
            ? "opacity-100 scale-100"
            : building
            ? "opacity-80 blur-[0.5px]"
            : "opacity-0 scale-[0.99] pointer-events-none"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
