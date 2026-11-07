"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from "react";

export type BuildState = "UNBUILT" | "QUEUED" | "BUILDING" | "BUILT";

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

interface QueuedItem {
  id: string;
  rect: DOMRect;
}

interface SwarmBuilderContextType {
  states: Record<string, BuildState>;
  speedMultiplier: number;
  totalElements: number;
  builtElements: number;
  isAllBuilt: boolean;
  agents: AgentCursor[];
  setAgents: React.Dispatch<React.SetStateAction<AgentCursor[]>>;
  registerElement: (id: string) => void;
  requestBuild: (id: string, rect?: DOMRect) => void;
  setSpeedMultiplier: (speed: number) => void;
  cycleSpeed: () => void;
  skipAll: () => void;
  replay: () => void;
  isElementBuilt: (id: string) => boolean;
  isElementBuilding: (id: string) => boolean;
  isElementUnbuilt: (id: string) => boolean;
}

const INITIAL_AGENTS: { id: string; name: string; color: string }[] = [
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
  const queueRef = useRef<QueuedItem[]>([]);
  const isProcessingQueue = useRef<boolean>(false);

  const [agents, setAgents] = useState<AgentCursor[]>(() =>
    INITIAL_AGENTS.map((a, i) => ({
      ...a,
      x: 100 + (i * 60) % 900,
      y: 100 + Math.floor(i / 4) * 90,
      targetX: 100 + (i * 60) % 900,
      targetY: 100 + Math.floor(i / 4) * 90,
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

  // Process queue sequentially with staggered concurrency (max 2 items building simultaneously)
  const processQueue = useCallback(() => {
    if (isProcessingQueue.current) return;
    if (queueRef.current.length === 0) return;

    isProcessingQueue.current = true;
    const item = queueRef.current.shift();
    if (!item) {
      isProcessingQueue.current = false;
      return;
    }

    const { id, rect } = item;

    // Set element state to BUILDING
    setStates((prev) => ({ ...prev, [id]: "BUILDING" }));

    // Dispatch 2-4 nearby agent cursors to bounding box
    setAgents((prev) => {
      // Find 3 available agents
      const unassignedIndices: number[] = [];
      prev.forEach((a, idx) => {
        if (!a.isAssigned) unassignedIndices.push(idx);
      });
      const chosenIndices = (unassignedIndices.length >= 3 ? unassignedIndices : prev.map((_, i) => i)).slice(0, 3);

      return prev.map((agent, idx) => {
        if (chosenIndices.includes(idx)) {
          const offsetX = (Math.random() - 0.5) * Math.min(rect.width * 0.8, 300);
          const offsetY = (Math.random() - 0.5) * Math.min(rect.height * 0.8, 120);
          return {
            ...agent,
            targetX: Math.max(20, rect.left + rect.width / 2 + offsetX),
            targetY: Math.max(20, rect.top + rect.height / 2 + offsetY),
            isAssigned: true,
            assignedTargetId: id,
          };
        }
        return agent;
      });
    });

    // Building duration (650ms adjusted by speedMultiplier)
    const baseDuration = 650;
    const duration = baseDuration / speedMultiplier;

    setTimeout(() => {
      // Mark BUILT
      setStates((prev) => ({ ...prev, [id]: "BUILT" }));

      // Release assigned agents
      setAgents((prev) =>
        prev.map((a) => (a.assignedTargetId === id ? { ...a, isAssigned: false, assignedTargetId: undefined } : a))
      );

      isProcessingQueue.current = false;
      // Stagger to next queued item
      setTimeout(() => {
        processQueue();
      }, 50 / speedMultiplier);
    }, duration);
  }, [speedMultiplier]);

  const requestBuild = useCallback(
    (id: string, rect?: DOMRect) => {
      setStates((prev) => {
        if (prev[id] === "BUILDING" || prev[id] === "BUILT" || prev[id] === "QUEUED") return prev;
        return { ...prev, [id]: "QUEUED" };
      });

      if (rect) {
        queueRef.current.push({ id, rect });
        processQueue();
      }
    },
    [processQueue]
  );

  const cycleSpeed = useCallback(() => {
    setSpeedMultiplier((curr) => {
      if (curr === 1) return 1.5;
      if (curr === 1.5) return 2;
      return 1;
    });
  }, []);

  const skipAll = useCallback(() => {
    queueRef.current = [];
    isProcessingQueue.current = false;
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
    queueRef.current = [];
    isProcessingQueue.current = false;
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
        x: 100 + (i * 60) % 900,
        y: 100 + Math.floor(i / 4) * 90,
        targetX: 100 + (i * 60) % 900,
        targetY: 100 + Math.floor(i / 4) * 90,
        isAssigned: false,
        assignedTargetId: undefined,
      }))
    );
  }, []);

  const isElementBuilt = useCallback((id: string) => states[id] === "BUILT", [states]);
  const isElementBuilding = useCallback((id: string) => states[id] === "BUILDING", [states]);
  const isElementUnbuilt = useCallback((id: string) => states[id] === "UNBUILT" || states[id] === "QUEUED", [states]);

  // Idle roaming & footer circle orbit
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
            // Target is assigned, position is driven by Framer Motion or spring physics
            return agent;
          }

          if (isAllBuilt) {
            // Idle Orbit on right side of footer
            const centerX = w - 180;
            const centerY = h * 0.55;
            const radius = 55 + (i % 6) * 16;
            const a = angle + (i * (Math.PI * 2 / 16));
            return {
              ...agent,
              targetX: centerX + Math.cos(a) * radius,
              targetY: centerY + Math.sin(a) * radius,
            };
          }

          // Random roaming
          const dist = Math.hypot(agent.targetX - agent.x, agent.targetY - agent.y);
          if (dist < 30 || Math.random() < 0.007) {
            return {
              ...agent,
              targetX: Math.max(40, Math.min(w - 70, Math.random() * w)),
              targetY: Math.max(70, Math.min(h - 70, Math.random() * h)),
            };
          }

          return agent;
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
        setAgents,
        registerElement,
        requestBuild,
        setSpeedMultiplier,
        cycleSpeed,
        skipAll,
        replay,
        isElementBuilt,
        isElementBuilding,
        isElementUnbuilt,
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
