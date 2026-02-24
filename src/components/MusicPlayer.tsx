"use client";

import { useState, useRef } from "react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* Hidden audio element with royalty-free calm music */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3"
      />
      <div
        style={{
          position: "fixed",
          bottom: 110,
          left: 30,
          background: "rgba(8, 12, 20, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 18,
          padding: "12px 18px",
          zIndex: 1000,
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          display: "flex",
          alignItems: "center",
          gap: 14,
          minWidth: 240,
          boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Visualizer */}
        <div
          style={{
            display: "flex",
            gap: 2,
            alignItems: "flex-end",
            height: 20,
          }}
        >
          {[0.4, 0.8, 0.6, 1, 0.7, 0.5, 0.9].map((h, i) => (
            <div
              key={i}
              style={{
                width: 3,
                height: isPlaying ? `${h * 18}px` : "4px",
                background: "rgba(255,255,255,0.7)",
                borderRadius: 2,
                transition: "height 0.3s ease",
                animation: isPlaying
                  ? `viz-pulse ${0.4 + i * 0.1}s infinite ease-in-out alternate`
                  : "none",
              }}
            />
          ))}
        </div>

        {/* Track info */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 500, opacity: 0.9 }}>Calm Creativity</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>Ambient Focus</div>
        </div>

        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            transition: "all 0.2s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "white")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.9)")}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
      </div>
    </>
  );
}
