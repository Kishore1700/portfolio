"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

export type BuildState = "UNBUILT" | "BUILDING" | "BUILT";

export interface AgentCursor {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  isAssigned: boolean;
  assignedTargetId?: string;
}

interface SwarmBuilderContextType {
  states: Record<string, BuildState>;
  speedMultiplier: number;
  totalElements: number;
  builtElements: number;
  isAllBuilt: boolean;
  agents: AgentCursor[];
  registerElement: (id: string) => void;
  triggerBuild: (id: string, rect?: DOMRect) => void;
  setSpeedMultiplier: (speed: number) => void;
  cycleSpeed: () => void;
  skipAll: () => void;
  replay: () => void;
  isElementBuilt: (id: string) => boolean;
  isElementBuilding: (id: string) => boolean;
}

const INITIAL_AGENTS: Omit<AgentCursor, "x" | "y" | "targetX" | "targetY" | "isAssigned">[] = [
  { id: "agent_01", name: "agent_01", color: "#DC2626" },
  { id: "agent_02", name: "agent_02", color: "#3B82F6" },
  { id: "agent_03", name: "agent_03", color: "#10B981" },
  { id: "agent_04", name: "agent_04", color: "#F59E0B" },
  { id: "agent_05", name: "agent_05", color: "#EC4899" },
  { id: "agent_06", name: "agent_06", color: "#8B5CF6" },
  { id: "agent_07", name: "agent_07", color: "#06B6D4" },
  { id: "agent_08", name: "agent_08", color: "#F97316" },
  { id: "agent_09", name: "agent_09", color: "#14B8A6" },
  { id: "agent_10", name: "agent_10", color: "#6366F1" },
  { id: "agent_11", name: "agent_11", color: "#E11D48" },
  { id: "agent_12", name: "agent_12", color: "#84CC16" },
  { id: "agent_13", name: "agent_13", color: "#D946EF" },
  { id: "agent_14", name: "agent_14", color: "#22D3EE" },
  { id: "agent_15", name: "agent_15", color: "#A855F7" },
  { id: "agent_16", name: "agent_16", color: "#F43F5E" },
];

const SwarmBuilderContext = createContext<SwarmBuilderContextType | undefined>(undefined);

export function SwarmBuilderProvider({ children }: { children: React.ReactNode }) {
  const [states, setStates] = useState<Record<string, BuildState>>({});
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [agents, setAgents] = useState<AgentCursor[]>(() =>
    INITIAL_AGENTS.map((a, i) => ({
      ...a,
      x: 100 + (i * 50) % 800,
      y: 100 + Math.floor(i / 4) * 80,
      targetX: 100 + (i * 50) % 800,
      targetY: 100 + Math.floor(i / 4) * 80,
      isAssigned: false,
    }))
  );

  const registeredKeys = useMemo(() => Object.keys(states), [states]);
  const totalElements = registeredKeys.length;
  const builtElements = useMemo(
    () => registeredKeys.filter((k) => states[k] === "BUILT").length,
    [registeredKeys, states]
  );
  const isAllBuilt = totalElements > 0 && builtElements === totalElements;

  const registerElement = useCallback((id: string) => {
    setStates((prev) => {
      if (prev[id]) return prev;
      return { ...prev, [id]: "UNBUILT" };
    });
  }, []);

  const triggerBuild = useCallback(
    (id: string, rect?: DOMRect) => {
      setStates((prev) => {
        if (prev[id] === "BUILDING" || prev[id] === "BUILT") return prev;
        return { ...prev, [id]: "BUILDING" };
      });

      // Dispatch 2 to 4 cursors to the target element's bounding box
      if (rect) {
        setAgents((prevAgents) => {
          const availableIndices = prevAgents
            .map((a, idx) => ({ idx, isAssigned: a.isAssigned }))
            .sort((a, b) => (a.isAssigned === b.isAssigned ? 0 : a.isAssigned ? 1 : -1))
            .slice(0, 3)
            .map((item) => item.idx);

          return prevAgents.map((agent, idx) => {
            if (availableIndices.includes(idx)) {
              const offsetX = (Math.random() - 0.5) * (rect.width * 0.7);
              const offsetY = (Math.random() - 0.5) * (rect.height * 0.7);
              return {
                ...agent,
                targetX: rect.left + rect.width / 2 + offsetX,
                targetY: rect.top + rect.height / 2 + offsetY,
                isAssigned: true,
                assignedTargetId: id,
              };
            }
            return agent;
          });
        });
      }

      // Building duration (600ms - 900ms adjusted by speedMultiplier)
      const baseDuration = 750;
      const duration = baseDuration / speedMultiplier;

      setTimeout(() => {
        setStates((prev) => ({ ...prev, [id]: "BUILT" }));
        // Release assigned agents
        setAgents((prev) =>
          prev.map((a) => (a.assignedTargetId === id ? { ...a, isAssigned: false, assignedTargetId: undefined } : a))
        );
      }, duration);
    },
    [speedMultiplier]
  );

  const cycleSpeed = useCallback(() => {
    setSpeedMultiplier((curr) => {
      if (curr === 1) return 1.5;
      if (curr === 1.5) return 2;
      return 1;
    });
  }, []);

  const skipAll = useCallback(() => {
    setStates((prev) => {
      const next: Record<string, BuildState> = {};
      Object.keys(prev).forEach((k) => {
        next[k] = "BUILT";
      });
      return next;
    });
    setAgents((prev) => prev.map((a) => ({ ...a, isAssigned: false, assignedTargetId: undefined })));
  }, []);

  const replay = useCallback(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setStates((prev) => {
      const next: Record<string, BuildState> = {};
      Object.keys(prev).forEach((k) => {
        next[k] = "UNBUILT";
      });
      return next;
    });
    setAgents((prev) =>
      prev.map((a, i) => ({
        ...a,
        x: 100 + (i * 50) % 800,
        y: 100 + Math.floor(i / 4) * 80,
        targetX: 100 + (i * 50) % 800,
        targetY: 100 + Math.floor(i / 4) * 80,
        isAssigned: false,
        assignedTargetId: undefined,
      }))
    );
  }, []);

  const isElementBuilt = useCallback((id: string) => states[id] === "BUILT", [states]);
  const isElementBuilding = useCallback((id: string) => states[id] === "BUILDING", [states]);

  // Swarm idle roving and footer orbit loop
  useEffect(() => {
    let animId: number;
    let angle = 0;

    const tick = () => {
      angle += 0.02 * speedMultiplier;
      const w = typeof window !== "undefined" ? window.innerWidth : 1200;
      const h = typeof window !== "undefined" ? window.innerHeight : 800;

      setAgents((prev) =>
        prev.map((agent, i) => {
          if (agent.isAssigned) {
            // Spring towards target
            const dx = agent.targetX - agent.x;
            const dy = agent.targetY - agent.y;
            return {
              ...agent,
              x: agent.x + dx * 0.14 * speedMultiplier,
              y: agent.y + dy * 0.14 * speedMultiplier,
            };
          }

          if (isAllBuilt) {
            // Idle Orbit on right side of screen / footer
            const centerX = w - 160;
            const centerY = h * 0.6;
            const radius = 60 + (i % 6) * 14;
            const a = angle + (i * (Math.PI * 2 / 16));
            const targetX = centerX + Math.cos(a) * radius;
            const targetY = centerY + Math.sin(a) * radius;
            return {
              ...agent,
              x: agent.x + (targetX - agent.x) * 0.08,
              y: agent.y + (targetY - agent.y) * 0.08,
            };
          }

          // Random autonomous roving
          const dist = Math.hypot(agent.targetX - agent.x, agent.targetY - agent.y);
          if (dist < 30 || Math.random() < 0.008) {
            const nextX = Math.max(50, Math.min(w - 70, Math.random() * w));
            const nextY = Math.max(70, Math.min(h - 70, Math.random() * h));
            return {
              ...agent,
              targetX: nextX,
              targetY: nextY,
            };
          }

          return {
            ...agent,
            x: agent.x + (agent.targetX - agent.x) * 0.04 * speedMultiplier,
            y: agent.y + (agent.targetY - agent.y) * 0.04 * speedMultiplier,
          };
        })
      );

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isAllBuilt, speedMultiplier]);

  return (
    <SwarmBuilderContext.Provider
      value={{
        states,
        speedMultiplier,
        totalElements,
        builtElements,
        isAllBuilt,
        agents,
        registerElement,
        triggerBuild,
        setSpeedMultiplier,
        cycleSpeed,
        skipAll,
        replay,
        isElementBuilt,
        isElementBuilding,
      }}
    >
      {children}
    </SwarmBuilderContext.Provider>
  );
}

export function useSwarmBuilder() {
  const context = useContext(SwarmBuilderContext);
  if (!context) {
    throw new Error("useSwarmBuilder must be used within a SwarmBuilderProvider");
  }
  return context;
}

