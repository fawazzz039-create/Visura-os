"use client";

import { useState, useEffect } from "react";

interface VisuraLogoProps {
  onClick: () => void;
}

export default function VisuraLogo({ onClick }: VisuraLogoProps) {
  const [hovered, setHovered] = useState(false);
  const [pulseTriggered, setPulseTriggered] = useState(false);

  const handleClick = () => {
    setPulseTriggered(true);
    onClick();
    
    setTimeout(() => {
      setPulseTriggered(false);
    }, 1000);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        cursor: "pointer",
        userSelect: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
      }}
    >
      {/* Spectral Glow Layer - Behind the Triangle */}
      <div
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(59, 130, 246, 0.2) 20%, rgba(6, 182, 212, 0.15) 40%, rgba(16, 185, 129, 0.1) 60%, rgba(234, 179, 8, 0.05) 80%, transparent 100%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: pulseTriggered ? "none" : "spectral-pulse 4s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
          willChange: "opacity, transform",
        }}
      />
      
      {/* Triggered Spectral Burst */}
      {pulseTriggered && (
        <div
          style={{
            position: "absolute",
            width: 450,
            height: 450,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(217, 166, 11, 0.5) 0%, rgba(139, 92, 246, 0.3) 30%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "security-pulse 1s cubic-bezier(0.4, 0, 0.2, 1) forwards",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />
      )}

      {/* Static Triangle (Prism) - Frozen like a mountain */}
      <div
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          borderLeft: "55px solid transparent",
          borderRight: "55px solid transparent",
          borderBottom: "95px solid rgba(255, 255, 255, 0.95)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, calc(-50% - 15px))",
          filter: "drop-shadow(0 0 20px rgba(255,255,255,0.4))",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        {/* Inner prism highlight */}
        <div
          style={{
            position: "absolute",
            top: "35px",
            left: "-25px",
            width: "50px",
            height: "50px",
            background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
        />
      </div>

      {/* Outer glow ring */}
      <div
        style={{
          position: "absolute",
          width: 380,
          height: 380,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.06)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Main white circle */}
      <div
        style={{
          width: 300,
          height: 300,
          borderRadius: "50%",
          border: hovered
            ? "2px solid rgba(255,255,255,1)"
            : "2px solid rgba(255,255,255,0.85)",
          background: hovered
            ? "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.06) 0%, transparent 70%)"
            : "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.04) 0%, transparent 70%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          boxShadow: hovered
            ? "0 0 80px rgba(255,255,255,0.18), 0 0 160px rgba(255,255,255,0.06), inset 0 0 60px rgba(255,255,255,0.04)"
            : "0 0 40px rgba(255,255,255,0.1), 0 0 80px rgba(255,255,255,0.03), inset 0 0 30px rgba(255,255,255,0.02)",
          position: "relative",
          overflow: "hidden",
          willChange: "transform, box-shadow",
          zIndex: 3,
        }}
      >
        {/* Inner shimmer - subtle */}
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.02) 25%, transparent 50%, rgba(255,255,255,0.015) 75%, transparent 100%)",
            animation: "shimmer-rotate 20s linear infinite",
            pointerEvents: "none",
          }}
        />

        {/* VISURA text */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 200,
            letterSpacing: "14px",
            color: "white",
            textTransform: "uppercase",
            lineHeight: 1,
            marginBottom: 8,
            fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
            textShadow: hovered
              ? "0 0 30px rgba(255,255,255,0.6)"
              : "0 0 15px rgba(255,255,255,0.3)",
            transition: "text-shadow 0.4s ease",
            position: "relative",
            zIndex: 4,
          }}
        >
          VISURA
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 11,
            fontWeight: 300,
            letterSpacing: "5px",
            color: "rgba(255,255,255,0.7)",
            textTransform: "uppercase",
            textAlign: "center",
            lineHeight: 1.4,
            fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
            position: "relative",
            zIndex: 4,
          }}
        >
          The Creative Vault
        </div>

        {/* Inner ring */}
        <div
          style={{
            position: "absolute",
            width: 270,
            height: 270,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.06)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
