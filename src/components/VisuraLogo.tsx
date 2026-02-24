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
        position: "relative",
        cursor: "pointer",
        userSelect: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
      }}
    >
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
          animation: "ring-expand 4s ease-in-out infinite",
          pointerEvents: "none",
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
          animation: "circle-breathe 5s ease-in-out infinite",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Inner shimmer */}
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.03) 25%, transparent 50%, rgba(255,255,255,0.02) 75%, transparent 100%)",
            animation: "shimmer-rotate 12s linear infinite",
            pointerEvents: "none",
          }}
        />

        {/* Premium Feather SVG */}
        <div
          style={{
            animation: "feather-float 4s ease-in-out infinite",
            marginBottom: 10,
            filter: hovered
              ? "drop-shadow(0 0 12px rgba(255,255,255,0.6))"
              : "drop-shadow(0 0 6px rgba(255,255,255,0.3))",
            transition: "filter 0.4s ease",
          }}
        >
          <svg
            width="72"
            height="72"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Main quill shaft */}
            <path
              d="M62 10 C58 18, 50 30, 40 44 C32 55, 22 64, 14 72"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.95"
            />
            {/* Left vane - upper */}
            <path
              d="M62 10 C54 12, 46 18, 38 28 C32 36, 26 44, 20 52"
              stroke="white"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
            {/* Right vane - upper */}
            <path
              d="M62 10 C64 18, 62 28, 56 38 C50 46, 42 56, 30 66"
              stroke="white"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
            {/* Left vane - lower */}
            <path
              d="M40 44 C34 48, 26 54, 18 62"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
            {/* Right vane - lower */}
            <path
              d="M40 44 C44 50, 44 58, 36 68"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
            {/* Barbs left side */}
            <path d="M56 18 C50 20, 44 24, 38 30" stroke="white" strokeWidth="0.9" opacity="0.45" strokeLinecap="round" />
            <path d="M52 24 C46 26, 40 30, 34 36" stroke="white" strokeWidth="0.9" opacity="0.45" strokeLinecap="round" />
            <path d="M48 30 C42 32, 36 36, 30 42" stroke="white" strokeWidth="0.9" opacity="0.45" strokeLinecap="round" />
            <path d="M44 36 C38 38, 32 42, 26 48" stroke="white" strokeWidth="0.9" opacity="0.45" strokeLinecap="round" />
            <path d="M40 42 C34 44, 28 48, 22 54" stroke="white" strokeWidth="0.9" opacity="0.4" strokeLinecap="round" />
            {/* Barbs right side */}
            <path d="M60 20 C58 26, 54 32, 48 38" stroke="white" strokeWidth="0.9" opacity="0.45" strokeLinecap="round" />
            <path d="M58 28 C56 34, 52 40, 44 46" stroke="white" strokeWidth="0.9" opacity="0.45" strokeLinecap="round" />
            <path d="M54 36 C52 42, 48 48, 40 54" stroke="white" strokeWidth="0.9" opacity="0.4" strokeLinecap="round" />
            <path d="M50 44 C48 50, 44 56, 36 62" stroke="white" strokeWidth="0.9" opacity="0.35" strokeLinecap="round" />
            {/* Ink drop at tip */}
            <circle cx="14" cy="72" r="2.5" fill="white" opacity="0.85" />
            <circle cx="14" cy="72" r="4.5" fill="none" stroke="white" strokeWidth="0.8" opacity="0.3" />
          </svg>
        </div>

        {/* VISURA text */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 300,
            letterSpacing: "12px",
            color: "white",
            textTransform: "uppercase",
            lineHeight: 1,
            marginBottom: 5,
            fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
            textShadow: hovered
              ? "0 0 20px rgba(255,255,255,0.5)"
              : "0 0 10px rgba(255,255,255,0.2)",
            transition: "text-shadow 0.4s ease",
          }}
        >
          VISURA
        </div>

        {/* Divider line */}
        <div
          style={{
            width: 120,
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
            marginBottom: 6,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 10,
            fontWeight: 300,
            letterSpacing: "4px",
            color: "rgba(255,255,255,0.65)",
            textTransform: "uppercase",
            textAlign: "center",
            lineHeight: 1.4,
            fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
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
