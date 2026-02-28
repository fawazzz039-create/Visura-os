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
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="35%" stopColor="rgba(220,235,255,0.85)" />
            <stop offset="70%" stopColor="rgba(180,200,230,0.7)" />
            <stop offset="100%" stopColor="rgba(140,160,210,0.5)" />
          </radialGradient>
          
          {/* Inner Glow Gradient */}
          <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="50%" stopColor="rgba(200,220,255,0.3)" />
            <stop offset="100%" stopColor="rgba(150,180,255,0)" />
          </radialGradient>
          
          {/* Ring Light Gradient */}
          <linearGradient id="ringLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,1)" />
            <stop offset="50%" stopColor="rgba(200,220,255,0.9)" />
            <stop offset="100%" stopColor="rgba(150,180,255,0.7)" />
          </linearGradient>
          
          {/* Glass Reflection Gradient */}
          <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
          </linearGradient>
          
          {/* Volumetric Light */}
          <radialGradient id="volumetricLight" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          
          {/* Refraction Gradient */}
          <linearGradient id="refraction" x1="20%" y1="80%" x2="80%" y2="20%">
            <stop offset="0%" stopColor="rgba(100,150,255,0.3)" />
            <stop offset="50%" stopColor="rgba(200,220,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
          </linearGradient>
          
          {/* Glow Filter */}
          <filter id="crystalGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Soft Glow Filter */}
          <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Neon Ring Filter */}
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
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
        
        {/* Inner Crystal Face - Hexagonal facet effect */}
        <polygon
          points="100,45 145,70 145,130 100,155 55,130 55,70"
          fill="rgba(255,255,255,0.15)"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.5"
        />
        
        {/* Inner Glow */}
        <circle cx="100" cy="100" r="60" fill="url(#innerGlow)" />
        
        {/* Glass Reflection - Top Left */}
        <ellipse
          cx="75"
          cy="70"
          rx="35"
          ry="25"
          fill="url(#glassReflection)"
          transform="rotate(-30 75 70)"
          opacity="0.8"
        />
        
        {/* Secondary Reflection - Bottom Right */}
        <ellipse
          cx="125"
          cy="130"
          rx="20"
          ry="12"
          fill="rgba(255,255,255,0.2)"
          transform="rotate(45 125 130)"
        />
        
        {/* Light Refraction Lines */}
        <line x1="70" y1="100" x2="130" y2="100" stroke="rgba(200,220,255,0.3)" strokeWidth="1" />
        <line x1="100" y1="70" x2="100" y2="130" stroke="rgba(200,220,255,0.2)" strokeWidth="1" />
        <line x1="75" y1="75" x2="125" y2="125" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
        <line x1="125" y1="75" x2="75" y2="125" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        
        {/* Center Highlight */}
        <circle cx="90" cy="85" r="8" fill="rgba(255,255,255,0.6)" filter="url(#softGlow)" />
      </svg>
      
      {/* Neon Outer Ring */}
      <div className="neon-ring" />
      
      {/* Brand Name */}
      <div
        className="crystal-brand-name"
        style={{
          fontSize: hovered ? "2.4rem" : "2.3rem",
          letterSpacing: hovered ? "0.5em" : "0.45em",
          textShadow: hovered
            ? "0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(200,220,255,0.5), 2px 2px 20px rgba(0,0,0,0.9)"
            : "0 0 20px rgba(255,255,255,0.5), 2px 2px 20px rgba(0,0,0,0.9)",
          transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        VISURA
      </div>
      
      {/* Subtitle */}
      <div
        className="crystal-subtitle"
        style={{
          opacity: hovered ? 1 : 0.85,
          textShadow: hovered
            ? "0 0 15px rgba(255,255,255,0.6), 1px 1px 10px rgba(0,0,0,0.8)"
            : "1px 1px 10px rgba(0,0,0,0.8)",
          transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        THE CREATIVE VAULT
      </div>
    </div>
  );
}
