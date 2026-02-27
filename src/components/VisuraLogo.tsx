"use client";

import { useState } from "react";

interface VisuraLogoProps {
  onClick: () => void;
}

export default function VisuraLogo({ onClick }: VisuraLogoProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="visura-logo-container"
      style={{
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {/* Spectral Spirit - Pulsing background layer */}
      <div className="spectral-spirit" />
      
      {/* The Static Prism - Frozen like a mountain */}
      <svg
        className="prism-shield"
        viewBox="0 0 100 160"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="prismGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="50%" stopColor="rgba(240,240,250,0.9)" />
            <stop offset="100%" stopColor="rgba(220,220,240,0.85)" />
          </linearGradient>
          <filter id="prismGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {/* Main triangle */}
        <polygon
          points="50,5 95,155 5,155"
          fill="url(#prismGradient)"
          filter="url(#prismGlow)"
        />
        {/* Inner highlight */}
        <polygon
          points="50,25 80,135 20,135"
          fill="rgba(255,255,255,0.15)"
        />
      </svg>

      {/* Brand Name */}
      <div
        className="visura-brand-name"
        style={{
          fontSize: hovered ? "2.6rem" : "2.5rem",
          textShadow: hovered
            ? "0 0 40px rgba(255,255,255,0.7), 2px 2px 20px rgba(0,0,0,0.8)"
            : "2px 2px 20px rgba(0,0,0,0.8)",
          transition: "all 0.4s ease",
        }}
      >
        VISURA
      </div>
    </div>
  );
}
