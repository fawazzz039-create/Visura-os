"use client";

import { useState, useEffect } from "react";

interface VisuraLogoProps {
  onClick: () => void;
}

export default function VisuraLogo({ onClick }: VisuraLogoProps) {
  const [hovered, setHovered] = useState(false);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Initial animation on mount
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
      {/* Premium Crystal Glass Frame - Ultra bright and prominent */}
      <div className="crystal-glass-frame-v4" />
      
      {/* Ultra Premium Crystal Circle with Cinematic 3D */}
      <svg
        className="crystal-emblem-v4"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: animated ? 'scale(1)' : 'scale(0.8)',
          opacity: animated ? 1 : 0,
          transition: 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <defs>
          {/* Ultra Premium Crystal Body - Maximum visibility */}
          <radialGradient id="crystalGlassV4" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(40, 65, 100, 0.75)" />
            <stop offset="30%" stopColor="rgba(30, 55, 90, 0.7)" />
            <stop offset="60%" stopColor="rgba(20, 45, 75, 0.72)" />
            <stop offset="100%" stopColor="rgba(12, 32, 62, 0.8)" />
          </radialGradient>
          
          {/* Cinematic Rim Light - Elegant outer edge glow */}
          <linearGradient id="rimLightV4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="25%" stopColor="rgba(240,250,255,0.45)" />
            <stop offset="50%" stopColor="rgba(200,230,255,0.3)" />
            <stop offset="75%" stopColor="rgba(160,200,255,0.15)" />
            <stop offset="100%" stopColor="rgba(120,170,255,0.05)" />
          </linearGradient>
          
          {/* Top Surface Reflection - Crystal shine */}
          <linearGradient id="glassReflectV4" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="35%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          
          {/* Bottom Refraction - Depth effect */}
          <linearGradient id="glassRefractionV4" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="50%" stopColor="rgba(200,230,255,0.08)" />
            <stop offset="100%" stopColor="rgba(180,210,255,0)" />
          </linearGradient>
          
          {/* Internal Crystal Facets - Premium depth layers */}
          <radialGradient id="crystalFacetV4" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          
          {/* Premium Edge Glow */}
          <filter id="glassEdgeV4" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.2" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Subtle Inner Shadow for Depth */}
          <filter id="innerShadowV4" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
            <feOffset dx="0" dy="2" result="offsetBlur"/>
            <feComposite in="offsetBlur" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"/>
            <feFlood floodColor="rgba(0,0,0,0.3)" result="color"/>
            <feComposite in="color" in2="shadowDiff" operator="in" result="innerShadow"/>
            <feMerge>
              <feMergeNode in="innerShadow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main Crystal Circle - Ultra prominent */}
        <circle
          cx="100"
          cy="100"
          r="78"
          fill="url(#crystalGlassV4)"
          stroke="url(#rimLightV4)"
          strokeWidth="2"
          filter="url(#glassEdgeV4)"
        />
        
        {/* Internal Crystal Facet - Premium depth layer */}
        <circle
          cx="100"
          cy="100"
          r="72"
          fill="url(#crystalFacetV4)"
          opacity="0.5"
        />
        
        {/* Top Surface Reflection - Crystal shine */}
        <ellipse
          cx="100"
          cy="55"
          rx="58"
          ry="32"
          fill="url(#glassReflectV4)"
          opacity={hovered ? "0.75" : "0.65"}
          style={{
            transition: 'opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
        
        {/* Bottom Refraction - Depth effect */}
        <ellipse
          cx="138"
          cy="140"
          rx="32"
          ry="22"
          fill="url(#glassRefractionV4)"
          opacity={hovered ? "0.55" : "0.45"}
          style={{
            transition: 'opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
        
        {/* Subtle Edge Highlight - Left side */}
        <path
          d="M 35 100 Q 35 60 60 40"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>
      
      {/* Brand Name - Centered inside circle */}
      <div
        className="crystal-brand-name-v4"
        style={{
          fontSize: hovered ? "1.92rem" : "1.85rem",
          letterSpacing: hovered ? "0.44em" : "0.42em",
          opacity: animated ? 1 : 0,
          transform: animated ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          transitionDelay: '0.3s',
        }}
      >
        VISURA
      </div>
      
      {/* Subtitle - Centered below main text, inside circle */}
      <div
        className="crystal-subtitle-v4"
        style={{
          opacity: animated ? (hovered ? 0.95 : 0.85) : 0,
          transform: animated ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          transitionDelay: '0.5s',
        }}
      >
        THE CREATIVE VAULT
      </div>
    </div>
  );
}
