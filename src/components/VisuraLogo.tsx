"use client";

import { useState, useEffect } from "react";

export default function VisuraLogo({ onClick }: { onClick?: () => void }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`visura-ultimate-logo ${isLoaded ? "visura-logo-loaded" : ""}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: "pointer",
        position: "relative",
        width: "300px",
        height: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background Circle - Subtle Crystal Glass */}
      <div className="visura-bg-circle">
        {/* Soft reflections for depth */}
        <div className="visura-bg-reflection-1" />
        <div className="visura-bg-reflection-2" />
      </div>

      {/* Main Circle - Bright Crystal with Rim Light */}
      <div className={`visura-main-circle ${isHovered ? "visura-main-hovered" : ""}`}>
        {/* Ice-blue glow animation overlay */}
        <div className="visura-ice-glow" />
        
        {/* Crystal surface with subtle reflections */}
        <div className="visura-main-surface">
          <div className="visura-main-reflection-1" />
          <div className="visura-main-reflection-2" />
        </div>

        {/* Text Container - Centered */}
        <div className="visura-text-wrapper">
          <div className="visura-text-main">VISURA</div>
          <div className="visura-text-sub">THE CREATIVE VAULT</div>
        </div>
      </div>
    </div>
  );
}
