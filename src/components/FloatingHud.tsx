"use client";

import React from "react";
import { RotateCcw, FastForward, Gauge } from "lucide-react";
import { useSwarmBuilder } from "@/context/SwarmBuilderContext";

export function FloatingHud() {
  const {
    speedMultiplier,
    totalElements,
    builtElements,
    isAllBuilt,
    cycleSpeed,
    skipAll,
    replay,
  } = useSwarmBuilder();

  const progressPercent = totalElements > 0 ? (builtElements / totalElements) * 100 : 0;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-xl select-none">
      <div className="bg-[#0C0C0C]/95 backdrop-blur-md border border-[#1E1E1E] px-4 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.95)] flex items-center justify-between gap-3 font-mono text-[10px]">
        
        {/* Left: Swarm Colored Dots + Status Text */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex -space-x-1 items-center">
            <span className="w-2 h-2 rounded-full bg-[#DC2626] border border-black"></span>
            <span className="w-2 h-2 rounded-full bg-[#3B82F6] border border-black"></span>
            <span className="w-2 h-2 rounded-full bg-[#10B981] border border-black"></span>
            <span className="w-2 h-2 rounded-full bg-[#F59E0B] border border-black"></span>
          </div>
          <span className="text-[#FAFAFA] font-bold">
            {isAllBuilt ? "Built by 16 agents" : "Swarming (16)"}
          </span>
        </div>

        {/* Center: Thin Progress Bar */}
        <div className="flex-1 flex items-center gap-2 max-w-[160px] hidden sm:flex">
          <span className="text-neutral-500 text-[9px] shrink-0">
            {builtElements}/{totalElements}
          </span>
          <div className="flex-1 h-1 bg-[#141414] overflow-hidden border border-[#1E1E1E]">
            <div
              className="h-full bg-gradient-to-r from-[#DC2626] via-[#3B82F6] to-[#10B981] transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Right: Speed Multiplier + Skip + Replay */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Speed Multiplier Button */}
          <button
            type="button"
            onClick={cycleSpeed}
            className="px-2 py-0.5 bg-[#141414] border border-[#262626] text-neutral-300 hover:text-white hover:border-[#3B82F6] transition-colors flex items-center gap-1 cursor-pointer"
            title="Toggle build speed multiplier (1x, 1.5x, 2x)"
          >
            <Gauge className="w-3 h-3 text-[#3B82F6]" />
            <span>{speedMultiplier}x</span>
          </button>

          {/* Skip Button */}
          {!isAllBuilt && (
            <button
              type="button"
              onClick={skipAll}
              className="px-2 py-0.5 bg-[#141414] border border-[#262626] text-neutral-300 hover:text-[#DC2626] transition-colors flex items-center gap-1 cursor-pointer"
              title="Instantly finish all constructions"
            >
              <FastForward className="w-3 h-3" />
              <span>Skip</span>
            </button>
          )}

          {/* Replay Button */}
          <button
            type="button"
            onClick={replay}
            className="px-2.5 py-0.5 bg-[#141414] border border-[#262626] text-neutral-300 hover:text-[#3B82F6] hover:border-[#3B82F6] transition-colors flex items-center gap-1 cursor-pointer active:scale-95"
            title="Reset and replay construction state machine"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Replay</span>
          </button>
        </div>

      </div>
    </div>
  );
}
