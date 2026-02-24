"use client";

import { useState } from "react";
import type { ModalType } from "./VisuraApp";

interface DockItem {
  id: ModalType | "home";
  label: string;
  icon: React.ReactNode;
  hasAI?: boolean;
}

interface VisuraDockProps {
  activeModal: ModalType;
  onOpenModal: (modal: ModalType) => void;
  onHome: () => void;
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function PhotoGalleryIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function AIIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10" />
      <path d="M12 6v6l4 2" />
      <circle cx="19" cy="5" r="3" />
    </svg>
  );
}

function ArtGalleryIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" />
      <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" />
    </svg>
  );
}

function CanvasIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

function TrackingIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function SecurityIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

export default function VisuraDock({ activeModal, onOpenModal, onHome }: VisuraDockProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const items: DockItem[] = [
    { id: "home", label: "الرئيسية", icon: <HomeIcon /> },
    { id: "photoGallery", label: "معرض الصور", icon: <PhotoGalleryIcon /> },
    { id: "camera", label: "الكاميرا", icon: <CameraIcon /> },
    { id: "ai", label: "مساعد AI", icon: <AIIcon />, hasAI: true },
    { id: "artGallery", label: "معرض الفن", icon: <ArtGalleryIcon /> },
    { id: "canvas", label: "لوحة الرسم", icon: <CanvasIcon /> },
    { id: "tracking", label: "التتبع", icon: <TrackingIcon /> },
    { id: null, label: "الأمان", icon: <SecurityIcon /> },
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
        bottom: 36,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 8,
        padding: "10px 16px",
        background: "rgba(8, 12, 20, 0.45)",
        borderRadius: 28,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        zIndex: 1000,
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {items.map((item, index) => {
        const isActive = item.id !== "home" && item.id !== null && activeModal === item.id;
        const isHovered = hoveredItem === String(index);

        return (
          <div
            key={index}
            title={item.label}
            onClick={() => handleClick(item)}
            onMouseEnter={() => setHoveredItem(String(index))}
            onMouseLeave={() => setHoveredItem(null)}
            style={{
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              borderRadius: 14,
              position: "relative",
              transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: isHovered ? "translateY(-10px) scale(1.15)" : "translateY(0) scale(1)",
              background: isActive
                ? "rgba(255, 255, 255, 0.12)"
                : isHovered
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(255, 255, 255, 0.03)",
              border: isActive
                ? "1px solid rgba(255, 255, 255, 0.3)"
                : "1px solid rgba(255, 255, 255, 0.06)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow: isActive
                ? "0 0 20px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.15)"
                : isHovered
                ? "0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
                : "none",
              color: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.65)",
            }}
          >
            {item.icon}

            {/* AI pulse indicator */}
            {item.hasAI && isActive && (
              <div
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  width: 10,
                  height: 10,
                  background: "white",
                  borderRadius: "50%",
                  animation: "pulse-dot 1.5s infinite",
                  boxShadow: "0 0 6px rgba(255,255,255,0.8)",
                }}
              />
            )}

            {/* Tooltip */}
            {isHovered && (
              <div
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 12px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(10, 14, 22, 0.9)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 8,
                  padding: "5px 10px",
                  fontSize: 11,
                  whiteSpace: "nowrap",
                  color: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(10px)",
                  pointerEvents: "none",
                  letterSpacing: "0.5px",
                }}
              >
                {item.label}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
