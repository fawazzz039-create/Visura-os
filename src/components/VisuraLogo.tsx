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
      style={{
        width: 340,
        height: 340,
        borderRadius: "50%",
        border: "3px solid rgba(255,255,255,0.9)",
        background: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "transform 0.4s ease, box-shadow 0.4s ease",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        boxShadow: hovered
          ? "0 0 60px rgba(255,255,255,0.25), 0 0 120px rgba(255,255,255,0.08), inset 0 0 40px rgba(255,255,255,0.03)"
          : "0 0 30px rgba(255,255,255,0.12), 0 0 80px rgba(255,255,255,0.04), inset 0 0 20px rgba(255,255,255,0.02)",
        animation: "circle-glow 4s ease-in-out infinite",
        position: "relative",
        userSelect: "none",
      }}
    >
      {/* Feather SVG Icon */}
      <div
        style={{
          animation: "feather-float 3s ease-in-out infinite",
          marginBottom: 12,
        }}
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Feather quill */}
          <path
            d="M52 8 C52 8, 60 20, 48 36 C40 46, 28 52, 16 56"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          {/* Feather vane left */}
          <path
            d="M52 8 C44 14, 36 22, 28 34 C24 40, 20 48, 16 56"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
          {/* Feather vane right */}
          <path
            d="M52 8 C56 16, 54 26, 48 36 C44 42, 36 50, 16 56"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
          {/* Feather barbs left */}
          <path d="M46 16 C40 18, 34 22, 28 28" stroke="white" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
          <path d="M42 22 C36 24, 30 28, 24 34" stroke="white" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
          <path d="M38 28 C32 30, 26 34, 20 40" stroke="white" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
          <path d="M34 34 C28 36, 22 40, 18 46" stroke="white" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
          {/* Feather barbs right */}
          <path d="M50 20 C48 26, 44 32, 38 38" stroke="white" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
          <path d="M50 28 C48 34, 44 40, 36 46" stroke="white" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
          <path d="M46 36 C44 42, 40 48, 30 52" stroke="white" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
          {/* Ink drop at tip */}
          <circle cx="16" cy="56" r="2" fill="white" opacity="0.8" />
        </svg>
      </div>

      {/* App Name */}
      <div
        style={{
          fontSize: 42,
          fontWeight: 300,
          letterSpacing: "10px",
          color: "white",
          textTransform: "uppercase",
          lineHeight: 1,
          marginBottom: 6,
          fontFamily: "'Segoe UI', Tahoma, sans-serif",
        }}
      >
        VISURA
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: 13,
          fontWeight: 200,
          letterSpacing: "3px",
          color: "rgba(255,255,255,0.75)",
          textTransform: "uppercase",
          textAlign: "center",
          lineHeight: 1.4,
          maxWidth: 220,
        }}
      >
        The Creative Vault
      </div>

      {/* Subtle inner ring */}
      <div
        style={{
          position: "absolute",
          width: 310,
          height: 310,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.08)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
