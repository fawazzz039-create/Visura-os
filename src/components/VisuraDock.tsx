"use client";

import { useState } from "react";
import type { ModalType } from "./VisuraApp";

interface DockItem {
  id: ModalType | "home";
  label: string;
  labelAr: string;
  icon: React.ReactNode;
}

interface VisuraDockProps {
  activeModal: ModalType;
  onOpenModal: (modal: ModalType) => void;
  onHome: () => void;
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function PhotoGalleryIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function AIIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <line x1="9" y1="10" x2="9" y2="10" strokeWidth="2.5" />
      <line x1="12" y1="10" x2="12" y2="10" strokeWidth="2.5" />
      <line x1="15" y1="10" x2="15" y2="10" strokeWidth="2.5" />
    </svg>
  );
}

function ArtGalleryIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

function CanvasIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 13.5V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.5" />
      <path d="M12 3v12" />
      <path d="M8 7l4-4 4 4" />
      <path d="M6 17h12" />
    </svg>
  );
}

function TrackingIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function SecurityIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

export default function VisuraDock({ activeModal, onOpenModal, onHome }: VisuraDockProps) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const items: DockItem[] = [
    { id: "home", label: "Home", labelAr: "الرئيسية", icon: <HomeIcon /> },
    { id: "photoGallery", label: "Photography", labelAr: "معرض التصوير", icon: <PhotoGalleryIcon /> },
    { id: "camera", label: "Camera", labelAr: "الكاميرا", icon: <CameraIcon /> },
    { id: "ai", label: "AI Assistant", labelAr: "مساعد الذكاء", icon: <AIIcon /> },
    { id: "artGallery", label: "Fine Art", labelAr: "معرض الفن", icon: <ArtGalleryIcon /> },
    { id: "canvas", label: "Canvas", labelAr: "لوحة الرسم", icon: <CanvasIcon /> },
    { id: "tracking", label: "Tracking", labelAr: "التتبع", icon: <TrackingIcon /> },
    { id: null, label: "Security", labelAr: "الأمان", icon: <SecurityIcon /> },
  ];

  const handleClick = (item: DockItem) => {
    if (item.id === "home") {
      onHome();
    } else if (item.id !== null) {
      onOpenModal(item.id as ModalType);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 32,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
      }}
    >
      {/* Dock container */}
      <div
        style={{
          display: "flex",
          gap: 6,
          padding: "10px 14px",
          background: "rgba(255, 255, 255, 0.04)",
          borderRadius: 26,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(32px) saturate(200%)",
          WebkitBackdropFilter: "blur(32px) saturate(200%)",
          boxShadow:
            "0 8px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.08) inset, 0 -1px 0 rgba(0,0,0,0.3) inset",
          position: "relative",
        }}
      >
        {/* Top highlight line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "15%",
            right: "15%",
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            borderRadius: 1,
            pointerEvents: "none",
          }}
        />

        {items.map((item, index) => {
          const isActive = item.id !== "home" && item.id !== null && activeModal === item.id;
          const isHovered = hoveredItem === index;
          const neighborDist = hoveredItem !== null ? Math.abs(hoveredItem - index) : 99;
          const scale = isHovered ? 1.22 : neighborDist === 1 ? 1.08 : 1;
          const translateY = isHovered ? -12 : neighborDist === 1 ? -4 : 0;

          return (
            <div
              key={index}
              title={item.labelAr}
              onClick={() => handleClick(item)}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                width: 46,
                height: 46,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                borderRadius: 13,
                position: "relative",
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transform: `translateY(${translateY}px) scale(${scale})`,
                background: isActive
                  ? "rgba(255, 255, 255, 0.14)"
                  : isHovered
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(255, 255, 255, 0.04)",
                border: isActive
                  ? "1px solid rgba(255, 255, 255, 0.35)"
                  : isHovered
                  ? "1px solid rgba(255, 255, 255, 0.2)"
                  : "1px solid rgba(255, 255, 255, 0.07)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: isActive
                  ? "0 0 16px rgba(255,255,255,0.12), inset 0 1px 0 rgba(255,255,255,0.2)"
                  : isHovered
                  ? "0 6px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)"
                  : "inset 0 1px 0 rgba(255,255,255,0.05)",
                color: isActive
                  ? "rgba(255,255,255,1)"
                  : isHovered
                  ? "rgba(255,255,255,0.95)"
                  : "rgba(255,255,255,0.55)",
              }}
            >
              {item.icon}

              {/* Active indicator dot */}
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    bottom: -8,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 4,
                    height: 4,
                    background: "white",
                    borderRadius: "50%",
                    boxShadow: "0 0 6px rgba(255,255,255,0.8)",
                  }}
                />
              )}

              {/* AI pulse indicator */}
              {item.id === "ai" && isActive && (
                <div
                  style={{
                    position: "absolute",
                    top: -3,
                    right: -3,
                    width: 8,
                    height: 8,
                    background: "white",
                    borderRadius: "50%",
                    animation: "pulse-dot 1.5s infinite",
                    boxShadow: "0 0 8px rgba(255,255,255,0.9)",
                  }}
                />
              )}

              {/* Tooltip */}
              {isHovered && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 14px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(8, 12, 20, 0.92)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 8,
                    padding: "5px 11px",
                    fontSize: 11,
                    whiteSpace: "nowrap",
                    color: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(12px)",
                    pointerEvents: "none",
                    letterSpacing: "0.5px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                    animation: "fadeIn 0.15s ease",
                  }}
                >
                  {item.labelAr}
                  {/* Tooltip arrow */}
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 0,
                      height: 0,
                      borderLeft: "5px solid transparent",
                      borderRight: "5px solid transparent",
                      borderTop: "5px solid rgba(255,255,255,0.12)",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
