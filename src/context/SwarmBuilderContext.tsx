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
  role?: "lead" | "wing1" | "wing2";
}

interface SwarmBuilderContextType {
  states: Record<string, BuildState>;
  typingProgress: Record<string, number>; // 0 to 1
  speedMultiplier: number;
  totalElements: number;
  builtElements: number;
  isAllBuilt: boolean;
  agents: AgentCursor[];
  registerElement: (id: string) => void;
  requestBuild: (id: string) => void;
  setSpeedMultiplier: (speed: number) => void;
  cycleSpeed: () => void;
  skipAll: () => void;
  replay: () => void;
  isElementBuilt: (id: string) => boolean;
  isElementBuilding: (id: string) => boolean;
  isElementUnbuilt: (id: string) => boolean;
  getTypeProgress: (id: string) => number;
}

const INITIAL_AGENTS_CONFIG: { id: string; name: string; color: string }[] = [
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

// Ordered Hero elements to build sequentially on startup and replay
const HERO_SEQUENCE = [
  "hero-backdrop",
  "hero-greet",
  "hero-name",
  "hero-role",
  "hero-summary",
  "hero-actions",
  "hero-portrait",
  "hero-runtimes",
  "hero-metrics",
];

const SwarmBuilderContext = createContext<SwarmBuilderContextType | undefined>(undefined);

export function SwarmBuilderProvider({ children }: { children: React.ReactNode }) {
  const [states, setStates] = useState<Record<string, BuildState>>({});
  const [typingProgress, setTypingProgress] = useState<Record<string, number>>({});
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);

  // References for managing queues, concurrency, and timers
  const buildQueue = useRef<string[]>([]);
  const isHeroSequenceActive = useRef<boolean>(false);
  const activeTimers = useRef<NodeJS.Timeout[]>([]);
  const activeIntervals = useRef<NodeJS.Timeout[]>([]);
  const activeBuilds = useRef<Set<string>>(new Set());

  // 16 Autonomous SVG Cursors
  const [agents, setAgents] = useState<AgentCursor[]>(() =>
    INITIAL_AGENTS_CONFIG.map((a, i) => ({
      ...a,
      x: 120 + (i * 55) % 900,
      y: 90 + Math.floor(i / 4) * 80,
      targetX: 120 + (i * 55) % 900,
      targetY: 90 + Math.floor(i / 4) * 80,
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

  // Clear all running timeouts and intervals
  const clearAllTimers = useCallback(() => {
    activeTimers.current.forEach(clearTimeout);
    activeTimers.current = [];
    activeIntervals.current.forEach(clearInterval);
    activeIntervals.current = [];
  }, []);

  const registerElement = useCallback((id: string) => {
    setStates((prev) => {
      if (prev[id] !== undefined) return prev;
      return { ...prev, [id]: "UNBUILT" };
    });
    setTypingProgress((prev) => {
      if (prev[id] !== undefined) return prev;
      return { ...prev, [id]: 0 };
    });
  }, []);

  // Multi-Agent Element Construction Routine
  const executeElementBuild = useCallback(
    (id: string, onDone: () => void) => {
      if (typeof document === "undefined") {
        onDone();
        return;
      }

      const el = document.getElementById(id);
      if (!el) {
        onDone();
        return;
      }

      const rect = el.getBoundingClientRect();
      const startX = Math.max(10, rect.left + 8);
      const startY = Math.max(10, rect.top + rect.height * 0.5);
      const endX = Math.max(startX + 25, rect.left + rect.width - 8);
      const sweepDistance = endX - startX;

      // 1. Assign a team of 2-3 agents for this element
      let leadAgentId = "";
      let wingAgent1Id = "";
      let wingAgent2Id = "";

      setAgents((prev) => {
        const available = prev.filter((a) => !a.isAssigned);
        const team = available.slice(0, 3);
        
        if (team.length === 0) {
          // Fallback to any agent
          leadAgentId = prev[0]?.id || "agent_01";
        } else {
          leadAgentId = team[0].id;
          if (team[1]) wingAgent1Id = team[1].id;
          if (team[2]) wingAgent2Id = team[2].id;
        }

        // PHASE 1 (FLIGHT): Cursors fly to the start positions.
        // Element remains UNBUILT with 0 characters shown!
        return prev.map((agent) => {
          if (agent.id === leadAgentId) {
            return {
              ...agent,
              targetX: startX,
              targetY: startY,
              isAssigned: true,
              assignedTargetId: id,
              role: "lead",
            };
          }
          if (wingAgent1Id && agent.id === wingAgent1Id) {
            return {
              ...agent,
              targetX: Math.max(10, rect.right - 10),
              targetY: Math.max(10, rect.top + 10),
              isAssigned: true,
              assignedTargetId: id,
              role: "wing1",
            };
          }
          if (wingAgent2Id && agent.id === wingAgent2Id) {
            return {
              ...agent,
              targetX: Math.max(10, rect.right - 10),
              targetY: Math.max(10, rect.bottom - 10),
              isAssigned: true,
              assignedTargetId: id,
              role: "wing2",
            };
          }
          return agent;
        });
      });

      // Flight time allowance for spring physics to travel to element
      const flightDuration = Math.round(300 / speedMultiplier);

      const flightTimer = setTimeout(() => {
        // PHASE 2 (CONSTRUCTION & SWEEP): Cursors have arrived!
        // Now turn on Figma Blue wireframe (#3B82F6) and sweep cursor across to type/reveal!
        setStates((prev) => ({ ...prev, [id]: "BUILDING" }));

        // Sweep duration based on element width
        const baseSweepDuration = Math.min(850, Math.max(340, sweepDistance * 1.1));
        const sweepDuration = Math.round(baseSweepDuration / speedMultiplier);
        const startTime = Date.now();

        const sweepInterval = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(1, elapsed / sweepDuration);

          // Update typing / reveal progress for this element and any related sub-id
          setTypingProgress((prev) => ({
            ...prev,
            [id]: progress,
            [`${id}-text`]: progress,
          }));

          // Lead cursor physically sweeps from startX to endX, leading the revealed letters!
          const currentCursorX = startX + progress * sweepDistance;

          setAgents((prev) =>
            prev.map((agent) => {
              if (agent.id === leadAgentId) {
                return {
                  ...agent,
                  targetX: currentCursorX,
                  targetY: startY,
                };
              }
              if (wingAgent1Id && agent.id === wingAgent1Id) {
                // Subtle breathing movement on corner resize handle
                return {
                  ...agent,
                  targetX: Math.max(10, rect.right - 10 + Math.sin(elapsed * 0.01) * 3),
                  targetY: Math.max(10, rect.top + 10),
                };
              }
              return agent;
            })
          );

          // PHASE 3 (BUILT): Sweep complete! Element snaps into place!
          if (progress >= 1) {
            clearInterval(sweepInterval);
            activeIntervals.current = activeIntervals.current.filter((i) => i !== sweepInterval);

            setStates((prev) => ({
              ...prev,
              [id]: "BUILT",
              [`${id}-text`]: "BUILT",
            }));
            setTypingProgress((prev) => ({
              ...prev,
              [id]: 1,
              [`${id}-text`]: 1,
            }));

            // Release the assigned agents
            setAgents((prev) =>
              prev.map((agent) =>
                agent.assignedTargetId === id
                  ? { ...agent, isAssigned: false, assignedTargetId: undefined, role: undefined }
                  : agent
              )
            );

            // Brief pacing before next element
            const pauseTimer = setTimeout(() => {
              onDone();
            }, Math.round(50 / speedMultiplier));
            activeTimers.current.push(pauseTimer);
          }
        }, 16);

        activeIntervals.current.push(sweepInterval);
      }, flightDuration);

      activeTimers.current.push(flightTimer);
    },
    [speedMultiplier]
  );

  // Sequential queue dispatcher
  const processNextInQueue = useCallback(() => {
    if (buildQueue.current.length === 0) {
      isHeroSequenceActive.current = false;
      return;
    }

    const nextId = buildQueue.current.shift()!;

    setStates((currentStates) => {
      if (currentStates[nextId] === "BUILT") {
        setTimeout(processNextInQueue, 10);
        return currentStates;
      }

      activeBuilds.current.add(nextId);

      executeElementBuild(nextId, () => {
        activeBuilds.current.delete(nextId);
        processNextInQueue();
      });

      return currentStates;
    });
  }, [executeElementBuild]);

  const enqueue = useCallback(
    (id: string) => {
      if (!buildQueue.current.includes(id)) {
        buildQueue.current.push(id);
      }
      if (activeBuilds.current.size === 0) {
        processNextInQueue();
      }
    },
    [processNextInQueue]
  );

  // Request build triggered by IntersectionObserver or auto-sequence
  const requestBuild = useCallback(
    (id: string) => {
      setStates((prev) => {
        if (prev[id] === "BUILDING" || prev[id] === "BUILT" || prev[id] === "QUEUED") return prev;
        return { ...prev, [id]: "QUEUED" };
      });
      enqueue(id);
    },
    [enqueue]
  );

  // Master Hero Sequence
  const startHeroSequence = useCallback(() => {
    clearAllTimers();
    buildQueue.current = [];
    activeBuilds.current.clear();
    isHeroSequenceActive.current = true;

    // Enqueue Hero elements in strict deliberate sequence
    HERO_SEQUENCE.forEach((id) => {
      if (!buildQueue.current.includes(id)) {
        buildQueue.current.push(id);
      }
    });

    const initTimer = setTimeout(() => {
      processNextInQueue();
    }, 250);
    activeTimers.current.push(initTimer);
  }, [clearAllTimers, processNextInQueue]);

  // Initial auto-start on mount
  useEffect(() => {
    const startupTimer = setTimeout(() => {
      startHeroSequence();
    }, 350);
    return () => clearTimeout(startupTimer);
  }, [startHeroSequence]);

  const cycleSpeed = useCallback(() => {
    setSpeedMultiplier((curr) => {
      if (curr === 1) return 1.5;
      if (curr === 1.5) return 2;
      return 1;
    });
  }, []);

  // SKIP ALL: Instantly completes all elements on the entire page
  const skipAll = useCallback(() => {
    clearAllTimers();
    buildQueue.current = [];
    activeBuilds.current.clear();
    isHeroSequenceActive.current = false;

    setStates((prev) => {
      const next: Record<string, BuildState> = {};
      Object.keys(prev).forEach((k) => {
        next[k] = "BUILT";
      });
      return next;
    });

    setTypingProgress((prev) => {
      const next: Record<string, number> = {};
      Object.keys(prev).forEach((k) => {
        next[k] = 1;
      });
      return next;
    });

    setAgents((prev) =>
      prev.map((a) => ({
        ...a,
        isAssigned: false,
        assignedTargetId: undefined,
        role: undefined,
      }))
    );
  }, [clearAllTimers]);

  // REPLAY: Resets everything to 0, scrolls instantly to top, and restarts master cursor build!
  const replay = useCallback(() => {
    // 1. Purge all running timers and intervals immediately
    clearAllTimers();
    buildQueue.current = [];
    activeBuilds.current.clear();
    isHeroSequenceActive.current = false;

    // 2. Instant scroll to the absolute top of the page
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }

    // 3. Reset ALL registered element states to UNBUILT
    setStates((prev) => {
      const resetStates: Record<string, BuildState> = {};
      Object.keys(prev).forEach((k) => {
        resetStates[k] = "UNBUILT";
      });
      return resetStates;
    });

    // 4. Reset ALL typing progress to 0
    setTypingProgress((prev) => {
      const resetProgress: Record<string, number> = {};
      Object.keys(prev).forEach((k) => {
        resetProgress[k] = 0;
      });
      return resetProgress;
    });

    // 5. Reset all 16 agents to initial spread positions
    setAgents((prev) =>
      prev.map((a, i) => ({
        ...a,
        x: 120 + (i * 55) % 900,
        y: 90 + Math.floor(i / 4) * 80,
        targetX: 120 + (i * 55) % 900,
        targetY: 90 + Math.floor(i / 4) * 80,
        isAssigned: false,
        assignedTargetId: undefined,
        role: undefined,
      }))
    );

    // 6. Restart master sequence from hero-backdrop after clean DOM reset
    const replayTimer = setTimeout(() => {
      startHeroSequence();
    }, 150);
    activeTimers.current.push(replayTimer);
  }, [clearAllTimers, startHeroSequence]);

  const isElementBuilt = useCallback((id: string) => states[id] === "BUILT", [states]);
  const isElementBuilding = useCallback((id: string) => states[id] === "BUILDING", [states]);
  const isElementUnbuilt = useCallback(
    (id: string) => states[id] === "UNBUILT" || states[id] === "QUEUED" || states[id] === undefined,
    [states]
  );
  const getTypeProgress = useCallback((id: string) => typingProgress[id] || 0, [typingProgress]);

  // Idle Roaming and Footer Orbit
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
            // Position is actively driven by flight or sweep
            return agent;
          }

          if (isAllBuilt) {
            // Idle Orbit on right side of footer / bottom
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

          // Gentle ambient roving when unassigned
          const dist = Math.hypot(agent.targetX - agent.x, agent.targetY - agent.y);
          if (dist < 30 || Math.random() < 0.008) {
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
        typingProgress,
        speedMultiplier,
        totalElements,
        builtElements,
        isAllBuilt,
        agents,
        registerElement,
        requestBuild,
        setSpeedMultiplier,
        cycleSpeed,
        skipAll,
        replay,
        isElementBuilt,
        isElementBuilding,
        isElementUnbuilt,
        getTypeProgress,
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
