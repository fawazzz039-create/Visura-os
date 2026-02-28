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
      
      {/* Crystal Rim Light Ring */}
      <div className="crystal-rim-light" />
      
      {/* 3D Crystal Emblem */}
      <svg
        className="crystal-emblem"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Ultra-Premium Crystal Body - Glass-like transparency */}
          <radialGradient id="crystalBody" cx="40%" cy="30%" r="70%" fx="40%" fy="30%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="30%" stopColor="rgba(180,200,230,0.12)" />
            <stop offset="55%" stopColor="rgba(140,165,210,0.08)" />
            <stop offset="80%" stopColor="rgba(100,130,190,0.05)" />
            <stop offset="100%" stopColor="rgba(80,110,170,0.03)" />
          </radialGradient>
          
          {/* Rim Light Gradient - Realistic edge lighting */}
          <linearGradient id="rimLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="35%" stopColor="rgba(220,235,255,0.35)" />
            <stop offset="65%" stopColor="rgba(180,205,255,0.2)" />
            <stop offset="100%" stopColor="rgba(150,180,230,0.08)" />
          </linearGradient>
          
          {/* Primary Glass Reflection - Top left, sharp */}
          <linearGradient id="glassReflection1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="30%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          
          {/* Secondary Glass Reflection - Soft ambient */}
          <linearGradient id="glassReflection2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(200,220,255,0.25)" />
            <stop offset="50%" stopColor="rgba(180,200,255,0.08)" />
            <stop offset="100%" stopColor="rgba(150,180,255,0)" />
          </linearGradient>
          
          {/* Light Refraction - Realistic prismatic effect */}
          <linearGradient id="refraction" x1="30%" y1="70%" x2="70%" y2="30%">
            <stop offset="0%" stopColor="rgba(180,200,255,0.15)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="60%" stopColor="rgba(200,220,255,0.12)" />
            <stop offset="100%" stopColor="rgba(220,240,255,0.05)" />
          </linearGradient>
          
          {/* Caustics - Light patterns inside crystal */}
          <radialGradient id="caustics" cx="60%" cy="40%" r="40%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="50%" stopColor="rgba(200,220,255,0.02)" />
            <stop offset="100%" stopColor="rgba(150,180,255,0)" />
          </radialGradient>
          
          {/* Ultra-Soft Glow Filter */}
          <filter id="ultraSoftGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Crystal Edge Filter */}
          <filter id="crystalEdge" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.8" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Caustics - Light patterns */}
        <circle cx="100" cy="100" r="70" fill="url(#caustics)" />
        
        {/* Main Crystal Circle - Near transparent glass */}
        <circle
          cx="100"
          cy="100"
          r="75"
          fill="url(#crystalBody)"
          stroke="url(#rimLight)"
          strokeWidth="0.8"
        />
        
        {/* Primary Glass Reflection - Large, top left */}
        <ellipse
          cx="72"
          cy="68"
          rx="40"
          ry="28"
          fill="url(#glassReflection1)"
          transform="rotate(-35 72 68)"
          opacity="0.6"
        />
        
        {/* Secondary Reflection - Smaller, softer */}
        <ellipse
          cx="55"
          cy="85"
          rx="18"
          ry="12"
          fill="rgba(255,255,255,0.15)"
          transform="rotate(-50 55 85)"
        />
        
        {/* Tertiary Reflection - Bottom right, subtle */}
        <ellipse
          cx="135"
          cy="125"
          rx="22"
          ry="14"
          fill="url(#glassReflection2)"
          transform="rotate(40 135 125)"
          opacity="0.4"
        />
        
        {/* Light Refraction Lines - Prismatic edges */}
        <line x1="65" y1="100" x2="135" y2="100" stroke="rgba(200,220,255,0.08)" strokeWidth="0.4" />
        <line x1="100" y1="65" x2="100" y2="135" stroke="rgba(200,220,255,0.06)" strokeWidth="0.4" />
        <line x1="72" y1="72" x2="128" y2="128" stroke="rgba(255,255,255,0.1)" strokeWidth="0.25" />
        <line x1="128" y1="72" x2="72" y2="128" stroke="rgba(200,220,255,0.06)" strokeWidth="0.25" />
        
        {/* Inner Edge Highlight - Realistic rim */}
        <circle
          cx="100"
          cy="100"
          r="74.5"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.3"
        />
        
        {/* Specular Highlight - Sharp glass edge */}
        <path
          d="M 55 75 Q 70 55 100 50 Q 130 55 145 75"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="0.5"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
      
      {/* Ambient Glow Ring - Very subtle */}
      <div className="ambient-glow-ring" />
      
      {/* Brand Name */}
      <div
        className="crystal-brand-name"
        style={{
          fontSize: hovered ? "2.4rem" : "2.3rem",
          letterSpacing: hovered ? "0.52em" : "0.48em",
          textShadow: hovered
            ? "0 0 12px rgba(255,255,255,0.3), 0 0 25px rgba(200,220,255,0.15), 2px 2px 25px rgba(0,0,0,0.95)"
            : "0 0 8px rgba(255,255,255,0.2), 2px 2px 25px rgba(0,0,0,0.95)",
          transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        VISURA
      </div>
      
      {/* Subtitle */}
      <div
        className="crystal-subtitle"
        style={{
          opacity: hovered ? 0.9 : 0.7,
          textShadow: hovered
            ? "0 0 6px rgba(255,255,255,0.25), 1px 1px 12px rgba(0,0,0,0.85)"
            : "1px 1px 12px rgba(0,0,0,0.85)",
          transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        THE CREATIVE VAULT
      </div>
    </div>
  );
}
