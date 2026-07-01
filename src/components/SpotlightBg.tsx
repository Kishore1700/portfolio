import React, { useEffect, useState } from 'react';
import Lightfall from './Lightfall';

export const SpotlightBg: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#030014]">
      {/* Lightfall background */}
      <Lightfall
        colors={['#06b6d4', '#3b82f6', '#8b5cf6']} // cyan, blue, purple matching portfolio theme
        backgroundColor="#030014"
        speed={0.3}
        streakCount={6}
        streakWidth={1.2}
        streakLength={1.5}
        glow={1.2}
        density={0.5}
        twinkle={0.8}
        zoom={2.5}
        backgroundGlow={0.8}
        opacity={0.4}
        mouseInteraction={true}
        mouseStrength={0.8}
        mouseRadius={0.7}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
    </div>
  );
};
export default SpotlightBg;
