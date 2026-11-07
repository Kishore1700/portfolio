"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSwarmBuilder } from "@/context/SwarmBuilderContext";

interface CursorTypewriterProps {
  id: string;
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  cursorLabel?: string;
  duration?: number;
  highlightWords?: string[];
  highlightColor?: string;
}

export function CursorTypewriter({
  id,
  text,
  as: Component = "span",
  className = "",
  cursorLabel,
  duration = 750,
  highlightWords = [],
  highlightColor = "#DC2626",
}: CursorTypewriterProps) {
  const { registerElement, requestBuild, isElementBuilt, isElementBuilding, isElementUnbuilt, speedMultiplier, setAgents } =
    useSwarmBuilder();
  const ref = useRef<HTMLElement>(null);
  const [displayedLength, setDisplayedLength] = useState<number>(0);

  const built = isElementBuilt(id);
  const building = isElementBuilding(id);
  const unbuilt = isElementUnbuilt(id);

  useEffect(() => {
    registerElement(id);
  }, [id, registerElement]);

  // Viewport intersection observer to trigger build
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = entry.target.getBoundingClientRect();
            requestBuild(id, rect);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [id, requestBuild]);

  // Live cursor-driven letter reveal effect
  useEffect(() => {
    if (!building) {
      if (built) {
        setDisplayedLength(text.length);
      } else if (unbuilt) {
        setDisplayedLength(0);
      }
      return;
    }

    const totalChars = text.length;
    if (totalChars === 0) return;

    const adjustedDuration = duration / speedMultiplier;
    const intervalMs = Math.max(16, Math.floor(adjustedDuration / totalChars));
    let charIndex = 0;

    const timer = setInterval(() => {
      charIndex++;
      setDisplayedLength(charIndex);

      // Dynamically move the assigned agent cursor to the exact letter position on screen
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const progress = Math.min(1, charIndex / totalChars);
        const currentCursorX = rect.left + progress * rect.width;
        const currentCursorY = rect.top + rect.height * 0.5;

        setAgents((prev) =>
          prev.map((agent) => {
            if (agent.assignedTargetId === id) {
              return {
                ...agent,
                targetX: currentCursorX,
                targetY: currentCursorY,
              };
            }
            return agent;
          })
        );
      }

      if (charIndex >= totalChars) {
        clearInterval(timer);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [building, built, unbuilt, text, duration, speedMultiplier, id, setAgents]);

  const currentText = built ? text : text.slice(0, displayedLength);

  // Helper to render text with optional highlighted keywords
  const renderFormattedText = (raw: string) => {
    if (!highlightWords.length) return raw;

    const parts = raw.split(new RegExp(`(${highlightWords.join("|")})`, "gi"));
    return parts.map((part, idx) => {
      const isMatch = highlightWords.some((w) => w.toLowerCase() === part.toLowerCase());
      if (isMatch) {
        return (
          <strong key={idx} className="text-white font-bold" style={{ borderBottom: `1px solid ${highlightColor}` }}>
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <Component ref={ref as any} id={id} className={`relative inline-block transition-all ${className}`}>
      {/* If building, show the text revealed so far with the blinking cursor right after it */}
      {building && (
        <span className="relative">
          <span>{renderFormattedText(currentText)}</span>
          <span className="inline-block w-2 text-[#3B82F6] font-mono font-bold animate-pulse select-none">|</span>
        </span>
      )}

      {/* If built, render full text */}
      {built && <span>{renderFormattedText(text)}</span>}

      {/* If unbuilt, placeholder spacing with wireframe blueprint line */}
      {unbuilt && (
        <span className="opacity-0 select-none pointer-events-none">
          {text}
        </span>
      )}
    </Component>
  );
}

