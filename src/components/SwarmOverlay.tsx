"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSwarmBuilder } from "@/context/SwarmBuilderContext";

export function SwarmOverlay() {
  const { agents } = useSwarmBuilder();

  return (
    <div className="fixed inset-0 pointer-events-none z-[9990] overflow-hidden select-none">
      {agents.map((agent) => (
        <motion.div
          key={agent.id}
          className="absolute will-change-transform"
          animate={{ x: agent.targetX, y: agent.targetY }}
          transition={{
            type: "spring",
            damping: 26,
            stiffness: 180,
            mass: 0.45,
          }}
        >
          {/* Arrow Cursor SVG with Sharp Tip & Luminous Core */}
          <div className="relative">
            <svg
              className="w-4 h-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                fill={agent.color}
                stroke="#000000"
                strokeWidth="1.5"
              />
              {/* Luminous Tip Point */}
              <circle cx="4" cy="4" r="1.5" fill="#FFFFFF" opacity="0.9" />
            </svg>

            {/* Micro Ping Beacon when Actively Assigned */}
            {agent.isAssigned && (
              <span
                className="absolute -top-1 -left-1 w-3 h-3 rounded-full animate-ping opacity-75 pointer-events-none"
                style={{ backgroundColor: agent.color }}
              ></span>
            )}
          </div>

          {/* Frosted Glass Agent Pill Tag */}
          <div
            className={`absolute left-3.5 top-2.5 px-2 py-0.5 font-mono text-[8.5px] font-bold text-white whitespace-nowrap bg-black/90 backdrop-blur-md border shadow-[0_4px_16px_rgba(0,0,0,0.95)] flex items-center gap-1.5 transition-all ${
              agent.isAssigned
                ? "ring-1 ring-white/60 shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                : "opacity-85"
            }`}
            style={{ borderColor: agent.color }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: agent.color }}
            ></span>
            <span>{agent.name}</span>
            {agent.role && (
              <span className="text-[7.5px] text-neutral-400 font-normal uppercase tracking-wider">
                {agent.role}
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
