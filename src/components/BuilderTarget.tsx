"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSwarmBuilder } from "@/context/SwarmBuilderContext";

interface BuilderTargetProps {
  id: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
}

export function BuilderTarget({ id, label = "LAYER_BUILDER", className = "", children }: BuilderTargetProps) {
  const { registerElement, triggerBuild, isElementBuilt, isElementBuilding, speedMultiplier } = useSwarmBuilder();
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const built = isElementBuilt(id);
  const building = isElementBuilding(id);

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
            triggerBuild(id, rect);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [id, triggerBuild]);

  return (
    <div ref={ref} id={id} className={`relative transition-all duration-300 ${className}`}>
      {/* BUILDING PHASE: Figma Blue (#3B82F6) wireframe border, 4 corner squares (6x6px), and progress line */}
      {building && (
        <div className="absolute -inset-1 border border-[#3B82F6] bg-[#3B82F6]/[0.08] z-30 pointer-events-none animate-pulse">
          {/* 4 Corner 6x6px Resize Squares */}
          <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-[#3B82F6] border border-black"></div>
          <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#3B82F6] border border-black"></div>
          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-[#3B82F6] border border-black"></div>
          <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-[#3B82F6] border border-black"></div>

          {/* Dimension Tag */}
          <div className="absolute -bottom-4 left-0 font-mono text-[9px] text-[#3B82F6] bg-black px-1.5 py-0.5 border border-[#3B82F6]/60 whitespace-nowrap shadow-md flex items-center gap-1">
            <span>{label}</span>
            <span className="text-neutral-500">
              ({dimensions.width || 120} × {dimensions.height || 40})
            </span>
          </div>

          {/* Thin Progress Bar along bottom */}
          <div className="absolute bottom-0 left-0 h-[2px] bg-[#3B82F6] w-full animate-[progress_0.75s_linear]"></div>
        </div>
      )}

      {/* Content Visibility */}
      <div
        className={`transition-all duration-300 ${
          built ? "opacity-100 scale-100" : building ? "opacity-75 blur-[0.5px]" : "opacity-0 scale-[0.98] pointer-events-none"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

