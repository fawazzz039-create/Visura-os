"use client";

import { useState, useEffect } from "react";

export default function VisuraLogo({ onClick }: { onClick?: () => void }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`visura-premium-logo ${isLoaded ? "visura-logo-visible" : ""}`}
      onClick={onClick}
      style={{
        cursor: "pointer",
        position: "relative",
        width: "280px",
        height: "280px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Crystal Circle Container */}
      <div className="visura-crystal-circle">
        {/* Crystal Frame - Outer Ring */}
        <div className="visura-crystal-frame">
          {/* Crystal Surface - Main Circle */}
          <div className="visura-crystal-surface">
            {/* Internal Light Refraction Effect */}
            <div className="visura-crystal-reflection" />
            <div className="visura-crystal-reflection-2" />
            
            {/* Subtle Inner Glow */}
            <div className="visura-crystal-inner-glow" />
          </div>
        </div>

        {/* Text Container - Centered inside circle */}
        <div className="visura-text-container">
          {/* Main Brand Name */}
          <div className="visura-brand-name">VISURA</div>
          
          {/* Subtitle */}
          <div className="visura-brand-subtitle">THE CREATIVE VAULT</div>
        </div>
      </div>

      {/* Animated Entrance Particles */}
      <div className="visura-logo-particles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
