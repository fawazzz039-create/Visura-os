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
      {/* Crystal Glass Frame - Main circular frame */}
      <div className="crystal-glass-frame" />
      
      {/* Crystal Rim Light - Only on outer edge */}
      <div className="crystal-rim-light-v2" />
      
      {/* 3D Crystal Emblem */}
      <svg
        className="crystal-emblem"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Crystal Glass Body - Visible but subtle */}
          <radialGradient id="crystalGlass" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(200,220,255,0.08)" />
            <stop offset="40%" stopColor="rgba(150,175,210,0.06)" />
            <stop offset="70%" stopColor="rgba(100,130,180,0.04)" />
            <stop offset="100%" stopColor="rgba(80,100,150,0.02)" />
          </radialGradient>
          
          {/* Rim Light - Edge only */}
          <linearGradient id="rimLightV2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
            <stop offset="40%" stopColor="rgba(200,225,255,0.3)" />
            <stop offset="100%" stopColor="rgba(150,180,230,0.1)" />
          </linearGradient>
          
          {/* Glass Reflection - Soft top */}
          <linearGradient id="glassReflect" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          
          {/* Subtle Light Refraction */}
          <linearGradient id="subtleRefraction" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="50%" stopColor="rgba(200,220,255,0.03)" />
            <stop offset="100%" stopColor="rgba(150,180,255,0)" />
          </linearGradient>
          
          {/* Glass Edge Filter */}
          <filter id="glassEdge" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.5" result="blur"/>
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
          fill="url(#crystalGlass)"
          stroke="url(#rimLightV2)"
          strokeWidth="1"
          filter="url(#glassEdge)"
        />
        
        {/* Glass Reflection - Top half */}
        <ellipse
          cx="100"
          cy="65"
          rx="55"
          ry="28"
          fill="url(#glassReflect)"
          opacity="0.5"
        />
        
        {/* Subtle Light Refraction - Bottom right */}
        <ellipse
          cx="130"
          cy="130"
          rx="35"
          ry="25"
          fill="url(#subtleRefraction)"
          opacity="0.35"
        />
        
        {/* Subtle inner edge highlight */}
        <circle
          cx="100"
          cy="100"
          r="77"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.3"
        />
      </svg>
      
      {/* Brand Name - Centered inside circle */}
      <div
        className="crystal-brand-name-v2"
        style={{
          fontSize: hovered ? "1.85rem" : "1.8rem",
          letterSpacing: hovered ? "0.42em" : "0.4em",
          transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        VISURA
      </div>
      
      {/* Subtitle - Centered below main text, inside circle */}
      <div
        className="crystal-subtitle-v2"
        style={{
          opacity: hovered ? 0.85 : 0.7,
          transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        THE CREATIVE VAULT
      </div>
    </div>
  );
}
