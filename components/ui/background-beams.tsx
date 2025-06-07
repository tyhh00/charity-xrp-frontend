"use client";
import { useEffect, useRef } from "react";

export const BackgroundBeams = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = Math.round((clientX / window.innerWidth) * 100);
      const y = Math.round((clientY / window.innerHeight) * 100);

      container.style.setProperty("--x", `${x}%`);
      container.style.setProperty("--y", `${y}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 opacity-50 pointer-events-none"
      style={{
        background: `radial-gradient(circle at var(--x, 50%) var(--y, 50%), 
          rgba(71, 127, 247, 0.1) 0%, 
          rgba(37, 38, 44, 0.1) 25%, 
          rgba(0, 0, 0, 0) 50%)`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/30 via-transparent to-brand-accent/30 animate-pulse" />
    </div>
  );
}; 