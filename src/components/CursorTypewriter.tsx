"use client";

import React, { useEffect, useRef } from "react";
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
  highlightWords = [],
  highlightColor = "#DC2626",
}: CursorTypewriterProps) {
  const {
    registerElement,
    requestBuild,
    isElementBuilt,
    isElementBuilding,
    isElementUnbuilt,
    getTypeProgress,
  } = useSwarmBuilder();

  const ref = useRef<HTMLElement>(null);

  // Register element on mount
  useEffect(() => {
    registerElement(id);
  }, [id, registerElement]);

  // Support parent ID inheritance if this is a sub-element (e.g. "hero-name-text" -> "hero-name")
  const baseId = id.endsWith("-text") ? id.replace("-text", "") : id;

  const built = isElementBuilt(id) || isElementBuilt(baseId);
  const building = isElementBuilding(id) || isElementBuilding(baseId);
  const unbuilt = !built && !building;

  // Real-time progress strictly tied to cursor physical movement (0 to 1)
  const progress = Math.max(0, Math.min(1, getTypeProgress(id) || getTypeProgress(baseId) || 0));

  // Viewport intersection observer to request build when scrolled into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && isElementUnbuilt(id) && isElementUnbuilt(baseId)) {
            requestBuild(baseId);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [id, baseId, requestBuild, isElementUnbuilt]);

  // Number of revealed characters is mathematically tied to the cursor tip coordinate
  const totalLength = text.length;
  const displayedLength = built ? totalLength : building ? Math.floor(progress * totalLength) : 0;
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
    <Component ref={ref as any} id={id} className={`relative inline-block ${className}`}>
      {/* If building: Text revealed so far trailing a blinking caret right at the cursor tip */}
      {building && (
        <span className="relative">
          <span>{renderFormattedText(currentText)}</span>
          <span className="inline-block w-2 text-[#3B82F6] font-mono font-bold animate-pulse select-none">|</span>
        </span>
      )}

      {/* If built: Full text with styled keywords */}
      {built && <span>{renderFormattedText(text)}</span>}

      {/* If unbuilt: Completely invisible placeholder maintaining geometry */}
      {unbuilt && (
        <span className="opacity-0 select-none pointer-events-none">
          {text}
        </span>
      )}
    </Component>
  );
}
