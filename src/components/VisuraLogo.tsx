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
      {/* Dark Navy Blue Gradient Background */}
      <div className="crystal-bg-gradient" />
      
      {/* Outer Neon Ring Light */}
      <div className="crystal-outer-ring" />
      
      {/* 3D Crystal Emblem */}
      <svg
        className="crystal-emblem"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Crystal Body Gradient - Multiple layers for 3D effect */}
          <radialGradient id="crystalBody" cx="30%" cy="20%" r="80%" fx="30%" fy="20%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="35%" stopColor="rgba(200,215,240,0.35)" />
            <stop offset="70%" stopColor="rgba(160,180,220,0.25)" />
            <stop offset="100%" stopColor="rgba(120,140,200,0.15)" />
          </radialGradient>
          
          {/* Inner Glow Gradient - Subtle */}
          <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="50%" stopColor="rgba(200,220,255,0.12)" />
            <stop offset="100%" stopColor="rgba(150,180,255,0)" />
          </radialGradient>
          
          {/* Ring Light Gradient - Elegant thin */}
          <linearGradient id="ringLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="50%" stopColor="rgba(180,200,230,0.6)" />
            <stop offset="100%" stopColor="rgba(140,160,210,0.4)" />
          </linearGradient>
          
          {/* Glass Reflection Gradient - Subtle */}
          <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>
          
          {/* Volumetric Light - Minimal */}
          <radialGradient id="volumetricLight" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          
          {/* Refraction Gradient - Subtle */}
          <linearGradient id="refraction" x1="20%" y1="80%" x2="80%" y2="20%">
            <stop offset="0%" stopColor="rgba(100,150,255,0.12)" />
            <stop offset="50%" stopColor="rgba(200,220,255,0.04)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
          </linearGradient>
          
          {/* Soft Glow Filter - Minimal */}
          <filter id="crystalGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Very Soft Glow Filter */}
          <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Subtle Neon Ring Filter */}
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Volumetric Light Background */}
        <circle cx="100" cy="100" r="90" fill="url(#volumetricLight)" className="volumetric-light" />
        
        {/* Main Crystal Circle */}
        <circle
          cx="100"
          cy="100"
          r="75"
          fill="url(#crystalBody)"
          filter="url(#crystalGlow)"
        />
        
        {/* Inner Crystal Face - Hexagonal facet effect - Subtle */}
        <polygon
          points="100,45 145,70 145,130 100,155 55,130 55,70"
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.3"
        />
        
        {/* Inner Glow */}
        <circle cx="100" cy="100" r="60" fill="url(#innerGlow)" />
        
        {/* Glass Reflection - Top Left - Subtle */}
        <ellipse
          cx="75"
          cy="70"
          rx="35"
          ry="25"
          fill="url(#glassReflection)"
          transform="rotate(-30 75 70)"
          opacity="0.5"
        />
        
        {/* Secondary Reflection - Bottom Right - Subtle */}
        <ellipse
          cx="125"
          cy="130"
          rx="20"
          ry="12"
          fill="rgba(255,255,255,0.08)"
          transform="rotate(45 125 130)"
        />
        
        {/* Light Refraction Lines - Minimal */}
        <line x1="70" y1="100" x2="130" y2="100" stroke="rgba(200,220,255,0.12)" strokeWidth="0.5" />
        <line x1="100" y1="70" x2="100" y2="130" stroke="rgba(200,220,255,0.08)" strokeWidth="0.5" />
        <line x1="75" y1="75" x2="125" y2="125" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" />
        <line x1="125" y1="75" x2="75" y2="125" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" />
        
        {/* Center Highlight - Minimal */}
        <circle cx="90" cy="85" r="5" fill="rgba(255,255,255,0.25)" filter="url(#softGlow)" />
      </svg>
      
      {/* Neon Outer Ring */}
      <div className="neon-ring" />
      
      {/* Brand Name */}
      <div
        className="crystal-brand-name"
        style={{
          fontSize: hovered ? "2.35rem" : "2.25rem",
          letterSpacing: hovered ? "0.48em" : "0.42em",
          textShadow: hovered
            ? "0 0 15px rgba(255,255,255,0.35), 0 0 30px rgba(200,220,255,0.2), 2px 2px 20px rgba(0,0,0,0.9)"
            : "0 0 10px rgba(255,255,255,0.25), 2px 2px 20px rgba(0,0,0,0.9)",
          transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        VISURA
      </div>
      
      {/* Subtitle */}
      <div
        className="crystal-subtitle"
        style={{
          opacity: hovered ? 0.95 : 0.75,
          textShadow: hovered
            ? "0 0 8px rgba(255,255,255,0.3), 1px 1px 10px rgba(0,0,0,0.8)"
            : "1px 1px 10px rgba(0,0,0,0.8)",
          transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        THE CREATIVE VAULT
      </div>
    </div>
  );
}
