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
      className="crystal-logo-container"
      style={{
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {/* Single Crystal Glass Frame - Full visibility */}
      <div className="crystal-glass-frame-v3" />
      
      {/* Single Crystal Circle with Rim Light */}
      <svg
        className="crystal-emblem"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Crystal Glass Body - Full visibility, balanced brightness */}
          <radialGradient id="crystalGlassV3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(30, 50, 80, 0.5)" />
            <stop offset="40%" stopColor="rgba(20, 40, 70, 0.6)" />
            <stop offset="70%" stopColor="rgba(15, 35, 65, 0.7)" />
            <stop offset="100%" stopColor="rgba(10, 30, 60, 0.75)" />
          </radialGradient>
          
          {/* Rim Light - Outer edge only */}
          <linearGradient id="rimLightV3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="35%" stopColor="rgba(220,240,255,0.35)" />
            <stop offset="65%" stopColor="rgba(180,210,255,0.2)" />
            <stop offset="100%" stopColor="rgba(150,190,255,0.1)" />
          </linearGradient>
          
          {/* Soft Reflection - Top surface */}
          <linearGradient id="glassReflectV3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          
          {/* Subtle Refraction - Bottom right for depth */}
          <linearGradient id="glassRefractionV3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="50%" stopColor="rgba(200,225,255,0.05)" />
            <stop offset="100%" stopColor="rgba(180,210,255,0)" />
          </linearGradient>
          
          {/* Glass Edge Filter */}
          <filter id="glassEdgeV3" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.8" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main Crystal Circle - Full visibility */}
        <circle
          cx="100"
          cy="100"
          r="78"
          fill="url(#crystalGlassV3)"
          stroke="url(#rimLightV3)"
          strokeWidth="1.5"
          filter="url(#glassEdgeV3)"
        />
        
        {/* Soft Reflection - Top half for 3D depth */}
        <ellipse
          cx="100"
          cy="60"
          rx="55"
          ry="30"
          fill="url(#glassReflectV3)"
          opacity="0.6"
        />
        
        {/* Subtle Refraction - Bottom right for depth */}
        <ellipse
          cx="135"
          cy="135"
          rx="30"
          ry="20"
          fill="url(#glassRefractionV3)"
          opacity="0.4"
        />
      </svg>
      
      {/* Brand Name - Centered inside circle */}
      <div
        className="crystal-brand-name-v3"
        style={{
          fontSize: hovered ? "1.9rem" : "1.85rem",
          letterSpacing: hovered ? "0.44em" : "0.42em",
          transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        VISURA
      </div>
      
      {/* Subtitle - Centered below main text, inside circle */}
      <div
        className="crystal-subtitle-v3"
        style={{
          opacity: hovered ? 0.9 : 0.8,
          transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        THE CREATIVE VAULT
      </div>
    </div>
  );
}
