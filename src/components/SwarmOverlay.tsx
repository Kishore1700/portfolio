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
            damping: 24,
            stiffness: 160,
            mass: 0.5,
          }}
        >
          {/* Arrow Cursor SVG */}
          <svg
            className="w-4 h-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
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
          </svg>

          {/* Colored Agent Pill Tag */}
          <div
            className="absolute left-3.5 top-2.5 px-1.5 py-0.5 font-mono text-[8px] font-bold text-white whitespace-nowrap border border-black shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            style={{ backgroundColor: agent.color }}
          >
            {agent.name}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
